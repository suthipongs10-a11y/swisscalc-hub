/* verify.cjs — ตรวจความถูกต้องของเว็บที่ generate */
'use strict';
const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'ais.html', 'true-dtac.html', 'compare-networks.html', 'faq.html', 'check-number-balance.html', '404.html',
  'ais/1daypack.html', 'ais/2daypack.html', 'ais/3daypack.html', 'ais/7daypack.html', 'ais/30daypack.html',
  'true-dtac/7daypack.html', 'true-dtac/30daypack.html',
  'articles/how-to-register.html', 'articles/faq-ais.html', 'articles/5g-phones.html', 'articles/sim-cards.html', 'articles/net-speed-explained.html', 'articles/ber-mongkol.html'];

let errors = 0, warns = 0;
const err = m => { console.log('ERROR:', m); errors++; };
const warn = m => { console.log('warn :', m); warns++; };

// 1. legacy files exist
const legacy = ['index.html', 'ais.html', 'ais/1daypack.html', 'ais/2daypack.html', 'ais/3daypack.html', 'ais/7daypack.html', 'ais/30daypack.html', 'true-dtac.html', 'true-dtac/7daypack.html', 'true-dtac/30daypack.html', 'articles/how-to-register.html', 'articles/faq-ais.html', 'articles/5g-phones.html', 'articles/sim-cards.html', 'articles/net-speed-explained.html', 'articles/ber-mongkol.html'];
for (const f of legacy) if (!fs.existsSync(path.join(__dirname, f))) err('legacy URL missing: ' + f);

// 2. USSD codes: เทียบกับเว็บเดิม (OldSite)
function collectCodes(dir) {
  const out = new Map(); // code -> count
  const walk = d => {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      if (fs.statSync(p).isDirectory()) { if (!/node_modules|img|css|js|data/.test(f)) walk(p); }
      else if (f.endsWith('.html')) {
        const html = fs.readFileSync(p, 'utf8');
        for (const m of html.matchAll(/\*(?:777|900|104)\*\d+\*\d+(?:#|%23)/g)) {
          const c = m[0].replace('%23', '#');
          out.set(c, (out.get(c) || 0) + 1);
        }
      }
    }
  };
  walk(dir);
  return out;
}
const oldCodes = collectCodes('C:/Work/PronetSearm/OldSite');
const newCodes = collectCodes(__dirname);
for (const c of oldCodes.keys()) if (!newCodes.has(c)) err('code missing in new site: ' + c);
for (const c of newCodes.keys()) if (!oldCodes.has(c)) err('code INVENTED in new site: ' + c);
console.log(`codes: old=${oldCodes.size} new=${newCodes.size}`);

// 3. per-page checks
const titles = new Set(), descs = new Set();
const allFiles = new Set();
const walkAll = d => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walkAll(p);
    else allFiles.add('/' + path.relative(__dirname, p).replace(/\\/g, '/'));
  }
};
walkAll(__dirname);

for (const pg of pages) {
  const html = fs.readFileSync(path.join(__dirname, pg), 'utf8');
  const t = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const d = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!t) err(pg + ': no title');
  if (titles.has(t)) err(pg + ': duplicate title: ' + t); titles.add(t);
  if (!d) err(pg + ': no description');
  if (descs.has(d)) err(pg + ': duplicate description'); descs.add(d);
  if (t.length > 65) warn(pg + `: title ${t.length} chars`);
  if (d.length > 158) warn(pg + `: description ${d.length} chars`);
  if (h1s !== 1) err(pg + `: h1 count = ${h1s}`);
  if (!html.includes('rel="canonical"')) err(pg + ': no canonical');
  if (!/lang="th"/.test(html)) err(pg + ': no lang=th');
  if (!html.includes('og:title')) err(pg + ': no og tags');
  // JSON-LD validity
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(pg + ': invalid JSON-LD: ' + e.message); }
  }
  // internal links resolve
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    let u = m[1];
    if (u === '/') u = '/index.html';
    if (!allFiles.has(u)) err(pg + ': broken internal link ' + m[1]);
  }
  // images have width/height + lazy (ยกเว้น above-fold)
  for (const m of html.matchAll(/<img [^>]*>/g)) {
    const tag = m[0];
    if (tag.includes('/img/') && (!tag.includes('width=') || !tag.includes('height='))) warn(pg + ': img missing width/height: ' + (tag.match(/src="([^"]*)"/) || [])[1]);
  }
  // tel links ต้อง encode #
  for (const m of html.matchAll(/href="tel:([^"]*)"/g)) {
    if (m[1].includes('#')) err(pg + ': tel link has raw #: ' + m[1]);
  }
}

// 4. sitemap URLs = 19 และตรงกับไฟล์
const sm = fs.readFileSync(path.join(__dirname, 'sitemap.xml'), 'utf8');
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (smUrls.length !== 19) err('sitemap has ' + smUrls.length + ' urls (expect 19)');
for (const u of smUrls) {
  let p = u.replace('https://www.xn--m3chf0ahc2cze1ecq8d.com', '');
  if (p === '/') p = '/index.html';
  if (!allFiles.has(p)) err('sitemap url has no file: ' + u);
}

// 5. ราคา: ทุกราคาเดิม (จาก packages.json) ต้องปรากฏบนหน้าที่เกี่ยวข้อง
const pkgs = require('./data/packages.json');
for (const [f, cards] of Object.entries(pkgs)) {
  const target = f === 'index.html' ? 'index.html' : f;
  const html = fs.readFileSync(path.join(__dirname, target), 'utf8');
  for (const c of cards) {
    if (!html.includes(c.price)) err(target + ': price missing ' + c.price + ' (code ' + c.code + ')');
    if (!html.includes(c.code)) err(target + ': code missing ' + c.code);
  }
}

console.log(`\nDONE: ${errors} errors, ${warns} warnings`);
process.exit(errors ? 1 : 0);
