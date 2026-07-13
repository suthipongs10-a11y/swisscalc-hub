# STATUS.md — SwissCalc Hub (calcswiss.ch)

## Current state

**M7 built — French trust/legal/methodology pages live (the /fr/ experience is now self-contained). Awaiting review.**

76 pages: 29 German (3 tools + 26 canton) + 5 German editorial + German trust/legal + **35 French** (/fr/ home + 3 tools + 26 canton + **5 trust/legal**). Build clean, tests 69/69, Lighthouse **100×4** on all sampled pages incl. a French legal page. Deployed on Cloudflare Pages (calcswiss.ch live).

**French trust/legal (M7):** `/fr/methodologie/`, `/fr/sources/`, `/fr/a-propos/`, `/fr/mentions-legales/`, `/fr/protection-des-donnees/` — faithful French translations of the German set (nLPD privacy: controller, purposes, recipient countries; full methodology incl. the SZ/Sion separate-tarif note). The French footer + header now link to these French pages (no more cross-locale hops to the German legal set); all five paired de↔fr for reciprocal hreflang + switcher. German output verified byte-identical (control pages unchanged; the 5 newly-paired German legal pages gained only `hreflang="fr-CH"` + the FR switcher).

**French canton pages (M6):** `/fr/calculateur-impots/[canton]/` for all 26 — same anti-doorway discipline as the German set (every intro + one FAQ individually written per canton, a faithful French rendering preserving each canton's verified tax characteristics; quantitative blocks computed from data). Shared engine + renderer (same numbers as German; verified GE 100k single CHF 22'325.79, recompute 200k married CHF 51'162.88). French UI labels, French canton **and capital** names (Genève not Zürich; Coire, Soleure, Bâle, Saint-Gall…), correct French articles in headings (du Valais / des Grisons / d'Argovie). Reciprocal de↔fr hreflang + language switcher now auto-wired on both the German and French canton pages (26 new PAGE_PAIRS). The French comparison table now links through to all 26 French canton pages. German output verified byte-identical (only the intended reciprocal `hreflang="fr-CH"` + FR switcher added; content unchanged; JS-bundle hashes changed from the shared-label refactor).

**Remaining work (all optional / owner-driven, none block anything):**
- **Quellensteuer-Rechner** — deferred since M2, pending tariff files (owner downloads 5 files from estv.admin.ch; instructions ready on request). Quellensteuer *guide* article already live.
- **FR depth (remaining)** — French Ratgeber/guide articles (the German `/ratgeber/` set is not yet translated; FR nav/footer intentionally omit a guide link until they exist); then `/en/` expat hub. FR trust/legal/methodology pages: **done (M7).**
- **Backlog tools** — Franchise-Rechner (needs Sept BAG data).
- **Owner verification checklist** — see below.

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

### 2026-07-13 — Session 9: M7 — French trust/legal/methodology pages

- **5 French pages** completing the `/fr/` experience: `/fr/methodologie/` (full methodology, incl. the SZ/Sion separate municipal-tarif note + known limits), `/fr/sources/` (AFC/OFS/OFSP/OFAS + devbrains, French dataset links), `/fr/a-propos/` (AboutPage schema), `/fr/mentions-legales/` (impressum, owner placeholders), `/fr/protection-des-donnees/` (nLPD: responsable, finalités, pays destinataires, cookieless). Faithful translations of the German set with French internal links.
- **Footer + Header** French branches now link to the French legal/methodology pages (no more cross-locale hops to the German set); German branches untouched. Added Méthodologie to the FR desktop nav + Méthodologie/À propos to the FR mobile menu.
- **Plumbing:** 5 new `STATIC_PAIRS` (methodik↔methodologie, quellen↔sources, ueber-uns↔a-propos, impressum↔mentions-legales, datenschutz↔protection-des-donnees) → reciprocal hreflang + switcher on both sides.
- **Verified:** build clean (0/0/0, 76 pages), tests **69/69**, link/orphan check green (75 pages, ≤3 clicks). **German byte-identical** — stashed to M6, rebuilt, diffed: all control pages (canton/tools/home/ratgeber) identical after hash-normalize; the 5 newly-paired German legal pages gained *only* `hreflang="fr-CH"` + the FR switcher (desktop + mobile). All 5 FR pages driven in Chromium (200, French footer, correct H1s), DE↔FR switcher round-trip (methodik↔methodologie), no console errors. Lighthouse **100×4** on `/fr/methodologie/` (all 9 LHCI URLs assert-pass). Committed, stopped for review.

### 2026-07-13 — Session 8: M6 — 26 French canton pages

- **26 French canton pages** at `/fr/calculateur-impots/[canton]/` (French slugs: geneve, zurich, vaud, valais…) — the French counterpart of `/steuerrechner/[kanton]/`, full SEO_SPEC §3.1 anatomy + §3.2 anti-doorway rules (WebApplication + FAQPage schema, calculator above fold, chiffres-clés table, comparison teaser, 4 FAQs incl. one canton-specific, sources footer).
- **Content** `src/lib/cantonContentFr.ts`: a faithful French rendering of the 26 German canton editorials — individually written per canton (not noun-swapped templates), preserving each canton's verified tax specifics (flat-rate UR/OW, separate municipal tarif SZ/VS, log-formula BL, interpolated FR, family quotient VD, centimes additionnels GE, etc.). New anti-doorway test guards distinct intro heads + length floors.
- **Locale-aware renderer:** `renderCanton.ts` now takes a `CantonRenderLabels` object (DE default byte-identical); added `CANTON_RENDER_LABELS_DE/FR`, `TARIF_LABELS_DE/FR`, French slug/genitive maps, and `frCapital()` (French capital exonyms: Zürich→Zurich, Chur→Coire, Solothurn→Soleure, Basel→Bâle, St. Gallen→Saint-Gall…) wired into both the canton and comparison renderers via a `capitalOf` label (DE = identity → German stays byte-identical). French headings use correct articles (du Valais / des Grisons / d'Argovie).
- **Plumbing:** `PAGE_PAIRS` extended with the 26 canton pairs (generated from the registry) → reciprocal de↔fr hreflang + language switcher auto-appear on both sides. `COMPARISON_LABELS_FR.cantonHref` now points at the French canton pages, so the French comparison table links through to all 26 (no orphans).
- **Verified:** build clean (0 err / 0 warn, 71 pages), tests **69/69** (4 new), link/orphan check green (70 pages, ≤3 clicks), **German byte-identical** (snapshot diff: only the intended `hreflang="fr-CH"` + FR switcher added; canton result boxes + comparison + 3a content unchanged), FR canton page **driven in Chromium** (SSR CHF 22'325.79 → recompute 200k married CHF 51'162.88, capital="Genève", switcher DE⇄FR reciprocal, 26 comparison links), Lighthouse **100×4** on `/fr/calculateur-impots/geneve/`. Committed, stopped for review.

### 2026-07-12 — Session 7: M5 — French locale foundation (+ Cloudflare deploy fix)

- **Deploy:** owner connected Cloudflare Pages; sitemap 404 traced to `astro check` flaking the hosted build → added `build:pages` script (`astro build`, no check) for Pages; `astro check` stays in GitHub CI. `public/_headers`, `.node-version`, `DEPLOY.md` added earlier this session.
- **Locale plumbing:** `src/lib/locales.ts` (Locale type, LOCALE_LANG/OG, `PAGE_PAIRS` de↔fr map, `alternatesFor`, `counterpartOf`); `src/i18n/fr.json`; SEO component gained `locale` + opt-in `alternates` (single-locale pages stay byte-identical); BaseLayout/Header/Footer/Breadcrumbs are locale-aware; language switcher renders only on paired pages.
- **Renderer refactor:** extracted hardcoded German strings from `renderResult`/`renderComparison`/`render3a` into label objects (`SALARY_LABELS_DE/FR`, `COMPARISON_LABELS_DE/FR`, `THREEA_LABELS_DE/FR` incl. French canton names). German defaults reproduce output **byte-identical** — verified by snapshot diff (only JS-bundle content-hashes changed).
- **French pages:** `/fr/` home + `/fr/calculateur-salaire-brut-net/`, `/fr/comparatif-impots-cantons/`, `/fr/calculateur-3e-pilier/`. Separate French island components under `components/fr/` (German islands untouched) sharing the engines/renderers with FR labels. Full §3.1 anatomy, WebApplication + FAQPage schema, French sources.
- **Verified:** German SSR byte-identical (3 tools), hreflang reciprocal de↔fr, `lang="fr-CH"`, link check 44 pages green, all 3 FR calculators driven in Chromium (values match German engine exactly, no console errors), DE→FR switcher round-trip, Lighthouse 100×4 on all 4 FR pages, tests 65/65. Committed, stopped for review.

### 2026-07-12 — Session 6: M4 — E-E-A-T content layer (+ mobile nav)

- **Mobile navigation** (requested between milestones): `<details>`-based hamburger menu (works without JS), desktop nav expanded to list all live tools; both driven by the shared tools registry (unshipped tools never appear). Verified at 390px + 1280px, Lighthouse 100×4.
- **Content collection** (`src/content.config.ts`, glob loader, zod schema) + 4 Ratgeber articles in Swiss German (ss-only, caught by the ß-scanner test): Quellensteuer-Leitfaden für Expats, Säule 3a gestaffelt beziehen, Kantonswechsel, Heiraten & Steuern. Each: lead, related-tool CTA, cross-linked related articles, hand-written FAQs.
- **Ratgeber pages:** `/ratgeber/` index (CollectionPage schema) + `/ratgeber/[slug]/` template (Article + FAQPage schema, dateModified from frontmatter not build time, related-articles module). `seoTitle` frontmatter keeps `<title>` ≤65 while the H1 stays descriptive.
- **Cluster links:** each tool + canton page now surfaces its supporting article(s) via `RatgeberLinks` (looks up ids in the collection — can't produce a broken link). Nav + footer link Ratgeber.
- **Trust pages:** `/methodik/` completed (update-cadence calendar + consolidated known-limitations section); `/ueber-uns/` expanded honestly (mission, how-we-work, what-we-are-not, no invented credentials — AboutPage schema, operator identity stays in Impressum); `docs/data-refresh-runbook.md` operational checklist.
- **Build hygiene:** cleared all `astro check` warnings (zod import via 'zod' not the deprecated re-export; `is:inline` on JSON-LD scripts; removed an unused const) → 0 errors / 0 warnings / 0 hints.
- **Verified:** Ratgeber flow driven in Chromium (index → article → CTA → related, FAQ + 4 JSON-LD blocks, mobile menu has Ratgeber), Lighthouse 100×4 (fixed a slate-400 date byline that dipped a11y to 95), 41 pages, link check green. Committed, stopped for review.

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
