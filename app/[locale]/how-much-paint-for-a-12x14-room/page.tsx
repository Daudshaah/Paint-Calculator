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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-12x14-room`;
  return {
    title: 'How Much Paint for a 12x14 Room? | The Paint Calculator',
    description: 'How much paint for a 12x14 room? Get exact gallon and litre estimates for walls and ceiling with tips for this popular bedroom size.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 12x14 Room?',
      description: 'How much paint for a 12x14 room? Get exact gallon and litre estimates for walls and ceiling with tips for this popular bedroom size.',
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
      "name": "How many gallons for a 12x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two gallons is the standard for two coats on the walls of a 12x14 room. Add one gallon if you also plan to paint the ceiling."
      }
    },
    {
      "@type": "Question",
      "name": "Is a 12x14 room considered small or average?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 12x14 room (168 sq ft) is slightly above average for a secondary bedroom, providing comfortable space for a queen bed with furniture."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 12x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Expect 4-6 hours for a complete two-coat job, not including prep time. Prep (filling holes, taping) adds 1-2 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use the same colour for a 12x12 and a 12x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using the same colour in adjoining rooms creates flow. The slight size difference means you may only need one extra quart for the larger room."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a special roller nap for a 12x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 3/8 inch nap roller works well for smooth walls. Use 1/2 inch nap for textured or orange-peel walls."
      }
    },
    {
      "@type": "Question",
      "name": "How much for the ceiling of a 12x14 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ceiling is 168 sq ft. One quart is enough for one coat; buy one gallon for two coats with a small amount left over."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 12x14 Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 12x14 Room?</h1>
        <p className="text-lg text-gray-600 mb-6">The 12x14 room is a common size for guest bedrooms and smaller master bedrooms. Its wall area sits comfortably at about 416 sq ft, making it a manageable single-day paint project.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 12x14 room with 8ft ceilings needs approximately <strong>1-2 gallons</strong> (3.8-7.6 litres) for one coat on the walls. For two coats, budget <strong>2-3 gallons</strong> (7.6-11.4 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> A 12x14 room has 416 sq ft of wall space before subtracting doors and windows. After deductions, you will typically have around 370-380 sq ft of paintable wall area.</p>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons for a 12x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Two gallons is the standard for two coats on the walls of a 12x14 room. Add one gallon if you also plan to paint the ceiling.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Is a 12x14 room considered small or average?</dt>
              <dd className="text-gray-700 leading-relaxed">A 12x14 room (168 sq ft) is slightly above average for a secondary bedroom, providing comfortable space for a queen bed with furniture.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How long does it take to paint a 12x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Expect 4-6 hours for a complete two-coat job, not including prep time. Prep (filling holes, taping) adds 1-2 hours.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Should I use the same colour for a 12x12 and a 12x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Using the same colour in adjoining rooms creates flow. The slight size difference means you may only need one extra quart for the larger room.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Do I need a special roller nap for a 12x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">A 3/8 inch nap roller works well for smooth walls. Use 1/2 inch nap for textured or orange-peel walls.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How much for the ceiling of a 12x14 room?</dt>
              <dd className="text-gray-700 leading-relaxed">The ceiling is 168 sq ft. One quart is enough for one coat; buy one gallon for two coats with a small amount left over.</dd>
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
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
