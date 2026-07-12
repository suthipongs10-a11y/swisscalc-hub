# BUILD_PLAN.md — SwissCalc Hub

Milestone-gated plan. **Every milestone ends the same way: build passes → update `STATUS.md` → git commit → STOP and wait for review.** No milestone starts without explicit approval. Constraints in `CLAUDE.md` apply throughout; evidence in `RESEARCH.md`.

---

## M0 — Scaffold

**Goal:** empty-but-production-grade Astro site deployed to Cloudflare Pages.

- Astro + Tailwind + TypeScript strict; Vitest wired.
- Layout system: base layout, header/footer, SEO component (title/meta/canonical/hreflang/JSON-LD injection), `BreadcrumbList` + `Organization` schema sitewide.
- i18n plumbing: `/src/i18n/de.json` (Swiss German, ss-only), URL structure reserving `/fr/` and `/en/`; DE at root.
- `/src/data/` convention established with `_meta` (source, retrieved, taxYear) — validated by a Vitest schema test.
- Static pages: homepage shell, `/impressum`, `/datenschutz` (nFADP-compliant privacy policy: controller, purposes, recipient countries), `/methodik` stub.
- Cookieless analytics (Cloudflare Web Analytics) — no banner.
- CI: build + tests on push; Lighthouse CI config for key pages.
- Deploy to Cloudflare Pages; verify Lighthouse ≥ 95 ×4 mobile on homepage.

**Exit gate:** live URL, green build, Lighthouse proof. → STATUS.md → commit → **stop for review**.

---

## M1 — Flagship tool: Brutto-Netto-Rechner

**Goal:** the volume anchor, feature-complete for Swiss/permit-C employees. (Ships first because its contribution engine — AHV/IV/EO, ALV, NBU, BVG, KTG — is the prerequisite for the Quellensteuer flagship in M2.)

- Data: `/src/data/social-contributions-2026.json` (rates + thresholds from official sources: AHV/ALV from BSV, BVG parameters), fully sourced.
- Pure-function engine `/src/lib/salary/` with unit tests pinned to published example calculations.
- Tool page `/brutto-netto-rechner/`: calculator island above the fold, monthly/yearly toggle, 13th salary, canton selector (for later tax integration), methodology section, FAQ (+ `FAQPage` schema), `WebApplication` schema.
- Keyword validation task: run priority keywords through Google Keyword Planner; record actuals in RESEARCH.md addendum; adjust page titles if needed.
- ESTV written-consent request drafted (pending decision in STATUS.md).

**Exit gate:** engine tests green incl. edge cases; Lighthouse ≥ 95 ×4; JSON-LD validates. → STATUS.md → commit → **stop for review**.

---

## M2 — Tool suite (Quellensteuer, cross-canton comparison, Säule 3a)

**Goal:** the three engine-sharing tools that define the hub.

- **Quellensteuer-Rechner** `/quellensteuer-rechner/` (SEO flagship): tariff-code logic (A/B/C/H…), per-canton tariff data for ZH, GE, ZG, VD, BS first; CHF 120k ordinary-assessment threshold messaging; DE now, structure ready for `/en/`.
- **Steuervergleich** `/steuervergleich/`: one input → all 26 cantons ranked (canton capitals as default municipality), powered by ESTV-derived data in `/src/data/tax/`.
- **Säule-3a-Rechner** `/saeule-3a-rechner/`: deduction max (current-year value verified at build), tax-savings delta via marginal rate from the tax engine.
- Shared: cross-links between all tools, methodology pages per tool, FAQ schema per tool.

**Exit gate:** all three live, engines tested against official example values, Lighthouse ≥ 95 ×4 each. → STATUS.md → commit → **stop for review**.

---

## M3 — Programmatic: 26 canton pages

**Goal:** `steuerrechner-[kanton]` × 26 from one template + data.

- Import pipeline `/scripts/import-estv.ts` → per-canton JSON (scales, multipliers, deductions) with `_meta` sources.
- Template: canton-specific calculator defaults, canton tax facts (Steuerfuss range, capital city numbers), comparison teaser vs. neighbors, canton tax office link, unique intro copy per canton (no doorway-page boilerplate — each page needs genuinely distinct data-driven content).
- `BreadcrumbList` + `WebApplication` schema; XML sitemap; internal-link mesh (canton ↔ comparison ↔ tools).
- Decision point recorded in STATUS.md: whether municipality-level pages (~2,110) are warranted — **default no** until canton pages show impressions.

**Exit gate:** 26 pages build from data alone; spot-check 5 cantons against ESTV calculator outputs; Lighthouse sampled ≥ 95. → STATUS.md → commit → **stop for review**.

---

## M4 — E-E-A-T content layer

**Goal:** the depth that indie competitors lack and portals won't do per-tool.

- `/methodik` completed: full methodology, data sources, update cadence, limitations.
- About/author page with real credentials posture; `Organization` + `Person` schema.
- Content cluster (Swiss Standard German, ss-only): Quellensteuer guide for expats, 3a-Staffelung explainer, Kantonswechsel & Steuern scenario guide, marriage/second-earner explainer — each interlinked with its tool, each with cited official sources.
- FAQ expansion per tool from real SERP "People also ask".
- English pilot: `/en/withholding-tax-calculator/` if M2 structure is ready (decision gate in STATUS.md).
- Data-refresh runbook: yearly checklist (ESTV year import, BSV contribution rates, 3a max, BAG premiums in September — feeds future premium-finder tool).

**Exit gate:** content live, schema validates, internal-link audit done. → STATUS.md → commit → **stop for review**.

---

## Backlog (post-M4, unscheduled)

- Tool 5: health-premium finder (franchise break-even / premium-region optimizer) — build against the ~September BAG data drop.
- `/fr/` locale rollout (salaire brut-net + impôt à la source first — weakest competition per RESEARCH.md §3.2).
- `/en/` expat hub expansion (relocation cost, permit-based tax explainers).
- Municipality-level programmatic pages (only if canton pages earn impressions).
- Ads/monetization milestone (requires certified TCF CMP + Consent Mode v2 — see CLAUDE.md).
- ESTV consent follow-up / EMBAG open-data status re-check (~Jan 2027).
