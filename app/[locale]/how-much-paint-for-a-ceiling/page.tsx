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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-ceiling`;
  return {
    title: 'How Much Paint for a Ceiling? | The Paint Calculator',
    description: 'Calculate how much paint you need for a ceiling. Get gallon estimates by room size and tips for getting a streak-free finish overhead.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Ceiling?',
      description: 'Calculate how much paint you need for a ceiling. Get gallon estimates by room size and tips for getting a streak-free finish overhead.',
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
      "name": "How much ceiling paint do I need per gallon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One gallon of ceiling paint covers approximately 350-400 sq ft per coat. For two coats, divide your ceiling area by 200 to get gallons needed."
      }
    },
    {
      "@type": "Question",
      "name": "Do ceilings need two coats of paint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, two coats are recommended for even coverage and to hide roller stipple. Some white-on-white repaints may only need one coat."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best paint for ceilings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use flat or matte white ceiling paint. It dries without sheen, which hides imperfections and roller lines that would be visible with glossier finishes."
      }
    },
    {
      "@type": "Question",
      "name": "Should I paint the ceiling before or after walls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Always paint ceilings first. Any drips or spatters on the walls get covered when you paint the walls afterward."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for a popcorn or textured ceiling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Textured ceilings absorb 20-30% more paint. Add that amount to your estimate, or use a thick nap roller (3/4 inch) to work paint into the texture."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use wall paint on the ceiling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can, but ceiling-specific paint is formulated to resist drips and splatter when applied overhead, making the job cleaner and easier."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Ceiling?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Ceiling?</h1>
        <p className="text-lg text-gray-600 mb-6">Ceilings are often overlooked in paint estimates. Because ceiling paint is applied differently to walls and typically requires two coats for full coverage, having the right amount on hand is essential.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A standard 12x12 ceiling (144 sq ft) needs approximately <strong>0.5 gallon</strong> (1.9 litres) per coat. For two coats, budget <strong>1 gallon</strong> (3.8 litres).` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Always use flat/matte white paint specifically formulated for ceilings. Standard ceiling paint hides roller marks better than wall paint applied overhead.</p>
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
                  <td className="py-2 pr-4 text-gray-700">10x10 ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">0.5 gallon</td>
                  <td className="py-2 text-gray-600">1.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">12x12 ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1 gallon</td>
                  <td className="py-2 text-gray-600">3.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">15x15 ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1.2 gallons</td>
                  <td className="py-2 text-gray-600">4.5 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">15x20 ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1.5 gallons</td>
                  <td className="py-2 text-gray-600">5.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">20x20 ceiling (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much ceiling paint do I need per gallon?</dt>
              <dd className="text-gray-700 leading-relaxed">One gallon of ceiling paint covers approximately 350-400 sq ft per coat. For two coats, divide your ceiling area by 200 to get gallons needed.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Do ceilings need two coats of paint?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes, two coats are recommended for even coverage and to hide roller stipple. Some white-on-white repaints may only need one coat.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. What is the best paint for ceilings?</dt>
              <dd className="text-gray-700 leading-relaxed">Use flat or matte white ceiling paint. It dries without sheen, which hides imperfections and roller lines that would be visible with glossier finishes.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. Should I paint the ceiling before or after walls?</dt>
              <dd className="text-gray-700 leading-relaxed">Always paint ceilings first. Any drips or spatters on the walls get covered when you paint the walls afterward.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. How much paint for a popcorn or textured ceiling?</dt>
              <dd className="text-gray-700 leading-relaxed">Textured ceilings absorb 20-30% more paint. Add that amount to your estimate, or use a thick nap roller (3/4 inch) to work paint into the texture.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. Can I use wall paint on the ceiling?</dt>
              <dd className="text-gray-700 leading-relaxed">You can, but ceiling-specific paint is formulated to resist drips and splatter when applied overhead, making the job cleaner and easier.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:underline text-sm">Ceiling Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:underline text-sm">How Much Paint for a 12x12 Room?</Link>
              <Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:underline text-sm">Textured Wall Paint Calculator</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
