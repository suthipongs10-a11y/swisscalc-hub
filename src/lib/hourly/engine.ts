/**
 * Stundenlohn engine — pure conversion between monthly salary and hourly wage
 * under Swiss payroll conventions (data: /src/data/hourly-wage-2026.json).
 *
 * Model (documented on the tool's methodology section):
 * - A monthly salary already includes paid vacation. Its base hourly equivalent
 *   is  monthly × 12 / (52 × hoursPerWeek).
 * - On an hourly contract, vacation is compensated via the statutory supplement
 *   (OR Art. 329a/d): +8.33% (4 weeks), +10.64% (5 weeks), +13.04% (6 weeks)
 *   on the base rate.
 * - A contractual 13th month salary adds 8.33% (1/12), calculated on the
 *   vacation-inclusive rate (the 13th is owed on vacation pay as well).
 */
import wageData from '../../data/hourly-wage-2026.json';

export type VacationWeeks = 4 | 5 | 6;
export type Direction = 'toHourly' | 'toMonthly';

export interface HourlyInput {
  direction: Direction;
  /** Monthly salary in CHF (toHourly) or base hourly rate in CHF (toMonthly). */
  amount: number;
  hoursPerWeek: number;
  vacationWeeks: VacationWeeks;
  thirteenth: boolean;
}

export interface HourlyResult {
  baseHourly: number;
  vacationPct: number;
  vacationPerHour: number;
  thirteenthPct: number;
  thirteenthPerHour: number;
  /** Base + vacation (+ 13th where selected) — the hourly-contract rate. */
  totalHourly: number;
  /** Average paid hours per month: hoursPerWeek × 52 / 12. */
  monthlyHours: number;
  /** Monthly salary with the same annual base pay (paid vacation included). */
  monthlyBase: number;
  annualBase: number;
  hoursPerWeek: number;
  vacationWeeks: VacationWeeks;
}

export const DEFAULT_HOURS_PER_WEEK: number = wageData.defaultHoursPerWeek;
export const VACATION_SUPPLEMENTS: Record<string, number> = wageData.vacationSupplements;
export const THIRTEENTH_PCT: number = wageData.thirteenthPct;

const round2 = (v: number) => Math.round(v * 100) / 100;

export function convertWage(input: HourlyInput): HourlyResult {
  const { direction, amount, vacationWeeks, thirteenth } = input;
  const hoursPerWeek = input.hoursPerWeek > 0 ? input.hoursPerWeek : DEFAULT_HOURS_PER_WEEK;
  const weeks = wageData.weeksPerYear;
  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;

  const baseHourly =
    direction === 'toHourly' ? (safeAmount * 12) / (weeks * hoursPerWeek) : safeAmount;

  const vacationPct = VACATION_SUPPLEMENTS[String(vacationWeeks)] ?? VACATION_SUPPLEMENTS['4']!;
  const vacationPerHour = baseHourly * (vacationPct / 100);
  const thirteenthPct = thirteenth ? THIRTEENTH_PCT : 0;
  const thirteenthPerHour = (baseHourly + vacationPerHour) * (thirteenthPct / 100);
  const totalHourly = baseHourly + vacationPerHour + thirteenthPerHour;

  const monthlyHours = (hoursPerWeek * weeks) / 12;
  const monthlyBase = baseHourly * monthlyHours;
  const annualBase = baseHourly * hoursPerWeek * weeks;

  return {
    baseHourly: round2(baseHourly),
    vacationPct,
    vacationPerHour: round2(vacationPerHour),
    thirteenthPct,
    thirteenthPerHour: round2(thirteenthPerHour),
    totalHourly: round2(totalHourly),
    monthlyHours: round2(monthlyHours),
    monthlyBase: round2(monthlyBase),
    annualBase: round2(annualBase),
    hoursPerWeek,
    vacationWeeks,
  };
}
