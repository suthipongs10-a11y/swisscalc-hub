# STATUS.md — SwissCalc Hub (calcswiss.ch)

## Current state

**Latest (Session 16, M12): two new tools + guide depth — 217 pages.** Quellensteuer-Vergleich (all 26 cantons ranked from one salary; unique in the market), Stundenlohn-Rechner (high-volume keyword, OR-derived vacation supplements), and 3 new guide articles ×3 languages (NOV/ordinary assessment, 13th month salary, cross-border commuters). Tests 98/98. Awaiting review.

**Session 15: hero illustrations on every page** — a decorative inline-SVG hero band (`HeroArt.astro`), 10 on-topic variants, path-driven from `BaseLayout`; canton pages print their abbreviation.

**M11 built — 78 per-canton Quellensteuer SEO pages (26 × 3 languages).**

**202 pages**, trilingual DE + FR + EN. The QST flagship now has per-canton landing pages targeting the "quellensteuer [kanton]" / "impôt à la source [canton]" long-tail: `/quellensteuer-rechner/[kanton]/`, `/fr/calculateur-impot-source/[canton]/`, `/en/withholding-tax-calculator/[canton]/` for all 26 cantons. Build clean, tests 85/85, Lighthouse **100×4** on sampled QST canton pages. Deployed on Cloudflare Pages (calcswiss.ch live).

**QST canton pages (M11):** each page presets the canton (SSR default read from the tariff data on disk, lazy-fetch for recompute), shows an individually-written intro + FAQ (SEO_SPEC §3.2 anti-doorway — anchored on that canton's real withholding profile: monthly vs annual model, whether church tax is levied at source, Italian cross-border / France-agreement tariffs), a computed key-figures block (model, church mode, example monthly QST at 6k/8k/10k for a single person), and cross-links to the **same canton's income-tax page** + salary tool + QST index. The 3 QST index pages gained a 26-canton grid. `import-qst.mjs` extended to detect cross-border/France-agreement flags per canton; annual-model list (FR/GE/TI/VD/VS) in a lib constant. All 78 pages paired de↔fr↔en (hreflang + switcher).

**Quellensteuer-Rechner (M10):** `/quellensteuer-rechner/`, `/fr/calculateur-impot-source/`, `/en/withholding-tax-calculator/` — the flagship SEO tool, unblocked once the owner supplied the official ESTV tariff files. Covers **all 26 cantons**, tariff codes A/B/C/H, 0–5 children, church tax (where the canton levies it at source — correctly detected: GE/NE/TI/VD/VS = no church tariff, JU = church only, rest = both). `scripts/import-qst.mjs` decodes the official ESTV fixed-width tariff files (record format per the spec PDF) into derived per-canton JSON with rates merged to 0.05pp (compact, indicative model — §4.4 posture: derived params + citation, raw files git-ignored, not mirrored). The large tables are **lazy-loaded per canton** (`/data/qst/<kt>.json`, same-origin static, fetched only on canton select — not an external API); the default canton (ZH) is server-rendered so the page works without JS. Verified in Chromium: SSR ZH single 6500/mo = CHF 469.95 (7.2%), lazy fetch on canton change, church UI hides for N-only cantons, children UI appears for married/single-parent, no console errors. Engine unit + data-integrity tests pinned (81/81).

**Guide layer (M9):** the 4 German Ratgeber articles (withholding tax for expats, staggered pillar 3a, changing canton, marriage & taxes) translated to French (`/fr/guide/…`) and English (`/en/guide/…`) — faithful translations with locale-specific frontmatter (each article's relatedTool + related-articles + in-body links point to that locale's pages). Two new content collections (`ratgeberFr`, `ratgeberEn`) share one schema; locale-aware guide hub + `[slug]` pages. The guide is now in the FR/EN header + footer nav, and all guide pages are paired de↔fr↔en for reciprocal hreflang + switcher (the German Ratgeber pages became trilingual — verified content-identical, only the switcher/hreflang UI added). Internal-link mesh: guide hub → articles → related tool + sibling articles; tools reachable from every article.

**English locale (M8):** `/en/` home + salary calculator, cantonal tax comparison, pillar 3a, 26 `/en/tax-calculator/[canton]/` pages, and the 5 trust/legal pages (methodology, sources, about, legal-notice, privacy). Same shared engines (numbers identical across all three locales — verified EN net CHF 75'007, GE 100k single CHF 22'325.79, recompute 200k married CHF 51'162.88, Zug rank 1). English canton + capital names (Geneva, Lucerne; Graubünden, St. Gallen…), FTA/FSO/FOPH/FSIO source terminology. The locale plumbing was generalised from de↔fr pairs to **multi-locale PAGE_GROUPS**, so hreflang is now a reciprocal de-CH/fr-CH/en-CH set (x-default → German) and the language switcher shows **two chips** per page (e.g. a German page offers FR + EN). German + French output verified content-identical (22/22 sampled pages byte-identical after stripping the intended added `hreflang="en-CH"` + EN switcher; the comparison/canton calculators, FAQs and legal text are unchanged).

**French trust/legal (M7):** `/fr/methodologie/`, `/fr/sources/`, `/fr/a-propos/`, `/fr/mentions-legales/`, `/fr/protection-des-donnees/` — faithful French translations of the German set (nLPD privacy: controller, purposes, recipient countries; full methodology incl. the SZ/Sion separate-tarif note). The French footer + header now link to these French pages (no more cross-locale hops to the German legal set); all five paired de↔fr for reciprocal hreflang + switcher. German output verified byte-identical (control pages unchanged; the 5 newly-paired German legal pages gained only `hreflang="fr-CH"` + the FR switcher).

**French canton pages (M6):** `/fr/calculateur-impots/[canton]/` for all 26 — same anti-doorway discipline as the German set (every intro + one FAQ individually written per canton, a faithful French rendering preserving each canton's verified tax characteristics; quantitative blocks computed from data). Shared engine + renderer (same numbers as German; verified GE 100k single CHF 22'325.79, recompute 200k married CHF 51'162.88). French UI labels, French canton **and capital** names (Genève not Zürich; Coire, Soleure, Bâle, Saint-Gall…), correct French articles in headings (du Valais / des Grisons / d'Argovie). Reciprocal de↔fr hreflang + language switcher now auto-wired on both the German and French canton pages (26 new PAGE_PAIRS). The French comparison table now links through to all 26 French canton pages. German output verified byte-identical (only the intended reciprocal `hreflang="fr-CH"` + FR switcher added; content unchanged; JS-bundle hashes changed from the shared-label refactor).

**Remaining work (all optional / owner-driven, none block anything):**
- **Quellensteuer-Rechner: DONE (M10).** Owner supplied the official ESTV tariff files; the flagship calculator now covers all 26 cantons in all 3 languages.
- **Guide/Ratgeber depth: done (M9).** All 3 locales have the full guide layer (4 articles each).
- **Backlog tools** — Franchise-Rechner (needs Sept BAG data).
- **Per-canton QST landing pages: DONE (M11).** 78 pages (26 × 3 languages) for the "quellensteuer [kanton]" long-tail.
- **Municipality-level pages** (~2,110 BFS IDs) — possible after canton pages prove out in GSC.
- **Owner verification checklist** — see below.

Live tools (each in DE/FR/EN): brutto-netto, **Quellensteuer**, Steuervergleich (26 cantons), Säule 3a. Build ✓, tests 81/81 ✓, Lighthouse **100×4**, all calculators **driven live in Chromium** (no console errors).

### ✅ M2 scope deviation resolved (M10): Quellensteuer-Rechner shipped

The QST tariff files were unreachable from the sandbox (admin.ch blocked by the egress proxy). Resolved via **option (a)**: the owner downloaded the official ESTV tariff archive (`tar2026txt.zip`, all 26 cantons) + the record-format spec and committed them to `data/raw/qst/`. `scripts/import-qst.mjs` derived the per-canton JSON; the raw files are now git-ignored (§4.4 posture). See `data/raw/qst/README.md` for the refresh procedure.

### Tax-engine verification caveat (important, honest)

Engine outputs are pinned to an independent recomputation from the official ESTV tables + validated against the reference implementation's semantics + invariant-checked across all 26 cantons. They could NOT be compared against the live ESTV calculator from this sandbox (blocked). **Owner checklist: once outside the sandbox, spot-check ~5 sample calculations against swisstaxcalculator.estv.admin.ch** (e.g. 100k single ZH/ZG/VS, 100k married ZH, 60k single VS) before promoting the tools publicly.

**Owner-side before public launch** (carried from M0/M1):

1. **Done** — Cloudflare Pages connected, calcswiss.ch live.
2. **Done** — GSC verified.
3. **Done** — Impressum/Datenschutz identity filled in all 3 locales (controller: Thanakorn Praisee, Thailand; contact kontakt@calcswiss.ch) — see `impressum.astro`/`datenschutz.astro` + FR/EN equivalents.
4. Enable Cloudflare Web Analytics (if not already on).
5. **Done** — ESTV consent letter sent 14.07.2026 (to info@estv.admin.ch, from kontakt@calcswiss.ch; see `docs/estv-consent-request.md` for the text sent). Awaiting reply; per the letter's own fallback, if no reply arrives by ~11.08.2026, proceed under the existing derived-parameters + attribution posture (already in effect) and note that outcome here.
6. Bing Webmaster Tools: import from GSC (bing.com/webmasters → "Import from Google Search Console"), submit sitemap, enable IndexNow (Cloudflare dashboard → Caching → Configuration).
7. `ads.txt` added at `public/ads.txt` (Google AdSense publisher ID) and confirmed live at calcswiss.ch/ads.txt; AdSense site-review requested (site status "getting ready" as of 14.07.2026). **Do not enable any ad units until a certified TCF CMP is integrated** — that is its own milestone (site is currently ad-free/cookie-free by design, CLAUDE.md).
8. Keyword Planner validation → RESEARCH.md addendum.
9. QST spot-check: compare a few Quellensteuer results against a cantonal "lesbarer Tarif" PDF (e.g. zh.ch / ge.ch) — the shipped rates are merged to 0.05pp (indicative). Tariff files supplied ✓ (M10).
10. ESTV spot-check (see caveat above).

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

### 2026-07-15 — Session 16: M12 — Quellensteuer-Vergleich, Stundenlohn-Rechner, 3 neue Guide-Artikel

- **Quellensteuer-Vergleich** (`/quellensteuer-vergleich/`, `/fr/comparatif-impot-source/`, `/en/withholding-tax-comparison/`): one gross salary → ranked table of all 26 cantons (monthly QST, effective rate, annual QST; cheapest/most-expensive badges; annual-model cantons starred; every row links to that canton's QST page — 26 more contextual inbound links per locale for the M11 pages). Data layer: `scripts/build-qst-compare.mjs` regroups the per-canton tariffs into 18 per-situation files (`public/data/qstv/a0…h5.json`, ~230 KB each, all 26 cantons per file) so **one fetch covers a situation change** and salary/church edits recompute locally; the default table (single, 6500) is fully server-rendered. Engine `src/lib/qst/compare.ts` reuses the exact band lookup of the per-canton calculator (`qstFromBands` refactor) — the driven ZH row (CHF 469.95) matches the pinned M10 value exactly. Church resolution per canton (GE→N, JU→Y) as before.
- **Stundenlohn-Rechner** (`/stundenlohn-rechner/`, `/fr/calculateur-salaire-horaire/`, `/en/hourly-wage-calculator/`): monthly↔hourly conversion per Swiss payroll practice — base rate = monthly × 12 ÷ (52 × weekly hours), vacation supplements 8.33/10.64/13.04% (OR Art. 329a/d, arithmetically derived: weeks/(52−weeks); sourced data file `hourly-wage-2026.json`), optional 13th month (8.33% on the vacation-inclusive rate). Pure client-side island, SSR default, direction toggle swaps the input label.
- **3 new guide articles ×3 languages** (guide now 7 articles/locale): *Quellensteuer oder ordentliche Veranlagung* (120k obligatory NOV, irrevocable voluntary NOV, 31-March deadline, municipality-vs-cantonal-average effect), *13. Monatslohn* (no statutory right, pro-rata, full contributions, monthly- vs annual-model QST effect), *Grenzgänger* (DE 4.5% + 60-day rule, FR two regimes incl. the 8 agreement cantons matching our tariff-data flags, IT old/new since 17.07.2023 with the 80% rule, AT ordinary; telework tolerances). Related-article mesh updated (expat article now links all QST articles).
- **Wiring:** PAGE_GROUPS +5 groups (2 tools, 3 articles) → full hreflang/switcher; TOOLS registry +2 (DE homepage grid + RelatedTools); FR/EN homepages +2 cards; desktop header nav kept lean (4 pillar tools — new tools listed in the mobile menu + homepage); reciprocal in-content links: brutto-netto↔stundenlohn and QST-index↔QST-Vergleich in all three locales; LHCI +5 URLs; QST refresh runbook gains the regroup step.
- **Re-checked before push:** build clean (**217 pages**), tests **98/98** (+7 hourly incl. OR-derivation check, +6 compare incl. family≤single invariant across all 26 cantons), link/orphan green (216 pages), audit clean (no cross-locale leaks, hreflang reciprocal, **no fragile pages**, 72/72 per locale reachable). **Driven in Chromium:** Stundenlohn SSR 6500/42h → 35.71 base / 38.69 incl. vacation, recompute + direction switch OK; QST-Vergleich SSR 26 rows (Zug cheapest 219.70, ZH 469.95 = pinned value), situation change fetches one qstv file (promise-cached — no duplicate fetch), church toggle OK, FR/EN pages OK, no console errors. Lighthouse ≥95×4 asserted on 23 URLs. No ß. Committed, stopped for review.

### 2026-07-13 — Session 15: Hero illustrations on every page (inline SVG)

- **`src/components/HeroArt.astro`** — a decorative hero band shown at the top of **every** page. Pure inline SVG (no raster assets, no external requests, no web fonts → respects the CLAUDE.md performance budget and the Cloudflare-Pages CSP). Flat, brand-coloured (blue scale + Swiss-red cross + amber coins) illustrations on a soft gradient band; the motif is right-aligned and scales to the band height, so it stays crisp at any width. Purely decorative → `aria-hidden` (the page H1 already carries the meaning), keeping screen-reader output clean and a11y green.
- **10 on-topic variants**, one per page family: `home` (calculator + Swiss badge + coins), `salary` (payslip → coins), `comparison` (ascending bars + location pin), `pillar3a` (jar + growing plant + "3a"), `withholding` (document + % + cross-border line), `withholdingCanton` (pin holding % + canton tag), `canton` (location pin printing the **canton abbreviation**, e.g. ZH/GE), `guide` (open book + lightbulb), `legal` (shield + check + Swiss cross), `about` (people + Swiss badge), plus a `notfound` for 404.
- **Path-driven wiring** (`src/lib/hero.ts` → `resolveHeroVariant(path)`): `BaseLayout` derives the variant from the page path, so all 202 pages — and any future page — get the right illustration with no per-page work. Overridable via a `hero` prop (`null` hides it); the 6 canton templates pass `heroLabel={abbr}` so each of the 156 canton pages shows its own abbreviation. Band height `h-24 sm:h-32 md:h-36` (96px on mobile) keeps the calculator above the fold.
- **Re-checked before push:** build clean (**202 pages**), tests **85/85**, link/orphan green (201 pages), internal-linking audit still clean (the band adds **no** anchors → link graph unchanged). **Driven in Chromium** — screenshotted all 11 variants (DE/FR/EN) + a mobile viewport; every motif renders correctly, canton pins show the right abbreviation, calculator stays above the fold on mobile. Lighthouse ≥95×4 on the 18 sampled LHCI URLs. No ß. Committed, stopped for review.

### 2026-07-13 — Session 14: Internal-linking audit (all locales)

- **New audit tool** `scripts/audit-links.mjs` (read-only, complements `check-links.mjs`): checks (1) cross-locale in-content leakage — a FR/EN page linking into another locale outside the language switcher, which would leak link equity across languages; (2) hreflang reciprocity — every `<link rel="alternate">` points back; (3) fragile pages (≤1 in-content inbound link, excluding nav/footer); (4) per-locale reachability from each locale home (in-content only); (5) key money-page inbound counts.
- **Findings:** cross-locale leak **none**; hreflang **all reciprocal**; per-locale reachability **67/67 de, 67/67 fr, 67/67 en**; money pages **67 inbound each**. One soft finding: the 78 QST canton pages had only **1** in-content inbound link (the QST index grid).
- **Fix (real topical improvement, not padding):** added a reciprocal cross-link from each income-tax canton page to its **same-canton** QST page — the income-tax pages already received an inbound QST link, so this closes the loop (`/steuerrechner/[kanton]/` ↔ `/quellensteuer-rechner/[kanton]/`, and the FR/EN equivalents). After the fix every page has **≥2** in-content inbound links.
- **Re-checked before push:** build clean (**202 pages**), audit **clean** (fragile-pages finding resolved, no cross-locale leaks, hreflang reciprocal), link/orphan green (201 pages, ≤3 clicks), tests **85/85**. Committed, stopped for review.

### 2026-07-13 — Session 13: M11 — 78 per-canton Quellensteuer SEO pages (26 × 3)

- **Per-canton QST pages** in all 3 languages targeting the "quellensteuer [kanton]" long-tail. Each presets the canton, server-renders the default result (canton tariff read from disk at build), and lazy-fetches for recompute; the church/children controls adapt to the canton (e.g. Jura is church-only → the church box is hidden and the A0Y tariff is used automatically).
- **Anti-doorway content** (SEO_SPEC §3.2): 26 individually-written German QST intros + FAQs anchored on each canton's *real* withholding profile — monthly vs annual model (annual: FR/GE/TI/VD/VS), whether church tax is levied at source (no: GE/NE/TI/VD/VS; only: JU), Italian cross-border tariffs (GR/TI/VS) and the France special agreement (BE/BL/BS/JU/NE/SO/VD/VS) — plus faithful FR + EN renderings. Computed per-canton key-figures (model, church, example monthly QST at 6k/8k/10k single).
- **Internal linking:** the 3 QST index pages gained a 26-canton grid; each QST canton page cross-links to the **same canton's income-tax page** (`/steuerrechner/[kanton]/` etc.), the salary tool and the QST index — tying the two canton page-sets together.
- **Importer** extended to detect per-canton cross-border (L/M/N = DE, R–V = IT) and France-agreement (SF) flags for the editorial facts; `QST_ANNUAL_MODEL` constant for the model.
- **Re-checked before push:** build clean (0/0/0, **202 pages**), tests **85/85** (+4 QST-canton coverage), link/orphan green (201 pages). Driven in Chromium (ZH canton SSR single 6500 = CHF 469.95; recompute; married+children UI; Jura church box hidden with A0Y; FR Genève page = "modèle annuel"; QST→income-tax cross-link present; no console errors). Lighthouse **100×4** on sampled QST canton pages. Committed, stopped for review.

### 2026-07-13 — Session 12: M10 — Quellensteuer-Rechner (flagship, all 26 cantons, 3 languages)

- **Owner supplied the data**: uploaded the official ESTV tariff archive (`tar2026txt.zip` — all 26 cantons, TXT) + the record-format spec PDF to `data/raw/qst/` (pulled via the GitHub MCP after the local git proxy lagged). Decoded the fixed-width format from the spec (record 06 = progressive tariff; QSt-code = group+children+church; monthly income; rate + minimum tax).
- **`scripts/import-qst.mjs`**: parses all 26 files → `public/data/qst/<kt>.json` (tariff codes A/B/C/H, 0–5 children, church where levied; rates RLE-merged to 0.05pp → 5.2 MB total, ~50 KB/canton compressed) + `src/data/qst/index.json` (church availability, children ranges, tariff-file dates). Church mode auto-detected and correct (GE/NE/TI/VD/VS = N, JU = Y, rest = both). Raw ESTV files **git-ignored** (§4.4: derived params + citation, no verbatim mirror); README documents the yearly refresh.
- **Engine** `src/lib/qst/engine.ts` (band lookup + code builder + church resolver) + renderer with DE/FR/EN labels. **8 tests** (code building, band/min-tax lookup, church resolution, shipped-data integrity pinned to ZH A0N 6500 = 469.95, monotonicity) → suite 81/81.
- **Pages** in 3 languages (`/quellensteuer-rechner/`, `/fr/calculateur-impot-source/`, `/en/withholding-tax-calculator/`) with a shared parameterised island. The large tariff tables are **lazy-loaded per canton** (same-origin static JSON, fetched only on canton select — not an external API); the default canton (ZH) is SSR so the page works without JS. Church/children controls adapt to the selected canton.
- **Wiring:** TOOLS registry href flipped (tool now live → appears in the German nav + homepage); added to FR/EN nav + homepages; PAGE_GROUPS (reciprocal de/fr/en hreflang + switcher); the 3 withholding-tax guide articles' relatedTool now points at the QST calculator; methodology sections added in all 3 languages.
- **Re-checked before push:** build clean (0/0/0, 124 pages), tests 81/81, link/orphan green (123 pages). Calculator **driven in Chromium** (SSR ZH single 6500/mo = CHF 469.95 @ 7.2%; lazy fetch confirmed — only ZH + selected canton fetched; church box hides for GE (N-only); children UI appears for married/single-parent; church toggle changes the result; no console errors). Lighthouse **100×4** on all 3 QST pages (16 LHCI URLs assert-pass). Committed, stopped for review.

### 2026-07-13 — Session 11: M9 — Guide/Ratgeber layer in FR + EN (fully trilingual)

- **8 translated articles** — the 4 German Ratgeber articles rendered into French (`src/content/ratgeber-fr/`) and English (`src/content/ratgeber-en/`), faithful translations preserving each article's substance. Localized frontmatter: `relatedTool.href` → the locale's tool, `related` → the locale's article ids, and all in-body tool/article links point to locale pages.
- **Two new content collections** (`ratgeberFr`, `ratgeberEn`) sharing one schema (`content.config.ts` refactored to a reusable `articleSchema`). Locale-aware pages: `/fr/guide/` + `/fr/guide/[slug]/`, `/en/guide/` + `/en/guide/[slug]/` (mirrors of the German Ratgeber pages with translated UI strings).
- **Wiring:** guide added to the FR/EN header (desktop + mobile) and footer; `PAGE_GROUPS` gained the guide hub + 4 article groups → the German Ratgeber pages became trilingual (reciprocal de-CH/fr-CH/en-CH hreflang + FR/EN switcher). Internal-link mesh: hub → articles → relatedTool + sibling articles.
- **Re-check before push:** build clean (0/0/0, **121 pages**), tests **73/73**, link/orphan green (120 pages, ≤3 clicks). **No content regression** — 16/16 sampled pages content-identical after stripping the intended additions (German non-guide pages byte-identical; German guide pages gained only the switcher/hreflang UI; FR/EN pages gained only the guide nav/footer link). Guide pages **driven in Chromium** (FR hub lists 4 in order, FR/EN articles carry the correct locale relatedTool + related, DE article switcher → FR + EN guide articles, no console errors). Lighthouse: all 16 LHCI URLs assert-pass ≥95×4 (incl. FR/EN guide pages). Committed, stopped for review.

### 2026-07-13 — Session 10: M8 — full English expat hub (site now trilingual)

- **35 English pages** under `/en/`: home, `/en/salary-calculator/`, `/en/cantonal-tax-comparison/`, `/en/pillar-3a-calculator/`, 26 `/en/tax-calculator/[canton]/` pages, and 5 trust/legal pages (`/en/methodology/`, `/en/sources/`, `/en/about/`, `/en/legal-notice/`, `/en/privacy/`). Aimed at the expat/relocation audience (RESEARCH.md §3.2). Full SEO_SPEC anatomy + §3.2 anti-doorway canton content (26 individually-written English editorials, faithful renderings preserving each canton's verified tax specifics).
- **Locale infra generalised** from de↔fr pairs to multi-locale `PAGE_GROUPS` (`src/lib/locales.ts`): `Locale = 'de'|'fr'|'en'`, `LOCALES`/`OTHER_LOCALES`, `alternatesFor` now emits a reciprocal de-CH/fr-CH/en-CH set with x-default → German, `counterpartOf` works across three locales. `en.json`, `i18n.ts`, `Breadcrumbs` home map updated. Header + Footer made 3-locale: the language switcher shows **two chips** (a German page offers FR + EN, etc.), German branch markup preserved verbatim.
- **English labels** in `tax/labels.ts` (EN names/slugs/genitive/capital exonyms — Geneva, Lucerne; `TARIF/COMPARISON/THREEA/CANTON_RENDER_LABELS_EN`) + `SALARY_LABELS_EN`. `capitalOf` is identity for DE, so German stays byte-identical. English islands under `components/en/` share the exact engines.
- **Internal linking:** EN comparison table → all 26 EN canton pages; EN canton pages → comparison + salary + 3a; tool pages cross-link; home → tools + methodology. No orphans.
- **Re-check before push:** build clean (0/0/0, **111 pages**), tests **73/73** (+4 EN coverage), link/orphan green (110 pages, ≤3 clicks). **German + French content-identical** — 22/22 sampled DE+FR pages byte-identical after stripping the intended added `hreflang="en-CH"` + EN switcher (calculators, FAQs, legal text unchanged). EN pages **driven in Chromium** (salary net CHF 75'007, Geneva CHF 22'325.79 → 200k married CHF 51'162.88, capital "Geneva", 26 comparison links, trilingual switcher DE→FR,EN and EN→DE,FR reciprocal, no console errors). Lighthouse **100×4** on EN home/methodology/Geneva-canton (EN comparison a11y 95, same pattern as DE steuervergleich, still passes ≥95); all 13 LHCI URLs assert-pass. Committed, stopped for review.

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
