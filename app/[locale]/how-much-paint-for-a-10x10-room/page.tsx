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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-10x10-room`;
  return {
    title: 'How Much Paint for a 10x10 Room? | The Paint Calculator',
    description: 'How much paint for a 10x10 room? Get exact gallon and litre estimates for walls, ceiling, and trim for this common room size.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 10x10 Room?',
      description: 'How much paint for a 10x10 room? Get exact gallon and litre estimates for walls, ceiling, and trim for this common room size.',
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
      "name": "How many gallons of paint for a 10x10 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One gallon covers a 10x10 room with a single coat. For two coats (recommended), buy 2 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "Can I paint a 10x10 room with one gallon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, one gallon is sufficient for a single coat. If you are applying two coats or changing from a dark colour, you will need 2 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for the ceiling of a 10x10 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ceiling is 100 sq ft. One quart is enough for one coat; one gallon covers two coats with leftover for touch-ups."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 10x10 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 10x10 room can be painted in 3-5 hours including prep and two coats, with drying time between coats."
      }
    },
    {
      "@type": "Question",
      "name": "What paint finish is best for a small room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eggshell or satin works well. Avoid flat/matte on walls in busy rooms as it scuffs easily."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need primer for a 10x10 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Primer is needed when painting over bare drywall, a dark colour, or stains. Otherwise, a paint-and-primer-in-one product is fine."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 10x10 Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 10x10 Room?</h1>
        <p className="text-lg text-gray-600 mb-6">A 10x10 room is one of the smallest standard room sizes - common for small bedrooms, home offices, or nurseries. Because the square footage is modest, painting it is fast and affordable.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 10x10 room with 8ft ceilings needs approximately <strong>1 gallon</strong> (3.8 litres) for one coat on the walls. For two coats, budget <strong>2 gallons</strong> (7.6 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> A 10x10 room has roughly 320 sq ft of wall area (before subtracting openings). One gallon of standard paint covers ~400 sq ft, so one gallon is enough for a single coat.</p>
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
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Walls only (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (1 coat)</td>
                  <td className="py-2 pr-4 font-medium">0.4 gallon</td>
                  <td className="py-2 text-gray-600">1.5 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">0.8 gallon</td>
                  <td className="py-2 text-gray-600">3 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons of paint for a 10x10 room?</dt>
              <dd className="text-gray-700 leading-relaxed">One gallon covers a 10x10 room with a single coat. For two coats (recommended), buy 2 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Can I paint a 10x10 room with one gallon?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes, one gallon is sufficient for a single coat. If you are applying two coats or changing from a dark colour, you will need 2 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How much paint for the ceiling of a 10x10 room?</dt>
              <dd className="text-gray-700 leading-relaxed">The ceiling is 100 sq ft. One quart is enough for one coat; one gallon covers two coats with leftover for touch-ups.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How long does it take to paint a 10x10 room?</dt>
              <dd className="text-gray-700 leading-relaxed">A 10x10 room can be painted in 3-5 hours including prep and two coats, with drying time between coats.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. What paint finish is best for a small room?</dt>
              <dd className="text-gray-700 leading-relaxed">Eggshell or satin works well. Avoid flat/matte on walls in busy rooms as it scuffs easily.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. Do I need primer for a 10x10 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Primer is needed when painting over bare drywall, a dark colour, or stains. Otherwise, a paint-and-primer-in-one product is fine.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:underline text-sm">Bedroom Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 12x12 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-10x8-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 10x8 Room?</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
