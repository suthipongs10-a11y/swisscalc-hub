/*
 * build.js — generator เว็บโปรเน็ตเสริม.com
 * ข้อมูลทั้งหมดมาจาก data/*.json (สกัดจากเว็บเดิมแบบ verbatim) ห้ามแก้ราคา/รหัสในไฟล์นี้
 * รัน: node build.js  → generate *.html, sitemap.xml, robots.txt ลงโฟลเดอร์นี้
 */
'use strict';
const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.xn--m3chf0ahc2cze1ecq8d.com';
const SITE_NAME = 'โปรเน็ตเสริม.com';
const TODAY_ISO = '2026-07-18';
const UPDATED_TH = '18 กรกฎาคม 2569';
const YEAR = '2026';

const packages = require('./data/packages.json');
const metaOld = require('./data/meta-old.json');
const faqsOld = require('./data/faqs-old.json');
const proNotes = require('./data/pro-notes.json');
const hubNotes = require('./data/hub-notes.json');
const EXTRA_URLS = []; // หน้าที่ generator ส่วน long-tail เพิ่ม — ถูกรวมเข้า sitemap ตอนท้าย
const articlesDir = path.join(__dirname, 'data', 'articles');
const articles = {};
for (const f of fs.readdirSync(articlesDir)) {
  const a = JSON.parse(fs.readFileSync(path.join(articlesDir, f), 'utf8'));
  articles[a.slug] = a;
}

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const telHref = code => 'tel:' + code.replace(/#/g, '%23');
const priceNum = p => parseFloat(String(p).replace(/,/g, ''));

function durKey(d) {
  if (/24\s*ชม|1\s*วัน/.test(d)) return '1d';
  if (/2\s*วัน/.test(d)) return '2d';
  if (/3\s*วัน/.test(d)) return '3d';
  if (/7\s*วัน/.test(d)) return '7d';
  if (/30\s*วัน/.test(d)) return '30d';
  return 'other';
}
/* สีการ์ดยึดตามค่ายจริงเสมอ: AIS = เขียว (cat-ais), ทรู/ดีแทค = แดง (cat-tmh) */
function catOf(c) {
  return c.carrier === 'ais' ? 'ais' : 'tmh';
}
function badgeLabel(c) {
  if (c.carrier === 'true') return 'ทรู';
  if (c.carrier === 'dtac') return 'ดีแทค';
  return 'AIS';
}
function speedOf(c) {
  const txt = c.features.join(' ').replace(/\(FUP[^)]*\)/g, '');
  const m = txt.match(/([\d.]+)\s*(Kbps|Mbps)/);
  return m ? { val: m[1], unit: m[2] } : null;
}
function displayName(c, useH3) {
  if (useH3 && c.name) return c.name;
  const sp = speedOf(c);
  const noThrottle = c.features.some(f => f.includes('ไม่ลดสปีด'));
  return sp ? `เน็ต ${sp.val} ${sp.unit}${noThrottle ? ' ไม่ลดสปีด' : ''}` : 'โปรเน็ตเสริม';
}
function capLine(c) {
  const used = c.features.find(f => f.includes('ใช้งานได้'));
  if (used) return used;
  if (c.features.some(f => f.includes('ไม่จำกัดปริมาณ'))) return 'ไม่จำกัดปริมาณ';
  return '';
}
function callLine(c) {
  return c.features.find(f => f.includes('โทรฟรี')) || '';
}
function noteLine(c) {
  const sp = speedOf(c);
  const cap = capLine(c);
  const call = callLine(c);
  return c.features.filter(f => {
    if (call && f === call) return false;
    if (cap && (f === cap || f === 'ไม่จำกัดปริมาณ' || f.includes('ไม่จำกัดปริมาณ'))) return false;
    if (sp && f.replace(/\(FUP[^)]*\)/g, '').match(/([\d.]+)\s*(Kbps|Mbps)/)) return false;
    return true;
  }).join(' · ');
}
const carrierName = { ais: 'AIS', true: 'TrueMove H', dtac: 'dtac' };

/* ---------- svg icons ---------- */
const I = {
  leaf: `<svg class="brand-logo" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M6 26C6 14 16 6 34 6c0 18-8 28-20 28-3 0-6-1-8-3" fill="#8ABF06"/><path d="M6 34c6-10 14-16 24-20" stroke="#254B04" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1.3" fill="currentColor" stroke="none"/></svg>`,
  ext: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18"/><path d="M4 7h16"/><path d="m6 7-3 6a3.5 3.5 0 0 0 6 0L6 7Z"/><path d="m18 7-3 6a3.5 3.5 0 0 0 6 0l-3-6Z"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3A19.5 19.5 0 0 1 5.1 13 19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-3.6 8-9V5l-8-3-8 3v8c0 5.4 8 9 8 9Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>`,
  sim: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-4-5Z"/><rect x="9" y="12" width="6" height="6" rx="1"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
};

/* ไอคอน spec list — เส้นสไตล์เดียวกับชุด I ด้านบน ใช้ตัวเดียวกันทุกการ์ดต่อประเภทข้อมูล */
const SPEC_ICONS = {
  speed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>`,
  data: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 20v-4M12 20v-9M19 20V5"/></svg>`,
  call: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3A19.5 19.5 0 0 1 5.1 13 19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>`,
  dur: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  tax: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>`,
  note: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m9 12.5 2 2 4-4.5"/></svg>`,
};

/* ---------- กราฟิกแบนเนอร์ประจำหน้า (SVG generate ตามข้อมูลหน้านั้น) ---------- */
const ART_ICONS = { ...SPEC_ICONS };
ART_ICONS.star = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6L3.2 9.4l6.1-.8Z"/></svg>`;

function speedRangeOf(cards) {
  const vals = [];
  for (const c of cards) { const s = speedOf(c); if (s) vals.push({ v: parseFloat(s.val), u: s.unit }); }
  if (!vals.length) return null;
  const kb = x => (x.u === 'Kbps' ? x.v : x.v * 1000);
  vals.sort((a, b) => kb(a) - kb(b));
  const f = x => `${x.v} ${x.u}`;
  const lo = f(vals[0]), hi = f(vals[vals.length - 1]);
  return lo === hi ? lo : `${lo} – ${hi}`;
}
const minPriceOf = cards => Math.min(...cards.map(c => priceNum(c.price)));

/* pageArt: แบนเนอร์คลื่นสัญญาณ + แท่งสัญญาณ + ตัวใหญ่ (5G ฯลฯ) + ชิปข้อมูลจริงของหน้า
 * o: {tone: ais|tmh|mix|brand, big, label, stat1, stat2, motif} */
function pageArt(o) {
  const tones = {
    ais: ['#57960F', '#2E5A08', '#CDE84A'],
    tmh: ['#D40707', '#7F1D1D', '#FFD54D'],
    mix: ['#4D8C14', '#B30000', '#FFD54D'],
    brand: ['#254B04', '#1C3A03', '#8ABF06'],
  }[o.tone] || ['#254B04', '#1C3A03', '#8ABF06'];
  const g1 = tones[0], g2 = tones[1], ac = tones[2];
  const icon = o.motif ? o.motif.replace('<svg ', '<svg x="620" y="18" width="40" height="40" style="color:#fff" opacity=".8" ') : '';
  return `<svg viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg" font-family="'Noto Sans Thai',system-ui,sans-serif" aria-hidden="true">
<defs><linearGradient id="pa-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g1}"/><stop offset="1" stop-color="${g2}"/></linearGradient>
<clipPath id="pa-c"><rect width="720" height="150" rx="18"/></clipPath></defs>
<rect width="720" height="150" rx="18" fill="url(#pa-g)"/>
<g clip-path="url(#pa-c)">
<circle cx="70" cy="-50" r="150" fill="#fff" opacity=".07"/>
<circle cx="640" cy="195" r="62" fill="none" stroke="#fff" stroke-width="10" opacity=".15"/>
<circle cx="640" cy="195" r="102" fill="none" stroke="#fff" stroke-width="10" opacity=".10"/>
<circle cx="640" cy="195" r="142" fill="none" stroke="#fff" stroke-width="10" opacity=".06"/>
<circle cx="322" cy="30" r="5" fill="${ac}" opacity=".85"/>
<circle cx="349" cy="52" r="3" fill="#fff" opacity=".5"/>
<rect x="40" y="92" width="16" height="28" rx="5" fill="#fff" opacity=".35"/>
<rect x="64" y="74" width="16" height="46" rx="5" fill="#fff" opacity=".5"/>
<rect x="88" y="54" width="16" height="66" rx="5" fill="#fff" opacity=".7"/>
<rect x="112" y="32" width="16" height="88" rx="5" fill="${ac}"/>
<text x="152" y="86" font-size="54" font-weight="800" fill="#fff">${esc(o.big)}</text>
<text x="152" y="124" font-size="17" font-weight="700" fill="${ac}">${esc(o.label)}</text>
${icon}
<text x="688" y="72" font-size="21" font-weight="800" fill="#fff" text-anchor="end">${esc(o.stat1)}</text>
<text x="688" y="103" font-size="14.5" font-weight="600" fill="#fff" opacity=".9" text-anchor="end">${esc(o.stat2)}</text>
</g></svg>`;
}
const artBlock = o => `<div class="container page-art" aria-hidden="true">${pageArt(o)}</div>`;

/* แปลง features (verbatim) → รายการ [type, text] สำหรับ icon list */
function specItems(c) {
  let call = null, data = null, speed = null;
  const bonus = [], notes = [];
  for (const f of c.features) {
    if (/โทรฟรี/.test(f)) { if (!call) call = f; else notes.push(f); continue; }
    if (/แถม/.test(f)) { bonus.push(f); continue; }
    if (/ใช้งานได้|ไม่จำกัดปริมาณ/.test(f)) { if (!data) data = f; else notes.push(f); continue; }
    if (/[\d.]+\s*(Kbps|Mbps)/.test(f)) { if (!speed) speed = f; else notes.push(f); continue; }
    notes.push(f);
  }
  const dataText = [data, ...bonus].filter(Boolean).join(' · ');
  const items = [];
  if (speed) items.push(['speed', speed]);
  if (dataText) items.push(['data', dataText]);
  if (call) items.push(['call', call]);
  items.push(['dur', 'นาน ' + c.durationRaw]);
  if (c.taxIncluded) items.push(['tax', 'ราคารวมภาษีแล้ว']);
  for (const n of notes) items.push(['note', n]);
  return items;
}
function specsList(c) {
  return `<ul class="pkg-specs">${specItems(c).map(([t, txt]) => `<li class="sp-${t}">${SPEC_ICONS[t]}<span>${esc(txt)}</span></li>`).join('')}</ul>`;
}

/* ---------- critical css (inline) ---------- */
const CRITICAL = `:root{--lime:#8ABF06;--green-700:#254B04;--bg:#F7F8FA;--border:#E5E7EB;--ink:#111;--page-padding:20px}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Noto Sans Thai',system-ui,sans-serif;background:var(--bg);color:var(--ink);line-height:1.65}.container{max-width:1200px;margin:0 auto;padding-inline:var(--page-padding)}.site-header{background:#fff;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:50}.header-inner{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}img{max-width:100%;height:auto;display:block}a{color:inherit;text-decoration:none}.mobile-menu{position:fixed;top:0;right:0;bottom:0;transform:translateX(100%);visibility:hidden}.menu-backdrop{opacity:0;pointer-events:none}`;

/* ---------- layout ---------- */
let CURRENT_PATH = ''; // path ของหน้าที่กำลัง build — ใช้ทำ active state ในเมนู
function head(opt) {
  // opt: {title, description, canonicalPath, ogImage, ldBlocks[], depth}
  CURRENT_PATH = opt.canonicalPath;
  const canonical = DOMAIN + opt.canonicalPath;
  const og = opt.ogImage || '/img/AIS-5G-Unlimited.webp';
  // path แบบ relative ตามความลึกของหน้า เพื่อให้เปิดแบบ file:// ได้ด้วย
  const rel = '../'.repeat(Math.max(0, opt.canonicalPath.split('/').length - 2));
  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(opt.title)}</title>
<meta name="description" content="${esc(opt.description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="th" href="${canonical}">
<link rel="alternate" hreflang="x-default" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:locale" content="th_TH">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(opt.title)}">
<meta property="og:description" content="${esc(opt.description)}">
<meta property="og:image" content="${DOMAIN}${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(opt.title)}">
<meta name="twitter:description" content="${esc(opt.description)}">
<meta name="twitter:image" content="${DOMAIN}${og}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📶</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${CRITICAL}</style>
<link rel="stylesheet" href="${rel}css/style.css">
${(opt.ldBlocks || []).map(b => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n')}
</head>
<body>`;
}

const NAV = [
  { label: 'หน้าแรก', href: '/' },
  {
    label: 'โปรเน็ต AIS', href: '/ais.html', children: [
      { label: 'รวมโปรเน็ต AIS', href: '/ais.html' },
      { label: 'โปรเน็ต AIS รายวัน', href: '/ais/1daypack.html' },
      { label: 'โปรเน็ต AIS 2 วัน', href: '/ais/2daypack.html' },
      { label: 'โปรเน็ต AIS 3 วัน', href: '/ais/3daypack.html' },
      { label: 'โปรเน็ต AIS 7 วัน', href: '/ais/7daypack.html' },
      { label: 'โปรเน็ต AIS รายเดือน', href: '/ais/30daypack.html' },
    ]
  },
  {
    label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html', children: [
      { label: 'รวมโปรทรูดีแทค', href: '/true-dtac.html' },
      { label: 'เฉพาะดีแทค (dtac)', href: '/dtac.html' },
      { label: 'เฉพาะทรู (TrueMove H)', href: '/true.html' },
      { label: 'โปรทรูดีแทค 7 วัน', href: '/true-dtac/7daypack.html' },
      { label: 'โปรทรูดีแทค 30 วัน', href: '/true-dtac/30daypack.html' },
    ]
  },
  {
    label: 'เลือกโปร', href: '/budget/under-30.html', children: [
      { label: 'ไม่เกิน 30 บาท', href: '/budget/under-30.html' },
      { label: '30–50 บาท', href: '/budget/30-50.html' },
      { label: '50–100 บาท', href: '/budget/50-100.html' },
      { label: '100–200 บาท', href: '/budget/100-200.html' },
      { label: '200–500 บาท', href: '/budget/200-500.html' },
      { label: '500 บาทขึ้นไป', href: '/budget/over-500.html' },
      { label: 'โปรเน็ต 512 Kbps', href: '/speed/512kbps.html' },
      { label: 'โปรเน็ต 1 Mbps', href: '/speed/1mbps.html' },
      { label: 'โปรเน็ต 2 Mbps', href: '/speed/2mbps.html' },
      { label: 'โปรเน็ต 4 Mbps', href: '/speed/4mbps.html' },
      { label: 'โปรเน็ต 6 Mbps', href: '/speed/6mbps.html' },
      { label: 'โปรเน็ต 10 Mbps', href: '/speed/10mbps.html' },
    ]
  },
  { label: 'เช็คเบอร์/เน็ต', href: '/check-number-balance.html' },
  { label: 'ติดต่อเรา', href: '/about.html', mobileOnly: false, hideDesktop: true },
  {
    label: 'บทความ', href: '/articles/index.html', children: [
      { label: 'บทความทั้งหมด', href: '/articles/index.html' },
      { label: 'วิธีสมัครโปรเน็ต & เบอร์โทรด่วน', href: '/articles/how-to-register.html' },
      { label: 'FAQ โปรเน็ต AIS', href: '/articles/faq-ais.html' },
      { label: 'มือถือที่รองรับ 5G', href: '/articles/5g-phones.html' },
      { label: 'เลือกซิมเติมเงินให้คุ้ม', href: '/articles/sim-cards.html' },
      { label: 'ความเร็วเน็ต & FUP คืออะไร', href: '/articles/net-speed-explained.html' },
      { label: 'เบอร์มงคลเสริมดวง', href: '/articles/ber-mongkol.html' },
    ]
  },
  { label: 'FAQ', href: '/faq.html' },
];

function header() {
  const cur = h => (h === CURRENT_PATH ? ' aria-current="page"' : '');
  const desktop = NAV.filter(i => !i.hideDesktop).map(item => {
    if (item.children) {
      return `<li class="has-drop"><a class="nav-link" href="${item.href}"${cur(item.href)}>${item.label}</a><ul class="drop">${item.children.map(c => `<li><a href="${c.href}"${cur(c.href)}>${c.label}</a></li>`).join('')}</ul></li>`;
    }
    return `<li><a class="nav-link" href="${item.href}"${cur(item.href)}>${item.label}</a></li>`;
  }).join('');
  // เมนูมือถือ: จัดกลุ่มชัดเจน + จุดสีค่าย + active state
  const group = (label, dotCls, children, subCls) =>
    `<li class="group-label">${dotCls ? `<span class="dot ${dotCls}" aria-hidden="true"></span>` : ''}${label}</li>` +
    `<li class="sub${subCls ? ' ' + subCls : ''}"><ul>${children.map(c => `<li><a href="${c.href}"${cur(c.href)}>${c.label}</a></li>`).join('')}</ul></li>`;
  const navBy = label => NAV.find(i => i.label === label);
  const mobile = [
    `<li><a href="/"${cur('/')}>หน้าแรก</a></li>`,
    group('โปรเน็ต AIS', 'dot-ais', navBy('โปรเน็ต AIS').children, 'sub-ais'),
    group('โปรเน็ตทรู/ดีแทค', 'dot-tmh', navBy('โปรเน็ตทรูดีแทค').children, 'sub-tmh'),
    `<li><a href="/compare-networks.html"${cur('/compare-networks.html')}>เปรียบเทียบทุกค่าย</a></li>`,
    group('เลือกโปรตามงบ / ความเร็ว', null, navBy('เลือกโปร').children, null),
    `<li><a href="/faq.html"${cur('/faq.html')}>คำถามที่พบบ่อย (FAQ)</a></li>`,
    `<li><a href="/check-number-balance.html"${cur('/check-number-balance.html')}>วิธีเช็คเบอร์/เช็คเน็ต</a></li>`,
    group('บทความ', null, navBy('บทความ').children, null),
    `<li><a href="/about.html"${cur('/about.html')}>ติดต่อเรา / เกี่ยวกับเรา</a></li>`,
  ].join('');
  return `<header class="site-header">
<div class="container header-inner">
  <a class="brand" href="/" aria-label="${SITE_NAME} หน้าแรก">${I.leaf}<span class="brand-text"><span class="brand-name"><span class="b1">โปรเน็ต</span><span class="b2">เสริม</span></span><span class="brand-sub">.COM</span></span></a>
  <nav class="main-nav" aria-label="เมนูหลัก"><ul>${desktop}</ul></nav>
  <a class="nav-cta" href="/compare-networks.html">เปรียบเทียบโปร</a>
  <button class="menu-btn" aria-label="เปิดเมนู" aria-expanded="false" aria-controls="mobile-menu"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#1f2937" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
</div>
<div class="menu-backdrop"></div>
<nav class="mobile-menu" id="mobile-menu" aria-label="เมนูมือถือ">
<div class="mm-head"><span class="mm-title">เมนู</span><button type="button" class="menu-close" aria-label="ปิดเมนู"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
<ul>${mobile}</ul>
</nav>
</header>`;
}

function breadcrumb(items) {
  // items: [{label, href}] last = current
  const lis = items.map((it, i) => i === items.length - 1
    ? `<li><span aria-current="page">${esc(it.label)}</span></li>`
    : `<li><a href="${it.href}">${esc(it.label)}</a></li>`).join('');
  return `<nav class="breadcrumb container" aria-label="Breadcrumb"><ol>${lis}</ol></nav>`;
}
function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.label,
      ...(i < items.length - 1 ? { item: DOMAIN + it.href } : {})
    }))
  };
}

function footer() {
  return `<footer class="site-footer">
<div class="container footer-grid">
  <div class="footer-brand">
    <span class="brand-name"><span class="b1">โปรเน็ต</span><span class="b2">เสริม</span></span><span class="brand-sub">.COM</span>
    <p>รวมโปรเน็ตเสริมยอดฮิตทุกค่าย ทั้ง AIS และทรูดีแทค อัปเดตล่าสุด เลือกง่าย เปรียบเทียบได้ ครบจบในที่เดียว</p>
  </div>
  <div><h3>โปรเน็ต AIS</h3><ul>
    <li><a href="/ais.html">รวมโปรเน็ต AIS</a></li>
    <li><a href="/ais/1daypack.html">โปรเน็ต AIS รายวัน</a></li>
    <li><a href="/ais/2daypack.html">โปรเน็ต AIS 2 วัน</a></li>
    <li><a href="/ais/3daypack.html">โปรเน็ต AIS 3 วัน</a></li>
    <li><a href="/ais/7daypack.html">โปรเน็ต AIS 7 วัน</a></li>
    <li><a href="/ais/30daypack.html">โปรเน็ต AIS รายเดือน</a></li>
  </ul></div>
  <div><h3>ทรูดีแทค & เครื่องมือ</h3><ul>
    <li><a href="/true-dtac.html">รวมโปรทรูดีแทค</a></li>
    <li><a href="/true-dtac/7daypack.html">โปรทรูดีแทค 7 วัน</a></li>
    <li><a href="/true-dtac/30daypack.html">โปรทรูดีแทค 30 วัน</a></li>
    <li><a href="/dtac.html">เฉพาะดีแทค</a></li>
    <li><a href="/true.html">เฉพาะทรู</a></li>
    <li><a href="/compare-networks.html">เปรียบเทียบโปรทุกค่าย</a></li>
    <li><a href="/budget/under-30.html">เลือกโปรตามงบ</a></li>
    <li><a href="/speed/4mbps.html">เลือกโปรตามความเร็ว</a></li>
    <li><a href="/check-number-balance.html">เช็คเบอร์/เช็คเน็ตคงเหลือ</a></li>
    <li><a href="/faq.html">คำถามที่พบบ่อย (FAQ)</a></li>
    <li><a href="/about.html">เกี่ยวกับเรา / ติดต่อเรา</a></li>
  </ul></div>
  <div><h3>บทความ</h3><ul>
    <li><a href="/articles/index.html">บทความทั้งหมด</a></li>
    <li><a href="/articles/how-to-register.html">วิธีสมัครโปรเน็ต</a></li>
    <li><a href="/articles/faq-ais.html">FAQ โปรเน็ต AIS</a></li>
    <li><a href="/articles/5g-phones.html">มือถือที่รองรับ 5G</a></li>
    <li><a href="/articles/sim-cards.html">เลือกซิมเติมเงิน</a></li>
    <li><a href="/articles/net-speed-explained.html">ความเร็วเน็ต & FUP</a></li>
    <li><a href="/articles/ber-mongkol.html">เบอร์มงคลเสริมดวง</a></li>
  </ul></div>
</div>
<div class="footer-bottom container">© ${YEAR} ${SITE_NAME} | All Rights Reserved</div>
</footer>
<script src="/js/main.js" defer></script>
</body>
</html>`;
}

/* ---------- package table ---------- */
function pkgRow(c, opts) {
  const cat = catOf(c);
  const rawName = displayName(c, opts.useH3);
  // ชื่อที่ลงท้าย "ขายดี" → แสดงเป็นป้ายทอง-ส้มแยก (ไม่ใช้แดงกันสับสนกับสีค่ายทรู)
  const hot = /\s*ขายดี\s*$/.test(rawName);
  const name = hot ? rawName.replace(/\s*ขายดี\s*$/, '') : rawName;
  const codeEsc = esc(c.code);
  return `<tr class="cat-${cat}" data-cat="${opts.catKey ? opts.catKey(c) : durKey(c.durationRaw)}">
<td class="td-pkg-cell"><div class="td-pkg">
  <span class="badge-tile" aria-hidden="true">${I.wifi}<span class="tag">${badgeLabel(c)}</span></span>
  <div class="pkg-name">${esc(name)}${hot ? '<span class="badge-hot">ขายดี</span>' : ''}</div>
  ${proNotes[c.code] ? `<a class="pkg-detail-link" href="/pro/${proNotes[c.code].slug}.html">รายละเอียดโปรนี้ →</a>` : ''}
</div></td>
<td class="td-specs">${specsList(c)}</td>
<td class="td-price desktop-only"><span class="price-val">${esc(c.price)}<span class="baht">บาท</span></span>${c.taxIncluded ? '<span class="price-tax">ราคารวมภาษีแล้ว</span>' : ''}</td>
<td class="td-cta">
  <span class="m-price"><span class="price-val">${esc(c.price)}<span class="baht">บาท</span></span></span>
  <span class="ussd-pill">กด ${codeEsc}<button type="button" class="copy-btn" data-code="${codeEsc}" aria-label="คัดลอกรหัส ${codeEsc}">${I.copy}</button></span>
  <a class="btn-apply" href="${telHref(c.code)}">สมัครเลย<span class="cta-code">กด ${codeEsc}</span></a>
</td>
</tr>`;
}

function pkgTable(cards, opts = {}) {
  const id = opts.id || 'pkg-table';
  return `<div class="table-wrap"><table class="pkg-table" id="${id}">
<thead><tr><th scope="col">แพ็กเกจ</th><th scope="col">รายละเอียด</th><th scope="col" class="desktop-only">ราคา</th><th scope="col" class="th-cta">สมัคร</th></tr></thead>
<tbody>
${cards.map(c => pkgRow(c, opts)).join('\n')}
</tbody></table></div>`;
}

function trustBox() {
  return `<div class="trust-box">
  <div class="t-main">${I.shield ? '' : ''}มั่นใจ ปลอดภัย 100%<small>รหัสสมัครส่งตรงถึงเครือข่าย กดจากมือถือแล้วโทรออกได้ทันที ได้รับสิทธิ์ตรงแน่นอน</small></div>
  <ul><li>รวมโปรจากเครือข่ายโดยตรง</li><li>สมัครง่าย ไม่มีขั้นตอนซับซ้อน</li></ul>
</div>`;
}

/* ---------- FAQ ---------- */
function faqSection(faqList, opts = {}) {
  if (!faqList || !faqList.length) return '';
  const items = faqList.map(f => `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a"><p>${f.aHtml || esc(f.a)}</p></div></details>`).join('\n');
  return `<section class="section" id="faq">
<div class="container faq-wrap">
  <div class="section-head-center"><h2>${esc(opts.title || 'คำถามที่พบบ่อย')}</h2></div>
  ${items}
</div></section>`;
}
function faqLd(faqList) {
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

/* ---------- Product JSON-LD ---------- */
function productLd(cards, pagePath) {
  const seen = new Set();
  return cards.filter(c => { if (seen.has(c.code)) return false; seen.add(c.code); return true; }).map(c => {
    const sp = speedOf(c);
    return {
      '@context': 'https://schema.org', '@type': 'Product',
      name: `โปรเน็ต ${carrierName[c.carrier]} ${sp ? sp.val + ' ' + sp.unit : ''} ${c.durationRaw}`.replace(/\s+/g, ' ').trim(),
      description: c.features.join(' '),
      brand: { '@type': 'Brand', name: carrierName[c.carrier] },
      offers: {
        '@type': 'Offer', price: priceNum(c.price), priceCurrency: 'THB',
        url: DOMAIN + pagePath, availability: 'https://schema.org/InStock'
      }
    };
  });
}
const orgLd = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: SITE_NAME, url: DOMAIN + '/',
  logo: DOMAIN + '/img/AIS-5G-Unlimited.webp',
  description: 'เว็บรวมโปรเน็ตเสริมมือถือทุกค่าย AIS ทรู ดีแทค อัปเดตล่าสุด พร้อมรหัสสมัครกดได้ทันที'
};
const siteLd = {
  '@context': 'https://schema.org', '@type': 'WebSite',
  name: SITE_NAME, url: DOMAIN + '/', inLanguage: 'th'
};

/* ---------- shared blocks ---------- */
function howToSteps() {
  return `<section class="section"><div class="container">
<div class="section-head-center"><h2>วิธีสมัครโปรเน็ตใน 4 ขั้นตอน</h2><p>สมัครโปรเน็ตเสริมสำหรับซิมเติมเงินได้ด้วยตัวเอง — <a href="/articles/how-to-register.html">อ่านคู่มือฉบับเต็ม</a></p></div>
<div class="why-grid">
  <div class="why-card"><div class="why-icon">${I.search}</div><h3>1. เช็คยอดเงิน</h3><p>เช็คยอดเงินคงเหลือให้มีเพียงพอสำหรับค่าโปร (ราคารวมภาษี)</p></div>
  <div class="why-card"><div class="why-icon">${I.sim}</div><h3>2. เติมเงินให้พอ</h3><p>หากเงินไม่พอ สามารถเติมเงินผ่านช่องทางต่างๆ ได้ทันที</p></div>
  <div class="why-card"><div class="why-icon">${I.phone}</div><h3>3. กดรหัสสมัคร</h3><p>กดปุ่ม "สมัครเลย" บนเว็บของเราเพื่อโทรออกตามรหัส USSD</p></div>
  <div class="why-card"><div class="why-icon">${I.doc}</div><h3>4. รอ SMS ยืนยัน</h3><p>รอรับข้อความยืนยันจากเครือข่าย ก็สามารถเริ่มใช้งานเน็ตได้เลย</p></div>
</div></div></section>`;
}

function relatedLinks(links, title = 'โปรเน็ตที่เกี่ยวข้อง') {
  return `<section class="section"><div class="container">
<div class="section-head-center"><h2>${esc(title)}</h2></div>
<ul class="chips" style="justify-content:center">${links.map(l => `<li><a class="chip" href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>
</div></section>`;
}

/* ---------- mobile stacked tables ---------- */
/* ตารางที่ไม่ใช่ pkg-table (เทียบ/บทความ/รหัสเช็ค): ใส่ class stack-table + data-label จากหัวตาราง
 * เพื่อให้ CSS แปลงเป็นแถวการ์ดบนมือถือได้โดยไม่ duplicate เนื้อหา */
function stackTables(html) {
  return html.replace(/<table([^>]*)>([\s\S]*?)<\/table>/g, (m, attrs, inner) => {
    if (/pkg-table/.test(attrs)) return m;
    const headRow = (inner.match(/<tr[^>]*>[\s\S]*?<\/tr>/) || [''])[0];
    const labels = [...headRow.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)]
      .map(x => x[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (!labels.length) return m;
    const newAttrs = /class="/.test(attrs)
      ? attrs.replace('class="', 'class="stack-table ')
      : ' class="stack-table"' + attrs;
    const inner2 = inner.replace(/<tr([^>]*)>([\s\S]*?)<\/tr>/g, (mr, trAttrs, cells) => {
      if (!/<td/.test(cells)) return mr; // แถวหัวตาราง
      let i = 0;
      const cells2 = cells.replace(/<(td|th)(\s[^>]*|)>/g, (mc, tag, a) => {
        const label = labels[i] || ''; i++;
        if (tag === 'th' || /data-label=/.test(a)) return mc;
        return `<td${a} data-label="${esc(label)}">`;
      });
      return `<tr${trAttrs}>${cells2}</tr>`;
    });
    return `<table${newAttrs}>${inner2}</table>`;
  });
}

/* ---------- relativize internal links ----------
 * เปลี่ยน href/src ที่ขึ้นต้นด้วย "/" เป็น relative path ตามความลึกของหน้า
 * เพื่อให้คลิกเมนู/ลิงก์ได้ทั้งแบบเปิดไฟล์ตรง (file://) และบน server
 * ยกเว้น 404.html (server เสิร์ฟจาก URL ไหนก็ได้ ต้องคง absolute) */
function relativizeLinks(html, rel) {
  const depth = rel.split('/').length - 1;
  const prefix = '../'.repeat(depth);
  return html.replace(/(href|src)="\/([^"]*)"/g, (m, attr, p) => {
    if (p.startsWith('/')) return m; // protocol-relative — ไม่แตะ
    const [pathPart, frag] = p.split('#');
    const target = pathPart === '' ? 'index.html' : pathPart;
    return `${attr}="${prefix}${target}${frag ? '#' + frag : ''}"`;
  });
}

/* ---------- write helper ---------- */
function write(rel, html) {
  if (rel.endsWith('.html')) html = stackTables(html);
  if (rel.endsWith('.html') && rel !== '404.html') html = relativizeLinks(html, rel);
  const p = path.join(__dirname, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html, 'utf8');
  console.log('✓', rel);
}

/* ======================================================================
 * PAGE: หน้าแรก
 * ==================================================================== */
(function buildHome() {
  const cards = packages['index.html'];
  const m = metaOld['index.html'];
  const minAis30 = '400';
  const minAisDay = '24';
  const minTd = '96';
  const bc = [{ label: 'หน้าแรก', href: '/' }];
  const ld = [orgLd, siteLd, breadcrumbLd(bc), ...productLd(cards, '/')];
  let html = head({ title: m.title, description: m.description, canonicalPath: '/', ogImage: '/img/AIS-5G-Unlimited.webp', ldBlocks: ld });
  html += header();
  html += `
<section class="hero"><div class="container hero-inner">
  <div>
    <h1>รวมโปรเน็ตเสริมทุกค่าย<span class="line2">คุ้ม ครบ จบในที่เดียว</span></h1>
    <p class="hero-sub">อัปเดตโปรเน็ตล่าสุดจาก <strong>AIS</strong> และ <strong>ทรูดีแทค</strong> ทั้งรายวัน รายสัปดาห์ รายเดือน<br><strong>เลือกง่าย เปรียบเทียบได้ทันที</strong> กดสมัครจากมือถือได้เลย</p>
    <a class="btn-hero" href="#popular">ดูโปรทั้งหมด ${I.ext}</a>
  </div>
  <div class="hero-art" aria-hidden="true">
    <span class="hero-ring"></span>
    <div class="hero-phone"><div class="screen"><span class="sig">📶</span>โปรเน็ต<br>ไม่ลดสปีด</div></div>
    <span class="float-chip c1">AIS</span>
    <span class="float-chip c2">TrueMove H</span>
    <span class="float-chip c3">dtac</span>
    <span class="float-chip c4">5G</span>
  </div>
</div></section>

<section class="quicklinks container" aria-label="เมนูลัด"><ul>
  <li><a href="/ais/1daypack.html"><span class="ql-icon">${I.clock}</span><span class="ql-title">โปรเน็ต AIS รายวัน</span><span class="ql-desc">เน็ตคุ้มๆ เริ่ม ${minAisDay} บาท</span></a></li>
  <li><a href="/ais/30daypack.html"><span class="ql-icon">${I.cal}</span><span class="ql-title">โปรเน็ต AIS รายเดือน</span><span class="ql-desc">แพ็กเกจรายเดือนสุดคุ้ม</span></a></li>
  <li><a href="/true-dtac.html"><span class="ql-icon">${I.wifi}</span><span class="ql-title">โปรเน็ตทรูดีแทค</span><span class="ql-desc">7 วัน และ 30 วัน</span></a></li>
  <li><a href="/compare-networks.html"><span class="ql-icon">${I.scale}</span><span class="ql-title">เปรียบเทียบทุกค่าย</span><span class="ql-desc">ตารางเทียบ AIS ทรู ดีแทค</span></a></li>
  <li><a href="/check-number-balance.html"><span class="ql-icon">${I.search}</span><span class="ql-title">เช็คเบอร์ / เช็คเน็ต</span><span class="ql-desc">รหัสกดเช็คทุกค่าย</span></a></li>
  <li><a href="/faq.html"><span class="ql-icon">${I.doc}</span><span class="ql-title">คำถามที่พบบ่อย</span><span class="ql-desc">รวมคำตอบเรื่องโปรเน็ต</span></a></li>
</ul></section>

<section class="section" id="popular"><div class="container">
<div class="pkg-card">
  <div class="pkg-card-head">
    <div><h2>โปรเน็ตยอดนิยม รวมทุกค่าย</h2><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH}</p></div>
    <ul class="chips" data-filter-group="#home-table">
      <li><button class="chip active" data-filter="all">ทั้งหมด</button></li>
      <li><button class="chip" data-filter="1d">รายวัน</button></li>
      <li><button class="chip" data-filter="7d">รายสัปดาห์</button></li>
      <li><button class="chip" data-filter="30d">รายเดือน</button></li>
    </ul>
  </div>
  ${pkgTable(cards, { id: 'home-table', useH3: true })}
  <div class="table-foot"><a class="btn-outline" href="/compare-networks.html">เปรียบเทียบโปรทุกค่าย ${I.ext}</a></div>
  ${trustBox()}
</div>
</div></section>

<section class="section"><div class="container">
<div class="section-head-center"><h2>ทำไมต้องเลือกโปรเน็ตกับเรา?</h2></div>
<div class="why-grid">
  <div class="why-card"><div class="why-icon">${I.clock}</div><h3>อัปเดตไวที่สุด</h3><p>อัปเดตโปรใหม่จากทุกค่ายอย่างสม่ำเสมอ ไม่พลาดโปรเด็ด</p></div>
  <div class="why-card"><div class="why-icon">${I.scale}</div><h3>เปรียบเทียบง่าย</h3><p>ตารางเปรียบเทียบชัดเจน เลือกโปรที่ใช่สำหรับคุณ</p></div>
  <div class="why-card"><div class="why-icon">${I.phone}</div><h3>สมัครสะดวก</h3><p>กดปุ่มสมัครจากมือถือ โทรออกตามรหัส USSD ได้ทันที ไม่ต้องรอ</p></div>
  <div class="why-card"><div class="why-icon">${I.shield}</div><h3>ปลอดภัย 100%</h3><p>รหัสสมัครส่งตรงถึงเครือข่าย เชื่อถือได้แน่นอน</p></div>
</div></div></section>

<section class="section"><div class="container">
<div class="section-head-center"><h2>โปรโมชั่นแนะนำ</h2></div>
<div class="promo-grid">
  <a class="promo-card promo-1" href="/ais/30daypack.html">
    <span class="p-kicker">แพ็กเกจรายเดือน AIS</span><span class="p-title">เน็ต 5G ไม่ลดสปีด</span>
    <span class="p-price">เริ่มต้นเพียง <strong>${minAis30}</strong> บาท/30 วัน</span>
    <span class="btn-promo">ดูรายละเอียด</span>
  </a>
  <a class="promo-card promo-2" href="/ais/1daypack.html">
    <span class="p-kicker">โปรเน็ต AIS รายวัน</span><span class="p-title">เน็ตไม่อั้น ไม่ลดสปีด</span>
    <span class="p-price">เพียง <strong>${minAisDay}</strong> บาท/วัน</span>
    <span class="btn-promo">ดูรายละเอียด</span>
  </a>
  <a class="promo-card promo-3" href="/true-dtac.html">
    <span class="p-kicker">โปรเน็ตทรูดีแทค</span><span class="p-title">เน็ตไม่จำกัดปริมาณ</span>
    <span class="p-price">เริ่มต้นเพียง <strong>${minTd}</strong> บาท/7 วัน</span>
    <span class="btn-promo">ดูรายละเอียด</span>
  </a>
</div></div></section>

<section class="section"><div class="container">
<div class="section-head-row"><h2>บทความน่าสนใจ</h2></div>
<div class="article-grid">
  <a class="article-card" href="/articles/how-to-register.html"><img src="/img/Simcard-AIS-True-Dtac.webp" alt="วิธีสมัครโปรเน็ตมือถือซิมเติมเงิน AIS ทรู ดีแทค" width="650" height="355" loading="lazy"><div class="a-body"><h3>วิธีสมัครโปรเน็ต & รวมเบอร์โทรด่วนทุกค่าย</h3><p class="a-sub">คู่มือซิมเติมเงิน</p></div></a>
  <a class="article-card" href="/articles/net-speed-explained.html"><img src="/img/Internet-speed-test.webp" alt="ความเร็วเน็ตมือถือ 1-10 Mbps ต่างกันแค่ไหน" width="650" height="355" loading="lazy"><div class="a-body"><h3>ความเร็วเน็ตคืออะไร? 1-10 Mbps ต่างกันแค่ไหน</h3><p class="a-sub">เข้าใจ FUP ก่อนเลือกโปร</p></div></a>
  <a class="article-card" href="/articles/5g-phones.html"><img src="/img/5G-Network.webp" alt="มือถือที่รองรับเน็ต 5G ในไทย" width="650" height="355" loading="lazy"><div class="a-body"><h3>ใช้เน็ต 5G ต้องเปลี่ยนมือถือไหม? เช็ครุ่นที่รองรับ</h3><p class="a-sub">คลื่น 5G ในไทยครบทุกค่าย</p></div></a>
  <a class="article-card" href="/articles/ber-mongkol.html"><img src="/img/lucky-number.webp" alt="เบอร์มงคลเสริมดวงตามวันเกิด" width="650" height="355" loading="lazy"><div class="a-body"><h3>เบอร์มงคล เลือกเบอร์เสริมดวงตามวันเกิด</h3><p class="a-sub">พร้อมเครื่องมือวิเคราะห์ผลรวมเบอร์</p></div></a>
</div></div></section>
`;
  html += footer();
  write('index.html', html);
})();

/* ======================================================================
 * PAGE: ais.html (hub)
 * ==================================================================== */
(function buildAisHub() {
  const cards = packages['ais.html'];
  const m = { ...metaOld['ais.html'], title: 'โปรเน็ต AIS ไม่ลดสปีด | รายวัน รายสัปดาห์ รายเดือน' };
  const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'โปรเน็ต AIS', href: '/ais.html' }];
  const faqs = faqsOld['ais.html'];
  // unique cards for sections (skip popular duplicates for data sections)
  const secOf = c => c.section || '';
  const popular = cards.filter(c => secOf(c) === 'popular');
  const byDur = { '1d': [], '2d': [], '3d': [], '7d': [], '30d': [] };
  const seen = new Set(popular.map(c => c.code));
  for (const c of cards) {
    if (secOf(c) === 'popular') continue;
    const k = durKey(c.durationRaw);
    if (byDur[k]) byDur[k].push(c);
  }
  // comparison table: cheapest per duration
  const cmpRows = [['1d', 'รายวัน (24 ชม.)', '/ais/1daypack.html'], ['2d', '2 วัน', '/ais/2daypack.html'], ['3d', '3 วัน', '/ais/3daypack.html'], ['7d', '7 วัน', '/ais/7daypack.html'], ['30d', 'รายเดือน (30 วัน)', '/ais/30daypack.html']]
    .map(([k, label, href]) => {
      const list = byDur[k];
      const min = Math.min(...list.map(c => priceNum(c.price)));
      const max = Math.max(...list.map(c => priceNum(c.price)));
      const speeds = [...new Set(list.map(c => { const s = speedOf(c); return s ? `${s.val} ${s.unit}` : ''; }).filter(Boolean))];
      return `<tr><th scope="row"><a href="${href}">${label}</a></th><td>${list.length} แพ็กเกจ</td><td>${speeds.join(', ')}</td><td class="win">${min}–${max.toLocaleString('en-US')} บาท</td></tr>`;
    }).join('\n');

  const ld = [breadcrumbLd(bc), ...productLd(cards, '/ais.html'), faqLd(faqs)];
  let html = head({ title: m.title, description: m.description, canonicalPath: '/ais.html', ogImage: '/img/AIS-5G.webp', ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<div class="container page-head"><h1>${esc(m.h1 || 'รวมโปรเน็ต AIS ไม่ลดสปีด')}</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · ซิมเติมเงิน AIS ทุกเบอร์</p></div>
${artBlock({ tone: 'ais', big: '5G', label: 'รวมโปรเน็ต AIS ทุกหมวด', motif: I.wifi, stat1: speedRangeOf(cards), stat2: `${new Set(cards.map(c => c.code)).size} โปร · เริ่ม ${minPriceOf(cards)} บาท` })}
<nav class="subnav" aria-label="หมวดโปร AIS"><div class="container"><ul>
  <li><a class="chip active" href="#popular">ยอดนิยม</a></li>
  <li><a class="chip" href="#daily">รายวัน</a></li>
  <li><a class="chip" href="#d2">2 วัน</a></li>
  <li><a class="chip" href="#d3">3 วัน</a></li>
  <li><a class="chip" href="#d7">7 วัน</a></li>
  <li><a class="chip" href="#monthly">รายเดือน</a></li>
</ul></div></nav>`;

  const section = (id, title, list, moreHref, moreLabel) => `
<section class="section" id="${id}"><div class="container"><div class="pkg-card">
  <div class="pkg-card-head"><div><h2>${title}</h2></div>${moreHref ? `<a class="see-all" href="${moreHref}">${moreLabel} →</a>` : ''}</div>
  ${pkgTable(list, { id: 'tbl-' + id })}
</div></div></section>`;

  html += section('popular', 'โปรเน็ต AIS ยอดนิยม', popular, null, null);
  html += section('daily', 'โปรเน็ต AIS รายวัน (24 ชั่วโมง)', byDur['1d'], '/ais/1daypack.html', 'ดูหน้ารายวันเต็มๆ');
  html += section('d2', 'โปรเน็ต AIS 2 วัน', byDur['2d'], '/ais/2daypack.html', 'ดูหน้า 2 วัน');
  html += section('d3', 'โปรเน็ต AIS 3 วัน', byDur['3d'], '/ais/3daypack.html', 'ดูหน้า 3 วัน');
  html += section('d7', 'โปรเน็ต AIS 7 วัน (รายสัปดาห์)', byDur['7d'], '/ais/7daypack.html', 'ดูหน้า 7 วัน');
  html += section('monthly', 'โปรเน็ต AIS รายเดือน (30 วัน)', byDur['30d'], '/ais/30daypack.html', 'ดูหน้ารายเดือน');

  html += `
<section class="section"><div class="container">
<div class="section-head-center"><h2>เปรียบเทียบโปรเน็ต AIS ตามระยะเวลา</h2><p>สรุปช่วงราคาและความเร็วของแต่ละหมวด</p></div>
<div class="table-wrap"><table class="cmp-table">
<thead><tr><th scope="col">ระยะเวลา</th><th scope="col">จำนวนโปร</th><th scope="col">ความเร็วที่มี</th><th scope="col">ช่วงราคา</th></tr></thead>
<tbody>${cmpRows}</tbody></table></div>
<p style="text-align:center;margin-top:14px;color:var(--muted);font-size:14px">อยากเทียบกับค่ายอื่น? ดู <a href="/compare-networks.html" style="color:var(--cat-blue);font-weight:600">ตารางเปรียบเทียบโปรเน็ตทุกค่าย</a></p>
</div></section>`;

  html += howToSteps();
  html += faqSection(faqs, { title: 'คำถามที่พบบ่อยเกี่ยวกับโปรเน็ต AIS' });
  html += relatedLinks([
    { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' },
    { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
    { label: 'เช็คโปรที่ใช้อยู่', href: '/check-number-balance.html' },
    { label: 'FAQ รวมทุกเรื่อง', href: '/faq.html' },
  ]);
  html += footer();
  write('ais.html', html);
})();

/* ======================================================================
 * PAGES: duration pages (AIS + true-dtac)
 * ==================================================================== */
const durationPages = [
  { file: 'ais/1daypack.html', h1fallback: 'โปรเน็ต AIS รายวัน', og: '/img/AIS-5G.webp', bcLabel: 'โปรเน็ต AIS รายวัน', parent: { label: 'โปรเน็ต AIS', href: '/ais.html' }, related: [{ label: 'โปร AIS 2 วัน', href: '/ais/2daypack.html' }, { label: 'โปร AIS 3 วัน', href: '/ais/3daypack.html' }, { label: 'โปร AIS 7 วัน', href: '/ais/7daypack.html' }, { label: 'โปร AIS รายเดือน', href: '/ais/30daypack.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  { file: 'ais/2daypack.html', h1fallback: 'โปรเน็ต AIS 2 วัน', og: '/img/AIS-5G.webp', bcLabel: 'โปรเน็ต AIS 2 วัน', parent: { label: 'โปรเน็ต AIS', href: '/ais.html' }, related: [{ label: 'โปร AIS รายวัน', href: '/ais/1daypack.html' }, { label: 'โปร AIS 3 วัน', href: '/ais/3daypack.html' }, { label: 'โปร AIS 7 วัน', href: '/ais/7daypack.html' }, { label: 'โปร AIS รายเดือน', href: '/ais/30daypack.html' }] },
  { file: 'ais/3daypack.html', h1fallback: 'โปรเน็ต AIS 3 วัน', og: '/img/AIS-5G.webp', bcLabel: 'โปรเน็ต AIS 3 วัน', parent: { label: 'โปรเน็ต AIS', href: '/ais.html' }, related: [{ label: 'โปร AIS รายวัน', href: '/ais/1daypack.html' }, { label: 'โปร AIS 2 วัน', href: '/ais/2daypack.html' }, { label: 'โปร AIS 7 วัน', href: '/ais/7daypack.html' }, { label: 'โปร AIS รายเดือน', href: '/ais/30daypack.html' }] },
  { file: 'ais/7daypack.html', h1fallback: 'โปรเน็ต AIS 7 วัน', og: '/img/AIS-5G.webp', bcLabel: 'โปรเน็ต AIS 7 วัน', parent: { label: 'โปรเน็ต AIS', href: '/ais.html' }, related: [{ label: 'โปร AIS รายวัน', href: '/ais/1daypack.html' }, { label: 'โปร AIS รายเดือน', href: '/ais/30daypack.html' }, { label: 'โปรทรูดีแทค 7 วัน', href: '/true-dtac/7daypack.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  { file: 'ais/30daypack.html', h1fallback: 'โปรเน็ต AIS รายเดือน', og: '/img/AIS-5G-Unlimited.webp', bcLabel: 'โปรเน็ต AIS รายเดือน', parent: { label: 'โปรเน็ต AIS', href: '/ais.html' }, related: [{ label: 'โปร AIS 7 วัน', href: '/ais/7daypack.html' }, { label: 'โปรทรูดีแทค 30 วัน', href: '/true-dtac/30daypack.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  { file: 'true-dtac/7daypack.html', h1fallback: 'โปรเน็ตทรูดีแทค 7 วัน', og: '/img/true-dtac-unlimited.webp', bcLabel: 'โปรทรูดีแทค 7 วัน', parent: { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' }, related: [{ label: 'โปรทรูดีแทค 30 วัน', href: '/true-dtac/30daypack.html' }, { label: 'โปร AIS 7 วัน', href: '/ais/7daypack.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  { file: 'true-dtac/30daypack.html', h1fallback: 'โปรเน็ตทรูดีแทค 30 วัน', og: '/img/true-dtac-unlimited.webp', bcLabel: 'โปรทรูดีแทค 30 วัน', parent: { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' }, related: [{ label: 'โปรทรูดีแทค 7 วัน', href: '/true-dtac/7daypack.html' }, { label: 'โปร AIS รายเดือน', href: '/ais/30daypack.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
];
for (const dp of durationPages) {
  const cards = packages[dp.file];
  const m = metaOld[dp.file];
  const urlPath = '/' + dp.file;
  const bc = [{ label: 'หน้าแรก', href: '/' }, dp.parent, { label: dp.bcLabel, href: urlPath }];
  const faqs = faqsOld[dp.file] || [];
  const ld = [breadcrumbLd(bc), ...productLd(cards, urlPath)];
  if (faqs.length) ld.push(faqLd(faqs));
  let html = head({ title: m.title, description: m.description, canonicalPath: urlPath, ogImage: dp.og, ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<div class="container page-head"><h1>${esc(m.h1 || dp.h1fallback)}</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · ราคารวมภาษีแล้ว สมัครได้ทันที</p></div>
${artBlock({
    tone: dp.file.startsWith('ais') ? 'ais' : 'tmh', big: '5G', label: dp.bcLabel,
    motif: { 'ais/1daypack.html': I.clock, 'ais/2daypack.html': I.cal, 'ais/3daypack.html': SPEC_ICONS.data, 'ais/7daypack.html': SPEC_ICONS.speed, 'ais/30daypack.html': SPEC_ICONS.tax, 'true-dtac/7daypack.html': I.clock, 'true-dtac/30daypack.html': I.cal }[dp.file],
    stat1: speedRangeOf(cards), stat2: `${cards.length} โปร · เริ่ม ${minPriceOf(cards)} บาท`,
  })}
<section class="section mt-0" style="padding-top:8px"><div class="container"><div class="pkg-card">
${pkgTable(cards, { id: 'tbl-main' })}
${trustBox()}
</div></div></section>`;
  html += howToSteps();
  html += faqSection(faqs, { title: 'คำถามที่พบบ่อย' });
  html += relatedLinks(dp.related);
  html += footer();
  write(dp.file, html);
}

/* ======================================================================
 * PAGE: true-dtac.html (hub)
 * ==================================================================== */
(function buildTdHub() {
  const cards = packages['true-dtac.html'];
  const m = metaOld['true-dtac.html'];
  const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' }];
  const d7 = cards.filter(c => durKey(c.durationRaw) === '7d');
  const d30 = cards.filter(c => durKey(c.durationRaw) === '30d');
  // FAQ: รวมจากหน้า 7 วัน + 30 วัน (เว็บเดิม hub ไม่มี FAQ)
  const seenQ = new Set();
  const faqs = [...(faqsOld['true-dtac/7daypack.html'] || []), ...(faqsOld['true-dtac/30daypack.html'] || [])].filter(f => { if (seenQ.has(f.q)) return false; seenQ.add(f.q); return true; });
  const cmpRows = [['7 วัน', d7, '/true-dtac/7daypack.html'], ['30 วัน', d30, '/true-dtac/30daypack.html']].map(([label, list, href]) => {
    const min = Math.min(...list.map(c => priceNum(c.price)));
    const max = Math.max(...list.map(c => priceNum(c.price)));
    const speeds = [...new Set(list.map(c => { const s = speedOf(c); return s ? `${s.val} ${s.unit}` : ''; }).filter(Boolean))];
    return `<tr><th scope="row"><a href="${href}">${label}</a></th><td>${list.length} แพ็กเกจ</td><td>${speeds.join(', ')}</td><td class="win">${min}–${max} บาท</td></tr>`;
  }).join('\n');
  const ld = [breadcrumbLd(bc), ...productLd(cards, '/true-dtac.html'), faqLd(faqs)];
  let html = head({ title: m.title, description: m.description, canonicalPath: '/true-dtac.html', ogImage: '/img/true-dtac-unlimited.webp', ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<div class="container page-head"><h1>${esc(m.h1 || 'รวมโปรเน็ตทรูดีแทค ไม่ลดสปีด')}</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · สำหรับซิมเติมเงินทรูดีแทค</p></div>
${artBlock({ tone: 'tmh', big: '5G', label: 'รวมโปรทรูดีแทค 7 วัน & 30 วัน', motif: I.wifi, stat1: speedRangeOf(cards), stat2: `${cards.length} โปร · เริ่ม ${minPriceOf(cards)} บาท` })}
<nav class="subnav" aria-label="หมวดโปรทรูดีแทค"><div class="container"><ul>
  <li><a class="chip active" href="#pack-7day">โปร 7 วัน</a></li>
  <li><a class="chip" href="#pack-30day">โปร 30 วัน</a></li>
  <li><a class="chip" href="#faq">คำถามที่พบบ่อย</a></li>
</ul></div></nav>
<section class="section" id="pack-7day"><div class="container"><div class="pkg-card">
  <div class="pkg-card-head"><div><h2>เน็ตทรูดีแทค 7 วัน</h2></div><a class="see-all" href="/true-dtac/7daypack.html">ดูหน้า 7 วัน →</a></div>
  ${pkgTable(d7, { id: 'tbl-7d' })}
</div></div></section>
<section class="section" id="pack-30day"><div class="container"><div class="pkg-card">
  <div class="pkg-card-head"><div><h2>เน็ตทรูดีแทค 30 วัน</h2></div><a class="see-all" href="/true-dtac/30daypack.html">ดูหน้า 30 วัน →</a></div>
  ${pkgTable(d30, { id: 'tbl-30d' })}
</div></div></section>
<section class="section"><div class="container">
<div class="section-head-center"><h2>เปรียบเทียบโปรเน็ตทรูดีแทคตามระยะเวลา</h2></div>
<div class="table-wrap"><table class="cmp-table">
<thead><tr><th scope="col">ระยะเวลา</th><th scope="col">จำนวนโปร</th><th scope="col">ความเร็วที่มี</th><th scope="col">ช่วงราคา</th></tr></thead>
<tbody>${cmpRows}</tbody></table></div>
<p style="text-align:center;margin-top:14px;color:var(--muted);font-size:14px">เทียบกับ AIS ได้ที่ <a href="/compare-networks.html" style="color:var(--cat-blue);font-weight:600">ตารางเปรียบเทียบโปรเน็ตทุกค่าย</a></p>
</div></section>`;
  html += howToSteps();
  html += faqSection(faqs, { title: 'คำถามที่พบบ่อยเกี่ยวกับโปรเน็ตทรูดีแทค' });
  html += relatedLinks([
    { label: 'โปรเน็ต AIS', href: '/ais.html' },
    { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
    { label: 'เช็คโปรที่ใช้อยู่', href: '/check-number-balance.html' },
  ]);
  html += footer();
  write('true-dtac.html', html);
})();

/* ======================================================================
 * PAGE ใหม่: compare-networks.html
 * ==================================================================== */
(function buildCompare() {
  // dedupe ทุกแพ็กเกจทั้งเว็บด้วยรหัส
  const all = [];
  const seen = new Set();
  for (const cards of Object.values(packages)) {
    for (const c of cards) { if (!seen.has(c.code)) { seen.add(c.code); all.push(c); } }
  }
  const by = (carrier, dk) => all.filter(c => c.carrier === carrier && durKey(c.durationRaw) === dk);
  const cell = (list, href) => {
    if (!list.length) return '<td>-</td>';
    const min = list.reduce((a, b) => priceNum(a.price) <= priceNum(b.price) ? a : b);
    const sp = speedOf(min);
    return `<td><a href="${href}"><span class="win">เริ่ม ${esc(min.price)} บาท</span><br><small>${sp ? sp.val + ' ' + sp.unit : ''} (${list.length} โปร)</small></a></td>`;
  };
  const rows = [
    ['รายวัน (24 ชม.)', '1d', '/ais/1daypack.html', '/', '/'],
    ['2 วัน', '2d', '/ais/2daypack.html', null, null],
    ['3 วัน', '3d', '/ais/3daypack.html', null, null],
    ['7 วัน', '7d', '/ais/7daypack.html', '/', '/true-dtac/7daypack.html'],
    ['30 วัน (รายเดือน)', '30d', '/ais/30daypack.html', '/', '/true-dtac/30daypack.html'],
  ].map(([label, dk, aHref, tHref, dHref]) => {
    const a = by('ais', dk), t = by('true', dk), d = by('dtac', dk);
    return `<tr><th scope="row">${label}</th>${cell(a, aHref)}${cell(t, tHref || '/')}${cell(d, dHref || (d.length ? '/true-dtac.html' : '/'))}</tr>`;
  }).join('\n');

  const totalPkgs = all.length;
  const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'เปรียบเทียบโปรเน็ตทุกค่าย', href: '/compare-networks.html' }];
  const faqs = [
    { q: 'ควรเลือกโปรเน็ตค่ายไหนดี?', a: 'ขึ้นอยู่กับซิมที่ใช้อยู่ โปรเสริมสมัครได้เฉพาะเบอร์ในเครือข่ายเดียวกัน หากใช้ AIS ดูหมวดโปรเน็ต AIS หากใช้ทรูหรือดีแทคดูหมวดโปรเน็ตทรูดีแทค แล้วเลือกความเร็วและระยะเวลาที่ตรงกับการใช้งาน' },
    { q: 'โปรเน็ตรายวันกับรายเดือนต่างกันอย่างไร?', a: 'โปรรายวันเหมาะกับการใช้งานช่วงสั้นๆ ราคาเริ่มต้นถูกกว่า ส่วนโปรรายเดือนคิดเฉลี่ยต่อวันแล้วคุ้มกว่าหากใช้เน็ตต่อเนื่องทั้งเดือน ดูตารางเปรียบเทียบด้านบนประกอบการตัดสินใจได้' },
    { q: 'สมัครแล้วใช้ได้ทันทีไหม?', a: 'หลังกดรหัส USSD สมัครโปร ระบบจะส่ง SMS ยืนยันจากเครือข่าย เมื่อได้รับข้อความยืนยันแล้วก็เริ่มใช้งานเน็ตได้ทันที' },
  ];
  // JSON-LD: ItemList ของแพ็กเกจทั้งหมดที่เทียบ + Table อธิบายตารางเทียบ
  const itemListLd = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'เปรียบเทียบโปรเน็ต AIS ทรู ดีแทค',
    numberOfItems: all.length,
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem', position: i + 1,
      name: `โปรเน็ต ${carrierName[c.carrier]} ${c.durationRaw} ${c.price} บาท`,
      url: DOMAIN + (c.carrier === 'ais' ? '/ais.html' : '/true-dtac.html'),
    })),
  };
  const tableLd = {
    '@context': 'https://schema.org', '@type': 'Table',
    about: 'ตารางเปรียบเทียบราคาเริ่มต้นโปรเน็ตมือถือ AIS ทรูมูฟ เอช และดีแทค แยกตามระยะเวลา รายวัน 2 วัน 3 วัน 7 วัน และ 30 วัน',
  };
  const ld = [breadcrumbLd(bc), faqLd(faqs), itemListLd, tableLd];
  const title = 'เปรียบเทียบโปรเน็ต AIS ทรู ดีแทค | ตารางเทียบทุกค่าย';
  const desc = `ตารางเปรียบเทียบโปรเน็ตมือถือ AIS ทรู ดีแทค ${totalPkgs} แพ็กเกจ ทั้งรายวัน 7 วัน รายเดือน เทียบราคา ความเร็ว พร้อมรหัสสมัคร อัปเดตล่าสุด`;
  let html = head({ title, description: desc, canonicalPath: '/compare-networks.html', ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<div class="container page-head"><h1>เปรียบเทียบโปรเน็ตทุกค่าย AIS vs ทรู vs ดีแทค</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · รวม ${totalPkgs} แพ็กเกจจริงจากทุกหน้าในเว็บ</p></div>
${artBlock({ tone: 'mix', big: 'VS', label: 'เปรียบเทียบโปรทุกค่าย', motif: I.scale, stat1: `${totalPkgs} แพ็กเกจ · ${speedRangeOf(all)}`, stat2: 'AIS · ทรูมูฟ เอช · ดีแทค' })}
<section class="section mt-0" style="padding-top:8px"><div class="container">
<div class="pkg-card">
<div class="pkg-card-head"><div><h2>ตารางเปรียบเทียบราคาเริ่มต้นตามระยะเวลา</h2><p class="pkg-updated">คลิกที่ช่องเพื่อดูโปรทั้งหมดของค่ายนั้น</p></div></div>
<div class="table-wrap"><table class="cmp-table">
<thead><tr><th scope="col">ระยะเวลา</th><th scope="col"><span class="dot dot-ais" aria-hidden="true"></span>AIS</th><th scope="col"><span class="dot dot-tmh" aria-hidden="true"></span>ทรู (TrueMove H)</th><th scope="col"><span class="dot dot-tmh" aria-hidden="true"></span>ดีแทค / ทรูดีแทค</th></tr></thead>
<tbody>${rows}</tbody></table></div>
<p style="margin-top:14px;color:var(--muted);font-size:13.5px">หมายเหตุ: โปรในหมวด "ทรูดีแทค" ของเว็บเราใช้รหัสสมัครระบบดีแทค (*104*) ตามเว็บเดิม ราคาที่แสดงเป็นราคาเริ่มต้นของแต่ละช่วงเวลา ดูรายละเอียดครบทุกโปรได้ในหน้าแต่ละหมวด</p>
</div>
</div></section>
<section class="section"><div class="container">
<div class="section-head-center"><h2>เลือกดูโปรตามค่าย</h2></div>
<div class="promo-grid">
  <a class="promo-card promo-1" href="/ais.html"><span class="p-kicker">ซิมเติมเงิน AIS</span><span class="p-title">โปรเน็ต AIS ทั้งหมด</span><span class="p-sub">รายวัน · 2 วัน · 3 วัน · 7 วัน · รายเดือน</span><span class="btn-promo">ดูโปร AIS</span></a>
  <a class="promo-card promo-3" href="/true-dtac.html"><span class="p-kicker">ซิมทรู-ดีแทค</span><span class="p-title">โปรเน็ตทรูดีแทค</span><span class="p-sub">7 วัน · 30 วัน ไม่จำกัดปริมาณ</span><span class="btn-promo">ดูโปรทรูดีแทค</span></a>
  <a class="promo-card promo-2" href="/check-number-balance.html"><span class="p-kicker">ยังไม่รู้ว่าใช้ค่ายไหน?</span><span class="p-title">เช็คเบอร์ / เช็คโปรที่ใช้อยู่</span><span class="p-sub">รหัสกดเช็คของทุกค่าย ฟรี</span><span class="btn-promo">เช็คเลย</span></a>
</div></div></section>`;
  html += faqSection(faqs, { title: 'คำถามที่พบบ่อยเรื่องการเลือกค่าย' });
  html += footer();
  write('compare-networks.html', html);
})();

/* ======================================================================
 * PAGE ใหม่: faq.html
 * ==================================================================== */
(function buildFaq() {
  const seenQ = new Set();
  const pick = (src) => (faqsOld[src] || []).filter(f => { if (seenQ.has(f.q)) return false; seenQ.add(f.q); return true; });
  const gAis = [...pick('articles/faq-ais.html'), ...pick('ais.html'), ...pick('ais/1daypack.html'), ...pick('ais/2daypack.html'), ...pick('ais/3daypack.html'), ...pick('ais/7daypack.html'), ...pick('ais/30daypack.html')];
  const gTd = [...pick('true-dtac/7daypack.html'), ...pick('true-dtac/30daypack.html')];
  const gGen = [
    { q: 'สมัครโปรเน็ตจากเว็บนี้อย่างไร?', a: 'เลือกโปรที่ต้องการ แล้วกดปุ่ม "สมัครเลย" จากมือถือ ระบบจะโทรออกตามรหัส USSD ของโปรนั้นให้อัตโนมัติ จากนั้นรอ SMS ยืนยันจากเครือข่าย อ่านขั้นตอนละเอียดได้ที่บทความวิธีสมัครโปรเน็ต', aHtml: 'เลือกโปรที่ต้องการ แล้วกดปุ่ม "สมัครเลย" จากมือถือ ระบบจะโทรออกตามรหัส USSD ของโปรนั้นให้อัตโนมัติ จากนั้นรอ SMS ยืนยันจากเครือข่าย อ่านขั้นตอนละเอียดได้ที่ <a href="/articles/how-to-register.html">บทความวิธีสมัครโปรเน็ต</a>' },
    { q: 'จะรู้ได้อย่างไรว่าตอนนี้ใช้โปรอะไรอยู่?', a: 'กดรหัสเช็คของแต่ละค่ายได้ฟรี เช่น AIS กด *121*32# ทรูมูฟ เอช กด *900# ดีแทค กด *101*1# ดูรหัสเช็คครบทุกค่ายได้ที่หน้าเช็คเบอร์/เช็คเน็ตคงเหลือ', aHtml: 'กดรหัสเช็คของแต่ละค่ายได้ฟรี เช่น AIS กด <span class="dial-code">*121*32#</span> ทรูมูฟ เอช กด <span class="dial-code">*900#</span> ดีแทค กด <span class="dial-code">*101*1#</span> ดูรหัสเช็คครบทุกค่ายได้ที่ <a href="/check-number-balance.html">หน้าเช็คเบอร์/เช็คเน็ตคงเหลือ</a>' },
  ];
  const allFaqs = [...gGen, ...gAis, ...gTd];
  const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'คำถามที่พบบ่อย (FAQ)', href: '/faq.html' }];
  const ld = [breadcrumbLd(bc), faqLd(allFaqs)];
  const title = 'รวมคำถามที่พบบ่อย (FAQ) โปรเน็ต AIS ทรู ดีแทค';
  const desc = 'รวมทุกคำถามเรื่องโปรเน็ตเสริม วิธีสมัคร โปรไม่ลดสปีดคืออะไร เช็คโปรที่ใช้อยู่อย่างไร ครบทั้ง AIS และทรูดีแทค พร้อมคำตอบละเอียด';
  const block = (title2, list) => list.length ? `<div class="section-head-center" style="margin-top:26px"><h2>${title2}</h2></div>` + list.map(f => `<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a"><p>${f.aHtml || esc(f.a)}</p></div></details>`).join('\n') : '';
  let html = head({ title, description: desc, canonicalPath: '/faq.html', ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<div class="container page-head"><h1>คำถามที่พบบ่อย (FAQ) เรื่องโปรเน็ตเสริม</h1><p class="pkg-updated">รวมคำตอบทุกเรื่องที่ถามกันบ่อย อัปเดต ${UPDATED_TH}</p></div>
${artBlock({ tone: 'brand', big: 'Q&A', label: 'คำถามที่พบบ่อยเรื่องโปรเน็ต', motif: I.doc, stat1: `${allFaqs.length} คำถาม-คำตอบ`, stat2: 'ครบทั้ง AIS และทรูดีแทค' })}
<section class="section mt-0" style="padding-top:4px"><div class="container faq-wrap">
${block('การสมัครและใช้งานทั่วไป', gGen)}
${block('โปรเน็ต AIS', gAis)}
${block('โปรเน็ตทรูดีแทค', gTd)}
</div></section>`;
  html += relatedLinks([
    { label: 'โปรเน็ต AIS', href: '/ais.html' },
    { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' },
    { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
    { label: 'เช็คเบอร์/เช็คเน็ต', href: '/check-number-balance.html' },
  ], 'ดูโปรและเครื่องมืออื่นๆ');
  html += footer();
  write('faq.html', html);
})();

/* ======================================================================
 * PAGE ใหม่: check-number-balance.html
 * (รหัสทั้งหมดมาจากบทความ how-to-register ของเว็บเดิม — ห้ามเพิ่มเอง)
 * ==================================================================== */
(function buildCheck() {
  const codes = {
    ais: [
      { label: 'เช็คยอดเงิน/วันคงเหลือ', code: '*121#' },
      { label: 'เช็คเบอร์ตัวเอง', code: '*545#' },
      { label: 'เช็คโปรเน็ตปัจจุบัน', code: '*121*32#' },
      { label: 'ปิดสัญญาณเน็ต', code: '*129*1#' },
      { label: 'เปิดสัญญาณเน็ต', code: '*129*2#' },
      { label: 'Call Center', code: '1175', call: true },
    ],
    true: [
      { label: 'เช็คยอดเงิน/วันคงเหลือ', code: '#123#' },
      { label: 'เช็คเบอร์ตัวเอง', code: '*933#' },
      { label: 'เช็คโปรเน็ตปัจจุบัน', code: '*900#' },
      { label: 'เปิดสัญญาณเน็ต', code: '*902*01#' },
      { label: 'ปิดสัญญาณเน็ต', code: '*902*02#' },
      { label: 'Call Center', code: '1242', call: true },
    ],
    dtac: [
      { label: 'เช็คยอดเงิน/วันคงเหลือ', code: '*101#' },
      { label: 'เช็คโปรเน็ตปัจจุบัน', code: '*101*1#' },
      { label: 'Call Center', code: '1678', call: true },
    ],
  };
  const codeRow = c => `<tr><td style="text-align:left">${esc(c.label)}</td><td><span class="ussd-pill">${c.call ? 'โทร ' : 'กด '}${esc(c.code)}<button type="button" class="copy-btn" data-code="${esc(c.code)}" aria-label="คัดลอก ${esc(c.code)}">${I.copy}</button></span></td><td><a class="btn-dial" href="${c.call ? 'tel:' + c.code : telHref(c.code)}">${c.call ? 'โทรเลย' : 'กดเลย'}</a></td></tr>`;
  const carrierBlock = (id, name2, list, note) => `
<section class="section" id="${id}"><div class="container"><div class="pkg-card">
<div class="pkg-card-head"><div><h2>รหัสเช็คของ ${name2}</h2>${note ? `<p class="pkg-updated">${note}</p>` : ''}</div></div>
<div class="table-wrap"><table class="cmp-table codes-table" style="min-width:420px">
<thead><tr><th scope="col">รายการ</th><th scope="col">รหัสกด</th><th scope="col">ใช้งาน</th></tr></thead>
<tbody>${list.map(codeRow).join('\n')}</tbody></table></div>
</div></div></section>`;
  const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'เช็คเบอร์ / เช็คเน็ตคงเหลือ', href: '/check-number-balance.html' }];
  const faqs = [
    { q: 'เช็คเบอร์ตัวเองกดอะไร?', a: 'AIS กด *545# ทรูมูฟ เอช กด *933# แล้วโทรออก ระบบจะแสดงเบอร์ของคุณบนหน้าจอ ส่วนดีแทคสามารถสอบถามผ่าน Call Center 1678', aHtml: 'AIS กด <span class="dial-code">*545#</span> ทรูมูฟ เอช กด <span class="dial-code">*933#</span> แล้วโทรออก ระบบจะแสดงเบอร์ของคุณบนหน้าจอ ส่วนดีแทคสามารถสอบถามผ่าน Call Center <span class="dial-code">1678</span>' },
    { q: 'เช็คเน็ตคงเหลือ/โปรที่ใช้อยู่ได้อย่างไร?', a: 'AIS กด *121*32# ทรูมูฟ เอช กด *900# ดีแทค กด *101*1# แล้วโทรออก ระบบจะส่งข้อมูลโปรปัจจุบันกลับมาให้ฟรี', aHtml: 'AIS กด <span class="dial-code">*121*32#</span> ทรูมูฟ เอช กด <span class="dial-code">*900#</span> ดีแทค กด <span class="dial-code">*101*1#</span> แล้วโทรออก ระบบจะส่งข้อมูลโปรปัจจุบันกลับมาให้ฟรี' },
    { q: 'กดรหัสแล้วมีค่าบริการไหม?', a: 'รหัสเช็คข้อมูลพื้นฐานเหล่านี้เป็นบริการ USSD ของเครือข่าย กดเช็คได้ฟรี ส่วนการโทร Call Center อาจมีค่าบริการตามเงื่อนไขของแต่ละเครือข่าย' },
  ];
  const ld = [breadcrumbLd(bc), faqLd(faqs)];
  const title = 'วิธีเช็คเบอร์ตัวเอง เช็คเน็ตคงเหลือ AIS ทรู ดีแทค';
  const desc = 'รวมรหัสกดเช็คเบอร์ตัวเอง เช็คยอดเงิน เช็คโปรเน็ตปัจจุบัน ครบทุกค่าย AIS ทรู ดีแทค กดจากมือถือได้ทันที ฟรี พร้อมปุ่มคัดลอกรหัส';
  let html = head({ title, description: desc, canonicalPath: '/check-number-balance.html', ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<div class="container page-head"><h1>วิธีเช็คเบอร์ตัวเอง & เช็คเน็ตคงเหลือ ทุกค่าย</h1><p class="pkg-updated">รหัสกดเช็คจริงของแต่ละเครือข่าย กดฟรีจากมือถือได้ทันที</p></div>
${artBlock({ tone: 'brand', big: '*121#', label: 'รหัสกดเช็คเบอร์ / เช็คเน็ต', motif: I.search, stat1: `${codes.ais.length + codes.true.length + codes.dtac.length} รหัสกดฟรี`, stat2: 'AIS · ทรูมูฟ เอช · ดีแทค' })}
<nav class="subnav" aria-label="เลือกค่าย"><div class="container"><ul>
  <li><a class="chip active" href="#ais"><span class="dot dot-ais" aria-hidden="true"></span>AIS</a></li>
  <li><a class="chip" href="#true"><span class="dot dot-tmh" aria-hidden="true"></span>ทรูมูฟ เอช</a></li>
  <li><a class="chip" href="#dtac"><span class="dot dot-tmh" aria-hidden="true"></span>ดีแทค</a></li>
</ul></div></nav>`;
  html += carrierBlock('ais', 'AIS (ซิมเติมเงิน)', codes.ais, 'เมื่อรู้โปรที่ใช้อยู่แล้ว เลือกโปรใหม่ได้ที่ <a href="/ais.html">รวมโปรเน็ต AIS</a>');
  html += carrierBlock('true', 'ทรูมูฟ เอช (TrueMove H)', codes.true, 'ดูโปรเสริมได้ที่ <a href="/true-dtac.html">รวมโปรเน็ตทรูดีแทค</a>');
  html += carrierBlock('dtac', 'ดีแทค (dtac)', codes.dtac, 'เว็บเดิมไม่มีรหัสเช็คเบอร์ตัวเองของดีแทค — สอบถามได้ที่ Call Center 1678 · ดูโปรได้ที่ <a href="/true-dtac.html">รวมโปรทรูดีแทค</a>');
  html += faqSection(faqs, { title: 'คำถามที่พบบ่อยเรื่องการเช็คข้อมูล' });
  html += relatedLinks([
    { label: 'วิธีสมัครโปรเน็ต', href: '/articles/how-to-register.html' },
    { label: 'โปรเน็ต AIS', href: '/ais.html' },
    { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' },
    { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
  ]);
  html += footer();
  write('check-number-balance.html', html);
})();

/* ======================================================================
 * PAGES: articles
 * ==================================================================== */
const articleMetaExtra = {
  'how-to-register': { img: '/img/Simcard-AIS-True-Dtac.webp', related: [{ label: 'เช็คเบอร์/เช็คเน็ต', href: '/check-number-balance.html' }, { label: 'โปรเน็ต AIS', href: '/ais.html' }, { label: 'โปรทรูดีแทค', href: '/true-dtac.html' }] },
  'faq-ais': { img: '/img/AIS-5G.webp', related: [{ label: 'FAQ รวมทุกค่าย', href: '/faq.html' }, { label: 'โปรเน็ต AIS', href: '/ais.html' }, { label: 'โปร AIS รายเดือน', href: '/ais/30daypack.html' }] },
  '5g-phones': { img: '/img/5G-Network.webp', related: [{ label: 'โปรเน็ต AIS', href: '/ais.html' }, { label: 'ความเร็วเน็ต & FUP', href: '/articles/net-speed-explained.html' }] },
  'sim-cards': { img: '/img/Simcard-AIS-True-Dtac.webp', related: [{ label: 'โปรเน็ต AIS', href: '/ais.html' }, { label: 'โปรทรูดีแทค', href: '/true-dtac.html' }, { label: 'วิธีสมัครโปรเน็ต', href: '/articles/how-to-register.html' }] },
  'net-speed-explained': { img: '/img/Internet-speed-test.webp', related: [{ label: 'โปร AIS รายวัน', href: '/ais/1daypack.html' }, { label: 'โปร AIS รายเดือน', href: '/ais/30daypack.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  'ber-mongkol': { img: '/img/lucky-number.webp', related: [{ label: 'เลือกซิมเติมเงิน', href: '/articles/sim-cards.html' }, { label: 'โปรเน็ต AIS', href: '/ais.html' }] },
};
// เล็ม meta description ที่ยาวเกิน 155 ตัวอักษร (ตัดท้ายที่ขอบเขตคำ)
function trimDesc(d) {
  if (d.length <= 155) return d;
  return d.slice(0, 152).replace(/\s+\S*$/, '') + '…';
}
function trimTitle(t) {
  if (t.length <= 60) return t;
  return t.slice(0, 59).replace(/\s+\S*$/, '');
}
// แบนเนอร์ประจำบทความ — motif/ตัวใหญ่/ข้อความต่างกันทุกหน้า (net-speed ใช้ช่วงสปีดจริงจากข้อมูลโปร)
const allPkUnique = (() => { const seen = new Set(), out = []; for (const cs of Object.values(packages)) for (const c of cs) { if (!seen.has(c.code)) { seen.add(c.code); out.push(c); } } return out; })();
const articleArt = {
  'how-to-register': { tone: 'brand', big: 'USSD', label: 'วิธีสมัครโปรเน็ต & เบอร์โทรด่วน', motif: I.phone, stat1: 'สมัครเองได้ใน 4 ขั้นตอน', stat2: 'รวมเบอร์โทรด่วนทุกค่าย' },
  'faq-ais': { tone: 'ais', big: 'Q&A', label: 'FAQ โปรเน็ต AIS', motif: I.doc, stat1: 'รวมคำถามยอดฮิต', stat2: 'พร้อมคำตอบละเอียด' },
  '5g-phones': { tone: 'brand', big: '5G', label: 'มือถือที่รองรับ 5G', motif: SPEC_ICONS.data, stat1: 'เช็ครุ่นที่รองรับ', stat2: 'คลื่น 5G ในไทยครบทุกค่าย' },
  'sim-cards': { tone: 'brand', big: 'SIM', label: 'เลือกซิมเติมเงินให้คุ้ม', motif: I.sim, stat1: 'AIS · ทรู · ดีแทค', stat2: 'เปรียบเทียบก่อนซื้อ' },
  'net-speed-explained': { tone: 'brand', big: 'Mbps', label: 'ความเร็วเน็ต & FUP คืออะไร', motif: SPEC_ICONS.speed, stat1: speedRangeOf(allPkUnique), stat2: 'เลือกสปีดให้ตรงการใช้งาน' },
  'ber-mongkol': { tone: 'brand', big: '9', label: 'เบอร์มงคลเสริมดวง', motif: ART_ICONS.star, stat1: 'ผลรวมเบอร์ & คู่เลขมงคล', stat2: 'พร้อมเครื่องมือวิเคราะห์ฟรี' },
};
const NEW_ARTICLE_META = {
  'check-current-package': { img: '/img/Internet-speed-test.webp', related: [{ label: 'เช็คเบอร์/เช็คเน็ต', href: '/check-number-balance.html' }, { label: 'วิธียกเลิกโปรเสริม', href: '/articles/cancel-net-package.html' }, { label: 'โปรเน็ต AIS', href: '/ais.html' }] },
  'cancel-net-package': { img: '/img/Simcard-AIS-True-Dtac.webp', related: [{ label: 'เช็คโปรที่ใช้อยู่', href: '/articles/check-current-package.html' }, { label: 'FAQ รวมทุกค่าย', href: '/faq.html' }] },
  'unlimited-vs-no-throttle': { img: '/img/difference-internet-speed.webp', related: [{ label: 'ความเร็วเน็ต & FUP', href: '/articles/net-speed-explained.html' }, { label: 'โปรเน็ต 4 Mbps', href: '/speed/4mbps.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  'fix-slow-mobile-internet': { img: '/img/Mobile-5G-Setting-Network.webp', related: [{ label: 'ความเร็วเน็ต & FUP', href: '/articles/net-speed-explained.html' }, { label: 'เช็คโปรที่ใช้อยู่', href: '/articles/check-current-package.html' }] },
  'hotspot-tethering-guide': { img: '/img/5G-Network.webp', related: [{ label: 'โปรเน็ต 10 Mbps', href: '/speed/10mbps.html' }, { label: 'โปรเน็ต 6 Mbps', href: '/speed/6mbps.html' }, { label: 'เลือกโปรตามการใช้งาน', href: '/articles/choose-pack-by-usage.html' }] },
  'topup-prepaid-methods': { img: '/img/Simcard-AIS-True-Dtac.webp', related: [{ label: 'วิธีสมัครโปรเน็ต', href: '/articles/how-to-register.html' }, { label: 'โปรถูกไม่เกิน 30 บาท', href: '/budget/under-30.html' }] },
  'choose-pack-by-usage': { img: '/img/difference-internet-speed.webp', related: [{ label: 'โปรเน็ตตามงบ', href: '/budget/30-50.html' }, { label: 'โปรเน็ตตามความเร็ว', href: '/speed/4mbps.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  'esim-prepaid-thailand': { img: '/img/Simcard-AIS-True-Dtac.webp', related: [{ label: 'เลือกซิมเติมเงิน', href: '/articles/sim-cards.html' }, { label: 'มือถือที่รองรับ 5G', href: '/articles/5g-phones.html' }] },
  'move-carrier-keep-number': { img: '/img/Simcard-AIS-True-Dtac.webp', related: [{ label: 'เลือกซิมเติมเงิน', href: '/articles/sim-cards.html' }, { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' }] },
  'prepaid-vs-postpaid': { img: '/img/AIS-5G.webp', related: [{ label: 'เลือกซิมเติมเงิน', href: '/articles/sim-cards.html' }, { label: 'โปรรายเดือน 500 บาทขึ้นไป', href: '/budget/over-500.html' }] },
  'save-mobile-data-tips': { img: '/img/Internet-speed-test.webp', related: [{ label: 'โปรถูกไม่เกิน 30 บาท', href: '/budget/under-30.html' }, { label: 'ความเร็วเน็ต & FUP', href: '/articles/net-speed-explained.html' }] },
  'vat-price-explained': { img: '/img/AIS-5G-Unlimited.webp', related: [{ label: 'วิธีเติมเงินทุกช่องทาง', href: '/articles/topup-prepaid-methods.html' }, { label: 'โปรทรูดีแทค', href: '/true-dtac.html' }] },
};
const NEW_ARTICLE_ART = {
  'check-current-package': { tone: 'brand', big: 'เช็ค', label: 'เช็คโปรเน็ตที่ใช้อยู่ ทุกค่าย', motif: I.search, stat1: 'AIS · ทรู · ดีแทค', stat2: 'รหัสกดเช็คฟรี ไม่เสียเงิน' },
  'cancel-net-package': { tone: 'brand', big: 'ยกเลิก', label: 'ยกเลิกโปรเสริม & กันเงินหาย', motif: I.doc, stat1: 'ทำเองได้ทุกค่าย', stat2: 'ผ่านรหัสกด / แอป / Call Center' },
  'unlimited-vs-no-throttle': { tone: 'brand', big: 'FUP', label: 'ไม่อั้น vs ไม่ลดสปีด', motif: SPEC_ICONS.speed, stat1: 'สองคำนี้ไม่เหมือนกัน', stat2: 'อ่านก่อนเลือกโปรถัดไป' },
  'fix-slow-mobile-internet': { tone: 'brand', big: 'FIX', label: 'เน็ตช้า แก้ได้เป็นขั้นตอน', motif: I.phone, stat1: '10 วิธีไล่เช็คเอง', stat2: 'จากง่ายไปยาก ใช้ได้ทุกค่าย' },
  'hotspot-tethering-guide': { tone: 'brand', big: 'WiFi', label: 'แชร์ฮอตสปอตอย่างคุ้ม', motif: I.wifi, stat1: 'สปีดที่เหมาะ 4–10 Mbps', stat2: 'พร้อมวิธีประหยัดแบตและเน็ต' },
  'topup-prepaid-methods': { tone: 'brand', big: 'เติม', label: 'เติมเงินซิมเติมเงินทุกช่องทาง', motif: SPEC_ICONS.tax, stat1: 'แอป · ตู้ · ร้านสะดวกซื้อ', stat2: 'พร้อมข้อควรระวังก่อนสมัครโปร' },
  'choose-pack-by-usage': { tone: 'brand', big: 'เลือก', label: 'เลือกโปรตามการใช้งานจริง', motif: SPEC_ICONS.data, stat1: 'ดูหนัง เกม ทำงาน โซเชียล', stat2: 'จับคู่สปีด-รอบเวลาให้ตรง' },
  'esim-prepaid-thailand': { tone: 'brand', big: 'eSIM', label: 'eSIM กับซิมเติมเงิน', motif: I.sim, stat1: 'ต่างจากซิมการ์ดยังไง', stat2: 'ใครควรใช้ ใครยังไม่จำเป็น' },
  'move-carrier-keep-number': { tone: 'brand', big: 'ย้าย', label: 'ย้ายค่ายเบอร์เดิม', motif: I.phone, stat1: 'ขั้นตอนตามจริงทีละข้อ', stat2: 'สิ่งที่ต้องเช็คก่อนย้าย' },
  'prepaid-vs-postpaid': { tone: 'brand', big: 'VS', label: 'เติมเงิน vs รายเดือน', motif: SPEC_ICONS.call, stat1: 'ข้อดี-ข้อเสียตรงๆ', stat2: 'เลือกให้ตรงพฤติกรรมใช้จริง' },
  'save-mobile-data-tips': { tone: 'brand', big: 'SAVE', label: 'ประหยัดเน็ตมือถือ', motif: SPEC_ICONS.data, stat1: 'ตั้งค่าครั้งเดียว เห็นผลทันที', stat2: 'ยืดอายุโปรได้จริง' },
  'vat-price-explained': { tone: 'brand', big: 'VAT', label: 'ทำไมราคาโปรมีเศษสตางค์', motif: SPEC_ICONS.tax, stat1: 'VAT 7% คิดยังไง', stat2: 'เตรียมยอดเงินให้พอก่อนกด' },
};
for (const slug of Object.keys(articles)) {
  const a = articles[slug];
  const extra = articleMetaExtra[slug] || NEW_ARTICLE_META[slug];
  const urlPath = `/articles/${slug}.html`;
  const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'บทความ', href: '/articles/index.html' }, { label: a.h1, href: urlPath }];
  const ld = [breadcrumbLd(bc), {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: a.h1, inLanguage: 'th',
    image: DOMAIN + extra.img,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: DOMAIN + urlPath,
    dateModified: TODAY_ISO,
  }];
  if (a.faq && a.faq.length) ld.push(faqLd(a.faq));
  // ใส่ width/height ให้รูปในบทความ (ทุกรูปเดิม 650x355 ยกเว้น AIS-5G*)
  let body = a.bodyHtml.replace(/<img ([^>]*?)>/g, (mt, attrs) => {
    let w = 650, h = 355;
    if (/AIS-5G-Unlimited/.test(attrs)) h = 342; else if (/AIS-5G\.webp/.test(attrs)) h = 343;
    const extraAttr = ` width="${w}" height="${h}" loading="lazy"`;
    return `<img ${attrs}${attrs.includes('width=') ? '' : extraAttr}>`;
  });
  // ห่อ table ด้วย .table-wrap กันตารางล้นจอมือถือ
  body = body.replace(/<table/g, '<div class="table-wrap"><table').replace(/<\/table>/g, '</table></div>');
  let html = head({ title: trimTitle(a.oldTitle), description: trimDesc(a.oldMetaDescription), canonicalPath: urlPath, ogImage: extra.img, ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<section class="section mt-0" style="padding-top:14px"><div class="container">
<article class="article-page">
<div class="article-art" aria-hidden="true">${pageArt(articleArt[slug] || NEW_ARTICLE_ART[slug])}</div>
<h1>${esc(a.h1)}</h1>
<p class="a-meta">${esc(a.lead || '')}</p>
<div class="article-body">
${body}
</div>
</article>
</div></section>`;
  if (a.toolsJs) html += `<script>${a.toolsJs}</script>`;
  html += relatedLinks(extra.related, 'อ่านต่อ / ดูโปรที่เกี่ยวข้อง');
  html += footer();
  write(`articles/${slug}.html`, html);
  // บทความใหม่ (ไม่อยู่ในลิสต์ sitemap เดิม) — เพิ่มเข้า sitemap ผ่าน EXTRA_URLS
  if (!articleMetaExtra[slug]) EXTRA_URLS.push(urlPath);
}

/* ======================================================================
 * PAGE ใหม่: about.html (เกี่ยวกับเรา / ติดต่อเรา)
 * หมายเหตุ: เว็บเดิมไม่มีข้อมูลติดต่อใดๆ (site-inventory ข้อ 5) และห้ามใส่ข้อมูลปลอม
 * (design-spec ข้อตัดสินใจ 2) — หน้านี้จึงให้ข้อมูลตรงไปตรงมา + ช่องทาง Call Center
 * จริงของแต่ละเครือข่ายเท่านั้น
 * ==================================================================== */
(function buildAbout() {
  const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'เกี่ยวกับเรา / ติดต่อเรา', href: '/about.html' }];
  const title = 'เกี่ยวกับเรา & ช่องทางติดต่อ | ' + SITE_NAME;
  const desc = 'โปรเน็ตเสริม.com โดยร้าน TKShop ตัวแทนจำหน่ายอย่างถูกต้อง รวมโปรเน็ต AIS ทรู ดีแทค ตรวจทานข้อมูลทุกเดือน พร้อมช่องทาง Call Center ทุกเครือข่าย';
  const ld = [breadcrumbLd(bc), {
    '@context': 'https://schema.org', '@type': 'AboutPage',
    name: 'เกี่ยวกับเรา / ติดต่อเรา', inLanguage: 'th',
    mainEntityOfPage: DOMAIN + '/about.html',
    about: { '@type': 'Organization', name: SITE_NAME, alternateName: 'TKShop', url: DOMAIN + '/', description: 'ดำเนินการโดยร้าน TKShop ตัวแทนจำหน่ายอย่างถูกต้อง รวมโปรเน็ตเสริมมือถือ AIS ทรู ดีแทค อัปเดตข้อมูลทุกเดือน' },
  }];
  let html = head({ title, description: desc, canonicalPath: '/about.html', ldBlocks: ld });
  html += header();
  html += breadcrumb(bc);
  html += `
<div class="container page-head"><h1>เกี่ยวกับเรา & ช่องทางติดต่อ</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH}</p></div>
${artBlock({ tone: 'brand', big: 'TKShop', label: 'ตัวแทนจำหน่ายอย่างถูกต้อง', motif: I.shield, stat1: 'อัปเดตข้อมูลทุกเดือน', stat2: 'อ้างอิงจากเครือข่ายโดยตรง' })}
<section class="section mt-0" style="padding-top:4px"><div class="container faq-wrap">
<div class="pkg-card" style="padding:22px 20px">
  <h2 style="font-size:20px;font-weight:800">โปรเน็ตเสริม.com คือใคร</h2>
  <p style="margin-top:10px;color:#374151">โปรเน็ตเสริม.com ดำเนินการโดย <strong>ร้าน TKShop</strong> ตัวแทนจำหน่ายอย่างถูกต้อง เรารวบรวมโปรเน็ตเสริมสำหรับซิมเติมเงินของเครือข่าย <strong>AIS</strong> และ <strong>ทรู/ดีแทค</strong> ไว้ในที่เดียว พร้อมรหัสสมัคร USSD ที่กดสมัครจากมือถือได้ทันที</p>
  <ul class="pkg-specs" style="margin-top:12px">
    <li class="sp-note">${SPEC_ICONS.note}<span><strong>ตรวจทานและอัปเดตข้อมูลทุกเดือน</strong> — ราคา รหัสสมัคร และเงื่อนไข อ้างอิงจากเครือข่ายโดยตรง</span></li>
    <li class="sp-note">${SPEC_ICONS.note}<span><strong>รหัสสมัครส่งตรงถึงเครือข่าย</strong> — กดจากมือถือแล้วโทรออกได้ทันที ได้รับสิทธิ์ตรงจากค่าย ไม่มีค่าบริการเพิ่ม</span></li>
    <li class="sp-note">${SPEC_ICONS.note}<span><strong>เปรียบเทียบง่าย เป็นกลาง</strong> — แสดงราคารวมภาษี ความเร็ว ปริมาณเน็ต และเงื่อนไขของทุกโปรอย่างครบถ้วน</span></li>
  </ul>
  <p style="margin-top:12px;color:#374151"><strong>ข้อควรทราบ:</strong> เราไม่ใช่เว็บไซต์ทางการของ AIS, TrueMove H หรือ dtac — ราคาและเงื่อนไขแพ็กเกจเป็นไปตามที่เครือข่ายกำหนด และอาจเปลี่ยนแปลงได้ กรุณาตรวจสอบกับเครือข่ายอีกครั้งก่อนสมัคร</p>
</div>
<div class="pkg-card" style="padding:22px 20px;margin-top:16px">
  <h2 style="font-size:20px;font-weight:800">ติดต่อสอบถามเรื่องแพ็กเกจ / การใช้งานซิม</h2>
  <p style="margin-top:10px;color:#374151">เรื่องยอดเงิน การสมัคร การยกเลิกโปร หรือปัญหาการใช้งาน ติดต่อ Call Center ของเครือข่ายที่คุณใช้ได้โดยตรง:</p>
  <ul class="pkg-specs" style="margin-top:12px">
    <li class="sp-call">${SPEC_ICONS.call}<span><span class="dot dot-ais" aria-hidden="true"></span><strong>AIS</strong> — โทร <a href="tel:1175" class="dial-code">1175</a></span></li>
    <li class="sp-call">${SPEC_ICONS.call}<span><span class="dot dot-tmh" aria-hidden="true"></span><strong>TrueMove H</strong> — โทร <a href="tel:1242" class="dial-code">1242</a></span></li>
    <li class="sp-call">${SPEC_ICONS.call}<span><span class="dot dot-tmh" aria-hidden="true"></span><strong>dtac</strong> — โทร <a href="tel:1678" class="dial-code">1678</a></span></li>
  </ul>
  <p style="margin-top:12px;color:#374151">ดูรหัสกดเช็คเบอร์/เช็คเน็ตของทุกค่ายได้ที่ <a href="/check-number-balance.html" style="color:var(--green-700);font-weight:700">หน้าเช็คเบอร์/เช็คเน็ตคงเหลือ</a></p>
</div>
</div></section>`;
  html += relatedLinks([
    { label: 'โปรเน็ต AIS', href: '/ais.html' },
    { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' },
    { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
    { label: 'FAQ', href: '/faq.html' },
  ], 'ไปต่อที่หน้ายอดนิยม');
  html += footer();
  write('about.html', html);
})();


/* ======================================================================
 * LONG-TAIL v2: หน้า /pro/ รายแพ็กเกจ (38), /budget/ (6), /speed/ (6),
 * หน้าค่ายเดี่ยว /dtac /true, และดัชนีบทความ /articles/index.html
 * กติกาเดิมของเว็บ: ทุกราคา/รหัสมาจาก data/packages.json เท่านั้น
 * ==================================================================== */
(function buildLongtail() {
  const DUR_DAYS = { '1d': 1, '2d': 2, '3d': 3, '7d': 7, '30d': 30 };
  const durDays = c => DUR_DAYS[durKey(c.durationRaw)] || 1;
  const perDay = c => priceNum(c.price) / durDays(c);
  const fmtBaht = n => (Math.round(n * 100) / 100).toLocaleString('en-US', { maximumFractionDigits: 2 });
  const speedTxt = c => { const s = speedOf(c); return s ? `${s.val} ${s.unit}` : 'ตามแพ็กเกจ'; };
  const speedKb = c => { const s = speedOf(c); return s ? (s.unit === 'Kbps' ? parseFloat(s.val) : parseFloat(s.val) * 1000) : 0; };
  const isNoThrottle = c => c.features.some(f => /ไม่ลดสปีด|ไม่อั้น/.test(f));
  const netGen = c => (c.features.some(f => /5G/.test(f)) ? '5G' : c.features.some(f => /4G/.test(f)) ? '4G' : '4G/5G ตามพื้นที่');
  const is5G = c => c.features.some(f => /5G/.test(f));
  const carrierTH = { ais: 'AIS', true: 'ทรู', dtac: 'ดีแทค' };
  const carrierHubOf = { ais: { label: 'โปรเน็ต AIS', href: '/ais.html' }, true: { label: 'โปรเน็ตทรู', href: '/true.html' }, dtac: { label: 'โปรเน็ตดีแทค', href: '/dtac.html' } };
  const proHref = c => `/pro/${proNotes[c.code].slug}.html`;
  const proBrand = c => (c.carrier === 'ais' ? 'โปรเน็ต AIS' : `โปรเน็ต${carrierTH[c.carrier]}`);
  const proLabel = c => `${carrierTH[c.carrier]} ${speedTxt(c)} ${c.durationRaw}`;
  const checkCodeOf = { ais: 'กด *121*32# โทรออก', true: 'กด *900# โทรออก', dtac: 'กด *101*1# โทรออก' };
  const ALL = allPkUnique;

  const BUCKETS = [
    { key: 'under-30', file: 'budget/under-30.html', label: 'ไม่เกิน 30 บาท', test: p => p <= 30 },
    { key: '30-50', file: 'budget/30-50.html', label: '30–50 บาท', test: p => p > 30 && p <= 50 },
    { key: '50-100', file: 'budget/50-100.html', label: '50–100 บาท', test: p => p > 50 && p <= 100 },
    { key: '100-200', file: 'budget/100-200.html', label: '100–200 บาท', test: p => p > 100 && p <= 200 },
    { key: '200-500', file: 'budget/200-500.html', label: '200–500 บาท', test: p => p > 200 && p <= 500 },
    { key: 'over-500', file: 'budget/over-500.html', label: '500 บาทขึ้นไป', test: p => p > 500 },
  ];
  const bucketOf = c => BUCKETS.find(b => b.test(priceNum(c.price)));
  const SPEEDS = [
    { key: '512kbps', file: 'speed/512kbps.html', label: '512 Kbps', kb: 512 },
    { key: '1mbps', file: 'speed/1mbps.html', label: '1 Mbps', kb: 1000 },
    { key: '2mbps', file: 'speed/2mbps.html', label: '2 Mbps', kb: 2000 },
    { key: '4mbps', file: 'speed/4mbps.html', label: '4 Mbps', kb: 4000 },
    { key: '6mbps', file: 'speed/6mbps.html', label: '6 Mbps', kb: 6000 },
    { key: '10mbps', file: 'speed/10mbps.html', label: '10 Mbps', kb: 10000 },
  ];
  const speedHubOf = c => SPEEDS.find(sp => sp.kb === speedKb(c));

  const durPageOf = c => {
    const k = durKey(c.durationRaw);
    if (c.carrier === 'ais') return { label: `โปรเน็ต AIS ${c.durationRaw}`, href: `/ais/${k.replace('d', '')}daypack.html` };
    if (k === '7d') return { label: 'โปรทรูดีแทค 7 วัน', href: '/true-dtac/7daypack.html' };
    if (k === '30d') return { label: 'โปรทรูดีแทค 30 วัน', href: '/true-dtac/30daypack.html' };
    return { label: 'รวมโปรทรูดีแทค', href: '/true-dtac.html' };
  };

  /* ---------- ทางเลือกใกล้เคียง (คำนวณต่อแพ็กเกจ — ต่างกันทุกหน้า) ---------- */
  function altRows(c) {
    const rows = [];
    const push = (o, why) => { if (o.code !== c.code && !rows.some(r => r.c.code === o.code)) rows.push({ c: o, why }); };
    ALL.filter(o => o.carrier === c.carrier && durKey(o.durationRaw) === durKey(c.durationRaw))
      .sort((a, b) => speedKb(a) - speedKb(b))
      .forEach(o => push(o, speedKb(o) > speedKb(c) ? 'แรงกว่า' : speedKb(o) < speedKb(c) ? 'ประหยัดกว่า' :
        priceNum(o.price) < priceNum(c.price) ? 'สปีดเท่ากัน ถูกกว่า' : 'สปีดเท่ากัน คนละรุ่น'));
    ALL.filter(o => o.carrier === c.carrier && speedKb(o) === speedKb(c) && durKey(o.durationRaw) !== durKey(c.durationRaw))
      .sort((a, b) => durDays(a) - durDays(b))
      .forEach(o => push(o, durDays(o) > durDays(c) ? 'รอบยาวกว่า เฉลี่ยต่อวันถูกลง' : 'รอบสั้นกว่า ลองก่อนได้'));
    ALL.filter(o => o.carrier !== c.carrier && speedKb(o) === speedKb(c) && durKey(o.durationRaw) === durKey(c.durationRaw))
      .forEach(o => push(o, `ตัวเทียบฝั่ง${carrierTH[o.carrier]}`));
    return rows.slice(0, 6);
  }

  /* ================= 38 หน้า /pro/ ================= */
  for (const c of ALL) {
    const meta = proNotes[c.code];
    if (!meta) throw new Error('missing pro note for ' + c.code);
    const urlPath = proHref(c);
    const cName = carrierTH[c.carrier];
    const spTxt = speedTxt(c);
    const noTh = isNoThrottle(c);
    const pd = perDay(c);
    const hub = carrierHubOf[c.carrier];
    const h1 = `${proBrand(c)} ${spTxt} ${c.durationRaw} ${c.price} บาท${noTh ? ' ไม่ลดสปีด' : ''}`;
    const title = trimTitle(`${proBrand(c)} ${spTxt} ${c.durationRaw} ${c.price} บาท | ${SITE_NAME}`);
    const description = trimDesc(`${proBrand(c)} ความเร็ว ${spTxt} นาน ${c.durationRaw} ราคา ${c.price} บาท (เฉลี่ยวันละ ${fmtBaht(pd)} บาท) สมัครกด ${c.code} — สเปกเต็ม ตารางเทียบทางเลือกใกล้เคียง และวิธีเช็คสถานะโปร`);
    const bc = [{ label: 'หน้าแรก', href: '/' }, hub, { label: `${spTxt} ${c.durationRaw}`, href: urlPath }];
    const faqs = [
      {
        q: `${proBrand(c)} ${spTxt} ${c.durationRaw} ราคาเท่าไหร่ สมัครยังไง`,
        a: `ราคา ${c.price} บาท${c.taxIncluded ? ' (รวมภาษีมูลค่าเพิ่มแล้ว)' : ''} เฉลี่ยวันละประมาณ ${fmtBaht(pd)} บาท สมัครโดยกด ${c.code} แล้วโทรออกจากซิม${cName}ที่ต้องการสมัคร ระบบจะส่ง SMS ยืนยันเมื่อสมัครสำเร็จ`,
      },
      {
        q: `ใช้ ${spTxt} ครบ ${c.durationRaw} แล้ว ต่อโปรเดิมหรือเปลี่ยนตัวดี`,
        a: (() => {
          const alt = altRows(c)[0];
          const base = `เมื่อครบ${c.durationRaw} สิทธิ์ ${spTxt} จะสิ้นสุดและเน็ตกลับไปคิดตามโปรหลักของซิม ต่อรอบใหม่ได้ด้วยรหัสเดิม ${c.code} (เช็คสถานะก่อน: ${checkCodeOf[c.carrier]})`;
          return alt
            ? `${base} หรือถ้ารอบนี้รู้สึกว่ายังไม่ตรงการใช้งาน ตัวเทียบที่ใกล้ที่สุดคือ ${proLabel(alt.c)} ราคา ${alt.c.price} บาท (${alt.why})`
            : base;
        })(),
      },
      meta.faq,
    ];
    // หน้าแฝด 4G/5G: สปีด+รอบ+ค่ายเท่ากัน ต่างที่เทคโนโลยีเครือข่าย — เขียนเนื้อหาช่วยตัดสินใจคนละมุมต่อฝั่ง
    const twin = ALL.find(o => o.code !== c.code && o.carrier === c.carrier
      && speedKb(o) === speedKb(c) && durKey(o.durationRaw) === durKey(c.durationRaw));
    const twinDiff = twin ? Math.abs(priceNum(c.price) - priceNum(twin.price)) : 0;
    const twinMixedGen = twin && is5G(c) !== is5G(twin);
    const twinBlock = !twin ? '' : !twinMixedGen ? (priceNum(c.price) <= priceNum(twin.price) ? `
<section class="section"><div class="container">
<div class="section-head-center"><h2>มีอีกรุ่นสเปกใกล้กัน — ตัวนี้ถูกกว่าตรงไหน</h2></div>
<div class="article-page" style="margin:0 auto"><div class="article-body">
<p>ในตาราง${carrierTH[c.carrier]}มี ${esc(spTxt)} รอบ${esc(c.durationRaw)}อยู่สองรุ่น และหน้านี้คือตัวที่ราคาเบากว่า (ประหยัดกว่ากัน ${fmtBaht(twinDiff)} บาทต่อรอบ) ความเร็วสูงสุดเท่ากัน จุดที่สองรุ่นต่างคือชุดเงื่อนไขแพ็กเกจ — เทียบรายละเอียดบรรทัดต่อบรรทัดกับ<a href="${proHref(twin)}">อีกรุ่น (${esc(twin.price)} บาท)</a>ก่อนกด ถ้าเงื่อนไขที่ต่างไม่เกี่ยวกับการใช้งานของคุณ เลือกตัวถูกกว่าได้เลย</p>
</div></div>
</div></section>` : `
<section class="section"><div class="container">
<div class="section-head-center"><h2>มีรุ่นถูกกว่าสเปกใกล้กัน — ตัวนี้ให้อะไรเพิ่ม</h2></div>
<div class="article-page" style="margin:0 auto"><div class="article-body">
<p>${carrierTH[c.carrier]}มีอีกรุ่นที่ความเร็ว ${esc(spTxt)} รอบ${esc(c.durationRaw)}เหมือนกันแต่ราคาต่ำกว่า ${fmtBaht(twinDiff)} บาท — <a href="${proHref(twin)}">ดูรุ่นนั้นที่นี่ (${esc(twin.price)} บาท)</a> เหตุผลที่บางคนยังเลือกหน้านี้อยู่ที่รายละเอียดแพ็กเกจซึ่งไม่เหมือนกันทั้งชุด อ่านรายละเอียดในตารางสเปกด้านบนของทั้งสองหน้าเทียบกัน แล้วเลือกจากเงื่อนไขที่ตรงกับการใช้งานจริงของคุณ ไม่ใช่จากราคาเพียงอย่างเดียว</p>
</div></div>
</div></section>`) : (is5G(c) ? `
<section class="section"><div class="container">
<div class="section-head-center"><h2>รุ่น 5G ตัวนี้ ต่างจากรุ่น 4G ยังไง</h2></div>
<div class="article-page" style="margin:0 auto"><div class="article-body">
<p>แพ็กเกจนี้วิ่งบนเครือข่าย 5G ซึ่งให้ค่าความหน่วง (ping) ต่ำกว่าและความเร็วที่เสถียรกว่าในพื้นที่ครอบคลุม — ผลจับต้องได้ชัดที่สุดกับเกมออนไลน์ วิดีโอคอล และการอัปโหลด ส่วนต่างที่จ่ายเพิ่มจากรุ่น 4G สเปกเดียวกันคือ ${fmtBaht(twinDiff)} บาทต่อรอบ สองเงื่อนไขที่ควรผ่านก่อนเลือกฝั่งนี้: มือถือรองรับ 5G (<a href="/articles/5g-phones.html">เช็ครุ่นที่รองรับ</a>) และพื้นที่ใช้งานประจำมีสัญญาณ 5G จริง ถ้าไม่ผ่านข้อใดข้อหนึ่ง เงินที่เพิ่มจะไม่ได้อะไรกลับมา — ดู<a href="${proHref(twin)}">รุ่น 4G สเปกเดียวกัน</a>ประกอบ</p>
</div></div>
</div></section>` : `
<section class="section"><div class="container">
<div class="section-head-center"><h2>ทำไมบางคนเลือกตัว 4G นี้ แทนรุ่น 5G</h2></div>
<div class="article-page" style="margin:0 auto"><div class="article-body">
<p>เหตุผลตรงไปตรงมา: ความเร็วสูงสุดเท่ากันแต่ประหยัดกว่า ${fmtBaht(twinDiff)} บาทต่อรอบ — สำหรับเครื่องที่ไม่รองรับ 5G หรือพื้นที่ที่คลื่น 5G ยังมาไม่ถึง ตัวนี้ให้ผลใช้งานแทบไม่ต่างจากรุ่นแพงกว่า เพราะสปีดสูงสุดถูกกำหนดที่ ${esc(spTxt)} เท่ากันทั้งคู่ ใครไม่แน่ใจว่าพื้นที่ตัวเองสัญญาณ 5G แรงแค่ไหน เริ่มจากตัวนี้ก่อนแล้วค่อยอัปเป็น<a href="${proHref(twin)}">รุ่น 5G</a>รอบถัดไปก็ไม่เสียอะไร</p>
</div></div>
</div></section>`);

    const alts = altRows(c);
    const altTable = alts.length ? `
<section class="section"><div class="container">
<div class="section-head-center"><h2>เทียบกับทางเลือกใกล้เคียง</h2><p>คัดจากตารางโปรทั้งหมดในเว็บ — ค่ายเดียวกันรอบเดียวกัน, สปีดเดียวกันรอบอื่น และตัวเทียบข้ามค่าย</p></div>
<div class="table-wrap"><table class="cmp-table">
<thead><tr><th scope="col">แพ็กเกจ</th><th scope="col">ราคา</th><th scope="col">เฉลี่ย/วัน</th><th scope="col">จุดต่างจากโปรนี้</th></tr></thead>
<tbody>
${alts.map(({ c: o, why }) => `<tr><th scope="row"><a href="${proHref(o)}">${esc(proLabel(o))}</a></th><td>${esc(o.price)} บาท</td><td>${fmtBaht(perDay(o))} บาท</td><td>${esc(why)}</td></tr>`).join('\n')}
</tbody></table></div>
</div></section>` : '';
    const ld = [breadcrumbLd(bc), ...productLd([c], urlPath), faqLd(faqs)];
    let html = head({ title, description, canonicalPath: urlPath, ogImage: c.carrier === 'ais' ? '/img/AIS-5G.webp' : '/img/true-dtac-unlimited.webp', ldBlocks: ld });
    html += header();
    html += breadcrumb(bc);
    html += `
<div class="container page-head"><h1>${esc(h1)}</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · ${c.taxIncluded ? 'ราคารวมภาษีแล้ว · ' : ''}กดรหัสสมัครได้ทันที</p></div>
${artBlock({ tone: c.carrier === 'ais' ? 'ais' : 'tmh', big: spTxt.replace(' ', ''), label: `${cName} · ${c.durationRaw}${noTh ? ' · ไม่ลดสปีด' : ''}`, motif: SPEC_ICONS.speed, stat1: `${c.price} บาท`, stat2: `เฉลี่ยวันละ ${fmtBaht(pd)} บาท` })}
<section class="section mt-0" style="padding-top:8px"><div class="container"><div class="pkg-card">
${pkgTable([c], { id: 'tbl-pro' })}
</div></div></section>
<section class="section"><div class="container">
<div class="section-head-center"><h2>โปรนี้เหมาะกับใคร</h2></div>
<div class="article-page" style="margin:0 auto"><div class="article-body"><p>${esc(meta.note)}</p></div></div>
</div></section>
<section class="section"><div class="container">
<div class="section-head-center"><h2>สรุปสเปกและความคุ้มค่า</h2></div>
<div class="table-wrap"><table class="cmp-table">
<thead><tr><th scope="col">หัวข้อ</th><th scope="col">รายละเอียด</th></tr></thead>
<tbody>
<tr><th scope="row">ราคา</th><td>${esc(c.price)} บาท${c.taxIncluded ? ' (รวม VAT 7% แล้ว)' : ''}</td></tr>
<tr><th scope="row">เฉลี่ยต่อวัน</th><td class="win">${fmtBaht(pd)} บาท/วัน</td></tr>
<tr><th scope="row">ความเร็วสูงสุด</th><td>${esc(spTxt)}${noTh ? ' — ใช้ต่อเนื่องที่สปีดนี้ (ไม่ลดสปีด/ไม่อั้นตามเงื่อนไขแพ็กเกจ)' : ''}</td></tr>
<tr><th scope="row">ระยะเวลา</th><td>${esc(c.durationRaw)}</td></tr>
<tr><th scope="row">เครือข่าย</th><td>${netGen(c)} (${carrierName[c.carrier]})</td></tr>
<tr><th scope="row">รายละเอียดจากแพ็กเกจ</th><td>${c.features.map(esc).join(' · ')}</td></tr>
<tr><th scope="row">รหัสสมัคร</th><td><strong>${esc(c.code)}</strong> — กดแล้วโทรออก รอ SMS ยืนยัน</td></tr>
<tr><th scope="row">เช็คสถานะโปร</th><td>${checkCodeOf[c.carrier]} (ฟรี)</td></tr>
</tbody></table></div>
</div></section>
${twinBlock}
${altTable}`;
    html += faqSection(faqs, { title: 'คำถามที่พบบ่อยเกี่ยวกับโปรนี้' });
    html += relatedLinks([
      hub,
      durPageOf(c),
      { label: `โปรเน็ตงบ${bucketOf(c).label}`, href: '/' + bucketOf(c).file },
      ...(speedHubOf(c) ? [{ label: `โปรเน็ต ${speedHubOf(c).label} ทุกค่าย`, href: '/' + speedHubOf(c).file }] : []),
      { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
    ]);
    html += footer();
    write(urlPath.slice(1), html);
    EXTRA_URLS.push(urlPath);
  }

  /* ================= 6 หน้า /budget/ ================= */
  for (const b of BUCKETS) {
    const noteData = hubNotes.budget[b.key];
    const cards = ALL.filter(c => b.test(priceNum(c.price))).sort((x, y) => priceNum(x.price) - priceNum(y.price));
    if (!cards.length) continue;
    const best = [...cards].sort((x, y) => perDay(x) - perDay(y))[0];
    const urlPath = '/' + b.file;
    const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'เลือกโปรตามงบ', href: '/budget/under-30.html' }, { label: b.label, href: urlPath }];
    const faqs = noteData.faq;
    const ld = [breadcrumbLd(bc), ...productLd(cards, urlPath), faqLd(faqs)];
    let html = head({
      title: trimTitle(`${noteData.h1} (${cards.length} โปร ทุกค่าย) | ${SITE_NAME}`),
      description: trimDesc(`รวมโปรเน็ต AIS ทรู ดีแทค ช่วงราคา${b.label} ทั้งหมด ${cards.length} แพ็กเกจ เริ่มต้น ${minPriceOf(cards)} บาท เรียงจากถูกไปแพง พร้อมรหัสสมัครกดได้ทันทีและตัวคุ้มสุดต่อวัน`),
      canonicalPath: urlPath, ogImage: '/img/Simcard-AIS-True-Dtac.webp', ldBlocks: ld,
    });
    html += header();
    html += breadcrumb(bc);
    html += `
<div class="container page-head"><h1>${esc(noteData.h1)}</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · ${cards.length} โปรจากทุกค่าย เรียงราคาถูก → แพง</p></div>
${artBlock({ tone: 'mix', big: b.label.replace(' บาท', '฿'), label: `โปรเน็ตทุกค่ายในงบ${b.label}`, motif: SPEC_ICONS.tax, stat1: `${cards.length} โปร`, stat2: `สปีด ${speedRangeOf(cards)}` })}
<section class="section mt-0" style="padding-top:8px"><div class="container">
<div class="article-page" style="margin:0 auto 18px"><div class="article-body"><p>${esc(noteData.intro)}</p></div></div>
<div class="pkg-card">
${pkgTable(cards, { id: 'tbl-budget' })}
</div>
<p style="text-align:center;margin-top:14px;color:var(--muted);font-size:14.5px">ตัวคุ้มสุดต่อวันในงบนี้: <a href="${proHref(best)}" style="color:var(--cat-blue);font-weight:700">${esc(proLabel(best))}</a> เฉลี่ย ${fmtBaht(perDay(best))} บาท/วัน</p>
</div></section>`;
    html += faqSection(faqs, { title: `คำถามที่พบบ่อย — งบ${b.label}` });
    const i = BUCKETS.indexOf(b);
    html += relatedLinks([
      ...(i > 0 ? [{ label: `งบ${BUCKETS[i - 1].label}`, href: '/' + BUCKETS[i - 1].file }] : []),
      ...(i < BUCKETS.length - 1 ? [{ label: `งบ${BUCKETS[i + 1].label}`, href: '/' + BUCKETS[i + 1].file }] : []),
      { label: 'เลือกโปรตามความเร็ว', href: '/speed/4mbps.html' },
      { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
    ], 'ดูช่วงงบอื่น');
    html += footer();
    write(b.file, html);
    EXTRA_URLS.push(urlPath);
  }

  /* ================= 6 หน้า /speed/ ================= */
  for (const sp of SPEEDS) {
    const noteData = hubNotes.speed[sp.key];
    const cards = ALL.filter(c => speedKb(c) === sp.kb).sort((x, y) => perDay(x) - perDay(y));
    if (!cards.length) continue;
    const urlPath = '/' + sp.file;
    const carriers = [...new Set(cards.map(c => carrierTH[c.carrier]))];
    const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'เลือกโปรตามความเร็ว', href: '/speed/4mbps.html' }, { label: sp.label, href: urlPath }];
    const faqs = noteData.faq;
    const ld = [breadcrumbLd(bc), ...productLd(cards, urlPath), faqLd(faqs)];
    let html = head({
      title: trimTitle(`${noteData.h1} (${cards.length} โปร) | ${SITE_NAME}`),
      description: trimDesc(`รวมโปรเน็ตความเร็ว ${sp.label} ทุกค่าย (${carriers.join(' / ')}) ${cards.length} แพ็กเกจ ตั้งแต่รายวันถึงรายเดือน เรียงตามราคาเฉลี่ยต่อวัน พร้อมรหัสสมัครกดได้ทันที`),
      canonicalPath: urlPath, ogImage: '/img/Internet-speed-test.webp', ldBlocks: ld,
    });
    html += header();
    html += breadcrumb(bc);
    html += `
<div class="container page-head"><h1>${esc(noteData.h1)}</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · ${cards.length} โปร (${carriers.join(' · ')}) เรียงตามราคาเฉลี่ยต่อวัน</p></div>
${artBlock({ tone: 'mix', big: sp.label.replace(' ', ''), label: noteData.h1, motif: SPEC_ICONS.speed, stat1: `${cards.length} โปร`, stat2: `เริ่ม ${minPriceOf(cards)} บาท` })}
<section class="section mt-0" style="padding-top:8px"><div class="container">
<div class="article-page" style="margin:0 auto 18px"><div class="article-body"><p>${esc(noteData.intro)}</p></div></div>
<div class="pkg-card">
${pkgTable(cards, { id: 'tbl-speed' })}
</div>
</div></section>
<section class="section"><div class="container">
<div class="section-head-center"><h2>ราคาเฉลี่ยต่อวันของโปร ${esc(sp.label)}</h2><p>รอบยาวเฉลี่ยถูกลง — ตารางนี้ช่วยเลือก"รอบเวลา" หลังจากตัดสินใจสปีดแล้ว</p></div>
<div class="table-wrap"><table class="cmp-table">
<thead><tr><th scope="col">แพ็กเกจ</th><th scope="col">ระยะเวลา</th><th scope="col">ราคา</th><th scope="col">เฉลี่ย/วัน</th></tr></thead>
<tbody>
${cards.map(c => `<tr><th scope="row"><a href="${proHref(c)}">${esc(proLabel(c))}</a></th><td>${esc(c.durationRaw)}</td><td>${esc(c.price)} บาท</td><td class="win">${fmtBaht(perDay(c))} บาท</td></tr>`).join('\n')}
</tbody></table></div>
</div></section>`;
    html += faqSection(faqs, { title: `คำถามที่พบบ่อย — โปรเน็ต ${sp.label}` });
    const i = SPEEDS.indexOf(sp);
    html += relatedLinks([
      ...(i > 0 ? [{ label: `โปรเน็ต ${SPEEDS[i - 1].label}`, href: '/' + SPEEDS[i - 1].file }] : []),
      ...(i < SPEEDS.length - 1 ? [{ label: `โปรเน็ต ${SPEEDS[i + 1].label}`, href: '/' + SPEEDS[i + 1].file }] : []),
      { label: 'เลือกโปรตามงบ', href: '/budget/under-30.html' },
      { label: 'ความเร็วเน็ต & FUP คืออะไร', href: '/articles/net-speed-explained.html' },
    ], 'ดูความเร็วอื่น');
    html += footer();
    write(sp.file, html);
    EXTRA_URLS.push(urlPath);
  }

  /* ================= หน้าค่ายเดี่ยว /dtac.html /true.html ================= */
  for (const cr of ['dtac', 'true']) {
    const noteData = hubNotes.carrier[cr];
    const cards = ALL.filter(c => c.carrier === cr);
    const urlPath = `/${cr}.html`;
    const groups = ['1d', '2d', '3d', '7d', '30d']
      .map(k => ({ k, list: cards.filter(c => durKey(c.durationRaw) === k) }))
      .filter(g => g.list.length);
    const durLabel = { '1d': 'รายวัน / 24 ชั่วโมง', '2d': '2 วัน', '3d': '3 วัน', '7d': '7 วัน', '30d': '30 วัน' };
    const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' }, { label: noteData.h1, href: urlPath }];
    const faqs = noteData.faq;
    const ld = [breadcrumbLd(bc), ...productLd(cards, urlPath), faqLd(faqs)];
    let html = head({
      title: trimTitle(`${noteData.h1} ${YEAR} | ${SITE_NAME}`),
      description: trimDesc(`${noteData.h1} — ${cards.length} แพ็กเกจ สปีด ${speedRangeOf(cards)} เริ่มต้น ${minPriceOf(cards)} บาท แยกตามระยะเวลา พร้อมรหัสสมัครกดได้ทันที ราคารวม VAT`),
      canonicalPath: urlPath, ogImage: '/img/true-dtac-unlimited.webp', ldBlocks: ld,
    });
    html += header();
    html += breadcrumb(bc);
    html += `
<div class="container page-head"><h1>${esc(noteData.h1)}</h1><p class="pkg-updated">อัปเดตล่าสุด ${UPDATED_TH} · ${cards.length} โปร · สปีด ${speedRangeOf(cards)}</p></div>
${artBlock({ tone: 'tmh', big: cr === 'dtac' ? 'dtac' : 'true', label: noteData.h1, motif: I.wifi, stat1: `${cards.length} โปร`, stat2: `เริ่ม ${minPriceOf(cards)} บาท` })}
<section class="section mt-0" style="padding-top:8px"><div class="container">
<div class="article-page" style="margin:0 auto 18px"><div class="article-body"><p>${esc(noteData.intro)}</p></div></div>
${groups.map(g => `<div class="pkg-card" style="margin-bottom:22px">
  <div class="pkg-card-head"><div><h2>${esc(carrierTH[cr])} ${esc(durLabel[g.k])}</h2></div></div>
  ${pkgTable(g.list, { id: `tbl-${cr}-${g.k}` })}
</div>`).join('\n')}
</div></section>`;
    html += howToSteps();
    html += faqSection(faqs, { title: `คำถามที่พบบ่อย — ${noteData.h1}` });
    html += relatedLinks([
      { label: 'รวมโปรทรูดีแทค', href: '/true-dtac.html' },
      { label: cr === 'dtac' ? 'เฉพาะทรู (TrueMove H)' : 'เฉพาะดีแทค (dtac)', href: cr === 'dtac' ? '/true.html' : '/dtac.html' },
      { label: 'โปรเน็ต AIS', href: '/ais.html' },
      { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
    ]);
    html += footer();
    write(`${cr}.html`, html);
    EXTRA_URLS.push(urlPath);
  }

  /* ================= ดัชนีบทความ /articles/index.html ================= */
  (function buildArticlesIndex() {
    const urlPath = '/articles/index.html';
    const bc = [{ label: 'หน้าแรก', href: '/' }, { label: 'บทความ', href: urlPath }];
    const list = Object.values(articles).sort((a, b) => a.h1.localeCompare(b.h1, 'th'));
    const ld = [breadcrumbLd(bc)];
    let html = head({
      title: trimTitle(`บทความทั้งหมด (${list.length} เรื่อง) — คู่มือโปรเน็ต & ซิมเติมเงิน | ${SITE_NAME}`),
      description: trimDesc(`รวมบทความคู่มือ ${list.length} เรื่อง: วิธีสมัคร/เช็ค/ยกเลิกโปรเน็ต ความเร็วและ FUP การเลือกซิมและโปรให้ตรงการใช้งาน — อ่านฟรีทั้งหมด อัปเดต ${YEAR}`),
      canonicalPath: urlPath, ogImage: '/img/Simcard-AIS-True-Dtac.webp', ldBlocks: ld,
    });
    html += header();
    html += breadcrumb(bc);
    html += `
<div class="container page-head"><h1>บทความทั้งหมด</h1><p class="pkg-updated">${list.length} เรื่อง · อัปเดตล่าสุด ${UPDATED_TH}</p></div>
${artBlock({ tone: 'brand', big: String(list.length), label: 'คู่มือโปรเน็ตและซิมเติมเงิน', motif: I.doc, stat1: 'อ่านฟรีทุกเรื่อง', stat2: 'เขียนจากข้อมูลโปรจริงในเว็บ' })}
<section class="section mt-0" style="padding-top:8px"><div class="container">
<div class="why-grid">
${list.map(a => `<div class="why-card"><h3 style="margin-bottom:6px"><a href="/articles/${a.slug}.html" style="color:var(--cat-blue)">${esc(a.h1)}</a></h3><p>${esc((a.lead || a.oldMetaDescription || '').slice(0, 140))}</p></div>`).join('\n')}
</div>
</div></section>`;
    html += relatedLinks([
      { label: 'โปรเน็ต AIS', href: '/ais.html' },
      { label: 'โปรเน็ตทรูดีแทค', href: '/true-dtac.html' },
      { label: 'เปรียบเทียบทุกค่าย', href: '/compare-networks.html' },
      { label: 'FAQ', href: '/faq.html' },
    ], 'ไปหน้าโปรเน็ต');
    html += footer();
    write('articles/index.html', html);
    EXTRA_URLS.push(urlPath);
  })();
})();

/* ======================================================================
 * 404, sitemap.xml, robots.txt
 * ==================================================================== */
(function build404() {
  let html = head({ title: '404 - ไม่พบหน้าที่คุณต้องการ | ' + SITE_NAME, description: 'ไม่พบหน้าที่คุณต้องการ กลับสู่หน้าแรกเพื่อดูโปรเน็ตเสริมทุกค่าย', canonicalPath: '/404.html' });
  html += header();
  html += `<section class="section"><div class="container" style="text-align:center;padding-block:60px">
<div class="page-art" style="max-width:640px;margin:0 auto 26px" aria-hidden="true">${pageArt({ tone: 'brand', big: '404', label: 'ไม่พบหน้าที่ต้องการ', motif: I.search, stat1: 'กลับหน้าแรกได้เลย', stat2: 'หรือเลือกจากเมนูลัดด้านล่าง' })}</div>
<h1 style="font-size:64px;font-weight:800;color:var(--green-700)">404</h1>
<p style="font-size:20px;font-weight:700;margin-top:8px">ไม่พบหน้าที่คุณต้องการ</p>
<p style="color:var(--muted);margin-top:6px">หน้าที่คุณเปิดอาจถูกย้ายหรือลบไปแล้ว ลองเลือกจากเมนูลัดด้านล่าง</p>
<div style="margin-top:22px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
  <a class="btn-hero" style="margin-top:0" href="/">กลับหน้าแรก</a>
  <a class="btn-outline" href="/ais.html">โปรเน็ต AIS</a>
  <a class="btn-outline" href="/true-dtac.html">โปรทรูดีแทค</a>
</div></div></section>`;
  html += footer();
  write('404.html', html);
})();

(function buildSitemapRobots() {
  const urls = [
    '/', '/ais.html', '/ais/1daypack.html', '/ais/2daypack.html', '/ais/3daypack.html', '/ais/7daypack.html', '/ais/30daypack.html',
    '/true-dtac.html', '/true-dtac/7daypack.html', '/true-dtac/30daypack.html',
    '/compare-networks.html', '/faq.html', '/check-number-balance.html', '/about.html',
    '/articles/how-to-register.html', '/articles/faq-ais.html', '/articles/5g-phones.html', '/articles/sim-cards.html', '/articles/net-speed-explained.html', '/articles/ber-mongkol.html',
    ...EXTRA_URLS,
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${DOMAIN}${u}</loc><lastmod>${TODAY_ISO}</lastmod><priority>${u === '/' ? '1.00' : '0.80'}</priority></url>`).join('\n')}
</urlset>
`;
  write('sitemap.xml', xml);
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);
})();

console.log('\nBuild เสร็จสมบูรณ์');
