/**
 * Shared renderer for the cross-canton comparison result table — used by the
 * server for the initial render and by the client island on recompute.
 * Locale-aware via a labels object; the German default is byte-identical to
 * the pre-i18n version.
 */
import type { CantonTaxResult, Relationship } from './engine';
import { compareCantons } from './engine';
import { formatCHF, formatPercent } from '../format';
import { COMPARISON_LABELS_DE, deName, cantonSlugOf, type ComparisonLabels } from './labels';

/** German canton name — kept for renderCanton.ts (canton pages are DE-only). */
export function cantonName(abbr: string): string {
  return deName(abbr);
}
export function cantonSlug(abbr: string): string | undefined {
  return cantonSlugOf(abbr);
}

export function renderComparisonHtml(
  taxableIncome: number,
  relationship: Relationship,
  labels: ComparisonLabels = COMPARISON_LABELS_DE,
): string {
  const results = compareCantons(taxableIncome, relationship);
  const max = results[results.length - 1]?.totalTax ?? 1;

  const rows = results
    .map((r: CantonTaxResult, i: number) => {
      const barWidth = max > 0 ? Math.max(2, Math.round((r.totalTax / max) * 100)) : 0;
      const href = labels.cantonHref(r.abbr);
      const nameCell = href
        ? `<a href="${href}" class="text-blue-700 hover:underline">${labels.nameOf(r.abbr)}</a>`
        : labels.nameOf(r.abbr);
      return `<tr class="border-b border-slate-100${i === 0 ? ' bg-emerald-50' : ''}">
        <td class="py-2 pr-2 text-slate-500 tabular-nums">${i + 1}</td>
        <td class="py-2 pr-2 font-medium text-slate-900">${nameCell} <span class="text-xs text-slate-500">(${r.capital})</span></td>
        <td class="py-2 px-2 text-right tabular-nums text-slate-900">${formatCHF(r.totalTax, 0)}</td>
        <td class="py-2 px-2 text-right tabular-nums text-slate-500">${formatPercent(r.effectiveRate)}</td>
        <td class="hidden py-2 pl-2 sm:table-cell" aria-hidden="true">
          <div class="h-2 rounded bg-blue-200" style="width:${barWidth}%"></div>
        </td>
      </tr>`;
    })
    .join('');

  const cheapest = results[0];
  const priciest = results[results.length - 1];
  const delta = cheapest && priciest ? priciest.totalTax - cheapest.totalTax : 0;

  return `
    <p class="mb-4 text-sm text-slate-600">${labels.introInner(
      formatCHF(taxableIncome, 0),
      cheapest ? labels.nameOf(cheapest.abbr) : '–',
      priciest ? labels.nameOf(priciest.abbr) : '–',
      formatCHF(delta, 0),
    )}</p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            <th class="py-1 pr-2 font-medium">${labels.colRank}</th>
            <th class="py-1 pr-2 font-medium">${labels.colCanton}</th>
            <th class="py-1 px-2 text-right font-medium">${labels.colTotal}</th>
            <th class="py-1 px-2 text-right font-medium">${labels.colEffective}</th>
            <th class="hidden py-1 pl-2 font-medium sm:table-cell"></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="mt-3 text-xs text-slate-500">${labels.footnoteInner(formatCHF(taxableIncome, 0))}</p>`;
}
