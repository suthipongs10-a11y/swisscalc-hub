import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * CLAUDE.md hard rule: never ß — always ss (Swiss Standard German).
 * Scans all source and content files; one ß anywhere fails the build.
 */
const SCAN_DIRS = ['src'];
const EXTENSIONS = ['.astro', '.ts', '.tsx', '.json', '.md', '.mdx', '.css'];

function filesToScan(): string[] {
  const result: string[] = [];
  for (const dir of SCAN_DIRS) {
    const entries = readdirSync(join(process.cwd(), dir), { recursive: true, encoding: 'utf-8' });
    for (const entry of entries) {
      if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
        result.push(join(process.cwd(), dir, entry));
      }
    }
  }
  return result;
}

describe('Swiss orthography (no ß, ever)', () => {
  it('finds no ß in any source or content file', () => {
    const offenders: string[] = [];
    for (const file of filesToScan()) {
      const content = readFileSync(file, 'utf-8');
      if (content.includes('ß')) {
        const line = content.split('\n').findIndex((l) => l.includes('ß')) + 1;
        offenders.push(`${file}:${line}`);
      }
    }
    expect(offenders, `ß found (use ss): ${offenders.join(', ')}`).toEqual([]);
  });
});
