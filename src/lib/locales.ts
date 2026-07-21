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
  { de: '/quellensteuer-rechner/', fr: '/fr/calculateur-impot-source/', en: '/en/withholding-tax-calculator/' },
  // M12 tools.
  { de: '/stundenlohn-rechner/', fr: '/fr/calculateur-salaire-horaire/', en: '/en/hourly-wage-calculator/' },
  { de: '/quellensteuer-vergleich/', fr: '/fr/comparatif-impot-source/', en: '/en/withholding-tax-comparison/' },
  { de: '/methodik/', fr: '/fr/methodologie/', en: '/en/methodology/' },
  { de: '/quellen/', fr: '/fr/sources/', en: '/en/sources/' },
  { de: '/ueber-uns/', fr: '/fr/a-propos/', en: '/en/about/' },
  { de: '/impressum/', fr: '/fr/mentions-legales/', en: '/en/legal-notice/' },
  { de: '/datenschutz/', fr: '/fr/protection-des-donnees/', en: '/en/privacy/' },
  // Guide / Ratgeber hub + the 4 articles (M9).
  { de: '/ratgeber/', fr: '/fr/guide/', en: '/en/guide/' },
  { de: '/ratgeber/quellensteuer-expats/', fr: '/fr/guide/impot-a-la-source-expatries/', en: '/en/guide/withholding-tax-for-expats/' },
  { de: '/ratgeber/saeule-3a-gestaffelt-beziehen/', fr: '/fr/guide/retrait-echelonne-3e-pilier/', en: '/en/guide/staggered-pillar-3a-withdrawal/' },
  { de: '/ratgeber/kantonswechsel-steuern-sparen/', fr: '/fr/guide/changer-de-canton-impots/', en: '/en/guide/changing-canton-to-save-tax/' },
  { de: '/ratgeber/heiraten-steuern/', fr: '/fr/guide/mariage-et-impots/', en: '/en/guide/marriage-and-taxes/' },
  // M12 guide articles.
  { de: '/ratgeber/quellensteuer-oder-veranlagung/', fr: '/fr/guide/imposition-source-ou-ordinaire/', en: '/en/guide/withholding-or-ordinary-assessment/' },
  { de: '/ratgeber/13-monatslohn/', fr: '/fr/guide/13e-salaire/', en: '/en/guide/13th-month-salary/' },
  { de: '/ratgeber/grenzgaenger-steuern/', fr: '/fr/guide/frontaliers-impots/', en: '/en/guide/cross-border-commuter-taxes/' },
  // M13 guide articles.
  { de: '/ratgeber/saeule-3a-vs-3b/', fr: '/fr/guide/pilier-3a-vs-3b/', en: '/en/guide/pillar-3a-vs-3b/' },
  { de: '/ratgeber/krankenkasse-praemien-senken/', fr: '/fr/guide/caisse-maladie-reduire-primes/', en: '/en/guide/reduce-health-insurance-premiums/' },
  { de: '/ratgeber/steuererklaerung-fristen-abzuege/', fr: '/fr/guide/declaration-impots-delais-deductions/', en: '/en/guide/swiss-tax-return-deadlines-deductions/' },
  { de: '/ratgeber/pensionskasse-bvg-erklaert/', fr: '/fr/guide/caisse-de-pension-lpp/', en: '/en/guide/pension-fund-bvg-explained/' },
  // M14 guide articles.
  { de: '/ratgeber/ahv-einfach-erklaert/', fr: '/fr/guide/avs-expliquee/', en: '/en/guide/ahv-explained/' },
  { de: '/ratgeber/teilzeit-lohn-bvg-steuern/', fr: '/fr/guide/temps-partiel-salaire-lpp-impots/', en: '/en/guide/part-time-work-switzerland/' },
  { de: '/ratgeber/lohnabrechnung-verstehen/', fr: '/fr/guide/comprendre-fiche-salaire/', en: '/en/guide/understanding-swiss-payslip/' },
  { de: '/ratgeber/bonus-gratifikation/', fr: '/fr/guide/bonus-gratification/', en: '/en/guide/bonus-gratuity-switzerland/' },
];

/** The 26 programmatic income-tax canton pages exist in all three locales (M6/M8). */
const CANTON_GROUPS: PageGroup[] = cantonRegistry.cantons.map((c) => ({
  de: `/steuerrechner/${cantonSlugOf(c.abbr)}/`,
  fr: `/fr/calculateur-impots/${frSlugOf(c.abbr)}/`,
  en: `/en/tax-calculator/${enSlugOf(c.abbr)}/`,
}));

/** The 26 per-canton Quellensteuer pages, in all three locales (M11). */
const QST_CANTON_GROUPS: PageGroup[] = cantonRegistry.cantons.map((c) => ({
  de: `/quellensteuer-rechner/${cantonSlugOf(c.abbr)}/`,
  fr: `/fr/calculateur-impot-source/${frSlugOf(c.abbr)}/`,
  en: `/en/withholding-tax-calculator/${enSlugOf(c.abbr)}/`,
}));

/** All translated page groups. */
export const PAGE_GROUPS: PageGroup[] = [...STATIC_GROUPS, ...CANTON_GROUPS, ...QST_CANTON_GROUPS];

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
