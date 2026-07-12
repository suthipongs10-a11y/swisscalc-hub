/**
 * Shared result renderer used by BOTH the server (initial render) and the
 * client script (recompute on input) so the markup is identical and there is
 * one source of truth. Returns an HTML string.
 */
import type { SalaryResult } from './engine';
import { formatCHF, formatPercent } from '../format';

export function renderResultHtml(r: SalaryResult): string {
  const rows = r.deductions
    .map(
      (d) => `<tr class="border-b border-slate-100">
        <td class="py-2 pr-2 text-slate-700">${d.label}</td>
        <td class="py-2 px-2 text-right tabular-nums text-slate-500">${d.base > 0 ? formatPercent(d.rate) : '–'}</td>
        <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(d.amount)}</td>
      </tr>`,
    )
    .join('');

  const coordNote =
    r.coordinatedSalary > 0
      ? `<p class="mt-2 text-xs text-slate-500">Koordinierter Lohn für die BVG-Berechnung: ${formatCHF(r.coordinatedSalary)}.</p>`
      : `<p class="mt-2 text-xs text-slate-500">Keine obligatorische BVG-Deckung (unter Eintrittsschwelle oder unter 25 Jahre).</p>`;

  return `
    <div class="rounded-lg bg-slate-50 p-5">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span class="text-sm text-slate-600">Nettolohn pro Jahr</span>
        <span class="text-3xl font-bold text-slate-900 tabular-nums">${formatCHF(r.annualNet)}</span>
      </div>
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <span class="text-sm text-slate-600">Nettolohn pro Monat (÷ 12)</span>
        <span class="text-xl font-semibold text-slate-800 tabular-nums">${formatCHF(r.monthlyNet)}</span>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <th class="py-1 pr-2 text-left font-medium">Abzug</th>
            <th class="py-1 px-2 text-right font-medium">Satz</th>
            <th class="py-1 pl-2 text-right font-medium">Betrag / Jahr</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
          <tr class="border-t-2 border-slate-300 font-semibold">
            <td class="py-2 pr-2 text-slate-900">Total Abzüge</td>
            <td></td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.totalDeductions)}</td>
          </tr>
          <tr>
            <td class="py-2 pr-2 text-slate-600">Bruttolohn pro Jahr</td>
            <td></td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-600">${formatCHF(r.annualGross)}</td>
          </tr>
        </tbody>
      </table>
      ${coordNote}
    </div>`;
}
