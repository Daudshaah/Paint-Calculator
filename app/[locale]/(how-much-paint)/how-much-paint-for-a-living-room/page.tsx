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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-living-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-living-room`;
  return {
    title: 'How Much Paint for a Living Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a living room. Free estimates for all living room sizes in gallons and litres.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Living Room?',
      description: 'Find out exactly how much paint you need for a living room. Free estimates for all living room sizes in gallons and litres.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Living Room?","item":"https://thepaintcalculator.com/how-much-paint-for-a-living-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons of paint for a living room?","acceptedAnswer":{"@type":"Answer","text":"A standard 15x20 living room needs about 3 gallons for two coats on the walls. A smaller 12x15 living room needs about 2 gallons. A large open-plan space needs 4 to 5 gallons."}},{"@type":"Question","name":"How many litres of paint for a living room?","acceptedAnswer":{"@type":"Answer","text":"A standard 15x20 living room needs 10 to 12 litres for two coats. Two 5 litre tins is the most common purchase. A small living room can be done with one 5 litre tin plus a 2.5 litre tin."}},{"@type":"Question","name":"How much paint for a living room accent wall?","acceptedAnswer":{"@type":"Answer","text":"A typical 15ft accent wall at 9ft ceiling height is 135 sq ft. You need about one quart per coat, or one gallon for two coats with some left over for touch-ups."}},{"@type":"Question","name":"What finish is best for a living room?","acceptedAnswer":{"@type":"Answer","text":"Eggshell or satin are most popular. Eggshell looks clean and refined. Satin is more durable and better for living rooms with children or pets."}},{"@type":"Question","name":"Should the living room and dining room be the same colour?","acceptedAnswer":{"@type":"Answer","text":"In open-plan homes, using the same colour or complementary tones creates cohesive flow. In separate rooms, you can use contrasting colours for distinct personalities in each space."}},{"@type":"Question","name":"How much does it cost to paint a living room?","acceptedAnswer":{"@type":"Answer","text":"DIY paint costs $50 to $120 for an average living room. Professional painters charge $300 to $900 depending on room size and location."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Living Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Living Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard living room needs <strong>2 to 3 gallons</strong> (8 to 12 litres) for two coats on the walls. Enter your living room dimensions below for an exact estimate.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 3 gallons (8 to 12 litres)</p>
          <p className="text-sm opacity-90">For a standard 15x20 living room with 9ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Living Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A standard 15x20 living room with 9ft ceilings has approximately 630 square feet of gross wall area. After deducting two windows and one door, the paintable area is around 575 square feet. At 400 square feet per gallon with two coats, that equals about 2.9 gallons — most homeowners buy 3 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A smaller 12x15 living room needs about 2 gallons for two coats. A large open-plan living area 18x24 needs 4 to 5 gallons. If you have a feature or accent wall in a different colour, calculate that wall separately and buy accordingly.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a standard 15x20 living room needs 10 to 12 litres for two coats. Two 5 litre tins is the most common purchase for an average living room.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Living Room Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Living Room Size</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">12x15 small</td><td className="px-4 py-3 text-gray-700">~1.1 gal</td><td className="px-4 py-3 text-gray-700">~2.2 gal</td><td className="px-4 py-3 text-gray-700">~8.3 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">15x18 medium</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~3 gal</td><td className="px-4 py-3 text-gray-700">~11.4 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">15x20 standard</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~3 gal</td><td className="px-4 py-3 text-gray-700">~11.4 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">18x24 large</td><td className="px-4 py-3 text-gray-700">~2.1 gal</td><td className="px-4 py-3 text-gray-700">~4.2 gal</td><td className="px-4 py-3 text-gray-700">~15.9 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">20x30 open plan</td><td className="px-4 py-3 text-gray-700">~2.8 gal</td><td className="px-4 py-3 text-gray-700">~5.5 gal</td><td className="px-4 py-3 text-gray-700">~20.8 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Living Room</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Eggshell or satin are the most popular finishes for living rooms. Eggshell gives a clean, low-sheen look that is easy to wipe and holds up well to regular use. Satin is slightly more durable and easier to clean — ideal for living rooms with children or pets.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Avoid flat paint in living rooms unless you are going for a specific luxury matte look and the room sees light use. Flat paint marks easily and cannot be scrubbed without damage.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Living Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Move furniture to the centre of the room</strong> and cover with drop cloths before starting. Do not try to paint around furniture.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Calculate accent walls separately</strong> if you are using a different colour. A typical 15ft accent wall at 9ft ceiling height is 135 sq ft — about one quart per coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy 5-gallon buckets</strong> if you need 5 gallons or more of the same colour — they are cheaper per gallon and guarantee colour batch consistency.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a 9-inch roller with a 3/8 inch nap</strong> for smooth living room walls. This gives the fastest, most even coverage.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint window and door frames last</strong> using semi-gloss trim paint after all wall paint is completely dry.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-15x15-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 15x15 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Interior of House? →</Link></li>
            <li><Link href={`/${locale}/dining-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Dining Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons of ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a living room?</h3>
              <p className="text-gray-700">A standard 15x20 living room needs about 3 gallons for two coats on the walls. A smaller 12x15 living room needs about 2 gallons. A large open-plan space needs 4 to 5 gallons.</p>
            </div>
            <div key="How many litres of p">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres of paint for a living room?</h3>
              <p className="text-gray-700">A standard 15x20 living room needs 10 to 12 litres for two coats. Two 5 litre tins is the most common purchase. A small living room can be done with one 5 litre tin plus a 2.5 litre tin.</p>
            </div>
            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a living room accent wall?</h3>
              <p className="text-gray-700">A typical 15ft accent wall at 9ft ceiling height is 135 sq ft. You need about one quart per coat, or one gallon for two coats with some left over for touch-ups.</p>
            </div>
            <div key="What finish is best ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What finish is best for a living room?</h3>
              <p className="text-gray-700">Eggshell or satin are most popular. Eggshell looks clean and refined. Satin is more durable and better for living rooms with children or pets.</p>
            </div>
            <div key="Should the living ro">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should the living room and dining room be the same colour?</h3>
              <p className="text-gray-700">In open-plan homes, using the same colour or complementary tones creates cohesive flow. In separate rooms, you can use contrasting colours for distinct personalities in each space.</p>
            </div>
            <div key="How much does it cos">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a living room?</h3>
              <p className="text-gray-700">DIY paint costs $50 to $120 for an average living room. Professional painters charge $300 to $900 depending on room size and location.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
