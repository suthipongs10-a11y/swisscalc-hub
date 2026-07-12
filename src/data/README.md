# /src/data/ — calculation parameters

Every JSON file here MUST have a `_meta` block (enforced by `tests/data-meta.test.ts`):

```json
{
  "_meta": {
    "source": "https://swisstaxcalculator.estv.admin.ch/",
    "retrieved": "2026-07-12",
    "taxYear": 2026
  }
}
```

`validFor` (e.g. `"2026"` or `"2026-01..2026-12"`) may replace `taxYear` for non-tax data (BAG premiums, contribution rates). No number ships without a source (CLAUDE.md hard constraint 2). Licensing posture for ESTV-derived values: RESEARCH.md §4.4.
