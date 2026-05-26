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
      ? 'https://thepaintcalculator.com/cost-to-paint-kitchen-cabinets'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-kitchen-cabinets`;
  return {
    title: 'Cost to Paint Kitchen Cabinets in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint kitchen cabinets in 2026. Professional and DIY cost estimates, what affects price, and money-saving tips.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint Kitchen Cabinets in 2026',
      description: 'Find out exactly how much it costs to paint kitchen cabinets in 2026. Professional and DIY cost estimates, what affects price, and money-saving tips.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintKitchenCabinets({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint Kitchen Cabinets","item":"https://thepaintcalculator.com/cost-to-paint-kitchen-cabinets"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Professional cabinet painting costs $900–$3,800 for an average kitchen. DIY costs $200–$600 in materials. The cost per door is typically $60–$120 professionally."}},{"@type":"Question","name":"Is it worth painting kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Yes — cabinet painting delivers one of the highest ROIs of any home improvement. It costs 10–20% of new cabinets while achieving 70–80% of the visual impact."}},{"@type":"Question","name":"How long does it take to paint kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"A professional takes 2–3 days for an average kitchen. DIY typically takes a full weekend plus additional drying time between coats."}},{"@type":"Question","name":"How long do painted kitchen cabinets last?","acceptedAnswer":{"@type":"Answer","text":"Professionally painted cabinets using quality enamel last 7–10 years with normal use. DIY results vary based on prep quality and paint choice."}},{"@type":"Question","name":"Should I paint or replace kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"If the cabinet boxes are in good structural condition, painting is almost always the right choice — significantly cheaper with excellent results."}},{"@type":"Question","name":"What colour is most popular for kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"White and off-white remain the most popular cabinet colours, followed by navy blue, sage green, and warm grey. Two-tone kitchens (white uppers, colour lowers) are increasingly popular."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint Kitchen Cabinets in 2026","description":"2026 cost guide for kitchen cabinet painting — professional vs DIY, cost per door, and full project estimates.","url":"https://thepaintcalculator.com/cost-to-paint-kitchen-cabinets","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint Kitchen Cabinets</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint Kitchen Cabinets in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint kitchen cabinets ranges from <strong>$200 to $600 for DIY</strong> and <strong>$900 to $3,800 for a professional</strong>. Cabinet painting is one of the highest-ROI home improvements — a fraction of the cost of new cabinets with a similarly dramatic result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$900 to $3,800 professional / $200 to $600 DIY</p>
          <p className="text-sm opacity-90">For an average kitchen with 20–30 cabinet doors</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Cabinet Painting Cost by Kitchen Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Kitchen Size</th>
                <th className="px-4 py-3 text-left font-semibold">Doors</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small kitchen</td><td className="px-4 py-3 text-gray-700">10–15 doors</td><td className="px-4 py-3 text-gray-700">$150–$300</td><td className="px-4 py-3 text-gray-700">$600–$1,500</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Medium kitchen</td><td className="px-4 py-3 text-gray-700">20–25 doors</td><td className="px-4 py-3 text-gray-700">$250–$450</td><td className="px-4 py-3 text-gray-700">$1,200–$2,500</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Large kitchen</td><td className="px-4 py-3 text-gray-700">30–40 doors</td><td className="px-4 py-3 text-gray-700">$400–$700</td><td className="px-4 py-3 text-gray-700">$2,000–$3,800</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Per door (professional)</td><td className="px-4 py-3 text-gray-700">—</td><td className="px-4 py-3 text-gray-700">—</td><td className="px-4 py-3 text-gray-700">$60–$120 per door</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Cabinet Painting vs New Cabinets — Cost Comparison</h2>
          <p className="text-gray-700 leading-relaxed mb-4">New kitchen cabinets cost $5,000–$25,000 installed depending on material and quality. Professional cabinet painting costs $900–$3,800. DIY cabinet painting costs $200–$600. Painting is the most cost-effective way to transform a kitchen — achieving 70–80% of the visual impact of new cabinets for 10–20% of the cost.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Cabinet refacing (replacing doors while keeping boxes) costs $4,000–$12,000 — still significantly more than painting for a similar visual result.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What is Included in a Professional Cabinet Painting Quote?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A complete professional cabinet painting job includes removing all doors and hardware, degreasing and sanding, applying primer, two topcoats on doors and box fronts, and reinstalling. Some painters spray doors off-site for a smoother finish — this typically costs more but produces a better result.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Always ask whether the quote includes hardware reinstallation and whether doors will be sprayed or brush/roller applied. Spray application typically adds 20–30% to cost but produces a significantly better finish.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">DIY Cabinet Painting Cost Breakdown</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Cabinet paint (1–2 gallons): $60–$180.</strong> Use Benjamin Moore Advance or Sherwin-Williams Emerald Urethane for the best results.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Cabinet primer (1 quart): $15–$25.</strong> Essential for adhesion, especially over previously painted or laminate surfaces.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Deglosser/TSP cleaner: $10–$20.</strong> Removes grease and prepares the surface for primer.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Sandpaper, foam rollers, brushes: $20–$50.</strong> Use 220-grit between coats for a smooth finish.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/cabinet-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Cabinet Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-kitchen-cabinets`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Kitchen Cabinets? →</Link></li>
            <li><Link href={`/${locale}/best-paint-for-kitchen-cabinets`} className="text-blue-600 hover:text-blue-700 font-medium">Best Paint for Kitchen Cabinets →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint kitchen cabinets?</h3>
              <p className="text-gray-700">Professional cabinet painting costs $900–$3,800 for an average kitchen. DIY costs $200–$600 in materials. The cost per door is typically $60–$120 professionally.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it worth painting kitchen cabinets?</h3>
              <p className="text-gray-700">Yes — cabinet painting delivers one of the highest ROIs of any home improvement. It costs 10–20% of new cabinets while achieving 70–80% of the visual impact.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint kitchen cabinets?</h3>
              <p className="text-gray-700">A professional takes 2–3 days for an average kitchen. DIY typically takes a full weekend plus additional drying time between coats.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long do painted kitchen cabinets last?</h3>
              <p className="text-gray-700">Professionally painted cabinets using quality enamel last 7–10 years with normal use. DIY results vary based on prep quality and paint choice.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint or replace kitchen cabinets?</h3>
              <p className="text-gray-700">If the cabinet boxes are in good structural condition, painting is almost always the right choice — significantly cheaper with excellent results.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What colour is most popular for kitchen cabinets?</h3>
              <p className="text-gray-700">White and off-white remain the most popular cabinet colours, followed by navy blue, sage green, and warm grey. Two-tone kitchens (white uppers, colour lowers) are increasingly popular.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
