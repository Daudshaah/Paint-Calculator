export const locales = ['en', 'ur', 'hi'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ur: 'اردو',
  hi: 'हिन्दी',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  ur: '🇵🇰',
  hi: '🇮🇳',
};

