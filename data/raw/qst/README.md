# Quellensteuer (withholding-tax) tariff files — data source & refresh

The flagship Quellensteuer-Rechner is built from the official **ESTV
withholding-tax tariff files for salaries** ("Quellensteuertarife für Löhne").
Per RESEARCH.md §4.4 we publish **derived calculation parameters with a
citation**, not a raw mirror — so the raw ESTV files are **git-ignored** (see
`.gitignore`) and only the derived JSON in `public/data/qst/*.json` +
`src/data/qst/index.json` is committed.

> ⚠️ Terminology trap: on estv.admin.ch the English card **"Swiss Withholding
> Tax"** is the *Anticipatory Tax* (Verrechnungssteuer, on dividends/interest) —
> NOT this. What we need is **Quellensteuer** = tax at source on the **salary**
> of foreign employees.

## Source (owner, out-of-band)

estv.admin.ch (German) → **Direkte Bundessteuer → Quellensteuer →
Quellensteuertarife für Löhne → "Quellensteuertarife für den Import in
Lohnbuchhaltungssysteme"**. Download:

- **`tar<jj>txt.zip`** — all 26 cantons, TXT format (this is what the importer reads).
- **`qst-tarife-recordformate-loehne-*.pdf`** — the record-format spec (kept in this folder).

The current files (git-ignored except this README + the spec PDF):

```
data/raw/qst/
├── README.md                                  (tracked)
├── qst-tarife-recordformate-loehne-2025-de.pdf (tracked — neutral format spec)
├── tar2026.zip            (git-ignored — raw ESTV, native format)
├── tar2026txt.zip         (git-ignored — raw ESTV, TXT: 26× tar26<kt>.txt)
└── txt/                   (git-ignored — unzipped working copy for the importer)
```

## Refresh procedure (yearly / when a canton republishes)

```bash
# 1. Drop the new tar<jj>txt.zip into data/raw/qst/ (owner, from ESTV)
unzip -o data/raw/qst/tar<jj>txt.zip -d data/raw/qst/txt

# 2. Derive the JSON (codes A/B/C/H, 0–5 children, church where levied;
#    rates merged to 0.05pp for a compact indicative model)
node scripts/import-qst.mjs --year <YYYY> --retrieved <YYYY-MM-DD>

# 3. Rebuild + verify; the tool + tests pick up the new public/data/qst/*.json
npm run build && npm test
```

`scripts/import-qst.mjs` writes `public/data/qst/<kt>.json` (per canton: `_meta`
citation + tariff bands) and `src/data/qst/index.json` (canton list, church
availability, children ranges, tariff-file date). The record layout is decoded
per the spec PDF (record 06 = progressive tariff; §4.2 tariff codes; §4.3
monthly income; §4.4 rate & minimum tax).

## Accuracy note (honest)

The shipped rates are merged to 0.05 percentage points → the tool is
**indicative**; the binding statement is the employer's payroll under the
cantonal tariffs. Sonderfälle (cross-border L/M/N/P/Q/R–V, board-member HE/ME,
correction/replacement codes) are **not** modelled. Owner spot-check: compare a
few results against a cantonal "lesbarer Tarif" PDF (e.g. zh.ch, ge.ch).
