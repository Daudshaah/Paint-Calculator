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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-15x15-room`;
  return {
    title: 'How Much Paint for a 15x15 Room? | The Paint Calculator',
    description: 'How much paint for a 15x15 room? Get gallon and litre estimates for a 225 sq ft room with guidance on walls, ceiling, and trim.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 15x15 Room?',
      description: 'How much paint for a 15x15 room? Get gallon and litre estimates for a 225 sq ft room with guidance on walls, ceiling, and trim.',
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
      "name": "How many gallons for a 15x15 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 gallons covers two coats on all walls. Add another gallon if you are also painting the ceiling, bringing the total to 4 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "Is 2 gallons enough for a 15x15 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "2 gallons is just enough for one coat. You need 3 gallons to apply two coats comfortably with a small buffer for touch-ups."
      }
    },
    {
      "@type": "Question",
      "name": "How much primer for a 15x15 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1-2 gallons of primer is appropriate for a 15x15 room. If using paint-and-primer-in-one, you can skip a separate primer coat."
      }
    },
    {
      "@type": "Question",
      "name": "What paint finish for a 15x15 bedroom?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eggshell is the most popular choice - it resists scuffs, is easy to wipe, and has a subtle sheen that flatters large walls."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 15x15 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plan for 6-8 hours for two wall coats plus prep. Adding the ceiling adds another 1-2 hours."
      }
    },
    {
      "@type": "Question",
      "name": "How much for accent wall in a 15x15 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One 15 ft accent wall (120 sq ft) needs about 1 quart per coat, or 1 gallon for two coats in a bold colour."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 15x15 Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 15x15 Room?</h1>
        <p className="text-lg text-gray-600 mb-6">A 15x15 room is a spacious bedroom or a comfortable living space. With 480 sq ft of wall area, it sits right at the two-gallon mark per coat - making accurate calculation especially important.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 15x15 room with 8ft ceilings needs approximately <strong>2 gallons</strong> (7.6 litres) per coat on the walls. For two coats, budget <strong>3-4 gallons</strong> (11.4-15.1 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> A 15x15 room has exactly 480 sq ft of wall area. After subtracting a standard door (20 sq ft) and two windows (30 sq ft total), you have ~430 sq ft to paint - just over one gallon per coat.</p>
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
                  <td className="py-2 pr-4 font-medium">1-2 gallons</td>
                  <td className="py-2 text-gray-600">5.7-7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Walls only (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">3 gallons</td>
                  <td className="py-2 text-gray-600">11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (1 coat)</td>
                  <td className="py-2 pr-4 font-medium">0.6 gallon</td>
                  <td className="py-2 text-gray-600">2.3 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1.2 gallons</td>
                  <td className="py-2 text-gray-600">4.5 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons for a 15x15 room?</dt>
              <dd className="text-gray-700 leading-relaxed">3 gallons covers two coats on all walls. Add another gallon if you are also painting the ceiling, bringing the total to 4 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Is 2 gallons enough for a 15x15 room?</dt>
              <dd className="text-gray-700 leading-relaxed">2 gallons is just enough for one coat. You need 3 gallons to apply two coats comfortably with a small buffer for touch-ups.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. How much primer for a 15x15 room?</dt>
              <dd className="text-gray-700 leading-relaxed">1-2 gallons of primer is appropriate for a 15x15 room. If using paint-and-primer-in-one, you can skip a separate primer coat.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. What paint finish for a 15x15 bedroom?</dt>
              <dd className="text-gray-700 leading-relaxed">Eggshell is the most popular choice - it resists scuffs, is easy to wipe, and has a subtle sheen that flatters large walls.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How long does it take to paint a 15x15 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Plan for 6-8 hours for two wall coats plus prep. Adding the ceiling adds another 1-2 hours.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How much for accent wall in a 15x15 room?</dt>
              <dd className="text-gray-700 leading-relaxed">One 15 ft accent wall (120 sq ft) needs about 1 quart per coat, or 1 gallon for two coats in a bold colour.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:underline text-sm">Living Room Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-14x14-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 14x14 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a Living Room?</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
