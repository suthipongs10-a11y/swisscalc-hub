/**
 * Build-time loader for the per-situation comparison files in
 * /public/data/qstv/. Memoised per key so the 78 programmatic canton pages
 * read each ~230 KB file once instead of once per page.
 */
import { readFileSync } from 'node:fs';
import type { QstvFile } from './compare';

const cache = new Map<string, QstvFile>();

export function loadQstvFile(key: string): QstvFile {
  const k = key.toLowerCase();
  let file = cache.get(k);
  if (!file) {
    file = JSON.parse(readFileSync(`public/data/qstv/${k}.json`, 'utf8')) as QstvFile;
    cache.set(k, file);
  }
  return file;
}
