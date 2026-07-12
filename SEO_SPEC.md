# SEO_SPEC.md — CalcSwiss (calcswiss.ch)

Binding SEO & site-architecture specification. `CLAUDE.md` constraints apply on top of this file. The builder must not invent URL structures, schema types, or linking patterns beyond what is defined here — extend this file first, then build.

**Goal: rank → organic traffic.** Every rule below exists to serve that goal.

---

## 1. Domain, brand, hosting canon

- Domain: **calcswiss.ch** (apex). `www.calcswiss.ch` 301-redirects to apex. HTTPS only.
- Brand name in copy/schema: **CalcSwiss**.
- Trailing slash: **always** (`/brutto-netto-rechner/`). One canonical form; the other 301s. No mixed forms anywhere (nav, sitemap, canonical, internal links).
- Logo/branding: **never use the Swiss cross/flag** (Wappenschutzgesetz). Abstract mark only.
- One `<link rel="canonical">` per page, absolute URL, self-referencing except where noted.

## 2. URL architecture

Slug rules: lowercase; umlauts transliterated `ä→ae ö→oe ü→ue`; `ss` never `ß`; hyphens between words; no dates in slugs (year freshness lives in title/H1/content, so URLs never need to change).

### German (site root — launch)

| URL | Page | Primary keyword | Milestone |
|---|---|---|---|
| `/` | Homepage (hub) | brand + "rechner schweiz" | M0 |
| `/brutto-netto-rechner/` | Tool 3 | brutto netto rechner schweiz | M1 |
| `/quellensteuer-rechner/` | Tool 1 (flagship) | quellensteuer rechner | M2 |
| `/quellensteuer-rechner/[kanton]/` | Canton QST pages (ZH, GE, ZG, VD, BS first) | quellensteuer [kanton] | M2/M3 |
| `/steuervergleich/` | Tool 2 | steuervergleich kantone | M2 |
| `/steuerrechner/[kanton]/` | 26 programmatic pages | steuerrechner [kanton] | M3 |
| `/saeule-3a-rechner/` | Tool 4 | säule 3a rechner | M2 |
| `/krankenkasse/franchise-rechner/` | Tool 5 (scoped) | franchise rechner krankenkasse | backlog |
| `/ratgeber/` | Content index | — | M4 |
| `/ratgeber/[slug]/` | E-E-A-T articles | long-tail per article | M4 |
| `/methodik/` | Methodology hub | — (trust page) | M0 stub, M4 full |
| `/ueber-uns/`, `/impressum/`, `/datenschutz/`, `/quellen/` | Trust/legal | — | M0 |

Canton slugs (fixed list, used by both `[kanton]` routes): `zuerich bern luzern uri schwyz obwalden nidwalden glarus zug freiburg solothurn basel-stadt basel-landschaft schaffhausen appenzell-ausserrhoden appenzell-innerrhoden st-gallen graubuenden aargau thurgau tessin waadt wallis neuenburg genf jura`.

### Reserved locales (plumbing in M0, content later)

- `/fr/calculateur-salaire-brut-net/`, `/fr/impot-a-la-source/`, `/fr/comparatif-impots-cantons/`, `/fr/calculateur-3e-pilier/`
- `/en/withholding-tax-calculator/`, `/en/tax-calculator-switzerland/`, `/en/net-salary-calculator/`

### hreflang

Emitted on every page from M0 (self-referencing until siblings exist): `de-CH` = root pages; `fr-CH` = `/fr/...`; `en` = `/en/...`; `x-default` = the German root equivalent. All absolute URLs, reciprocal.

## 3. Page templates & on-page rules

### 3.1 Tool page anatomy (fixed order)

1. Breadcrumb (visible + `BreadcrumbList`).
2. **H1** — primary keyword + current year: `Brutto-Netto-Rechner Schweiz 2026`.
3. One-sentence value proposition (contains primary keyword variant naturally).
4. **Calculator island — above the fold**, zero scroll on mobile to first input.
5. Result block with plain-language interpretation (not just numbers).
6. `## Wie wird gerechnet?` — methodology: formula outline, parameter table **with source citations + "Stand: DD.MM.YYYY"**.
7. One fully worked example with realistic Swiss numbers (`CHF 12'345.60` format).
8. `## Häufige Fragen` — 5–8 FAQs (+ `FAQPage` schema, answers 40–80 words).
9. Related tools module (see §5).
10. Sources footer: linked official sources + "Zuletzt aktualisiert" date.

### 3.2 Canton page anatomy (`/steuerrechner/[kanton]/`) — anti-doorway rules

Programmatic pages get penalized when they're template + find/replace. **Every canton page must contain canton-unique, data-driven content:**

- H1: `Steuerrechner Kanton {Name} 2026`.
- Calculator preset to the canton (capital as default municipality).
- Unique intro, 100–150 words, **written from that canton's data** (its rank among 26, its Steuerfuss range, one distinctive fact e.g. flat tax in OW, lowest rates in ZG). Never reuse sentence templates with swapped nouns.
- Data table: cantonal multiplier, capital-city multiplier, cheapest/most expensive municipality in canton, wealth-tax note. All from `/src/data/`, all sourced.
- Comparison teaser: this canton vs. 3 neighbours + link to `/steuervergleich/`.
- 3+ canton-specific FAQs (e.g. "Wie hoch sind die Steuern in Zug im Vergleich zu Zürich?").
- Link to the canton's official tax office (external, authoritative — good trust signal).
- Minimum 400 words of genuinely canton-specific prose+data beyond the calculator. If a canton page can't meet that, don't ship it yet.

### 3.3 Ratgeber article anatomy

H1 (long-tail keyword) → answer-first opening paragraph (featured-snippet bait, ≤50 words) → structured sections with H2/H3 → data/tables from `/src/data/` where possible → FAQ block → strong CTA link to its money page (tool). `Article` schema with `datePublished`/`dateModified`, real author.

### 3.4 Title / meta patterns

- `<title>`: `{Primary Keyword} {Jahr} – {concrete benefit} | CalcSwiss`, ≤ 60 chars. Every page unique.
- Meta description: 140–160 chars, contains primary keyword + a number/specific ("alle 26 Kantone", "in 30 Sekunden"), ends with soft CTA. Every page unique.
- H1 = one per page, contains primary keyword, ≠ title verbatim.
- H2/H3 map to secondary keywords ("People also ask" phrasings) — no skipped heading levels.
- Images: descriptive German `alt`; filenames in kebab-case German.
- **Year policy:** titles/H1s carry the current tax year; a single `siteYear` constant drives all of them so the January refresh is one commit (see §9).

## 4. Structured data map (JSON-LD, every page)

| Page type | Schema (all + `BreadcrumbList`; `Organization` referenced sitewide from `/`) |
|---|---|
| Homepage | `Organization` (name, url, logo, `sameAs`) + `WebSite` |
| Tool pages | `WebApplication` (`applicationCategory: FinanceApplication`, `offers: price 0 CHF`, `inLanguage: de-CH`) + `FAQPage` |
| Canton pages | `WebApplication` + `FAQPage` |
| Ratgeber | `Article` (author `Person`, `datePublished`, `dateModified`) + `FAQPage` if FAQs |
| Methodik/Über uns | `AboutPage` / `WebPage` + `Person` (author credentials) |

Validate with Google Rich Results test each milestone (Definition of done #3). No schema for content that isn't visibly on the page.

## 5. Internal linking system

Topology: **hub-and-spoke with cluster mesh.**

```
Homepage ──→ 5 tool pages (primary nav + homepage cards)
Tool page ⇄ every sibling tool (contextual paragraph links, not just nav)
Tool page ──→ 2–3 supporting /ratgeber/ articles (its cluster)
Ratgeber ──→ its money page (tool) with exact-match-ish anchor + 2 related articles
/steuerrechner/[kanton]/ ──→ /steuervergleich/ (up), 3 neighbour cantons (across),
                              /quellensteuer-rechner/[kanton]/ if exists (across),
                              1 relevant ratgeber (down)
/steuervergleich/ ──→ all 26 canton pages (results table rows link to canton pages)
```

Rules:

1. **No orphans** — every page reachable ≤ 3 clicks from `/`. CI-check this once a crawler script exists (M3).
2. Anchor text: descriptive German containing the target's keyword or close variant (`Steuerrechner für den Kanton Zug`), varied — never bare "hier klicken", never the identical anchor sitewide.
3. Contextual in-body links beat footer/nav links — each tool page body links ≥ 2 siblings in prose.
4. Standard "Weitere Rechner" module at the bottom of every tool/canton page: 3–4 cards, auto-generated, deterministic per page (not random — stable internal linking).
5. Breadcrumbs on everything below root: `Home → Steuerrechner → Kanton Zug`.
6. External links: only to official sources (admin.ch, canton offices, BFS, BAG) — `rel` default (follow); they are trust signals, not leaks.

## 6. Technical SEO checklist (M0 unless noted)

- `sitemap.xml` auto-generated at build (`@astrojs/sitemap`), referenced in `robots.txt`; only canonical URLs, no redirects/404s in it.
- `robots.txt`: allow all, sitemap line. Nothing to hide — there is no admin.
- 404 page with search-alternative links (top tools).
- Redirect discipline: any URL change ever ⇒ 301 in Cloudflare `_redirects`; never break a published URL.
- OpenGraph + Twitter cards on all pages (static OG image per page type, generated at build — no runtime image service).
- Favicon set + web manifest.
- Performance: per CLAUDE.md (Lighthouse ≥ 95 ×4 mobile) — that IS the technical SEO budget: islands `client:visible`, no third-party render-blocking JS, self-hosted subset fonts or system stack.
- `lang="de-CH"` on `<html>`; hreflang per §2.
- Structured, semantic HTML (`<main>`, `<nav>`, `<article>`) — calculators must be usable and their explanatory content readable **without JS** (content is server-rendered; only interactivity hydrates).

## 7. E-E-A-T requirements

- `/methodik/`: how every calculator computes, data sources with retrieval dates, update cadence, known limitations (e.g. BVG uses legal-minimum approximation — say so plainly).
- `/ueber-uns/`: who runs the site, why, contact. `Person` schema. No fake credentials — transparency about being an independent tool site beats invented authority.
- Every number on every page traceable to `/src/data/*.json` `_meta` source. Visible "Quellen" section per tool + sitewide `/quellen/` index.
- "Zuletzt aktualisiert: DD.MM.YYYY" visible on every tool/canton page, backed by `dateModified` in schema — set from data-file `retrieved` dates, not build timestamps (no fake freshness).
- ESTV/BAG/BFS attribution present on every page using their data (also the licensing posture — CLAUDE.md).

## 8. Indexing & launch checklist (end of each milestone)

1. Google Search Console: property verified at M0 deploy; submit sitemap; after each milestone, "Request indexing" for the handful of new key pages.
2. Bing Webmaster Tools + IndexNow (Cloudflare integration) at M0.
3. After M1 (first real tool): list on relevant directories — Swiss tool/startup directories, one Show-HN-style post, r/Switzerland or r/askswitzerland **only where genuinely useful in context** (no spam); answer Quellensteuer questions on English expat forums with the tool where it actually answers the question.
4. Monitor GSC coverage report each milestone: zero "Crawled — not indexed" on money pages is the health signal; if canton pages stall there, uniqueness (§3.2) is the first suspect.

## 9. Maintenance calendar (traffic protection)

| When | What |
|---|---|
| Early Jan | New tax year: ESTV import, BSV contribution rates, 3a max, `siteYear` bump (titles/H1s), data `_meta` refresh — one `data:` commit |
| ~Late Sept | BAG premium dataset drop (premium tool + any premium references) |
| Each canton QST tariff publication | Refresh Quellensteuer data for covered cantons |
| Quarterly | GSC review: ranking pages get content deepening; stalled pages get investigation |
| ~Jan 2027 | EMBAG open-data recheck — ESTV licensing may resolve itself |

## 10. KPIs & decision gates

- **M1+3 months:** brutto-netto page has impressions in GSC (any position). If zero impressions → indexing/technical problem, fix before building more.
- **M3+3 months:** ≥ 13 of 26 canton pages have impressions; any page in top 30 for its `steuerrechner [kanton]` term. Pass → consider municipality-level expansion + `/fr/`. Fail → content/authority problem: shift effort to M4 content + links, do NOT build more programmatic pages on top of unindexed ones.
- North star: organic clicks/week in GSC, reviewed at every milestone end in `STATUS.md`.
