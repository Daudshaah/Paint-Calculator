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
      ? 'https://thepaintcalculator.com/how-much-paint-for-interior-of-house'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-interior-of-house`;
  return {
    title: 'How Much Paint for Interior of House? | ThePaintCalculator.com',
    description: 'Calculate how much paint you need for the interior of any house. Formula, size-by-size estimates, and tips. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Interior of House?',
      description: 'Calculate how much paint you need for the interior of any house. Formula, size-by-size estimates, and tips. Free, no signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for Interior of House?","item":"https://thepaintcalculator.com/how-much-paint-for-interior-of-house"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I calculate paint for the interior of my house?","acceptedAnswer":{"@type":"Answer","text":"Use the formula: (floor area × 2.5) ÷ 400 = gallons per coat for walls. Double for two coats, add 15% for ceilings, and 10% for trim."}},{"@type":"Question","name":"How much does it cost to paint a house interior?","acceptedAnswer":{"@type":"Answer","text":"Paint alone runs $400 to $1,200 depending on home size. Professional labour adds $1,500 to $6,000 for a complete interior job."}},{"@type":"Question","name":"Should I use the same colour throughout the house?","acceptedAnswer":{"@type":"Answer","text":"Using one colour throughout saves money by allowing bulk buying and cross-room use of leftovers. A single accent wall per room adds variety without requiring additional colours."}},{"@type":"Question","name":"How much paint for ceilings in a whole house?","acceptedAnswer":{"@type":"Answer","text":"Budget 1 gallon of flat white ceiling paint per 400 sq ft of floor area for two coats. A 1500 sq ft house needs 4 to 5 gallons of ceiling paint."}},{"@type":"Question","name":"How much trim paint for a whole house interior?","acceptedAnswer":{"@type":"Answer","text":"Allow 1 gallon of semi-gloss trim paint per 400 to 500 sq ft of floor area. A 1500 sq ft house typically needs 3 to 4 gallons for all interior trim."}},{"@type":"Question","name":"What order should I paint rooms in a house?","acceptedAnswer":{"@type":"Answer","text":"Paint from top to bottom and back to front: ceilings throughout first, then walls room by room, then all trim. Start from the room furthest from the front door."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for Interior of House?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for Interior of House?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `To calculate interior paint for a whole house, multiply your floor area by 2.5 to get wall area, then divide by 400. A 1500 sq ft home needs <strong>9 to 12 gallons</strong> for two wall coats.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Floor area × 2.5 ÷ 400 = gallons per coat</p>
          <p className="text-sm opacity-90">Use this formula for any house size — then double for two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Calculate Interior Paint for a House</h2>
          <p className="text-gray-700 leading-relaxed mb-4">The quickest formula for estimating interior wall paint is: (floor area × 2.5) ÷ 400 = gallons per coat for walls. The 2.5 multiplier accounts for the fact that total wall area in a typical home is about 2.5 times the floor plan square footage when all rooms and ceiling heights are considered.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Double the result for two coats. Add 15% of the wall total for ceilings. Add 10% of the wall total for trim. This gives you a complete interior paint estimate.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For example: a 2000 sq ft house — (2000 × 2.5) ÷ 400 = 12.5 gallons per coat × 2 coats = 25 gallons of wall paint. Add 3.75 gallons for ceilings and 2.5 gallons for trim — total approximately 31 gallons for the complete interior.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Interior House Paint — Reference Table by Home Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Home Size</th><th className="px-4 py-3 text-left font-semibold">Walls (2 coats)</th><th className="px-4 py-3 text-left font-semibold">Ceilings (2 coats)</th><th className="px-4 py-3 text-left font-semibold">Total Interior</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">800 sq ft</td><td className="px-4 py-3 text-gray-700">5–6 gal</td><td className="px-4 py-3 text-gray-700">2 gal</td><td className="px-4 py-3 text-gray-700">~9 gal</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">1000 sq ft</td><td className="px-4 py-3 text-gray-700">6–8 gal</td><td className="px-4 py-3 text-gray-700">2.5 gal</td><td className="px-4 py-3 text-gray-700">~12 gal</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">1500 sq ft</td><td className="px-4 py-3 text-gray-700">9–12 gal</td><td className="px-4 py-3 text-gray-700">4 gal</td><td className="px-4 py-3 text-gray-700">~17 gal</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">2000 sq ft</td><td className="px-4 py-3 text-gray-700">12–15 gal</td><td className="px-4 py-3 text-gray-700">5 gal</td><td className="px-4 py-3 text-gray-700">~22 gal</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">2500 sq ft</td><td className="px-4 py-3 text-gray-700">15–19 gal</td><td className="px-4 py-3 text-gray-700">6 gal</td><td className="px-4 py-3 text-gray-700">~28 gal</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Estimating and Buying Interior House Paint</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use the room-by-room method</strong> for the most accurate result — measure each room individually rather than using the whole-house formula.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy 5-gallon buckets</strong> for your main colour — cheaper per gallon and batch-consistent.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use one colour for multiple rooms</strong> where possible — this allows you to use leftovers between rooms and reduces total cans purchased.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always add 10% buffer</strong> to your calculated total for waste, touch-ups, and coverage variation.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Store all leftover paint</strong> labelled by room — a sealed can of latex paint stays usable for up to 5 years.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 2000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-1500-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 1500 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-1000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 1000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How do I calculate p">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I calculate paint for the interior of my house?</h3>
              <p className="text-gray-700">Use the formula: (floor area × 2.5) ÷ 400 = gallons per coat for walls. Double for two coats, add 15% for ceilings, and 10% for trim.</p>
            </div>
            <div key="How much does it cos">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a house interior?</h3>
              <p className="text-gray-700">Paint alone runs $400 to $1,200 depending on home size. Professional labour adds $1,500 to $6,000 for a complete interior job.</p>
            </div>
            <div key="Should I use the sam">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I use the same colour throughout the house?</h3>
              <p className="text-gray-700">Using one colour throughout saves money by allowing bulk buying and cross-room use of leftovers. A single accent wall per room adds variety without requiring additional colours.</p>
            </div>
            <div key="How much paint for c">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for ceilings in a whole house?</h3>
              <p className="text-gray-700">Budget 1 gallon of flat white ceiling paint per 400 sq ft of floor area for two coats. A 1500 sq ft house needs 4 to 5 gallons of ceiling paint.</p>
            </div>
            <div key="How much trim paint ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much trim paint for a whole house interior?</h3>
              <p className="text-gray-700">Allow 1 gallon of semi-gloss trim paint per 400 to 500 sq ft of floor area. A 1500 sq ft house typically needs 3 to 4 gallons for all interior trim.</p>
            </div>
            <div key="What order should I ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What order should I paint rooms in a house?</h3>
              <p className="text-gray-700">Paint from top to bottom and back to front: ceilings throughout first, then walls room by room, then all trim. Start from the room furthest from the front door.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
