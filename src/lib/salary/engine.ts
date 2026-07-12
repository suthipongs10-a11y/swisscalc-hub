/**
 * Brutto → Netto salary engine (employee social-insurance deductions).
 *
 * Scope: gross salary minus mandatory Swiss social contributions. Income tax is
 * NOT deducted here — Swiss citizens and C-permit holders are taxed by annual
 * assessment, not at source (that is the Quellensteuer tool, M2). So "Nettolohn"
 * here means take-home before income tax, which is what a Swiss payslip shows.
 *
 * All parameters come from the sourced data file, imported at build time.
 * Contributions are federal and uniform across cantons (CLAUDE.md data rule).
 */
import data from '../../data/social-contributions-2026.json';

export interface SalaryInput {
  /** Annual gross salary in CHF (already includes the 13th salary if applicable). */
  annualGross: number;
  /** Age of the employee (drives the BVG retirement-credit band). */
  age: number;
  /** Employee NBU (non-occupational accident) rate as a fraction, e.g. 0.014. Plan-specific. */
  nbuRate?: number;
  /** Whether the employee is enrolled in a pension fund (BVG). Default true. */
  includeBvg?: boolean;
}

export interface DeductionLine {
  key: 'ahvIvEo' | 'alv' | 'nbu' | 'bvg';
  label: string;
  base: number;
  rate: number;
  amount: number;
}

export interface SalaryResult {
  annualGross: number;
  deductions: DeductionLine[];
  totalDeductions: number;
  annualNet: number;
  monthlyNet: number;
  /** BVG coordinated salary used (0 if not insured), for transparency in the UI. */
  coordinatedSalary: number;
}

const round = (n: number): number => Math.round(n * 100) / 100;

/** BVG coordinated salary per Art. 8 BVG: gross minus coordination deduction, clamped. */
export function coordinatedSalary(annualGross: number, age: number): number {
  const bvg = data.bvg;
  if (age < bvg.minInsuredAge) return 0;
  if (annualGross < bvg.entryThreshold) return 0;
  const raw = annualGross - bvg.coordinationDeduction;
  if (raw <= 0) return bvg.minCoordinatedSalary;
  return Math.min(Math.max(raw, bvg.minCoordinatedSalary), bvg.maxCoordinatedSalary);
}

/** BVG retirement-credit rate for an age, per Art. 16 BVG. 0 below the insured age. */
export function retirementCreditRate(age: number): number {
  const band = data.bvg.retirementCredits.find((b) => age >= b.fromAge && age <= b.toAge);
  return band ? band.rate : 0;
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { annualGross, age } = input;
  const nbuRate = input.nbuRate ?? data.nbu.defaultEmployeeRate;
  const includeBvg = input.includeBvg ?? true;

  if (!Number.isFinite(annualGross) || annualGross < 0) {
    throw new Error('annualGross must be a non-negative number');
  }

  const deductions: DeductionLine[] = [];

  // AHV/IV/EO — full gross, no ceiling.
  const ahvBase = annualGross;
  deductions.push({
    key: 'ahvIvEo',
    label: 'AHV / IV / EO',
    base: ahvBase,
    rate: data.ahvIvEo.employeeRate,
    amount: round(ahvBase * data.ahvIvEo.employeeRate),
  });

  // ALV — up to the annual ceiling; nothing above it.
  const alvBase = Math.min(annualGross, data.alv.annualCeiling);
  deductions.push({
    key: 'alv',
    label: 'ALV (Arbeitslosenversicherung)',
    base: alvBase,
    rate: data.alv.employeeRate,
    amount: round(alvBase * data.alv.employeeRate),
  });

  // NBU — same ceiling as ALV; plan-specific rate.
  const nbuBase = Math.min(annualGross, data.nbu.annualCeiling);
  deductions.push({
    key: 'nbu',
    label: 'NBU (Nichtberufsunfall)',
    base: nbuBase,
    rate: nbuRate,
    amount: round(nbuBase * nbuRate),
  });

  // BVG — employee share of the retirement credit on the coordinated salary.
  const coord = includeBvg ? coordinatedSalary(annualGross, age) : 0;
  const creditRate = includeBvg ? retirementCreditRate(age) : 0;
  const bvgEmployeeRate = creditRate * data.bvg.employeeShare;
  deductions.push({
    key: 'bvg',
    label: 'BVG (Pensionskasse)',
    base: coord,
    rate: bvgEmployeeRate,
    amount: round(coord * bvgEmployeeRate),
  });

  const totalDeductions = round(deductions.reduce((sum, d) => sum + d.amount, 0));
  const annualNet = round(annualGross - totalDeductions);

  return {
    annualGross: round(annualGross),
    deductions,
    totalDeductions,
    annualNet,
    monthlyNet: round(annualNet / 12),
    coordinatedSalary: coord,
  };
}

/** Convenience: build annual gross from a monthly figure and a payout count (12 or 13). */
export function annualFromMonthly(monthly: number, payouts: 12 | 13): number {
  return monthly * payouts;
}
