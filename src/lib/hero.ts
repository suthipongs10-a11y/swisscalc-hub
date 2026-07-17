/**
 * Maps a page path to its hero-illustration variant (see HeroArt.astro).
 * Path-driven so every page — current and future — gets a coherent, on-topic
 * illustration without per-page wiring. URLs are binding (SEO_SPEC), so the
 * slug map is stable. BaseLayout lets a page override the resolved variant.
 */
export type HeroVariant =
  | 'home'
  | 'salary'
  | 'comparison'
  | 'pillar3a'
  | 'withholding'
  | 'withholdingCanton'
  | 'canton'
  | 'guide'
  | 'legal'
  | 'about'
  | 'notfound';

// First content segment (locale stripped) → variant, for the simple pages.
const DIRECT: Record<string, HeroVariant> = {
  // salary
  'brutto-netto-rechner': 'salary',
  'calculateur-salaire-brut-net': 'salary',
  'salary-calculator': 'salary',
  'stundenlohn-rechner': 'salary',
  'calculateur-salaire-horaire': 'salary',
  'hourly-wage-calculator': 'salary',
  // cantonal comparison
  steuervergleich: 'comparison',
  'comparatif-impots-cantons': 'comparison',
  'cantonal-tax-comparison': 'comparison',
  'quellensteuer-vergleich': 'comparison',
  'comparatif-impot-source': 'comparison',
  'withholding-tax-comparison': 'comparison',
  // pillar 3a
  'saeule-3a-rechner': 'pillar3a',
  'calculateur-3e-pilier': 'pillar3a',
  'pillar-3a-calculator': 'pillar3a',
  // guide / ratgeber
  ratgeber: 'guide',
  guide: 'guide',
  // legal / trust
  methodik: 'legal',
  quellen: 'legal',
  impressum: 'legal',
  datenschutz: 'legal',
  methodologie: 'legal',
  sources: 'legal',
  'mentions-legales': 'legal',
  'protection-des-donnees': 'legal',
  methodology: 'legal',
  'legal-notice': 'legal',
  privacy: 'legal',
  // about
  'ueber-uns': 'about',
  'a-propos': 'about',
  about: 'about',
  // 404
  '404': 'notfound',
};

// Bases that carry a per-canton child page (…/<base>/<canton-slug>/).
const CANTON_BASE: Record<string, HeroVariant> = {
  steuerrechner: 'canton',
  'calculateur-impots': 'canton',
  'tax-calculator': 'canton',
  'quellensteuer-rechner': 'withholding',
  'calculateur-impot-source': 'withholding',
  'withholding-tax-calculator': 'withholding',
};

export function resolveHeroVariant(path: string): HeroVariant {
  const segs = path.split('/').filter(Boolean);
  if (segs[0] === 'fr' || segs[0] === 'en') segs.shift();
  if (segs.length === 0) return 'home';

  const base = segs[0]!;
  if (base in CANTON_BASE) {
    const root = CANTON_BASE[base]!;
    // A trailing canton segment turns the index variant into its canton form.
    if (segs.length >= 2) return root === 'withholding' ? 'withholdingCanton' : 'canton';
    return root;
  }
  return DIRECT[base] ?? 'home';
}
