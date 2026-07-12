import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * CLAUDE.md hard constraint 2: every data file in /src/data/ carries a _meta
 * block with source (URL), retrieved (date), and taxYear or validFor.
 * This test IS the convention — a data file that fails it must not merge.
 */
const DATA_DIR = join(process.cwd(), 'src', 'data');

function jsonFilesIn(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, encoding: 'utf-8' })
    .filter((f) => f.endsWith('.json'))
    .map((f) => join(dir, f));
}

describe('/src/data/*.json _meta convention', () => {
  const files = jsonFilesIn(DATA_DIR);

  it('validates every data file (currently ' + files.length + ')', () => {
    for (const file of files) {
      const parsed = JSON.parse(readFileSync(file, 'utf-8')) as Record<string, unknown>;
      const meta = parsed['_meta'] as Record<string, unknown> | undefined;

      expect(meta, `${file}: missing _meta block`).toBeDefined();
      expect(typeof meta!['source'], `${file}: _meta.source must be a URL string`).toBe('string');
      expect(String(meta!['source']), `${file}: _meta.source must be an http(s) URL`).toMatch(/^https?:\/\//);
      expect(String(meta!['retrieved']), `${file}: _meta.retrieved must be an ISO date (YYYY-MM-DD)`).toMatch(
        /^\d{4}-\d{2}-\d{2}$/,
      );
      const hasValidity = meta!['taxYear'] !== undefined || meta!['validFor'] !== undefined;
      expect(hasValidity, `${file}: _meta needs taxYear or validFor`).toBe(true);
    }
  });
});
