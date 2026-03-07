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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-deck`;
  return {
    title: 'How Much Paint for a Deck? | The Paint Calculator',
    description: 'How much paint for a deck? Get gallon estimates per square foot for painted and stained decks with tips for long-lasting results.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Deck?',
      description: 'How much paint for a deck? Get gallon estimates per square foot for painted and stained decks with tips for long-lasting results.',
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
      "name": "How much paint do I need for a deck?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One gallon of deck paint covers approximately 250-300 sq ft per coat. A 300 sq ft deck needs 2 gallons for two coats."
      }
    },
    {
      "@type": "Question",
      "name": "Should I paint or stain my deck?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stain penetrates the wood and lasts longer with less maintenance. Paint sits on the surface and can peel. For aged or uneven wood, paint hides imperfections better."
      }
    },
    {
      "@type": "Question",
      "name": "How many coats of paint on a deck?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two coats are standard. Some manufacturers recommend three coats for heavily trafficked decks or when starting on bare wood after stripping."
      }
    },
    {
      "@type": "Question",
      "name": "How long does deck paint last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality deck paint lasts 3-5 years with proper prep. Stain lasts 2-4 years. Sanding and cleaning before recoating extends the life significantly."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need primer on a deck?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "New or stripped decks benefit from a wood primer to improve adhesion. Many deck paints are self-priming, which simplifies the process."
      }
    },
    {
      "@type": "Question",
      "name": "How long after painting a deck can I use it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deck paint is dry to walk on within 24-48 hours. Full cure for furniture takes 7 days. Avoid heavy furniture or wetting the deck for at least 72 hours."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Deck?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Deck?</h1>
        <p className="text-lg text-gray-600 mb-6">Deck painting or staining protects the wood from weather, UV rays, and foot traffic. Getting the quantity right is straightforward once you know the square footage - but wood porosity can significantly affect how much you need.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 300 sq ft deck needs approximately <strong>1 gallon</strong> (3.8 litres) of deck paint per coat. For two coats, budget <strong>2 gallons</strong> (7.6 litres). Porous or weathered wood needs up to 50% more.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Measure the actual board surface area, not just the deck footprint. If boards have gaps, the true paintable area is about 85-90% of the footprint. Weathered or porous wood absorbs significantly more paint than smooth new wood.</p>
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
                  <td className="py-2 pr-4 text-gray-700">200 sq ft deck (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1-2 gallons</td>
                  <td className="py-2 text-gray-600">3.8-7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">300 sq ft deck (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">400 sq ft deck (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">500 sq ft deck (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">3 gallons</td>
                  <td className="py-2 text-gray-600">11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Railings and stairs (add)</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much paint do I need for a deck?</dt>
              <dd className="text-gray-700 leading-relaxed">One gallon of deck paint covers approximately 250-300 sq ft per coat. A 300 sq ft deck needs 2 gallons for two coats.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Should I paint or stain my deck?</dt>
              <dd className="text-gray-700 leading-relaxed">Stain penetrates the wood and lasts longer with less maintenance. Paint sits on the surface and can peel. For aged or uneven wood, paint hides imperfections better.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How many coats of paint on a deck?</dt>
              <dd className="text-gray-700 leading-relaxed">Two coats are standard. Some manufacturers recommend three coats for heavily trafficked decks or when starting on bare wood after stripping.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How long does deck paint last?</dt>
              <dd className="text-gray-700 leading-relaxed">Quality deck paint lasts 3-5 years with proper prep. Stain lasts 2-4 years. Sanding and cleaning before recoating extends the life significantly.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Do I need primer on a deck?</dt>
              <dd className="text-gray-700 leading-relaxed">New or stripped decks benefit from a wood primer to improve adhesion. Many deck paints are self-priming, which simplifies the process.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How long after painting a deck can I use it?</dt>
              <dd className="text-gray-700 leading-relaxed">Deck paint is dry to walk on within 24-48 hours. Full cure for furniture takes 7 days. Avoid heavy furniture or wetting the deck for at least 72 hours.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/deck-paint-calculator`} className="text-blue-600 hover:underline text-sm">Deck Paint Calculator</Link>
              <Link href={`/${locale}/deck-stain-calculator`} className="text-blue-600 hover:underline text-sm">Deck Stain Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-fence`} className="text-blue-600 hover:underline text-sm">How Much Paint for a Fence?</Link>
              <Link href={`/${locale}/stain-calculator`} className="text-blue-600 hover:underline text-sm">Stain Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
