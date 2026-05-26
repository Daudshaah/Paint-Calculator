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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-10x10-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-10x10-room`;
  return {
    title: 'How Much Paint for a 10x10 Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a 10x10 room. Free instant estimates in gallons and litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 10x10 Room?',
      description: 'Find out exactly how much paint you need for a 10x10 room. Free instant estimates in gallons and litres. No signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 10x10 Room?","item":"https://thepaintcalculator.com/how-much-paint-for-a-10x10-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons of paint for a 10x10 room?","acceptedAnswer":{"@type":"Answer","text":"You need about 1.4 gallons for two coats on the walls of a 10x10 room. Buy a 1-gallon can plus a quart to have enough and some left over for touch-ups."}},{"@type":"Question","name":"Can I paint a 10x10 room with one gallon?","acceptedAnswer":{"@type":"Answer","text":"One gallon covers a 10x10 room for one coat. For two coats — which give a more professional and durable finish — you need a gallon plus a quart."}},{"@type":"Question","name":"How many litres for a 10x10 room?","acceptedAnswer":{"@type":"Answer","text":"A 10x10 room needs 5 to 6 litres for two coats on the walls. A single 5 litre tin is close to enough; buying a 5 litre tin and a small 500ml sample pot gives you a comfortable buffer."}},{"@type":"Question","name":"How long does it take to paint a 10x10 room?","acceptedAnswer":{"@type":"Answer","text":"Most people can paint a 10x10 room in 3 to 5 hours including prep, two wall coats, and drying time between coats."}},{"@type":"Question","name":"What finish is best for a small 10x10 room?","acceptedAnswer":{"@type":"Answer","text":"Eggshell or satin — the slight sheen reflects light and helps a small room feel more open. Avoid flat paint in small rooms."}},{"@type":"Question","name":"Do I need primer in a 10x10 room?","acceptedAnswer":{"@type":"Answer","text":"Primer is needed when painting over bare drywall, a dark colour, or stains. Otherwise a paint-and-primer-in-one product is fine for a simple repaint."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 10x10 Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 10x10 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 10x10 room with 8ft ceilings needs <strong>1 to 1.5 gallons</strong> (4 to 6 litres) for two coats on the walls. Enter your dimensions below for a precise result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 1.5 gallons (4 to 6 litres)</p>
          <p className="text-sm opacity-90">For a 10x10 room with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 10x10 Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 10x10 room with 8ft ceilings has 320 square feet of gross wall area. After deducting a door and one window, the paintable area is roughly 285 square feet. At 400 square feet per gallon, one gallon is technically enough for one coat — for two coats you need about 1.4 gallons, so buy 1.5 gallons (one gallon plus one quart).</p>
          <p className="text-gray-700 leading-relaxed mb-4">The 10x10 ceiling is 100 square feet. One quart of ceiling paint is enough for one coat; one gallon covers two ceiling coats with paint to spare for touch-ups.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a 10x10 room needs 5 to 6 litres for two coats on the walls. A single 5 litre tin is often just enough; buying a 5 litre tin plus a small sample pot for touch-ups is the smart approach.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10x10 Room Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls only</td><td className="px-4 py-3 text-gray-700">~0.75 gal</td><td className="px-4 py-3 text-gray-700">~1.4 gal</td><td className="px-4 py-3 text-gray-700">~5.3 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling only</td><td className="px-4 py-3 text-gray-700">~0.25 gal</td><td className="px-4 py-3 text-gray-700">~0.5 gal</td><td className="px-4 py-3 text-gray-700">~1.9 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Walls + ceiling</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~1.9 gal</td><td className="px-4 py-3 text-gray-700">~7.2 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Trim & baseboards</td><td className="px-4 py-3 text-gray-700">~0.2 gal</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~1.5 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a 10x10 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Eggshell or satin are ideal for a 10x10 room. A slight sheen reflects light and helps a small room feel brighter and larger. Avoid flat paint in small rooms — it absorbs light and can make a compact space feel even more confined.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For a small bathroom 10x10, always use satin or semi-gloss to resist moisture and allow easy wiping of steam and condensation from the walls.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 10x10 Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>One gallon is rarely enough for two coats</strong> in a 10x10 room. Buy a gallon plus a quart to be safe.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Light colours open up small rooms</strong> — soft whites, pale blues, and warm greiges reflect more light and make the space feel larger.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Cut in carefully around all edges</strong> before rolling. In a small room, edge work is proportionally more of the job than in larger rooms.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>A small foam roller</strong> (4 inch) gives a smoother finish on small wall sections than a standard 9 inch roller.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ventilate the room well</strong> during painting — small spaces accumulate fumes quickly even with low-VOC paint.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-10x8-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x8 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bathroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bathroom? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons of ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a 10x10 room?</h3>
              <p className="text-gray-700">You need about 1.4 gallons for two coats on the walls of a 10x10 room. Buy a 1-gallon can plus a quart to have enough and some left over for touch-ups.</p>
            </div>
            <div key="Can I paint a 10x10 ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint a 10x10 room with one gallon?</h3>
              <p className="text-gray-700">One gallon covers a 10x10 room for one coat. For two coats — which give a more professional and durable finish — you need a gallon plus a quart.</p>
            </div>
            <div key="How many litres for ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres for a 10x10 room?</h3>
              <p className="text-gray-700">A 10x10 room needs 5 to 6 litres for two coats on the walls. A single 5 litre tin is close to enough; buying a 5 litre tin and a small 500ml sample pot gives you a comfortable buffer.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 10x10 room?</h3>
              <p className="text-gray-700">Most people can paint a 10x10 room in 3 to 5 hours including prep, two wall coats, and drying time between coats.</p>
            </div>
            <div key="What finish is best ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What finish is best for a small 10x10 room?</h3>
              <p className="text-gray-700">Eggshell or satin — the slight sheen reflects light and helps a small room feel more open. Avoid flat paint in small rooms.</p>
            </div>
            <div key="Do I need primer in ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer in a 10x10 room?</h3>
              <p className="text-gray-700">Primer is needed when painting over bare drywall, a dark colour, or stains. Otherwise a paint-and-primer-in-one product is fine for a simple repaint.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
