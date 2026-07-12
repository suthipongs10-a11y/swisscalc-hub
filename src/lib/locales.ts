/**
 * Locale metadata and de↔fr route mapping (SEO_SPEC §2). Adding a translated
 * page = add one entry to PAGE_PAIRS; both sides then get reciprocal hreflang
 * and a language switcher automatically.
 */
import { absoluteUrl } from './site';

export type Locale = 'de' | 'fr';

export const LOCALE_LANG: Record<Locale, string> = { de: 'de-CH', fr: 'fr-CH' };
export const LOCALE_OG: Record<Locale, string> = { de: 'de_CH', fr: 'fr_CH' };

/** Paths (trailing slash) of pages that exist in both German and French. */
export const PAGE_PAIRS: { de: string; fr: string }[] = [
  { de: '/', fr: '/fr/' },
  { de: '/brutto-netto-rechner/', fr: '/fr/calculateur-salaire-brut-net/' },
  { de: '/steuervergleich/', fr: '/fr/comparatif-impots-cantons/' },
  { de: '/saeule-3a-rechner/', fr: '/fr/calculateur-3e-pilier/' },
];

export interface Alternate {
  hreflang: string;
  href: string;
}

/** hreflang set for a paired path; undefined for pages that exist in one locale only. */
export function alternatesFor(path: string): Alternate[] | undefined {
  const pair = PAGE_PAIRS.find((p) => p.de === path || p.fr === path);
  if (!pair) return undefined;
  return [
    { hreflang: 'de-CH', href: absoluteUrl(pair.de) },
    { hreflang: 'fr-CH', href: absoluteUrl(pair.fr) },
    { hreflang: 'x-default', href: absoluteUrl(pair.de) },
  ];
}

/** The counterpart path in the other locale, or undefined if the page is not paired. */
export function counterpartOf(path: string, target: Locale): string | undefined {
  const pair = PAGE_PAIRS.find((p) => p.de === path || p.fr === path);
  return pair ? pair[target] : undefined;
}
