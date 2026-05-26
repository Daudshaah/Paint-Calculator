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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-2000-sq-ft-house'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-2000-sq-ft-house`;
  return {
    title: 'How Much Paint for a 2000 Sq Ft House? | ThePaintCalculator.com',
    description: 'Calculate how much paint you need for a 2000 sq ft house. Interior and exterior estimates in gallons and litres. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 2000 Sq Ft House?',
      description: 'Calculate how much paint you need for a 2000 sq ft house. Interior and exterior estimates in gallons and litres. Free, no signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a 2000 Sq Ft House?","item":"https://thepaintcalculator.com/how-much-paint-for-a-2000-sq-ft-house"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons of paint for a 2000 sq ft house interior?","acceptedAnswer":{"@type":"Answer","text":"Plan on 12 to 15 gallons for walls, 5 to 6 gallons for ceilings, and 2 to 3 gallons for trim — about 19 to 24 gallons total for the full interior."}},{"@type":"Question","name":"How many gallons for the exterior of a 2000 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Exterior painting needs 10 to 14 gallons for two coats on the siding. Rough or textured siding like stucco or brick requires 20 to 30% more paint."}},{"@type":"Question","name":"How much does it cost to paint a 2000 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Paint alone costs $400 to $900 for the interior. Hiring professional painters for the full interior typically runs $2,000 to $5,000 depending on location and finish quality."}},{"@type":"Question","name":"How long does it take to paint a 2000 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"A crew of two professionals can complete the interior in 3 to 4 days. A solo DIYer should budget 7 to 10 days to do it properly with adequate drying time."}},{"@type":"Question","name":"Should I buy 5-gallon buckets for a 2000 sq ft house?","acceptedAnswer":{"@type":"Answer","text":"Yes — if you need 5 or more gallons of the same colour (which you will), buy 5-gallon buckets. They cost 10 to 15% less per gallon than individual gallons and guarantee colour consistency."}},{"@type":"Question","name":"What type of paint is best for a whole house interior?","acceptedAnswer":{"@type":"Answer","text":"Use quality latex paint with a built-in primer for walls. Semi-gloss for trim, satin for kitchens and bathrooms, eggshell for living areas and bedrooms, and flat white for ceilings."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a 2000 Sq Ft House?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 2000 Sq Ft House?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A 2000 sq ft house needs approximately <strong>12 to 15 gallons</strong> (45 to 57 litres) for interior walls with two coats. Exterior painting requires <strong>10 to 14 gallons</strong> depending on siding type.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">12 to 15 gallons interior (45 to 57 litres)</p>
          <p className="text-sm opacity-90">For interior walls of a 2000 sq ft house — two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a 2000 Sq Ft House Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Interior wall area in a 2000 sq ft home is typically 2.5 to 3 times the floor plan square footage when you account for all rooms and ceiling heights. That gives approximately 5,000 to 6,000 sq ft of paintable wall area. At 400 sq ft per gallon and two coats, the total is 25 to 30 gallon-coats — or 12 to 15 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Add another 5 to 6 gallons for ceilings and 2 to 3 gallons for trim, bringing the complete interior paint total to 19 to 24 gallons for a 2000 sq ft home.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For the exterior, a 2000 sq ft home typically has 1,500 to 2,000 sq ft of paintable siding. Two coats requires 8 to 10 gallons of exterior paint. Add 1 to 2 gallons for fascia and trim.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2000 Sq Ft House Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Area</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior walls</td><td className="px-4 py-3 text-gray-700">6–8 gal</td><td className="px-4 py-3 text-gray-700">12–15 gal</td><td className="px-4 py-3 text-gray-700">45–57 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceilings</td><td className="px-4 py-3 text-gray-700">2.5–3 gal</td><td className="px-4 py-3 text-gray-700">5–6 gal</td><td className="px-4 py-3 text-gray-700">19–23 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior trim</td><td className="px-4 py-3 text-gray-700">1–1.5 gal</td><td className="px-4 py-3 text-gray-700">2–3 gal</td><td className="px-4 py-3 text-gray-700">7.5–11 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Exterior walls</td><td className="px-4 py-3 text-gray-700">5–7 gal</td><td className="px-4 py-3 text-gray-700">10–14 gal</td><td className="px-4 py-3 text-gray-700">38–53 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Exterior trim</td><td className="px-4 py-3 text-gray-700">0.5–1 gal</td><td className="px-4 py-3 text-gray-700">1–2 gal</td><td className="px-4 py-3 text-gray-700">3.8–7.5 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a 2000 Sq Ft House</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy in 5-gallon buckets</strong> for your main wall colour — they are cheaper per gallon and guarantee consistent colour batch across all rooms.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a tinted primer</strong> for dramatic colour changes throughout the house — it reduces the number of topcoats needed and saves money overall.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Work room by room</strong> — complete each room fully (ceiling, walls, trim) before moving to the next to avoid cross-contamination of colours.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow one week per floor</strong> for a thorough DIY job — rushing leads to drips, missed spots, and insufficient drying time between coats.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Store leftover paint</strong> labelled by room for future touch-ups. A 2000 sq ft house will need touch-ups over time in high-traffic areas.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-1500-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 1500 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-1000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 1000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Interior of House? →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons of ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a 2000 sq ft house interior?</h3>
              <p className="text-gray-700">Plan on 12 to 15 gallons for walls, 5 to 6 gallons for ceilings, and 2 to 3 gallons for trim — about 19 to 24 gallons total for the full interior.</p>
            </div>
            <div key="How many gallons for">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for the exterior of a 2000 sq ft house?</h3>
              <p className="text-gray-700">Exterior painting needs 10 to 14 gallons for two coats on the siding. Rough or textured siding like stucco or brick requires 20 to 30% more paint.</p>
            </div>
            <div key="How much does it cos">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a 2000 sq ft house?</h3>
              <p className="text-gray-700">Paint alone costs $400 to $900 for the interior. Hiring professional painters for the full interior typically runs $2,000 to $5,000 depending on location and finish quality.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 2000 sq ft house?</h3>
              <p className="text-gray-700">A crew of two professionals can complete the interior in 3 to 4 days. A solo DIYer should budget 7 to 10 days to do it properly with adequate drying time.</p>
            </div>
            <div key="Should I buy 5-gallo">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I buy 5-gallon buckets for a 2000 sq ft house?</h3>
              <p className="text-gray-700">Yes — if you need 5 or more gallons of the same colour (which you will), buy 5-gallon buckets. They cost 10 to 15% less per gallon than individual gallons and guarantee colour consistency.</p>
            </div>
            <div key="What type of paint i">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint is best for a whole house interior?</h3>
              <p className="text-gray-700">Use quality latex paint with a built-in primer for walls. Semi-gloss for trim, satin for kitchens and bathrooms, eggshell for living areas and bedrooms, and flat white for ceilings.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
