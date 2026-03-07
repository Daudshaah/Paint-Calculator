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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-interior-of-house`;
  return {
    title: 'How Much Paint for Interior of House? | The Paint Calculator',
    description: 'Calculate how much paint you need for the interior of a house. Includes formulas, room-by-room estimates, and tips to save on paint.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Interior of House?',
      description: 'Calculate how much paint you need for the interior of a house. Includes formulas, room-by-room estimates, and tips to save on paint.',
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
      "name": "How do I calculate paint for the interior of my house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Measure each room perimeter, multiply by ceiling height, subtract 20 sq ft per door and 15 sq ft per window, and divide by 400 for gallons per coat."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to paint a house interior?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paint alone runs $400-$1,200 depending on home size. Professional labour adds $1,500-$6,000 for a complete interior job."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use the same colour throughout the house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using one colour throughout saves money (buy in bulk) and creates cohesion. A single accent wall per room adds variety without requiring extra cans."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for ceilings in a whole house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Budget 1 gallon of ceiling paint per 400 sq ft of floor space for two coats. A 1500 sq ft home needs 4-5 gallons of ceiling paint."
      }
    },
    {
      "@type": "Question",
      "name": "How much trim paint for a whole house interior?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Allow 1 gallon of semi-gloss trim paint per 400-500 sq ft of floor space. A 1500 sq ft home typically needs 3-4 gallons for all trim."
      }
    },
    {
      "@type": "Question",
      "name": "What order should I paint rooms in a whole house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Work from top to bottom: ceilings first, then walls, then trim. Start from the room furthest from the entrance so you are not stepping on fresh work."
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
            <li className="text-gray-800 font-medium">How Much Paint for Interior of House?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for Interior of House?</h1>
        <p className="text-lg text-gray-600 mb-6">Estimating paint for an entire home interior can feel overwhelming, but it breaks down simply. The key is calculating total wall area - not floor area - and accounting for doors, windows, ceilings, and trim separately.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `As a general rule, multiply your home square footage by <strong>2.5</strong> to get total wall area, then divide by 400 (coverage per gallon) to get gallons needed. A 1500 sq ft home needs <strong>9-12 gallons</strong> for two wall coats.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> The quickest formula: (Floor area x 2.5) divided by 400 = gallons per coat for walls. Double this for two coats. Add 15% for ceilings and 10% for trim.</p>
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
                  <td className="py-2 pr-4 text-gray-700">800 sq ft home - walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">5-6 gallons</td>
                  <td className="py-2 text-gray-600">18.9-22.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">1000 sq ft home - walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">6-8 gallons</td>
                  <td className="py-2 text-gray-600">22.7-30.3 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">1500 sq ft home - walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">9-12 gallons</td>
                  <td className="py-2 text-gray-600">34.1-45.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">2000 sq ft home - walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">12-15 gallons</td>
                  <td className="py-2 text-gray-600">45.4-56.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">2500 sq ft home - walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">15-19 gallons</td>
                  <td className="py-2 text-gray-600">56.8-71.9 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How do I calculate paint for the interior of my house?</dt>
              <dd className="text-gray-700 leading-relaxed">Measure each room perimeter, multiply by ceiling height, subtract 20 sq ft per door and 15 sq ft per window, and divide by 400 for gallons per coat.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. How much does it cost to paint a house interior?</dt>
              <dd className="text-gray-700 leading-relaxed">Paint alone runs $400-$1,200 depending on home size. Professional labour adds $1,500-$6,000 for a complete interior job.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. Should I use the same colour throughout the house?</dt>
              <dd className="text-gray-700 leading-relaxed">Using one colour throughout saves money (buy in bulk) and creates cohesion. A single accent wall per room adds variety without requiring extra cans.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How much paint for ceilings in a whole house?</dt>
              <dd className="text-gray-700 leading-relaxed">Budget 1 gallon of ceiling paint per 400 sq ft of floor space for two coats. A 1500 sq ft home needs 4-5 gallons of ceiling paint.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How much trim paint for a whole house interior?</dt>
              <dd className="text-gray-700 leading-relaxed">Allow 1 gallon of semi-gloss trim paint per 400-500 sq ft of floor space. A 1500 sq ft home typically needs 3-4 gallons for all trim.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. What order should I paint rooms in a whole house?</dt>
              <dd className="text-gray-700 leading-relaxed">Work from top to bottom: ceilings first, then walls, then trim. Start from the room furthest from the entrance so you are not stepping on fresh work.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:underline text-sm">Whole House Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 2000 Sq Ft House?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-1500-sq-ft-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 1500 Sq Ft House?</Link>
              <Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:underline text-sm">Paint Cost Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
