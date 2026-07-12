/** ISO date (YYYY-MM-DD) → Swiss display format DD.MM.YYYY. */
export function formatSwissDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}
