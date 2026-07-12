/**
 * Internal-link integrity check (SEO_SPEC §5 rules 1-2), run against ./dist:
 *  1. Every internal href resolves to a built page (or asset).
 *  2. No orphans: every built page is reachable from / within 3 clicks.
 * Exits 1 on violations — wired into CI after `astro build`.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');
if (!existsSync(DIST)) {
  console.error('dist/ not found — run astro build first');
  process.exit(1);
}

// Collect built pages: dist/**/index.html → path with trailing slash.
const pages = new Map(); // path -> file
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry === 'index.html') {
      const rel = full.slice(DIST.length, -'index.html'.length).replace(/\\/g, '/');
      pages.set(rel === '' ? '/' : rel, full);
    }
  }
};
walk(DIST);
pages.set('/404/', join(DIST, '404.html')); // built as 404.html, always "reachable"

const internalLinks = (file) => {
  const html = readFileSync(file, 'utf-8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  return hrefs
    .filter((h) => h.startsWith('/') && !h.startsWith('//'))
    .map((h) => h.split('#')[0].split('?')[0])
    .filter((h) => h !== '');
};

let failed = false;

// 1) Broken internal links
const assetOk = (href) =>
  existsSync(join(DIST, href)) || existsSync(join(DIST, href.replace(/\/$/, ''), 'index.html'));
for (const [path, file] of pages) {
  if (path === '/404/') continue;
  for (const href of internalLinks(file)) {
    const isPage = href.endsWith('/');
    const ok = isPage ? pages.has(href) : assetOk(href);
    if (!ok) {
      console.error(`BROKEN: ${path} -> ${href}`);
      failed = true;
    }
    if (isPage && !href.endsWith('/')) {
      console.error(`NO TRAILING SLASH: ${path} -> ${href}`);
      failed = true;
    }
  }
}

// 2) Orphans / click depth from home
const depth = new Map([['/', 0]]);
let frontier = ['/'];
while (frontier.length) {
  const next = [];
  for (const path of frontier) {
    const file = pages.get(path);
    if (!file) continue;
    for (const href of internalLinks(file)) {
      if (href.endsWith('/') && pages.has(href) && !depth.has(href)) {
        depth.set(href, depth.get(path) + 1);
        next.push(href);
      }
    }
  }
  frontier = next;
}
for (const path of pages.keys()) {
  if (path === '/404/') continue;
  const d = depth.get(path);
  if (d === undefined) {
    console.error(`ORPHAN (unreachable from /): ${path}`);
    failed = true;
  } else if (d > 3) {
    console.error(`TOO DEEP (${d} clicks): ${path}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`Link check OK: ${pages.size - 1} pages, all reachable within 3 clicks, no broken links.`);
