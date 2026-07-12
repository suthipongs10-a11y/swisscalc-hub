/**
 * Generates static OG images (SEO_SPEC §6: static per page type, no runtime
 * image service). Output is committed to /public/. Re-run only when the
 * design or SITE_YEAR changes: `node scripts/generate-og.mjs`
 *
 * Uses the preinstalled Chromium (PLAYWRIGHT_BROWSERS_PATH) — do not run
 * "playwright install".
 */
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const EXECUTABLE = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; flex-direction: column;
    justify-content: center; padding: 80px;
    background: linear-gradient(135deg, #0f4c81 0%, #0a3357 100%);
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; color: #fff;
  }
  .logo { display: flex; align-items: center; gap: 18px; margin-bottom: 48px; }
  .mark { width: 72px; height: 72px; border-radius: 16px; background: #fff;
    display: flex; flex-direction: column; justify-content: center; gap: 7px; padding: 0 16px; }
  .mark span { display: block; height: 8px; border-radius: 4px; background: #0f4c81; }
  .mark span:last-child { width: 55%; background: #7fb3d5; }
  .brand { font-size: 44px; font-weight: 800; letter-spacing: -0.5px; }
  h1 { font-size: 62px; font-weight: 800; line-height: 1.15; letter-spacing: -1px; max-width: 950px; }
  p { margin-top: 28px; font-size: 30px; color: #b8d4ea; }
</style></head>
<body>
  <div class="logo">
    <div class="mark"><span></span><span></span><span></span></div>
    <div class="brand">CalcSwiss</div>
  </div>
  <h1>Steuer- und Finanzrechner für die Schweiz</h1>
  <p>Kostenlos · werbefrei · alle 26 Kantone · offizielle Quellen</p>
</body></html>`;

const browser = await chromium.launch({ executablePath: EXECUTABLE });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
const png = await page.screenshot({ type: 'png' });
writeFileSync('public/og-default.png', png);
await browser.close();
console.log(`public/og-default.png written (${(png.length / 1024).toFixed(0)} KB)`);
