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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-kitchen-cabinets`;
  return {
    title: 'How Much Paint for Kitchen Cabinets? | The Paint Calculator',
    description: 'Find out how much paint you need for kitchen cabinets. Gallon estimates for small, medium, and large kitchens with tips for a smooth finish.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Kitchen Cabinets?',
      description: 'Find out how much paint you need for kitchen cabinets. Gallon estimates for small, medium, and large kitchens with tips for a smooth finish.',
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
      "name": "How much paint do I need for kitchen cabinets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An average kitchen with 20 cabinet doors needs about 1 gallon for two coats. Large kitchens with 30+ doors need 1.5-2 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need primer before painting kitchen cabinets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, primer is essential for adhesion on cabinets, especially if painting over laminate, previously painted surfaces, or bare wood."
      }
    },
    {
      "@type": "Question",
      "name": "What type of paint is best for kitchen cabinets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a hard-wearing enamel or alkyd-hybrid cabinet paint. Semi-gloss or satin finish resists moisture, grease, and frequent cleaning."
      }
    },
    {
      "@type": "Question",
      "name": "Should I spray or brush kitchen cabinets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spraying gives the smoothest finish but requires more setup. A quality foam roller and brush combo works well for DIY projects."
      }
    },
    {
      "@type": "Question",
      "name": "How many coats of paint on kitchen cabinets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two coats of paint plus one coat of primer is standard. Some painters apply three thin coats of paint for the most durable finish."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint kitchen cabinets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Removing, painting, and rehinging all cabinet doors typically takes 2-3 days for an average kitchen when allowing proper drying time."
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
            <li className="text-gray-800 font-medium">How Much Paint for Kitchen Cabinets?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for Kitchen Cabinets?</h1>
        <p className="text-lg text-gray-600 mb-6">Painting kitchen cabinets is one of the highest-ROI home improvement projects. Knowing how much paint to buy prevents waste - cabinet paint is significantly more expensive than wall paint.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `An average kitchen needs <strong>1 quart to 1 gallon</strong> (0.95-3.8 litres) of cabinet paint for two coats. A large kitchen with many cabinets may need <strong>1-2 gallons</strong>.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Cabinet paint is dense and self-levelling. You will need less than you think - measure total door and drawer front area rather than counting cabinet boxes.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Small kitchen (10 doors, 2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Average kitchen (20 doors, 2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Large kitchen (30+ doors, 2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1.5-2 gallons</td>
                  <td className="py-2 text-gray-600">5.7-7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Cabinet boxes (interior)</td>
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Primer coat</td>
                  <td className="py-2 pr-4 font-medium">1 quart-1 gallon</td>
                  <td className="py-2 text-gray-600">0.95-3.8 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much paint do I need for kitchen cabinets?</dt>
              <dd className="text-gray-700 leading-relaxed">An average kitchen with 20 cabinet doors needs about 1 gallon for two coats. Large kitchens with 30+ doors need 1.5-2 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Do I need primer before painting kitchen cabinets?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes, primer is essential for adhesion on cabinets, especially if painting over laminate, previously painted surfaces, or bare wood.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. What type of paint is best for kitchen cabinets?</dt>
              <dd className="text-gray-700 leading-relaxed">Use a hard-wearing enamel or alkyd-hybrid cabinet paint. Semi-gloss or satin finish resists moisture, grease, and frequent cleaning.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Should I spray or brush kitchen cabinets?</dt>
              <dd className="text-gray-700 leading-relaxed">Spraying gives the smoothest finish but requires more setup. A quality foam roller and brush combo works well for DIY projects.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How many coats of paint on kitchen cabinets?</dt>
              <dd className="text-gray-700 leading-relaxed">Two coats of paint plus one coat of primer is standard. Some painters apply three thin coats of paint for the most durable finish.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How long does it take to paint kitchen cabinets?</dt>
              <dd className="text-gray-700 leading-relaxed">Removing, painting, and rehinging all cabinet doors typically takes 2-3 days for an average kitchen when allowing proper drying time.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/cabinet-paint-calculator`} className="text-blue-600 hover:underline text-sm">Cabinet Paint Calculator</Link>
              <Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:underline text-sm">Kitchen Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a Living Room?</Link>
              <Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:underline text-sm">Paint Cost Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
