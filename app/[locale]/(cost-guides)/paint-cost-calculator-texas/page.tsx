import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

function getPageParam(): string {
  const state = {
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex',
      finish: 'eggshell',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 400, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 47,
      primerPrice: 25, calculateLabor: true,
      laborRate: 47,
      includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_loc_prefill',
      measurements: {
        name: 'Room', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_loc_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_loc_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
      },
      surfaces: { walls: true, ceiling: false, trim: false, doors: false },
      extras: {
        accentWall: false, accentWallArea: '', wainscoting: false,
        wainscotingHeight: 36, crownMolding: false,
        builtIns: false, builtInsArea: '', fireplace: false, fireplaceArea: '',
      },
    }],
  };
  if (typeof window === 'undefined') {
    return Buffer.from(JSON.stringify(state)).toString('base64url');
  }
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
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
      ? 'https://thepaintcalculator.com/paint-cost-calculator-texas'
      : `https://thepaintcalculator.com/${locale}/paint-cost-calculator-texas`;
  return {
    title: 'Paint Cost Calculator Texas — How Much Does Painting Cost in Texas? | ThePaintCalculator.com',
    description: 'Free paint cost calculator for Texas. Local Texas painter rates for Houston, Dallas, Austin, San Antonio. Accurate DIY and professional cost estimates. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Cost Calculator Texas',
      description: 'Free paint cost calculator for Texas. Local Texas painter rates for Houston, Dallas, Austin, San Antonio. Accurate DIY and professional cost estimates. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCostCalculatorTexas({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Texas","item":"https://thepaintcalculator.com/paint-calculator-texas"},{"@type":"ListItem","position":3,"name":"Paint Cost Calculator Texas","item":"https://thepaintcalculator.com/paint-cost-calculator-texas"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much do painters charge in Texas?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Texas charge $35–$58/hr per hour. An average room costs $225–$390 professionally including paint and labour."}},{"@type":"Question","name":"How much does it cost to paint a house in Texas?","acceptedAnswer":{"@type":"Answer","text":"A whole-house interior paint job in Texas costs $3,600–$6,140 professionally. Exterior painting costs $2,080–$3,584 for an average 2,000 sq ft home."}},{"@type":"Question","name":"How much does it cost to paint a room yourself in Texas?","acceptedAnswer":{"@type":"Answer","text":"DIY painting a standard 12×14 room in Texas costs $90–$187 in paint and supplies — saving 60–70% vs professional painting."}},{"@type":"Question","name":"Is it worth hiring a painter in Texas?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Texas work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. At $35–$58/hr/hr, hiring is worth it for large spaces, complex prep, or when your time has high value."}},{"@type":"Question","name":"How much does exterior painting cost in Texas?","acceptedAnswer":{"@type":"Answer","text":"Exterior painting a 2,000 sq ft home in Texas costs $2,080–$3,584 professionally. DIY costs $614–$1345 in paint and supplies."}},{"@type":"Question","name":"How much does cabinet painting cost in Texas?","acceptedAnswer":{"@type":"Answer","text":"Kitchen cabinet painting in Texas costs $900–$1560 professionally. DIY costs $122–$248 in paint, primer, and prep materials."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Paint Cost Calculator Texas","description":"Free paint cost calculator for Texas. Local Texas painter rates for Houston, Dallas, Austin, San Antonio. Accurate DIY and professional cost estimates. No signup.","url":"https://thepaintcalculator.com/paint-cost-calculator-texas","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li><Link href={`/${locale}/paint-calculator-texas`} className="hover:text-blue-600 transition-colors">Texas</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Paint Cost Calculator Texas</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Cost Calculator Texas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Professional painters in Texas charge <strong>$35–$58 per hour</strong> on average — but rates vary significantly by city. Austin and Dallas command $40–$65/hr. Smaller Texas cities and rural areas run $28–$48/hr. Paint costs <strong>$28–$65 per gallon</strong> depending on brand and quality.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$35–$58/hr labor · $28–$65/gal paint</p>
          <p className="text-sm opacity-90">Texas painter rates vary by city — Austin and DFW are highest</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window === 'undefined') return;
                  var url = new URL(window.location.href);
                  if (!url.searchParams.get('p')) {
                    url.searchParams.set('p', '${pageParam}');
                    window.history.replaceState({}, '', url.toString());
                    window.location.reload();
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Paint Costs in Texas — Full Breakdown
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `Professional painters in Texas charge <strong>$35–$58/hr per hour</strong>. Paint costs <strong>$28–$65/gal per gallon</strong> at local Texas stores. Use the cost calculator above — pre-filled with Texas local rates — for an accurate total project estimate including labour, paint, and materials.` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Project</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Texas)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Texas)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Single room (12×14)</td><td className="px-4 py-3 text-gray-700">$90–$187</td><td className="px-4 py-3 text-gray-700">$225–$390</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Whole house interior</td><td className="px-4 py-3 text-gray-700">$860–$1800</td><td className="px-4 py-3 text-gray-700">$3,600–$6,140</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Exterior (2,000 sq ft)</td><td className="px-4 py-3 text-gray-700">$614–$1345</td><td className="px-4 py-3 text-gray-700">$2,080–$3,584</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Kitchen cabinets</td><td className="px-4 py-3 text-gray-700">$122–$248</td><td className="px-4 py-3 text-gray-700">$900–$1560</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Front door</td><td className="px-4 py-3 text-gray-700">$20–$50</td><td className="px-4 py-3 text-gray-700">$130–$236</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Save on Painting Costs in Texas</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Get three quotes.</strong> Painter prices in Texas vary significantly. Always get at least three quotes — prices often differ by 30–50% for identical work.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do your own prep.</strong> Moving furniture and filling nail holes yourself before the painter arrives can reduce professional quotes by $100–$300.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy during sales.</strong> Sherwin-Williams and Benjamin Moore run 30–40% off sales several times per year. Stock up on frequently used colours during sales.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-texas`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Texas →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much do painters charge in Texas?</h3>
              <p className="text-gray-700">Professional painters in Texas charge $35–$58/hr per hour. An average room costs $225–$390 professionally including paint and labour.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a house in Texas?</h3>
              <p className="text-gray-700">A whole-house interior paint job in Texas costs $3,600–$6,140 professionally. Exterior painting costs $2,080–$3,584 for an average 2,000 sq ft home.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room yourself in Texas?</h3>
              <p className="text-gray-700">DIY painting a standard 12×14 room in Texas costs $90–$187 in paint and supplies — saving 60–70% vs professional painting.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it worth hiring a painter in Texas?</h3>
              <p className="text-gray-700">Professional painters in Texas work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. At $35–$58/hr/hr, hiring is worth it for large spaces, complex prep, or when your time has high value.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior painting cost in Texas?</h3>
              <p className="text-gray-700">Exterior painting a 2,000 sq ft home in Texas costs $2,080–$3,584 professionally. DIY costs $614–$1345 in paint and supplies.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does cabinet painting cost in Texas?</h3>
              <p className="text-gray-700">Kitchen cabinet painting in Texas costs $900–$1560 professionally. DIY costs $122–$248 in paint, primer, and prep materials.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
