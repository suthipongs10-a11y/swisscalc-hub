import { describe, expect, it } from 'vitest';
import wageData from '../src/data/hourly-wage-2026.json';
import { convertWage, DEFAULT_HOURS_PER_WEEK } from '../src/lib/hourly/engine';

describe('hourly wage data (M12)', () => {
  it('carries a _meta source block', () => {
    expect(wageData._meta.source).toMatch(/^https:/);
    expect(wageData._meta.legalBasis).toContain('329a');
  });

  it('vacation supplements are the OR-derived payroll constants', () => {
    // pct = weeks / (52 - weeks), rounded to 2 dp — the universal payroll figures.
    expect(wageData.vacationSupplements['4']).toBe(8.33);
    expect(wageData.vacationSupplements['5']).toBe(10.64);
    expect(wageData.vacationSupplements['6']).toBe(13.04);
    for (const [weeks, pct] of Object.entries(wageData.vacationSupplements)) {
      const w = Number(weeks);
      expect(pct).toBeCloseTo((w / (52 - w)) * 100, 1);
    }
    expect(wageData.thirteenthPct).toBe(8.33);
  });
});

describe('hourly wage engine (M12)', () => {
  it('monthly 6500 at 42h -> base hourly 35.71', () => {
    const r = convertWage({ direction: 'toHourly', amount: 6500, hoursPerWeek: 42, vacationWeeks: 4, thirteenth: false });
    expect(r.baseHourly).toBe(35.71);
    expect(r.monthlyHours).toBe(182);
    expect(r.annualBase).toBe(78000);
  });

  it('round-trips: hourly rate back to the same monthly salary', () => {
    const hourly = (6500 * 12) / (52 * 42);
    const r = convertWage({ direction: 'toMonthly', amount: hourly, hoursPerWeek: 42, vacationWeeks: 4, thirteenth: false });
    expect(r.monthlyBase).toBe(6500);
  });

  it('supplements: vacation on base, 13th on the vacation-inclusive rate', () => {
    const r = convertWage({ direction: 'toMonthly', amount: 30, hoursPerWeek: 42, vacationWeeks: 4, thirteenth: true });
    expect(r.vacationPerHour).toBe(2.5); // 30 × 8.33%
    expect(r.thirteenthPerHour).toBe(2.71); // (30 + 2.499) × 8.33%
    expect(r.totalHourly).toBe(35.21);
  });

  it('5 and 6 vacation weeks raise the supplement', () => {
    const base = { direction: 'toMonthly' as const, amount: 30, hoursPerWeek: 42, thirteenth: false };
    const r4 = convertWage({ ...base, vacationWeeks: 4 });
    const r5 = convertWage({ ...base, vacationWeeks: 5 });
    const r6 = convertWage({ ...base, vacationWeeks: 6 });
    expect(r5.vacationPerHour).toBeGreaterThan(r4.vacationPerHour);
    expect(r6.vacationPerHour).toBeGreaterThan(r5.vacationPerHour);
    expect(r6.vacationPct).toBe(13.04);
  });

  it('guards invalid input (zero/negative/NaN -> zero result, default hours)', () => {
    const r = convertWage({ direction: 'toHourly', amount: -5, hoursPerWeek: 0, vacationWeeks: 4, thirteenth: false });
    expect(r.baseHourly).toBe(0);
    expect(r.totalHourly).toBe(0);
    expect(r.hoursPerWeek).toBe(DEFAULT_HOURS_PER_WEEK);
  });
});
