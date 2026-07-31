import { describe, expect, it } from 'vitest';
import {
  federalTax,
  cantonalBaseTax,
  cityBaseTax,
  cantonTax,
  cantonTaxAtMultiplier,
  cantonMultipliers,
  compareCantons,
  ALL_CANTONS,
  evaluateFormula,
} from '../src/lib/tax/engine';
import statsData from '../src/data/tax/canton-stats-2026.json';

/**
 * Pinned values are computed INDEPENDENTLY (Python implementation of the same
 * official ESTV table semantics, see STATUS.md session log) from the derived
 * data in /src/data/tax/. Cent-level rounding may differ between
 * implementations, hence toBeCloseTo(…, 1) = ±5 Rappen.
 *
 * Cross-implementation caveat: absolute correctness vs the official ESTV
 * calculator must be spot-checked once outside the sandbox (owner checklist).
 */
const close = (actual: number, expected: number) => expect(actual).toBeCloseTo(expected, 1);

describe('federal tax (dBSt tariff 2026)', () => {
  it('single 100k = 2684.35', () => close(federalTax(100_000, 'single'), 2684.35));
  it('married 100k = 1816.00', () => close(federalTax(100_000, 'married'), 1816.0));
  it('single 50k = 400.80', () => close(federalTax(50_000, 'single'), 400.8));
  it('married 120k = 2929.00', () => close(federalTax(120_000, 'married'), 2929.0));
  it('below threshold = 0', () => {
    expect(federalTax(14_000, 'single')).toBe(0);
    expect(federalTax(0, 'single')).toBe(0);
  });
  it('rounds income down to 100 first', () => {
    expect(federalTax(100_099, 'single')).toBe(federalTax(100_000, 'single'));
  });
});

describe('cantonal base tax across table types (single, 100k)', () => {
  it('ZH (ZUERICH bands) = 6170.00', () => close(cantonalBaseTax(100_000, 'ZH', 'single'), 6170.0));
  it('ZG (BUND thresholds) = 5634.50', () => close(cantonalBaseTax(100_000, 'ZG', 'single'), 5634.5));
  it('GE (ALLE + splitting) = 10177.44', () => close(cantonalBaseTax(100_000, 'GE', 'single'), 10177.44));
  it('BL (FORMEL log) = 11218.97', () => close(cantonalBaseTax(100_000, 'BL', 'single'), 11218.97));
  it('FR (FREIBURG interpolated) = 10790.63', () => close(cantonalBaseTax(100_000, 'FR', 'single'), 10790.63));
  it('UR (FLATTAX) = 7100.00', () => close(cantonalBaseTax(100_000, 'UR', 'single'), 7100.0));
  it('VS = 13500.00', () => close(cantonalBaseTax(100_000, 'VS', 'single'), 13_500.0));
});

describe('city tarif override (SZ/VS have own municipal scales)', () => {
  it('VS city base uses the Sion municipal tarif (9100, not 13500)', () => {
    close(cityBaseTax(100_000, 'VS', 'single'), 9100.0);
  });
  it('other cantons: city base equals cantonal base', () => {
    expect(cityBaseTax(100_000, 'ZH', 'single')).toBe(cantonalBaseTax(100_000, 'ZH', 'single'));
  });
});

describe('full canton results at capitals (single, 100k, ohne Kirchensteuer)', () => {
  it('ZH: canton 5861.50 + city 7342.30 + fed = 15888.15', () => {
    const r = cantonTax(100_000, 'ZH', 'single');
    close(r.cantonTax, 5861.5);
    close(r.cityTax, 7342.3);
    close(r.totalTax, 15_888.15);
  });
  it('ZG total = 10009.20', () => close(cantonTax(100_000, 'ZG', 'single').totalTax, 10_009.2));
  it('GE total = 22325.79', () => close(cantonTax(100_000, 'GE', 'single').totalTax, 22_325.79));
  it('VS total = 26194.35 (with municipal-tarif override)', () =>
    close(cantonTax(100_000, 'VS', 'single').totalTax, 26_194.35));
  it('SZ total = 12157.46', () => close(cantonTax(100_000, 'SZ', 'single').totalTax, 12_157.46));
  it('ZH married total = 11966.02', () => close(cantonTax(100_000, 'ZH', 'married').totalTax, 11_966.02));
  it('VS 60k single total = 12251.40', () => close(cantonTax(60_000, 'VS', 'single').totalTax, 12_251.4));
});

describe('comparison invariants (all 26 cantons)', () => {
  it('covers exactly 26 cantons', () => {
    expect(ALL_CANTONS).toHaveLength(26);
    expect(compareCantons(100_000, 'single')).toHaveLength(26);
  });
  it('is sorted ascending by total', () => {
    const r = compareCantons(100_000, 'single');
    for (let i = 1; i < r.length; i++) expect(r[i]!.totalTax).toBeGreaterThanOrEqual(r[i - 1]!.totalTax);
  });
  it('ZG is cheapest at 100k single, followed by SZ', () => {
    const r = compareCantons(100_000, 'single');
    expect(r[0]!.abbr).toBe('ZG');
    expect(r[1]!.abbr).toBe('SZ');
  });
  it('monotonic in income for every canton', () => {
    const incomes = [0, 20_000, 40_000, 60_000, 80_000, 100_000, 150_000, 250_000, 500_000, 1_000_000];
    for (const abbr of ALL_CANTONS) {
      let prev = -1;
      for (const income of incomes) {
        const t = cantonTax(income, abbr, 'single').totalTax;
        expect(t, `${abbr} at ${income}`).toBeGreaterThanOrEqual(prev - 0.01);
        prev = t;
      }
    }
  });
  it('married pays at most single at 100k in every canton', () => {
    for (const abbr of ALL_CANTONS) {
      const s = cantonTax(100_000, abbr, 'single').totalTax;
      const m = cantonTax(100_000, abbr, 'married').totalTax;
      expect(m, abbr).toBeLessThanOrEqual(s + 0.01);
    }
  });
  it('zero income = zero tax everywhere', () => {
    for (const abbr of ALL_CANTONS) {
      expect(cantonTax(0, abbr, 'single').totalTax).toBe(0);
    }
  });
});

describe('cantonTaxAtMultiplier (municipal spread)', () => {
  const stats = statsData.cantons as Record<string, { minCity: { pct: number }; maxCity: { pct: number } }>;

  it('reproduces cantonTax exactly at the capital multiplier', () => {
    for (const abbr of ALL_CANTONS) {
      const { cityPct } = cantonMultipliers(abbr);
      const at = cantonTaxAtMultiplier(100_000, abbr, 'single', cityPct);
      close(at.totalTax, cantonTax(100_000, abbr, 'single').totalTax);
    }
  });

  it('cheapest municipality never costs more than the most expensive one', () => {
    for (const abbr of ALL_CANTONS) {
      const s = stats[abbr]!;
      const min = cantonTaxAtMultiplier(100_000, abbr, 'single', s.minCity.pct).totalTax;
      const max = cantonTaxAtMultiplier(100_000, abbr, 'single', s.maxCity.pct).totalTax;
      expect(max, abbr).toBeGreaterThanOrEqual(min - 0.01);
    }
  });

  it('the capital lies inside its own canton municipal range', () => {
    for (const abbr of ALL_CANTONS) {
      const s = stats[abbr]!;
      const { cityPct } = cantonMultipliers(abbr);
      expect(cityPct, `${abbr} min`).toBeGreaterThanOrEqual(s.minCity.pct - 0.01);
      expect(cityPct, `${abbr} max`).toBeLessThanOrEqual(s.maxCity.pct + 0.01);
    }
  });

  it('a zero municipal multiplier drops the municipal share entirely', () => {
    const r = cantonTaxAtMultiplier(100_000, 'ZH', 'single', 0);
    expect(r.cityTax).toBe(0);
    close(r.totalTax, r.cantonTax + r.federalTax);
  });
});

describe('formula evaluator (BL FORMEL)', () => {
  it('evaluates the documented expression shape', () => {
    // -0.827548*w + 0.089722*w*(ln w - 1) + 830.223746 at w = 100000
    const expected = -0.827548 * 100_000 + 0.089722 * 100_000 * (Math.log(100_000) - 1) + 830.223746;
    close(evaluateFormula('-0.827548* $wert$ + 0.089722* $wert$ * (log $wert$ - 1) + 830.223746', 100_000), expected);
  });
  it('rejects unknown variables', () => {
    expect(() => evaluateFormula('$foo$ + 1', 5)).toThrow();
  });
});
