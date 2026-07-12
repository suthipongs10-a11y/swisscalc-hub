/**
 * Swiss number formatting (CLAUDE.md): CHF 12'345.60 — apostrophe thousands
 * separator, period decimal. Written explicitly (not Intl) so the group
 * separator is a straight apostrophe and output is deterministic.
 */
export function formatNumber(value: number, decimals = 2): string {
  const fixed = Math.abs(value).toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  const sign = value < 0 ? '-' : '';
  return decPart ? `${sign}${grouped}.${decPart}` : `${sign}${grouped}`;
}

export function formatCHF(value: number, decimals = 2): string {
  return `CHF ${formatNumber(value, decimals)}`;
}

export function formatPercent(fraction: number, decimals = 1): string {
  return `${formatNumber(fraction * 100, decimals)}%`;
}
