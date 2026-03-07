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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-15x15-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-15x15-room`;
  return {
    title: 'How Much Paint for a 15x15 Room? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a 15x15 room. Free estimates in gallons and litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 15x15 Room?',
      description: 'Calculate exactly how much paint you need for a 15x15 room. Free estimates in gallons and litres. No signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 15x15 Room?","item":"https://thepaintcalculator.com/how-much-paint-for-a-15x15-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons for a 15x15 room?","acceptedAnswer":{"@type":"Answer","text":"Buy 2.5 gallons for two coats on the walls. Add another gallon if you are also painting the ceiling, bringing the total to 3.5 gallons."}},{"@type":"Question","name":"Is 2 gallons enough for a 15x15 room?","acceptedAnswer":{"@type":"Answer","text":"2 gallons is just enough for one coat on the walls. For two coats (recommended), you need 2.5 gallons minimum."}},{"@type":"Question","name":"How many litres for a 15x15 room?","acceptedAnswer":{"@type":"Answer","text":"A 15x15 room needs 8 to 10 litres for two wall coats. Two 5 litre tins is the most straightforward purchase for this room size."}},{"@type":"Question","name":"How much paint for an accent wall in a 15x15 room?","acceptedAnswer":{"@type":"Answer","text":"A 15ft accent wall at 8ft ceiling height is 120 sq ft. You need about 0.6 gallon for two coats — one quart is enough if your paint has good coverage."}},{"@type":"Question","name":"How long does it take to paint a 15x15 room?","acceptedAnswer":{"@type":"Answer","text":"Plan for 6 to 8 hours for two wall coats plus prep. Adding the ceiling adds another 1.5 to 2 hours."}},{"@type":"Question","name":"What finish for a 15x15 living room or bedroom?","acceptedAnswer":{"@type":"Answer","text":"Eggshell for bedrooms and formal living rooms. Satin for living rooms with children, pets, or heavy use. Both clean easily and look professional."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 15x15 Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 15x15 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 15x15 room needs approximately <strong>2 to 3 gallons</strong> (7.5 to 11.5 litres) for two coats on the walls. Enter your dimensions below for an exact estimate.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 3 gallons (7.5 to 11.5 litres)</p>
          <p className="text-sm opacity-90">For a 15x15 room with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 15x15 Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 15x15 room with 8ft ceilings has 480 square feet of gross wall area. After deducting a door and two windows, the paintable wall area is approximately 425 square feet. At 400 square feet per gallon and two coats, that equals about 2.1 gallons — buy 2.5 gallons (two gallons plus a quart) to be safe.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The 15x15 ceiling is 225 square feet. One gallon of ceiling paint is enough for two ceiling coats with some remaining.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a 15x15 room needs 8 to 10 litres for two wall coats. Two 5 litre tins is the cleanest purchase for this size room.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">15x15 Room Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls only</td><td className="px-4 py-3 text-gray-700">~1.2 gal</td><td className="px-4 py-3 text-gray-700">~2.4 gal</td><td className="px-4 py-3 text-gray-700">~9.1 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling only</td><td className="px-4 py-3 text-gray-700">~0.56 gal</td><td className="px-4 py-3 text-gray-700">~1.1 gal</td><td className="px-4 py-3 text-gray-700">~4.2 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls + ceiling</td><td className="px-4 py-3 text-gray-700">~1.76 gal</td><td className="px-4 py-3 text-gray-700">~3.5 gal</td><td className="px-4 py-3 text-gray-700">~13.2 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Accent wall only</td><td className="px-4 py-3 text-gray-700">~0.3 gal</td><td className="px-4 py-3 text-gray-700">~0.6 gal</td><td className="px-4 py-3 text-gray-700">~2.3 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 15x15 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy 2.5 gallons minimum</strong> for two wall coats — two gallons alone will leave you just short in a 15x15 room.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>A 15x15 room is a comfortable size for an accent wall</strong> — one bold wall uses about 0.6 gallon for two coats, while the remaining three walls use about 1.8 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Mix all paint in a single bucket</strong> if using multiple cans of the same colour — this is called boxing and ensures consistent colour throughout the room.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use an extension pole</strong> on your roller to work efficiently without constantly moving a step ladder.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Plan your paint order:</strong> ceiling first, then the accent wall if applicable, then the remaining walls, and trim last.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-14x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 14x14 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Living Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons for">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a 15x15 room?</h3>
              <p className="text-gray-700">Buy 2.5 gallons for two coats on the walls. Add another gallon if you are also painting the ceiling, bringing the total to 3.5 gallons.</p>
            </div>
            <div key="Is 2 gallons enough ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is 2 gallons enough for a 15x15 room?</h3>
              <p className="text-gray-700">2 gallons is just enough for one coat on the walls. For two coats (recommended), you need 2.5 gallons minimum.</p>
            </div>
            <div key="How many litres for ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres for a 15x15 room?</h3>
              <p className="text-gray-700">A 15x15 room needs 8 to 10 litres for two wall coats. Two 5 litre tins is the most straightforward purchase for this room size.</p>
            </div>
            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for an accent wall in a 15x15 room?</h3>
              <p className="text-gray-700">A 15ft accent wall at 8ft ceiling height is 120 sq ft. You need about 0.6 gallon for two coats — one quart is enough if your paint has good coverage.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 15x15 room?</h3>
              <p className="text-gray-700">Plan for 6 to 8 hours for two wall coats plus prep. Adding the ceiling adds another 1.5 to 2 hours.</p>
            </div>
            <div key="What finish for a 15">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What finish for a 15x15 living room or bedroom?</h3>
              <p className="text-gray-700">Eggshell for bedrooms and formal living rooms. Satin for living rooms with children, pets, or heavy use. Both clean easily and look professional.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
