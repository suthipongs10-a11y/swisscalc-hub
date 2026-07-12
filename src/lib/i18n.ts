import de from '../i18n/de.json';

/**
 * CLAUDE.md: no hardcoded UI copy in components — all strings live in
 * /src/i18n/*.json. Only German exists today; the locale parameter is the
 * plumbing for /fr/ and /en/ (SEO_SPEC §2).
 */
const locales = { de } as const;

export type Locale = keyof typeof locales;

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
