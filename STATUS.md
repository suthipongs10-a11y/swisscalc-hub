# STATUS.md — SwissCalc Hub

## Current state

**Phase 0 + 0.5 complete — awaiting review. Do not start M0 without approval.**

## Session log

### 2026-07-12 — Session 1: Phase 0 research + project docs

- Ran deep research (5 angles, ~58 research agents; 10 key claims adversarially verified 3-0) → `RESEARCH.md`.
- Wrote `CLAUDE.md` (constraints/stack/conventions), `BUILD_PLAN.md` (M0–M4 milestone-gated), this file.
- Key findings:
  - Quellensteuer calculator = biggest SEO gap (no ESTV tool, prose-only competition). Chosen as SEO flagship; brutto-netto ships first (M1) because its contribution engine unblocks it.
  - ESTV JSON backend feeds all-canton programmatic data (2010–2026), but is **not open-data licensed** — adopted derived-parameters + attribution posture, consent request pending (see decisions).
  - BAG premium data is true open data (opendata.swiss), refreshed ~late September.
  - No cookie banner needed at launch (nFADP + cookieless analytics, ad-free). Google-certified TCF CMP only becomes mandatory if we ever run Google ads.
  - Swiss orthography hard rule: never ß, always ss.
- Committed as `P0: research + project docs`. **Stopped for review.**

## Pending decisions (need user input)

1. **Domain name** — needed before M0 (Cloudflare Pages setup, canonical URLs, Organization schema).
2. **ESTV written consent request** — send early (recommended in RESEARCH.md §4.4)? Needs a sender identity/email.
3. **Analytics choice** — Cloudflare Web Analytics (zero-config, recommended) vs. self-hosted Plausible.
4. **Keyword-volume validation** — RESEARCH.md volume tiers are directional estimates; plan says validate via Google Keyword Planner in M1. Needs a Google Ads account (free) — user-provided or skip?
5. **Approval to start M0.**

## Data-freshness watchlist

| Item | Verify when |
|---|---|
| Säule 3a max deduction (CHF 7'258 was the 2025 value) | At M2 build time, against BSV |
| ESTV 2026 tax data completeness (22/26 cantons live as of research) | Before M3 import |
| BAG premium dataset (next drop ~Sept 2026) | Before premium-finder tool |
| EMBAG open-data transition (may resolve ESTV licensing) | ~Jan 2027 |
