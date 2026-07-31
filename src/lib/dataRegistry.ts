/**
 * Build-time registry of every dataset behind the calculators, read from the
 * `_meta` blocks that CLAUDE.md mandates on all /src/data/*.json files (plus
 * the derived QST tariffs in /public/data/qst/). The /quellen/ pages render
 * this, so the sources table can never drift from the data actually shipped —
 * a data refresh updates the page by itself.
 *
 * Labels/usage stay language-neutral here (ids only); the pages localize them.
 */
import { readFileSync } from 'node:fs';

import socialMeta from '../data/social-contributions-2026.json';
import saeule3aMeta from '../data/saeule-3a-2026.json';
import hourlyMeta from '../data/hourly-wage-2026.json';
import federalMeta from '../data/tax/federal-income-2026.json';
import cantonalMeta from '../data/tax/cantonal-income-2026.json';
import multipliersMeta from '../data/tax/multipliers-2026.json';
import statsMeta from '../data/tax/canton-stats-2026.json';
import qstIndex from '../data/qst/index.json';

export interface DatasetEntry {
  /** Stable id the pages use to look up localized labels. */
  id: string;
  /** Primary official source URL. */
  source: string;
  /** Retrieval date as published in the data file (YYYY-MM-DD). */
  retrieved: string;
  /** Tax/validity year the parameters apply to. */
  year: number;
  /** Optional secondary provenance (e.g. MIT reference implementation). */
  via?: string;
}

interface MetaShape {
  source?: string;
  retrieved?: string;
  taxYear?: number;
  validFor?: number;
  retrievedVia?: string;
}

function entry(id: string, meta: MetaShape): DatasetEntry {
  if (!meta.source || !meta.retrieved) throw new Error(`Dataset ${id} is missing _meta.source/retrieved`);
  const year = meta.taxYear ?? meta.validFor;
  if (!year) throw new Error(`Dataset ${id} is missing _meta.taxYear/validFor`);
  return { id, source: meta.source, retrieved: meta.retrieved, year, via: meta.retrievedVia };
}

/** The ZH file stands in for the shared provenance of all 26 derived QST files. */
const qstSample = JSON.parse(readFileSync('public/data/qst/zh.json', 'utf8')) as { _meta: MetaShape };

export const DATASETS: DatasetEntry[] = [
  entry('social', (socialMeta as { _meta: MetaShape })._meta),
  entry('saeule3a', (saeule3aMeta as { _meta: MetaShape })._meta),
  entry('hourly', (hourlyMeta as { _meta: MetaShape })._meta),
  entry('federal', (federalMeta as { _meta: MetaShape })._meta),
  entry('cantonal', (cantonalMeta as { _meta: MetaShape })._meta),
  entry('multipliers', (multipliersMeta as { _meta: MetaShape })._meta),
  entry('stats', (statsMeta as { _meta: MetaShape })._meta),
  entry('qst', qstSample._meta),
];

export const QST_CANTON_COUNT = qstIndex.cantons.length;

/** DD.MM.YYYY per the site's number/date conventions. */
export function formatRetrieved(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}
