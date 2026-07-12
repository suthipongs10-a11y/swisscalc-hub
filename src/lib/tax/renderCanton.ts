/**
 * Shared renderer for the per-canton calculator breakdown (server + client).
 */
import { cantonTax, compareCantons, type Relationship } from './engine';
import { cantonName } from './renderComparison';
import { formatCHF, formatPercent } from '../format';

export function renderCantonHtml(taxableIncome: number, abbr: string, relationship: Relationship): string {
  const r = cantonTax(taxableIncome, abbr, relationship);
  const ranking = compareCantons(taxableIncome, relationship);
  const rank = ranking.findIndex((x) => x.abbr === abbr) + 1;
  const cheapest = ranking[0];
  const delta = cheapest ? r.totalTax - cheapest.totalTax : 0;

  const rankNote =
    cheapest && cheapest.abbr === abbr
      ? `<p class="mt-2 text-xs text-emerald-700">Günstigster Kantonshauptort der Schweiz bei diesem Einkommen.</p>`
      : `<p class="mt-2 text-xs text-slate-500">Rang ${rank} von 26 Hauptorten bei diesem Einkommen — ${formatCHF(delta, 0)} mehr als ${cheapest ? cantonName(cheapest.abbr) : '–'}. <a class="underline" href="/steuervergleich/">Zum vollständigen Vergleich</a></p>`;

  return `
    <div class="rounded-lg bg-slate-50 p-5">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <span class="text-sm text-slate-600">Steuern total pro Jahr (${r.capital})</span>
        <span class="text-3xl font-bold text-slate-900 tabular-nums">${formatCHF(r.totalTax)}</span>
      </div>
      <table class="w-full text-sm">
        <tbody>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">Einfache Staatssteuer (${abbr}-Tarif)</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.baseTax)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">Kantonssteuer</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.cantonTax)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">Gemeindesteuer ${r.capital}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.cityTax)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">Direkte Bundessteuer</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.federalTax)}</td>
          </tr>
          <tr class="font-semibold">
            <td class="py-2 pr-2 text-slate-900">Effektiver Steuersatz</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatPercent(r.effectiveRate)}</td>
          </tr>
        </tbody>
      </table>
      ${rankNote}
    </div>`;
}
