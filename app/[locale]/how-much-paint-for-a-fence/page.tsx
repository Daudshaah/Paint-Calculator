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
  const canonical = `https://www.thepaintcalculator.com/${locale}/how-much-paint-for-a-fence`;
  return {
    title: 'How Much Paint for a Fence? | The Paint Calculator',
    description: 'Calculate how much paint you need for a fence. Get gallon estimates per linear foot for picket, privacy, and rail fences.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Fence?',
      description: 'Calculate how much paint you need for a fence. Get gallon estimates per linear foot for picket, privacy, and rail fences.',
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
      "name": "How many gallons of paint does a fence need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 100 linear foot privacy fence needs 4-5 gallons for two coats on both sides. Picket fences need 2-3 gallons for the same length."
      }
    },
    {
      "@type": "Question",
      "name": "Should I paint or stain a fence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stain penetrates the wood and is longer-lasting with less peeling. Paint sits on the surface and requires more maintenance but provides more colour options."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to prime a fence before painting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Priming is recommended for bare wood or previously stained surfaces. Use an exterior wood primer before applying paint."
      }
    },
    {
      "@type": "Question",
      "name": "How long does fence paint last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality exterior fence paint lasts 5-7 years with good prep. Stain lasts 3-5 years. Both need reapplication when the surface starts to look weathered."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a roller on a fence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, a thick nap roller works well on flat privacy fence boards. A brush or airless sprayer is better for picket fences with many edges."
      }
    },
    {
      "@type": "Question",
      "name": "How much paint for a wood fence vs a metal fence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Metal fences need rust-inhibiting primer and typically use less paint (around 1 gallon per 200 sq ft) since the surface is smooth and non-absorbent."
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
            <li className="text-gray-800 font-medium">How Much Paint for a Fence?</li>
          </ol>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Much Paint for a Fence?</h1>
        <p className="text-lg text-gray-600 mb-6">Fences are tricky to estimate because both sides need painting and the style dramatically affects surface area. A privacy fence has nearly double the surface area of a simple rail fence.</p>

        {/* Quick Answer Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-900" dangerouslySetInnerHTML={{ __html: `A 100 linear foot privacy fence needs approximately <strong>2-3 gallons</strong> (7.6-11.4 litres) per coat. Picket fences need <strong>1-2 gallons</strong> per coat for the same length.` }} />
        </div>

        {/* Tip Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm"><strong>Pro Tip:</strong> For a more accurate estimate, count the number of fence boards and multiply by each board's surface area. Both sides of the fence require paint, and weathered wood absorbs 30-50% more than smooth surfaces.</p>
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
                  <td className="py-2 pr-4 text-gray-700">Privacy fence, 50 ft (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2 gallons</td>
                  <td className="py-2 text-gray-600">7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Privacy fence, 100 ft (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">4 gallons</td>
                  <td className="py-2 text-gray-600">15.1 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Picket fence, 100 ft (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">2-3 gallons</td>
                  <td className="py-2 text-gray-600">7.6-11.4 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Rail fence, 100 ft (2 coats)</td>
                  <td className="py-2 pr-4 font-medium">1-2 gallons</td>
                  <td className="py-2 text-gray-600">3.8-7.6 litres</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-700">Stain (per side, 100 ft privacy)</td>
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
              <dt className="font-semibold text-gray-900 mb-1">1. How many gallons of paint does a fence need?</dt>
              <dd className="text-gray-700 leading-relaxed">A 100 linear foot privacy fence needs 4-5 gallons for two coats on both sides. Picket fences need 2-3 gallons for the same length.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">2. Should I paint or stain a fence?</dt>
              <dd className="text-gray-700 leading-relaxed">Stain penetrates the wood and is longer-lasting with less peeling. Paint sits on the surface and requires more maintenance but provides more colour options.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">3. Do I need to prime a fence before painting?</dt>
              <dd className="text-gray-700 leading-relaxed">Priming is recommended for bare wood or previously stained surfaces. Use an exterior wood primer before applying paint.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">4. How long does fence paint last?</dt>
              <dd className="text-gray-700 leading-relaxed">Quality exterior fence paint lasts 5-7 years with good prep. Stain lasts 3-5 years. Both need reapplication when the surface starts to look weathered.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">5. Can I use a roller on a fence?</dt>
              <dd className="text-gray-700 leading-relaxed">Yes, a thick nap roller works well on flat privacy fence boards. A brush or airless sprayer is better for picket fences with many edges.</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 mb-1">6. How much paint for a wood fence vs a metal fence?</dt>
              <dd className="text-gray-700 leading-relaxed">Metal fences need rust-inhibiting primer and typically use less paint (around 1 gallon per 200 sq ft) since the surface is smooth and non-absorbent.</dd>
            </div>
          </dl>
        </div>

        {/* Related Links */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Related Calculators and Guides</h2>
          <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/fence-paint-calculator`} className="text-blue-600 hover:underline text-sm">Fence Paint Calculator</Link>
              <Link href={`/${locale}/stain-calculator`} className="text-blue-600 hover:underline text-sm">Stain Calculator</Link>
              <Link href={`/${locale}/how-much-paint-for-a-deck`} className="text-blue-600 hover:underline text-sm">How Much Paint for a Deck?</Link>
              <Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:underline text-sm">Exterior Paint Calculator</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
