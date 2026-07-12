/**
 * Derives compact, versioned tax parameters into /src/data/tax/ from the ESTV
 * swisstaxcalculator dataset (CLAUDE.md licensing posture: derived calculation
 * parameters with citations, no verbatim mirror; raw files are NOT committed).
 *
 * Authoritative source:  https://swisstaxcalculator.estv.admin.ch/#/taxdata
 * Primary fetch:         ESTV internal API (blocked from some networks)
 * Fallback fetch:        github.com/devbrains-com/swisstaxcalculator (MIT),
 *                        which commits the identical ESTV raw exports per year.
 *
 * Usage:
 *   node scripts/import-estv.mjs [--year 2026] [--from-dir <dir with raw-*.json>]
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const year = Number(args[args.indexOf('--year') + 1] || 2026);
const fromDirIdx = args.indexOf('--from-dir');
const fromDir = fromDirIdx >= 0 ? args[fromDirIdx + 1] : null;

const ESTV_API =
  'https://swisstaxcalculator.estv.admin.ch/delegate/ost-integration/v1/lg-proxy/operation/c3b67379_ESTV';
const MIRROR = `https://raw.githubusercontent.com/devbrains-com/swisstaxcalculator/master/data/raw/${year}`;

// BFS numbers of the 26 cantonal capitals (Kantonshauptorte), keyed by canton abbr.
const CAPITALS = {
  ZH: 261, BE: 351, LU: 1061, UR: 1201, SZ: 1372, OW: 1407, NW: 1509, GL: 1632,
  ZG: 1711, FR: 2196, SO: 2601, BS: 2701, BL: 2829, SH: 2939, AR: 3001, AI: 3101,
  SG: 3203, GR: 3901, AG: 4001, TG: 4566, TI: 5002, VD: 5586, VS: 6266, NE: 6458,
  GE: 6621, JU: 6711,
};

async function loadRaw(name, apiPath, body) {
  if (fromDir) {
    return JSON.parse(readFileSync(join(fromDir, `raw-${name}.json`), 'utf-8')).response;
  }
  try {
    const res = await fetch(`${ESTV_API}${apiPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`ESTV HTTP ${res.status}`);
    return (await res.json()).response;
  } catch (err) {
    console.warn(`ESTV direct failed for ${name} (${err.message}) — using devbrains mirror`);
    const res = await fetch(`${MIRROR}/${name}.json`);
    if (!res.ok) throw new Error(`Mirror HTTP ${res.status} for ${name}`);
    return (await res.json()).response;
  }
}

const tarifs = await loadRaw('tarifs', '/API_exportManyTaxScales', { TaxYear: year, TaxGroupID: 88 });
const factors = await loadRaw('factors', '/API_exportManySimpleRates', { TaxYear: year, TaxGroupID: 99 });

const retrieved = process.env.IMPORT_DATE ?? new Date().toISOString().slice(0, 10);
const meta = (description) => ({
  source: 'https://swisstaxcalculator.estv.admin.ch/#/taxdata',
  retrievedVia: `https://github.com/devbrains-com/swisstaxcalculator (MIT) — data/raw/${year}`,
  retrieved,
  taxYear: year,
  description,
  license:
    'ESTV data is not open-data licensed; stored here as derived calculation parameters with attribution (see RESEARCH.md 4.4).',
});

const mapRow = (r) => {
  const row = { amount: r.Amount, taxes: r.Taxes, percent: r.Percent };
  if (r.Formula && r.Formula.trim() !== '') row.formula = r.Formula;
  return row;
};
const mapEntry = (e) => ({
  groups: e.Group.split(',').filter(Boolean),
  tableType: e.TableType,
  splitting: e.Splitting,
  table: e.Table.map(mapRow),
});

// 1) Federal income tariffs -------------------------------------------------
const fedEntries = tarifs.filter((e) => e.TaxType === 'EINKOMMENSSTEUER' && e.Target === 'BUND');
// Federal tables are duplicated per location — dedupe by group string.
const fedByGroup = new Map(fedEntries.map((e) => [e.Group, e]));
const fedSingle = [...fedByGroup.values()].find((e) => e.Group.includes('LEDIG_OHNE_KINDER'));
const fedMarried = [...fedByGroup.values()].find((e) => e.Group.includes('VERHEIRATET'));
if (!fedSingle || !fedMarried) throw new Error('Federal tariff groups not found');

const federal = {
  _meta: meta(
    'Direct federal tax (dBSt) income tariffs. Table semantics: rows are thresholds; tax = row.taxes + (income - row.amount) * row.percent/100 for the last row with amount <= income (income rounded down to CHF 100).',
  ),
  single: mapEntry(fedSingle),
  married: mapEntry(fedMarried),
};

// 2) Cantonal income scales -------------------------------------------------
const cantonal = {
  _meta: meta(
    'Cantonal income-tax base tariffs (einfache Steuer) for all 26 cantons. tableType semantics follow the reference implementation (BUND thresholds / ZUERICH band widths / FLATTAX / FREIBURG interpolated effective rate / FORMEL expression with $wert$ and log).',
  ),
  cantons: {},
};
for (const e of tarifs.filter((x) => x.TaxType === 'EINKOMMENSSTEUER' && x.Target === 'KANTON')) {
  const abbr = e.Location.Canton;
  (cantonal.cantons[abbr] ??= []).push(mapEntry(e));
}
const cantonCount = Object.keys(cantonal.cantons).length;
if (cantonCount !== 26) throw new Error(`Expected 26 cantons, got ${cantonCount}`);

// Some capitals (SZ Schwyz, VS Sion) have their OWN municipal income tarif in
// the ESTV data — there the city multiplier applies to the municipal base, not
// the cantonal base. Export those tables so the engine can override.
cantonal.cityTarifs = {};
for (const e of tarifs.filter(
  (x) => x.TaxType === 'EINKOMMENSSTEUER' && x.Target === 'GEMEINDE',
)) {
  const abbr = e.Location.Canton;
  if (e.Location.BfsID !== CAPITALS[abbr]) continue; // only capital cities
  (cantonal.cityTarifs[abbr] ??= []).push(mapEntry(e));
}

// 3) Multipliers (Steuerfüsse) for canton + capital city ---------------------
const multipliers = {
  _meta: meta(
    'Income-tax multipliers (Steuerfuesse) in percent of the cantonal base tariff, for each canton and its capital municipality. Church tax excluded (calculators show "ohne Kirchensteuer"). Municipal tax = base * cityPct/100, cantonal tax = base * cantonPct/100 — same model as the reference implementation.',
  ),
  cantons: {},
};
for (const [abbr, bfsId] of Object.entries(CAPITALS)) {
  const f = factors.find((x) => x.Location?.BfsID === bfsId);
  if (!f) throw new Error(`No factors for capital of ${abbr} (BFS ${bfsId})`);
  multipliers.cantons[abbr] = {
    cantonPct: f.IncomeRateCanton,
    cityPct: f.IncomeRateCity,
    capital: f.Location.BfsName,
    bfsId,
  };
}

// 4) Per-canton municipality statistics (for the canton pages, M3) -----------
const cantonStats = {
  _meta: meta(
    'Per-canton statistics over the municipal income-tax multipliers (Steuerfuesse) of ALL municipalities in the canton: count, cheapest and most expensive municipality. Basis: ESTV simple-rates dataset (one entry per BFS municipality).',
  ),
  cantons: {},
};
for (const f of factors) {
  const abbr = f.Location?.Canton;
  if (!abbr || !(abbr in CAPITALS)) continue;
  const s = (cantonStats.cantons[abbr] ??= {
    municipalityCount: 0,
    minCity: null,
    maxCity: null,
  });
  s.municipalityCount++;
  const pct = Math.round(f.IncomeRateCity * 100) / 100;
  if (!s.minCity || pct < s.minCity.pct) {
    s.minCity = { name: f.Location.BfsName, pct };
  }
  if (!s.maxCity || pct > s.maxCity.pct) {
    s.maxCity = { name: f.Location.BfsName, pct };
  }
}
if (Object.keys(cantonStats.cantons).length !== 26) throw new Error('canton stats incomplete');

// Write --------------------------------------------------------------------
const outDir = join(process.cwd(), 'src', 'data', 'tax');
mkdirSync(outDir, { recursive: true });
const write = (name, obj) => {
  writeFileSync(join(outDir, name), JSON.stringify(obj, null, 2) + '\n');
  console.log(`wrote src/data/tax/${name}`);
};
write(`federal-income-${year}.json`, federal);
write(`cantonal-income-${year}.json`, cantonal);
write(`multipliers-${year}.json`, multipliers);
write(`canton-stats-${year}.json`, cantonStats);
console.log('Done.');
