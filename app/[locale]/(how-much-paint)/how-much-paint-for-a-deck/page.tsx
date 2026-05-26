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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-deck'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-deck`;
  return {
    title: 'How Much Paint for a Deck? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a deck. Free estimates for all deck sizes in gallons and litres.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Deck?',
      description: 'Calculate exactly how much paint you need for a deck. Free estimates for all deck sizes in gallons and litres.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Deck?","item":"https://thepaintcalculator.com/how-much-paint-for-a-deck"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint do I need for a deck?","acceptedAnswer":{"@type":"Answer","text":"A 300 sq ft deck needs about 1.75 gallons for two coats on smooth wood. Add 1 gallon for railings and stairs, giving a total of about 2.75 gallons."}},{"@type":"Question","name":"Should I paint or stain my deck?","acceptedAnswer":{"@type":"Answer","text":"Stain is lower maintenance and lasts longer without peeling. Paint gives better colour coverage. For a new deck, stain is usually the better long-term choice."}},{"@type":"Question","name":"How many coats of paint on a deck?","acceptedAnswer":{"@type":"Answer","text":"Two coats are standard. For bare or stripped decks, one coat of primer plus two topcoats gives the best adhesion and durability."}},{"@type":"Question","name":"How long does deck paint last?","acceptedAnswer":{"@type":"Answer","text":"Quality deck paint lasts 3 to 5 years with proper prep. Deck stain lasts 2 to 4 years. Both last longer when applied over properly prepared surfaces."}},{"@type":"Question","name":"Do I need primer on a deck?","acceptedAnswer":{"@type":"Answer","text":"New or stripped decks benefit from a wood primer or deck primer. Many deck paints are self-priming — check the manufacturer instructions before buying separate primer."}},{"@type":"Question","name":"How long after painting a deck can I use it?","acceptedAnswer":{"@type":"Answer","text":"Deck paint is safe to walk on within 24 to 48 hours. Allow 7 days before replacing heavy furniture. Avoid power washing for at least 30 days after painting."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Deck?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Deck?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard 300 sq ft deck needs approximately <strong>1 to 2 gallons</strong> (4 to 8 litres) for two coats. Weathered or porous wood may need up to 50% more.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 2 gallons (4 to 8 litres)</p>
          <p className="text-sm opacity-90">For a standard 300 sq ft deck — two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Deck Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Deck paint coverage varies based on wood condition and type. New smooth wood allows approximately 300 to 400 sq ft per gallon. Weathered, rough, or porous wood absorbs 30 to 50% more paint, reducing coverage to 200 to 250 sq ft per gallon.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A 300 sq ft deck needs about 1 gallon per coat on smooth wood, or 1.5 gallons per coat on weathered wood. For two coats, budget 2 gallons on smooth wood or 3 gallons on weathered wood.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Railings, stairs, and vertical surfaces require significantly more paint per square foot than horizontal deck boards. Always add 1 gallon for railings and stairs when calculating total paint needed.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Deck Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Deck Size</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">200 sq ft deck</td><td className="px-4 py-3 text-gray-700">~0.6 gal</td><td className="px-4 py-3 text-gray-700">~1.2 gal</td><td className="px-4 py-3 text-gray-700">~4.5 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">300 sq ft deck</td><td className="px-4 py-3 text-gray-700">~0.9 gal</td><td className="px-4 py-3 text-gray-700">~1.75 gal</td><td className="px-4 py-3 text-gray-700">~6.6 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">400 sq ft deck</td><td className="px-4 py-3 text-gray-700">~1.2 gal</td><td className="px-4 py-3 text-gray-700">~2.3 gal</td><td className="px-4 py-3 text-gray-700">~8.7 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">500 sq ft deck</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~3 gal</td><td className="px-4 py-3 text-gray-700">~11.4 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Railings + stairs (add)</td><td className="px-4 py-3 text-gray-700">+0.5 gal</td><td className="px-4 py-3 text-gray-700">+1 gal</td><td className="px-4 py-3 text-gray-700">+3.8 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Deck Paint vs Deck Stain</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Deck stain penetrates the wood and cannot peel or blister. It is the lower-maintenance option and easier to reapply — simply clean and apply a new coat every 2 to 4 years without stripping. Paint sits on the surface and provides better colour coverage and opacity, but it will eventually peel and requires stripping before recoating.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For a new deck, stain or a penetrating oil finish is often the better long-term choice. For an existing painted deck, repainting in a deck-specific coating is usually more practical than stripping to bare wood.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Deck</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Power wash and allow 48 hours drying time</strong> before painting — painting over damp wood leads to poor adhesion and early peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sand rough or splintered boards</strong> before painting — this improves adhesion and gives a smoother finish underfoot.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply with a brush on the first coat</strong> to work paint into the wood grain, then roll subsequent coats for speed.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply in mild, dry weather</strong> — avoid painting in direct sunlight (paint dries too fast) or when temperatures drop below 50°F overnight.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow 48 hours before light foot traffic</strong> and at least 7 days before replacing outdoor furniture.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/deck-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/deck-stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-fence`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Fence? →</Link></li>
            <li><Link href={`/${locale}/stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/spray-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Spray Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much paint do I ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for a deck?</h3>
              <p className="text-gray-700">A 300 sq ft deck needs about 1.75 gallons for two coats on smooth wood. Add 1 gallon for railings and stairs, giving a total of about 2.75 gallons.</p>
            </div>
            <div key="Should I paint or st">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint or stain my deck?</h3>
              <p className="text-gray-700">Stain is lower maintenance and lasts longer without peeling. Paint gives better colour coverage. For a new deck, stain is usually the better long-term choice.</p>
            </div>
            <div key="How many coats of pa">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many coats of paint on a deck?</h3>
              <p className="text-gray-700">Two coats are standard. For bare or stripped decks, one coat of primer plus two topcoats gives the best adhesion and durability.</p>
            </div>
            <div key="How long does deck p">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does deck paint last?</h3>
              <p className="text-gray-700">Quality deck paint lasts 3 to 5 years with proper prep. Deck stain lasts 2 to 4 years. Both last longer when applied over properly prepared surfaces.</p>
            </div>
            <div key="Do I need primer on ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer on a deck?</h3>
              <p className="text-gray-700">New or stripped decks benefit from a wood primer or deck primer. Many deck paints are self-priming — check the manufacturer instructions before buying separate primer.</p>
            </div>
            <div key="How long after paint">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long after painting a deck can I use it?</h3>
              <p className="text-gray-700">Deck paint is safe to walk on within 24 to 48 hours. Allow 7 days before replacing heavy furniture. Avoid power washing for at least 30 days after painting.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
