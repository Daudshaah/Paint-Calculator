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
      ? 'https://thepaintcalculator.com/cost-to-paint-exterior-house'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-exterior-house`;
  return {
    title: 'Cost to Paint Exterior of House in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint the exterior of a house in 2026. Cost per sq ft, total estimates by home size, and DIY vs professional comparison.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint Exterior of House in 2026',
      description: 'Find out exactly how much it costs to paint the exterior of a house in 2026. Cost per sq ft, total estimates by home size, and DIY vs professional comparison.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintExteriorHouse({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint Exterior of House","item":"https://thepaintcalculator.com/cost-to-paint-exterior-house"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint the exterior of a house?","acceptedAnswer":{"@type":"Answer","text":"A typical 1,500–2,000 sq ft home costs $1,800–$5,000 professionally and $400–$1,200 DIY for two coats on the siding."}},{"@type":"Question","name":"How much do painters charge per sq ft for exterior?","acceptedAnswer":{"@type":"Answer","text":"Professional exterior painters charge $1.50–$4 per square foot of siding area including labour and paint."}},{"@type":"Question","name":"How long does exterior house painting last?","acceptedAnswer":{"@type":"Answer","text":"Quality exterior paint properly applied lasts 7–15 years. Cheap paint or poor prep leads to peeling within 3–5 years."}},{"@type":"Question","name":"Can I paint the exterior of my house myself?","acceptedAnswer":{"@type":"Answer","text":"Yes — DIY exterior painting is feasible for a one-storey home. Two-storey homes require scaffolding or tall ladders which add safety risks and equipment cost."}},{"@type":"Question","name":"What is the best time of year to paint the exterior?","acceptedAnswer":{"@type":"Answer","text":"Late spring and early autumn — mild temperatures between 50°F and 85°F with low humidity and no rain forecast for 24–48 hours after application."}},{"@type":"Question","name":"How many gallons of paint for house exterior?","acceptedAnswer":{"@type":"Answer","text":"A 1,500 sq ft home needs 7–10 gallons. A 2,000 sq ft home needs 10–14 gallons for two coats. Use the exterior paint calculator for your specific home size."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint Exterior of House in 2026","description":"2026 guide to exterior house painting costs — professional and DIY estimates by home size with cost breakdown.","url":"https://thepaintcalculator.com/cost-to-paint-exterior-house","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint Exterior of House</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint Exterior of House in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint the exterior of a typical home ranges from <strong>$400 to $1,200 for DIY</strong> and <strong>$1,800 to $5,000 for a professional crew</strong>. Home size, siding type, number of storeys, and surface condition are the main cost drivers.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$1,800 to $5,000 professional / $400 to $1,200 DIY</p>
          <p className="text-sm opacity-90">For a typical 1,500–2,000 sq ft home — two coats on siding</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Exterior House Painting Cost by Home Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Home Size</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td className="px-4 py-3 text-gray-700">$250–$600</td><td className="px-4 py-3 text-gray-700">$1,000–$2,500</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td className="px-4 py-3 text-gray-700">$400–$900</td><td className="px-4 py-3 text-gray-700">$1,800–$3,500</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td className="px-4 py-3 text-gray-700">$600–$1,200</td><td className="px-4 py-3 text-gray-700">$2,500–$5,000</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td className="px-4 py-3 text-gray-700">$800–$1,600</td><td className="px-4 py-3 text-gray-700">$3,500–$7,000</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">3,000 sq ft</td><td className="px-4 py-3 text-gray-700">$1,000–$2,000</td><td className="px-4 py-3 text-gray-700">$4,500–$9,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Affects Exterior Painting Cost?</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Siding type.</strong> Smooth vinyl siding is the cheapest to paint. Rough wood, stucco, and brick absorb significantly more paint and take longer — adding 30–50% to both material and labour costs.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Number of storeys.</strong> Two and three storey homes require ladders, scaffolding, or lift equipment — adding $500–$2,000 to professional labour.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Surface prep.</strong> Peeling paint, rot repair, power washing, and caulking gaps all add to the cost. Homes with extensive prep needs can see prep costs equal to or exceed the painting cost.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Number of colours.</strong> A second colour for trim, shutters, or accents adds masking time and cost. Each additional colour typically adds $200–$500 to a professional job.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Exterior Paint Cost Breakdown</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Cost Component</th>
                <th className="px-4 py-3 text-left font-semibold">DIY (1,500 sq ft)</th>
                <th className="px-4 py-3 text-left font-semibold">Professional (1,500 sq ft)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Exterior paint (10 gal)</td><td className="px-4 py-3 text-gray-700">$300–$800</td><td className="px-4 py-3 text-gray-700">Included</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Primer (3 gal)</td><td className="px-4 py-3 text-gray-700">$60–$120</td><td className="px-4 py-3 text-gray-700">Included</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Tools & equipment</td><td className="px-4 py-3 text-gray-700">$50–$200</td><td className="px-4 py-3 text-gray-700">Included</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Labour</td><td className="px-4 py-3 text-gray-700">Your time (2–4 days)</td><td className="px-4 py-3 text-gray-700">$1,200–$2,500</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Total estimate</td><td className="px-4 py-3 text-gray-700">$410–$1,120</td><td className="px-4 py-3 text-gray-700">$1,800–$3,500</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/best-exterior-paint-for-houses`} className="text-blue-600 hover:text-blue-700 font-medium">Best Exterior Paint for Houses →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 2000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-whole-house-interior`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint Whole House Interior →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint the exterior of a house?</h3>
              <p className="text-gray-700">A typical 1,500–2,000 sq ft home costs $1,800–$5,000 professionally and $400–$1,200 DIY for two coats on the siding.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much do painters charge per sq ft for exterior?</h3>
              <p className="text-gray-700">Professional exterior painters charge $1.50–$4 per square foot of siding area including labour and paint.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does exterior house painting last?</h3>
              <p className="text-gray-700">Quality exterior paint properly applied lasts 7–15 years. Cheap paint or poor prep leads to peeling within 3–5 years.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint the exterior of my house myself?</h3>
              <p className="text-gray-700">Yes — DIY exterior painting is feasible for a one-storey home. Two-storey homes require scaffolding or tall ladders which add safety risks and equipment cost.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best time of year to paint the exterior?</h3>
              <p className="text-gray-700">Late spring and early autumn — mild temperatures between 50°F and 85°F with low humidity and no rain forecast for 24–48 hours after application.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for house exterior?</h3>
              <p className="text-gray-700">A 1,500 sq ft home needs 7–10 gallons. A 2,000 sq ft home needs 10–14 gallons for two coats. Use the exterior paint calculator for your specific home size.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
