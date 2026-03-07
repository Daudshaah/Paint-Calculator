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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-stucco`;
  return {
    title: 'How Much Paint for Stucco? | The Paint Calculator',
    description: 'How much paint for stucco? Get gallon estimates for stucco walls with tips on the right paints and application methods for masonry.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Stucco?',
      description: 'How much paint for stucco? Get gallon estimates for stucco walls with tips on the right paints and application methods for masonry.',
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
      "name": "How much more paint does stucco need vs smooth walls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stucco needs 2-3x more paint than smooth walls. Plan on 1 gallon per 100-200 sq ft for stucco versus 400 sq ft for standard drywall."
      }
    },
    {
      "@type": "Question",
      "name": "What type of paint is best for stucco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Elastomeric masonry paint is best for exterior stucco. It bridges cracks, is waterproof, and flexes with the wall. Avoid standard interior latex on exterior stucco."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to seal stucco before painting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "New stucco must cure for at least 28 days before painting. A masonry sealer or primer is strongly recommended to improve adhesion and reduce absorption."
      }
    },
    {
      "@type": "Question",
      "name": "How often should stucco be repainted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exterior stucco should be repainted every 5-10 years. Elastomeric coatings last longer - up to 10-15 years with proper prep and application."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a roller to paint stucco?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a thick nap roller (3/4 to 1 inch) to get paint into the texture. An airless sprayer is faster for large areas and provides the most even coverage."
      }
    },
    {
      "@type": "Question",
      "name": "How do I repair cracks in stucco before painting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fill hairline cracks with elastomeric caulk or stucco patch compound. Let repairs cure fully before priming and painting."
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
            <li className="text-gray-800 font-medium">How Much Paint for Stucco?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for Stucco?</h1>
        <p className="text-lg text-gray-600 mb-6">Stucco is a textured masonry surface that absorbs significantly more paint than smooth drywall. Its rough texture increases the effective surface area, requiring more paint per square foot of wall coverage.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `Stucco requires approximately <strong>1 gallon per 100-200 sq ft</strong> (versus 400 sq ft for smooth walls) due to its textured surface. A typical stucco home exterior needs <strong>15-25 gallons</strong> for two coats.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> Use an elastomeric or masonry paint for stucco. Elastomeric paint bridges hairline cracks and is flexible enough to expand and contract with temperature changes - critical for an exterior stucco surface.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Small stucco exterior 1000 sq ft (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">8-10 gallons</td>
                  <td className="py-2 text-gray-600">30.3-37.9 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Medium stucco exterior 1500 sq ft (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">12-15 gallons</td>
                  <td className="py-2 text-gray-600">45.4-56.8 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Large stucco exterior 2000 sq ft (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">15-20 gallons</td>
                  <td className="py-2 text-gray-600">56.8-75.7 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Interior stucco feature wall 10x8 (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Masonry sealer/primer (per coat)</td>
                  <td className="py-2 pr-4 font-medium">1 gal per 150 sq ft</td>
                  <td className="py-2 text-gray-600">3.8 L per 13.9 sq m</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How much more paint does stucco need vs smooth walls?</dt>
              <dd className="text-gray-700 leading-relaxed">Stucco needs 2-3x more paint than smooth walls. Plan on 1 gallon per 100-200 sq ft for stucco versus 400 sq ft for standard drywall.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. What type of paint is best for stucco?</dt>
              <dd className="text-gray-700 leading-relaxed">Elastomeric masonry paint is best for exterior stucco. It bridges cracks, is waterproof, and flexes with the wall. Avoid standard interior latex on exterior stucco.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. Do I need to seal stucco before painting?</dt>
              <dd className="text-gray-700 leading-relaxed">New stucco must cure for at least 28 days before painting. A masonry sealer or primer is strongly recommended to improve adhesion and reduce absorption.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How often should stucco be repainted?</dt>
              <dd className="text-gray-700 leading-relaxed">Exterior stucco should be repainted every 5-10 years. Elastomeric coatings last longer - up to 10-15 years with proper prep and application.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Can I use a roller to paint stucco?</dt>
              <dd className="text-gray-700 leading-relaxed">Use a thick nap roller (3/4 to 1 inch) to get paint into the texture. An airless sprayer is faster for large areas and provides the most even coverage.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How do I repair cracks in stucco before painting?</dt>
              <dd className="text-gray-700 leading-relaxed">Fill hairline cracks with elastomeric caulk or stucco patch compound. Let repairs cure fully before priming and painting.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:underline text-sm">Exterior Paint Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-brick-wall`} className="text-blue-600 hover:underline text-sm">How Much Paint for Brick Wall?</Link>
              <Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:underline text-sm">Textured Wall Paint Calculator</Link>
              <Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:underline text-sm">Paint Coverage Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
