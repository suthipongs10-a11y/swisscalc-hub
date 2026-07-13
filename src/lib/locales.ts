/**
 * Locale metadata and cross-locale route mapping (SEO_SPEC §2). Adding a
 * translated page = add one path to its PAGE_GROUP; every locale in the group
 * then gets reciprocal hreflang and language-switcher links automatically.
 */
import { absoluteUrl } from './site';
import cantonRegistry from '../data/cantons.json';
import { cantonSlugOf, frSlugOf, enSlugOf } from './tax/labels';

export type Locale = 'de' | 'fr' | 'en';

/** All locales, primary first. */
export const LOCALES: Locale[] = ['de', 'fr', 'en'];

export const LOCALE_LANG: Record<Locale, string> = { de: 'de-CH', fr: 'fr-CH', en: 'en-CH' };
export const LOCALE_OG: Record<Locale, string> = { de: 'de_CH', fr: 'fr_CH', en: 'en_CH' };

/** The other locales to offer in the language switcher, in display order. */
export const OTHER_LOCALES: Record<Locale, Locale[]> = {
  de: ['fr', 'en'],
  fr: ['de', 'en'],
  en: ['de', 'fr'],
};

/** Human label for a locale in the language switcher (in its own language). */
export const LOCALE_LABEL: Record<Locale, string> = { de: 'Deutsch', fr: 'Français', en: 'English' };

/** A page that exists in one or more locales, keyed by locale → path (trailing slash). */
type PageGroup = Partial<Record<Locale, string>>;

/** Static (non-canton) translated pages. */
const STATIC_GROUPS: PageGroup[] = [
  { de: '/', fr: '/fr/', en: '/en/' },
  { de: '/brutto-netto-rechner/', fr: '/fr/calculateur-salaire-brut-net/', en: '/en/salary-calculator/' },
  { de: '/steuervergleich/', fr: '/fr/comparatif-impots-cantons/', en: '/en/cantonal-tax-comparison/' },
  { de: '/saeule-3a-rechner/', fr: '/fr/calculateur-3e-pilier/', en: '/en/pillar-3a-calculator/' },
  { de: '/methodik/', fr: '/fr/methodologie/', en: '/en/methodology/' },
  { de: '/quellen/', fr: '/fr/sources/', en: '/en/sources/' },
  { de: '/ueber-uns/', fr: '/fr/a-propos/', en: '/en/about/' },
  { de: '/impressum/', fr: '/fr/mentions-legales/', en: '/en/legal-notice/' },
  { de: '/datenschutz/', fr: '/fr/protection-des-donnees/', en: '/en/privacy/' },
];

/** The 26 programmatic canton pages exist in all three locales (M6/M8). */
const CANTON_GROUPS: PageGroup[] = cantonRegistry.cantons.map((c) => ({
  de: `/steuerrechner/${cantonSlugOf(c.abbr)}/`,
  fr: `/fr/calculateur-impots/${frSlugOf(c.abbr)}/`,
  en: `/en/tax-calculator/${enSlugOf(c.abbr)}/`,
}));

/** All translated page groups. */
export const PAGE_GROUPS: PageGroup[] = [...STATIC_GROUPS, ...CANTON_GROUPS];

export interface Alternate {
  hreflang: string;
  href: string;
}

function groupFor(path: string): PageGroup | undefined {
  return PAGE_GROUPS.find((g) => (Object.values(g) as string[]).includes(path));
}

/** hreflang set for a translated path; undefined for single-locale pages. */
export function alternatesFor(path: string): Alternate[] | undefined {
  const group = groupFor(path);
  if (!group) return undefined;
  const alts: Alternate[] = [];
  for (const loc of LOCALES) {
    const href = group[loc];
    if (href) alts.push({ hreflang: LOCALE_LANG[loc], href: absoluteUrl(href) });
  }
  // x-default → German (primary launch locale), falling back to any present locale.
  const xdefault = group.de ?? group.fr ?? group.en;
  if (xdefault) alts.push({ hreflang: 'x-default', href: absoluteUrl(xdefault) });
  return alts;
}

/** The counterpart path in the target locale, or undefined if not translated. */
export function counterpartOf(path: string, target: Locale): string | undefined {
  const group = groupFor(path);
  return group ? group[target] : undefined;
}
