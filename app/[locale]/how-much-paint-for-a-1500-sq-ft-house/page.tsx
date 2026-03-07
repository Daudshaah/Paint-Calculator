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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-1500-sq-ft-house'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-1500-sq-ft-house`;
  return {
    title: 'How Much Paint for a 1500 Sq Ft House? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a 1500 sq ft house. Interior and exterior estimates in gallons and litres.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 1500 Sq Ft House?',
      description: 'Calculate exactly how much paint you need for a 1500 sq ft house. Interior and exterior estimates in gallons and litres.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 1500 Sq Ft House?","item":"https://thepaintcalculator.com/how-much-paint-for-a-1500-sq-ft-house"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons to paint a 1500 sq ft house interior?","acceptedAnswer":{"@type":"Answer","text":"Budget 9 to 12 gallons for walls, 4 to 5 gallons for ceilings, and 2 gallons for trim — about 15 to 19 gallons total for the complete interior."}},{"@type":"Question","name":"How much does it cost to paint a 1500 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Paint alone costs $300 to $700 for the interior. Professional painters charge $1,500 to $4,000 for a full interior paint job on a 1500 sq ft home."}},{"@type":"Question","name":"How long does it take to paint a 1500 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Working solo, plan 5 to 7 days. Two painters working together can complete it in 3 to 4 days with proper drying time between coats."}},{"@type":"Question","name":"How much paint for the exterior of a 1500 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Budget 7 to 10 gallons for two coats on exterior siding, plus 1 to 2 gallons for fascia and trim."}},{"@type":"Question","name":"Should I hire or DIY a 1500 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"DIY saves 60 to 70% on cost. However, professionals include all prep work, which is typically the most time-consuming part of any paint job."}},{"@type":"Question","name":"What type of paint for a whole 1500 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Quality latex with built-in primer for walls. Flat white for ceilings, eggshell for living areas and bedrooms, satin for kitchens and bathrooms, semi-gloss for all trim."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 1500 Sq Ft House?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 1500 Sq Ft House?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 1500 sq ft house needs approximately <strong>9 to 12 gallons</strong> (34 to 45 litres) for interior walls with two coats. Add 4 to 5 gallons for ceilings and 2 gallons for trim.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">9 to 12 gallons interior (34 to 45 litres)</p>
          <p className="text-sm opacity-90">For interior walls of a 1500 sq ft house — two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 1500 Sq Ft House Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Interior wall area in a 1500 sq ft home is typically 2 to 2.5 times the floor plan area, giving approximately 3,000 to 3,750 sq ft of paintable wall area. At 400 sq ft per gallon and two coats, the walls need 15 to 18.75 gallon-coats — or 7.5 to 9.4 gallons. Rounding up for waste and touch-ups, budget 9 to 12 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Add 4 to 5 gallons for ceilings (ceiling area equals floor area, divided by 400 sq ft per gallon, times 2 coats) and 2 gallons for trim. The total interior paint budget for a 1500 sq ft house is 15 to 19 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For the exterior, a 1500 sq ft home typically has 1,200 to 1,600 sq ft of paintable siding. Budget 7 to 10 gallons for two coats plus 1 to 2 gallons for exterior trim.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1500 Sq Ft House Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Area</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior walls</td><td className="px-4 py-3 text-gray-700">4.5–6 gal</td><td className="px-4 py-3 text-gray-700">9–12 gal</td><td className="px-4 py-3 text-gray-700">34–45 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceilings</td><td className="px-4 py-3 text-gray-700">2–2.5 gal</td><td className="px-4 py-3 text-gray-700">4–5 gal</td><td className="px-4 py-3 text-gray-700">15–19 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior trim</td><td className="px-4 py-3 text-gray-700">1 gal</td><td className="px-4 py-3 text-gray-700">2 gal</td><td className="px-4 py-3 text-gray-700">7.5 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Exterior walls</td><td className="px-4 py-3 text-gray-700">3.5–5 gal</td><td className="px-4 py-3 text-gray-700">7–10 gal</td><td className="px-4 py-3 text-gray-700">26–38 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Exterior trim</td><td className="px-4 py-3 text-gray-700">0.5–1 gal</td><td className="px-4 py-3 text-gray-700">1–2 gal</td><td className="px-4 py-3 text-gray-700">3.8–7.5 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 1500 Sq Ft House</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy in 5-gallon buckets</strong> for your main wall colour — they cost 10 to 15% less per gallon than individual gallons and guarantee colour consistency.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Start with the ceilings</strong> throughout the house before any walls — any drips are covered by wall paint.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use the same colour for multiple rooms</strong> where possible to reduce waste and ensure you can cross-use leftover paint.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>A 1500 sq ft house is a 5 to 7 day DIY project</strong> working solo. Budget accordingly and do not rush drying times.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Label all leftover paint</strong> by room immediately — you will need it for touch-ups.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 2000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-1000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 1000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Interior of House? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons to ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons to paint a 1500 sq ft house interior?</h3>
              <p className="text-gray-700">Budget 9 to 12 gallons for walls, 4 to 5 gallons for ceilings, and 2 gallons for trim — about 15 to 19 gallons total for the complete interior.</p>
            </div>
            <div key="How much does it cos">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a 1500 sq ft house?</h3>
              <p className="text-gray-700">Paint alone costs $300 to $700 for the interior. Professional painters charge $1,500 to $4,000 for a full interior paint job on a 1500 sq ft home.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 1500 sq ft house?</h3>
              <p className="text-gray-700">Working solo, plan 5 to 7 days. Two painters working together can complete it in 3 to 4 days with proper drying time between coats.</p>
            </div>
            <div key="How much paint for t">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for the exterior of a 1500 sq ft house?</h3>
              <p className="text-gray-700">Budget 7 to 10 gallons for two coats on exterior siding, plus 1 to 2 gallons for fascia and trim.</p>
            </div>
            <div key="Should I hire or DIY">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I hire or DIY a 1500 sq ft house?</h3>
              <p className="text-gray-700">DIY saves 60 to 70% on cost. However, professionals include all prep work, which is typically the most time-consuming part of any paint job.</p>
            </div>
            <div key="What type of paint f">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint for a whole 1500 sq ft house?</h3>
              <p className="text-gray-700">Quality latex with built-in primer for walls. Flat white for ceilings, eggshell for living areas and bedrooms, satin for kitchens and bathrooms, semi-gloss for all trim.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
