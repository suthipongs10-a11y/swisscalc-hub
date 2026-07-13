/**
 * Shared renderer for the Quellensteuer result box (server default + client
 * recompute). Locale-aware via a labels object.
 */
import type { QstResult } from './engine';
import { formatCHF, formatPercent } from '../format';

export interface QstLabels {
  perMonth: string;
  rate: string;
  perYear: string;
  netPerMonth: string;
  codeNote: (code: string) => string;
  noData: string;
}

export const QST_LABELS_DE: QstLabels = {
  perMonth: 'Quellensteuer pro Monat',
  rate: 'Effektiver Steuersatz',
  perYear: 'Quellensteuer pro Jahr',
  netPerMonth: 'Nettolohn pro Monat',
  codeNote: (code) => `Tarifcode ${code} · monatlicher Bruttolohn als Bemessungsgrundlage`,
  noData: 'Für diese Kombination liegt kein Tarif vor.',
};

export const QST_LABELS_FR: QstLabels = {
  perMonth: 'Impôt à la source par mois',
  rate: 'Taux d’imposition effectif',
  perYear: 'Impôt à la source par an',
  netPerMonth: 'Salaire net par mois',
  codeNote: (code) => `Barème ${code} · salaire mensuel brut comme base de calcul`,
  noData: 'Aucun barème disponible pour cette combinaison.',
};

export const QST_LABELS_EN: QstLabels = {
  perMonth: 'Withholding tax per month',
  rate: 'Effective tax rate',
  perYear: 'Withholding tax per year',
  netPerMonth: 'Net salary per month',
  codeNote: (code) => `Tariff code ${code} · monthly gross salary as the basis`,
  noData: 'No tariff available for this combination.',
};

export function renderQstHtml(r: QstResult, labels: QstLabels = QST_LABELS_DE): string {
  if (!r.code || r.ratePct === 0 && r.monthlyTax === 0 && r.monthlyNet === 0) {
    return `<div class="rounded-lg bg-amber-50 p-5 text-sm text-amber-900">${labels.noData}</div>`;
  }
  return `
    <div class="rounded-lg bg-slate-50 p-5">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <span class="text-sm text-slate-600">${labels.perMonth}</span>
        <span class="text-3xl font-bold text-slate-900 tabular-nums">${formatCHF(r.monthlyTax)}</span>
      </div>
      <table class="w-full text-sm">
        <tbody>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.rate}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatPercent(r.ratePct / 100)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.perYear}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.annualTax)}</td>
          </tr>
          <tr class="font-semibold">
            <td class="py-2 pr-2 text-slate-900">${labels.netPerMonth}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.monthlyNet)}</td>
          </tr>
        </tbody>
      </table>
      <p class="mt-2 text-xs text-slate-500">${labels.codeNote(r.code)}</p>
    </div>`;
}
