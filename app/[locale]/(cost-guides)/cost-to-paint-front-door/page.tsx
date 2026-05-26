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
      ? 'https://thepaintcalculator.com/cost-to-paint-front-door'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-front-door`;
  return {
    title: 'Cost to Paint a Front Door in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a front door in 2026. Professional and DIY cost estimates for single and double doors.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint a Front Door in 2026',
      description: 'Find out exactly how much it costs to paint a front door in 2026. Professional and DIY cost estimates for single and double doors.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintFrontDoor({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint a Front Door","item":"https://thepaintcalculator.com/cost-to-paint-front-door"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a front door?","acceptedAnswer":{"@type":"Answer","text":"A standard single front door costs $100–$250 professionally and $20–$50 DIY including a quart of door paint. Double doors cost $150–$350 professionally."}},{"@type":"Question","name":"What type of paint for a front door?","acceptedAnswer":{"@type":"Answer","text":"Exterior gloss or semi-gloss formulated for doors and trim. Oil-based alkyd gives the hardest finish; quality exterior latex is easier to apply. Both work well."}},{"@type":"Question","name":"How long does front door paint last?","acceptedAnswer":{"@type":"Answer","text":"Quality exterior door paint in a sheltered location lasts 5–10 years. South or west-facing doors in full sun may need repainting every 3–5 years due to UV exposure."}},{"@type":"Question","name":"Is painting a front door a good DIY project?","acceptedAnswer":{"@type":"Answer","text":"Yes — one of the best DIY projects for impact vs effort. One quart of paint, a small roller, and a brush are all you need. The entire job takes 2–3 hours."}},{"@type":"Question","name":"Do I need to prime a front door before painting?","acceptedAnswer":{"@type":"Answer","text":"If painting over a previously painted door in good condition, light sanding and no primer is often sufficient. For bare wood or dramatic colour changes, a coat of exterior primer improves adhesion and coverage."}},{"@type":"Question","name":"What is the most popular front door colour?","acceptedAnswer":{"@type":"Answer","text":"Black is currently the most popular front door colour in the US and UK, followed by navy blue, red, and forest green. A bold door colour has proven positive impact on curb appeal and property value."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint a Front Door in 2026","description":"2026 cost guide for painting a front door — professional and DIY estimates, paint options, and curb appeal tips.","url":"https://thepaintcalculator.com/cost-to-paint-front-door","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint a Front Door</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint a Front Door in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Painting a front door costs <strong>$20 to $60 for DIY</strong> and <strong>$100 to $300 professionally</strong>. It is one of the highest-impact, lowest-cost home improvements — dramatically improving curb appeal for minimal spend.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$100 to $300 professional / $20 to $60 DIY</p>
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Front Door Painting Cost Breakdown</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Surface</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Single front door</td><td className="px-4 py-3 text-gray-700">$20–$50</td><td className="px-4 py-3 text-gray-700">$100–$250</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Double front door</td><td className="px-4 py-3 text-gray-700">$35–$80</td><td className="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Door + frame</td><td className="px-4 py-3 text-gray-700">$30–$70</td><td className="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Door + frame + sidelights</td><td className="px-4 py-3 text-gray-700">$45–$100</td><td className="px-4 py-3 text-gray-700">$200–$450</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">DIY Front Door Painting — Full Cost Breakdown</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Quart of exterior door paint: $15–$30.</strong> One quart is more than enough for both sides of a single door with two coats. Use a gloss or semi-gloss exterior paint specifically for doors.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Small foam roller and brush: $8–$15.</strong> A 4-inch foam roller for flat panels and a small angled brush for detail work and edges.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Painter's tape, sandpaper, primer: $10–$20.</strong> 220-grit sandpaper for light sanding between coats, painter's tape for hardware masking.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Front Door Painting — Best ROI in Home Improvement</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Real estate studies consistently show that a freshly painted front door returns $5–$10 in home value for every $1 spent. A bold, well-chosen door colour significantly improves curb appeal — one of the first things buyers notice.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The DIY cost of $20–$60 for one quart of premium door paint makes front door painting the highest-ROI home improvement per dollar spent. Even hiring a professional at $100–$250 delivers exceptional value relative to the visual impact and property value improvement.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Most Popular Front Door Colours</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Black.</strong> The most universally popular front door colour — works with virtually every house style and exterior colour. Bold, classic, and timeless.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Navy blue.</strong> A sophisticated, welcoming alternative to black. Works particularly well on white or light-coloured homes.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Red.</strong> A classic traditional front door colour that adds energy and character. Popular on brick homes.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Forest green.</strong> A modern, nature-inspired choice that has grown significantly in popularity. Works well on both modern and traditional homes.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-front-door`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Front Door? →</Link></li>
            <li><Link href={`/${locale}/best-exterior-paint-for-houses`} className="text-blue-600 hover:text-blue-700 font-medium">Best Exterior Paint for Houses →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-exterior-house`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint Exterior of House →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a front door?</h3>
              <p className="text-gray-700">A standard single front door costs $100–$250 professionally and $20–$50 DIY including a quart of door paint. Double doors cost $150–$350 professionally.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint for a front door?</h3>
              <p className="text-gray-700">Exterior gloss or semi-gloss formulated for doors and trim. Oil-based alkyd gives the hardest finish; quality exterior latex is easier to apply. Both work well.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does front door paint last?</h3>
              <p className="text-gray-700">Quality exterior door paint in a sheltered location lasts 5–10 years. South or west-facing doors in full sun may need repainting every 3–5 years due to UV exposure.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is painting a front door a good DIY project?</h3>
              <p className="text-gray-700">Yes — one of the best DIY projects for impact vs effort. One quart of paint, a small roller, and a brush are all you need. The entire job takes 2–3 hours.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to prime a front door before painting?</h3>
              <p className="text-gray-700">If painting over a previously painted door in good condition, light sanding and no primer is often sufficient. For bare wood or dramatic colour changes, a coat of exterior primer improves adhesion and coverage.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the most popular front door colour?</h3>
              <p className="text-gray-700">Black is currently the most popular front door colour in the US and UK, followed by navy blue, red, and forest green. A bold door colour has proven positive impact on curb appeal and property value.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
