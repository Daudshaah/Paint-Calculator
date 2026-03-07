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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-front-door`;
  return {
    title: 'How Much Paint for a Front Door? | The Paint Calculator',
    description: 'How much paint for a front door? Get exact quart and litre estimates for single and double doors with tips for a flawless finish.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Front Door?',
      description: 'How much paint for a front door? Get exact quart and litre estimates for single and double doors with tips for a flawless finish.',
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
      "name": "How much paint do I need for a front door?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One quart is enough to paint both sides of a standard 36x80 inch front door with two coats. You will have some left over for touch-ups."
      }
    },
    {
      "@type": "Question",
      "name": "What type of paint is best for a front door?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use exterior gloss or semi-gloss paint for maximum durability. Oil-based alkyd paints give the hardest finish, while quality latex exterior paints are easier to clean up."
      }
    },
    {
      "@type": "Question",
      "name": "How many coats of paint does a front door need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two topcoats over a primer or existing painted surface. If stripping back to bare wood, apply one primer coat plus two topcoats."
      }
    },
    {
      "@type": "Question",
      "name": "How long does paint take to dry on a front door?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Latex paint dries to touch in 1-2 hours. Allow 4-6 hours between coats and at least 24 hours before rehinging the door to avoid sticking."
      }
    },
    {
      "@type": "Question",
      "name": "Can I paint my front door without removing it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, but removing it gives a much cleaner result. If painting in place, prop it open and work quickly to avoid runs on vertical surfaces."
      }
    },
    {
      "@type": "Question",
      "name": "What are the most popular front door paint colours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Black, navy blue, red, forest green, and bright yellow are consistently popular choices that add strong kerb appeal."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Front Door?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Front Door?</h1>
        <p className="text-lg text-gray-600 mb-6">A freshly painted front door is one of the quickest ways to boost curb appeal. Because doors are a small surface area, you need far less paint than you might expect.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A standard front door needs approximately <strong>1 quart</strong> (0.95 litres) for two coats. A double door needs <strong>1-2 quarts</strong> (0.95-1.9 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Remove the door from its hinges for the best finish. Paint horizontal panels first, then vertical panels, then the edges. Use a small foam roller for flat areas and a brush for details.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Single door - 1 side (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Single door - both sides (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Double door (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1-2 quarts</td>
                  <td className="py-2 text-gray-600">0.95-1.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Door frame and surround</td>
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Sidelights (2 coats)</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much paint do I need for a front door?</dt>
              <dd className="text-gray-700 leading-relaxed">One quart is enough to paint both sides of a standard 36x80 inch front door with two coats. You will have some left over for touch-ups.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. What type of paint is best for a front door?</dt>
              <dd className="text-gray-700 leading-relaxed">Use exterior gloss or semi-gloss paint for maximum durability. Oil-based alkyd paints give the hardest finish, while quality latex exterior paints are easier to clean up.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How many coats of paint does a front door need?</dt>
              <dd className="text-gray-700 leading-relaxed">Two topcoats over a primer or existing painted surface. If stripping back to bare wood, apply one primer coat plus two topcoats.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How long does paint take to dry on a front door?</dt>
              <dd className="text-gray-700 leading-relaxed">Latex paint dries to touch in 1-2 hours. Allow 4-6 hours between coats and at least 24 hours before rehinging the door to avoid sticking.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Can I paint my front door without removing it?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes, but removing it gives a much cleaner result. If painting in place, prop it open and work quickly to avoid runs on vertical surfaces.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. What are the most popular front door paint colours?</dt>
              <dd className="text-gray-700 leading-relaxed">Black, navy blue, red, forest green, and bright yellow are consistently popular choices that add strong kerb appeal.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:underline text-sm">Exterior Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-fence`} className="text-blue-600 hover:underline text-sm">How Much Paint for a Fence?</Link>
              <Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:underline text-sm">Paint Cost Calculator</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
