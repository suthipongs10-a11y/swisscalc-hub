/**
 * Shared renderer for the cross-canton Quellensteuer comparison table
 * (server default + client recompute). Canton names/links arrive as metadata
 * so the same renderer serves all three locales.
 */
import type { CompareRow } from './compare';
import { formatCHF, formatPercent } from '../format';

export interface CompareCantonMeta {
  abbr: string;
  name: string;
  href: string;
  annual: boolean;
}

export interface CompareLabels {
  rank: string;
  canton: string;
  perMonth: string;
  rate: string;
  perYear: string;
  cheapest: string;
  mostExpensive: string;
  annualModelNote: string;
  noData: string;
}

export const COMPARE_LABELS_DE: CompareLabels = {
  rank: 'Rang',
  canton: 'Kanton',
  perMonth: 'QST/Monat',
  rate: 'Satz',
  perYear: 'QST/Jahr',
  cheapest: 'günstigster Kanton',
  mostExpensive: 'teuerster Kanton',
  annualModelNote: '* Jahresmodell (FR, GE, TI, VD, VS): unregelmässige Löhne werden über das Jahr geglättet.',
  noData: 'Für diese Kombination liegen keine Tarife vor.',
};

export const COMPARE_LABELS_FR: CompareLabels = {
  rank: 'Rang',
  canton: 'Canton',
  perMonth: 'IS/mois',
  rate: 'Taux',
  perYear: 'IS/an',
  cheapest: 'canton le moins cher',
  mostExpensive: 'canton le plus cher',
  annualModelNote: '* Modèle annuel (FR, GE, TI, VD, VS) : les salaires irréguliers sont lissés sur l’année.',
  noData: 'Aucun barème disponible pour cette combinaison.',
};

export const COMPARE_LABELS_EN: CompareLabels = {
  rank: 'Rank',
  canton: 'Canton',
  perMonth: 'WHT/month',
  rate: 'Rate',
  perYear: 'WHT/year',
  cheapest: 'cheapest canton',
  mostExpensive: 'most expensive canton',
  annualModelNote: '* Annual model (FR, GE, TI, VD, VS): irregular salaries are smoothed across the year.',
  noData: 'No tariffs available for this combination.',
};

export function renderCompareHtml(
  rows: CompareRow[],
  meta: CompareCantonMeta[],
  labels: CompareLabels = COMPARE_LABELS_DE,
): string {
  if (rows.length === 0) {
    return `<div class="rounded-lg bg-amber-50 p-5 text-sm text-amber-900">${labels.noData}</div>`;
  }
  const metaByAbbr = new Map(meta.map((m) => [m.abbr, m]));
  const hasAnnual = rows.some((r) => metaByAbbr.get(r.abbr)?.annual);
  const body = rows
    .map((r, i) => {
      const m = metaByAbbr.get(r.abbr);
      const name = m ? m.name : r.abbr;
      const star = m?.annual ? '*' : '';
      // Underlined by default: on the tinted first/last rows a colour-only link
      // fails WCAG "link in text block" / contrast checks.
      const link = m
        ? `<a href="${m.href}" class="text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700">${name}</a>`
        : name;
      const tone = i === 0 ? ' bg-emerald-50' : i === rows.length - 1 ? ' bg-rose-50' : '';
      const badge =
        i === 0
          ? ` <span class="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">${labels.cheapest}</span>`
          : i === rows.length - 1
            ? ` <span class="ml-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-800">${labels.mostExpensive}</span>`
            : '';
      return `<tr class="border-b border-slate-100${tone}">
        <td class="py-2 pr-2 tabular-nums text-slate-600">${i + 1}</td>
        <td class="py-2 pr-2">${link}${star}${badge}</td>
        <td class="py-2 px-2 text-right tabular-nums font-medium text-slate-900">${formatCHF(r.monthlyTax)}</td>
        <td class="py-2 px-2 text-right tabular-nums text-slate-700">${formatPercent(r.ratePct / 100)}</td>
        <td class="py-2 pl-2 text-right tabular-nums text-slate-700">${formatCHF(r.annualTax, 0)}</td>
      </tr>`;
    })
    .join('');
  const note = hasAnnual ? `<p class="mt-2 text-xs text-slate-500">${labels.annualModelNote}</p>` : '';
  return `
    <div class="overflow-x-auto">
      <table class="w-full min-w-[28rem] text-sm">
        <thead>
          <tr class="border-b border-slate-300 text-left">
            <th class="py-2 pr-2 font-semibold">${labels.rank}</th>
            <th class="py-2 pr-2 font-semibold">${labels.canton}</th>
            <th class="py-2 px-2 text-right font-semibold">${labels.perMonth}</th>
            <th class="py-2 px-2 text-right font-semibold">${labels.rate}</th>
            <th class="py-2 pl-2 text-right font-semibold">${labels.perYear}</th>
          </tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>${note}`;
}
