import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-many-gallons-of-paint-for-a-room`;
  return {
    title: 'How Many Gallons of Paint for a Room? | The Paint Calculator',
    description: 'Find out how many gallons of paint you need for any room size. Includes formula, size-by-size table, and tips for buying the right amount.',
    alternates: { canonical },
    openGraph: {
      title: 'How Many Gallons of Paint for a Room?',
      description: 'Find out how many gallons of paint you need for any room size. Includes formula, size-by-size table, and tips for buying the right amount.',
      url: canonical,
      siteName: 'The Paint Calculator',
      type: 'article',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I calculate gallons of paint for a room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiply the room perimeter by the ceiling height. Subtract 20 sq ft per door and 15 sq ft per window. Divide the result by 400 for gallons per coat, then multiply by number of coats."
      }
    },
    {
      "@type": "Question",
      "name": "Does ceiling height change how much paint I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes significantly. A room with 9ft ceilings needs about 12% more paint than the same room with 8ft ceilings. Vaulted ceilings can double the wall area."
      }
    },
    {
      "@type": "Question",
      "name": "Should I buy paint in gallons or quarts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For rooms under 100 sq ft, quarts are sufficient and reduce waste. For rooms 100 sq ft and above, gallon containers are more economical."
      }
    },
    {
      "@type": "Question",
      "name": "Is it better to buy one 5-gallon bucket or individual gallons?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 5-gallon bucket is cheaper per gallon and guarantees colour consistency. Buy one if you need 5+ gallons of the same colour."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if I run out of paint mid-room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you run out mid-wall, buy the same colour and lot number if possible. Mix the new can with remaining old paint in a large bucket to blend any slight colour variations."
      }
    },
    {
      "@type": "Question",
      "name": "How much extra paint should I buy for touch-ups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Add 10% to your calculated quantity for touch-ups. Store leftover paint sealed tightly and labeled with the room name - it stays usable for 2-5 years."
      }
    }
  ]
};

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-1 items-center">
            <li><Link href={`/${locale}`} className="hover:text-blue-600">Home</Link></li>
            <li className="mx-1">/</li>
            <li className="text-gray-800 font-medium">How Many Gallons of Paint for a Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Many Gallons of Paint for a Room?</h1>
        <p className="text-lg text-gray-600 mb-6">The number of gallons you need depends on room size, ceiling height, number of windows and doors, and how many coats you are applying. This guide covers every standard room size so you can buy with confidence.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `Most average-sized rooms (12x12 to 14x14 ft) need <strong>2 gallons</strong> for two coats. Small rooms (10x10 and under) need <strong>1 gallon</strong>. Large rooms (16x20 and above) need <strong>3-4 gallons</strong>.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> The universal formula: (Perimeter x ceiling height) minus (openings) = paintable area. Divide by 400 for gallons per coat. Multiply by 2 for a two-coat job. Always round up to the nearest gallon.</p>
        </div>

        {/* Calculator */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Paint Calculator</h2>
          <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse" />}>
            <PaintCalculatorClient locale={locale} />
          </Suspense>
        </div>

        {/* Reference Table */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Paint Quantity Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-700">Scenario</th>
                  <th className="text-left py-3 pr-4 font-semibold text-gray-700">Gallons</th>
                  <th className="text-left py-3 font-semibold text-gray-700">Litres</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">10x10 room (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">12x12 room (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">12x14 room (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">14x14 room (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">15x20 room (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">3-4 gallons</td>
                  <td className="py-2 text-gray-600">11.4-15.1 litres</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-gray-900 mb-1">1. How do I calculate gallons of paint for a room?</dt>
              <dd className="text-gray-700 leading-relaxed">Multiply the room perimeter by the ceiling height. Subtract 20 sq ft per door and 15 sq ft per window. Divide the result by 400 for gallons per coat, then multiply by number of coats.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Does ceiling height change how much paint I need?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes significantly. A room with 9ft ceilings needs about 12% more paint than the same room with 8ft ceilings. Vaulted ceilings can double the wall area.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. Should I buy paint in gallons or quarts?</dt>
              <dd className="text-gray-700 leading-relaxed">For rooms under 100 sq ft, quarts are sufficient and reduce waste. For rooms 100 sq ft and above, gallon containers are more economical.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Is it better to buy one 5-gallon bucket or individual gallons?</dt>
              <dd className="text-gray-700 leading-relaxed">A 5-gallon bucket is cheaper per gallon and guarantees colour consistency. Buy one if you need 5+ gallons of the same colour.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. What happens if I run out of paint mid-room?</dt>
              <dd className="text-gray-700 leading-relaxed">If you run out mid-wall, buy the same colour and lot number if possible. Mix the new can with remaining old paint in a large bucket to blend any slight colour variations.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How much extra paint should I buy for touch-ups?</dt>
              <dd className="text-gray-700 leading-relaxed">Add 10% to your calculated quantity for touch-ups. Store leftover paint sealed tightly and labeled with the room name - it stays usable for 2-5 years.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
              <Link href={`/${locale}/how-much-paint-to-cover-500-sq-ft`} className="text-blue-600 hover:underline text-sm">How Much Paint to Cover 500 Sq Ft?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 12x12 Room?</Link>
              <Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:underline text-sm">Two Coat Paint Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
