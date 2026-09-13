/**
 * Generates the brand assets needed for external profiles and directory
 * listings (backlink Tier A): square avatar, horizontal wordmark, and the
 * two social cover formats. Output is committed to /public/brand/ so the
 * files also have stable public URLs for forms that ask for a logo URL
 * instead of an upload.
 *
 * Re-run only when the brand design changes: `node scripts/generate-brand-assets.mjs`
 *
 * Uses the preinstalled Chromium (PLAYWRIGHT_BROWSERS_PATH) — do not run
 * "playwright install".
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const EXECUTABLE = process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT_DIR = new URL('../public/brand/', import.meta.url);

const NAVY = '#0f4c81';
const NAVY_DARK = '#0a3357';
const LIGHT = '#7fb3d5';

const base = `
  * { margin: 0; box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
  .mark { background: #fff; display: flex; flex-direction: column; justify-content: center; }
  .mark span { display: block; background: ${NAVY}; }
  .mark span:last-child { background: ${LIGHT}; }
`;

/** Bar mark, sized relative to its box. */
const mark = (size) => {
  const radius = size * 0.22;
  const barH = size * 0.115;
  const gap = size * 0.1;
  const padX = size * 0.2;
  return `<div class="mark" style="width:${size}px;height:${size}px;border-radius:${radius}px;gap:${gap}px;padding:0 ${padX}px">
    <span style="height:${barH}px;border-radius:${barH / 2}px"></span>
    <span style="height:${barH}px;border-radius:${barH / 2}px"></span>
    <span style="height:${barH}px;border-radius:${barH / 2}px;width:55%"></span>
  </div>`;
};

// Avatar: LinkedIn logo (>=300x300) and X profile picture. X crops avatars to a
// circle, so the mark stays well inside the inscribed circle and carries no text.
const avatar = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  body { width: 1024px; height: 1024px; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DARK} 100%); }
</style></head><body>${mark(512)}</body></html>`;

// Horizontal wordmark on white, for directories and press use.
const wordmark = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  body { width: 1200px; height: 400px; display: flex; align-items: center; justify-content: center;
    gap: 44px; background: #fff; }
  .mark { box-shadow: inset 0 0 0 4px ${NAVY}; }
  .brand { font-size: 116px; font-weight: 800; letter-spacing: -2px; color: ${NAVY}; }
</style></head><body>${mark(200)}<div class="brand">CalcSwiss</div></body></html>`;

// X header. The avatar overlaps the lower-left corner, so content sits right of centre.
const bannerX = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  body { width: 1500px; height: 500px; display: flex; align-items: center; justify-content: flex-end;
    padding: 0 90px 0 380px; background: linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DARK} 100%); color: #fff; }
  .copy { text-align: right; }
  h1 { font-size: 60px; font-weight: 800; line-height: 1.15; letter-spacing: -1px; }
  p { margin-top: 22px; font-size: 30px; color: #b8d4ea; }
</style></head><body>
  <div class="copy">
    <h1>Steuer- und Lohnrechner<br />für die Schweiz</h1>
    <p>kostenlos · werbefrei · alle 26 Kantone · offizielle Quellen</p>
  </div>
</body></html>`;

// LinkedIn page cover. Short strip, so one centred line only.
const bannerLinkedIn = `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  body { width: 1128px; height: 191px; display: flex; align-items: center; justify-content: center;
    gap: 26px; background: linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DARK} 100%); color: #fff; }
  .copy { line-height: 1.3; }
  .headline { font-size: 34px; font-weight: 800; letter-spacing: -0.5px; }
  .sub { font-size: 19px; color: #b8d4ea; }
</style></head><body>
  ${mark(84)}
  <div class="copy">
    <div class="headline">Steuer- und Lohnrechner für die Schweiz</div>
    <div class="sub">kostenlos · werbefrei · alle 26 Kantone · offizielle Quellen</div>
  </div>
</body></html>`;

const assets = [
  { file: 'logo-avatar-1024.png', html: avatar, width: 1024, height: 1024 },
  { file: 'logo-wordmark-1200x400.png', html: wordmark, width: 1200, height: 400 },
  { file: 'banner-x-1500x500.png', html: bannerX, width: 1500, height: 500 },
  { file: 'banner-linkedin-1128x191.png', html: bannerLinkedIn, width: 1128, height: 191 },
];

mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch({ executablePath: EXECUTABLE });

for (const asset of assets) {
  const page = await browser.newPage({
    viewport: { width: asset.width, height: asset.height },
    deviceScaleFactor: 1,
  });
  await page.setContent(asset.html, { waitUntil: 'load' });
  await page.screenshot({ path: new URL(asset.file, OUT_DIR).pathname });
  await page.close();
  console.log(`wrote public/brand/${asset.file} (${asset.width}x${asset.height})`);
}

await browser.close();
