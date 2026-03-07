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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-14x14-room`;
  return {
    title: 'How Much Paint for a 14x14 Room? | The Paint Calculator',
    description: 'How much paint for a 14x14 room? Get accurate gallon and litre estimates for walls, ceiling, and trim for this mid-size room.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 14x14 Room?',
      description: 'How much paint for a 14x14 room? Get accurate gallon and litre estimates for walls, ceiling, and trim for this mid-size room.',
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
      "name": "How many gallons for a 14x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan for 2 gallons for two coats on the walls. Add 1 gallon for the ceiling, making the total 3 gallons for a full room paint job."
      }
    },
    {
      "@type": "Question",
      "name": "How is a 14x14 room different to paint than a 12x12?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 14x14 room has about 15% more wall area than a 12x12. The paint quantity difference is typically just one extra quart."
      }
    },
    {
      "@type": "Question",
      "name": "What colours make a 14x14 room look larger?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Light, cool tones like soft grey, pale blue, or off-white reflect more light and make the space feel airier and larger."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 14x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With proper prep, a 14x14 room can be painted in 5-7 hours including two coats and drying time between coats."
      }
    },
    {
      "@type": "Question",
      "name": "Is one gallon enough for a 14x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One gallon is only enough for a single coat. Two coats - the standard for best results - requires 2 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need different paint for bedroom vs dining room in this size?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The quantity is the same regardless of use. The finish varies: eggshell for bedrooms, satin for dining rooms for easier cleaning."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 14x14 Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 14x14 Room?</h1>
        <p className="text-lg text-gray-600 mb-6">At 196 square feet, a 14x14 room is a comfortable mid-size bedroom or dining room. The wall area is around 448 sq ft before subtracting doors and windows.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 14x14 room with 8ft ceilings needs approximately <strong>1-2 gallons</strong> (3.8-7.6 litres) per coat on the walls. Two coats requires <strong>2-3 gallons</strong> (7.6-11.4 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Two gallons is the safe buy for a 14x14 room with two coats. One gallon covers 400 sq ft, and after subtracting a door and two windows you are right at the edge - buy two to avoid running short.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Walls only (1 coat)</td>
                  <td className="py-2 pr-4 font-medium">1-2 gallons</td>
                  <td className="py-2 text-gray-600">3.8-7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Walls only (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (1 coat)</td>
                  <td className="py-2 pr-4 font-medium">0.5 gallon</td>
                  <td className="py-2 text-gray-600">1.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Trim and baseboards</td>
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons for a 14x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Plan for 2 gallons for two coats on the walls. Add 1 gallon for the ceiling, making the total 3 gallons for a full room paint job.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. How is a 14x14 room different to paint than a 12x12?</dt>
              <dd className="text-gray-700 leading-relaxed">A 14x14 room has about 15% more wall area than a 12x12. The paint quantity difference is typically just one extra quart.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. What colours make a 14x14 room look larger?</dt>
              <dd className="text-gray-700 leading-relaxed">Light, cool tones like soft grey, pale blue, or off-white reflect more light and make the space feel airier and larger.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How long does it take to paint a 14x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">With proper prep, a 14x14 room can be painted in 5-7 hours including two coats and drying time between coats.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Is one gallon enough for a 14x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">One gallon is only enough for a single coat. Two coats - the standard for best results - requires 2 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. Do I need different paint for bedroom vs dining room in this size?</dt>
              <dd className="text-gray-700 leading-relaxed">The quantity is the same regardless of use. The finish varies: eggshell for bedrooms, satin for dining rooms for easier cleaning.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:underline text-sm">Bedroom Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-12x14-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 12x14 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-15x15-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 15x15 Room?</Link>
              <Link href={`/${locale}/dining-room-paint-calculator`} className="text-blue-600 hover:underline text-sm">Dining Room Paint Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
