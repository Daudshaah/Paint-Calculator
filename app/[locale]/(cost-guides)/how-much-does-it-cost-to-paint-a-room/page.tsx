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
      ? 'https://thepaintcalculator.com/how-much-does-it-cost-to-paint-a-room'
      : `https://thepaintcalculator.com/${locale}/how-much-does-it-cost-to-paint-a-room`;
  return {
    title: 'How Much Does It Cost to Paint a Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a room in 2026. DIY vs professional costs, paint prices, and money-saving tips.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Does It Cost to Paint a Room?',
      description: 'Find out exactly how much it costs to paint a room in 2026. DIY vs professional costs, paint prices, and money-saving tips.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintRoom({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint a Room","item":"https://thepaintcalculator.com/how-much-does-it-cost-to-paint-a-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a room professionally?","acceptedAnswer":{"@type":"Answer","text":"Professional painters charge $150–$800 for an average room depending on size. An average 12×14 bedroom typically costs $250–$600 including labour and paint."}},{"@type":"Question","name":"How much does it cost to paint a room yourself?","acceptedAnswer":{"@type":"Answer","text":"DIY painting an average room costs $60–$120 in paint plus $30–$60 in supplies (tape, drop cloths, rollers, brushes). Total DIY cost is typically $80–$180 per room."}},{"@type":"Question","name":"How much do painters charge per square foot?","acceptedAnswer":{"@type":"Answer","text":"Professional painters typically charge $2–$6 per square foot of wall area including labour and paint. The rate varies by region, with metropolitan areas at the higher end."}},{"@type":"Question","name":"Is it worth hiring a professional painter?","acceptedAnswer":{"@type":"Answer","text":"Professional painters work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. Worth it for large spaces, difficult prep situations, or when your time has high value."}},{"@type":"Question","name":"How much does paint cost per gallon?","acceptedAnswer":{"@type":"Answer","text":"Paint costs $20–$35 per gallon for budget brands and $55–$90 per gallon for premium paints like Benjamin Moore Aura or Sherwin-Williams Emerald."}},{"@type":"Question","name":"Does the type of paint finish affect cost?","acceptedAnswer":{"@type":"Answer","text":"Finish type has minimal impact on paint cost — most brands charge the same price across finishes. Semi-gloss trim paint may cost slightly more than flat ceiling paint in some product lines."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"How Much Does It Cost to Paint a Room?","description":"Complete 2026 cost guide for painting a room — DIY vs professional, paint costs, labour rates, and money-saving tips.","url":"https://thepaintcalculator.com/how-much-does-it-cost-to-paint-a-room","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint a Room</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Does It Cost to Paint a Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint an average room ranges from <strong>$50 to $150 for DIY</strong> and <strong>$150 to $800 for a professional painter</strong>. Room size, paint quality, and whether you include ceiling and trim significantly affect the total.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$150 to $800 professional / $50 to $150 DIY</p>
          <p className="text-sm opacity-90">For an average 12×14 room — walls only, two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Room Painting Cost by Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Room Size</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Includes</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small 10×10</td><td className="px-4 py-3 text-gray-700">$40–$80</td><td className="px-4 py-3 text-gray-700">$150–$350</td><td className="px-4 py-3 text-gray-700">Walls only</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Average 12×14</td><td className="px-4 py-3 text-gray-700">$60–$120</td><td className="px-4 py-3 text-gray-700">$250–$600</td><td className="px-4 py-3 text-gray-700">Walls only</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Large 15×20</td><td className="px-4 py-3 text-gray-700">$100–$180</td><td className="px-4 py-3 text-gray-700">$400–$900</td><td className="px-4 py-3 text-gray-700">Walls only</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">With ceiling + trim</td><td className="px-4 py-3 text-gray-700">+$30–$60</td><td className="px-4 py-3 text-gray-700">+$100–$250</td><td className="px-4 py-3 text-gray-700">Add to above</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Affects the Cost to Paint a Room?</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Room size.</strong> The biggest factor. More wall area means more paint and more labour time. Painters typically charge $2–$6 per square foot of wall area.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint quality.</strong> Budget paint costs $20–$30 per gallon. Premium paints (Benjamin Moore Aura, Sherwin-Williams Emerald) cost $60–$90 per gallon. For an average room, this is a $40–$100 difference in paint cost alone.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Number of coats.</strong> Two coats are standard. A dramatic colour change requiring three coats adds 30–50% to labour time and paint cost.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ceiling and trim.</strong> Adding ceiling painting typically adds $50–$150 to professional cost. Trim painting adds $75–$200 depending on the amount of trim.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Location.</strong> Labour rates vary significantly by region. Professional painters in major metropolitan areas charge 30–50% more than rural areas.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">DIY vs Professional — True Cost Comparison</h2>
          <p className="text-gray-700 leading-relaxed mb-4">DIY painting saves 60–70% compared to hiring professionals. For an average 12×14 bedroom, professional painting costs $250–$600 vs $60–$120 DIY. However, DIY requires your time — typically a full day for an average room.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Professional painters include all prep work in their quote — filling holes, sanding, priming, and masking. First-time DIY painters often underestimate the time and cost of prep materials (tape, drop cloths, spackle, sandpaper) which add $30–$60 to the DIY cost.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Money-Saving Tips for Painting a Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do the prep yourself.</strong> If hiring professionals, offer to move furniture and do the prep work yourself. Many painters will reduce their quote by $50–$100.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy paint during sales.</strong> Major paint brands run 30–40% off sales several times a year. Stock up on frequently used colours when sales occur.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a tinted primer for dramatic colour changes.</strong> A $15–$20 quart of tinted primer can eliminate the need for a third topcoat, saving the cost of an extra gallon.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Get multiple quotes.</strong> Professional painter prices vary significantly. Get at least three quotes for any room — prices often differ by 30–50% for identical work.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint a Bedroom →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint a Living Room →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room professionally?</h3>
              <p className="text-gray-700">Professional painters charge $150–$800 for an average room depending on size. An average 12×14 bedroom typically costs $250–$600 including labour and paint.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room yourself?</h3>
              <p className="text-gray-700">DIY painting an average room costs $60–$120 in paint plus $30–$60 in supplies (tape, drop cloths, rollers, brushes). Total DIY cost is typically $80–$180 per room.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much do painters charge per square foot?</h3>
              <p className="text-gray-700">Professional painters typically charge $2–$6 per square foot of wall area including labour and paint. The rate varies by region, with metropolitan areas at the higher end.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it worth hiring a professional painter?</h3>
              <p className="text-gray-700">Professional painters work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. Worth it for large spaces, difficult prep situations, or when your time has high value.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does paint cost per gallon?</h3>
              <p className="text-gray-700">Paint costs $20–$35 per gallon for budget brands and $55–$90 per gallon for premium paints like Benjamin Moore Aura or Sherwin-Williams Emerald.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does the type of paint finish affect cost?</h3>
              <p className="text-gray-700">Finish type has minimal impact on paint cost — most brands charge the same price across finishes. Semi-gloss trim paint may cost slightly more than flat ceiling paint in some product lines.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
