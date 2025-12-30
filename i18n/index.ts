import { defaultLocale, Locale } from './config';
import en from './translations/en.json';
import es from './translations/es.json';

const translations = {
  en,
  es,
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export type TranslationKey = keyof typeof en;
