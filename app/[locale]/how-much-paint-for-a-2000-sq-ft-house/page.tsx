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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-2000-sq-ft-house`;
  return {
    title: 'How Much Paint for a 2000 Sq Ft House? | The Paint Calculator',
    description: 'How much paint for a 2000 sq ft house? Get interior and exterior gallon estimates, cost breakdowns, and tips for whole-house painting.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 2000 Sq Ft House?',
      description: 'How much paint for a 2000 sq ft house? Get interior and exterior gallon estimates, cost breakdowns, and tips for whole-house painting.',
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
      "name": "How many gallons of paint for a 2000 sq ft house interior?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan on 12-15 gallons for walls plus 5-6 gallons for ceilings. Add 2-3 gallons for trim, bringing the total to 19-24 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to paint a 2000 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paint alone costs $400-$900. Hiring painters for the full interior runs $2,000-$5,000 depending on location and finish quality."
      }
    },
    {
      "@type": "Question",
      "name": "How many gallons for the exterior of a 2000 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exterior painting needs 10-14 gallons for two coats. Rough or textured siding (stucco, brick) requires 20-30% more paint."
      }
    },
    {
      "@type": "Question",
      "name": "Can I paint a 2000 sq ft house myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but plan for a 3-5 day project for interiors. Proper prep (filling, sanding, taping) is key to a professional result."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 2000 sq ft house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A crew of two can complete the interior in 3-4 days. A solo DIYer should budget 7-10 days to do it properly."
      }
    },
    {
      "@type": "Question",
      "name": "What type of paint is best for a whole house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a quality latex paint with a built-in primer for walls. Semi-gloss for trim, satin for kitchens and bathrooms, eggshell for living areas and bedrooms."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 2000 Sq Ft House?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 2000 Sq Ft House?</h1>
        <p className="text-lg text-gray-600 mb-6">Painting an entire 2000 sq ft home is a significant project. Whether you are doing a full interior refresh or repainting the exterior, calculating paint quantities upfront prevents mid-job supply shortages.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 2000 sq ft house needs approximately <strong>12-15 gallons</strong> (45-57 litres) for interior walls (two coats). Exterior painting requires <strong>10-14 gallons</strong> depending on siding type.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Interior wall area in a 2000 sq ft house is typically 2.5-3x the floor plan square footage when you account for all rooms and ceiling heights. Always add 10% buffer to your estimate.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Interior walls (1 coat)</td>
                  <td className="py-2 pr-4 font-medium">6-8 gallons</td>
                  <td className="py-2 text-gray-600">22.7-30.3 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Interior walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">12-15 gallons</td>
                  <td className="py-2 text-gray-600">45.4-56.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceilings (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">5-6 gallons</td>
                  <td className="py-2 text-gray-600">18.9-22.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Interior trim</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Exterior (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">10-14 gallons</td>
                  <td className="py-2 text-gray-600">37.9-53 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons of paint for a 2000 sq ft house interior?</dt>
              <dd className="text-gray-700 leading-relaxed">Plan on 12-15 gallons for walls plus 5-6 gallons for ceilings. Add 2-3 gallons for trim, bringing the total to 19-24 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. How much does it cost to paint a 2000 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">Paint alone costs $400-$900. Hiring painters for the full interior runs $2,000-$5,000 depending on location and finish quality.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How many gallons for the exterior of a 2000 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">Exterior painting needs 10-14 gallons for two coats. Rough or textured siding (stucco, brick) requires 20-30% more paint.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Can I paint a 2000 sq ft house myself?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes, but plan for a 3-5 day project for interiors. Proper prep (filling, sanding, taping) is key to a professional result.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How long does it take to paint a 2000 sq ft house?</dt>
              <dd className="text-gray-700 leading-relaxed">A crew of two can complete the interior in 3-4 days. A solo DIYer should budget 7-10 days to do it properly.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. What type of paint is best for a whole house?</dt>
              <dd className="text-gray-700 leading-relaxed">Use a quality latex paint with a built-in primer for walls. Semi-gloss for trim, satin for kitchens and bathrooms, eggshell for living areas and bedrooms.</dd>
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
              <Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:underline text-sm">Exterior Paint Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
