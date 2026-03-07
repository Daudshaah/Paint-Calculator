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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-1000-sq-ft-house`;
  return {
    title: 'How Much Paint for a 1000 Sq Ft House? | The Paint Calculator',
    description: 'How much paint for a 1000 sq ft house? Get interior and exterior paint estimates for a small home or apartment painting project.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 1000 Sq Ft House?',
      description: 'How much paint for a 1000 sq ft house? Get interior and exterior paint estimates for a small home or apartment painting project.',
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
      "name": "How many gallons of paint for a 1000 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget 10-13 gallons for a complete interior including walls, ceilings, and trim. The exterior requires 6-8 gallons depending on siding type."
      }
    },
    {
      "@type": "Question",
      "name": "Can I paint a 1000 sq ft house in a weekend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes - with proper prep done on Friday and an early start Saturday, two people can complete a 1000 sq ft interior in a weekend."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to paint a 1000 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paint costs $200-$450 for a complete interior job. Professional painters charge $1,000-$2,500 for a 1000 sq ft interior."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use 1 or 5 gallon containers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If you need 6+ gallons of the same colour, buy a 5-gallon bucket plus extra gallons. This ensures colour consistency and costs less per gallon."
      }
    },
    {
      "@type": "Question",
      "name": "How much primer for a 1000 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If the walls are in good condition, skip primer and use paint-and-primer-in-one. For new drywall or colour changes, you need 3-4 gallons of primer."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 1000 sq ft house interior?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A solo painter can complete a 1000 sq ft interior in 3-4 days. Two people working together can finish in a full weekend."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 1000 Sq Ft House?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 1000 Sq Ft House?</h1>
        <p className="text-lg text-gray-600 mb-6">Whether it is a small starter home, a condo, or an apartment, a 1000 sq ft space is one of the most manageable whole-home paint projects. Most people can complete it in a weekend.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 1000 sq ft house needs approximately <strong>6-8 gallons</strong> (22.7-30.3 litres) for interior walls with two coats. Add <strong>3 gallons</strong> for ceilings and <strong>1-2 gallons</strong> for trim.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> For a 1000 sq ft home, budget 10-12 gallons total for a complete interior (walls, ceilings, and trim). Buy in 5-gallon buckets for the main wall colour to save 10-15% versus individual gallons.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Interior walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">6-8 gallons</td>
                  <td className="py-2 text-gray-600">22.7-30.3 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceilings (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Interior trim</td>
                  <td className="py-2 pr-4 font-medium">1-2 gallons</td>
                  <td className="py-2 text-gray-600">3.8-7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Exterior walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">5-7 gallons</td>
                  <td className="py-2 text-gray-600">18.9-26.5 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Exterior trim</td>
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons of paint for a 1000 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">Budget 10-13 gallons for a complete interior including walls, ceilings, and trim. The exterior requires 6-8 gallons depending on siding type.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Can I paint a 1000 sq ft house in a weekend?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes - with proper prep done on Friday and an early start Saturday, two people can complete a 1000 sq ft interior in a weekend.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How much does it cost to paint a 1000 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">Paint costs $200-$450 for a complete interior job. Professional painters charge $1,000-$2,500 for a 1000 sq ft interior.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Should I use 1 or 5 gallon containers?</dt>
              <dd className="text-gray-700 leading-relaxed">If you need 6+ gallons of the same colour, buy a 5-gallon bucket plus extra gallons. This ensures colour consistency and costs less per gallon.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How much primer for a 1000 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">If the walls are in good condition, skip primer and use paint-and-primer-in-one. For new drywall or colour changes, you need 3-4 gallons of primer.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How long does it take to paint a 1000 sq ft house interior?</dt>
              <dd className="text-gray-700 leading-relaxed">A solo painter can complete a 1000 sq ft interior in 3-4 days. Two people working together can finish in a full weekend.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:underline text-sm">Whole House Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-1500-sq-ft-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 1500 Sq Ft House?</Link>
              <Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for Interior of House?</Link>
              <Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:underline text-sm">Paint Cost Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
