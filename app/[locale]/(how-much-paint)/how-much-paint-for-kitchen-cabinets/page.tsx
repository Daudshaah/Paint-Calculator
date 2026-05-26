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
      ? 'https://thepaintcalculator.com/how-much-paint-for-kitchen-cabinets'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-kitchen-cabinets`;
  return {
    title: 'How Much Paint for Kitchen Cabinets? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for kitchen cabinets. Gallon estimates for all kitchen sizes. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Kitchen Cabinets?',
      description: 'Find out exactly how much paint you need for kitchen cabinets. Gallon estimates for all kitchen sizes. Free, no signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for Kitchen Cabinets?","item":"https://thepaintcalculator.com/how-much-paint-for-kitchen-cabinets"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint do I need for kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"An average kitchen with 20 cabinet doors needs about 1 gallon for two coats. Large kitchens with 30 or more doors need 1.5 to 2 gallons."}},{"@type":"Question","name":"Do I need primer before painting kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Yes — primer is essential for adhesion on cabinets, especially over laminate, previously painted surfaces, or bare wood. Budget 1 quart to 1 gallon of primer depending on kitchen size."}},{"@type":"Question","name":"What type of paint is best for kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Use a hard-wearing enamel or alkyd-hybrid cabinet paint in semi-gloss or satin finish. It resists moisture, grease, and frequent cleaning better than standard wall paint."}},{"@type":"Question","name":"Should I spray or brush kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Spraying gives the smoothest factory-like finish but requires proper setup and masking. A foam roller combined with a brush gives excellent results for DIY painting."}},{"@type":"Question","name":"How many coats of paint on kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"One coat of primer plus two coats of cabinet paint is standard. Some painters apply three thin topcoats for the most durable and flawless finish."}},{"@type":"Question","name":"How long does it take to paint kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Removing, priming, painting, and rehinging all cabinet doors typically takes 2 to 3 full days for an average kitchen when allowing proper drying time between coats."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for Kitchen Cabinets?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for Kitchen Cabinets?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `An average kitchen needs <strong>1 quart to 2 gallons</strong> (1 to 7.5 litres) of cabinet paint for two coats depending on the number of doors and drawers.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 quart to 2 gallons (1 to 7.5 litres)</p>
          <p className="text-sm opacity-90">For an average kitchen with 20 cabinet doors — two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Do Kitchen Cabinets Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Cabinet paint requirements depend on the number of doors, drawer fronts, and cabinet boxes you are painting. An average kitchen with 20 cabinet doors needs about 1 gallon for two coats. A large kitchen with 30 or more doors needs 1.5 to 2 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Cabinet paint is denser and more expensive than wall paint. A quart goes a long way — for a small kitchen with 10 or fewer cabinet doors, one quart is often sufficient for two coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Always add a primer coat before the topcoats. A quart of primer covers 10 to 15 doors. For the entire kitchen, budget 1 quart to 1 gallon of primer depending on kitchen size.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Kitchen Cabinet Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Kitchen Size</th><th className="px-4 py-3 text-left font-semibold">Doors</th><th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Small kitchen</td><td className="px-4 py-3 text-gray-700">~10 doors</td><td className="px-4 py-3 text-gray-700">1 quart</td><td className="px-4 py-3 text-gray-700">~1 litre</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Medium kitchen</td><td className="px-4 py-3 text-gray-700">~20 doors</td><td className="px-4 py-3 text-gray-700">1 gallon</td><td className="px-4 py-3 text-gray-700">~3.8 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Large kitchen</td><td className="px-4 py-3 text-gray-700">~30 doors</td><td className="px-4 py-3 text-gray-700">1.5 gal</td><td className="px-4 py-3 text-gray-700">~5.7 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Very large kitchen</td><td className="px-4 py-3 text-gray-700">40+ doors</td><td className="px-4 py-3 text-gray-700">2 gal</td><td className="px-4 py-3 text-gray-700">~7.5 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Primer (all sizes)</td><td className="px-4 py-3 text-gray-700">All doors</td><td className="px-4 py-3 text-gray-700">1 qt–1 gal</td><td className="px-4 py-3 text-gray-700">~1–3.8 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Kitchen Cabinets</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Use a hard-wearing enamel or alkyd-hybrid cabinet paint. Semi-gloss or satin finish resists moisture, grease, and frequent cleaning — essential in a kitchen environment. Avoid standard wall paint on cabinets; it will not stand up to the daily wear of opening, closing, and cleaning.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Popular choices include Benjamin Moore Advance (alkyd-hybrid, extremely hard-wearing), Sherwin-Williams Emerald Urethane Trim Enamel (excellent levelling, very durable), and Farrow & Ball Full Gloss (premium option with a beautiful finish but requires careful application).</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting Kitchen Cabinets</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Remove all doors and drawer fronts</strong> before painting. Paint them flat on sawhorses for a drip-free finish.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean and degrease thoroughly</strong> before priming. Kitchen cabinets accumulate grease that prevents paint adhesion — use TSP or a degreaser cleaner.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sand between coats</strong> with 220-grit sandpaper for an ultra-smooth finish. Wipe off all dust before applying the next coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a foam roller</strong> for flat door panels and a brush for recessed areas and edges. This combination gives the smoothest hand-applied finish.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow 24 hours between coats</strong> for cabinet enamel — longer than standard wall paint. Rushing leads to brush marks and poor adhesion.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/cabinet-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Cabinet Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Living Room? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much paint do I ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for kitchen cabinets?</h3>
              <p className="text-gray-700">An average kitchen with 20 cabinet doors needs about 1 gallon for two coats. Large kitchens with 30 or more doors need 1.5 to 2 gallons.</p>
            </div>
            <div key="Do I need primer bef">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer before painting kitchen cabinets?</h3>
              <p className="text-gray-700">Yes — primer is essential for adhesion on cabinets, especially over laminate, previously painted surfaces, or bare wood. Budget 1 quart to 1 gallon of primer depending on kitchen size.</p>
            </div>
            <div key="What type of paint i">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint is best for kitchen cabinets?</h3>
              <p className="text-gray-700">Use a hard-wearing enamel or alkyd-hybrid cabinet paint in semi-gloss or satin finish. It resists moisture, grease, and frequent cleaning better than standard wall paint.</p>
            </div>
            <div key="Should I spray or br">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I spray or brush kitchen cabinets?</h3>
              <p className="text-gray-700">Spraying gives the smoothest factory-like finish but requires proper setup and masking. A foam roller combined with a brush gives excellent results for DIY painting.</p>
            </div>
            <div key="How many coats of pa">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many coats of paint on kitchen cabinets?</h3>
              <p className="text-gray-700">One coat of primer plus two coats of cabinet paint is standard. Some painters apply three thin topcoats for the most durable and flawless finish.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint kitchen cabinets?</h3>
              <p className="text-gray-700">Removing, priming, painting, and rehinging all cabinet doors typically takes 2 to 3 full days for an average kitchen when allowing proper drying time between coats.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
