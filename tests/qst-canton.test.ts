import { describe, expect, it } from 'vitest';
import cantonRegistry from '../src/data/cantons.json';
import { CANTON_QST_CONTENT } from '../src/lib/cantonQstContent';
import { CANTON_QST_CONTENT_FR } from '../src/lib/cantonQstContentFr';
import { CANTON_QST_CONTENT_EN } from '../src/lib/cantonQstContentEn';
import { QST_ANNUAL_MODEL } from '../src/lib/qst/cantons';
import { counterpartOf, alternatesFor } from '../src/lib/locales';
import { cantonSlugOf, frSlugOf, enSlugOf } from '../src/lib/tax/labels';

const ABBRS = cantonRegistry.cantons.map((c) => c.abbr);

describe('QST canton pages coverage (M11)', () => {
  it('every canton has DE/FR/EN QST editorial with a real intro + FAQ', () => {
    for (const abbr of ABBRS) {
      for (const [lang, table] of [
        ['de', CANTON_QST_CONTENT],
        ['fr', CANTON_QST_CONTENT_FR],
        ['en', CANTON_QST_CONTENT_EN],
      ] as const) {
        const ed = table[abbr];
        expect(ed, `${lang} ${abbr}`).toBeDefined();
        expect(ed.intro.length, `${lang} ${abbr} intro`).toBeGreaterThan(150);
        expect(ed.faq.q.length, `${lang} ${abbr} faq q`).toBeGreaterThan(10);
        expect(ed.faq.a.length, `${lang} ${abbr} faq a`).toBeGreaterThan(60);
      }
    }
  });

  it('the five annual-model cantons are exactly FR/GE/TI/VD/VS', () => {
    expect([...QST_ANNUAL_MODEL].sort()).toEqual(['FR', 'GE', 'TI', 'VD', 'VS']);
  });

  it('DE intros are individually written (no shared template)', () => {
    const heads = ABBRS.map((a) => CANTON_QST_CONTENT[a].intro.slice(0, 45));
    expect(new Set(heads).size).toBe(ABBRS.length);
  });

  it('every QST canton page is paired across all three locales', () => {
    for (const abbr of ABBRS) {
      const de = `/quellensteuer-rechner/${cantonSlugOf(abbr)}/`;
      expect(counterpartOf(de, 'fr')).toBe(`/fr/calculateur-impot-source/${frSlugOf(abbr)}/`);
      expect(counterpartOf(de, 'en')).toBe(`/en/withholding-tax-calculator/${enSlugOf(abbr)}/`);
      expect(alternatesFor(de)?.length).toBe(4);
    }
  });
});
