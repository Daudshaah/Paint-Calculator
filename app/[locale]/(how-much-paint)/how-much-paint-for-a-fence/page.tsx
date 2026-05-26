import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const canonical =
    locale === defaultLocale
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-fence'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-fence`;
  return {
    title: 'How Much Paint for a Fence? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a fence. Gallon estimates per linear foot for all fence types. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Fence?',
      description: 'Calculate exactly how much paint you need for a fence. Gallon estimates per linear foot for all fence types. Free, no signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Fence?","item":"https://thepaintcalculator.com/how-much-paint-for-a-fence"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons of paint does a fence need?","acceptedAnswer":{"@type":"Answer","text":"A 100 linear foot privacy fence needs 6 gallons for two coats on both sides. A picket fence of the same length needs about 3 gallons. A simple rail fence needs about 1.5 gallons."}},{"@type":"Question","name":"Should I paint or stain a fence?","acceptedAnswer":{"@type":"Answer","text":"Stain is lower maintenance and longer lasting on new wood. Paint provides more colour options and better coverage but will eventually peel and requires more prep work on reapplication."}},{"@type":"Question","name":"Do I need to prime a fence before painting?","acceptedAnswer":{"@type":"Answer","text":"Priming is recommended for bare or weathered wood. An exterior wood primer improves paint adhesion and reduces the total amount of topcoat needed."}},{"@type":"Question","name":"How long does fence paint last?","acceptedAnswer":{"@type":"Answer","text":"Quality exterior fence paint lasts 5 to 7 years with good surface prep. Stain lasts 3 to 5 years. Both need reapplication when the surface begins to look weathered."}},{"@type":"Question","name":"Can I use a roller on a fence?","acceptedAnswer":{"@type":"Answer","text":"A thick nap roller (3/4 inch) works well on flat privacy fence boards. A brush or airless sprayer is better for picket fences with many edges and gaps."}},{"@type":"Question","name":"How much paint for a wood fence vs a metal fence?","acceptedAnswer":{"@type":"Answer","text":"Metal fences need rust-inhibiting primer and use less paint (around 1 gallon per 200 sq ft) as the surface is smooth and non-absorbent. Wood fences absorb significantly more paint."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Fence?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Fence?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 100 linear foot privacy fence needs approximately <strong>2 to 4 gallons</strong> (7.5 to 15 litres) per coat. Enter your fence dimensions below for an exact result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 4 gallons (7.5 to 15 litres)</p>
          <p className="text-sm opacity-90">For a 100 linear foot privacy fence — two coats both sides</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Fence Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Fence paint quantities depend heavily on the fence style. A solid privacy fence has nearly three times the surface area of an open rail fence of the same length. Both sides of a fence need to be painted, which doubles the paint required versus a single-side calculation.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A 100 linear foot, 6ft tall privacy fence has approximately 1,200 square feet of surface area (600 per side). At 400 sq ft per gallon, that is 3 gallons per coat — buy 6 gallons for two coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Weathered, rough, or bare wood absorbs 30 to 50% more paint than smooth or previously painted surfaces. Always add extra when painting an old or weathered fence for the first time.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fence Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Fence Type & Length</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Privacy fence, 50 ft</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~3 gal</td><td className="px-4 py-3 text-gray-700">~11.4 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Privacy fence, 100 ft</td><td className="px-4 py-3 text-gray-700">~3 gal</td><td className="px-4 py-3 text-gray-700">~6 gal</td><td className="px-4 py-3 text-gray-700">~22.7 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Picket fence, 100 ft</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~3 gal</td><td className="px-4 py-3 text-gray-700">~11.4 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Rail fence, 100 ft</td><td className="px-4 py-3 text-gray-700">~0.75 gal</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~5.7 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Privacy fence, 200 ft</td><td className="px-4 py-3 text-gray-700">~6 gal</td><td className="px-4 py-3 text-gray-700">~12 gal</td><td className="px-4 py-3 text-gray-700">~45.4 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint vs Stain for a Fence</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Stain penetrates into the wood fibres and does not sit on the surface, meaning it cannot peel or blister. It lasts 3 to 5 years and is easier to reapply. Paint sits on the surface and provides more colour options and better opacity, but it will eventually peel and requires more prep work when reapplying.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For a new untreated fence, stain or preservative is often the better long-term choice. For an existing painted fence, repainting is usually more practical than stripping back to bare wood for staining.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Fence</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Power wash the fence first</strong> and allow it to dry fully (at least 48 hours) before painting. Painting over damp wood leads to poor adhesion and early peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use an airless sprayer</strong> for large fences — it is dramatically faster than brush or roller and gives better penetration into gaps and edges.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint both sides</strong> — painting only one side lets moisture penetrate from the unpainted side and causes the paint to fail faster.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply in dry, mild weather</strong> — avoid painting in direct sunlight (paint dries too fast and brushes out poorly) or when rain is forecast within 24 hours.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Protect plants and paving</strong> below and beside the fence with drop cloths, especially when spraying.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/fence-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Fence Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-deck`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Deck? →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/deck-stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/spray-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Spray Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons of ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint does a fence need?</h3>
              <p className="text-gray-700">A 100 linear foot privacy fence needs 6 gallons for two coats on both sides. A picket fence of the same length needs about 3 gallons. A simple rail fence needs about 1.5 gallons.</p>
            </div>
            <div key="Should I paint or st">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint or stain a fence?</h3>
              <p className="text-gray-700">Stain is lower maintenance and longer lasting on new wood. Paint provides more colour options and better coverage but will eventually peel and requires more prep work on reapplication.</p>
            </div>
            <div key="Do I need to prime a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to prime a fence before painting?</h3>
              <p className="text-gray-700">Priming is recommended for bare or weathered wood. An exterior wood primer improves paint adhesion and reduces the total amount of topcoat needed.</p>
            </div>
            <div key="How long does fence ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does fence paint last?</h3>
              <p className="text-gray-700">Quality exterior fence paint lasts 5 to 7 years with good surface prep. Stain lasts 3 to 5 years. Both need reapplication when the surface begins to look weathered.</p>
            </div>
            <div key="Can I use a roller o">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use a roller on a fence?</h3>
              <p className="text-gray-700">A thick nap roller (3/4 inch) works well on flat privacy fence boards. A brush or airless sprayer is better for picket fences with many edges and gaps.</p>
            </div>
            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a wood fence vs a metal fence?</h3>
              <p className="text-gray-700">Metal fences need rust-inhibiting primer and use less paint (around 1 gallon per 200 sq ft) as the surface is smooth and non-absorbent. Wood fences absorb significantly more paint.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
