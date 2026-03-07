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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-10x8-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-10x8-room`;
  return {
    title: 'How Much Paint for a 10x8 Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a 10x8 room. Free estimates in gallons and litres for this small room size.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 10x8 Room?',
      description: 'Find out exactly how much paint you need for a 10x8 room. Free estimates in gallons and litres for this small room size.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 10x8 Room?","item":"https://thepaintcalculator.com/how-much-paint-for-a-10x8-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint for a 10x8 room?","acceptedAnswer":{"@type":"Answer","text":"One gallon is enough for two coats on all four walls of a 10x8 room. Buy an extra quart if you also want to paint the ceiling."}},{"@type":"Question","name":"Can I paint a 10x8 room with less than one gallon?","acceptedAnswer":{"@type":"Answer","text":"Technically yes for a single coat — a quart covers 100 sq ft and the walls are about 253 sq ft after deductions. But for two coats, buy the full gallon."}},{"@type":"Question","name":"What is the best paint finish for a small 10x8 room?","acceptedAnswer":{"@type":"Answer","text":"Satin or eggshell — the slight sheen reflects light and helps a small room feel larger. Avoid flat paint in small rooms."}},{"@type":"Question","name":"How much paint for a small bathroom that is 10x8?","acceptedAnswer":{"@type":"Answer","text":"A 10x8 bathroom needs one gallon for two wall coats. Use satin or semi-gloss finish in bathrooms to resist moisture and allow easy wiping."}},{"@type":"Question","name":"How long does it take to paint a 10x8 room?","acceptedAnswer":{"@type":"Answer","text":"A 10x8 room can be painted in 2 to 3 hours including prep, two wall coats, and clean-up."}},{"@type":"Question","name":"Do I need primer in a 10x8 room?","acceptedAnswer":{"@type":"Answer","text":"Primer is needed if painting over bare drywall, a dark colour, or stains. For a simple repaint, a quality paint-and-primer-in-one product is fine."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 10x8 Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 10x8 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 10x8 room with 8ft ceilings needs approximately <strong>1 gallon</strong> (3.8 litres) for two coats on the walls. This is one of the most paint-efficient room sizes.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon (3.8 litres)</p>
          <p className="text-sm opacity-90">For a 10x8 room with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 10x8 Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 10x8 room with 8ft ceilings has 288 square feet of gross wall area. After deducting a door and one window, the paintable area is roughly 253 square feet. At 400 square feet per gallon and two coats, that is only 1.26 gallons — one gallon covers this room for two coats with just enough remaining for touch-ups.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The 10x8 ceiling is just 80 square feet. One quart of ceiling paint is comfortably enough for two coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a 10x8 room needs just 3.8 to 5 litres for two wall coats. A single 5 litre tin is more than enough and gives you a useful amount left over for touch-ups.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10x8 Room Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls only</td><td className="px-4 py-3 text-gray-700">~0.65 gal</td><td className="px-4 py-3 text-gray-700">~1.25 gal</td><td className="px-4 py-3 text-gray-700">~4.7 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling only</td><td className="px-4 py-3 text-gray-700">~0.2 gal</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~1.5 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls + ceiling</td><td className="px-4 py-3 text-gray-700">~0.85 gal</td><td className="px-4 py-3 text-gray-700">~1.65 gal</td><td className="px-4 py-3 text-gray-700">~6.2 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Trim & baseboards</td><td className="px-4 py-3 text-gray-700">~0.15 gal</td><td className="px-4 py-3 text-gray-700">~0.3 gal</td><td className="px-4 py-3 text-gray-700">~1.1 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 10x8 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>One gallon is genuinely enough</strong> for two wall coats in a 10x8 room — one of the few room sizes where this is true.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a satin or eggshell finish</strong> — the slight sheen reflects light and makes this small room feel brighter and more open than flat paint would.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Light colours are best for small rooms</strong> — soft whites, pale greys, and warm creams maximize the sense of space.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>A 4-inch foam roller</strong> is ideal for the smaller wall sections in a 10x8 room — it gives better control than a full 9-inch roller in tight spaces.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ventilate the room well</strong> throughout painting — small spaces accumulate paint fumes quickly even with low-VOC products.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-10x10-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x10 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bathroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bathroom? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a 10x8 room?</h3>
              <p className="text-gray-700">One gallon is enough for two coats on all four walls of a 10x8 room. Buy an extra quart if you also want to paint the ceiling.</p>
            </div>
            <div key="Can I paint a 10x8 r">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint a 10x8 room with less than one gallon?</h3>
              <p className="text-gray-700">Technically yes for a single coat — a quart covers 100 sq ft and the walls are about 253 sq ft after deductions. But for two coats, buy the full gallon.</p>
            </div>
            <div key="What is the best pai">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint finish for a small 10x8 room?</h3>
              <p className="text-gray-700">Satin or eggshell — the slight sheen reflects light and helps a small room feel larger. Avoid flat paint in small rooms.</p>
            </div>
            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a small bathroom that is 10x8?</h3>
              <p className="text-gray-700">A 10x8 bathroom needs one gallon for two wall coats. Use satin or semi-gloss finish in bathrooms to resist moisture and allow easy wiping.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 10x8 room?</h3>
              <p className="text-gray-700">A 10x8 room can be painted in 2 to 3 hours including prep, two wall coats, and clean-up.</p>
            </div>
            <div key="Do I need primer in ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer in a 10x8 room?</h3>
              <p className="text-gray-700">Primer is needed if painting over bare drywall, a dark colour, or stains. For a simple repaint, a quality paint-and-primer-in-one product is fine.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
