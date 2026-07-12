/**
 * Shared renderer for the cross-canton comparison result table — used by the
 * server for the initial render and by the client island on recompute.
 */
import type { CantonTaxResult, Relationship } from './engine';
import { compareCantons } from './engine';
import { formatCHF, formatPercent } from '../format';

import cantonRegistry from '../../data/cantons.json';

const CANTONS = new Map(cantonRegistry.cantons.map((c) => [c.abbr, c]));

export function cantonName(abbr: string): string {
  return CANTONS.get(abbr)?.name ?? abbr;
}

export function cantonSlug(abbr: string): string | undefined {
  return CANTONS.get(abbr)?.slug;
}

export function renderComparisonHtml(taxableIncome: number, relationship: Relationship): string {
  const results = compareCantons(taxableIncome, relationship);
  const max = results[results.length - 1]?.totalTax ?? 1;

  const rows = results
    .map((r: CantonTaxResult, i: number) => {
      const barWidth = max > 0 ? Math.max(2, Math.round((r.totalTax / max) * 100)) : 0;
      return `<tr class="border-b border-slate-100${i === 0 ? ' bg-emerald-50' : ''}">
        <td class="py-2 pr-2 text-slate-500 tabular-nums">${i + 1}</td>
        <td class="py-2 pr-2 font-medium text-slate-900"><a href="/steuerrechner/${cantonSlug(r.abbr)}/" class="text-blue-700 hover:underline">${cantonName(r.abbr)}</a> <span class="text-xs text-slate-500">(${r.capital})</span></td>
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
    <p class="mb-4 text-sm text-slate-600">
      Bei ${formatCHF(taxableIncome, 0)} steuerbarem Einkommen liegen zwischen dem günstigsten
      (${cheapest ? cantonName(cheapest.abbr) : '–'}) und dem teuersten Kantonshauptort
      (${priciest ? cantonName(priciest.abbr) : '–'}) <strong>${formatCHF(delta, 0)} pro Jahr</strong>.
    </p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
            <th class="py-1 pr-2 font-medium">#</th>
            <th class="py-1 pr-2 font-medium">Kanton (Hauptort)</th>
            <th class="py-1 px-2 text-right font-medium">Steuern total</th>
            <th class="py-1 px-2 text-right font-medium">Effektiv</th>
            <th class="hidden py-1 pl-2 font-medium sm:table-cell"></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="mt-3 text-xs text-slate-500">
      Total = Kantons- + Gemeindesteuer (Hauptort) + direkte Bundessteuer, ohne Kirchensteuer.
      Basis: steuerbares Einkommen ${formatCHF(taxableIncome, 0)}.
    </p>`;
}
