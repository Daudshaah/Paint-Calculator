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
      ? 'https://thepaintcalculator.com/cost-to-paint-whole-house-interior'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-whole-house-interior`;
  return {
    title: 'Cost to Paint Whole House Interior in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint the interior of a whole house in 2026. Cost estimates by home size, DIY vs professional breakdown.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint Whole House Interior in 2026',
      description: 'Find out exactly how much it costs to paint the interior of a whole house in 2026. Cost estimates by home size, DIY vs professional breakdown.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintWholeHouseInterior({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint Whole House Interior","item":"https://thepaintcalculator.com/cost-to-paint-whole-house-interior"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint the interior of a whole house?","acceptedAnswer":{"@type":"Answer","text":"A 1,500 sq ft home costs $2,500–$5,500 professionally and $600–$1,200 DIY. A 2,000 sq ft home costs $3,500–$7,000 professionally and $800–$1,600 DIY."}},{"@type":"Question","name":"How long does it take to paint a whole house interior?","acceptedAnswer":{"@type":"Answer","text":"A professional crew of two takes 3–5 days for a 1,500 sq ft house. A solo DIYer should budget 7–14 days to complete the job properly."}},{"@type":"Question","name":"How many gallons of paint for a whole house interior?","acceptedAnswer":{"@type":"Answer","text":"A 1,500 sq ft home needs 15–20 gallons total — 9–12 for walls, 4–5 for ceilings, and 2–3 for trim. Use the whole house paint calculator for your exact estimate."}},{"@type":"Question","name":"Is it cheaper to paint the whole house at once?","acceptedAnswer":{"@type":"Answer","text":"Yes — painting all rooms at once allows bulk paint buying, one contractor mobilisation cost, and a single prep and cleanup phase, reducing per-room cost by 15–25%."}},{"@type":"Question","name":"What type of paint for whole house interior?","acceptedAnswer":{"@type":"Answer","text":"Eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for all ceilings, and semi-gloss for all trim and baseboards."}},{"@type":"Question","name":"Should I paint the whole house one colour?","acceptedAnswer":{"@type":"Answer","text":"Using one main neutral colour throughout with white ceilings and trim is the most cost-effective approach and creates a cohesive, spacious feel throughout the home."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint Whole House Interior in 2026","description":"2026 guide to whole house interior painting costs by home size — professional and DIY estimates with full cost breakdown.","url":"https://thepaintcalculator.com/cost-to-paint-whole-house-interior","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Cost to Paint Whole House Interior</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint Whole House Interior in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint a whole house interior ranges from <strong>$500 to $1,500 for DIY</strong> and <strong>$2,000 to $8,000 for professional painters</strong> depending on home size, number of rooms, and whether ceilings and trim are included.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$2,000 to $8,000 professional / $500 to $1,500 DIY</p>
          <p className="text-sm opacity-90">For a typical 1,500–2,500 sq ft home — walls, ceilings, and trim</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Whole House Interior Painting Cost by Home Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Home Size</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">800 sq ft</td><td className="px-4 py-3 text-gray-700">$300–$700</td><td className="px-4 py-3 text-gray-700">$1,200–$3,000</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td className="px-4 py-3 text-gray-700">$400–$900</td><td className="px-4 py-3 text-gray-700">$1,500–$3,800</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td className="px-4 py-3 text-gray-700">$600–$1,200</td><td className="px-4 py-3 text-gray-700">$2,500–$5,500</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td className="px-4 py-3 text-gray-700">$800–$1,600</td><td className="px-4 py-3 text-gray-700">$3,500–$7,000</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td className="px-4 py-3 text-gray-700">$1,000–$2,000</td><td className="px-4 py-3 text-gray-700">$4,500–$9,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Reduce Whole House Painting Cost</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use one colour throughout.</strong> Using the same wall colour in all rooms eliminates colour change prep, reduces total cans needed, and allows bulk buying in 5-gallon buckets at lower per-gallon cost.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy in 5-gallon buckets.</strong> For a whole house job you will need 10+ gallons of wall colour. Buying in 5-gallon buckets saves 10–15% per gallon and guarantees colour batch consistency.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do prep yourself when hiring professionals.</strong> Moving furniture, washing walls, and filling nail holes yourself before the painter arrives can reduce the quote by $200–$500.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Paint in spring or autumn.</strong> Professional painters are often less busy in shoulder seasons — you may negotiate a better rate compared to peak summer demand.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Does a Whole House Paint Job Include?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A complete whole house interior paint job typically includes all walls, ceilings (flat white), and trim/baseboards in each room. Doors, closet interiors, and built-in shelving may or may not be included — always confirm in writing before the job starts.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Interior of House? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 2000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-exterior-house`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint Exterior of House →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint the interior of a whole house?</h3>
              <p className="text-gray-700">A 1,500 sq ft home costs $2,500–$5,500 professionally and $600–$1,200 DIY. A 2,000 sq ft home costs $3,500–$7,000 professionally and $800–$1,600 DIY.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a whole house interior?</h3>
              <p className="text-gray-700">A professional crew of two takes 3–5 days for a 1,500 sq ft house. A solo DIYer should budget 7–14 days to complete the job properly.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a whole house interior?</h3>
              <p className="text-gray-700">A 1,500 sq ft home needs 15–20 gallons total — 9–12 for walls, 4–5 for ceilings, and 2–3 for trim. Use the whole house paint calculator for your exact estimate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it cheaper to paint the whole house at once?</h3>
              <p className="text-gray-700">Yes — painting all rooms at once allows bulk paint buying, one contractor mobilisation cost, and a single prep and cleanup phase, reducing per-room cost by 15–25%.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint for whole house interior?</h3>
              <p className="text-gray-700">Eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for all ceilings, and semi-gloss for all trim and baseboards.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint the whole house one colour?</h3>
              <p className="text-gray-700">Using one main neutral colour throughout with white ceilings and trim is the most cost-effective approach and creates a cohesive, spacious feel throughout the home.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
