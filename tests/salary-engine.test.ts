import { describe, expect, it } from 'vitest';
import {
  calculateSalary,
  coordinatedSalary,
  retirementCreditRate,
  annualFromMonthly,
} from '../src/lib/salary/engine';

/**
 * Values are computed by hand from the official 2026 rates
 * (src/data/social-contributions-2026.json) and mirror the worked example
 * documented on the /brutto-netto-rechner/ methodology section.
 */
describe('salary engine — worked example (CHF 100k, age 40, NBU 1.4%)', () => {
  const r = calculateSalary({ annualGross: 100_000, age: 40, nbuRate: 0.014 });

  it('AHV/IV/EO = 5.3% of full gross', () => {
    expect(r.deductions.find((d) => d.key === 'ahvIvEo')!.amount).toBe(5_300);
  });
  it('ALV = 1.1% (below ceiling)', () => {
    expect(r.deductions.find((d) => d.key === 'alv')!.amount).toBe(1_100);
  });
  it('NBU = 1.4% (below ceiling)', () => {
    expect(r.deductions.find((d) => d.key === 'nbu')!.amount).toBe(1_400);
  });
  it('BVG = coordinated (capped 64260) x 10% x 50% employee share', () => {
    expect(r.coordinatedSalary).toBe(64_260);
    expect(r.deductions.find((d) => d.key === 'bvg')!.amount).toBe(3_213);
  });
  it('totals: net annual 88 987, net monthly 7 415.58', () => {
    expect(r.totalDeductions).toBe(11_013);
    expect(r.annualNet).toBe(88_987);
    expect(r.monthlyNet).toBe(7_415.58);
  });
});

describe('ceilings', () => {
  it('AHV/IV/EO has no ceiling', () => {
    const r = calculateSalary({ annualGross: 200_000, age: 40 });
    expect(r.deductions.find((d) => d.key === 'ahvIvEo')!.amount).toBe(10_600);
  });
  it('ALV caps the base at CHF 148 200', () => {
    const r = calculateSalary({ annualGross: 200_000, age: 40 });
    // 148200 * 0.011 = 1630.20
    expect(r.deductions.find((d) => d.key === 'alv')!.amount).toBe(1_630.2);
  });
});

describe('BVG coordinated salary (Art. 8 BVG)', () => {
  it('is zero below the entry threshold (< 22 680)', () => {
    expect(coordinatedSalary(20_000, 30)).toBe(0);
  });
  it('is zero below the insured age (< 25)', () => {
    expect(coordinatedSalary(80_000, 22)).toBe(0);
  });
  it('falls back to the minimum coordinated salary (3 780)', () => {
    // 25 000 - 26 460 < 0 -> minimum
    expect(coordinatedSalary(25_000, 30)).toBe(3_780);
  });
  it('caps at the maximum coordinated salary (64 260)', () => {
    expect(coordinatedSalary(150_000, 40)).toBe(64_260);
  });
  it('is gross minus coordination deduction in the normal range', () => {
    // 60 000 - 26 460 = 33 540
    expect(coordinatedSalary(60_000, 40)).toBe(33_540);
  });
});

describe('BVG retirement-credit rate by age band (Art. 16 BVG)', () => {
  it.each([
    [24, 0],
    [25, 0.07],
    [34, 0.07],
    [35, 0.1],
    [44, 0.1],
    [45, 0.15],
    [54, 0.15],
    [55, 0.18],
    [70, 0.18],
    [71, 0],
  ])('age %i -> %f', (age, rate) => {
    expect(retirementCreditRate(age)).toBe(rate);
  });
});

describe('BVG edge integration', () => {
  it('no BVG deduction under the entry threshold', () => {
    const r = calculateSalary({ annualGross: 20_000, age: 30 });
    expect(r.deductions.find((d) => d.key === 'bvg')!.amount).toBe(0);
  });
  it('minimum-coordinated case: 3 780 x 7% x 50% = 132.30', () => {
    const r = calculateSalary({ annualGross: 25_000, age: 30 });
    expect(r.deductions.find((d) => d.key === 'bvg')!.amount).toBe(132.3);
  });
  it('includeBvg=false zeroes BVG', () => {
    const r = calculateSalary({ annualGross: 100_000, age: 40, includeBvg: false });
    expect(r.deductions.find((d) => d.key === 'bvg')!.amount).toBe(0);
    expect(r.coordinatedSalary).toBe(0);
  });
});

describe('helpers & guards', () => {
  it('annualFromMonthly with 13 payouts', () => {
    expect(annualFromMonthly(6_500, 13)).toBe(84_500);
  });
  it('rejects negative gross', () => {
    expect(() => calculateSalary({ annualGross: -1, age: 40 })).toThrow();
  });
});
