# Data-refresh runbook

Operational checklist for keeping CalcSwiss data current. Every data change is a `data:` commit touching only `/src/data/**` (+ this file / STATUS.md if needed). After any refresh: `npm test && npm run build && node scripts/check-links.mjs` must pass, then spot-check a few values against the official source.

Each data file's `_meta.retrieved` date is what the site shows as "Zuletzt aktualisiert" — **bump it whenever the values change**, never for cosmetic edits (no fake freshness).

---

## Yearly — early January (new tax year)

New `taxYear`. Do these together and bump `SITE_YEAR` in `src/lib/site.ts` (drives all titles/H1s in one place).

1. **ESTV tax data** (federal tariff, 26 cantonal scales, multipliers, canton stats):
   ```
   node scripts/import-estv.mjs --year <YEAR>
   ```
   - From an environment with admin.ch access this hits the ESTV API directly.
   - Otherwise it falls back to the devbrains mirror (`github.com/devbrains-com/swisstaxcalculator`, `data/raw/<YEAR>`) — confirm that repo has published the new year first.
   - Rename outputs if the tool references a hardcoded year in imports, or keep the `-<YEAR>.json` suffix and update the `import` lines in `src/lib/tax/engine.ts` + `[kanton].astro`.
   - **Verify:** spot-check 3–5 canton totals against `swisstaxcalculator.estv.admin.ch` (e.g. 100k single ZH/ZG/VS). Update the pinned values in `tests/tax-engine.test.ts` if the tariffs changed.

2. **Social contributions** (`src/data/social-contributions-<YEAR>.json`):
   - AHV/IV/EO rate, ALV rate + ceiling: check `ahv-iv.ch` Merkblatt 2.01 / 2.08 and the BSV "Beträge" leaflet.
   - BVG masszahlen (entry threshold, coordination deduction, coordinated min/max): `koordination.ch` / BSV. Adjusted biennially — next review 2027.
   - Update `tests/salary-engine.test.ts` pins if any rate changed.

3. **Säule 3a maxima** (`src/data/saeule-3a-2026.json`): BSV sets these each October for the coming year. Check `faq.bsv.admin.ch` (3. Säule).

## Yearly — late September (health premiums)

- BAG publishes approved KVG premiums on `opendata.swiss` (`health-insurance-premiums`). Needed for the Franchise-Rechner (backlog). True open data — no licensing caveat.

## Event-driven

- **Quellensteuer tariffs (all 26 cantons):** the ESTV publishes the tariff files (`tar<jj>txt.zip`) once a year, usually early December. Owner drops the zip into `data/raw/qst/` (git-ignored), then: `unzip … -d data/raw/qst/txt && node scripts/import-qst.mjs --year <YYYY> --retrieved <date>` → regenerates `public/data/qst/*.json` + `src/data/qst/index.json`. Full procedure + source path: `data/raw/qst/README.md`.
- **EMBAG open-data status (~Jan 2027):** the ESTV licensing restriction may lapse; re-check whether the data can move to a cleaner open-data footing (see RESEARCH.md §4.4).

## Municipality count sanity

`canton-stats-<YEAR>.json` municipality counts should track BFS (≈2,110 as of 1.1.2026; municipalities merge over time). A large drop usually means the source year is incomplete — re-run the import.
