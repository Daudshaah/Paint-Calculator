import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-1000-sq-ft-house'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-1000-sq-ft-house`;
  return {
    title: 'How Much Paint for a 1000 Sq Ft House? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a 1000 sq ft house. Interior and exterior estimates in gallons and litres. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 1000 Sq Ft House?',
      description: 'Calculate exactly how much paint you need for a 1000 sq ft house. Interior and exterior estimates in gallons and litres. Free, no signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 1000 Sq Ft House?","item":"https://thepaintcalculator.com/how-much-paint-for-a-1000-sq-ft-house"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons of paint for a 1000 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Budget 10 to 13 gallons for a complete interior including walls, ceilings, and trim. The exterior requires 6 to 8 gallons depending on siding type."}},{"@type":"Question","name":"Can I paint a 1000 sq ft house in a weekend?","acceptedAnswer":{"@type":"Answer","text":"Yes — with prep done on Friday evening, two people can complete a 1000 sq ft interior over a full weekend."}},{"@type":"Question","name":"How much does it cost to paint a 1000 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Paint costs $200 to $450 for a complete interior. Professional painters charge $1,000 to $2,500 for the full interior of a 1000 sq ft home."}},{"@type":"Question","name":"Should I use 1-gallon or 5-gallon containers?","acceptedAnswer":{"@type":"Answer","text":"If you need 5 or more gallons of the same colour, a 5-gallon bucket costs less per gallon and guarantees colour batch consistency across all rooms."}},{"@type":"Question","name":"How much primer for a 1000 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"If walls are in good condition, use paint-and-primer-in-one and skip separate primer. For new drywall or major colour changes, budget 3 to 4 gallons of primer."}},{"@type":"Question","name":"How long does it take to paint a 1000 sq ft house interior?","acceptedAnswer":{"@type":"Answer","text":"A solo painter takes 3 to 4 days. Two people working together can finish in a full weekend with an early start each day."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 1000 Sq Ft House?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 1000 Sq Ft House?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 1000 sq ft house needs approximately <strong>6 to 8 gallons</strong> (22 to 30 litres) for interior walls with two coats. Add 3 gallons for ceilings and 1 to 2 gallons for trim.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">6 to 8 gallons interior (22 to 30 litres)</p>
          <p className="text-sm opacity-90">For interior walls of a 1000 sq ft house — two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 1000 Sq Ft House Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 1000 sq ft home has approximately 2,000 to 2,500 sq ft of interior wall area when accounting for all rooms and ceiling heights. At 400 sq ft per gallon and two coats, the walls need 10 to 12.5 gallon-coats — or 6 to 8 gallons including waste.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Add 2 to 3 gallons for ceilings and 1 to 2 gallons for interior trim, bringing the complete interior total to 10 to 13 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Most people can paint the interior of a 1000 sq ft home in a weekend with proper planning — it is one of the most manageable whole-home paint projects.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1000 Sq Ft House Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Area</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior walls</td><td className="px-4 py-3 text-gray-700">3–4 gal</td><td className="px-4 py-3 text-gray-700">6–8 gal</td><td className="px-4 py-3 text-gray-700">22–30 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceilings</td><td className="px-4 py-3 text-gray-700">1.25 gal</td><td className="px-4 py-3 text-gray-700">2.5 gal</td><td className="px-4 py-3 text-gray-700">~9.5 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior trim</td><td className="px-4 py-3 text-gray-700">0.5–1 gal</td><td className="px-4 py-3 text-gray-700">1–2 gal</td><td className="px-4 py-3 text-gray-700">3.8–7.5 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Exterior walls</td><td className="px-4 py-3 text-gray-700">2.5–3.5 gal</td><td className="px-4 py-3 text-gray-700">5–7 gal</td><td className="px-4 py-3 text-gray-700">19–26 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Exterior trim</td><td className="px-4 py-3 text-gray-700">0.5 gal</td><td className="px-4 py-3 text-gray-700">1 gal</td><td className="px-4 py-3 text-gray-700">~3.8 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 1000 Sq Ft House</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>A 1000 sq ft home can be painted in a weekend</strong> with two people — prep Friday evening, paint Saturday and Sunday.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy a 5-gallon bucket</strong> for the main wall colour if all rooms are the same colour — it is more economical and ensures consistency.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Complete one room at a time</strong> including ceilings, walls, and trim before moving to the next.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Keep windows open</strong> throughout to ventilate properly — a 1000 sq ft home fills with fumes quickly when multiple rooms are being painted.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Budget 10% extra paint</strong> for touch-ups and overages — it is always cheaper to have slightly too much than to run short mid-wall.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-1500-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 1500 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 2000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Interior of House? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons of ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a 1000 sq ft house?</h3>
              <p className="text-gray-700">Budget 10 to 13 gallons for a complete interior including walls, ceilings, and trim. The exterior requires 6 to 8 gallons depending on siding type.</p>
            </div>
            <div key="Can I paint a 1000 s">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint a 1000 sq ft house in a weekend?</h3>
              <p className="text-gray-700">Yes — with prep done on Friday evening, two people can complete a 1000 sq ft interior over a full weekend.</p>
            </div>
            <div key="How much does it cos">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a 1000 sq ft house?</h3>
              <p className="text-gray-700">Paint costs $200 to $450 for a complete interior. Professional painters charge $1,000 to $2,500 for the full interior of a 1000 sq ft home.</p>
            </div>
            <div key="Should I use 1-gallo">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I use 1-gallon or 5-gallon containers?</h3>
              <p className="text-gray-700">If you need 5 or more gallons of the same colour, a 5-gallon bucket costs less per gallon and guarantees colour batch consistency across all rooms.</p>
            </div>
            <div key="How much primer for ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much primer for a 1000 sq ft house?</h3>
              <p className="text-gray-700">If walls are in good condition, use paint-and-primer-in-one and skip separate primer. For new drywall or major colour changes, budget 3 to 4 gallons of primer.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 1000 sq ft house interior?</h3>
              <p className="text-gray-700">A solo painter takes 3 to 4 days. Two people working together can finish in a full weekend with an early start each day.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
