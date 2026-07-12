// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// SEO_SPEC §1: apex domain, trailing slash always, one canonical form.
export default defineConfig({
  site: 'https://calcswiss.ch',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
