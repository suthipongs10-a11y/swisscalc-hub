# STATUS.md — SwissCalc Hub (calcswiss.ch)

## Current state

**M3 built — 26 programmatic canton pages live. Awaiting review. Do not start M4 without approval.**

36 pages total: 3 tools + 26 `/steuerrechner/[kanton]/` pages + trust/legal pages. Tests 65/65, Lighthouse 100×4 (sampled incl. canton pages), CI now enforces internal-link integrity (no orphans, ≤3 clicks, no broken links). Every canton page passes the anti-doorway bar: hand-written unique intro (verified: 26/26 distinct), canton data table, computed comparison teaser + FAQs, official portal link.

**M2 leftover unchanged:** Quellensteuer-Rechner still deferred pending tariff files (see M2 deviation below — owner downloads 5 files from estv.admin.ch in a normal browser, no special access needed; detailed instructions will be provided when you're ready).

Live tools: `/brutto-netto-rechner/`, `/steuervergleich/` (all 26 cantons), `/saeule-3a-rechner/`. Build ✓, tests 65/65 ✓, Lighthouse **100×4** on all sampled pages, both new calculators **driven live in Chromium** (values match the pinned engine references exactly, no console errors).

### ⚠️ M2 scope deviation: Quellensteuer-Rechner deferred (owner decision needed)

The official QST tariff files (ESTV/cantonal downloads) are unreachable from this sandbox — admin.ch and all cantonal domains are blocked by the egress proxy, and no verifiable mirror exists. Building the flagship QST calculator with unverifiable rates would violate the data contract (CLAUDE.md hard constraint 2), so it was **not** built. Options:
- **(a)** Owner downloads the 5 canton tariff files (ZH/GE/ZG/VD/BS, format "Tarife 2026" from estv.admin.ch → Quellensteuer → Tarife herunterladen) and commits them to `/data/raw/qst/` — the next session builds importer + engine + page on real data.
- **(b)** Run the QST build step from an environment with admin.ch access (e.g. local Claude Code).
Everything else (tax engine, canton registry, page patterns) is ready for it.

### Tax-engine verification caveat (important, honest)

Engine outputs are pinned to an independent recomputation from the official ESTV tables + validated against the reference implementation's semantics + invariant-checked across all 26 cantons. They could NOT be compared against the live ESTV calculator from this sandbox (blocked). **Owner checklist: once outside the sandbox, spot-check ~5 sample calculations against swisstaxcalculator.estv.admin.ch** (e.g. 100k single ZH/ZG/VS, 100k married ZH, 60k single VS) before promoting the tools publicly.

**Owner-side before public launch** (carried from M0/M1):

1. Connect Cloudflare Pages (build `npm run build`, output `dist`), attach calcswiss.ch + www.
2. Enable Cloudflare Web Analytics.
3. Fill Impressum identity in `impressum.astro` + `datenschutz.astro`.
4. Send ESTV consent letter (`docs/estv-consent-request.md`); log date below.
5. GSC + Bing verification, sitemap, IndexNow; request-indexing for the 3 tool pages.
6. Keyword Planner validation → RESEARCH.md addendum.
7. QST tariff files (see deviation above).
8. ESTV spot-check (see caveat above).

Read order for a fresh session: `CLAUDE.md` → `BUILD_PLAN.md` (current milestone) → `SEO_SPEC.md` → this file. `RESEARCH.md` is the evidence base.

## Decisions (locked)

| Decision | Value | Date |
|---|---|---|
| Domain / brand | **calcswiss.ch** / CalcSwiss (owner registering) | 2026-07-12 |
| Analytics | Cloudflare Web Analytics (cookieless, no banner) | 2026-07-12 |
| Monetization at launch | None — ad-free, no CMP. Ads = future milestone with certified TCF CMP | 2026-07-12 |
| ESTV data posture | Derived parameters + citations + prominent attribution; consent letter drafted at `docs/estv-consent-request.md`, send after M1 Impressum is live | 2026-07-12 |
| Builder | Sessions may run on different models; docs are the contract (see CLAUDE.md) | 2026-07-12 |

## Session log

### 2026-07-12 — Session 5: M3 — 26 programmatic canton pages

- Import extended: `canton-stats-2026.json` (per-canton municipality count, cheapest/most expensive municipality from all 2,110 ESTV factor entries).
- `src/lib/cantonContent.ts`: 26 individually written German intros (~100 words each, built around each canton's verifiable tax characteristics: OW/UR flat tax, BL formula tariff, VD Familienquotient, GE centimes additionnels, SZ/VS municipal tarifs, BS three municipalities, …) + 1 distinctive hand-written FAQ per canton + comparison-canton selection + official portal links. Verified post-build: all 26 intros distinct.
- `/steuerrechner/[kanton]/` template: canton-preset calculator island (shared bundle via data attribute), data table (tarif system, multipliers, min/max municipality, rank), computed comparison teaser linking 3 related canton pages, 3 computed + 1 editorial FAQ (FAQPage schema), WebApplication schema, title-length guard for long canton names.
- Link mesh: /steuervergleich/ table rows now link to all 26 canton pages (2 clicks from home); canton pages link up (steuervergleich), across (3 cantons), down (tools), out (canton portal).
- `scripts/check-links.mjs` in CI: fails on broken internal links, orphans, >3 click depth, missing trailing slashes. Current: 35 pages green.
- Verified: 5 canton pages spot-checked against pinned engine values (ZH/ZG/VS/SZ/GE), ZH page driven live in Chromium (150k married recompute correct, no errors), Lighthouse 100×4 sampled on 3 canton pages. 36 pages built. Committed, stopped for review.

### 2026-07-12 — Session 4: M2 Steuervergleich + Säule 3a (QST deferred)

- **Data spike:** ESTV API, cantonal sites, vercel reference app all blocked by sandbox proxy; GitHub raw reachable. Data path: ESTV raw exports committed in devbrains/swisstaxcalculator (MIT), identical to the ESTV API payloads (verified in P0 research 3-0).
- **Import pipeline** `scripts/import-estv.mjs` (tries ESTV direct, falls back to devbrains mirror): derives `/src/data/tax/federal-income-2026.json`, `cantonal-income-2026.json` (all 26 cantons incl. city-tarif overrides), `multipliers-2026.json` (canton + capital Steuerfüsse). Raw files NOT committed (licensing posture).
- **Engine** `src/lib/tax/engine.ts`: all 5 ESTV table types (BUND thresholds, ZUERICH band widths incl. mislabeled-table workaround, FLATTAX, FREIBURG interpolation, FORMEL log-expressions for BL), splitting for married tariffs, round-100-down, multiplier application.
- **Finding during verification:** SZ (Schwyz) and VS (Sion) capitals carry their own municipal income tarif in the ESTV data; applying the city multiplier to the cantonal base (as the reference implementation does) overstates Sion by ~48% at 100k. We apply the city multiplier to the official municipal tarif instead — more faithful to the primary data. Documented in /methodik/.
- **Tests:** 30 new engine tests — pinned to an independent Python recomputation of the same official tables (federal, ZH/ZG/GE/BL/FR/UR/VS singles + married + city override) plus invariants across all 26 cantons (monotonic in income, married ≤ single, sorted ranking, ZG cheapest at 100k). Total suite 65/65.
- **Pages:** `/steuervergleich/` (income + Zivilstand → live ranking of all 26 capitals with bars, delta headline) and `/saeule-3a-rechner/` (income/contribution/canton/Zivilstand → saving; BSV 2026 maxima CHF 7'258 / 36'288 verified via BSV FAQ). Full SEO_SPEC §3.1 anatomy, WebApplication + FAQPage schema, cross-links (brutto-netto ↔ steuervergleich ↔ 3a), methodik + quellen updated (devbrains attribution added).
- **Verified:** browser-driven both tools (values match pinned references exactly: Zug 10'009 @100k single; ZH 3a saving 1'887.78), Lighthouse 100×4 on all pages, 10 pages built.
- **QST deferred** — see scope deviation in Current state. Committed, stopped for review.

### 2026-07-12 — Session 3: M1 Brutto-Netto-Rechner (built on Opus 4.8)

- Verified official 2026 employee contribution rates from BSV / ahv-iv.ch / SECO / koordination.ch / Art. 16 BVG: AHV/IV/EO 5.3% (no ceiling), ALV 1.1% to CHF 148'200, NBU plan-specific (UVG ceiling 148'200), BVG entry 22'680 / coord. deduction 26'460 / coord. salary 3'780–64'260 / Altersgutschriften 7-10-15-18% / 50% employee share.
- Data: `src/data/social-contributions-2026.json` (per-value sources) + `src/data/cantons.json` (26 cantons, BFS IDs + SEO_SPEC slugs, for the selector and M3 reuse). Both pass the `_meta` schema test.
- Engine: `src/lib/salary/engine.ts` — pure functions (coordinated salary, age-band credit, full deduction calc). 27 unit tests pinned to hand-computed official values incl. edge cases (ALV ceiling, below entry threshold, age <25, min/max coordinated, all age bands).
- Page `/brutto-netto-rechner/` per SEO_SPEC §3.1: island above fold (monthly/13th toggle, age, BVG, advanced NBU + canton selector) → methodology table w/ sources → worked example → 6 FAQs → RelatedTools → sources footer + "Zuletzt aktualisiert". Schema: WebApplication + FAQPage (+ Organization + BreadcrumbList).
- SSR-first island (usable without JS); client script shares the engine + renderer (one source of truth). Swiss format CHF 12'345.60 (`src/lib/format.ts`, tested).
- Shared `src/lib/tools.ts` registry drives homepage + RelatedTools; unbuilt tools render link-less (no orphans/broken links). Brutto-netto card now links live.
- **Verified live in Chromium** (Playwright): default net CHF 75'007; after edit (144k, age 55) BVG caps at 9% = CHF 5'783.40, net CHF 126'984.60 — all match the engine. Lighthouse 100×4 on all 5 pages. Committed, stopped for review.

### 2026-07-12 — Session 2: M0 scaffold

- Owner registered calcswiss.ch and approved M0 start.
- Built the full M0 scaffold: Astro 7 + Tailwind 4 (vite plugin) + TS strict + Vitest; `trailingSlash: 'always'`, `site: https://calcswiss.ch`.
- Layout system: `BaseLayout` (lang de-CH, system fonts, no web fonts), `SEO.astro` (unique title/meta, canonical with trailing-slash guard, hreflang de-CH + x-default, OG/Twitter, Organization JSON-LD sitewide, per-page JSON-LD injection), `Breadcrumbs.astro` (visible + BreadcrumbList).
- i18n plumbing: `/src/i18n/de.json` + typed `useTranslations()`; no hardcoded UI copy in components.
- Pages: homepage hub (WebSite schema, 5 unlinked "In Arbeit" tool cards — no broken links), `/impressum/`, `/datenschutz/` (nFADP: controller/purposes/recipient countries; cookieless), `/methodik/` stub, `/ueber-uns/`, `/quellen/`, 404.
- Technical SEO: sitemap (`@astrojs/sitemap`), robots.txt, `_redirects` (www→apex 301), static OG image (generated via `scripts/generate-og.mjs`, committed), favicon (abstract mark — no Swiss cross).
- Tests as guardrails: `_meta` schema validation for `/src/data/*.json`, **ß-scanner** (any ß in src fails CI), i18n smoke tests.
- CI: GitHub Actions — vitest + astro build + Lighthouse CI (`lighthouserc.json`, all categories ≥ 0.95, mobile).
- **Exit gate:** build clean, tests 4/4 green, Lighthouse 100×4 on `/`, `/impressum/`, `/datenschutz/`, `/methodik/` (local dist run; LHCI public upload blocked by sandbox proxy — scores extracted from local reports). Committed, stopped for review.

### 2026-07-12 — Session 1: Phase 0 research + project docs + handoff prep

- Deep research (5 angles, ~58 agents; 10 key claims adversarially verified 3-0) → `RESEARCH.md`.
- Wrote `CLAUDE.md`, `BUILD_PLAN.md`, `STATUS.md`; committed `P0: research + project docs`.
- Owner review: domain calcswiss.ch chosen ($18.98/yr), risk/effort assessment accepted, decision to proceed.
- Handoff prep: added `SEO_SPEC.md` (binding URL map, page anatomies incl. anti-doorway rules for programmatic pages, JSON-LD map, internal-linking topology, technical checklist, indexing/launch checklist, KPI gates, maintenance calendar) and `docs/estv-consent-request.md` (German draft letter + sending protocol). Wired SEO_SPEC tasks into BUILD_PLAN milestones. **M0 approved.**

## Pending / action items

1. **Owner:** register calcswiss.ch; connect to Cloudflare Pages when M0 deploys.
2. **M1:** send ESTV letter (needs `[NAME]`, `[ADRESSE]`, `[E-MAIL]` = Impressum identity); log send date here.
3. **M1:** validate keyword volumes via Google Keyword Planner; append actuals to RESEARCH.md.
4. **Open question (M2):** Quellensteuer tariff-file formats per canton not yet inspected — first task of M2 is a data spike on ZH + GE tariff files before building the tool UI.

## Data-freshness watchlist

| Item | Verify when |
|---|---|
| Säule 3a max deduction (CHF 7'258 was the 2025 value) | At M2 build time, against BSV |
| ESTV 2026 tax data completeness (22/26 cantons live as of research) | Before M3 import |
| BAG premium dataset (next drop ~Sept 2026) | Before premium-finder tool |
| EMBAG open-data transition (may resolve ESTV licensing) | ~Jan 2027 |

## KPI checkpoints (from SEO_SPEC §10)

- M1 + 3 months: brutto-netto page shows GSC impressions.
- M3 + 3 months: ≥13/26 canton pages with impressions; any top-30 ranking for a `steuerrechner [kanton]` term → unlocks municipality/`/fr/` consideration.
