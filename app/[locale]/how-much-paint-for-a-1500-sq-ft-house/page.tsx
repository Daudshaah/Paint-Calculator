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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-1500-sq-ft-house`;
  return {
    title: 'How Much Paint for a 1500 Sq Ft House? | The Paint Calculator',
    description: 'How much paint for a 1500 sq ft house? Get interior and exterior gallon estimates for a complete house painting project.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 1500 Sq Ft House?',
      description: 'How much paint for a 1500 sq ft house? Get interior and exterior gallon estimates for a complete house painting project.',
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
      "name": "How many gallons to paint a 1500 sq ft house interior?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You need 9-12 gallons for walls plus 4-5 gallons for ceilings and 2 gallons for trim - about 15-19 gallons total for the full interior."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to paint a 1500 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paint alone costs $300-$700 for the interior. Professional painters charge $1,500-$4,000 for a full interior paint job on a 1500 sq ft home."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 1500 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A DIYer working alone should plan 5-7 days. A pair of painters can complete it in 3-4 days with proper prep and drying time."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for the exterior of a 1500 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exterior painting requires 7-10 gallons for two coats, depending on siding type. Add 1-2 gallons for fascia and trim."
      }
    },
    {
      "@type": "Question",
      "name": "Should I hire a painter or DIY a 1500 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DIY saves 60-70% on cost. However, hiring professionals delivers faster results and includes prep, which is often the most labour-intensive step."
      }
    },
    {
      "@type": "Question",
      "name": "What type of paint is best for a whole house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a quality latex paint with a built-in primer. Match the finish to each area: flat for ceilings, eggshell for living areas, satin for kitchens/baths, semi-gloss for trim."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 1500 Sq Ft House?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 1500 Sq Ft House?</h1>
        <p className="text-lg text-gray-600 mb-6">A 1500 sq ft home is a great candidate for a full DIY paint refresh. Whether you are going room by room or doing the whole house in one push, careful calculation upfront saves multiple trips to the paint store.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 1500 sq ft house needs approximately <strong>9-12 gallons</strong> (34-45 litres) for interior walls with two coats. Add <strong>4-5 gallons</strong> for ceilings and <strong>2 gallons</strong> for trim.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Interior wall area in a 1500 sq ft home is typically 1.5-2x the floor plan area. Use 2x as your multiplier for a rough estimate, then subtract 10-15% for doors, windows, and other openings.</p>
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
                  <td className="py-2 pr-4 font-medium">9-12 gallons</td>
                  <td className="py-2 text-gray-600">34.1-45.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceilings (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">4-5 gallons</td>
                  <td className="py-2 text-gray-600">15.1-18.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Interior trim</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Exterior walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">7-10 gallons</td>
                  <td className="py-2 text-gray-600">26.5-37.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Exterior trim</td>
                  <td className="py-2 pr-4 font-medium">1-2 gallons</td>
                  <td className="py-2 text-gray-600">3.8-7.6 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons to paint a 1500 sq ft house interior?</dt>
              <dd className="text-gray-700 leading-relaxed">You need 9-12 gallons for walls plus 4-5 gallons for ceilings and 2 gallons for trim - about 15-19 gallons total for the full interior.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. How much does it cost to paint a 1500 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">Paint alone costs $300-$700 for the interior. Professional painters charge $1,500-$4,000 for a full interior paint job on a 1500 sq ft home.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How long does it take to paint a 1500 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">A DIYer working alone should plan 5-7 days. A pair of painters can complete it in 3-4 days with proper prep and drying time.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How much paint for the exterior of a 1500 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">Exterior painting requires 7-10 gallons for two coats, depending on siding type. Add 1-2 gallons for fascia and trim.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Should I hire a painter or DIY a 1500 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">DIY saves 60-70% on cost. However, hiring professionals delivers faster results and includes prep, which is often the most labour-intensive step.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. What type of paint is best for a whole house?</dt>
              <dd className="text-gray-700 leading-relaxed">Use a quality latex paint with a built-in primer. Match the finish to each area: flat for ceilings, eggshell for living areas, satin for kitchens/baths, semi-gloss for trim.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:underline text-sm">Whole House Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 2000 Sq Ft House?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-1000-sq-ft-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 1000 Sq Ft House?</Link>
              <Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:underline text-sm">Paint Cost Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
