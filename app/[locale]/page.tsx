import { Suspense } from 'react';
import PaintCalculatorClient from './PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export default async function PaintCalculator({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center"><div className="text-gray-600">Loading...</div></div>}>
      <PaintCalculatorClient locale={locale} />
    </Suspense>
  );
}
