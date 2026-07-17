import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import cantonRegistry from '../src/data/cantons.json';
import { compareQst, situationKey, type QstvFile } from '../src/lib/qst/compare';
import { qstForCode, type QstData } from '../src/lib/qst/engine';

const load = (key: string): QstvFile => JSON.parse(readFileSync(`public/data/qstv/${key}.json`, 'utf8'));

describe('QST comparison (M12)', () => {
  it('situationKey mirrors the calculator UI semantics', () => {
    expect(situationKey('A', 3)).toBe('A0'); // A has no children variants in the UI
    expect(situationKey('H', 0)).toBe('H1'); // H starts at one child
    expect(situationKey('B', 3)).toBe('B3');
    expect(situationKey('C', 9)).toBe('C5'); // capped at 5
  });

  it('a0 file covers all 26 cantons and sorts ascending', () => {
    const file = load('a0');
    const rows = compareQst(6500, false, file);
    expect(rows.length).toBe(cantonRegistry.cantons.length);
    for (let i = 1; i < rows.length; i++) expect(rows[i]!.monthlyTax).toBeGreaterThanOrEqual(rows[i - 1]!.monthlyTax);
  });

  it('matches the per-canton calculator exactly (ZH A0N 6500 = 469.95)', () => {
    const file = load('a0');
    const zhRow = compareQst(6500, false, file).find((r) => r.abbr === 'ZH')!;
    expect(zhRow.monthlyTax).toBe(469.95);
    const zhData = JSON.parse(readFileSync('public/data/qst/zh.json', 'utf8')) as QstData;
    expect(zhRow.monthlyTax).toBe(qstForCode(6500, zhData, 'A0N').monthlyTax);
  });

  it('resolves church per canton: GE always N, JU always Y', () => {
    const file = load('a0');
    const withChurch = compareQst(8000, true, file);
    const without = compareQst(8000, false, file);
    expect(withChurch.find((r) => r.abbr === 'GE')!.code).toBe('A0N');
    expect(without.find((r) => r.abbr === 'JU')!.code).toBe('A0Y');
    // A both-mode canton actually switches
    expect(withChurch.find((r) => r.abbr === 'ZH')!.code).toBe('A0Y');
    expect(without.find((r) => r.abbr === 'ZH')!.code).toBe('A0N');
  });

  it('every situation file exists and parses (A0, B0-5, C0-5, H1-5)', () => {
    const keys = ['a0', ...[0, 1, 2, 3, 4, 5].map((n) => `b${n}`), ...[0, 1, 2, 3, 4, 5].map((n) => `c${n}`), ...[1, 2, 3, 4, 5].map((n) => `h${n}`)];
    for (const key of keys) {
      const file = load(key);
      expect(Object.keys(file.cantons).length, key).toBe(26);
    }
  });

  it('family tariffs are cheaper than the single tariff at the same salary', () => {
    const a = compareQst(8000, false, load('a0'));
    const b2 = compareQst(8000, false, load('b2'));
    for (const row of b2) {
      const single = a.find((r) => r.abbr === row.abbr)!;
      expect(row.monthlyTax, row.abbr).toBeLessThanOrEqual(single.monthlyTax);
    }
  });
});
