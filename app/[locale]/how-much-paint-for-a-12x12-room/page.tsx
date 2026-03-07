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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-12x12-room`;
  return {
    title: 'How Much Paint for a 12x12 Room? | The Paint Calculator',
    description: 'Find out exactly how much paint you need for a 12x12 room. Get gallon estimates for walls, ceiling, and trim with our quick guide.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 12x12 Room?',
      description: 'Find out exactly how much paint you need for a 12x12 room. Get gallon estimates for walls, ceiling, and trim with our quick guide.',
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
      "name": "How many gallons of paint do I need for a 12x12 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You need 1-2 gallons for one coat on the walls. For two coats, budget 2-3 gallons. Always add 10% extra for touch-ups."
      }
    },
    {
      "@type": "Question",
      "name": "Does a 12x12 room need one or two coats of paint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Two coats are recommended for the best finish, especially when changing colours or painting over a dark shade."
      }
    },
    {
      "@type": "Question",
      "name": "Should I paint the ceiling the same colour?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ceiling is typically painted white or a lighter tint of the wall colour. A 12x12 ceiling needs about half a gallon per coat."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for trim in a 12x12 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trim, baseboards, and door frames in a 12x12 room require approximately 1 quart (0.95 litres) of trim paint."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a 12x12 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most DIYers complete a 12x12 room in 4-6 hours including prep, two wall coats, and drying time between coats."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best paint finish for a 12x12 room?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eggshell or satin finishes work best for most rooms - they are easy to clean and resist scuffs better than flat paint."
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
            <li className="text-gray-800 font-medium">How Much Paint for a 12x12 Room?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a 12x12 Room?</h1>
        <p className="text-lg text-gray-600 mb-6">Painting a 12x12 room is one of the most common DIY projects. Whether you are freshening up a bedroom, home office, or spare room, knowing exactly how much paint to buy saves money and extra trips to the store.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 12x12 room with 8ft ceilings needs approximately <strong>1-2 gallons</strong> (3.8-7.6 litres) for walls with one coat. Two coats requires <strong>2-3 gallons</strong> (7.6-11.4 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> A 12x12 room has 384 sq ft of wall space (minus doors and windows). One gallon covers ~400 sq ft, so one coat fits in a single gallon - but always buy extra for touch-ups.</p>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons of paint do I need for a 12x12 room?</dt>
              <dd className="text-gray-700 leading-relaxed">You need 1-2 gallons for one coat on the walls. For two coats, budget 2-3 gallons. Always add 10% extra for touch-ups.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Does a 12x12 room need one or two coats of paint?</dt>
              <dd className="text-gray-700 leading-relaxed">Two coats are recommended for the best finish, especially when changing colours or painting over a dark shade.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. Should I paint the ceiling the same colour?</dt>
              <dd className="text-gray-700 leading-relaxed">The ceiling is typically painted white or a lighter tint of the wall colour. A 12x12 ceiling needs about half a gallon per coat.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How much paint for trim in a 12x12 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Trim, baseboards, and door frames in a 12x12 room require approximately 1 quart (0.95 litres) of trim paint.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How long does it take to paint a 12x12 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Most DIYers complete a 12x12 room in 4-6 hours including prep, two wall coats, and drying time between coats.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. What is the best paint finish for a 12x12 room?</dt>
              <dd className="text-gray-700 leading-relaxed">Eggshell or satin finishes work best for most rooms - they are easy to clean and resist scuffs better than flat paint.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:underline text-sm">Bedroom Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-10x10-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 10x10 Room?</Link>
              <Link href={`/${locale}/how-much-paint-for-a-12x14-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 12x14 Room?</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
