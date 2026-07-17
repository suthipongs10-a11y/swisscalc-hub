/**
 * Regroups the per-canton Quellensteuer tariffs (public/data/qst/<kt>.json,
 * built by import-qst.mjs) into per-situation comparison files:
 *
 *   public/data/qstv/<group><children>.json
 *     = { _meta, key, cantons: { ZH: { church, N: bands, Y: bands }, ... } }
 *
 * One fetch then covers all 26 cantons for a given family situation; salary
 * and church-tax changes recompute client-side without another request.
 * Situation keys mirror the calculator UI: A0, B0-B5, C0-C5, H1-H5.
 *
 * Run after import-qst.mjs (yearly refresh); outputs are committed.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const index = JSON.parse(readFileSync(join(root, 'src/data/qst/index.json'), 'utf8'));
const outDir = join(root, 'public/data/qstv');
mkdirSync(outDir, { recursive: true });

const KEYS = [
  'A0',
  ...[0, 1, 2, 3, 4, 5].map((n) => `B${n}`),
  ...[0, 1, 2, 3, 4, 5].map((n) => `C${n}`),
  ...[1, 2, 3, 4, 5].map((n) => `H${n}`),
];

const cantonData = {};
for (const c of index.cantons) {
  cantonData[c.abbr] = JSON.parse(readFileSync(join(root, `public/data/qst/${c.abbr.toLowerCase()}.json`), 'utf8'));
}

let totalBytes = 0;
for (const key of KEYS) {
  const cantons = {};
  for (const c of index.cantons) {
    const data = cantonData[c.abbr];
    const entry = { church: data.church };
    for (const church of ['N', 'Y']) {
      const bands = data.codes[`${key}${church}`];
      if (bands && bands.length) entry[church] = bands;
    }
    if (entry.N || entry.Y) cantons[c.abbr] = entry;
  }
  const out = {
    _meta: {
      source: index._meta.source,
      retrieved: index._meta.retrieved,
      taxYear: index._meta.taxYear,
      derivedFrom: 'public/data/qst/<kt>.json (scripts/import-qst.mjs)',
    },
    key,
    cantons,
  };
  const json = JSON.stringify(out);
  writeFileSync(join(outDir, `${key.toLowerCase()}.json`), json);
  totalBytes += json.length;
  console.log(`${key.toLowerCase()}.json  ${(json.length / 1024).toFixed(0)} KB  (${Object.keys(cantons).length} cantons)`);
}
console.log(`total ${(totalBytes / 1024 / 1024).toFixed(2)} MB across ${KEYS.length} files`);
