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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-12x12-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-12x12-room`;
  return {
    title: 'How Much Paint for a 12x12 Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a 12x12 room. Free instant results in gallons and litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 12x12 Room?',
      description: 'Find out exactly how much paint you need for a 12x12 room. Free instant results in gallons and litres. No signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 12x12 Room?","item":"https://thepaintcalculator.com/how-much-paint-for-a-12x12-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons of paint for a 12x12 room?","acceptedAnswer":{"@type":"Answer","text":"You need about 2 gallons for two coats on the walls of a 12x12 room with 8ft ceilings. If you are also painting the ceiling, add another gallon."}},{"@type":"Question","name":"Is one gallon enough for a 12x12 room?","acceptedAnswer":{"@type":"Answer","text":"One gallon is enough for a single coat. For two coats — which are recommended for a professional finish — you will need 2 gallons."}},{"@type":"Question","name":"How many litres of paint for a 12x12 room?","acceptedAnswer":{"@type":"Answer","text":"A 12x12 room needs 7 to 8 litres for two coats on the walls. A 5 litre tin plus a 2.5 litre tin is the most common purchase for this size room."}},{"@type":"Question","name":"Does a 12x12 room need primer?","acceptedAnswer":{"@type":"Answer","text":"Primer is needed if painting over bare drywall, a very dark colour, or water stains. For repainting over an existing similar colour, a paint-and-primer-in-one product is sufficient."}},{"@type":"Question","name":"How long does it take to paint a 12x12 room?","acceptedAnswer":{"@type":"Answer","text":"Most DIYers complete a 12x12 room in 4 to 6 hours including prep, two wall coats, and drying time between coats."}},{"@type":"Question","name":"What is the best paint finish for a 12x12 room?","acceptedAnswer":{"@type":"Answer","text":"Eggshell or satin are the best finishes. They are easy to clean, resist scuffs better than flat paint, and give a professional-looking result on smooth walls."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 12x12 Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 12x12 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard 12x12 room needs <strong>1 to 2 gallons</strong> (4 to 8 litres) for two coats on the walls. Enter your exact room dimensions below for a precise result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 2 gallons (4 to 8 litres)</p>
          <p className="text-sm opacity-90">For a 12x12 room with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 12x12 Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 12x12 room with 8ft ceilings has 384 square feet of gross wall area. After deducting a standard door (20 sq ft) and one window (15 sq ft), the paintable wall area is around 349 square feet. At 400 square feet per gallon with two coats, that equals about 1.75 gallons — most homeowners buy 2 gallons to have some left over for touch-ups.</p>
          <p className="text-gray-700 leading-relaxed mb-4">If you are also painting the ceiling, add another half gallon. The 12x12 ceiling is 144 square feet, which is well under one gallon for two coats. A single quart may even be enough if you are applying only one coat of ceiling paint.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a 12x12 room needs 6 to 8 litres for two coats on the walls. A 5 litre tin is just enough for one coat; buy a 5 litre plus a 2.5 litre tin to be safe for two coats.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">12x12 Room Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls only</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~2 gal</td><td className="px-4 py-3 text-gray-700">~7.5 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling only</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~0.8 gal</td><td className="px-4 py-3 text-gray-700">~3 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls + ceiling</td><td className="px-4 py-3 text-gray-700">~1.4 gal</td><td className="px-4 py-3 text-gray-700">~2.8 gal</td><td className="px-4 py-3 text-gray-700">~10.5 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Trim & baseboards</td><td className="px-4 py-3 text-gray-700">~0.25 gal</td><td className="px-4 py-3 text-gray-700">~0.5 gal</td><td className="px-4 py-3 text-gray-700">~1.9 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a 12x12 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Eggshell or satin are the best finishes for a 12x12 room whether it is a bedroom, office, or spare room. Eggshell gives a soft, low-sheen finish that hides minor wall imperfections and looks clean and refined. Satin is slightly more durable and easier to wipe clean — ideal if the room sees regular use.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Avoid flat or matte paint on walls if the room is in regular use. Flat paint cannot be scrubbed without damaging the surface and will show marks and fingerprints over time.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 12x12 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a roller with a 3/8 inch nap</strong> for smooth walls and a 1/2 inch nap for textured or orange-peel walls.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Cut in first with a brush</strong> along all edges, corners, ceiling line, and baseboards before rolling the main wall areas.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always buy one extra quart</strong> beyond your estimate so you have touch-up paint for the next 1 to 2 years.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Two coats are always better than one</strong> — even with good coverage paint, a second coat evens out the finish and ensures full opacity.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow 2 to 4 hours drying time</strong> between coats for latex paint. Do not rush the second coat or you risk lifting the first.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-10x10-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x10 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-14x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 14x14 Room? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons of ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a 12x12 room?</h3>
              <p className="text-gray-700">You need about 2 gallons for two coats on the walls of a 12x12 room with 8ft ceilings. If you are also painting the ceiling, add another gallon.</p>
            </div>
            <div key="Is one gallon enough">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is one gallon enough for a 12x12 room?</h3>
              <p className="text-gray-700">One gallon is enough for a single coat. For two coats — which are recommended for a professional finish — you will need 2 gallons.</p>
            </div>
            <div key="How many litres of p">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres of paint for a 12x12 room?</h3>
              <p className="text-gray-700">A 12x12 room needs 7 to 8 litres for two coats on the walls. A 5 litre tin plus a 2.5 litre tin is the most common purchase for this size room.</p>
            </div>
            <div key="Does a 12x12 room ne">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does a 12x12 room need primer?</h3>
              <p className="text-gray-700">Primer is needed if painting over bare drywall, a very dark colour, or water stains. For repainting over an existing similar colour, a paint-and-primer-in-one product is sufficient.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 12x12 room?</h3>
              <p className="text-gray-700">Most DIYers complete a 12x12 room in 4 to 6 hours including prep, two wall coats, and drying time between coats.</p>
            </div>
            <div key="What is the best pai">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint finish for a 12x12 room?</h3>
              <p className="text-gray-700">Eggshell or satin are the best finishes. They are easy to clean, resist scuffs better than flat paint, and give a professional-looking result on smooth walls.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
