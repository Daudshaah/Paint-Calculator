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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-12x14-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-12x14-room`;
  return {
    title: 'How Much Paint for a 12x14 Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a 12x14 room. Free estimates in gallons and litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 12x14 Room?',
      description: 'Find out exactly how much paint you need for a 12x14 room. Free estimates in gallons and litres. No signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 12x14 Room?","item":"https://thepaintcalculator.com/how-much-paint-for-a-12x14-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons for a 12x14 room?","acceptedAnswer":{"@type":"Answer","text":"Two gallons is the standard for two coats on the walls of a 12x14 room. Add one gallon if you also plan to paint the ceiling."}},{"@type":"Question","name":"How many litres for a 12x14 room?","acceptedAnswer":{"@type":"Answer","text":"A 12x14 room needs 7 to 8 litres for two wall coats. A 5 litre tin plus a 2.5 litre tin covers this room with a small amount left over."}},{"@type":"Question","name":"Is a 12x14 room easy to paint in a day?","acceptedAnswer":{"@type":"Answer","text":"Yes — a 12x14 room is a comfortable one-day project. Start in the morning and you can complete two wall coats plus the ceiling in a single day."}},{"@type":"Question","name":"What finish for a 12x14 bedroom?","acceptedAnswer":{"@type":"Answer","text":"Eggshell for a refined look, satin for a room that needs to be wiped clean regularly. Both are excellent choices for a bedroom of this size."}},{"@type":"Question","name":"Do I need a primer for a 12x14 room?","acceptedAnswer":{"@type":"Answer","text":"Primer is needed for bare drywall, dramatic colour changes, or stains. For a simple colour refresh, a quality paint-and-primer-in-one product is sufficient."}},{"@type":"Question","name":"How long does it take to paint a 12x14 room?","acceptedAnswer":{"@type":"Answer","text":"Most people take 4 to 6 hours for two wall coats including prep and drying time between coats. Adding the ceiling adds another 1 to 2 hours."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 12x14 Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 12x14 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 12x14 room needs approximately <strong>1 to 2 gallons</strong> (4 to 8 litres) for two coats on the walls. Enter your dimensions below for an exact result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 2 gallons (4 to 8 litres)</p>
          <p className="text-sm opacity-90">For a 12x14 room with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 12x14 Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 12x14 room with 8ft ceilings has 416 square feet of gross wall area. After deducting a door and one or two windows, the paintable area is roughly 370 to 380 square feet. At 400 square feet per gallon and two coats, that is just under 2 gallons — buy exactly 2 gallons to have a small buffer for touch-ups.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The 12x14 ceiling is 168 square feet. One gallon of ceiling paint covers two coats of the ceiling with some remaining. A quart is enough if you are applying a single coat.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a 12x14 room needs 7 to 8 litres for two wall coats. A 5 litre tin plus a 2.5 litre tin is the right purchase for this room size.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">12x14 Room Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls only</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~1.9 gal</td><td className="px-4 py-3 text-gray-700">~7.2 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling only</td><td className="px-4 py-3 text-gray-700">~0.42 gal</td><td className="px-4 py-3 text-gray-700">~0.84 gal</td><td className="px-4 py-3 text-gray-700">~3.2 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls + ceiling</td><td className="px-4 py-3 text-gray-700">~1.42 gal</td><td className="px-4 py-3 text-gray-700">~2.74 gal</td><td className="px-4 py-3 text-gray-700">~10.4 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Trim & baseboards</td><td className="px-4 py-3 text-gray-700">~0.25 gal</td><td className="px-4 py-3 text-gray-700">~0.5 gal</td><td className="px-4 py-3 text-gray-700">~1.9 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 12x14 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Two gallons is the safe buy</strong> for a 12x14 room. One gallon will leave you short for two coats.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Eggshell or satin finish</strong> works best for bedrooms and dining rooms of this size — easy to clean and looks professional.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prep time is as important as painting time</strong> — filling nail holes, sanding rough patches, and taping edges properly ensures a clean result.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Roll in a W or M pattern</strong> on the wall surface, then fill in without lifting the roller. This avoids lap marks and gives even coverage.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Store the leftover paint sealed and labelled</strong> — you will almost certainly need it for touch-ups in the next year or two.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-14x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 14x14 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons for">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a 12x14 room?</h3>
              <p className="text-gray-700">Two gallons is the standard for two coats on the walls of a 12x14 room. Add one gallon if you also plan to paint the ceiling.</p>
            </div>
            <div key="How many litres for ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres for a 12x14 room?</h3>
              <p className="text-gray-700">A 12x14 room needs 7 to 8 litres for two wall coats. A 5 litre tin plus a 2.5 litre tin covers this room with a small amount left over.</p>
            </div>
            <div key="Is a 12x14 room easy">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is a 12x14 room easy to paint in a day?</h3>
              <p className="text-gray-700">Yes — a 12x14 room is a comfortable one-day project. Start in the morning and you can complete two wall coats plus the ceiling in a single day.</p>
            </div>
            <div key="What finish for a 12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What finish for a 12x14 bedroom?</h3>
              <p className="text-gray-700">Eggshell for a refined look, satin for a room that needs to be wiped clean regularly. Both are excellent choices for a bedroom of this size.</p>
            </div>
            <div key="Do I need a primer f">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need a primer for a 12x14 room?</h3>
              <p className="text-gray-700">Primer is needed for bare drywall, dramatic colour changes, or stains. For a simple colour refresh, a quality paint-and-primer-in-one product is sufficient.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 12x14 room?</h3>
              <p className="text-gray-700">Most people take 4 to 6 hours for two wall coats including prep and drying time between coats. Adding the ceiling adds another 1 to 2 hours.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
