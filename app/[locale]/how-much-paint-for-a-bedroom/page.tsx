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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-bedroom`;
  return {
    title: 'How Much Paint for a Bedroom? | The Paint Calculator',
    description: 'Calculate how much paint you need for a bedroom. Includes estimates for small, medium, and large bedrooms plus ceiling and trim.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Bedroom?',
      description: 'Calculate how much paint you need for a bedroom. Includes estimates for small, medium, and large bedrooms plus ceiling and trim.',
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
      "name": "How many gallons of paint do I need for a bedroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An average 12x12 bedroom needs 2 gallons for two coats on the walls. Larger master bedrooms need 3-4 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need special paint for a bedroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eggshell or satin finish is ideal for bedrooms - easy to wipe clean and less shiny than semi-gloss."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for a bedroom ceiling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 12x12 ceiling (144 sq ft) needs about 0.5 gallon per coat, or 1 gallon for two coats."
      }
    },
    {
      "@type": "Question",
      "name": "Should I paint bedroom trim a different colour?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "White or off-white trim against a coloured wall is classic. Budget 1 quart for trim in an average bedroom."
      }
    },
    {
      "@type": "Question",
      "name": "How many coats of paint does a bedroom need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two coats are standard for an even, lasting finish. If covering a very dark colour, a primer coat first is recommended."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to paint a bedroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DIY paint costs $30-$80 for an average bedroom. Hiring a painter typically costs $200-$600 depending on location and room size."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Bedroom?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Bedroom?</h1>
        <p className="text-lg text-gray-600 mb-6">Bedrooms vary widely in size, from compact 10x10 guest rooms to spacious 16x18 master suites. This guide covers paint quantities for all common bedroom sizes so you buy exactly what you need.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `An average bedroom (12x12 ft) needs <strong>2 gallons</strong> (7.6 litres) for two coats on walls. A larger master bedroom (14x16 ft) needs <strong>2-3 gallons</strong> (7.6-11.4 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Measure your bedroom walls before heading to the store. Multiply perimeter by ceiling height, then subtract 20 sq ft per door and 15 sq ft per window.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Small bedroom 10x10 (1 coat)</td>
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Small bedroom 10x10 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Average bedroom 12x12 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Large bedroom 14x16 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">3 gallons</td>
                  <td className="py-2 text-gray-600">11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Master bedroom 16x18 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">4 gallons</td>
                  <td className="py-2 text-gray-600">15.1 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons of paint do I need for a bedroom?</dt>
              <dd className="text-gray-700 leading-relaxed">An average 12x12 bedroom needs 2 gallons for two coats on the walls. Larger master bedrooms need 3-4 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Do I need special paint for a bedroom?</dt>
              <dd className="text-gray-700 leading-relaxed">Eggshell or satin finish is ideal for bedrooms - easy to wipe clean and less shiny than semi-gloss.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How much paint for a bedroom ceiling?</dt>
              <dd className="text-gray-700 leading-relaxed">A 12x12 ceiling (144 sq ft) needs about 0.5 gallon per coat, or 1 gallon for two coats.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Should I paint bedroom trim a different colour?</dt>
              <dd className="text-gray-700 leading-relaxed">White or off-white trim against a coloured wall is classic. Budget 1 quart for trim in an average bedroom.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How many coats of paint does a bedroom need?</dt>
              <dd className="text-gray-700 leading-relaxed">Two coats are standard for an even, lasting finish. If covering a very dark colour, a primer coat first is recommended.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How much does it cost to paint a bedroom?</dt>
              <dd className="text-gray-700 leading-relaxed">DIY paint costs $30-$80 for an average bedroom. Hiring a painter typically costs $200-$600 depending on location and room size.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:underline text-sm">Bedroom Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 12x12 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-14x14-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 14x14 Room?</Link>
              <Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:underline text-sm">Two Coat Paint Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
