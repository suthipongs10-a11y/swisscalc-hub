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

export const deName = (abbr: string): string => DE_NAME.get(abbr) ?? abbr;
export const frName = (abbr: string): string => FR_NAME[abbr] ?? abbr;
export const cantonSlugOf = (abbr: string): string | undefined => SLUG.get(abbr);

/* ---------------- Cross-canton comparison ---------------- */

export interface ComparisonLabels {
  nameOf: (abbr: string) => string;
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
  cantonHref: () => null,
  colRank: '#',
  colCanton: 'Canton (chef-lieu)',
  colTotal: 'Impôts totaux',
  colEffective: 'Effectif',
  introInner: (income, cheapest, priciest, delta) =>
    `\n      Pour un revenu imposable de ${income}, l’écart entre le chef-lieu le moins cher\n      (${cheapest}) et le plus cher\n      (${priciest}) est de <strong>${delta} par an</strong>.\n    `,
  footnoteInner: (income) =>
    `\n      Total = impôt cantonal + communal (chef-lieu) + impôt fédéral direct, sans impôt ecclésiastique.\n      Base : revenu imposable ${income}.\n    `,
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
