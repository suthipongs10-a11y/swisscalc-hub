/**
 * Shared renderer for the Stundenlohn result box (server default + client
 * recompute). Locale-aware via a labels object, mirroring qst/render.ts.
 */
import type { HourlyResult } from './engine';
import { formatCHF, formatNumber } from '../format';

export interface HourlyLabels {
  baseHourly: string;
  vacation: (pct: number, weeks: number) => string;
  thirteenth: (pct: number) => string;
  totalHourly: string;
  monthlyEquivalent: (hours: number) => string;
  annualBase: string;
  note: string;
  invalid: string;
}

export const HOURLY_LABELS_DE: HourlyLabels = {
  baseHourly: 'Stundenlohn (Basis)',
  vacation: (pct, weeks) => `+ Ferienentschädigung ${formatNumber(pct, 2)}% (${weeks} Wochen)`,
  thirteenth: (pct) => `+ 13. Monatslohn ${formatNumber(pct, 2)}%`,
  totalHourly: 'Stundenlohn inkl. Zuschläge',
  monthlyEquivalent: (hours) => `Monatslohn-Äquivalent (${formatNumber(hours, 1)} Std./Monat)`,
  annualBase: 'Jahreslohn (Basis)',
  note: 'Bruttowerte vor Sozialabzügen. Ferien- und 13.-Monatslohn-Zuschläge nach Schweizer Lohnpraxis (OR Art. 329a/d).',
  invalid: 'Bitte einen Betrag grösser als 0 eingeben.',
};

export const HOURLY_LABELS_FR: HourlyLabels = {
  baseHourly: 'Salaire horaire (base)',
  vacation: (pct, weeks) => `+ Indemnité de vacances ${formatNumber(pct, 2)}% (${weeks} semaines)`,
  thirteenth: (pct) => `+ 13e salaire ${formatNumber(pct, 2)}%`,
  totalHourly: 'Salaire horaire suppléments inclus',
  monthlyEquivalent: (hours) => `Équivalent salaire mensuel (${formatNumber(hours, 1)} h/mois)`,
  annualBase: 'Salaire annuel (base)',
  note: 'Valeurs brutes avant déductions sociales. Suppléments vacances et 13e salaire selon la pratique salariale suisse (CO art. 329a/d).',
  invalid: 'Veuillez saisir un montant supérieur à 0.',
};

export const HOURLY_LABELS_EN: HourlyLabels = {
  baseHourly: 'Hourly wage (base)',
  vacation: (pct, weeks) => `+ Vacation compensation ${formatNumber(pct, 2)}% (${weeks} weeks)`,
  thirteenth: (pct) => `+ 13th month salary ${formatNumber(pct, 2)}%`,
  totalHourly: 'Hourly wage incl. supplements',
  monthlyEquivalent: (hours) => `Monthly salary equivalent (${formatNumber(hours, 1)} h/month)`,
  annualBase: 'Annual salary (base)',
  note: 'Gross values before social contributions. Vacation and 13th-month supplements per Swiss payroll practice (CO Art. 329a/d).',
  invalid: 'Please enter an amount greater than 0.',
};

export function renderHourlyHtml(r: HourlyResult, labels: HourlyLabels = HOURLY_LABELS_DE): string {
  if (r.baseHourly <= 0) {
    return `<div class="rounded-lg bg-amber-50 p-5 text-sm text-amber-900">${labels.invalid}</div>`;
  }
  const thirteenthRow =
    r.thirteenthPct > 0
      ? `<tr class="border-b border-slate-100">
          <td class="py-2 pr-2 text-slate-700">${labels.thirteenth(r.thirteenthPct)}</td>
          <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.thirteenthPerHour)}</td>
        </tr>`
      : '';
  return `
    <div class="rounded-lg bg-slate-50 p-5">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <span class="text-sm text-slate-600">${labels.totalHourly}</span>
        <span class="text-3xl font-bold text-slate-900 tabular-nums">${formatCHF(r.totalHourly)}</span>
      </div>
      <table class="w-full text-sm">
        <tbody>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.baseHourly}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.baseHourly)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.vacation(r.vacationPct, r.vacationWeeks)}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.vacationPerHour)}</td>
          </tr>
          ${thirteenthRow}
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">${labels.monthlyEquivalent(r.monthlyHours)}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.monthlyBase)}</td>
          </tr>
          <tr class="font-semibold">
            <td class="py-2 pr-2 text-slate-900">${labels.annualBase}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(r.annualBase)}</td>
          </tr>
        </tbody>
      </table>
      <p class="mt-2 text-xs text-slate-500">${labels.note}</p>
    </div>`;
}
