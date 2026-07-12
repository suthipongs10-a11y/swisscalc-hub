import { describe, expect, it } from 'vitest';
import { formatNumber, formatCHF, formatPercent } from '../src/lib/format';

describe('Swiss formatting', () => {
  it('groups thousands with apostrophes, period decimal', () => {
    expect(formatNumber(12345.6)).toBe("12'345.60");
    expect(formatNumber(1000000)).toBe("1'000'000.00");
    expect(formatNumber(999)).toBe('999.00');
  });
  it('formatCHF prefixes CHF', () => {
    expect(formatCHF(88987)).toBe("CHF 88'987.00");
  });
  it('formatPercent', () => {
    expect(formatPercent(0.053)).toBe('5.3%');
  });
  it('handles negatives', () => {
    expect(formatNumber(-1234.5)).toBe("-1'234.50");
  });
});
