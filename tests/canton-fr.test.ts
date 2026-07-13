import { describe, expect, it } from 'vitest';
import cantonRegistry from '../src/data/cantons.json';
import { CANTON_CONTENT_FR } from '../src/lib/cantonContentFr';
import { frName, frSlugOf, frGenitive } from '../src/lib/tax/labels';
import { PAGE_PAIRS } from '../src/lib/locales';

const ABBRS = cantonRegistry.cantons.map((c) => c.abbr);

describe('French canton coverage (M6)', () => {
  it('every canton has a French name, slug, genitive and editorial', () => {
    for (const abbr of ABBRS) {
      expect(frName(abbr), `${abbr} name`).not.toBe(abbr);
      expect(frSlugOf(abbr), `${abbr} slug`).toMatch(/^[a-z][a-z-]+$/);
      expect(frGenitive(abbr), `${abbr} genitive`).toMatch(/^(de|du|des|d’|d')\s?/);
      const ed = CANTON_CONTENT_FR[abbr];
      expect(ed, `${abbr} editorial`).toBeDefined();
      expect(ed.intro.length, `${abbr} intro`).toBeGreaterThan(200);
      expect(ed.faq.q.length, `${abbr} faq q`).toBeGreaterThan(10);
      expect(ed.faq.a.length, `${abbr} faq a`).toBeGreaterThan(60);
    }
  });

  it('French slugs are unique', () => {
    const slugs = ABBRS.map((a) => frSlugOf(a));
    expect(new Set(slugs).size).toBe(ABBRS.length);
  });

  it('PAGE_PAIRS pairs every canton page in both locales', () => {
    for (const abbr of ABBRS) {
      const fr = `/fr/calculateur-impots/${frSlugOf(abbr)}/`;
      const pair = PAGE_PAIRS.find((p) => p.fr === fr);
      expect(pair, `pair for ${abbr}`).toBeDefined();
      expect(pair!.de).toMatch(/^\/steuerrechner\/[a-z-]+\/$/);
    }
  });

  it('editorial intros are individually written (no shared template)', () => {
    // Anti-doorway guard: the first 40 chars of each intro must be distinct.
    const heads = ABBRS.map((a) => CANTON_CONTENT_FR[a].intro.slice(0, 40));
    expect(new Set(heads).size).toBe(ABBRS.length);
  });
});
