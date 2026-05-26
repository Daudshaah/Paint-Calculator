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
      ? 'https://thepaintcalculator.com/how-much-paint-to-cover-500-sq-ft'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-to-cover-500-sq-ft`;
  return {
    title: 'How Much Paint to Cover 500 Sq Ft? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need to cover 500 sq ft. Free estimates in gallons and litres with tips on coverage rates.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint to Cover 500 Sq Ft?',
      description: 'Find out exactly how much paint you need to cover 500 sq ft. Free estimates in gallons and litres with tips on coverage rates.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint to Cover 500 Sq Ft?","item":"https://thepaintcalculator.com/how-much-paint-to-cover-500-sq-ft"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is 1 gallon enough to cover 500 sq ft?","acceptedAnswer":{"@type":"Answer","text":"No — one gallon covers 350 to 400 sq ft on smooth surfaces. For 500 sq ft you need 1.25 to 1.5 gallons per coat. Buy 2 gallons for one coat or 3 gallons for two coats."}},{"@type":"Question","name":"How many coats does it take to cover 500 sq ft?","acceptedAnswer":{"@type":"Answer","text":"Two coats are standard for a professional finish on any surface. For a dramatic colour change, three coats may be needed for full opacity."}},{"@type":"Question","name":"How does paint coverage change with texture?","acceptedAnswer":{"@type":"Answer","text":"Lightly textured walls reduce coverage to 300 to 350 sq ft per gallon. Heavily textured surfaces reduce coverage to 200 to 250 sq ft per gallon. Add 30 to 50% more paint for textured surfaces."}},{"@type":"Question","name":"What is 500 sq ft of wall area in room terms?","acceptedAnswer":{"@type":"Answer","text":"500 sq ft of wall area roughly corresponds to a 12x15 room with 9ft ceilings, or two standard bedrooms combined, or a typical small apartment living area."}},{"@type":"Question","name":"Can I buy exactly 2.5 gallons?","acceptedAnswer":{"@type":"Answer","text":"Paint comes in quarts (0.25 gal), gallons, and 5-gallon buckets. For 2.5 gallons, buy two 1-gallon cans and two quarts — this gives you 2.5 gallons with a buffer for touch-ups."}},{"@type":"Question","name":"How long does it take to paint 500 sq ft of wall?","acceptedAnswer":{"@type":"Answer","text":"An experienced painter can apply one coat over 500 sq ft in about 1.5 to 2 hours. Allow 2 to 4 hours drying time before the second coat."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint to Cover 500 Sq Ft?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint to Cover 500 Sq Ft?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `To cover 500 sq ft with one coat, you need approximately <strong>1.25 gallons</strong> (4.7 litres). For two coats, budget <strong>2.5 gallons</strong> — buy <strong>3 gallons</strong> to be safe.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1.25 gallons per coat (4.7 litres)</p>
          <p className="text-sm opacity-90">For smooth walls at standard 400 sq ft per gallon coverage</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Covers 500 Sq Ft?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Standard interior paint covers 350 to 400 square feet per gallon on smooth surfaces. For 500 square feet, one gallon is not enough — you need 1.25 to 1.43 gallons per coat. The practical purchase is 1.5 gallons (one gallon plus a quart) for a single coat, or 3 gallons for two coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4">500 sq ft of wall area corresponds roughly to the walls of a 12x15 room with 9ft ceilings, or two average bedrooms combined. It is a useful benchmark for estimating paint for a significant portion of a home.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For textured walls, porous surfaces, or very dark or bold colours, paint coverage reduces to 250 to 300 sq ft per gallon. For 500 sq ft of textured surface, plan on 2 gallons per coat or 4 gallons for two coats.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">500 Sq Ft Paint Coverage — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface Type</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Smooth wall (standard)</td><td className="px-4 py-3 text-gray-700">1.25 gal</td><td className="px-4 py-3 text-gray-700">2.5 gal</td><td className="px-4 py-3 text-gray-700">~9.5 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Lightly textured wall</td><td className="px-4 py-3 text-gray-700">1.5 gal</td><td className="px-4 py-3 text-gray-700">3 gal</td><td className="px-4 py-3 text-gray-700">~11.4 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Heavily textured wall</td><td className="px-4 py-3 text-gray-700">2 gal</td><td className="px-4 py-3 text-gray-700">4 gal</td><td className="px-4 py-3 text-gray-700">~15.1 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Primer coat (smooth)</td><td className="px-4 py-3 text-gray-700">1.4 gal</td><td className="px-4 py-3 text-gray-700">—</td><td className="px-4 py-3 text-gray-700">~5.3 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Ceiling (flat, smooth)</td><td className="px-4 py-3 text-gray-700">1.25 gal</td><td className="px-4 py-3 text-gray-700">2.5 gal</td><td className="px-4 py-3 text-gray-700">~9.5 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Factors That Affect Paint Coverage</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Several factors reduce coverage below the stated 400 sq ft per gallon. Surface porosity is the biggest factor — new drywall, bare wood, and masonry absorb significantly more paint than previously painted surfaces. Surface texture increases the effective area to be covered — heavy knockdown or popcorn texture can reduce coverage by 50%.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Application method also matters. A roller typically gives 15 to 20% better coverage than a brush. An airless sprayer often results in overspray waste that reduces the effective coverage of a gallon.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting 500 Sq Ft</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Never try to stretch one gallon over 500 sq ft</strong> — it will give thin, patchy coverage that requires a third coat to fix, wasting more time and money than just buying 1.5 gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy 3 gallons for two coats</strong> on 500 sq ft of smooth wall — the 0.5 gallon over your theoretical need gives a valuable buffer for edges, corners, and touch-ups.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Box multiple cans together</strong> by pouring all cans into a large bucket and mixing before applying — this ensures consistent colour throughout.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Keep a wet edge</strong> at all times to avoid lap marks — work quickly and do not let sections dry before blending the next section.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Store unused paint</strong> labelled with the room and date — it stays usable for 2 to 5 years and is invaluable for future touch-ups.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room? →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Living Room? →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="Is 1 gallon enough t">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is 1 gallon enough to cover 500 sq ft?</h3>
              <p className="text-gray-700">No — one gallon covers 350 to 400 sq ft on smooth surfaces. For 500 sq ft you need 1.25 to 1.5 gallons per coat. Buy 2 gallons for one coat or 3 gallons for two coats.</p>
            </div>
            <div key="How many coats does ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many coats does it take to cover 500 sq ft?</h3>
              <p className="text-gray-700">Two coats are standard for a professional finish on any surface. For a dramatic colour change, three coats may be needed for full opacity.</p>
            </div>
            <div key="How does paint cover">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How does paint coverage change with texture?</h3>
              <p className="text-gray-700">Lightly textured walls reduce coverage to 300 to 350 sq ft per gallon. Heavily textured surfaces reduce coverage to 200 to 250 sq ft per gallon. Add 30 to 50% more paint for textured surfaces.</p>
            </div>
            <div key="What is 500 sq ft of">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is 500 sq ft of wall area in room terms?</h3>
              <p className="text-gray-700">500 sq ft of wall area roughly corresponds to a 12x15 room with 9ft ceilings, or two standard bedrooms combined, or a typical small apartment living area.</p>
            </div>
            <div key="Can I buy exactly 2.">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I buy exactly 2.5 gallons?</h3>
              <p className="text-gray-700">Paint comes in quarts (0.25 gal), gallons, and 5-gallon buckets. For 2.5 gallons, buy two 1-gallon cans and two quarts — this gives you 2.5 gallons with a buffer for touch-ups.</p>
            </div>
            <div key="How long does it tak">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint 500 sq ft of wall?</h3>
              <p className="text-gray-700">An experienced painter can apply one coat over 500 sq ft in about 1.5 to 2 hours. Allow 2 to 4 hours drying time before the second coat.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
