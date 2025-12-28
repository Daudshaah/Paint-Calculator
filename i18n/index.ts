import { Locale } from './config';
import en from './translations/en.json';
import es from './translations/es.json';
import pt from './translations/pt.json';
import fr from './translations/fr.json';
import de from './translations/de.json';
import it from './translations/it.json';
import nl from './translations/nl.json';

const translations = {
  en,
  es,
  pt,
  fr,
  de,
  it,
  nl,
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

export type TranslationKey = keyof typeof en;
