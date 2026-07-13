import { describe, expect, it } from 'vitest';
import cantonRegistry from '../src/data/cantons.json';
import { CANTON_CONTENT_EN } from '../src/lib/cantonContentEn';
import { enName, enSlugOf, enGenitive } from '../src/lib/tax/labels';
import { counterpartOf, alternatesFor } from '../src/lib/locales';

const ABBRS = cantonRegistry.cantons.map((c) => c.abbr);

describe('English canton coverage (M8)', () => {
  it('every canton has an English name, slug, genitive and editorial', () => {
    for (const abbr of ABBRS) {
      expect(enName(abbr), `${abbr} name`).not.toBe(abbr);
      expect(enSlugOf(abbr), `${abbr} slug`).toMatch(/^[a-z][a-z-]+$/);
      expect(enGenitive(abbr), `${abbr} genitive`).toMatch(/^of /);
      const ed = CANTON_CONTENT_EN[abbr];
      expect(ed, `${abbr} editorial`).toBeDefined();
      expect(ed.intro.length, `${abbr} intro`).toBeGreaterThan(200);
      expect(ed.faq.q.length, `${abbr} faq q`).toBeGreaterThan(10);
      expect(ed.faq.a.length, `${abbr} faq a`).toBeGreaterThan(60);
    }
  });

  it('English slugs are unique', () => {
    const slugs = ABBRS.map((a) => enSlugOf(a));
    expect(new Set(slugs).size).toBe(ABBRS.length);
  });

  it('every canton page is paired across all three locales', () => {
    for (const abbr of ABBRS) {
      const en = `/en/tax-calculator/${enSlugOf(abbr)}/`;
      expect(counterpartOf(en, 'de'), `de counterpart for ${abbr}`).toMatch(/^\/steuerrechner\/[a-z-]+\/$/);
      expect(counterpartOf(en, 'fr'), `fr counterpart for ${abbr}`).toMatch(/^\/fr\/calculateur-impots\/[a-z-]+\/$/);
      const alts = alternatesFor(en);
      // de-CH, fr-CH, en-CH + x-default
      expect(alts?.length, `hreflang count for ${abbr}`).toBe(4);
    }
  });

  it('editorial intros are individually written (no shared template)', () => {
    const heads = ABBRS.map((a) => CANTON_CONTENT_EN[a].intro.slice(0, 40));
    expect(new Set(heads).size).toBe(ABBRS.length);
  });
});
