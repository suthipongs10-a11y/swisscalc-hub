import de from '../i18n/de.json';
import fr from '../i18n/fr.json';
import en from '../i18n/en.json';
import type { Locale } from './locales';

/**
 * CLAUDE.md: no hardcoded UI copy in components — all strings live in
 * /src/i18n/*.json. German is the launch locale; French + English ship under
 * /fr/ and /en/.
 */
const locales = { de, fr, en } as const;

export function useTranslations(locale: Locale = 'de') {
  const table = locales[locale];
  return function t(key: string): string {
    const value = key
      .split('.')
      .reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part as never], table);
    if (typeof value !== 'string') throw new Error(`Missing i18n key "${key}" for locale "${locale}"`);
    return value;
  };
}
