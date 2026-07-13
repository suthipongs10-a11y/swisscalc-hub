/**
 * Import ESTV Quellensteuer (withholding-tax on salaries) tariff files into
 * derived, versioned JSON — the flagship QST calculator's data source.
 *
 * Input : data/raw/qst/txt/tar26<kt>.txt  (official ESTV fixed-width files, one
 *         per canton; format per data/raw/qst/qst-tarife-recordformate-loehne-*.pdf).
 *         The raw files are owner-supplied and git-ignored (RESEARCH.md §4.4):
 *         we publish DERIVED calculation parameters with a citation, not a raw mirror.
 * Output: public/data/qst/<kt>.json  — per canton: _meta + tariff bands for the
 *         consumer tariff groups A/B/C/H (RLE-compressed by rate change).
 *         src/data/qst/index.json    — build-time metadata (canton list, church
 *         availability, children ranges, tariff-file date) for the pages.
 *
 * Record 06 layout (1-indexed): 01-02 recordart, 03-04 transaction, 05-06 canton,
 * 07-16 QSt-code (group+children+church, e.g. A0N/C2Y/H1N), 17-24 valid-from,
 * 25-33 income-from (rappen), 34-42 step (rappen), 44-45 children, 46-54 min-tax
 * (rappen), 55-59 rate (pct*100). All tariffs are MONTHLY income (spec §4.3).
 *
 * Usage: node scripts/import-qst.mjs [--from-dir data/raw/qst/txt] [--year 2026]
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const FROM_DIR = getArg('--from-dir', 'data/raw/qst/txt');
const YEAR = getArg('--year', '2026');
const RETRIEVED = getArg('--retrieved', '2026-07-13');

const CONSUMER_GROUPS = new Set(['A', 'B', 'C', 'H']);
const MAX_KIDS = 5; // model 0–5 children (covers the vast majority; 6+ not shipped)
const RATE_MERGE = 5; // merge consecutive bands whose rate differs by <= 0.05pp (pct*100 units)
const SOURCE = 'https://www.estv.admin.ch/estv/de/home/direkte-bundessteuer/quellensteuer.html';

const OUT_PUBLIC = 'public/data/qst';
const OUT_META = 'src/data/qst';
mkdirSync(OUT_PUBLIC, { recursive: true });
mkdirSync(OUT_META, { recursive: true });

/** Parse one canton .txt → { canton, fileDate, validFrom, codes, church, kids } */
function parseCanton(path) {
  const text = readFileSync(path, 'latin1');
  const lines = text.split(/\r?\n/);
  let canton = '';
  let fileDate = '';
  let validFrom = '';
  const byCode = new Map(); // code -> [{from,min,pct}]
  const allGroups = new Set(); // first char of every tariff code (incl. cross-border)
  const special = new Set(); // record-11 predefined-category codes (HE/ME/NO/SF)
  for (const line of lines) {
    const art = line.slice(0, 2);
    if (art === '00') {
      canton = line.slice(2, 4).trim();
      fileDate = line.slice(19, 27).trim();
    } else if (art === '11') {
      special.add(line.slice(6, 16).trim().slice(0, 2));
    } else if (art === '06') {
      const code = line.slice(6, 16).trim();
      const group = code[0];
      allGroups.add(group);
      if (!CONSUMER_GROUPS.has(group)) continue;
      const kids = parseInt(code[1], 10);
      if (Number.isFinite(kids) && kids > MAX_KIDS) continue;
      if (!validFrom) validFrom = line.slice(16, 24).trim();
      const from = parseInt(line.slice(24, 33), 10);
      const min = parseInt(line.slice(45, 54), 10);
      const pct = parseInt(line.slice(54, 59), 10); // pct * 100
      if (!Number.isFinite(from) || !Number.isFinite(pct)) continue;
      if (!byCode.has(code)) byCode.set(code, []);
      byCode.get(code).push({ from, min, pct });
    }
  }
  // Sort each code by income-from and run-length-encode by (min,pct) change.
  const codes = {};
  for (const [code, bands] of byCode) {
    bands.sort((a, b) => a.from - b.from);
    const rle = [];
    let keptMin = null;
    let keptPct = null;
    for (const b of bands) {
      // New breakpoint when the min-tax changes or the rate moves > RATE_MERGE (0.05pp).
      if (keptPct === null || b.min !== keptMin || Math.abs(b.pct - keptPct) > RATE_MERGE) {
        rle.push([b.from, b.min, b.pct]); // [income-from rappen, min-tax rappen, rate*100]
        keptMin = b.min;
        keptPct = b.pct;
      }
    }
    codes[code] = rle;
  }
  return { canton, fileDate, validFrom, codes, allGroups, special };
}

/** Detect church availability, children ranges and cross-border tariffs. */
function analyse(codes, allGroups, special) {
  const keys = Object.keys(codes);
  const hasN = keys.some((c) => c.endsWith('N'));
  const hasY = keys.some((c) => c.endsWith('Y'));
  const church = hasN && hasY ? 'both' : hasY ? 'Y' : 'N';
  const kidsOf = (group) =>
    keys
      .filter((c) => c[0] === group)
      .map((c) => parseInt(c[1], 10))
      .filter((n) => Number.isFinite(n));
  const maxKids = (group) => (kidsOf(group).length ? Math.max(...kidsOf(group)) : 0);
  const anyGroup = (letters) => letters.split('').some((g) => allGroups.has(g));
  return {
    church,
    groups: ['A', 'B', 'C', 'H'].filter((g) => keys.some((c) => c[0] === g)),
    maxKidsBC: Math.max(maxKids('B'), maxKids('C')),
    maxKidsH: maxKids('H'),
    crossBorderDE: anyGroup('LMNPQ'), // Grenzgänger Deutschland
    crossBorderIT: anyGroup('RSTUV'), // Grenzgänger Italien (nur GR/TI/VS)
    franceAgreement: special.has('SF'), // Sondervereinbarung Frankreich
  };
}

const files = readdirSync(FROM_DIR).filter((f) => /^tar\d\d[a-z]{2}\.txt$/i.test(f));
if (files.length === 0) {
  console.error(`No tar files in ${FROM_DIR}. Unzip the ESTV TXT archive there first.`);
  process.exit(1);
}

const index = { _meta: { source: SOURCE, retrieved: RETRIEVED, taxYear: Number(YEAR) }, cantons: [] };
let totalBytes = 0;

for (const file of files.sort()) {
  const parsed = parseCanton(join(FROM_DIR, file));
  const abbr = parsed.canton;
  if (!abbr) continue;
  const meta = analyse(parsed.codes, parsed.allGroups, parsed.special);
  const validFromIso = parsed.validFrom
    ? `${parsed.validFrom.slice(0, 4)}-${parsed.validFrom.slice(4, 6)}-${parsed.validFrom.slice(6, 8)}`
    : `${YEAR}-01-01`;
  const out = {
    _meta: {
      source: SOURCE,
      description: `Quellensteuertarife für Löhne ${YEAR}, Kanton ${abbr} — derived from the official ESTV tariff file (responsible authority: cantonal tax administration ${abbr}).`,
      retrieved: RETRIEVED,
      taxYear: Number(YEAR),
      validFrom: validFromIso,
      tariffFileDate: parsed.fileDate,
    },
    church: meta.church,
    codes: parsed.codes,
  };
  const json = JSON.stringify(out);
  writeFileSync(join(OUT_PUBLIC, `${abbr.toLowerCase()}.json`), json);
  totalBytes += json.length;
  index.cantons.push({
    abbr,
    church: meta.church,
    groups: meta.groups,
    maxKidsBC: meta.maxKidsBC,
    maxKidsH: meta.maxKidsH,
    crossBorderDE: meta.crossBorderDE,
    crossBorderIT: meta.crossBorderIT,
    franceAgreement: meta.franceAgreement,
    validFrom: validFromIso,
    tariffFileDate: parsed.fileDate,
  });
}

index.cantons.sort((a, b) => a.abbr.localeCompare(b.abbr));
writeFileSync(join(OUT_META, 'index.json'), JSON.stringify(index, null, 2) + '\n');

console.log(`QST import: ${index.cantons.length} cantons → ${OUT_PUBLIC}/*.json (${(totalBytes / 1024 / 1024).toFixed(2)} MB total)`);
console.log(`Church modes:`, index.cantons.map((c) => `${c.abbr}:${c.church}`).join(' '));
