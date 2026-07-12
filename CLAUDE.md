# CLAUDE.md — SwissCalc Hub

Single source of truth for this project. If any other doc conflicts with this file, this file wins.

## What this is

SwissCalc Hub — a static website of Swiss financial/tax calculators (German-first, Swiss market), built for organic search. Research basis: `RESEARCH.md`. Execution plan: `BUILD_PLAN.md`. Current state: `STATUS.md`.

## Hard constraints (non-negotiable)

1. **Stack:** Astro + Tailwind CSS, fully static output. Deployed on **Cloudflare Pages**. **No backend, no server functions, no database.** Calculators run as client-side islands (vanilla TS or minimal framework islands); everything else is static HTML.
2. **Data:** ALL calculation parameters live in `/src/data/*.json`, imported at build time. **Every numeric value carries a source**: each data file has a `_meta` block with `source` (URL), `retrieved` (date), and `taxYear`/`validFor`. No number appears in the codebase or content without a traceable official source. The site never calls external APIs at runtime.
3. **Performance:** Lighthouse ≥ 95 on all four categories, every page, mobile. Budget: no render-blocking third-party JS, no web fonts unless subsetted + self-hosted, images optimized.
4. **SEO:** JSON-LD structured data on every page (`WebApplication`/`SoftwareApplication` for tools, `FAQPage` where FAQs exist, `BreadcrumbList` everywhere, `Organization` sitewide). Unique title/meta description per page. `hreflang` set up from day one.
5. **Milestone gates:** Never start the next milestone in `BUILD_PLAN.md` without explicit user approval. Every milestone ends: build passes → update `STATUS.md` → git commit → stop and wait for review.

## Languages & localization

- **Launch language: German (Swiss Standard German).** German lives at the site root (`/steuerrechner/...`), no `/de/` prefix.
- **Never use ß — always ss** (Strasse, gross, weiss). This is a hard rule for all copy, UI strings, and content.
- Swiss vocabulary: *Lohn* (not Gehalt), *Krankenkasse*, *Pensionskasse*, *Säule 3a*, *Quellensteuer*, *Steuerfuss*.
- Number format: `CHF 12'345.60` (apostrophe thousands, period decimal). Dates: `DD.MM.YYYY`.
- URL structure reserves `/fr/` (French) and `/en/` (English expat: Quellensteuer/relocation tools) — build hreflang plumbing in M0 even though those locales ship later. i18n strings in `/src/i18n/*.json` from the start; no hardcoded UI copy in components.

## Data sources & licensing posture

- Tax parameters derive from **ESTV** (swisstaxcalculator.estv.admin.ch — scales, multipliers, deductions). ⚠️ Not open-data licensed (see RESEARCH.md §4.4): we store **derived calculation parameters** with citations, not verbatim mirrors of ESTV exports; ESTV is attributed prominently on every tax page. A written consent request to ESTV is a pending action item.
- Health premiums: **BAG dataset on opendata.swiss** (true open data, refreshed ~late September).
- Municipality registry: **BFS** IDs are the canonical location key (canton → municipality).
- Quellensteuer tariffs: per-canton tariff files from cantonal tax offices; start with ZH, GE, ZG, VD, BS.
- Data imports happen at **build time via scripts in `/scripts/`**, writing versioned JSON into `/src/data/`. The live ESTV API is undocumented and may change — imported JSON is committed, so the site never breaks if the API does.
- Reference implementation for tax math: github.com/devbrains-com/swisstaxcalculator (MIT). We may study it; any adapted code keeps its attribution.

## Product truths (from research — see RESEARCH.md for evidence)

- Tool priority: (1) Quellensteuer calculator [flagship SEO gap], (2) cross-canton tax comparison [programmatic backbone], (3) brutto-netto [volume anchor, ships first as M1 because its contribution engine unblocks 1 and 2], (4) Säule 3a, (5) health-premium finder (scoped: franchise/premium-region optimizer, NOT head-on Krankenkassenvergleich).
- Programmatic pages: 26 `steuerrechner-[kanton]` pages minimum; municipality-level pages are possible (~2,110 BFS IDs) but only after canton pages prove out.
- Every tool page needs: the calculator above the fold, methodology section ("Wie wird gerechnet?") citing sources, FAQ block, and internal links to sibling tools.

## Privacy & monetization

- Launch **ad-free and cookie-free**: no CMP, no cookie banner needed under nFADP if analytics are cookieless (Cloudflare Web Analytics or self-hosted Plausible). This is a deliberate speed/UX edge.
- nFADP requires: privacy policy naming controller, purposes, recipient countries. Keep analytics EU/CH-hosted or disclose.
- If ads are ever added: Google requires a certified TCF CMP for Swiss traffic (since 31 Jul 2024) — that becomes its own milestone; never bolt ads on casually.

## Engineering conventions

- TypeScript strict. Calculation engines are pure functions in `/src/lib/` with unit tests (Vitest) — **every tax formula has tests pinned to official example values** where the canton publishes them.
- No CSS beyond Tailwind utilities + a small `@layer` for prose content.
- Astro content collections for editorial content; calculators are islands with `client:visible`.
- Commits: conventional style (`feat:`, `fix:`, `data:`, `content:`, `docs:`). Data refreshes are `data:` commits touching only `/src/data/` + `STATUS.md`.
- CI must run: `astro build`, `vitest run`, and (once configured) Lighthouse CI against key pages.

## Definition of done (any milestone)

1. `astro build` passes clean; tests green.
2. Lighthouse ≥ 95 ×4 on new/changed pages (mobile).
3. JSON-LD validates (Rich Results test / schema validator).
4. All new numbers have sources in `/src/data/*.json` `_meta`.
5. `STATUS.md` updated (what shipped, pending decisions).
6. Committed and pushed. **Stop — wait for review before the next milestone.**
