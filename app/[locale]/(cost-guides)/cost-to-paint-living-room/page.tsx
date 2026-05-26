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
      ? 'https://thepaintcalculator.com/cost-to-paint-living-room'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-living-room`;
  return {
    title: 'Cost to Paint a Living Room in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a living room in 2026. DIY and professional cost estimates for all living room sizes.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint a Living Room in 2026',
      description: 'Find out exactly how much it costs to paint a living room in 2026. DIY and professional cost estimates for all living room sizes.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintLivingRoom({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint a Living Room","item":"https://thepaintcalculator.com/cost-to-paint-living-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a living room?","acceptedAnswer":{"@type":"Answer","text":"A standard 15×20 living room costs $350–$850 professionally and $100–$180 DIY for walls only with two coats."}},{"@type":"Question","name":"How much paint does a living room need?","acceptedAnswer":{"@type":"Answer","text":"A 15×20 living room needs about 3 gallons for two coats on the walls. Use the living room paint calculator for your exact dimensions."}},{"@type":"Question","name":"How long does it take to paint a living room?","acceptedAnswer":{"@type":"Answer","text":"A professional takes 4–6 hours for an average living room. A DIYer should allow a full day including prep, two coats, and drying time."}},{"@type":"Question","name":"Should I paint living room walls and ceiling the same colour?","acceptedAnswer":{"@type":"Answer","text":"Matching ceiling to walls creates a cocooning effect popular in formal living rooms. White or off-white ceilings are more common and make the room feel taller and brighter."}},{"@type":"Question","name":"How much does an accent wall cost to paint?","acceptedAnswer":{"@type":"Answer","text":"A living room accent wall costs $50–$150 professionally and $15–$30 in paint for DIY — making it one of the most affordable ways to transform a room."}},{"@type":"Question","name":"What is the most popular living room paint colour?","acceptedAnswer":{"@type":"Answer","text":"Warm neutrals dominate — SW Agreeable Gray, BM Revere Pewter, and BM Classic Gray are consistently top sellers. Warm greiges suit most living rooms and furniture combinations."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint a Living Room in 2026","description":"2026 cost guide for painting a living room — DIY vs professional estimates for all living room sizes.","url":"https://thepaintcalculator.com/cost-to-paint-living-room","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint a Living Room</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint a Living Room in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint a standard 15×20 living room ranges from <strong>$80 to $200 for DIY</strong> and <strong>$300 to $900 professionally</strong>. Open-plan living areas with high ceilings and large wall areas cost significantly more.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$300 to $900 professional / $80 to $200 DIY</p>
          <p className="text-sm opacity-90">For a standard 15×20 living room — walls, two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Living Room Painting Cost by Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Living Room Size</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small 12×15</td><td className="px-4 py-3 text-gray-700">$60–$120</td><td className="px-4 py-3 text-gray-700">$250–$550</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Standard 15×18</td><td className="px-4 py-3 text-gray-700">$90–$160</td><td className="px-4 py-3 text-gray-700">$300–$700</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Standard 15×20</td><td className="px-4 py-3 text-gray-700">$100–$180</td><td className="px-4 py-3 text-gray-700">$350–$850</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Large 18×24</td><td className="px-4 py-3 text-gray-700">$150–$250</td><td className="px-4 py-3 text-gray-700">$500–$1,200</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Open plan 20×30</td><td className="px-4 py-3 text-gray-700">$200–$380</td><td className="px-4 py-3 text-gray-700">$700–$1,800</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Additional Living Room Painting Costs</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Accent wall.</strong> Adding a feature or accent wall in a different colour typically adds $50–$150 professionally and $15–$30 in extra paint for DIY.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ceiling.</strong> Painting a 15×20 living room ceiling adds $100–$250 professionally and $25–$50 in extra ceiling paint for DIY.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Trim and baseboards.</strong> A living room with extensive trim and baseboards adds $100–$300 professionally. Semi-gloss trim paint for DIY adds $20–$40.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>High or vaulted ceilings.</strong> Rooms with 10ft+ or vaulted ceilings require ladders or scaffolding. Professional labour adds $100–$300 for the extra height.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Living Room Accent Wall Cost</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A single 15ft accent wall in a contrasting colour costs $50–$150 professionally and $15–$30 in paint for DIY. An accent wall is the most cost-effective way to add drama to a living room — one quart of paint is often enough for two coats on a standard accent wall.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Living Room? →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint a Bedroom →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-choose-paint-color-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Choose Paint Color for a Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a living room?</h3>
              <p className="text-gray-700">A standard 15×20 living room costs $350–$850 professionally and $100–$180 DIY for walls only with two coats.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint does a living room need?</h3>
              <p className="text-gray-700">A 15×20 living room needs about 3 gallons for two coats on the walls. Use the living room paint calculator for your exact dimensions.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a living room?</h3>
              <p className="text-gray-700">A professional takes 4–6 hours for an average living room. A DIYer should allow a full day including prep, two coats, and drying time.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint living room walls and ceiling the same colour?</h3>
              <p className="text-gray-700">Matching ceiling to walls creates a cocooning effect popular in formal living rooms. White or off-white ceilings are more common and make the room feel taller and brighter.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does an accent wall cost to paint?</h3>
              <p className="text-gray-700">A living room accent wall costs $50–$150 professionally and $15–$30 in paint for DIY — making it one of the most affordable ways to transform a room.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the most popular living room paint colour?</h3>
              <p className="text-gray-700">Warm neutrals dominate — SW Agreeable Gray, BM Revere Pewter, and BM Classic Gray are consistently top sellers. Warm greiges suit most living rooms and furniture combinations.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
