import { describe, expect, it } from 'vitest';
import { useTranslations } from '../src/lib/i18n';

describe('i18n', () => {
  const t = useTranslations('de');

  it('resolves nested keys', () => {
    expect(t('nav.home')).toBe('Startseite');
    expect(t('notFound.backHome')).toBe('Zur Startseite');
  });

  it('throws on missing keys instead of rendering blanks', () => {
    expect(() => t('nav.doesNotExist')).toThrow(/Missing i18n key/);
  });
});
