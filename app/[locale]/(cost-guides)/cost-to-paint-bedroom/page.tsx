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
      ? 'https://thepaintcalculator.com/cost-to-paint-bedroom'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-bedroom`;
  return {
    title: 'Cost to Paint a Bedroom in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a bedroom in 2026. DIY and professional cost estimates for all bedroom sizes.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint a Bedroom in 2026',
      description: 'Find out exactly how much it costs to paint a bedroom in 2026. DIY and professional cost estimates for all bedroom sizes.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintBedroom({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint a Bedroom","item":"https://thepaintcalculator.com/cost-to-paint-bedroom"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a bedroom?","acceptedAnswer":{"@type":"Answer","text":"A standard 12×14 bedroom costs $200–$600 professionally and $60–$120 DIY for walls only. Adding ceiling and trim increases both DIY and professional costs."}},{"@type":"Question","name":"How long does it take to paint a bedroom?","acceptedAnswer":{"@type":"Answer","text":"A professional takes 2–4 hours for a standard bedroom. A DIYer takes a full day including prep, two coats, and drying time between coats."}},{"@type":"Question","name":"Does the painter supply the paint?","acceptedAnswer":{"@type":"Answer","text":"It varies — some painters include paint in their quote, others charge labour only and you supply paint. Always clarify this before agreeing to a quote."}},{"@type":"Question","name":"How much does it cost to paint a master bedroom?","acceptedAnswer":{"@type":"Answer","text":"A master bedroom (16×20 or larger) costs $450–$1,000 professionally and $120–$200 DIY. Large rooms with tall ceilings or complex prep cost more."}},{"@type":"Question","name":"Is it cheaper to hire a painter or DIY?","acceptedAnswer":{"@type":"Answer","text":"DIY is consistently 60–70% cheaper than professional painting. The trade-off is your time — an average bedroom takes a full day for a careful DIYer."}},{"@type":"Question","name":"How much does it cost to paint a bedroom ceiling?","acceptedAnswer":{"@type":"Answer","text":"Adding ceiling painting to a bedroom job costs $75–$200 more professionally and $20–$40 more in paint for DIY."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint a Bedroom in 2026","description":"2026 cost guide for painting a bedroom — all sizes, DIY vs professional, and what affects the price.","url":"https://thepaintcalculator.com/cost-to-paint-bedroom","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint a Bedroom</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint a Bedroom in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint a standard 12×14 bedroom ranges from <strong>$60 to $120 DIY</strong> and <strong>$200 to $600 professionally</strong>. Master bedrooms and rooms requiring ceiling and trim painting cost more.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$200 to $600 professional / $60 to $120 DIY</p>
          <p className="text-sm opacity-90">For a standard 12×14 bedroom — walls, two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bedroom Painting Cost by Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Bedroom Size</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small 10×10</td><td className="px-4 py-3 text-gray-700">$40–$80</td><td className="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Standard 12×12</td><td className="px-4 py-3 text-gray-700">$55–$100</td><td className="px-4 py-3 text-gray-700">$200–$450</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Standard 12×14</td><td className="px-4 py-3 text-gray-700">$60–$120</td><td className="px-4 py-3 text-gray-700">$200–$600</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Large 14×16</td><td className="px-4 py-3 text-gray-700">$80–$150</td><td className="px-4 py-3 text-gray-700">$300–$700</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Master 16×20</td><td className="px-4 py-3 text-gray-700">$120–$200</td><td className="px-4 py-3 text-gray-700">$450–$1,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What is Included in a Bedroom Paint Quote?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A standard professional bedroom painting quote includes all labour, primer if needed, two coats of wall paint, masking, prep work (filling small holes, light sanding), and cleanup. It typically does not include the ceiling, trim, or doors unless specifically requested — always confirm what is included before signing.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Adding the ceiling to a bedroom paint job typically costs an extra $75–$200 professionally and $20–$40 in extra paint for DIY. Adding the trim and baseboards adds another $75–$200 professionally.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">DIY Bedroom Painting — Full Cost Breakdown</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Item</th>
                <th className="px-4 py-3 text-left font-semibold">Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Notes</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Wall paint (2 gal)</td><td className="px-4 py-3 text-gray-700">$50–$160</td><td className="px-4 py-3 text-gray-700">Budget to premium</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Roller + tray</td><td className="px-4 py-3 text-gray-700">$10–$25</td><td className="px-4 py-3 text-gray-700">Reusable</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Angled brush</td><td className="px-4 py-3 text-gray-700">$8–$18</td><td className="px-4 py-3 text-gray-700">Reusable</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Painter's tape</td><td className="px-4 py-3 text-gray-700">$6–$12</td><td className="px-4 py-3 text-gray-700">Per room</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Drop cloths</td><td className="px-4 py-3 text-gray-700">$8–$20</td><td className="px-4 py-3 text-gray-700">Reusable</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Spackle + sandpaper</td><td className="px-4 py-3 text-gray-700">$5–$15</td><td className="px-4 py-3 text-gray-700">Prep materials</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Save Money on Bedroom Painting</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint yourself.</strong> DIY saves $150–$500 compared to professional painting for a standard bedroom. The job takes one full day but requires no special skills.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Choose the right colour first time.</strong> Colour changes require extra coats and more paint. Spend time testing before committing — it saves money and effort.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Reuse tools.</strong> Rollers, brushes, and drop cloths can be reused for years. Clean them properly after each use and the first-time tool investment spreads across many projects.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint a Living Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bedroom?</h3>
              <p className="text-gray-700">A standard 12×14 bedroom costs $200–$600 professionally and $60–$120 DIY for walls only. Adding ceiling and trim increases both DIY and professional costs.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a bedroom?</h3>
              <p className="text-gray-700">A professional takes 2–4 hours for a standard bedroom. A DIYer takes a full day including prep, two coats, and drying time between coats.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does the painter supply the paint?</h3>
              <p className="text-gray-700">It varies — some painters include paint in their quote, others charge labour only and you supply paint. Always clarify this before agreeing to a quote.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a master bedroom?</h3>
              <p className="text-gray-700">A master bedroom (16×20 or larger) costs $450–$1,000 professionally and $120–$200 DIY. Large rooms with tall ceilings or complex prep cost more.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it cheaper to hire a painter or DIY?</h3>
              <p className="text-gray-700">DIY is consistently 60–70% cheaper than professional painting. The trade-off is your time — an average bedroom takes a full day for a careful DIYer.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bedroom ceiling?</h3>
              <p className="text-gray-700">Adding ceiling painting to a bedroom job costs $75–$200 more professionally and $20–$40 more in paint for DIY.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
