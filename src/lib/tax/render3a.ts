/**
 * Shared renderer for the Saeule 3a savings result — server + client.
 */
import { cantonTax, type Relationship } from './engine';
import { cantonName } from './renderComparison';
import { formatCHF, formatPercent } from '../format';
import limits from '../../data/saeule-3a-2026.json';

export interface ThreeAInput {
  taxableIncome: number;
  contribution: number;
  canton: string;
  relationship: Relationship;
}

export function maxContribution(hasPensionFund: boolean, income: number): number {
  if (hasPensionFund) return limits.withPensionFund;
  return Math.min(income * limits.withoutPensionFund.rateOfIncome, limits.withoutPensionFund.cap);
}

export function render3aHtml(input: ThreeAInput): string {
  const { taxableIncome, contribution, canton, relationship } = input;
  const before = cantonTax(taxableIncome, canton, relationship);
  const after = cantonTax(Math.max(0, taxableIncome - contribution), canton, relationship);
  const saving = Math.round((before.totalTax - after.totalTax) * 100) / 100;
  const savingRate = contribution > 0 ? saving / contribution : 0;

  return `
    <div class="rounded-lg bg-slate-50 p-5">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span class="text-sm text-slate-600">Ihre Steuerersparnis pro Jahr</span>
        <span class="text-3xl font-bold text-emerald-700 tabular-nums">${formatCHF(saving)}</span>
      </div>
      <table class="w-full text-sm">
        <tbody>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">Steuern ohne 3a-Einzahlung</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(before.totalTax)}</td>
          </tr>
          <tr class="border-b border-slate-100">
            <td class="py-2 pr-2 text-slate-700">Steuern mit Einzahlung von ${formatCHF(contribution, 0)}</td>
            <td class="py-2 pl-2 text-right tabular-nums text-slate-900">${formatCHF(after.totalTax)}</td>
          </tr>
          <tr class="font-semibold">
            <td class="py-2 pr-2 text-slate-900">Ersparnis (≈ ${formatPercent(savingRate)} der Einzahlung)</td>
            <td class="py-2 pl-2 text-right tabular-nums text-emerald-700">${formatCHF(saving)}</td>
          </tr>
        </tbody>
      </table>
      <p class="mt-2 text-xs text-slate-500">
        Kanton ${cantonName(canton)} (Hauptort), inkl. direkter Bundessteuer, ohne Kirchensteuer.
        Steuerbares Einkommen vor Einzahlung: ${formatCHF(taxableIncome, 0)}.
      </p>
    </div>`;
}
