/**
 * Swiss income-tax engine: federal (dBSt) + cantonal + municipal tax from
 * TAXABLE income (steuerbares Einkommen). Deductions are NOT modelled here —
 * the caller provides taxable income (documented on /methodik/).
 *
 * Table semantics (BUND/ZUERICH/FLATTAX/FREIBURG/FORMEL, splitting, rounding)
 * are ported from the MIT-licensed reference implementation
 * github.com/devbrains-com/swisstaxcalculator, which is built on the same
 * ESTV dataset. Church tax and Personalsteuer are intentionally excluded
 * (results shown "ohne Kirchensteuer").
 */
import federalData from '../../data/tax/federal-income-2026.json';
import cantonalData from '../../data/tax/cantonal-income-2026.json';
import multiplierData from '../../data/tax/multipliers-2026.json';

export type Relationship = 'single' | 'married';

export interface TarifRow {
  amount: number;
  taxes: number;
  percent: number;
  formula?: string;
}

export interface Tarif {
  groups: string[];
  tableType: string;
  splitting: number;
  table: TarifRow[];
}

export interface CantonTaxResult {
  abbr: string;
  capital: string;
  /** einfache Staatssteuer (base tax before multipliers) */
  baseTax: number;
  cantonTax: number;
  cityTax: number;
  federalTax: number;
  totalTax: number;
  /** total tax / taxable income */
  effectiveRate: number;
}

const round2 = (n: number): number => Math.round(n * 100) / 100;
const round100Down = (n: number): number => Math.floor(n / 100) * 100;

/* ------------------------------------------------------------------ *
 * Table-type calculators
 * ------------------------------------------------------------------ */

/** BUND type: rows are thresholds; last row with amount <= income applies. */
function taxBund(income: number, table: TarifRow[]): number {
  let last: TarifRow | undefined;
  for (const row of table) {
    if (row.amount <= income) last = row;
    else break;
  }
  if (!last) return 0;
  return last.taxes + ((income - last.amount) * last.percent) / 100;
}

/** ZUERICH type: rows are band WIDTHS consumed in order at each percent. */
function taxZurich(income: number, table: TarifRow[]): number {
  let taxes = 0;
  let remaining = income;
  for (const row of table) {
    const usable = Math.min(remaining, row.amount);
    taxes += (usable * row.percent) / 100;
    remaining -= usable;
    if (remaining <= 0) break;
  }
  return taxes;
}

/** FLATTAX: single proportional rate. */
function taxFlat(income: number, table: TarifRow[]): number {
  return (income * (table[0]?.percent ?? 0)) / 100;
}

/**
 * FREIBURG type: rows are (income threshold, EFFECTIVE percent at threshold);
 * the effective rate is linearly interpolated between thresholds and applied
 * to the WHOLE income.
 */
function taxFreiburg(income: number, table: TarifRow[]): number {
  let last: TarifRow | undefined;
  for (const row of table) {
    if (row.amount >= income) {
      if (!last || last.amount === 0) return 0;
      const perChf = (row.percent - last.percent) / (row.amount - last.amount);
      const effective = (income - last.amount) * perChf + last.percent;
      return (income * effective) / 100;
    }
    last = row;
  }
  // Above the last threshold: apply the top effective rate.
  const top = table[table.length - 1];
  return top ? (income * top.percent) / 100 : 0;
}

/** FORMEL type (BL): bracket rows carry a formula in $wert$ with log = ln. */
function taxFormel(income: number, table: TarifRow[]): number {
  let last: TarifRow | undefined;
  for (const row of table) {
    if (row.amount <= income) last = row;
    else break;
  }
  if (!last?.formula) return 0;
  const result = evaluateFormula(last.formula, income);
  return Number.isFinite(result) ? Math.max(0, result) : 0;
}

export function evaluateFormula(formula: string, wert: number): number {
  const tokens = tokenize(formula, wert);
  const ctx = { pos: 0 };
  const value = parseExpr(tokens, ctx);
  if (ctx.pos !== tokens.length) throw new Error(`Bad formula: ${formula}`);
  return value;
}

function tokenize(formula: string, wert: number): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < formula.length) {
    const ch = formula[i]!;
    if (ch === ' ' || ch === '\t') i++;
    else if (ch === '$') {
      const end = formula.indexOf('$', i + 1);
      if (end === -1 || formula.slice(i + 1, end) !== 'wert') throw new Error(`Bad variable in: ${formula}`);
      tokens.push(String(wert));
      i = end + 1;
    } else if (formula.startsWith('log', i)) {
      tokens.push('log');
      i += 3;
    } else if ('+-*/()'.includes(ch)) {
      tokens.push(ch);
      i++;
    } else if (/[\d.]/.test(ch)) {
      let num = '';
      while (i < formula.length && /[\d.]/.test(formula[i]!)) num += formula[i++];
      tokens.push(num);
    } else throw new Error(`Bad char '${ch}' in: ${formula}`);
  }
  return tokens;
}

function parseExpr(tokens: string[], ctx: { pos: number }): number {
  let left = parseTerm(tokens, ctx);
  while (tokens[ctx.pos] === '+' || tokens[ctx.pos] === '-') {
    const op = tokens[ctx.pos++];
    const right = parseTerm(tokens, ctx);
    left = op === '+' ? left + right : left - right;
  }
  return left;
}
function parseTerm(tokens: string[], ctx: { pos: number }): number {
  let left = parseUnary(tokens, ctx);
  while (tokens[ctx.pos] === '*' || tokens[ctx.pos] === '/') {
    const op = tokens[ctx.pos++];
    const right = parseUnary(tokens, ctx);
    left = op === '*' ? left * right : left / right;
  }
  return left;
}
function parseUnary(tokens: string[], ctx: { pos: number }): number {
  if (tokens[ctx.pos] === '-') {
    ctx.pos++;
    return -parsePrimary(tokens, ctx);
  }
  return parsePrimary(tokens, ctx);
}
function parsePrimary(tokens: string[], ctx: { pos: number }): number {
  const token = tokens[ctx.pos];
  if (token === 'log') {
    ctx.pos++;
    return Math.log(parsePrimary(tokens, ctx));
  }
  if (token === '(') {
    ctx.pos++;
    const value = parseExpr(tokens, ctx);
    if (tokens[ctx.pos] !== ')') throw new Error('Missing )');
    ctx.pos++;
    return value;
  }
  const num = parseFloat(token ?? '');
  if (Number.isNaN(num)) throw new Error(`Expected number, got '${token}'`);
  ctx.pos++;
  return num;
}

/* ------------------------------------------------------------------ *
 * Tarif application
 * ------------------------------------------------------------------ */

function taxForTable(income: number, tableType: string, table: TarifRow[]): number {
  // Reference-implementation workaround: some ZUERICH-typed tables are
  // actually threshold tables (they carry base-tax values).
  const effective = tableType === 'ZUERICH' && table.some((r) => r.taxes > 0) ? 'BUND' : tableType;
  switch (effective) {
    case 'BUND':
      return taxBund(income, table);
    case 'ZUERICH':
      return taxZurich(income, table);
    case 'FLATTAX':
      return taxFlat(income, table);
    case 'FREIBURG':
      return taxFreiburg(income, table);
    case 'FORMEL':
      return taxFormel(income, table);
    default:
      throw new Error(`Unknown table type ${tableType}`);
  }
}

/** Group keys per relationship, with the reference implementation's fallbacks. */
function groupKeys(relationship: Relationship): string[] {
  return relationship === 'married' ? ['VERHEIRATET'] : ['LEDIG_ALLEINE'];
}

function pickTarif(tarifs: Tarif[], relationship: Relationship): Tarif {
  for (const key of groupKeys(relationship)) {
    const found = tarifs.find((t) => t.groups.includes(key) || t.groups.includes('ALLE'));
    if (found) return found;
  }
  const alle = tarifs.find((t) => t.groups.includes('ALLE'));
  if (alle) return alle;
  throw new Error(`No tarif for relationship ${relationship}`);
}

/** Splitting applies only to married (family) tariffs, per reference impl. */
export function applyTarif(income: number, tarif: Tarif, relationship: Relationship): number {
  const useSplitting = tarif.splitting > 0 && relationship === 'married';
  let calcIncome = useSplitting ? income / tarif.splitting : income;
  if (tarif.tableType !== 'FORMEL') calcIncome = round100Down(calcIncome);
  const tax = taxForTable(calcIncome, tarif.tableType, tarif.table);
  return useSplitting ? tax * tarif.splitting : tax;
}

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */

export function federalTax(taxableIncome: number, relationship: Relationship): number {
  const tarif = relationship === 'married' ? federalData.married : federalData.single;
  const income = round100Down(taxableIncome);
  return Math.max(0, round2(taxBund(income, tarif.table)));
}

/** einfache Staatssteuer (100%) for a canton. */
export function cantonalBaseTax(taxableIncome: number, abbr: string, relationship: Relationship): number {
  const tarifs = (cantonalData.cantons as Record<string, Tarif[]>)[abbr];
  if (!tarifs) throw new Error(`Unknown canton ${abbr}`);
  const tarif = pickTarif(tarifs, relationship);
  return Math.max(0, round2(applyTarif(taxableIncome, tarif, relationship)));
}

export interface Multipliers {
  cantonPct: number;
  cityPct: number;
  capital: string;
  bfsId: number;
}

export function cantonMultipliers(abbr: string): Multipliers {
  const m = (multiplierData.cantons as Record<string, Multipliers>)[abbr];
  if (!m) throw new Error(`No multipliers for ${abbr}`);
  return m;
}

/**
 * Municipal base tax: normally the cantonal base, but SZ (Schwyz) and VS
 * (Sion) capitals have their own municipal tarif in the ESTV data — there the
 * city multiplier applies to that municipal base instead.
 */
export function cityBaseTax(taxableIncome: number, abbr: string, relationship: Relationship): number {
  const cityTarifs = (cantonalData.cityTarifs as Record<string, Tarif[]>)[abbr];
  if (!cityTarifs) return cantonalBaseTax(taxableIncome, abbr, relationship);
  const tarif = pickTarif(cityTarifs, relationship);
  return Math.max(0, round2(applyTarif(taxableIncome, tarif, relationship)));
}

/** Full canton result at the cantonal capital, without church tax. */
export function cantonTax(
  taxableIncome: number,
  abbr: string,
  relationship: Relationship,
): CantonTaxResult {
  const base = cantonalBaseTax(taxableIncome, abbr, relationship);
  const cityBase = cityBaseTax(taxableIncome, abbr, relationship);
  const m = cantonMultipliers(abbr);
  const canton = round2((base * m.cantonPct) / 100);
  const city = round2((cityBase * m.cityPct) / 100);
  const fed = federalTax(taxableIncome, relationship);
  const total = round2(canton + city + fed);
  return {
    abbr,
    capital: m.capital,
    baseTax: base,
    cantonTax: canton,
    cityTax: city,
    federalTax: fed,
    totalTax: total,
    effectiveRate: taxableIncome > 0 ? total / taxableIncome : 0,
  };
}

/**
 * Same as {@link cantonTax}, but for an arbitrary municipal Steuerfuss instead
 * of the cantonal capital's — used to show the spread between the cheapest and
 * the most expensive municipality of a canton.
 *
 * Indicative: the municipal base is the one this canton's capital uses (the
 * cantonal tarif, except in SZ and VS where the ESTV data gives the capital its
 * own municipal tarif). Applying it at another municipality's Steuerfuss is an
 * approximation there; the multiplier itself is the municipality's own.
 */
export function cantonTaxAtMultiplier(
  taxableIncome: number,
  abbr: string,
  relationship: Relationship,
  cityPct: number,
): CantonTaxResult {
  const base = cantonalBaseTax(taxableIncome, abbr, relationship);
  const cityBase = cityBaseTax(taxableIncome, abbr, relationship);
  const m = cantonMultipliers(abbr);
  const canton = round2((base * m.cantonPct) / 100);
  const city = round2((cityBase * cityPct) / 100);
  const fed = federalTax(taxableIncome, relationship);
  const total = round2(canton + city + fed);
  return {
    abbr,
    capital: m.capital,
    baseTax: base,
    cantonTax: canton,
    cityTax: city,
    federalTax: fed,
    totalTax: total,
    effectiveRate: taxableIncome > 0 ? total / taxableIncome : 0,
  };
}

export const ALL_CANTONS: string[] = Object.keys(cantonalData.cantons);

/** All 26 cantons ranked by total tax (ascending). */
export function compareCantons(taxableIncome: number, relationship: Relationship): CantonTaxResult[] {
  return ALL_CANTONS.map((abbr) => cantonTax(taxableIncome, abbr, relationship)).sort(
    (a, b) => a.totalTax - b.totalTax,
  );
}
