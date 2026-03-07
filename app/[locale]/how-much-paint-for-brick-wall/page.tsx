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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-brick-wall`;
  return {
    title: 'How Much Paint for Brick Wall? | The Paint Calculator',
    description: 'How much paint for a brick wall? Get gallon estimates for interior and exterior brick walls, with tips for painting over masonry.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Brick Wall?',
      description: 'How much paint for a brick wall? Get gallon estimates for interior and exterior brick walls, with tips for painting over masonry.',
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
      "name": "How much paint does brick absorb compared to drywall?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Brick absorbs 2-3x more paint than smooth drywall. A gallon that covers 400 sq ft on drywall will only cover 100-150 sq ft on bare brick."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need special paint for brick?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a breathable masonry or elastomeric paint for exterior brick. Interior brick can be painted with standard latex, but always prime first."
      }
    },
    {
      "@type": "Question",
      "name": "Can you unpaint brick?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Painted brick is very difficult to restore. Sandblasting can remove paint but often damages the brick face. Consider limewashing as a reversible alternative."
      }
    },
    {
      "@type": "Question",
      "name": "How many coats of paint on a brick wall?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three coats are often recommended for brick - one primer and two topcoats. The first coat soaks in heavily; subsequent coats build coverage."
      }
    },
    {
      "@type": "Question",
      "name": "What is limewash and is it different from paint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Limewash is a breathable, water-based coating made from slaked lime. It penetrates brick rather than coating it, allowing moisture to escape and giving a more natural look."
      }
    },
    {
      "@type": "Question",
      "name": "How long does paint last on brick?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exterior brick paint lasts 15-20 years when properly applied with a masonry primer. Interior brick paint can last indefinitely in a dry environment."
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
            <li className="text-gray-800 font-medium">How Much Paint for Brick Wall?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for Brick Wall?</h1>
        <p className="text-lg text-gray-600 mb-6">Painting brick is a unique challenge. The rough, porous surface absorbs paint much faster than drywall, making accurate estimation critical to avoiding mid-job shortages.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `Brick walls require <strong>2-3x more paint</strong> than smooth drywall due to their porous, textured surface. Budget <strong>1 gallon per 100-150 sq ft</strong> (rather than the standard 400 sq ft) for painted brick.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Always use a masonry primer before painting brick. Brick naturally off-gasses moisture which can cause paint to peel. A masonry primer seals the surface and dramatically improves adhesion.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Interior brick wall 10x8 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1.5 gallons</td>
                  <td className="py-2 text-gray-600">5.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Interior fireplace brick surround</td>
                  <td className="py-2 pr-4 font-medium">1 quart</td>
                  <td className="py-2 text-gray-600">0.95 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Exterior brick wall 20x10 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">3-4 gallons</td>
                  <td className="py-2 text-gray-600">11.4-15.1 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Full exterior brick home (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">15-20 gallons</td>
                  <td className="py-2 text-gray-600">56.8-75.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Masonry primer (per coat)</td>
                  <td className="py-2 pr-4 font-medium">1 gal per 100 sq ft</td>
                  <td className="py-2 text-gray-600">3.8 L per 9.3 sq m</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much paint does brick absorb compared to drywall?</dt>
              <dd className="text-gray-700 leading-relaxed">Brick absorbs 2-3x more paint than smooth drywall. A gallon that covers 400 sq ft on drywall will only cover 100-150 sq ft on bare brick.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Do I need special paint for brick?</dt>
              <dd className="text-gray-700 leading-relaxed">Use a breathable masonry or elastomeric paint for exterior brick. Interior brick can be painted with standard latex, but always prime first.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. Can you unpaint brick?</dt>
              <dd className="text-gray-700 leading-relaxed">Painted brick is very difficult to restore. Sandblasting can remove paint but often damages the brick face. Consider limewashing as a reversible alternative.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How many coats of paint on a brick wall?</dt>
              <dd className="text-gray-700 leading-relaxed">Three coats are often recommended for brick - one primer and two topcoats. The first coat soaks in heavily; subsequent coats build coverage.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. What is limewash and is it different from paint?</dt>
              <dd className="text-gray-700 leading-relaxed">Limewash is a breathable, water-based coating made from slaked lime. It penetrates brick rather than coating it, allowing moisture to escape and giving a more natural look.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How long does paint last on brick?</dt>
              <dd className="text-gray-700 leading-relaxed">Exterior brick paint lasts 15-20 years when properly applied with a masonry primer. Interior brick paint can last indefinitely in a dry environment.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:underline text-sm">Exterior Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-stucco`} className="text-blue-600 hover:underline text-sm">How Much Paint for Stucco?</Link>
              <Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:underline text-sm">Textured Wall Paint Calculator</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
