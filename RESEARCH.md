# SwissCalc Hub — Phase 0 Research

**Date:** 2026-07-12 · **Status:** Complete, awaiting review
**Method:** Multi-angle web research (5 search angles, ~58 research agents), with key claims adversarially verified (3 independent verification votes per claim). Claims marked **[verified]** passed 3-0; claims marked **[estimate]** are directional judgments where no authoritative public data exists.

---

## 1. Executive summary

- The Swiss calculator SERP is a three-layer market: **official sites** (ESTV, ch.ch) own the generic "Steuerrechner" head terms, **big portals** (comparis.ch, moneyland.ch) own comparison-intent terms, and a **thin, fragmented indie layer** (lohncomputer.ch, lohncheck.ch, kantonsvergleich.ch, calculsuisse.ch) proves single-purpose tool sites can rank #1 on high-intent keywords.
- **The biggest gap is Quellensteuer (withholding tax) for expats**: the official ESTV calculator does not cover it, and competition is mostly advisory-firm prose, not interactive calculators. Brutto-netto is the highest-volume cluster but also the most crowded.
- **Programmatic SEO across 26 cantons (and ~2,100 municipalities) is technically feasible today** [verified]: the ESTV swisstaxcalculator backend serves machine-readable JSON (tax scales, multipliers, deductions, 2010–2025+, keyed to BFS municipality IDs), and two open-source projects already automate extraction.
- **One material risk found** [verified]: the ESTV tax data is *not* open-data licensed — admin.ch default terms require prior written consent for reproduction. Mitigations exist (see §3.4) but this shapes how we store and attribute data.
- **Compliance is settled** [verified]: if we ever run Google ads, a Google-certified TCF CMP is mandatory for Swiss traffic since 31 July 2024 (same rule as EEA/UK). The Swiss nFADP itself is transparency/opt-out based — lighter than GDPR — and GDPR does not apply to a Swiss-only audience. All German copy must use Swiss Standard German: **never ß, always ss**.

---

## 2. Competitor landscape

### 2.1 Who owns what

| Player | Type | Dominates | Weakness / gap |
|---|---|---|---|
| **ESTV** (swisstaxcalculator.estv.admin.ch) | Official | "Steuerrechner" head terms, DE + FR ("simulateur fiscal"); covers income/wealth/capital-withdrawal/inheritance tax, all cantons & municipalities | **No brutto-netto, no Quellensteuer.** Government UX; no scenario content, no long-tail landing pages |
| **comparis.ch** | Portal | "Steuervergleich", "Steuern berechnen Gemeinde vergleichen" — cross-canton/commune comparison intent; also insurance | Generalist; lead-gen heavy; long-tail scenario keywords under-served |
| **moneyland.ch** | Portal | Broad calculator suite (claims 100+ calculators: banking, insurance, brutto-netto incl. EN) | Breadth over depth; many calculators are shallow forms behind heavy pages |
| **lohncomputer.ch** | Indie | #1 organic for "brutto netto rechner schweiz" / "Lohnrechner" by targeting Grenzgänger/expat segment | Single-purpose; proof that a focused indie site can outrank portals on high-intent salary keywords |
| **lohncheck.ch** (rechner.lohncheck.ch) | Indie | "Lohnrechner Schweiz 2026", "Brutto-Netto-Rechner kostenlos" mid-tail; claims 100k+ salary datapoints | Second-tier authority |
| **talent.com** (ch.talent.com/fr/tax-calculator) | International | FR "salaire brut net suisse"; runs **programmatic per-canton pages** (e.g. `/fr/tax-calculator/Waadt`) | Generic international template; proves programmatic canton pages rank in FR |
| **ch.ch** | Official | Informational tax queries (linking to cantons) | Pure information, no tools |
| **SECO Lohnrechner** (entsendung.admin.ch) | Official | Posted-worker wage queries | Narrow legal niche |

### 2.2 Indie layer (direct peer group)

- **kantonsvergleich.ch** — one input → all 26 cantons compared, standard deductions auto-applied. Ranks for "Steuerrechner Schweiz". Shallow depth (single-purpose). Similar: grundheim.ch, avenzo.ch tools built on ESTV rates.
- **swisstaxmap.ch**, **steuercalc.ch**, **incometax.ch** — cross-canton comparison tools on dedicated domains; functional but limited content depth and no multi-tool hub structure.
- **calculsuisse.ch**, juriup.ch, my-swiss-company.com, swiss-bound.ch — FR-language indie calculators; the FR market is **fragmented indie sites rather than a dominant portal** — a weaker-competition entry point.
- **devbrains-com/swisstaxcalculator** (GitHub, MIT) — open-source Nuxt 3/TS engine computing income/wealth/capital-withdrawal tax at municipality level from ESTV data, with JSON API. 14 stars, hosted on a Vercel subdomain, no SEO presence [verified]. Directly reusable as a **reference implementation** for our tax engine.

### 2.3 Where the gaps are

1. **Quellensteuer/withholding tax calculator (DE + EN)** — ESTV doesn't offer one; SERP is dominated by advisory-firm articles (e.g. taxolution.ch) rather than interactive tools.
2. **Scenario/long-tail comparison content** — "Steuern sparen bei Umzug von Kanton X nach Y", marriage penalty, 3a staffelung: portals target head terms, not scenarios.
3. **FR-language tool market** — fragmented indies; talent.com's generic template is beatable on localization quality.
4. **English expat segment** — moneyland has EN pages, but no focused EN tool hub for Quellensteuer/relocation exists.
5. **A multi-tool hub with E-E-A-T content depth** — indies are single-purpose; portals are shallow-per-tool. The middle (focused hub, deep methodology pages, cited official sources) is open.

---

## 3. Keyword map (German + French)

> **[estimate]** No public source publishes exact Swiss monthly volumes; the tiers below are directional, based on SERP density, competitor investment, and suggest data observed during research. **Action item (M1):** validate with Google Keyword Planner (free) before finalizing page priorities.

### 3.1 German — priority clusters

| Cluster | Example keywords | Volume tier | Competition | Who ranks today |
|---|---|---|---|---|
| Brutto-Netto / Lohn | brutto netto rechner schweiz, lohnrechner, nettolohn berechnen | **High** (head ~10k+/mo est.) | **High** — most crowded candidate cluster | lohncomputer, lohncheck, talent.com, moneyland, SECO |
| Steuerrechner generic | steuerrechner, steuern berechnen schweiz | High | Very high (official) | ESTV, comparis |
| Steuerrechner [Kanton] | steuerrechner zürich, steuerrechner bern, … ×26 | Mid per canton, high in aggregate | Mid — ESTV + cantonal offices, thin indie layer | ESTV, canton tax offices, comparis |
| Steuervergleich / cross-canton | steuervergleich kantone, steuern kanton vergleich, günstigster kanton steuern | Mid | Mid — comparis strong, indie layer shallow | comparis, kantonsvergleich.ch |
| Säule 3a | säule 3a rechner, säule 3a steuern sparen, 3a einzahlung maximal 2026 | Mid | Mid — banks/insurers (UBS, Frankly, VIAC content) but few neutral calculators | banks, moneyland |
| Quellensteuer | quellensteuer rechner, quellensteuer zürich, quellensteuertarif | Mid | **Low–mid — no official calculator, mostly prose** | advisory firms, canton PDFs |
| Krankenkasse | krankenkassen vergleich, krankenkasse prämien 2027, prämienrechner | Very high | **Very high** — comparis/priminfo entrenched, insurer ad budgets | comparis, priminfo.admin.ch, moneyland |

### 3.2 French — priority clusters

| Cluster | Example keywords | Notes |
|---|---|---|
| Salaire brut/net | calcul salaire brut net suisse, salaire net suisse, calculateur salaire | talent.com + fragmented indies (calculsuisse.ch); weaker competition than DE |
| Impôts | calculateur impôts suisse, calcul impôts [canton], simulateur fiscal | ESTV FR entry (estv.admin.ch/fr/simulateur-fiscal-calculer-vos-impots) owns head; canton long-tail open |
| Impôt à la source | calculateur impôt à la source, impôt à la source genève/vaud | High expat/frontalier relevance in GE/VD — pairs with Quellensteuer tool |
| 3e pilier | calculateur 3e pilier, 3e pilier impôts | Bank-dominated, same gap as DE |
| Frontalier | impôt frontalier suisse, salaire frontalier | Niche served by small indies — adjacent opportunity |

### 3.3 English (expat, secondary)

`switzerland tax calculator`, `swiss withholding tax calculator`, `net salary switzerland`, `zurich tax calculator expat` — served by talent.com and moneyland EN only; no focused expat tool hub. Reserve `/en/` for Quellensteuer + relocation tools.

---

## 4. Programmatic structure: 26 cantons & data sources

### 4.1 How cantonal tax differs (what the data model must hold)

Swiss income tax = **federal** (uniform tariff) + **cantonal** (own tariff/scale per canton) + **communal** (multiplier/Steuerfuss on the cantonal base) + church tax (optional multiplier). Cantons also differ in: deduction catalogs (3a max is federal, but child/insurance/commute deductions vary), wealth-tax scales, and Quellensteuer tariff tables (per-canton tariff codes A/B/C…, weighted municipal multipliers). Quellensteuer applies to foreign employees without C permit; mandatory ordinary assessment above CHF 120k income. This means one calculation engine parameterized by: `(year, canton, municipality BFS-ID, tariff inputs)` — exactly what the ESTV dataset provides.

### 4.2 Official data sources (actual URLs)

| Source | URL | What it provides | Machine-readable? |
|---|---|---|---|
| **ESTV tax calculator** | https://swisstaxcalculator.estv.admin.ch/ (data page: `/#/taxdata`) | Tax scales, simple rates, deductions — federal/cantonal/communal, 2010–2025+ (2026 rolling out), all 26 cantons | **Yes** [verified] — internal JSON API (`API_exportManyTaxScales`, `API_exportManySimpleRates`, `API_exportManyDeductions` via `/delegate/ost-integration/v1/lg-proxy/operation/c3b67379_ESTV`); official UI export is per-subset .xlsx |
| **ESTV rates landing page** | https://www.estv.admin.ch/estv/en/home/fta/tax-statistics/tax-multipliers-deductions-tax-rates.html | Canonical citation page for multipliers/deductions/rates | Links to portal |
| **BAG health premiums** | https://opendata.swiss/de/dataset/health-insurance-premiums | All approved KVG premiums per insurer, canton/premium region, age group, franchise, model; published yearly ~late September | **Yes — true open data** |
| **Priminfo (BAG)** | https://www.priminfo.admin.ch/ | Official premium comparison (also a competitor for that keyword) | Reference |
| **BFS municipality register** | https://www.bfs.admin.ch/bfs/en/home/basics/swiss-official-commune-register.html | Official BFS IDs, ~2,110 municipalities (1.1.2026) | Yes |
| **ch.ch tax pages** | https://www.ch.ch/en/taxes-and-finances/ | Plain-language explanations, links to all 26 cantonal tax offices | Citation/link source |
| **Cantonal tax offices** | e.g. zh.ch (ZH), sg.ch (SG), vd.ch (VD) — 26 sites | Quellensteuer tariff tables (often CSV/XLSX downloads), cantonal specifics | Varies; Quellensteuer tariff files are typically downloadable per canton |
| **SECO Lohnrechner** | https://entsendung.admin.ch/Lohnrechner/ | Reference wage calculation | Reference only |

### 4.3 Reference implementations (open source)

- https://github.com/devbrains-com/swisstaxcalculator — MIT; Nuxt 3/TS; imports ESTV JSON per year (`yarn importdata 2026 --download`); municipality-level income/wealth/capital-withdrawal tax; actively maintained (2026 tax data landed 2026-03) [verified].
- https://github.com/gendx/fetch-ch-tax-rates — Rust; bulk-extracts the ESTV JSON with schema; documents the licensing situation [verified].
- https://github.com/ruegerj/swiss-tax-api — Go SDK for the same API; third independent confirmation the endpoint is stable enough to build on.

### 4.4 ⚠️ Licensing finding (material) [verified]

The ESTV tax dataset is **not published under an open-data license**. admin.ch default terms state reproduction requires **prior written consent of the federal authorities**; the dataset is absent from opendata.swiss. Qualifiers that lower (but don't eliminate) the risk:

- Swiss copyright law (URG Art. 5) exempts *official enactments* — bare tax tariffs/rates arguably aren't copyright-protectable, and Switzerland has no database sui generis right. The MIT-licensed devbrains project republishes the data openly without apparent consequence.
- EMBAG ("open by default" law, in force 1 Jan 2024, transition ends ~Jan 2027) obliges federal agencies to publish non-personal data machine-readable and free — the restriction is likely to erode.

**Recommended posture:** (a) store *derived calculation parameters* in `/src/data/*.json` with per-value source citations rather than mirroring raw ESTV exports verbatim; (b) send ESTV a written consent/clarification request early (cheap, and likely granted); (c) attribute ESTV prominently on every tax page — which is also an E-E-A-T win. BAG premium data has no such issue (true open data).

---

## 5. Launch tool selection (5 tools)

Ranked by `intent × gap ÷ competition`:

| # | Tool | Intent | Indie competition | Reasoning |
|---|---|---|---|---|
| **1** | **Quellensteuer calculator** (DE + EN; canton-parameterized) | High — expats must know net pay before signing | **Weakest** — no ESTV tool, SERP is advisory prose | Flagship. Clear gap [verified: ESTV scope excludes it]; canton tariff-code structure is inherently programmatic (26 canton pages + EN expat versions); monetization-adjacent audience (relocation, insurance) |
| **2** | **Cross-canton tax comparison** (1 input → 26 cantons ranked) | High — moving/relocation decisions | Shallow — kantonsvergleich.ch et al. are single-purpose, low-authority | Programmatic backbone: same engine powers 26 `steuerrechner-[kanton]` pages + comparison matrix pages; comparis is the real competitor but targets head terms only |
| **3** | **Brutto-Netto salary calculator** | Highest volume | **Strongest** — lohncomputer, lohncheck, talent.com | Must-have hub anchor despite crowding: it's the entry point users expect, feeds internal links to tools 1/2/4, and the social-contribution math (AHV/ALV/BVG/UVG) is a prerequisite for the Quellensteuer tool anyway |
| **4** | **Säule 3a tax-savings calculator** | High commercial intent (banks bid on it) | Mid — bank calculators are biased/lead-gen; neutral indie tools scarce | Reuses the tax engine (deduction delta = marginal-rate application); natural E-E-A-T content cluster (staffelung, withdrawal tax by canton — links back to tool 2) |
| **5** | **Health-insurance premium finder** (scoped: premium-region/franchise optimizer, not full comparison) | Very high volume | Portals entrenched (comparis, priminfo) | Included because BAG data is genuinely open [verified] and freshest each September; **scoped down** to angles portals ignore (franchise break-even calculator, premium-region arbitrage) rather than head-on "Krankenkassenvergleich" |

**Build order rationale:** 3 → 1 → 2 → 4 → 5. Brutto-netto ships first as M1 flagship *feature-complete for permit-C/Swiss employees*, because its contribution engine unblocks Quellensteuer (tool 1, the SEO flagship), which unblocks canton comparison (tool 2, the programmatic backbone). 3a (4) is an engine reuse. Premium finder (5) targets the September BAG data drop.

---

## 6. Compliance & localization

### 6.1 Google consent requirements (if/when ads run) [verified 3-0]

- Since **31 July 2024**, Google requires a **Google-certified CMP integrated with IAB TCF** to serve *personalized* ads to users in **Switzerland** (AdSense/Ad Manager/AdMob) — identical to the EEA/UK rule in force since 16 Jan 2024. Source: https://support.google.com/adsense/answer/13554116 and https://support.google.com/adsense/answer/14893312
- Without a certified CMP: only non-personalized/limited ads (reduced revenue, not a total ban). Legal responsibility for consent collection sits with the publisher.
- **Decision for us:** launch ad-free (no CMP needed). If ads come later, add a certified CMP (e.g. any from Google's certified list) + Consent Mode v2 in one milestone.

### 6.2 Swiss nFADP (revDSG, in force 1 Sept 2023)

- **No blanket cookie-consent mandate** — the law is transparency + opt-out based; technically necessary cookies need no consent. The FDPIC expects opt-in for advertising/profiling/cross-site tracking.
- GDPR does **not** apply to a Swiss controller processing Swiss users' data only (unless targeting EU residents).
- Obligations for us: a privacy policy naming the controller, purposes, and recipient countries (relevant if US-hosted analytics — Cloudflare is fine, avoid US analytics or disclose); penalties run up to CHF 250,000 **against responsible individuals**, not companies.
- **Decision for us:** static site + privacy-friendly, cookieless analytics (e.g. Cloudflare Web Analytics or self-hosted Plausible) ⇒ **no cookie banner needed at launch**. This is also a UX/speed edge over comparis/moneyland.

### 6.3 Swiss German orthography & localization [verified]

- **Never ß, always ss** (Strasse, gross, weiss) — officially sanctioned; using ß instantly marks content as non-Swiss.
- Number formats: `CHF 12'345.60` (apostrophe thousands separator, period decimal); dates `12.07.2026`.
- Helvetisms in vocabulary: *Lohn* (not Gehalt) is the dominant Swiss term, *Krankenkasse*, *Franken*, *Pensionskasse*, *Quellensteuer*. Use Swiss terminology in copy AND keywords.
- URL structure: launch DE at root, reserve `/fr/` and `/en/` prefixes from day one (hreflang-ready).

---

## 7. Risks & open questions

| Risk | Severity | Mitigation |
|---|---|---|
| ESTV data licensing (§4.4) | Medium | Derived-parameters posture + written consent request + prominent attribution |
| ESTV internal API is undocumented; could change without notice | Medium | Data imported at **build time** into versioned `/src/data/*.json` — site never depends on the live API; annual import is a maintained, verifiable step |
| Keyword volumes unvalidated (no tool data) | Low | Validate with Keyword Planner during M1; tiers are directional only |
| Quellensteuer tariff tables vary per canton and come from 26 cantonal sources | Medium | Start with top expat cantons (ZH, GE, ZG, VD, BS) in M1/M2; expand in M3 |
| Säule 3a max deduction changes yearly (CHF 7,258 for 2025 — **verify current-year value at build time**) | Low | Yearly data-refresh checklist in BUILD_PLAN |
| BAG premium data refreshes late September | Low | Schedule tool 5 around the data drop |

---

## 8. Source index

**Official:** estv.admin.ch (tax calculator + rates pages) · swisstaxcalculator.estv.admin.ch · opendata.swiss/de/dataset/health-insurance-premiums · priminfo.admin.ch · bfs.admin.ch (commune register) · ch.ch · entsendung.admin.ch · admin.ch/gov/en/start/terms-and-conditions.html
**Competitors:** comparis.ch/steuern/steuervergleich/steuerrechner · moneyland.ch/en/net-gross-salary-calculator · lohncomputer.ch · rechner.lohncheck.ch · ch.talent.com/fr/tax-calculator · kantonsvergleich.ch · swisstaxmap.ch · steuercalc.ch · calculsuisse.ch
**Open source:** github.com/devbrains-com/swisstaxcalculator · github.com/gendx/fetch-ch-tax-rates · github.com/ruegerj/swiss-tax-api
**Compliance:** support.google.com/adsense/answer/13554116 · support.google.com/adsense/answer/14893312 · cookiebot.com/en/swiss-fadp/ · usercentrics.com/knowledge-hub/google-consent-requirements-switzerland/ · en.wikipedia.org/wiki/Swiss_Standard_German
**Domain:** taxolution.ch/swiss-tax-guide/swiss-withholding-tax/
