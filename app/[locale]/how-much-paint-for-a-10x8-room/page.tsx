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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-10x8-room`;
  return {
    title: 'How Much Paint for a 10x8 Room? | The Paint Calculator',
    description: 'How much paint for a 10x8 room? Get accurate gallon estimates for this small room size, ideal for bathrooms, offices, and small bedrooms.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 10x8 Room?',
      description: 'How much paint for a 10x8 room? Get accurate gallon estimates for this small room size, ideal for bathrooms, offices, and small bedrooms.',
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
      "name": "How much paint for a 10x8 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One gallon is enough for two coats on all four walls of a 10x8 room. Buy an extra quart if you also want to paint the ceiling."
      }
    },
    {
      "@type": "Question",
      "name": "Can I paint a 10x8 room in a day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, a 10x8 room is a 2-3 hour paint job including prep, two coats, and cleanup."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best paint finish for a small room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Satin or eggshell works well. Avoid flat paint in small busy rooms as it shows marks. A slight sheen also reflects light and makes the room feel larger."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for a small bathroom 10x8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A bathroom needs moisture-resistant paint (satin or semi-gloss). One gallon is plenty for a 10x8 bathroom with two coats on the walls."
      }
    },
    {
      "@type": "Question",
      "name": "Do small rooms need primer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Primer is needed if painting over bare drywall, a dark colour, or water stains. Otherwise a quality paint-and-primer-in-one product is fine."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for a 10x8 room ceiling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 80 sq ft ceiling needs less than one quart per coat. One quart of ceiling paint covers it with room to spare for touch-ups."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 10x8 Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 10x8 Room?</h1>
        <p className="text-lg text-gray-600 mb-6">A 10x8 room is on the smaller side - often a small bathroom, walk-in closet converted to an office, or a tiny guest bedroom. At just 288 sq ft of wall area, it is very economical to paint.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 10x8 room with 8ft ceilings needs approximately <strong>1 gallon</strong> (3.8 litres) for two coats on the walls. This is one of the most paint-efficient room sizes.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> A 10x8 room's wall area (288 sq ft) is less than one gallon's worth per coat. After subtracting doors and windows, even two coats can be done with one gallon - a rare case where one gallon truly suffices.</p>
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
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Walls only (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (1 coat)</td>
                  <td className="py-2 pr-4 font-medium">0.2 gallon</td>
                  <td className="py-2 text-gray-600">0.75 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">0.4 gallon</td>
                  <td className="py-2 text-gray-600">1.5 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much paint for a 10x8 room?</dt>
              <dd className="text-gray-700 leading-relaxed">One gallon is enough for two coats on all four walls of a 10x8 room. Buy an extra quart if you also want to paint the ceiling.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Can I paint a 10x8 room in a day?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes, a 10x8 room is a 2-3 hour paint job including prep, two coats, and cleanup.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. What is the best paint finish for a small room?</dt>
              <dd className="text-gray-700 leading-relaxed">Satin or eggshell works well. Avoid flat paint in small busy rooms as it shows marks. A slight sheen also reflects light and makes the room feel larger.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How much paint for a small bathroom 10x8?</dt>
              <dd className="text-gray-700 leading-relaxed">A bathroom needs moisture-resistant paint (satin or semi-gloss). One gallon is plenty for a 10x8 bathroom with two coats on the walls.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Do small rooms need primer?</dt>
              <dd className="text-gray-700 leading-relaxed">Primer is needed if painting over bare drywall, a dark colour, or water stains. Otherwise a quality paint-and-primer-in-one product is fine.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How much paint for a 10x8 room ceiling?</dt>
              <dd className="text-gray-700 leading-relaxed">The 80 sq ft ceiling needs less than one quart per coat. One quart of ceiling paint covers it with room to spare for touch-ups.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:underline text-sm">Bathroom Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-10x10-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 10x10 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-bathroom`} className="text-blue-600 hover:underline text-sm">How Much Paint for a Bathroom?</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
