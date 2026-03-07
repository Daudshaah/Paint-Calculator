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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-to-cover-500-sq-ft`;
  return {
    title: 'How Much Paint to Cover 500 Sq Ft? | The Paint Calculator',
    description: 'How much paint to cover 500 sq ft? Get exact gallon estimates with tips on coats, coverage rates, and how to buy the right amount.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint to Cover 500 Sq Ft?',
      description: 'How much paint to cover 500 sq ft? Get exact gallon estimates with tips on coats, coverage rates, and how to buy the right amount.',
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
      "name": "Is 1 gallon enough to cover 500 sq ft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No - one gallon covers 350-400 sq ft. For 500 sq ft you need 1.25-1.5 gallons per coat, so buy 2 gallons and you will have some left over."
      }
    },
    {
      "@type": "Question",
      "name": "How many coats to cover 500 sq ft?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two coats are standard. For a dramatic colour change or painting over a dark colour, three coats may be needed for full, even coverage."
      }
    },
    {
      "@type": "Question",
      "name": "How does paint coverage change with texture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Textured walls can increase paint consumption by 20-50%. For light orange-peel texture, add 20%. For heavy knockdown or stucco texture, add 50% or more."
      }
    },
    {
      "@type": "Question",
      "name": "What affects paint coverage rate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Porosity of the surface, application method (brush/roller/spray), paint quality and viscosity, and surface colour all affect how far a gallon goes."
      }
    },
    {
      "@type": "Question",
      "name": "How much is 500 sq ft of wall area in room terms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "500 sq ft of wall area roughly corresponds to a 12x15 room with 8ft ceilings, or two average bedrooms walls combined."
      }
    },
    {
      "@type": "Question",
      "name": "Can I buy 2.5 gallons exactly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paint is sold in quarts (0.25 gal), 1-gallon, and 5-gallon containers. For 2.5 gallons, buy two 1-gallon cans and two quarts - then you have a buffer for touch-ups."
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
            <li className="text-gray-800 font-medium">How Much Paint to Cover 500 Sq Ft?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint to Cover 500 Sq Ft?</h1>
        <p className="text-lg text-gray-600 mb-6">500 square feet is a common benchmark - roughly the wall area of an average bedroom plus hallway, or a small apartment main living space. Here is exactly how much paint you need.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `To cover 500 sq ft with one coat, you need approximately <strong>1.25 gallons</strong> (4.7 litres). For two coats, budget <strong>2.5 gallons</strong> - so buy <strong>3 gallons</strong> (11.4 litres) to be safe.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Standard paint covers 350-400 sq ft per gallon. For 500 sq ft, one gallon will leave you short. Always round up - the leftover is valuable for touch-ups over the next 1-2 years.</p>
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
                  <td className="py-2 pr-4 text-gray-700">500 sq ft - 1 coat, smooth wall</td>
                  <td className="py-2 pr-4 font-medium">1.25 gallons</td>
                  <td className="py-2 text-gray-600">4.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">500 sq ft - 2 coats, smooth wall</td>
                  <td className="py-2 pr-4 font-medium">2.5 gallons</td>
                  <td className="py-2 text-gray-600">9.5 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">500 sq ft - 2 coats, textured wall</td>
                  <td className="py-2 pr-4 font-medium">3-4 gallons</td>
                  <td className="py-2 text-gray-600">11.4-15.1 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">500 sq ft - primer only</td>
                  <td className="py-2 pr-4 font-medium">1.5 gallons</td>
                  <td className="py-2 text-gray-600">5.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">500 sq ft - ceiling paint (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2.5 gallons</td>
                  <td className="py-2 text-gray-600">9.5 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. Is 1 gallon enough to cover 500 sq ft?</dt>
              <dd className="text-gray-700 leading-relaxed">No - one gallon covers 350-400 sq ft. For 500 sq ft you need 1.25-1.5 gallons per coat, so buy 2 gallons and you will have some left over.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. How many coats to cover 500 sq ft?</dt>
              <dd className="text-gray-700 leading-relaxed">Two coats are standard. For a dramatic colour change or painting over a dark colour, three coats may be needed for full, even coverage.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How does paint coverage change with texture?</dt>
              <dd className="text-gray-700 leading-relaxed">Textured walls can increase paint consumption by 20-50%. For light orange-peel texture, add 20%. For heavy knockdown or stucco texture, add 50% or more.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. What affects paint coverage rate?</dt>
              <dd className="text-gray-700 leading-relaxed">Porosity of the surface, application method (brush/roller/spray), paint quality and viscosity, and surface colour all affect how far a gallon goes.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How much is 500 sq ft of wall area in room terms?</dt>
              <dd className="text-gray-700 leading-relaxed">500 sq ft of wall area roughly corresponds to a 12x15 room with 8ft ceilings, or two average bedrooms walls combined.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. Can I buy 2.5 gallons exactly?</dt>
              <dd className="text-gray-700 leading-relaxed">Paint is sold in quarts (0.25 gal), 1-gallon, and 5-gallon containers. For 2.5 gallons, buy two 1-gallon cans and two quarts - then you have a buffer for touch-ups.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 12x12 Room?</Link>
              <Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:underline text-sm">How Many Gallons of Paint for a Room?</Link>
              <Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:underline text-sm">Two Coat Paint Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
