/**
 * Comprehensive internal-linking audit (read-only, informational) against ./dist.
 * Complements check-links.mjs (broken/orphan/depth) with:
 *  - hreflang reciprocity (every alternate points back)
 *  - cross-locale in-content leakage (a FR/EN page linking into another locale
 *    outside the language switcher — leaks link equity across languages)
 *  - inbound-link counts (fragile pages reachable via a single in-content link)
 *  - per-locale reachability (each locale navigable from its own home)
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');
if (!existsSync(DIST)) { console.error('run astro build first'); process.exit(1); }

const pages = new Map();
const walk = (dir) => {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    if (statSync(full).isDirectory()) walk(full);
    else if (e === 'index.html') {
      const rel = full.slice(DIST.length, -'index.html'.length).replace(/\\/g, '/');
      pages.set(rel === '' ? '/' : rel, readFileSync(full, 'utf-8'));
    }
  }
};
walk(DIST);

const localeOf = (p) => (p.startsWith('/fr/') ? 'fr' : p.startsWith('/en/') ? 'en' : 'de');

// In-content links = <a href> in <body>, EXCLUDING language-switcher/alternate anchors (rel="alternate").
const contentLinks = (html) => {
  const body = html.slice(html.indexOf('</head>'));
  const out = [];
  for (const m of body.matchAll(/<a\s+([^>]*?)href="(\/[^"]*)"([^>]*)>/g)) {
    const attrs = m[1] + m[3];
    if (/rel="alternate"/.test(attrs)) continue; // switcher / hreflang chip
    const href = m[2].split('#')[0].split('?')[0];
    if (href.startsWith('//')) continue;
    if (href.endsWith('/')) out.push(href);
  }
  return out;
};

const hreflangs = (html) => {
  const head = html.slice(0, html.indexOf('</head>'));
  return [...head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="https?:\/\/[^/"]+(\/[^"]*)"/g)]
    .map((m) => ({ lang: m[1], path: m[2] }))
    .filter((a) => a.lang !== 'x-default');
};

let issues = 0;

// 1) Cross-locale in-content leakage
console.log('== 1. Cross-locale in-content links (should be 0 — excludes switcher) ==');
let leaks = 0;
for (const [path, html] of pages) {
  const loc = localeOf(path);
  for (const href of contentLinks(html)) {
    if (localeOf(href) !== loc) { console.log(`  LEAK ${loc}: ${path} -> ${href} (${localeOf(href)})`); leaks++; issues++; }
  }
}
console.log(`  ${leaks === 0 ? 'OK — none' : leaks + ' leak(s)'}\n`);

// 2) hreflang reciprocity
console.log('== 2. hreflang reciprocity ==');
let hrefIssues = 0;
for (const [path, html] of pages) {
  for (const alt of hreflangs(html)) {
    const target = pages.get(alt.path);
    if (!target) { console.log(`  MISSING TARGET: ${path} -> ${alt.path}`); hrefIssues++; issues++; continue; }
    const back = hreflangs(target).some((b) => b.path === path);
    if (!back) { console.log(`  NOT RECIPROCAL: ${path} lists ${alt.path}, but not vice-versa`); hrefIssues++; issues++; }
  }
}
console.log(`  ${hrefIssues === 0 ? 'OK — all reciprocal' : hrefIssues + ' issue(s)'}\n`);

// 3) Inbound in-content link counts
const inbound = new Map([...pages.keys()].map((p) => [p, 0]));
for (const [, html] of pages) for (const href of new Set(contentLinks(html))) if (inbound.has(href)) inbound.set(href, inbound.get(href) + 1);
const fragile = [...inbound].filter(([p, n]) => p !== '/' && n <= 1).sort((a, b) => a[1] - b[1]);
console.log('== 3. Fragile pages (≤1 in-content inbound link, excl. nav/footer) ==');
if (fragile.length === 0) console.log('  OK — every page has ≥2 in-content inbound links');
else { console.log(`  ${fragile.length} page(s) with ≤1 in-content inbound link:`); for (const [p, n] of fragile.slice(0, 40)) console.log(`    ${n}  ${p}`); }
console.log('');

// 4) Per-locale reachability from locale home (in-content, staying in locale)
console.log('== 4. Per-locale reachability from locale home (in-content only) ==');
for (const home of ['/', '/fr/', '/en/']) {
  const loc = localeOf(home);
  const seen = new Set([home]);
  let frontier = [home];
  while (frontier.length) {
    const next = [];
    for (const p of frontier) for (const h of contentLinks(pages.get(p) || '')) if (localeOf(h) === loc && pages.has(h) && !seen.has(h)) { seen.add(h); next.push(h); }
    frontier = next;
  }
  const total = [...pages.keys()].filter((p) => localeOf(p) === loc && !p.startsWith('/404')).length;
  console.log(`  ${loc}: ${seen.size}/${total} pages reachable in-content from ${home}` + (seen.size < total ? '  ⚠' : '  ✓'));
}
console.log('');

// 5) Money-page inbound (tools should be well-linked)
console.log('== 5. Key money-page inbound (in-content) ==');
for (const p of ['/quellensteuer-rechner/', '/steuervergleich/', '/brutto-netto-rechner/', '/saeule-3a-rechner/',
                 '/fr/calculateur-impot-source/', '/en/withholding-tax-calculator/'])
  if (inbound.has(p)) console.log(`  ${String(inbound.get(p)).padStart(3)}  ${p}`);
console.log('');

console.log(issues === 0 ? '✅ AUDIT CLEAN — no cross-locale leaks, hreflang reciprocal.' : `⚠ ${issues} structural issue(s) above.`);
