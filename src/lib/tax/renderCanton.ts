/**
 * Shared renderer for the per-canton calculator breakdown (server + client).
 * Locale-aware via a labels object; the German default is byte-identical to
 * the pre-i18n version.
 */
import { cantonTax, compareCantons, type Relationship } from './engine';
import { formatCHF, formatPercent } from '../format';
import { CANTON_RENDER_LABELS_DE, type CantonRenderLabels } from './labels';

export function renderCantonHtml(
  taxableIncome: number,
  abbr: string,
  relationship: Relationship,
  labels: CantonRenderLabels = CANTON_RENDER_LABELS_DE,
): string {
  const r = cantonTax(taxableIncome, abbr, relationship);
  const ranking = compareCantons(taxableIncome, relationship);
  const rank = ranking.findIndex((x) => x.abbr === abbr) + 1;
  const cheapest = ranking[0];
  const delta = cheapest ? r.totalTax - cheapest.totalTax : 0;
  const capital = labels.capitalOf(r.capital);

  const rankNote =
    cheapest && cheapest.abbr === abbr
      ? `<p class="mt-2 text-xs text-emerald-700">${labels.cheapestNote}</p>`
      : `<p class="mt-2 text-xs text-slate-500">${labels.rankNote(rank, formatCHF(delta, 0), cheapest ? labels.nameOf(cheapest.abbr) : '–')}</p>`;

  return `
    <div class="rounded-lg bg-slate-50 p-5">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <span class="text-sm text-slate-600">${labels.totalPerYear(capital)}</span>
        <span class="text-3xl font-bold text-slate-900 tabular-nums">${formatCHF(r.totalTax)}</span>
      </div>
      <table class="w-full text-sm">
        <tbody>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.baseTax(abbr)}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.baseTax)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.cantonTax}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.cantonTax)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.cityTax(capital)}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.cityTax)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.federalTax}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.federalTax)}</td>
          </tr>
          <tr class="font-semibold">
            <td class="py-2 pr-2 text-slate-900">${labels.effectiveRate}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatPercent(r.effectiveRate)}</td>
          </tr>
        </tbody>
      </table>
      ${rankNote}
    </div>`;
}
