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
      ? 'https://thepaintcalculator.com/cost-to-paint-garage'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-garage`;
  return {
    title: 'Cost to Paint a Garage in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a garage in 2026. Wall, floor, and ceiling cost estimates for single and two-car garages.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint a Garage in 2026',
      description: 'Find out exactly how much it costs to paint a garage in 2026. Wall, floor, and ceiling cost estimates for single and two-car garages.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintGarage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint a Garage","item":"https://thepaintcalculator.com/cost-to-paint-garage"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a garage?","acceptedAnswer":{"@type":"Answer","text":"A two-car garage costs $350–$900 professionally for walls and ceiling, and $120–$250 DIY. Adding an epoxy floor adds $600–$1,500 professionally or $100–$300 DIY."}},{"@type":"Question","name":"What type of paint for garage walls?","acceptedAnswer":{"@type":"Answer","text":"Semi-gloss or satin latex in a light colour — it reflects light, is easy to wipe clean, and resists the moisture and temperature changes in a garage environment."}},{"@type":"Question","name":"What is the best garage floor paint?","acceptedAnswer":{"@type":"Answer","text":"Two-part epoxy coating gives the most durable and professional floor finish. One-part water-based floor paint is easier to apply DIY but less durable under vehicle traffic."}},{"@type":"Question","name":"Do garage walls need primer?","acceptedAnswer":{"@type":"Answer","text":"Yes — bare drywall and concrete block are both porous and require primer for proper adhesion. Always prime unfinished garage surfaces before painting."}},{"@type":"Question","name":"How long does garage paint last?","acceptedAnswer":{"@type":"Answer","text":"Wall paint lasts 5–10 years. Epoxy floor coating lasts 10–20 years professionally applied. One-part DIY floor paint lasts 3–5 years with vehicle traffic."}},{"@type":"Question","name":"Can I paint a garage in one day?","acceptedAnswer":{"@type":"Answer","text":"Walls and ceiling of a standard garage can be painted in one day by two people. Floor coating requires a second day after the acid etch prep and must cure 48–72 hours before vehicle traffic."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint a Garage in 2026","description":"2026 cost guide for garage painting — walls, floor, and ceiling estimates for single and double garages.","url":"https://thepaintcalculator.com/cost-to-paint-garage","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint a Garage</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint a Garage in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint a standard two-car garage ranges from <strong>$100 to $350 for DIY</strong> and <strong>$400 to $1,200 for a professional</strong>. Adding epoxy floor coating adds $300–$1,500 depending on size and product.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$400 to $1,200 professional / $100 to $350 DIY</p>
          <p className="text-sm opacity-90">For a standard two-car garage — walls and ceiling</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Garage Painting Cost Breakdown</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Surface</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Single garage walls</td><td className="px-4 py-3 text-gray-700">$60–$150</td><td className="px-4 py-3 text-gray-700">$200–$500</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Two-car garage walls</td><td className="px-4 py-3 text-gray-700">$120–$250</td><td className="px-4 py-3 text-gray-700">$350–$900</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Garage floor (epoxy)</td><td className="px-4 py-3 text-gray-700">$100–$300</td><td className="px-4 py-3 text-gray-700">$600–$1,500</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Garage ceiling</td><td className="px-4 py-3 text-gray-700">$40–$100</td><td className="px-4 py-3 text-gray-700">$150–$400</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Complete garage (2-car)</td><td className="px-4 py-3 text-gray-700">$250–$600</td><td className="px-4 py-3 text-gray-700">$1,000–$2,500</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Garage Epoxy Floor Cost</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A two-car garage floor (approximately 400 sq ft) costs $100–$300 DIY with a water-based one-part floor paint kit, or $600–$1,500 professionally with a two-part epoxy coating. Professional two-part epoxy is significantly more durable — lasting 10–20 years under vehicle traffic vs 3–5 years for DIY one-part floor paint.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Floor preparation is the most critical factor — concrete must be etched with acid or mechanically ground before coating. Surface prep kits cost $30–$60 extra for DIY.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Is Painting a Garage Worth It?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Painting garage walls and floor dramatically improves the space — brighter, cleaner, and significantly easier to keep clean. For a workshop, home gym, or living-adjacent garage, painted walls and an epoxy floor can add real value to how the space is used and perceived.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The ROI is high for a DIY job — paint a two-car garage yourself for $250–$600 and the result is a completely transformed space. Professional epoxy floor coating is the one area where professional application is genuinely worth the premium for longevity.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Garage Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-garage`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Garage? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-whole-house-interior`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint Whole House Interior →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a garage?</h3>
              <p className="text-gray-700">A two-car garage costs $350–$900 professionally for walls and ceiling, and $120–$250 DIY. Adding an epoxy floor adds $600–$1,500 professionally or $100–$300 DIY.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint for garage walls?</h3>
              <p className="text-gray-700">Semi-gloss or satin latex in a light colour — it reflects light, is easy to wipe clean, and resists the moisture and temperature changes in a garage environment.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best garage floor paint?</h3>
              <p className="text-gray-700">Two-part epoxy coating gives the most durable and professional floor finish. One-part water-based floor paint is easier to apply DIY but less durable under vehicle traffic.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do garage walls need primer?</h3>
              <p className="text-gray-700">Yes — bare drywall and concrete block are both porous and require primer for proper adhesion. Always prime unfinished garage surfaces before painting.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does garage paint last?</h3>
              <p className="text-gray-700">Wall paint lasts 5–10 years. Epoxy floor coating lasts 10–20 years professionally applied. One-part DIY floor paint lasts 3–5 years with vehicle traffic.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint a garage in one day?</h3>
              <p className="text-gray-700">Walls and ceiling of a standard garage can be painted in one day by two people. Floor coating requires a second day after the acid etch prep and must cure 48–72 hours before vehicle traffic.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
