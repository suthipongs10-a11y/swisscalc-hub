# STATUS.md — SwissCalc Hub (calcswiss.ch)

## Current state

**Latest (Session 19, M15): every tool page rebuilt into a 5-section educational article.** All 18 calculator pages (6 tools × DE/FR/EN) now follow the explicit structure below the calculator: Strategic Value → Financial Logic & Formula → Worked Example (step by step, engine-computed numbers) → Smart Decision Tips → FAQ. Calculators unchanged (still SSR + recompute, driven in Chromium). Awaiting review.

**Session 18 (M14): guide at full target — 15 articles per language — and explicit formulas on every tool page.** Four new articles ×3 locales (AHV explained, part-time work, understanding the payslip, bonus & gratuity — completing the salary/pension cluster) plus explicit formula sentences added to the 3a and QST tool pages in all locales (every calculator now shows description + method + formula + FAQ). Awaiting review.

**Session 17 (M13): guide depth during AdSense review — 11 articles per language.** Four new articles ×3 locales (3a vs 3b, health-insurance premiums, tax-return deadlines & deductions, pension fund/BVG), all numbers repo-sourced. Awaiting review.

**Session 16 (M12): two new tools.** Quellensteuer-Vergleich (all 26 cantons ranked from one salary; unique in the market), Stundenlohn-Rechner (high-volume keyword, OR-derived vacation supplements), and 3 new guide articles ×3 languages (NOV/ordinary assessment, 13th month salary, cross-border commuters). Tests 98/98. Awaiting review.

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

### 2026-08-01 — Session 20d: Keyword-Research für pronetserm (Zukunftsplan, nichts gebaut)

- `docs/pronetserm-keyword-research.md`: ~45 Long-Tail-Keywords in 6 Clustern (SIM-Services, eSIM, Kommunikationstechnologie, Geräte/Router, Troubleshooting, Adjacent) mit Volumen-**Tiers als Schätzung** (Sandbox erreicht Keyword Planner nicht — Verifikations-Workflow im Dokument), vorgeschlagenen Slugs, Kollisions-Check gegen bestehende Seiten und Batch-Plan PN-6–PN-9. Bewusst auf dem Hauptbranch unter `docs/` abgelegt (der `pronetserm`-Branch wird 1:1 öffentlich deployt — Keyword-Pläne gehören nicht auf die Live-Site). Ausserdem `ads.txt` (AdSense pub-ID des Owners) auf den `pronetserm`-Branch gepusht.

### 2026-07-31 — Session 20c: pronetserm auf eigenen Branch ausgelagert (Cloudflare-Pages-Fix)

- **Auslöser:** Das Cloudflare-Pages-Projekt «pronetserm» lieferte Error 522 — auf `*.pages.dev` heisst das: kein erfolgreiches Production-Deployment vorhanden; die Root-Directory-Konfiguration im Unterordner-Setup war fehleranfällig. Der Owner wollte die beiden Websites ohnehin strikt getrennt haben («คนละ Branch หรือคนละส่วน»).
- **Neuer Branch `pronetserm`:** enthält die komplette Thai-Website am **Branch-Root** (125 Dateien; per `git commit-tree` aus dem Unterordner-Baum erzeugt, Inhalt byte-identisch) plus aktualisiertes `README-DEPLOY.md`. Cloudflare-Konfiguration damit trivial: Production branch `pronetserm`, Framework preset None, Build command leer, Output `/`, Root directory leer.
- **Ordner `pronetserm/` vom Hauptbranch entfernt** — dieser Branch ist wieder reine SwissCalc-Codebasis. Weiterentwicklung der Thai-Site direkt auf dem Branch `pronetserm` (lokal via Worktree: `git fetch origin pronetserm && git worktree add ../pronetserm-site pronetserm`). SwissCalc-Build und Tests unverändert grün.

### 2026-07-31 — Session 20b: pronetserm/ — zweite Website im Repo (โปรเน็ตเสริม.com, +65 Long-Tail-Seiten)

- **Separates Projekt, separater Ordner:** Auf Owner-Wunsch wurde die bereits AdSense-genehmigte thailändische Website โปรเน็ตเสริม.com (site.zip) als eigenständiger Ordner `pronetserm/` importiert (ohne Editor-Artefakte) — eigenes Cloudflare-Pages-Projekt mit Root-Directory `pronetserm`, dokumentiert in `pronetserm/README-DEPLOY.md`. Betrifft die SwissCalc-Site nicht; alle 102 Tests weiterhin grün.
- **+65 Long-Tail-Seiten, generiert aus den verbatim Paketdaten** (Preise/USSD-Codes ausschliesslich aus `data/packages.json`): 38 Detailseiten `/pro/` (eine je Paket, mit handgeschriebener Einordnung + paket-spezifischer FAQ aus `data/pro-notes.json`, berechnetem Preis-pro-Tag und Vergleichstabelle), 6 Budget-Hubs `/budget/`, 6 Speed-Hubs `/speed/`, 2 Carrier-Hubs `/dtac.html` `/true.html`, 12 neue Artikel, 1 Artikel-Index. Sitemap 20 → 85 URLs, keine Duplikate.
- **Verifiziert:** 9'719 interne Links über 86 Seiten — 0 broken; 230 JSON-LD-Blöcke alle parsebar; Preis+Code jeder /pro/-Seite gegen packages.json geprüft (38/38 verbatim). 5-Gramm-Distinctness der neuen Familien (Ø 49–58 %) liegt auf/über dem Niveau der bereits genehmigten Bestandsseiten (37–48 % zwischen Geschwisterseiten); für 4G/5G-Zwillingspakete wurden pro Seite unterschiedlich geschriebene Entscheidungsabschnitte ergänzt.

### 2026-07-31 — Session 20: M16 — Substanz auf den 156 programmatischen Kantonsseiten (AdSense «Low value content»)

- **Auslöser:** AdSense hat calcswiss.ch abgelehnt, Grund laut Sites-Panel: **«Inhalte mit geringem Wert»** (ads.txt war *genehmigt*, also kein technisches Problem). Parallel meldet GSC 186 URLs «Gefunden – zurzeit nicht indexiert», letzter Crawl «keiner».
- **Diagnose (gemessen, nicht geraten):** Startseite nur **232 Wörter**; QST-Kantonsseiten **424 Wörter**. Über 5-Gramm-Shingles verglichen lagen die 156 Kantonsseiten bei **42–53 % eigenständigem Text**, Guide-Artikel dagegen bei **86 %**. Damit war klar: nicht die Tools, sondern die **65 % programmatischen Seiten** sind der Auslöser — und zwar für *beide* Probleme (AdSense und Indexierung) gleichzeitig.
- **Startseiten ×3:** von 232/292/283 auf **810/1003/915 Wörter** — «Welcher Rechner für welche Frage» (verlinkt alle 6 Tools), Herkunft der Zahlen (ESTV/BFS/Bund), «Wie wir rechnen — und was wir bewusst nicht rechnen» (Grenzen offengelegt: steuerbares Einkommen, ohne Kirchensteuer/Personalsteuer, keine Grenzgängertarife), werbe-/cookiefrei, 4 FAQ + **FAQPage-JSON-LD neu auf allen drei Startseiten**.
- **Neue Editorial-Ebene `cantonQstPractice{,Fr,En}.ts`:** je Kanton ein individuell geschriebener Praxis-Absatz **plus zweite FAQ**, 26 × 3 Sprachen = **78 Absätze + 78 FAQ**. Inhaltlich echt kantonsspezifisch (Wohn- vs. Arbeitskanton ZH/SZ/AG, Wochenaufenthalter BS, Saisonarbeit GR vs. VS, Liechtenstein-Pendler SG, Sitzabkommen internationaler Organisationen GE, Kirchensteuer-Sonderfall JU, einheitlicher Tarif trotz 334 Gemeinden BE).
- **Neue berechnete Sektionen (alle Zahlen aus den Engines, kein Hardcoding):** QST-Kantonsseiten erhalten Tarifcode-Vergleich (A0/B0/B2/C0/C2/H1 bei CHF 8'000), Satzprogression (4k→16k) und die **nationale Rangposition** via `compareQst`; Einkommenssteuer-Kantonsseiten erhalten die **Gemeindespanne in Franken** (günstigste vs. teuerste Gemeinde des Kantons) sowie eine Progressionstabelle ledig/verheiratet (50k–200k).
- **Neue Engine-Funktion `cantonTaxAtMultiplier()`** + 4 Tests: erlaubt die Steuerberechnung für einen beliebigen Gemeindesteuerfuss. Vorab verifiziert, dass der Steuerfuss jedes Hauptorts **in allen 26 Kantonen** innerhalb der Gemeindespanne des Kantons liegt (Skalen konsistent); Grenzen für SZ/VS (eigener Hauptort-Tarif) im Doc-Comment festgehalten.
- **Wichtigste Lehre — Boilerplate schadet:** Ein erster Entwurf mit einem generischen «Tarifkorrektur & NOV»-Block (~190 Wörter, auf allen 78 Seiten identisch) hob die Wortzahl auf 1'068, senkte die Eigenständigkeit aber auf **44 %**. Nach Rückbau auf zwei interpolierte Sätze + Link auf den Ratgeber: **57 %** bei 804 Wörtern. Generische Erklärungen gehören in **einen** Artikel, nicht 78-fach dupliziert. Analog rotiert `RatgeberLinks` auf den Kantonsseiten jetzt **2 aus 7** Artikeln je Kanton (streut interne Links, statt einen Teaser 26-mal zu wiederholen); FR/EN-Kantonsseiten haben erstmals überhaupt einen Guide-Block.
- **Ergebnis (Vorher→Nachher, identisch gemessen; Durchschnitt aller 26 Paare je Familie):**

  | Seitenfamilie | Wörter | eigenständige 5-Gramme |
  |---|---|---|
  | `/steuerrechner/*` | 677 → **899** | 48 % → **56 %** |
  | `/quellensteuer-rechner/*` | 424 → **804** | 47 % → **57 %** |
  | `/fr/calculateur-impots/*` | 717 → **1000** | 52 % → **56 %** |
  | `/fr/calculateur-impot-source/*` | 555 → **1014** | 42 % → **51 %** |
  | `/en/tax-calculator/*` | 655 → **914** | 53 % → **57 %** |
  | `/en/withholding-tax-calculator/*` | 487 → **885** | 44 % → **54 %** |

- **Re-checked before push:** build clean (241 Seiten), Tests **102/102**, `check-links` green (240 Seiten, ≤3 Klicks, keine Broken Links), `audit-links` **clean** (keine Cross-Locale-Leaks, hreflang reziprok, keine fragile page, 80/80 je Locale), kein ß, `tsc --noEmit` sauber, Lighthouse **100×4** auf `/`, `/steuerrechner/zuerich/`, `/quellensteuer-rechner/zug/` (Startseite erst 82 im Kaltlauf, 3 Wiederholungen je 100 — Sandbox-Rauschen).
- **Offen (Owner):** in AdSense erst nach dem Deploy «Überprüfung beantragen» klicken — der Reviewer sieht sonst die alte Version. Vorher prüfen, dass die neuen Seiten live sind.
- **Nachtrag (gleiche Session):** Trust-Seiten nachgezogen. Neues Build-Time-Register `src/lib/dataRegistry.ts` liest die `_meta`-Blöcke aller Datendateien; die drei `/quellen/`-Seiten rendern daraus eine **Datensatz-Tabelle** (8 Datensätze × Quelle/Jahr/Abrufdatum — kann nie vom tatsächlichen Datenstand abweichen) plus «Wie wir Daten aktualisieren». 156→370 (DE), 224→541 (FR), 194→456 (EN) Wörter. `ueber-uns`/`a-propos`/`about`: Betreiber **namentlich genannt** (E-E-A-T, YMYL) + Kontakt-E-Mail + Abschnitt zur Datenaktualität; 270→347/446/391 Wörter. Re-checked: build 241, Tests 102/102, Links/Audit clean, kein ß.

### 2026-07-18 — Session 19: M15 — jede Tool-Seite als 5-teiliger Bildungsartikel (18 Seiten, DE/FR/EN)

- **Auftrag des Owners** (Content-Architect-Brief): zu jedem Rechner einen erklärenden Artikel (600–800 Wörter) unter dem Rechner, mit fixer 5-Teil-Struktur. Umgesetzt für **alle 6 Tools × 3 Sprachen = 18 Seiten**.
- **Struktur je Seite** (H2): (1) *Strategic Value* — warum die Berechnung fürs Finanzleben zählt, welches Problem sie löst; (2) *Financial Logic & Formula* — Methodik + explizite Formel; (3) *Worked Example* — Schritt für Schritt mit **serverseitig aus den Engines berechneten Zahlen** (single source mit dem Rechner); (4) *Smart Decision Tips* — actionable Tipps + Fallstricke, mit internen Links; (5) *FAQ* — bestehende, speist FAQPage-JSON-LD.
- **Neue serverseitige Beispielwerte** (statt Hardcoding): QST-Rechner + QST-Vergleich importieren die Engine bzw. lesen `public/data/qstv/a0.json` und rechnen live (ZH A0N 6500 = **CHF 469.95**; Spanne Zug **219.70** → Neuenburg **885.30**); Stundenlohn ruft `convertWage` (6500/42h → **35.71** Basis, **38.69** inkl. Ferien); Steuervergleich/3a nutzen die schon vorhandenen `cantonTax`-Werte. Alle im dist verifiziert.
- **Keine Regression:** Die Rechner-Islands blieben unangetastet — nur der Prosablock darunter wurde umstrukturiert. In Chromium bestätigt: Salary SSR + Recompute, QST SSR 469.95, 3a-Formular, Stundenlohn SSR 38.69, keine Konsolenfehler. FAQ-JSON-LD und alle internen Links erhalten.
- **Re-checked before push (pro Locale committet):** build clean (**241 Seiten**), Tests **98/98**, Links green (240), Audit clean (keine fragile pages, 80/80 je Locale), jede der 18 Seiten mit **5 H2-Sektionen**, kein ß, Lighthouse **≥95×4** auf gesampelten DE/FR/EN-Tool-Seiten. Committed (DE/FR/EN), stopped for review.

### 2026-07-17 — Session 18: M14 — Guide auf 15 Artikel/Sprache + explizite Formeln auf allen Tool-Seiten

- **Owner-Ziel erfüllt:** «10–15 Artikel» → Guide nun **15 Artikel je Sprache** (45 Dateien total); jede Tool-Seite hat Beschreibung + Methodik + **explizite Formel** + FAQ.
- **4 neue Artikel** (order 12–15), je DE + FR + EN — der Lohn-/Vorsorge-Cluster ist damit komplett:
  1. *AHV einfach erklärt* — Umlageprinzip, 5.3%/10.6% (sourced), Skala 44 & Beitragslücken (1/44, 5-Jahres-Nachzahlung), Splitting/150%-Plafond, Referenzalter 65 (AHV 21), Vorbezug/Aufschub, 13. AHV-Rente ab 2026; vervollständigt die 3-Säulen-Serie (AHV↔BVG↔3a verlinkt).
  2. *Teilzeit* — fixer Koordinationsabzug mit Rechen-Tabelle (90k: 71%→51%→27% versichert), Eintrittsschwelle je Arbeitgeber, Auffangeinrichtung, 8h-NBU-Regel, QST-Satzhochrechnung bei mehreren Jobs.
  3. *Lohnabrechnung verstehen* — jede Abzugszeile erklärt (Tabelle mit sourced Sätzen), 2 Kontroll-Punkte (NBU/KTG, BVG vs. Vorsorgeausweis), Lohnausweis-Abgleich.
  4. *Bonus & Gratifikation* — variabler Lohn vs. OR 322d, stillschweigender Anspruch, volle Beitragspflicht, Monats-/Jahresmodell-Effekt, Gegenmittel (PK-Einkauf/3a im Bonusjahr).
- **Formeln ergänzt** (9 Seiten): 3a (Ersparnis = Steuer(E) − Steuer(E − Einzahlung), Grenzsteuersatz-Erklärung), QST-Rechner + QST-Vergleich (QST = max(Brutto × Satz, Mindeststeuer), 5-Rappen-Rundung) — DE/FR/EN.
- **Fix unterwegs:** YAML-Frontmatter-Fehler (`\'` statt `''` in 2 EN-Dateien) vom Build gefangen und korrigiert; 3 fragile Seiten (Lohnabrechnung nur mit Hub-Inbound) via reziproke related-Links (Teilzeit↔Lohnabrechnung) geschlossen.
- **Re-checked before push:** build clean (**241 Seiten**), Tests 98/98, Links green (240), Audit clean (keine fragile pages, 80/80 je Locale), Hubs 15/15/15, Formeln im dist verifiziert, hreflang-Sample OK, kein ß, Lighthouse ≥95×4 auf 6 gesampelten URLs (4 neue Artikel + 2 Formel-Seiten). Committed, stopped for review.

### 2026-07-16 — Session 17: M13 — 4 neue Guide-Artikel ×3 Sprachen (guide depth während AdSense-Review)

- **Rationale:** AdSense-Review läuft ("getting ready") — editorial depth ist das sicherste Qualitätssignal für Review UND Search; programmatic scale (Gemeindeseiten) bleibt bewusst zurückgestellt, bis GSC-Daten vorliegen.
- **4 Artikel** (order 8–11), je DE + FR + EN (12 Dateien, guide nun **11 Artikel/Sprache**):
  1. *Säule 3a vs. 3b* — Abzug/Bindung/Vermögenssteuer/Auszahlung im Vergleich; 3a-Maxima aus `saeule-3a-2026.json` (sourced); Verweis auf GE/FR-3b-Ausnahmen.
  2. *Krankenkassenprämien senken* — 5 Hebel (Franchise 300–2500, Modelle, Kassenwechsel bis Ende November via priminfo/BAG, NBU/UVG-Doppeldeckung ab 8 Wochenstunden, IPV); positioniert den geplanten Franchise-Rechner (Sept-Daten).
  3. *Steuererklärung: Fristen & Abzüge* — 31. März + Verlängerung, Eskalation bis Ermessensveranlagung, Abzüge-Checkliste (3a sourced, Spenden 20% DBG), 30-Tage-Einsprachefrist.
  4. *Pensionskasse & BVG* — Eintrittsschwelle/Koordinationsabzug/koordinierter Lohn/Altersgutschriften **alle aus `social-contributions-2026.json`** (sourced, BSV/Fedlex); Beispielrechnung 80k/Alter 40; Einkäufe inkl. 3-Jahres-Sperrfrist.
- **Mesh:** PAGE_GROUPS +4 (volle hreflang-Reziprozität), relatedTool je Locale auf das passende Live-Tool, reziproke `related`-Updates (3a-gestaffelt ↔ 3a-vs-3b; 13. Monatslohn ↔ BVG) in allen 3 Sprachen; In-Body-Links auf Tools + Schwesterartikel locale-korrekt.
- **Re-checked before push:** build clean (**229 Seiten**), Tests 98/98, Links green (228 Seiten, ≤3 Klicks), Audit clean (keine cross-locale leaks, hreflang reziprok, keine fragile pages, 76/76 je Locale erreichbar), Hubs listen 11/11/11, kein ß. Lighthouse: 4 neue Artikel-URLs — 3× sofort 100/100/100/100; 1× perf 0.94 (TBT-Ausreisser) → 3-Run-Median-Rerun: **3× perf 1.0, TBT 0 ms** (Sandbox-CPU-Noise, kein echtes Problem). Committed, stopped for review.

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
