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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-garage`;
  return {
    title: 'How Much Paint for a Garage? | The Paint Calculator',
    description: 'How much paint for a garage? Get gallon estimates for walls, floor, and ceiling for single and double garages.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Garage?',
      description: 'How much paint for a garage? Get gallon estimates for walls, floor, and ceiling for single and double garages.',
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
      "name": "How much paint for a two-car garage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard 20x20 two-car garage needs 4-5 gallons for the walls and 2-3 gallons for the floor epoxy coating, totalling 6-8 gallons."
      }
    },
    {
      "@type": "Question",
      "name": "What type of paint is best for garage walls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a semi-gloss or satin latex paint with good scrubbability. Garage walls get dirty and need to be wiped down regularly."
      }
    },
    {
      "@type": "Question",
      "name": "What paint do I use for a garage floor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a two-part epoxy floor coating for the most durable result. Water-based garage floor paint is a simpler but less durable option."
      }
    },
    {
      "@type": "Question",
      "name": "Do garage walls need primer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bare drywall and concrete block both benefit from primer. Concrete block is especially porous and will absorb paint without a concrete primer first."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for a garage door?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A standard 9x7 garage door needs about 1 quart for two coats on the exterior. Use exterior semi-gloss or gloss for durability."
      }
    },
    {
      "@type": "Question",
      "name": "How long does garage floor paint take to dry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Water-based garage floor paint dries in 24 hours but needs 72 hours before vehicle traffic. Epoxy coatings require 48-72 hours cure time before use."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Garage?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Garage?</h1>
        <p className="text-lg text-gray-600 mb-6">Garage painting is often an afterthought, but a clean, painted garage significantly improves the space. Walls, floor, and ceiling each require different products and quantities.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A standard two-car garage needs approximately <strong>4-5 gallons</strong> (15.1-18.9 litres) for walls with two coats. The floor needs <strong>2-3 gallons</strong> (7.6-11.4 litres) of epoxy floor paint.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Garage walls are often unpainted drywall, concrete block, or raw studs that absorb paint heavily. Budget 20-30% more paint than a standard interior room of the same size.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Single garage walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Double garage walls (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">4-5 gallons</td>
                  <td className="py-2 text-gray-600">15.1-18.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Garage floor, 2-car (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Garage ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1-2 gallons</td>
                  <td className="py-2 text-gray-600">3.8-7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Garage door exterior (2 coats)</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much paint for a two-car garage?</dt>
              <dd className="text-gray-700 leading-relaxed">A standard 20x20 two-car garage needs 4-5 gallons for the walls and 2-3 gallons for the floor epoxy coating, totalling 6-8 gallons.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. What type of paint is best for garage walls?</dt>
              <dd className="text-gray-700 leading-relaxed">Use a semi-gloss or satin latex paint with good scrubbability. Garage walls get dirty and need to be wiped down regularly.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. What paint do I use for a garage floor?</dt>
              <dd className="text-gray-700 leading-relaxed">Use a two-part epoxy floor coating for the most durable result. Water-based garage floor paint is a simpler but less durable option.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Do garage walls need primer?</dt>
              <dd className="text-gray-700 leading-relaxed">Bare drywall and concrete block both benefit from primer. Concrete block is especially porous and will absorb paint without a concrete primer first.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How much paint for a garage door?</dt>
              <dd className="text-gray-700 leading-relaxed">A standard 9x7 garage door needs about 1 quart for two coats on the exterior. Use exterior semi-gloss or gloss for durability.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How long does garage floor paint take to dry?</dt>
              <dd className="text-gray-700 leading-relaxed">Water-based garage floor paint dries in 24 hours but needs 72 hours before vehicle traffic. Epoxy coatings require 48-72 hours cure time before use.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:underline text-sm">Garage Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:underline text-sm">How Much Paint for Interior of House?</Link>
              <Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:underline text-sm">Exterior Paint Calculator</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
