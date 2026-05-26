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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-front-door'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-front-door`;
  return {
    title: 'How Much Paint for a Front Door? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a front door. Estimates in quarts and litres for single and double doors.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Front Door?',
      description: 'Find out exactly how much paint you need for a front door. Estimates in quarts and litres for single and double doors.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Front Door?","item":"https://thepaintcalculator.com/how-much-paint-for-a-front-door"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint do I need for a front door?","acceptedAnswer":{"@type":"Answer","text":"One quart is enough to paint both sides of a standard 36x80 inch front door with two coats. You will have some left over for future touch-ups."}},{"@type":"Question","name":"What type of paint is best for a front door?","acceptedAnswer":{"@type":"Answer","text":"Exterior gloss or semi-gloss paint specifically formulated for doors. Oil-based alkyd gives the hardest finish; quality exterior latex is easier to apply and clean up."}},{"@type":"Question","name":"How many coats does a front door need?","acceptedAnswer":{"@type":"Answer","text":"Two topcoats over a primed or existing painted surface. If stripping to bare wood, apply one primer coat plus two topcoats."}},{"@type":"Question","name":"How long does front door paint take to dry?","acceptedAnswer":{"@type":"Answer","text":"Latex paint dries to touch in 1 to 2 hours. Allow 4 to 6 hours between coats and at least 24 hours before rehinging the door to prevent sticking."}},{"@type":"Question","name":"What are the most popular front door colours?","acceptedAnswer":{"@type":"Answer","text":"Black, navy blue, red, forest green, and bright yellow are consistently the most popular front door colours. Black in particular has become extremely popular in recent years across all architectural styles."}},{"@type":"Question","name":"Can I paint a front door without removing it?","acceptedAnswer":{"@type":"Answer","text":"Yes, but removing the door gives a much cleaner result. If painting in place, prop it fully open, protect the surrounding area, and work quickly to avoid runs on the vertical surfaces."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Front Door?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Front Door?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard front door needs approximately <strong>1 quart</strong> (just under 1 litre) for two coats on both sides. A double door needs <strong>1 to 2 quarts</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 quart (1 litre)</p>
          <p className="text-sm opacity-90">For a standard single front door — two coats both sides</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Front Door Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A standard front door is 36 inches wide by 80 inches tall — just 20 square feet per side, or 40 square feet total for both sides. At 400 square feet per gallon, one quart (0.25 gallon) is more than enough for two coats on a single door with paint left over for touch-ups.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A double front door has roughly 80 square feet of paintable surface. One quart handles two coats easily with paint remaining. If you are also painting the door frame and surround, budget a second quart.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, one 750ml tin is enough for most front doors. A double door or door plus frame may need a 1 litre tin.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Front Door Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Single door (1 side)</td><td className="px-4 py-3 text-gray-700">~0.1 gal</td><td className="px-4 py-3 text-gray-700">~0.2 gal</td><td className="px-4 py-3 text-gray-700">~0.75 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Single door (both sides)</td><td className="px-4 py-3 text-gray-700">~0.2 gal</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~1.5 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Double door</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~0.75 gal</td><td className="px-4 py-3 text-gray-700">~2.8 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Door + frame</td><td className="px-4 py-3 text-gray-700">~0.3 gal</td><td className="px-4 py-3 text-gray-700">~0.6 gal</td><td className="px-4 py-3 text-gray-700">~2.3 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Door + frame + sidelights</td><td className="px-4 py-3 text-gray-700">~0.5 gal</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~3.8 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for a Front Door</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Use exterior gloss or semi-gloss paint specifically formulated for doors. Oil-based alkyd paints give the hardest, most durable finish but take longer to dry and require solvent cleanup. Quality exterior latex paints (such as Benjamin Moore Aura Grand Entrance or Sherwin-Williams Emerald Exterior) are easier to apply and clean up but equally durable when properly applied.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Avoid standard exterior wall paint on a front door — it is not formulated to withstand the constant opening, closing, touching, and weather exposure that a front door receives.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Front Door</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Remove the door from its hinges</strong> if possible — painting flat on sawhorses gives a far cleaner result than painting in place.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Remove all hardware</strong> including the handle, knocker, letterbox, and hinges before painting. Masking hardware rarely gives a clean result.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sand lightly with 220-grit</strong> before painting to give the surface tooth for adhesion. Wipe clean with a tack cloth before priming.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint in this order:</strong> panels first, then rails, then stiles (vertical sections), then edges. This gives the cleanest overlapping joins.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow 4 to 6 hours between coats</strong> for exterior door paint. Do not rehang the door for at least 24 hours to prevent sticking.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-fence`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Fence? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-deck`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Deck? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/spray-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Spray Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much paint do I ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for a front door?</h3>
              <p className="text-gray-700">One quart is enough to paint both sides of a standard 36x80 inch front door with two coats. You will have some left over for future touch-ups.</p>
            </div>
            <div key="What type of paint i">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint is best for a front door?</h3>
              <p className="text-gray-700">Exterior gloss or semi-gloss paint specifically formulated for doors. Oil-based alkyd gives the hardest finish; quality exterior latex is easier to apply and clean up.</p>
            </div>
            <div key="How many coats does ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many coats does a front door need?</h3>
              <p className="text-gray-700">Two topcoats over a primed or existing painted surface. If stripping to bare wood, apply one primer coat plus two topcoats.</p>
            </div>
            <div key="How long does front ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does front door paint take to dry?</h3>
              <p className="text-gray-700">Latex paint dries to touch in 1 to 2 hours. Allow 4 to 6 hours between coats and at least 24 hours before rehinging the door to prevent sticking.</p>
            </div>
            <div key="What are the most po">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the most popular front door colours?</h3>
              <p className="text-gray-700">Black, navy blue, red, forest green, and bright yellow are consistently the most popular front door colours. Black in particular has become extremely popular in recent years across all architectural styles.</p>
            </div>
            <div key="Can I paint a front ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint a front door without removing it?</h3>
              <p className="text-gray-700">Yes, but removing the door gives a much cleaner result. If painting in place, prop it fully open, protect the surrounding area, and work quickly to avoid runs on the vertical surfaces.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
