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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-bathroom`;
  return {
    title: 'How Much Paint for a Bathroom? | The Paint Calculator',
    description: 'How much paint for a bathroom? Get gallon estimates for small, average, and large bathrooms with tips on moisture-resistant finishes.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Bathroom?',
      description: 'How much paint for a bathroom? Get gallon estimates for small, average, and large bathrooms with tips on moisture-resistant finishes.',
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
      "name": "How much paint for a small bathroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 5x8 bathroom with 8ft ceilings needs about 1 quart to 1 gallon for two coats. One gallon is the safe buy to avoid running short."
      }
    },
    {
      "@type": "Question",
      "name": "What paint finish is best for a bathroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Satin or semi-gloss are ideal for bathrooms. They resist moisture, are easy to wipe clean, and hold up to the humidity from showers."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need special bathroom paint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bathroom-specific paints include mildew-resistant additives. While not strictly required with proper ventilation, they add an extra layer of protection."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for bathroom tiles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tile paint is expensive and specialised. A standard bathroom (5x8) needs about 1 quart of tile paint for the tile surround area."
      }
    },
    {
      "@type": "Question",
      "name": "How long does bathroom paint take to cure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Latex paint dries to touch in 1-2 hours but takes 30 days to fully cure. Run the exhaust fan after showers for the first month to help the paint cure properly."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use wall paint in a bathroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can use standard wall paint in a bathroom, but it will not last as long. A quality satin or semi-gloss exterior-grade latex is the minimum recommendation."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Bathroom?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Bathroom?</h1>
        <p className="text-lg text-gray-600 mb-6">Bathrooms are small spaces with big impact. Because of the moisture, steam, and humidity, paint choice matters as much as quantity - you need a moisture-resistant formula to prevent mould and peeling.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `An average bathroom (5x8 ft) needs approximately <strong>1 quart to 1 gallon</strong> (0.95-3.8 litres) for two coats. A master bathroom may need <strong>1-2 gallons</strong>.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Always use a satin or semi-gloss finish in bathrooms. These resist moisture and are easy to wipe down. Flat paint in a bathroom will absorb moisture and eventually bubble and peel.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Small bathroom 5x8 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 quart-1 gallon</td>
                  <td className="py-2 text-gray-600">0.95-3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Average bathroom 8x10 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Large bathroom 10x12 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1.5 gallons</td>
                  <td className="py-2 text-gray-600">5.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Master bath 12x14 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling only 8x10 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">0.5 gallon</td>
                  <td className="py-2 text-gray-600">1.9 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much paint for a small bathroom?</dt>
              <dd className="text-gray-700 leading-relaxed">A 5x8 bathroom with 8ft ceilings needs about 1 quart to 1 gallon for two coats. One gallon is the safe buy to avoid running short.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. What paint finish is best for a bathroom?</dt>
              <dd className="text-gray-700 leading-relaxed">Satin or semi-gloss are ideal for bathrooms. They resist moisture, are easy to wipe clean, and hold up to the humidity from showers.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. Do I need special bathroom paint?</dt>
              <dd className="text-gray-700 leading-relaxed">Bathroom-specific paints include mildew-resistant additives. While not strictly required with proper ventilation, they add an extra layer of protection.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How much paint for bathroom tiles?</dt>
              <dd className="text-gray-700 leading-relaxed">Tile paint is expensive and specialised. A standard bathroom (5x8) needs about 1 quart of tile paint for the tile surround area.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How long does bathroom paint take to cure?</dt>
              <dd className="text-gray-700 leading-relaxed">Latex paint dries to touch in 1-2 hours but takes 30 days to fully cure. Run the exhaust fan after showers for the first month to help the paint cure properly.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. Can I use wall paint in a bathroom?</dt>
              <dd className="text-gray-700 leading-relaxed">You can use standard wall paint in a bathroom, but it will not last as long. A quality satin or semi-gloss exterior-grade latex is the minimum recommendation.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:underline text-sm">Bathroom Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-10x8-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 10x8 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:underline text-sm">How Much Paint for a Bedroom?</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
