/**
 * Cross-canton Quellensteuer comparison — pure functions over the per-situation
 * files in /public/data/qstv/<key>.json (built by scripts/build-qst-compare.mjs).
 * Reuses the band lookup + church resolution of the QST engine so the numbers
 * are identical to the per-canton calculators.
 */
import { qstFromBands, resolveChurch, type ChurchMode, type QstBand, type QstGroup } from './engine';

export interface QstvCantonEntry {
  church: ChurchMode;
  N?: QstBand[];
  Y?: QstBand[];
}

export interface QstvFile {
  key: string;
  cantons: Record<string, QstvCantonEntry>;
}

export interface CompareRow {
  abbr: string;
  code: string;
  monthlyTax: number;
  annualTax: number;
  ratePct: number;
  monthlyNet: number;
}

/** The situation key for a group/children combination (mirrors buildCode minus church). */
export function situationKey(group: QstGroup, children: number): string {
  const kids = group === 'A' ? 0 : Math.max(group === 'H' ? 1 : 0, Math.min(5, children));
  return `${group}${kids}`;
}

/**
 * One row per canton present in the file, sorted ascending by monthly tax
 * (ties by abbreviation for a stable order).
 */
export function compareQst(monthlyGross: number, wantChurch: boolean, file: QstvFile): CompareRow[] {
  const rows: CompareRow[] = [];
  for (const [abbr, entry] of Object.entries(file.cantons)) {
    const church = resolveChurch(entry.church, wantChurch);
    const bands = entry[church];
    if (!bands) continue;
    const r = qstFromBands(monthlyGross, bands, `${file.key}${church}`);
    rows.push({ abbr, code: r.code, monthlyTax: r.monthlyTax, annualTax: r.annualTax, ratePct: r.ratePct, monthlyNet: r.monthlyNet });
  }
  rows.sort((a, b) => a.monthlyTax - b.monthlyTax || a.abbr.localeCompare(b.abbr));
  return rows;
}
