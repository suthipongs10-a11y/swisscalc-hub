/**
 * Sitewide constants. SEO_SPEC §1 (domain canon) and §3.4 (year policy:
 * one constant drives every title/H1 year so the January refresh is one commit).
 */
export const SITE_URL = 'https://calcswiss.ch';
export const BRAND = 'CalcSwiss';
export const SITE_YEAR = 2026;

/** Locale of the root pages (SEO_SPEC §2). */
export const SITE_LANG = 'de-CH';

export function absoluteUrl(path: string): string {
  if (!path.startsWith('/')) throw new Error(`Path must start with /: ${path}`);
  return `${SITE_URL}${path}`;
}
