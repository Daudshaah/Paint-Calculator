import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';
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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-bathroom'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-bathroom`;
  return {
    title: 'How Much Paint for a Bathroom? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a bathroom. Free estimates for all bathroom sizes in gallons and litres.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Bathroom?',
      description: 'Find out exactly how much paint you need for a bathroom. Free estimates for all bathroom sizes in gallons and litres.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Bathroom?","item":"https://thepaintcalculator.com/how-much-paint-for-a-bathroom"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint for a small bathroom?","acceptedAnswer":{"@type":"Answer","text":"A 5x8 bathroom with 8ft ceilings needs about 0.75 gallon for two coats on the walls. One gallon is the safe buy to avoid running short."}},{"@type":"Question","name":"What paint finish is best for a bathroom?","acceptedAnswer":{"@type":"Answer","text":"Satin or semi-gloss are the only appropriate finishes for bathrooms. They resist moisture, are easy to wipe, and do not grow mould the way flat paint does."}},{"@type":"Question","name":"Do I need special bathroom paint?","acceptedAnswer":{"@type":"Answer","text":"Bathroom-specific paints include mildew-resistant additives that are worth having in high-humidity bathrooms. Standard satin or semi-gloss wall paint can also work in well-ventilated bathrooms."}},{"@type":"Question","name":"How long does bathroom paint take to cure?","acceptedAnswer":{"@type":"Answer","text":"Latex paint dries to touch in 1 to 2 hours but takes 30 days to fully cure. Run the exhaust fan after every shower for the first month."}},{"@type":"Question","name":"Can I use wall paint in a bathroom?","acceptedAnswer":{"@type":"Answer","text":"Standard wall paint in flat or eggshell finish will not perform well in a bathroom — it absorbs moisture and can peel. Use satin or semi-gloss finish minimum in any bathroom."}},{"@type":"Question","name":"How much does it cost to paint a bathroom?","acceptedAnswer":{"@type":"Answer","text":"DIY paint costs $15 to $40 for a small bathroom. A larger master bathroom costs $30 to $80 in paint. Professional painters charge $150 to $400 for a bathroom depending on size."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Bathroom?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Bathroom?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `An average bathroom needs <strong>1 quart to 1 gallon</strong> (1 to 4 litres) for two coats on the walls. A master bathroom may need <strong>1 to 2 gallons</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 quart to 1 gallon (1 to 4 litres)</p>
          <p className="text-sm opacity-90">For an average 5x8 bathroom with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Bathroom Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Bathrooms are the smallest rooms in most homes, which makes them very economical to paint. A standard 5x8 bathroom with 8ft ceilings has 208 square feet of gross wall area. After deducting the door, window, and tile surround area, the paintable wall area is roughly 150 to 170 square feet — one quart to one gallon is sufficient for two coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A larger 8x10 bathroom or a master bathroom 10x12 needs 1 to 1.5 gallons for two coats. A large master bathroom 12x14 may need up to 2 gallons depending on tile coverage and ceiling height.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a small bathroom needs 1 to 2 litres. An average bathroom needs 3.8 to 5 litres. A large master bathroom needs 5 to 7.5 litres.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bathroom Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Bathroom Size</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Small 5x8</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~0.75 gal</td><td className="px-4 py-3 text-gray-700">~2.8 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Average 8x10</td><td className="px-4 py-3 text-gray-700">~0.65 gal</td><td className="px-4 py-3 text-gray-700">~1.3 gal</td><td className="px-4 py-3 text-gray-700">~4.9 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Large 10x12</td><td className="px-4 py-3 text-gray-700">~0.85 gal</td><td className="px-4 py-3 text-gray-700">~1.7 gal</td><td className="px-4 py-3 text-gray-700">~6.4 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Master bath 12x14</td><td className="px-4 py-3 text-gray-700">~1.1 gal</td><td className="px-4 py-3 text-gray-700">~2.2 gal</td><td className="px-4 py-3 text-gray-700">~8.3 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling only (8x10)</td><td className="px-4 py-3 text-gray-700">~0.2 gal</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~1.5 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for a Bathroom</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Always use satin or semi-gloss finish in a bathroom. These finishes resist moisture and steam, are easy to wipe clean, and do not absorb condensation the way flat or eggshell paint does. Flat paint in a bathroom will absorb moisture, bubble, and eventually peel.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Look for bathroom-specific paints that include mildew-resistant additives. Brands like Benjamin Moore Aura Bath and Spa, Sherwin-Williams Emerald Interior, and Dulux Bathroom Paint include these additives and are specifically formulated for high-humidity environments.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Bathroom</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always use satin or semi-gloss finish</strong> — flat paint in a bathroom will not last and will grow mould.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ventilate thoroughly</strong> during painting and for the first week after — run the exhaust fan to help the paint cure and to remove fumes.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prepare surfaces carefully</strong> — any existing mould or mildew must be treated with a bleach solution and allowed to dry completely before painting.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use bathroom-specific paint</strong> with mildew-resistant additives for the longest-lasting result.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow extra cure time</strong> before using the shower — latex paint takes 30 days to fully cure and heavy steam in the first week can affect the finish.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-10x8-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x8 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-ceiling`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Ceiling? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a small bathroom?</h3>
              <p className="text-gray-700">A 5x8 bathroom with 8ft ceilings needs about 0.75 gallon for two coats on the walls. One gallon is the safe buy to avoid running short.</p>
            </div>
            <div key="What paint finish is">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What paint finish is best for a bathroom?</h3>
              <p className="text-gray-700">Satin or semi-gloss are the only appropriate finishes for bathrooms. They resist moisture, are easy to wipe, and do not grow mould the way flat paint does.</p>
            </div>
            <div key="Do I need special ba">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need special bathroom paint?</h3>
              <p className="text-gray-700">Bathroom-specific paints include mildew-resistant additives that are worth having in high-humidity bathrooms. Standard satin or semi-gloss wall paint can also work in well-ventilated bathrooms.</p>
            </div>
            <div key="How long does bathro">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does bathroom paint take to cure?</h3>
              <p className="text-gray-700">Latex paint dries to touch in 1 to 2 hours but takes 30 days to fully cure. Run the exhaust fan after every shower for the first month.</p>
            </div>
            <div key="Can I use wall paint">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use wall paint in a bathroom?</h3>
              <p className="text-gray-700">Standard wall paint in flat or eggshell finish will not perform well in a bathroom — it absorbs moisture and can peel. Use satin or semi-gloss finish minimum in any bathroom.</p>
            </div>
            <div key="How much does it cos">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bathroom?</h3>
              <p className="text-gray-700">DIY paint costs $15 to $40 for a small bathroom. A larger master bathroom costs $30 to $80 in paint. Professional painters charge $150 to $400 for a bathroom depending on size.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
