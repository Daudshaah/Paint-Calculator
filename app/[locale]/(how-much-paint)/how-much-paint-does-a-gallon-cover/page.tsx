import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const canonical =
    locale === defaultLocale
      ? 'https://thepaintcalculator.com/how-much-paint-does-a-gallon-cover'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-does-a-gallon-cover`;
  return {
    title: 'How Much Does a Gallon of Paint Cover? | ThePaintCalculator.com',
    description: 'Find out exactly how much a gallon of paint covers. Coverage rates for interior walls, ceilings, exterior, and specialty surfaces in sq ft and sq metres.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Does a Gallon of Paint Cover?',
      description: 'Find out exactly how much a gallon of paint covers. Coverage rates for interior walls, ceilings, exterior, and specialty surfaces in sq ft and sq metres.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function HowMuchPaintGallonCovers({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Does a Gallon Cover?","item":"https://thepaintcalculator.com/how-much-paint-does-a-gallon-cover"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many square feet does a gallon of paint cover?","acceptedAnswer":{"@type":"Answer","text":"A gallon of standard interior paint covers 350 to 400 square feet on smooth walls per coat. Coverage is lower on textured walls, bare drywall, or porous surfaces."}},{"@type":"Question","name":"How much does a gallon of exterior paint cover?","acceptedAnswer":{"@type":"Answer","text":"Exterior paint covers 300 to 400 sq ft per gallon on smooth siding. Rough surfaces like stucco and brick absorb significantly more — only 100–200 sq ft per gallon."}},{"@type":"Question","name":"How much does a quart of paint cover?","acceptedAnswer":{"@type":"Answer","text":"A quart (0.25 gallon) covers approximately 87 to 100 square feet — about one wall of an average room. Quarts are ideal for accent walls, trim, or small spaces."}},{"@type":"Question","name":"Does paint quality affect coverage?","acceptedAnswer":{"@type":"Answer","text":"Yes — premium paints contain more pigment and binder and typically cover 400–450 sq ft per gallon. Budget paints often cover only 300–350 sq ft per gallon."}},{"@type":"Question","name":"How much does a litre of paint cover?","acceptedAnswer":{"@type":"Answer","text":"A litre of standard interior paint covers 9 to 11 square metres (95 to 118 sq ft) per coat on smooth walls."}},{"@type":"Question","name":"Why does my paint not cover as much as the tin says?","acceptedAnswer":{"@type":"Answer","text":"Tin coverage rates are measured on smooth, previously painted surfaces under ideal lab conditions. Real coverage is lower due to surface texture, porosity, application technique, and waste."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"How Much Does a Gallon of Paint Cover?","description":"Complete guide to paint coverage per gallon across all surface types, finishes, and paint quality levels.","url":"https://thepaintcalculator.com/how-much-paint-does-a-gallon-cover","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Does a Gallon Cover?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Does a Gallon of Paint Cover?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard gallon of interior paint covers <strong>350 to 400 square feet per coat</strong> on smooth walls. Coverage is lower on textured surfaces, bare drywall, and porous masonry. Premium paints cover slightly more. Budget paints cover less.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">350 to 400 sq ft per gallon on smooth interior walls</p>
          <p className="text-sm opacity-90">Coverage varies by surface type, texture, and paint quality</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Coverage Per Gallon by Surface Type</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Surface Type</th>
                <th className="px-4 py-3 text-left font-semibold">Coverage Per Gallon</th>
                <th className="px-4 py-3 text-left font-semibold">Notes</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Smooth interior walls</td><td className="px-4 py-3 text-gray-700">350–400 sq ft</td><td className="px-4 py-3 text-gray-700">Standard coverage</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Lightly textured walls</td><td className="px-4 py-3 text-gray-700">300–350 sq ft</td><td className="px-4 py-3 text-gray-700">Orange peel texture</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Heavy knockdown/popcorn</td><td className="px-4 py-3 text-gray-700">200–250 sq ft</td><td className="px-4 py-3 text-gray-700">Rough texture absorbs more</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">New/bare drywall</td><td className="px-4 py-3 text-gray-700">250–300 sq ft</td><td className="px-4 py-3 text-gray-700">Primer recommended</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Exterior smooth siding</td><td className="px-4 py-3 text-gray-700">300–400 sq ft</td><td className="px-4 py-3 text-gray-700">Good surface condition</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Brick (unpainted)</td><td className="px-4 py-3 text-gray-700">100–150 sq ft</td><td className="px-4 py-3 text-gray-700">Very high absorption</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Stucco</td><td className="px-4 py-3 text-gray-700">100–200 sq ft</td><td className="px-4 py-3 text-gray-700">Highly porous</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Coverage Varies So Much</h2>
          <p className="text-gray-700 leading-relaxed mb-4">The stated coverage rate on a paint tin (typically 400 sq ft per gallon) is calculated on a smooth, previously painted surface under ideal conditions. Real-world coverage is almost always lower because of surface texture, porosity, application method, and the skill of the painter.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A brush applies paint less efficiently than a roller — using a brush throughout rather than a roller on large areas can reduce effective coverage by 15–20%. An airless sprayer, when set up correctly, can match or slightly exceed roller coverage but generates significant overspray waste.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Does a Litre of Paint Cover?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">In metric measurements, a litre of standard interior paint covers approximately <strong>9 to 11 square metres per coat</strong> (95 to 118 sq ft). A 5 litre tin covers approximately 45 to 55 square metres — roughly the walls of an average 12×14 bedroom with 8ft ceilings.</p>
          <p className="text-gray-700 leading-relaxed mb-4">UK and European paint tins are labelled in litres. Use the calculator above to get precise estimates in both litres and gallons for any room size.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-to-cover-500-sq-ft`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint to Cover 500 Sq Ft? →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many square feet does a gallon of paint cover?</h3>
              <p className="text-gray-700">A gallon of standard interior paint covers 350 to 400 square feet on smooth walls per coat. Coverage is lower on textured walls, bare drywall, or porous surfaces.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does a gallon of exterior paint cover?</h3>
              <p className="text-gray-700">Exterior paint covers 300 to 400 sq ft per gallon on smooth siding. Rough surfaces like stucco and brick absorb significantly more — only 100–200 sq ft per gallon.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does a quart of paint cover?</h3>
              <p className="text-gray-700">A quart (0.25 gallon) covers approximately 87 to 100 square feet — about one wall of an average room. Quarts are ideal for accent walls, trim, or small spaces.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does paint quality affect coverage?</h3>
              <p className="text-gray-700">Yes — premium paints contain more pigment and binder and typically cover 400–450 sq ft per gallon. Budget paints often cover only 300–350 sq ft per gallon.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does a litre of paint cover?</h3>
              <p className="text-gray-700">A litre of standard interior paint covers 9 to 11 square metres (95 to 118 sq ft) per coat on smooth walls.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does my paint not cover as much as the tin says?</h3>
              <p className="text-gray-700">Tin coverage rates are measured on smooth, previously painted surfaces under ideal lab conditions. Real coverage is lower due to surface texture, porosity, application technique, and waste.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
