# Deployment — Cloudflare Pages

The site is a fully static Astro build. No adapter, no server, no secrets. Cloudflare Pages serves `dist/` directly and rebuilds on every push (Git integration).

Repo is deploy-ready: `.node-version` pins Node 22, `public/_headers` sets caching + security headers, `public/_redirects` handles www→apex, sitemap/robots are generated into `dist/`.

## One-time setup (Cloudflare dashboard, ~5 min)

1. **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.**
2. Authorize GitHub, select **`suthipongs10-a11y/swisscalc-hub`**.
3. **Production branch:** `claude/swisscalc-hub-research-p2dt2p` (it is the repo's default branch, so it should be preselected).
4. **Build settings:**
   - Framework preset: **Astro** (or *None* — both work)
   - Build command: **`npm run build`**
   - Build output directory: **`dist`**
   - (Node 22 is picked up automatically from `.node-version`.)
5. **Save and Deploy.** First build gives you a `https://<project>.pages.dev` URL — verify the site loads there.

## Custom domain

6. In the Pages project → **Custom domains → Set up a domain** → add **`calcswiss.ch`**, then add **`www.calcswiss.ch`**.
   - If calcswiss.ch's DNS is on Cloudflare, records are added automatically.
   - The `_redirects` file already 301s `www` → apex once both are attached.
7. Wait for the certificate to issue (usually minutes). Confirm `https://calcswiss.ch/` loads.

## Make it count for SEO (do right after the domain is live)

8. **Enable Web Analytics:** Pages project → Metrics/Analytics → enable **Web Analytics** (cookieless, matches the privacy policy — no code change needed).
9. **Google Search Console:** add property `https://calcswiss.ch`, verify (DNS TXT via Cloudflare is easiest), then submit the sitemap: `https://calcswiss.ch/sitemap-index.xml`.
10. **Bing Webmaster Tools:** add the site, submit the same sitemap. Enable **IndexNow** in Cloudflare (Pages/domain settings) for instant crawl pings.
11. Request indexing in GSC for the key pages: `/`, `/brutto-netto-rechner/`, `/steuervergleich/`, `/saeule-3a-rechner/`.

## Before you promote it publicly

- **Fill the Impressum** (`src/pages/impressum.astro`) and controller details in `src/pages/datenschutz.astro` — required under nFADP. Commit → auto-redeploys.
- **Spot-check ~5 tax results** against `swisstaxcalculator.estv.admin.ch` (e.g. 100k single ZH/ZG/VS, 100k married ZH) — see STATUS.md caveat.

## Ongoing

- Every push to the production branch triggers a rebuild + deploy automatically.
- Data refreshes follow `docs/data-refresh-runbook.md`.
- If `astro check` ever blocks a deploy on a type warning, the build command can be simplified to `astro build` (tests + check still run in GitHub CI).
