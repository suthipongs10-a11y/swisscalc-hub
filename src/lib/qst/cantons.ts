/**
 * QST per-canton facts that are stable/administrative rather than in the tariff
 * files. The calculation model (monthly vs annual) is a cantonal choice defined
 * in ESTV Kreisschreiben 45 — the five annual-model ("Jahresmodell") cantons are
 * Fribourg, Genève, Ticino, Vaud and Valais; all others use the monthly model.
 */
export const QST_ANNUAL_MODEL = new Set(['FR', 'GE', 'TI', 'VD', 'VS']);
export const isAnnualModel = (abbr: string): boolean => QST_ANNUAL_MODEL.has(abbr);
