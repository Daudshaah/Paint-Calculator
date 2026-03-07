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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-living-room`;
  return {
    title: 'How Much Paint for a Living Room? | The Paint Calculator',
    description: 'Find out how much paint you need for a living room. Gallon estimates for small, average, and large living rooms with ceiling and trim.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Living Room?',
      description: 'Find out how much paint you need for a living room. Gallon estimates for small, average, and large living rooms with ceiling and trim.',
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
      "name": "How many gallons of paint for a living room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An average 15x20 living room needs 2-3 gallons for two wall coats. Larger open-plan spaces need 4-5 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use the same paint in the living room and hallway?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using the same colour creates a seamless flow. Buy extra and store it for touch-ups across both spaces."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for a living room accent wall?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An accent wall in a typical living room (12-15 ft wide, 8 ft high) needs about 1 quart to 1 gallon per coat."
      }
    },
    {
      "@type": "Question",
      "name": "What finish is best for a living room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eggshell or satin are most popular for living rooms - they are easy to clean and hold up well to foot traffic and furniture."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to paint a living room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DIY paint costs $50-$120 for an average living room. Professional painters charge $300-$900 depending on size and location."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to paint living room trim separately?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Use semi-gloss trim paint for baseboards, window frames, and door casings. Budget 1 quart for a standard living room."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Living Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Living Room?</h1>
        <p className="text-lg text-gray-600 mb-6">Living rooms are often the largest and most visible rooms in a home. Getting the paint quantity right matters - too little means a last-minute trip mid-project, too much wastes money.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `An average living room (15x20 ft) needs <strong>2-3 gallons</strong> (7.6-11.4 litres) for two coats on the walls. A large open-plan living room may need <strong>4-5 gallons</strong>.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Living rooms often have large windows and feature walls. Measure each wall individually, subtract openings, and consider buying an extra quart if you have an accent wall in a different colour.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Small living room 12x15 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Average living room 15x20 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">3 gallons</td>
                  <td className="py-2 text-gray-600">11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Large living room 18x24 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">4 gallons</td>
                  <td className="py-2 text-gray-600">15.1 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Open-plan 20x30 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">5 gallons</td>
                  <td className="py-2 text-gray-600">18.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling 15x20 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1.5 gallons</td>
                  <td className="py-2 text-gray-600">5.7 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons of paint for a living room?</dt>
              <dd className="text-gray-700 leading-relaxed">An average 15x20 living room needs 2-3 gallons for two wall coats. Larger open-plan spaces need 4-5 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Should I use the same paint in the living room and hallway?</dt>
              <dd className="text-gray-700 leading-relaxed">Using the same colour creates a seamless flow. Buy extra and store it for touch-ups across both spaces.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How much paint for a living room accent wall?</dt>
              <dd className="text-gray-700 leading-relaxed">An accent wall in a typical living room (12-15 ft wide, 8 ft high) needs about 1 quart to 1 gallon per coat.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. What finish is best for a living room?</dt>
              <dd className="text-gray-700 leading-relaxed">Eggshell or satin are most popular for living rooms - they are easy to clean and hold up well to foot traffic and furniture.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How much does it cost to paint a living room?</dt>
              <dd className="text-gray-700 leading-relaxed">DIY paint costs $50-$120 for an average living room. Professional painters charge $300-$900 depending on size and location.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. Do I need to paint living room trim separately?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes. Use semi-gloss trim paint for baseboards, window frames, and door casings. Budget 1 quart for a standard living room.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:underline text-sm">Living Room Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-15x15-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 15x15 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for Interior of House?</Link>
              <Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:underline text-sm">Paint Cost Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
