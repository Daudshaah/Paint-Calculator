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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-14x14-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-14x14-room`;
  return {
    title: 'How Much Paint for a 14x14 Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a 14x14 room. Accurate estimates in gallons and litres. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 14x14 Room?',
      description: 'Find out exactly how much paint you need for a 14x14 room. Accurate estimates in gallons and litres. Free, no signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 14x14 Room?","item":"https://thepaintcalculator.com/how-much-paint-for-a-14x14-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons for a 14x14 room?","acceptedAnswer":{"@type":"Answer","text":"Plan for 2 gallons for two coats on the walls. Add 1 gallon for the ceiling, making the total 3 gallons for a complete room paint job."}},{"@type":"Question","name":"How many litres for a 14x14 room?","acceptedAnswer":{"@type":"Answer","text":"A 14x14 room needs 7.5 to 9.5 litres for two wall coats. A 5 litre tin plus a 2.5 litre tin is the most common and cost-effective purchase."}},{"@type":"Question","name":"Is one gallon enough for a 14x14 room?","acceptedAnswer":{"@type":"Answer","text":"No — one gallon is only enough for a single coat. Two coats (the standard for a professional finish) requires 2 gallons for a 14x14 room."}},{"@type":"Question","name":"What colours make a 14x14 room look bigger?","acceptedAnswer":{"@type":"Answer","text":"Light, cool tones like soft grey, pale blue, and off-white reflect more light and make the space feel airier and larger."}},{"@type":"Question","name":"How long does it take to paint a 14x14 room?","acceptedAnswer":{"@type":"Answer","text":"With proper prep, a 14x14 room takes 5 to 7 hours including two coats and drying time between coats."}},{"@type":"Question","name":"What finish for a 14x14 dining room?","acceptedAnswer":{"@type":"Answer","text":"Satin or eggshell are both appropriate for a dining room. Satin is easier to clean food marks and grease splatter. Eggshell looks more refined under formal dining lighting."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 14x14 Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 14x14 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 14x14 room needs approximately <strong>2 to 2.5 gallons</strong> (7.5 to 9.5 litres) for two coats on the walls. Enter your dimensions below for an exact result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 2.5 gallons (7.5 to 9.5 litres)</p>
          <p className="text-sm opacity-90">For a 14x14 room with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 14x14 Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 14x14 room with 8ft ceilings has 448 square feet of gross wall area. After deducting a door and two windows, the paintable wall area is approximately 393 square feet. At 400 square feet per gallon and two coats, that equals about 1.97 gallons — buy 2 gallons and you will have a comfortable amount for touch-ups.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The 14x14 ceiling is 196 square feet. One gallon of ceiling paint covers two coats of the ceiling perfectly.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a 14x14 room needs 7.5 to 9.5 litres for two wall coats. A 5 litre tin plus a 2.5 litre tin or two 5 litre tins are both appropriate purchases.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">14x14 Room Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls only</td><td className="px-4 py-3 text-gray-700">~1.1 gal</td><td className="px-4 py-3 text-gray-700">~2.2 gal</td><td className="px-4 py-3 text-gray-700">~8.3 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling only</td><td className="px-4 py-3 text-gray-700">~0.5 gal</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~3.8 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls + ceiling</td><td className="px-4 py-3 text-gray-700">~1.6 gal</td><td className="px-4 py-3 text-gray-700">~3.2 gal</td><td className="px-4 py-3 text-gray-700">~12.1 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Trim & baseboards</td><td className="px-4 py-3 text-gray-700">~0.3 gal</td><td className="px-4 py-3 text-gray-700">~0.6 gal</td><td className="px-4 py-3 text-gray-700">~2.3 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 14x14 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Two gallons is the right buy</strong> for wall-only painting in a 14x14 room. Add one gallon for the ceiling.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Light, cool tones</strong> like soft grey, pale blue, or warm off-white make a 14x14 room feel more open and airy.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use 9-inch rollers with a 3/8 inch nap</strong> for smooth walls — they are the fastest and most even for this room size.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply paint in natural daylight</strong> where possible to see coverage clearly and avoid missed patches.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Keep a wet edge</strong> at all times when rolling — do not let the edge of a rolled section dry before extending it, or lap marks will be visible.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-15x15-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 15x15 Room? →</Link></li>
            <li><Link href={`/${locale}/dining-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Dining Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons for">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a 14x14 room?</h3>
              <p className="text-gray-700">Plan for 2 gallons for two coats on the walls. Add 1 gallon for the ceiling, making the total 3 gallons for a complete room paint job.</p>
            </div>
            <div key="How many litres for ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres for a 14x14 room?</h3>
              <p className="text-gray-700">A 14x14 room needs 7.5 to 9.5 litres for two wall coats. A 5 litre tin plus a 2.5 litre tin is the most common and cost-effective purchase.</p>
            </div>
            <div key="Is one gallon enough">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is one gallon enough for a 14x14 room?</h3>
              <p className="text-gray-700">No — one gallon is only enough for a single coat. Two coats (the standard for a professional finish) requires 2 gallons for a 14x14 room.</p>
            </div>
            <div key="What colours make a ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What colours make a 14x14 room look bigger?</h3>
              <p className="text-gray-700">Light, cool tones like soft grey, pale blue, and off-white reflect more light and make the space feel airier and larger.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 14x14 room?</h3>
              <p className="text-gray-700">With proper prep, a 14x14 room takes 5 to 7 hours including two coats and drying time between coats.</p>
            </div>
            <div key="What finish for a 14">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What finish for a 14x14 dining room?</h3>
              <p className="text-gray-700">Satin or eggshell are both appropriate for a dining room. Satin is easier to clean food marks and grease splatter. Eggshell looks more refined under formal dining lighting.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
