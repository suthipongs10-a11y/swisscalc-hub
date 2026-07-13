# Quellensteuer (withholding-tax) tariff files — drop zone

This folder holds the **raw, official withholding-tax tariff files** for the
planned Quellensteuer-Rechner (the flagship SEO tool). It is the one thing that
is blocked on external data: the tariffs cannot be reached from the build
sandbox (admin.ch and cantonal domains are blocked by the egress proxy), so the
**owner downloads them once** and commits them here. After that, the build is
turnkey again.

> ⚠️ Terminology trap: on estv.admin.ch the English card **“Swiss Withholding
> Tax”** is the *Anticipatory Tax* (Verrechnungssteuer, on dividends/interest) —
> **not** this. What we need is **Quellensteuer** = tax at source on the
> **salary** of foreign employees, filed under **Direkte Bundessteuer →
> Quellensteuer** (switch the site to German — the download pages are not
> translated to English).

## What to put here

Launch scope is 5 cantons (RESEARCH.md / BUILD_PLAN backlog): **ZH, GE, ZG, VD, BS.**
Use the current tax year folder (`2026/`).

```
data/raw/qst/
├── README.md            ← this file
├── 2026/
│   ├── zh.txt           ← Kanton Zürich, tariff download
│   ├── ge.txt           ← Genève
│   ├── zg.txt           ← Zug
│   ├── vd.txt           ← Vaud
│   └── bs.txt           ← Basel-Stadt
└── spec/                ← (optional but very helpful)
    └── *.pdf            ← ESTV/Swissdec tariff-format description ("Erläuterungen",
                            "Richtlinien Quellensteuer", record layout)
```

- **Preferred format: `.txt`** — the official ESTV/Swissdec fixed-width tariff
  file (this is what payroll software consumes; machine-readable). If a source
  hands you a **ZIP**, commit the whole zip (or its extracted `.txt`) — fine.
- **PDF is a fallback only.** A human-readable PDF table works if no `.txt`
  exists, but the importer then needs a hand-written parser — slower. Grab the
  `.txt` if it is offered.
- Keep the **original filename too** if you like (rename a copy to `zh.txt`
  etc., or just tell me the mapping in the commit message).
- File encoding is usually Latin-1/Windows-1252 or UTF-8 — don't re-encode, I
  handle that in the importer.

## Where to download (owner)

**Easiest, reliable route — cantonal tax offices.** Google each and click the
official state `.ch` result:

| Canton | Search |
|---|---|
| ZH | `Kanton Zürich Quellensteuer Tarife 2026 herunterladen` |
| GE | `Genève barème impôt à la source 2026 télécharger` |
| ZG | `Kanton Zug Quellensteuer Tarife 2026` |
| VD | `Vaud barème impôt source 2026 télécharger` |
| BS | `Basel-Stadt Quellensteuer Tarife 2026` |

**Central route — ESTV (all cantons in one place):** estv.admin.ch → switch to
**Deutsch** → **Direkte Bundessteuer** → **Quellensteuer** → “Tarife
herunterladen”. (Not “Verrechnungssteuer / Anticipatory Tax”.)

## Checklist

- [ ] `2026/zh.txt`
- [ ] `2026/ge.txt`
- [ ] `2026/zg.txt`
- [ ] `2026/vd.txt`
- [ ] `2026/bs.txt`
- [ ] `spec/…` tariff-format description (optional)
- [ ] `git add data/raw/qst && git commit && git push`

## What happens next (build side)

Once the files land here, the next session builds:

1. `scripts/import-qst.mjs` — parses the tariff files → versioned JSON in
   `src/data/qst/` (each with a `_meta` block: source URL, retrieved date,
   taxYear), respecting the per-canton calculation model (monthly: ZH/ZG/BS;
   annual: GE/VD).
2. `src/lib/qst/engine.ts` — pure function: gross salary + canton + tariff code
   (A/B/C/H…, ± church tax) + period model → monthly withholding, with unit
   tests pinned to the official example tables each canton publishes.
3. Tool pages in all three locales (`/quellensteuer-rechner/`,
   `/fr/calculateur-impot-source/`, `/en/withholding-tax-calculator/`), wired
   into PAGE_GROUPS (hreflang) and the existing internal-link mesh (the guide
   articles on withholding tax already link to the salary tool and will link
   here too).

Licensing posture is unchanged (CLAUDE.md / RESEARCH.md §4.4): we derive and
publish **calculation parameters with citations**, attribute ESTV + the canton
prominently, and do not mirror the raw files publicly beyond this repo.
