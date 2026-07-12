/**
 * Shared salary-result renderer for BOTH the server render and the client
 * recompute (single source of truth). Locale-aware via a labels object; the
 * default is German and produces byte-identical output to the pre-i18n version.
 */
import type { DeductionLine, SalaryResult } from './engine';
import { formatCHF, formatPercent } from '../format';

export interface SalaryLabels {
  netPerYear: string;
  netPerMonth: string;
  colDeduction: string;
  colRate: string;
  colAmount: string;
  totalDeductions: string;
  grossPerYear: string;
  coordNote: (chf: string) => string;
  noBvgNote: string;
  deductionLabels: Record<DeductionLine['key'], string>;
}

export const SALARY_LABELS_DE: SalaryLabels = {
  netPerYear: 'Nettolohn pro Jahr',
  netPerMonth: 'Nettolohn pro Monat (÷ 12)',
  colDeduction: 'Abzug',
  colRate: 'Satz',
  colAmount: 'Betrag / Jahr',
  totalDeductions: 'Total Abzüge',
  grossPerYear: 'Bruttolohn pro Jahr',
  coordNote: (chf) => `Koordinierter Lohn für die BVG-Berechnung: ${chf}.`,
  noBvgNote: 'Keine obligatorische BVG-Deckung (unter Eintrittsschwelle oder unter 25 Jahre).',
  deductionLabels: {
    ahvIvEo: 'AHV / IV / EO',
    alv: 'ALV (Arbeitslosenversicherung)',
    nbu: 'NBU (Nichtberufsunfall)',
    bvg: 'BVG (Pensionskasse)',
  },
};

export const SALARY_LABELS_FR: SalaryLabels = {
  netPerYear: 'Salaire net par an',
  netPerMonth: 'Salaire net par mois (÷ 12)',
  colDeduction: 'Déduction',
  colRate: 'Taux',
  colAmount: 'Montant / an',
  totalDeductions: 'Total des déductions',
  grossPerYear: 'Salaire brut par an',
  coordNote: (chf) => `Salaire coordonné pour le calcul LPP : ${chf}.`,
  noBvgNote: 'Pas de couverture LPP obligatoire (sous le seuil d’entrée ou moins de 25 ans).',
  deductionLabels: {
    ahvIvEo: 'AVS / AI / APG',
    alv: 'AC (assurance-chômage)',
    nbu: 'AANP (accidents non prof.)',
    bvg: 'LPP (prévoyance prof.)',
  },
};

export function renderResultHtml(r: SalaryResult, labels: SalaryLabels = SALARY_LABELS_DE): string {
  const rows = r.deductions
    .map(
      (d) => `<tr class="border-b border-slate-100">
        <td class="py-2 pr-2 text-slate-700">${labels.deductionLabels[d.key]}</td>
        <td class="py-2 px-2 text-right tabular-nums text-slate-500">${d.base > 0 ? formatPercent(d.rate) : '–'}</td>
        <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(d.amount)}</td>
      </tr>`,
    )
    .join('');

  const coordNote =
    r.coordinatedSalary > 0
      ? `<p class="mt-2 text-xs text-slate-500">${labels.coordNote(formatCHF(r.coordinatedSalary))}</p>`
      : `<p class="mt-2 text-xs text-slate-500">${labels.noBvgNote}</p>`;

  return `
    <div class="rounded-lg bg-slate-50 p-5">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span class="text-sm text-slate-600">${labels.netPerYear}</span>
        <span class="text-3xl font-bold text-slate-900 tabular-nums">${formatCHF(r.annualNet)}</span>
      </div>
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <span class="text-sm text-slate-600">${labels.netPerMonth}</span>
        <span class="text-xl font-semibold text-slate-800 tabular-nums">${formatCHF(r.monthlyNet)}</span>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <th class="py-1 pr-2 text-left font-medium">${labels.colDeduction}</th>
            <th class="py-1 px-2 text-right font-medium">${labels.colRate}</th>
            <th class="py-1 pl-2 text-right font-medium">${labels.colAmount}</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr class="border-t-2 border-slate-300 font-semibold">
            <td class="py-2 pr-2 text-slate-900">${labels.totalDeductions}</td>
            <td></td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.totalDeductions)}</td>
          </tr>
          <tr>
            <td class="py-2 pr-2 text-slate-600">${labels.grossPerYear}</td>
            <td></td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-600">${formatCHF(r.annualGross)}</td>
          </tr>
        </tbody>
      </table>
      ${coordNote}
    </div>`;
}
