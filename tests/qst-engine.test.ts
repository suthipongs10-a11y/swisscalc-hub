import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildCode, resolveChurch, qstForCode, computeQst, type QstData } from '../src/lib/qst/engine';
import qstIndex from '../src/data/qst/index.json';

// Tiny synthetic tariff (rappen, rappen, pct*100): 1.00–800.99 @ 0.25%, 801.00–10000.99 @ 7.20%, 10001+ @ 15%.
const FIXTURE: QstData = {
  church: 'both',
  codes: {
    A0N: [
      [100, 0, 25],
      [80100, 0, 720],
      [1000100, 0, 1500],
    ],
    H1N: [[100, 5000, 25]], // min tax CHF 50
  },
};

describe('QST code building', () => {
  it('builds tariff codes from the situation', () => {
    expect(buildCode('A', 3, 'N')).toBe('A0N'); // A ignores children
    expect(buildCode('B', 0, 'N')).toBe('B0N');
    expect(buildCode('C', 2, 'Y')).toBe('C2Y');
    expect(buildCode('H', 0, 'N')).toBe('H1N'); // H has at least 1 child
    expect(buildCode('H', 3, 'Y')).toBe('H3Y');
  });

  it('resolves church per canton availability', () => {
    expect(resolveChurch('N', true)).toBe('N'); // canton has no church tariff → N
    expect(resolveChurch('Y', false)).toBe('Y');
    expect(resolveChurch('both', true)).toBe('Y');
    expect(resolveChurch('both', false)).toBe('N');
  });
});

describe('QST band lookup', () => {
  it('applies the correct band rate', () => {
    expect(qstForCode(6500, FIXTURE, 'A0N').monthlyTax).toBeCloseTo(468.0, 2); // 6500 * 7.2%
    expect(qstForCode(6500, FIXTURE, 'A0N').ratePct).toBe(7.2);
    expect(qstForCode(500, FIXTURE, 'A0N').monthlyTax).toBeCloseTo(1.25, 2); // 500 * 0.25%
    expect(qstForCode(20000, FIXTURE, 'A0N').monthlyTax).toBeCloseTo(3000, 2); // top band 15%
  });

  it('enforces the minimum tax', () => {
    // 500 * 0.25% = 1.25 < min 50 → min applies
    expect(qstForCode(500, FIXTURE, 'H1N').monthlyTax).toBeCloseTo(50, 2);
  });

  it('returns zero for missing codes or non-positive income', () => {
    expect(qstForCode(6500, FIXTURE, 'C9N').monthlyTax).toBe(0);
    expect(qstForCode(0, FIXTURE, 'A0N').monthlyTax).toBe(0);
  });

  it('computeQst wires situation → code → tax and nets out', () => {
    const r = computeQst({ monthlyGross: 6500, group: 'A', children: 0, church: false }, FIXTURE);
    expect(r.code).toBe('A0N');
    expect(r.monthlyNet).toBeCloseTo(6500 - r.monthlyTax, 2);
    expect(r.annualTax).toBeCloseTo(r.monthlyTax * 12, 2);
  });
});

describe('shipped QST data integrity', () => {
  const cantons = qstIndex.cantons;

  it('covers all 26 cantons with valid church modes', () => {
    expect(cantons.length).toBe(26);
    for (const c of cantons) {
      expect(['both', 'N', 'Y']).toContain(c.church);
      expect(c.groups).toEqual(expect.arrayContaining(['A', 'B', 'C', 'H']));
    }
  });

  it('ZH tariff is monotonic and matches the pinned (shipped) reference', () => {
    const zh = JSON.parse(readFileSync('public/data/qst/zh.json', 'utf8')) as QstData;
    // Pinned to the shipped data (rates merged to 0.05pp; within tolerance of the official ESTV tariff).
    expect(qstForCode(6500, zh, 'A0N').monthlyTax).toBeCloseTo(469.95, 2);
    expect(qstForCode(10000, zh, 'A0N').monthlyTax).toBeCloseTo(1059.0, 2);
    // Effective tax must not fall as income rises.
    let prev = 0;
    for (const inc of [3000, 5000, 8000, 12000, 20000, 30000]) {
      const t = qstForCode(inc, zh, 'A0N').monthlyTax;
      expect(t).toBeGreaterThanOrEqual(prev);
      prev = t;
    }
  });
});
