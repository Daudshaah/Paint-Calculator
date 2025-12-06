import { Locale } from './config';
import en from './translations/en.json';
import ur from './translations/ur.json';
import hi from './translations/hi.json';

const translations = {
  en,
  ur,
  hi,
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

export type TranslationKey = keyof typeof en;

