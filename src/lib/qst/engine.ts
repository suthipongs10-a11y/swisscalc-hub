/**
 * Quellensteuer (withholding tax on salaries) engine — pure functions over the
 * derived per-canton tariff data in /public/data/qst/<kt>.json (built by
 * scripts/import-qst.mjs from the official ESTV tariff files).
 *
 * The tariff is a step function of MONTHLY gross income (spec §4.3): for a given
 * tariff code (group + children + church) look up the band, then
 *   tax = max(income * rate%, minimum tax)   (spec §4.4).
 */

/** One tariff band: [income-from (rappen), minimum tax (rappen), rate (pct × 100)]. */
export type QstBand = [number, number, number];
export type ChurchMode = 'both' | 'N' | 'Y';
export type QstGroup = 'A' | 'B' | 'C' | 'H';
export type Church = 'N' | 'Y';

export interface QstData {
  _meta?: Record<string, unknown>;
  church: ChurchMode;
  codes: Record<string, QstBand[]>;
}

/** Build the ESTV tariff code (e.g. A0N, C2Y, H1N) from the user's situation. */
export function buildCode(group: QstGroup, children: number, church: Church): string {
  const kids = group === 'A' ? 0 : Math.max(group === 'H' ? 1 : 0, children);
  return `${group}${kids}${church}`;
}

/** Resolve the church letter a canton actually publishes (N-only / Y-only fallback). */
export function resolveChurch(mode: ChurchMode, wantChurch: boolean): Church {
  if (mode === 'N') return 'N';
  if (mode === 'Y') return 'Y';
  return wantChurch ? 'Y' : 'N';
}

export interface QstResult {
  monthlyTax: number;
  annualTax: number;
  ratePct: number;
  monthlyNet: number;
  code: string;
}

/**
 * Monthly withholding tax for a monthly gross salary under one tariff code.
 * Returns zeros if the code is missing from the canton data.
 */
export function qstForCode(monthlyGross: number, data: QstData, code: string): QstResult {
  const bands = data.codes[code];
  const empty: QstResult = { monthlyTax: 0, annualTax: 0, ratePct: 0, monthlyNet: monthlyGross, code };
  if (!bands || bands.length === 0 || !(monthlyGross > 0)) return empty;

  const incomeRappen = Math.round(monthlyGross * 100);
  // Last band whose income-from is <= the income (bands are sorted ascending).
  let lo = 0;
  let hi = bands.length - 1;
  let idx = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (bands[mid][0] <= incomeRappen) {
      idx = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  const [, minRappen, pctX100] = bands[idx];
  const ratePct = pctX100 / 100;
  const byRate = monthlyGross * (ratePct / 100);
  const monthlyTax = Math.max(byRate, minRappen / 100);
  const rounded = Math.round(monthlyTax * 20) / 20; // round to 0.05 CHF (payroll convention)
  return {
    monthlyTax: rounded,
    annualTax: Math.round(rounded * 12 * 100) / 100,
    ratePct,
    monthlyNet: Math.round((monthlyGross - rounded) * 100) / 100,
    code,
  };
}

export interface QstInput {
  monthlyGross: number;
  group: QstGroup;
  children: number;
  church: boolean;
}

/** High-level entry: build the code from the situation, then compute. */
export function computeQst(input: QstInput, data: QstData): QstResult {
  const church = resolveChurch(data.church, input.church);
  const code = buildCode(input.group, input.children, church);
  return qstForCode(input.monthlyGross, data, code);
}
