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
      ? 'https://thepaintcalculator.com/how-many-gallons-of-paint-for-a-room'
      : `https://thepaintcalculator.com/${locale}/how-many-gallons-of-paint-for-a-room`;
  return {
    title: 'How Many Gallons of Paint for a Room? | ThePaintCalculator.com',
    description: 'Find out how many gallons of paint you need for any room size. Formula, size table, and buying tips. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Many Gallons of Paint for a Room?',
      description: 'Find out how many gallons of paint you need for any room size. Formula, size table, and buying tips. Free, no signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Many Gallons of Paint for a Room?","item":"https://thepaintcalculator.com/how-many-gallons-of-paint-for-a-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I calculate gallons of paint for a room?","acceptedAnswer":{"@type":"Answer","text":"Multiply room perimeter by ceiling height, subtract 20 sq ft per door and 15 sq ft per window, divide by 400 for gallons per coat, then multiply by number of coats."}},{"@type":"Question","name":"How many gallons for an average bedroom?","acceptedAnswer":{"@type":"Answer","text":"An average 12x12 bedroom needs about 1.75 gallons for two coats — buy 2 gallons. A larger 14x14 room needs about 2 gallons — buy 2.5 gallons."}},{"@type":"Question","name":"Does ceiling height change how much paint I need?","acceptedAnswer":{"@type":"Answer","text":"Yes significantly. A room with 9ft ceilings needs 12.5% more wall paint than the same room with 8ft ceilings. Always use your actual ceiling height in calculations."}},{"@type":"Question","name":"Should I buy paint in gallons or quarts?","acceptedAnswer":{"@type":"Answer","text":"Buy quarts for rooms under 150 sq ft of paintable wall area. For larger rooms, gallons are more economical. Buy 5-gallon buckets when you need 5+ gallons of the same colour."}},{"@type":"Question","name":"What happens if I run out of paint mid-room?","acceptedAnswer":{"@type":"Answer","text":"Buy the same colour from the same store and request the same batch number if possible. Mix the new can with remaining old paint in a bucket before continuing to blend any slight colour variation."}},{"@type":"Question","name":"How much extra paint should I buy for touch-ups?","acceptedAnswer":{"@type":"Answer","text":"Add 10% to your calculated quantity. Keep it sealed and labelled with the room name — it will stay usable for 2 to 5 years and is invaluable for inevitable future touch-ups."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Many Gallons of Paint for a Room?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Many Gallons of Paint for a Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Most average rooms need <strong>2 gallons</strong> for two coats on the walls. Small rooms under 10x10 need <strong>1 gallon</strong>. Large rooms over 16x20 need <strong>3 to 4 gallons</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 4 gallons depending on room size</p>
          <p className="text-sm opacity-90">Most average rooms (12x12 to 14x14) need 2 gallons for two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Calculate Gallons of Paint for Any Room</h2>
          <p className="text-gray-700 leading-relaxed mb-4">The formula is: (room perimeter × ceiling height) minus (20 sq ft per door + 15 sq ft per window) = paintable wall area. Divide by 400 for gallons per coat. Multiply by 2 for a two-coat job. Always round up to the nearest half gallon.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For example: a 12x14 room, perimeter = 52ft, ceiling 8ft = 416 sq ft gross. Deduct one door (20 sq ft) and two windows (30 sq ft) = 366 sq ft paintable. Divide by 400 = 0.92 gallons per coat. For two coats = 1.83 gallons — buy 2 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Ceiling height significantly affects the total. A room with 9ft ceilings needs 12.5% more paint than the same room with 8ft ceilings. Vaulted ceilings can increase paint needs by 50% or more.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Gallons of Paint by Room Size — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Room Size</th><th className="px-4 py-3 text-left font-semibold">Wall Area</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">10x8</td><td className="px-4 py-3 text-gray-700">~253 sq ft</td><td className="px-4 py-3 text-gray-700">0.65 gal</td><td className="px-4 py-3 text-gray-700">1.25 gal</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">10x10</td><td className="px-4 py-3 text-gray-700">~285 sq ft</td><td className="px-4 py-3 text-gray-700">0.75 gal</td><td className="px-4 py-3 text-gray-700">1.4 gal</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">12x12</td><td className="px-4 py-3 text-gray-700">~349 sq ft</td><td className="px-4 py-3 text-gray-700">0.87 gal</td><td className="px-4 py-3 text-gray-700">1.75 gal</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">12x14</td><td className="px-4 py-3 text-gray-700">~366 sq ft</td><td className="px-4 py-3 text-gray-700">0.92 gal</td><td className="px-4 py-3 text-gray-700">1.83 gal</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">14x14</td><td className="px-4 py-3 text-gray-700">~393 sq ft</td><td className="px-4 py-3 text-gray-700">0.98 gal</td><td className="px-4 py-3 text-gray-700">1.97 gal</td>
                  </tr>
                <tr className={5 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">15x15</td><td className="px-4 py-3 text-gray-700">~425 sq ft</td><td className="px-4 py-3 text-gray-700">1.06 gal</td><td className="px-4 py-3 text-gray-700">2.1 gal</td>
                  </tr>
                <tr className={6 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">15x20</td><td className="px-4 py-3 text-gray-700">~575 sq ft</td><td className="px-4 py-3 text-gray-700">1.44 gal</td><td className="px-4 py-3 text-gray-700">2.9 gal</td>
                  </tr>
                <tr className={7 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">20x20</td><td className="px-4 py-3 text-gray-700">~740 sq ft</td><td className="px-4 py-3 text-gray-700">1.85 gal</td><td className="px-4 py-3 text-gray-700">3.7 gal</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Buying the Right Amount of Paint</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always round up to the nearest gallon</strong> — running short mid-wall is far worse than having a small amount of leftover paint.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy all cans of the same colour at the same time</strong> — paint is batch-matched at the store and different batches can have subtle colour variations.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy 5-gallon buckets</strong> when you need 5 or more gallons of the same colour — they are cheaper per gallon and guaranteed colour consistent.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Keep all leftover paint</strong> labelled by room — seal tightly and store in a temperature-stable location. Latex paint stays usable for 2 to 5 years.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Box multiple cans together</strong> before painting — pour all cans of the same colour into a large bucket and mix before applying to ensure uniform colour.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-to-cover-500-sq-ft`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint to Cover 500 Sq Ft? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Living Room? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How do I calculate g">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I calculate gallons of paint for a room?</h3>
              <p className="text-gray-700">Multiply room perimeter by ceiling height, subtract 20 sq ft per door and 15 sq ft per window, divide by 400 for gallons per coat, then multiply by number of coats.</p>
            </div>
            <div key="How many gallons for">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for an average bedroom?</h3>
              <p className="text-gray-700">An average 12x12 bedroom needs about 1.75 gallons for two coats — buy 2 gallons. A larger 14x14 room needs about 2 gallons — buy 2.5 gallons.</p>
            </div>
            <div key="Does ceiling height ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does ceiling height change how much paint I need?</h3>
              <p className="text-gray-700">Yes significantly. A room with 9ft ceilings needs 12.5% more wall paint than the same room with 8ft ceilings. Always use your actual ceiling height in calculations.</p>
            </div>
            <div key="Should I buy paint i">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I buy paint in gallons or quarts?</h3>
              <p className="text-gray-700">Buy quarts for rooms under 150 sq ft of paintable wall area. For larger rooms, gallons are more economical. Buy 5-gallon buckets when you need 5+ gallons of the same colour.</p>
            </div>
            <div key="What happens if I ru">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I run out of paint mid-room?</h3>
              <p className="text-gray-700">Buy the same colour from the same store and request the same batch number if possible. Mix the new can with remaining old paint in a bucket before continuing to blend any slight colour variation.</p>
            </div>
            <div key="How much extra paint">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much extra paint should I buy for touch-ups?</h3>
              <p className="text-gray-700">Add 10% to your calculated quantity. Keep it sealed and labelled with the room name — it will stay usable for 2 to 5 years and is invaluable for inevitable future touch-ups.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
