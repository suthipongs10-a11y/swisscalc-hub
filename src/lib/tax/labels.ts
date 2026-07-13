/**
 * Locale-aware labels for the tax renderers. German defaults reproduce the
 * pre-i18n output byte-for-byte (verified by snapshot diff); French adds
 * proper French canton names and links to nothing (French canton pages don't
 * exist yet, so names render as plain text).
 */
import cantonRegistry from '../../data/cantons.json';

const DE_NAME = new Map(cantonRegistry.cantons.map((c) => [c.abbr, c.name]));
const SLUG = new Map(cantonRegistry.cantons.map((c) => [c.abbr, c.slug]));

const FR_NAME: Record<string, string> = {
  ZH: 'Zurich', BE: 'Berne', LU: 'Lucerne', UR: 'Uri', SZ: 'Schwytz', OW: 'Obwald',
  NW: 'Nidwald', GL: 'Glaris', ZG: 'Zoug', FR: 'Fribourg', SO: 'Soleure', BS: 'Bâle-Ville',
  BL: 'Bâle-Campagne', SH: 'Schaffhouse', AR: 'Appenzell Rhodes-Extérieures',
  AI: 'Appenzell Rhodes-Intérieures', SG: 'Saint-Gall', GR: 'Grisons', AG: 'Argovie',
  TG: 'Thurgovie', TI: 'Tessin', VD: 'Vaud', VS: 'Valais', NE: 'Neuchâtel', GE: 'Genève', JU: 'Jura',
};

/** French URL slug per canton (ASCII, no accents) for /fr/calculateur-impots/. */
const FR_SLUG: Record<string, string> = {
  ZH: 'zurich', BE: 'berne', LU: 'lucerne', UR: 'uri', SZ: 'schwytz', OW: 'obwald',
  NW: 'nidwald', GL: 'glaris', ZG: 'zoug', FR: 'fribourg', SO: 'soleure', BS: 'bale-ville',
  BL: 'bale-campagne', SH: 'schaffhouse', AR: 'appenzell-rhodes-exterieures',
  AI: 'appenzell-rhodes-interieures', SG: 'saint-gall', GR: 'grisons', AG: 'argovie',
  TG: 'thurgovie', TI: 'tessin', VD: 'vaud', VS: 'valais', NE: 'neuchatel', GE: 'geneve', JU: 'jura',
};

/**
 * Genitive form for headings — "canton {genitive}" reads naturally with the
 * correct French article: "de Zurich", "du Valais", "des Grisons", "d'Argovie".
 */
const FR_GENITIVE: Record<string, string> = {
  ZH: 'de Zurich', BE: 'de Berne', LU: 'de Lucerne', UR: 'd’Uri', SZ: 'de Schwytz',
  OW: 'd’Obwald', NW: 'de Nidwald', GL: 'de Glaris', ZG: 'de Zoug', FR: 'de Fribourg',
  SO: 'de Soleure', BS: 'de Bâle-Ville', BL: 'de Bâle-Campagne', SH: 'de Schaffhouse',
  AR: 'd’Appenzell Rhodes-Extérieures', AI: 'd’Appenzell Rhodes-Intérieures',
  SG: 'de Saint-Gall', GR: 'des Grisons', AG: 'd’Argovie', TG: 'de Thurgovie',
  TI: 'du Tessin', VD: 'de Vaud', VS: 'du Valais', NE: 'de Neuchâtel', GE: 'de Genève', JU: 'du Jura',
};

/** Cantonal-capital city names that have a distinct French exonym. */
const FR_CAPITAL: Record<string, string> = {
  Zürich: 'Zurich', Bern: 'Berne', Luzern: 'Lucerne', 'Altdorf (UR)': 'Altdorf',
  Glarus: 'Glaris', Zug: 'Zoug', Solothurn: 'Soleure', Basel: 'Bâle',
  Schaffhausen: 'Schaffhouse', 'St. Gallen': 'Saint-Gall', Chur: 'Coire', Bellinzona: 'Bellinzone',
};

/** English canton names (widely-recognised exonyms) for /en/tax-calculator/. */
const EN_NAME: Record<string, string> = {
  ZH: 'Zurich', BE: 'Bern', LU: 'Lucerne', UR: 'Uri', SZ: 'Schwyz', OW: 'Obwalden',
  NW: 'Nidwalden', GL: 'Glarus', ZG: 'Zug', FR: 'Fribourg', SO: 'Solothurn', BS: 'Basel-Stadt',
  BL: 'Basel-Landschaft', SH: 'Schaffhausen', AR: 'Appenzell Ausserrhoden',
  AI: 'Appenzell Innerrhoden', SG: 'St. Gallen', GR: 'Graubünden', AG: 'Aargau',
  TG: 'Thurgau', TI: 'Ticino', VD: 'Vaud', VS: 'Valais', NE: 'Neuchâtel', GE: 'Geneva', JU: 'Jura',
};

/** English URL slug per canton (ASCII, no accents) for /en/tax-calculator/. */
const EN_SLUG: Record<string, string> = {
  ZH: 'zurich', BE: 'bern', LU: 'lucerne', UR: 'uri', SZ: 'schwyz', OW: 'obwalden',
  NW: 'nidwalden', GL: 'glarus', ZG: 'zug', FR: 'fribourg', SO: 'solothurn', BS: 'basel-stadt',
  BL: 'basel-landschaft', SH: 'schaffhausen', AR: 'appenzell-ausserrhoden',
  AI: 'appenzell-innerrhoden', SG: 'st-gallen', GR: 'graubunden', AG: 'aargau',
  TG: 'thurgau', TI: 'ticino', VD: 'vaud', VS: 'valais', NE: 'neuchatel', GE: 'geneva', JU: 'jura',
};

/** Cantonal-capital city names that have a distinct English exonym. */
const EN_CAPITAL: Record<string, string> = {
  Zürich: 'Zurich', Luzern: 'Lucerne', 'Altdorf (UR)': 'Altdorf', Genève: 'Geneva',
};

export const deName = (abbr: string): string => DE_NAME.get(abbr) ?? abbr;
export const frName = (abbr: string): string => FR_NAME[abbr] ?? abbr;
export const enName = (abbr: string): string => EN_NAME[abbr] ?? abbr;
/** French exonym for a cantonal capital, or the name unchanged. */
export const frCapital = (capital: string): string => FR_CAPITAL[capital] ?? capital;
/** English exonym for a cantonal capital, or the name unchanged. */
export const enCapital = (capital: string): string => EN_CAPITAL[capital] ?? capital;
export const cantonSlugOf = (abbr: string): string | undefined => SLUG.get(abbr);
export const frSlugOf = (abbr: string): string | undefined => FR_SLUG[abbr];
export const enSlugOf = (abbr: string): string | undefined => EN_SLUG[abbr];
export const frGenitive = (abbr: string): string => FR_GENITIVE[abbr] ?? `de ${frName(abbr)}`;
/** English uses a uniform "of {name}" genitive (no gendered articles). */
export const enGenitive = (abbr: string): string => `of ${enName(abbr)}`;

/** Tarif-system label for the canton page, per locale. */
export const TARIF_LABELS_DE: Record<string, string> = {
  ZUERICH: 'progressiver Stufentarif',
  BUND: 'progressiver Stufentarif mit Grundbetrag',
  FLATTAX: 'Proportionaltarif (Flat Rate)',
  FREIBURG: 'stufenlos interpolierter Tarif',
  FORMEL: 'stufenloser Formeltarif',
};
export const TARIF_LABELS_FR: Record<string, string> = {
  ZUERICH: 'barème progressif par paliers',
  BUND: 'barème progressif par paliers avec montant de base',
  FLATTAX: 'barème proportionnel (taux unique)',
  FREIBURG: 'barème interpolé en continu',
  FORMEL: 'barème par formule (continu)',
};
export const TARIF_LABELS_EN: Record<string, string> = {
  ZUERICH: 'progressive bracket schedule',
  BUND: 'progressive bracket schedule with base amount',
  FLATTAX: 'proportional (flat) rate',
  FREIBURG: 'continuously interpolated schedule',
  FORMEL: 'formula-based (continuous) schedule',
};

/* ---------------- Cross-canton comparison ---------------- */

export interface ComparisonLabels {
  nameOf: (abbr: string) => string;
  capitalOf: (capital: string) => string;
  cantonHref: (abbr: string) => string | null;
  colRank: string;
  colCanton: string;
  colTotal: string;
  colEffective: string;
  introInner: (income: string, cheapest: string, priciest: string, delta: string) => string;
  footnoteInner: (income: string) => string;
}

export const COMPARISON_LABELS_DE: ComparisonLabels = {
  nameOf: deName,
  capitalOf: (c) => c,
  cantonHref: (abbr) => `/steuerrechner/${cantonSlugOf(abbr)}/`,
  colRank: '#',
  colCanton: 'Kanton (Hauptort)',
  colTotal: 'Steuern total',
  colEffective: 'Effektiv',
  introInner: (income, cheapest, priciest, delta) =>
    `\n      Bei ${income} steuerbarem Einkommen liegen zwischen dem günstigsten\n      (${cheapest}) und dem teuersten Kantonshauptort\n      (${priciest}) <strong>${delta} pro Jahr</strong>.\n    `,
  footnoteInner: (income) =>
    `\n      Total = Kantons- + Gemeindesteuer (Hauptort) + direkte Bundessteuer, ohne Kirchensteuer.\n      Basis: steuerbares Einkommen ${income}.\n    `,
};

export const COMPARISON_LABELS_FR: ComparisonLabels = {
  nameOf: frName,
  capitalOf: frCapital,
  cantonHref: (abbr) => `/fr/calculateur-impots/${frSlugOf(abbr)}/`,
  colRank: '#',
  colCanton: 'Canton (chef-lieu)',
  colTotal: 'Impôts totaux',
  colEffective: 'Effectif',
  introInner: (income, cheapest, priciest, delta) =>
    `\n      Pour un revenu imposable de ${income}, l’écart entre le chef-lieu le moins cher\n      (${cheapest}) et le plus cher\n      (${priciest}) est de <strong>${delta} par an</strong>.\n    `,
  footnoteInner: (income) =>
    `\n      Total = impôt cantonal + communal (chef-lieu) + impôt fédéral direct, sans impôt ecclésiastique.\n      Base : revenu imposable ${income}.\n    `,
};

export const COMPARISON_LABELS_EN: ComparisonLabels = {
  nameOf: enName,
  capitalOf: enCapital,
  cantonHref: (abbr) => `/en/tax-calculator/${enSlugOf(abbr)}/`,
  colRank: '#',
  colCanton: 'Canton (capital)',
  colTotal: 'Total tax',
  colEffective: 'Effective',
  introInner: (income, cheapest, priciest, delta) =>
    `\n      For a taxable income of ${income}, the gap between the cheapest capital\n      (${cheapest}) and the most expensive\n      (${priciest}) is <strong>${delta} per year</strong>.\n    `,
  footnoteInner: (income) =>
    `\n      Total = cantonal + municipal (capital) + direct federal tax, excluding church tax.\n      Basis: taxable income ${income}.\n    `,
};

/* ---------------- Säule 3a / 3e pilier ---------------- */

export interface ThreeALabels {
  nameOf: (abbr: string) => string;
  savingHeadline: string;
  taxWithout: string;
  taxWith: (contribution: string) => string;
  savingRow: (rate: string) => string;
  footnoteInner: (name: string, income: string) => string;
}

export const THREEA_LABELS_DE: ThreeALabels = {
  nameOf: deName,
  savingHeadline: 'Ihre Steuerersparnis pro Jahr',
  taxWithout: 'Steuern ohne 3a-Einzahlung',
  taxWith: (contribution) => `Steuern mit Einzahlung von ${contribution}`,
  savingRow: (rate) => `Ersparnis (≈ ${rate} der Einzahlung)`,
  footnoteInner: (name, income) =>
    `\n        Kanton ${name} (Hauptort), inkl. direkter Bundessteuer, ohne Kirchensteuer.\n        Steuerbares Einkommen vor Einzahlung: ${income}.\n      `,
};

export const THREEA_LABELS_FR: ThreeALabels = {
  nameOf: frName,
  savingHeadline: 'Votre économie d’impôt par an',
  taxWithout: 'Impôts sans versement 3a',
  taxWith: (contribution) => `Impôts avec un versement de ${contribution}`,
  savingRow: (rate) => `Économie (≈ ${rate} du versement)`,
  footnoteInner: (name, income) =>
    `\n        Canton ${name} (chef-lieu), impôt fédéral direct inclus, sans impôt ecclésiastique.\n        Revenu imposable avant versement : ${income}.\n      `,
};

export const THREEA_LABELS_EN: ThreeALabels = {
  nameOf: enName,
  savingHeadline: 'Your tax saving per year',
  taxWithout: 'Tax without 3a contribution',
  taxWith: (contribution) => `Tax with a contribution of ${contribution}`,
  savingRow: (rate) => `Saving (≈ ${rate} of the contribution)`,
  footnoteInner: (name, income) =>
    `\n        Canton of ${name} (capital), direct federal tax included, excluding church tax.\n        Taxable income before contribution: ${income}.\n      `,
};

/* ---------------- Per-canton calculator breakdown ---------------- */

export interface CantonRenderLabels {
  nameOf: (abbr: string) => string;
  capitalOf: (capital: string) => string;
  totalPerYear: (capital: string) => string;
  baseTax: (abbr: string) => string;
  cantonTax: string;
  cityTax: (capital: string) => string;
  federalTax: string;
  effectiveRate: string;
  cheapestNote: string;
  rankNote: (rank: number, delta: string, cheapest: string) => string;
}

export const CANTON_RENDER_LABELS_DE: CantonRenderLabels = {
  nameOf: deName,
  capitalOf: (c) => c,
  totalPerYear: (capital) => `Steuern total pro Jahr (${capital})`,
  baseTax: (abbr) => `Einfache Staatssteuer (${abbr}-Tarif)`,
  cantonTax: 'Kantonssteuer',
  cityTax: (capital) => `Gemeindesteuer ${capital}`,
  federalTax: 'Direkte Bundessteuer',
  effectiveRate: 'Effektiver Steuersatz',
  cheapestNote: 'Günstigster Kantonshauptort der Schweiz bei diesem Einkommen.',
  rankNote: (rank, delta, cheapest) =>
    `Rang ${rank} von 26 Hauptorten bei diesem Einkommen — ${delta} mehr als ${cheapest}. <a class="underline" href="/steuervergleich/">Zum vollständigen Vergleich</a>`,
};

export const CANTON_RENDER_LABELS_FR: CantonRenderLabels = {
  nameOf: frName,
  capitalOf: frCapital,
  totalPerYear: (capital) => `Impôts totaux par an (${capital})`,
  baseTax: (abbr) => `Impôt cantonal simple (barème ${abbr})`,
  cantonTax: 'Impôt cantonal',
  cityTax: (capital) => `Impôt communal ${capital}`,
  federalTax: 'Impôt fédéral direct',
  effectiveRate: 'Taux d’imposition effectif',
  cheapestNote: 'Chef-lieu cantonal le moins cher de Suisse pour ce revenu.',
  rankNote: (rank, delta, cheapest) =>
    `Rang ${rank} sur 26 chefs-lieux pour ce revenu — ${delta} de plus qu’à ${cheapest}. <a class="underline" href="/fr/comparatif-impots-cantons/">Voir le comparatif complet</a>`,
};

export const CANTON_RENDER_LABELS_EN: CantonRenderLabels = {
  nameOf: enName,
  capitalOf: enCapital,
  totalPerYear: (capital) => `Total tax per year (${capital})`,
  baseTax: (abbr) => `Simple cantonal tax (${abbr} schedule)`,
  cantonTax: 'Cantonal tax',
  cityTax: (capital) => `Municipal tax ${capital}`,
  federalTax: 'Direct federal tax',
  effectiveRate: 'Effective tax rate',
  cheapestNote: 'Cheapest cantonal capital in Switzerland at this income.',
  rankNote: (rank, delta, cheapest) =>
    `Rank ${rank} of 26 capitals at this income — ${delta} more than ${cheapest}. <a class="underline" href="/en/cantonal-tax-comparison/">See the full comparison</a>`,
};
