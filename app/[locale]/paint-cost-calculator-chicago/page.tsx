import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
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
      paintPrice: 57,
      primerPrice: 25, calculateLabor: true,
      laborRate: 63,
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
      ? 'https://thepaintcalculator.com/paint-cost-calculator-chicago'
      : `https://thepaintcalculator.com/${locale}/paint-cost-calculator-chicago`;
  return {
    title: 'Paint Cost Calculator Chicago IL — How Much Does Painting Cost in Chicago? | ThePaintCalculator.com',
    description: 'Free paint cost calculator for Chicago IL. Local Chicago painter rates ($48–$78/hr) with union vs non-union cost comparison. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Cost Calculator Chicago, IL',
      description: 'Free paint cost calculator for Chicago IL. Local Chicago painter rates ($48–$78/hr) with union vs non-union cost comparison. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCostCalculatorChicago({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Illinois","item":"https://thepaintcalculator.com/paint-calculator-illinois"},{"@type":"ListItem","position":3,"name":"Paint Calculator Chicago","item":"https://thepaintcalculator.com/paint-calculator-chicago-il"},{"@type":"ListItem","position":4,"name":"Paint Cost Calculator Chicago, IL","item":"https://thepaintcalculator.com/paint-cost-calculator-chicago"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much do painters charge in Chicago, IL?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Chicago charge $48–$78/hr per hour. An average room costs $290–$490 professionally including paint and labour."}},{"@type":"Question","name":"How much does it cost to paint a house in Chicago?","acceptedAnswer":{"@type":"Answer","text":"A whole-house interior paint job in Chicago costs $4,640–$7,740 professionally. Exterior painting costs $2,704–$4,544 for an average 2,000 sq ft home."}},{"@type":"Question","name":"How much does it cost to paint a room yourself in Chicago?","acceptedAnswer":{"@type":"Answer","text":"DIY painting a standard 12×14 room in Chicago costs $103–$210 in paint and supplies — saving 60–70% vs professional painting."}},{"@type":"Question","name":"Is it worth hiring a painter in Chicago?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Chicago work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. At $48–$78/hr/hr, hiring is worth it for large spaces, complex prep, or when your time has high value."}},{"@type":"Question","name":"How much does exterior painting cost in Chicago?","acceptedAnswer":{"@type":"Answer","text":"Exterior painting a 2,000 sq ft home in Chicago costs $2,704–$4,544 professionally. DIY costs $705–$1514 in paint and supplies."}},{"@type":"Question","name":"How much does cabinet painting cost in Chicago?","acceptedAnswer":{"@type":"Answer","text":"Kitchen cabinet painting in Chicago costs $1160–$1960 professionally. DIY costs $133–$267 in paint, primer, and prep materials."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Paint Cost Calculator Chicago, IL","description":"Free paint cost calculator for Chicago IL. Local Chicago painter rates ($48–$78/hr) with union vs non-union cost comparison. No signup.","url":"https://thepaintcalculator.com/paint-cost-calculator-chicago","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li><Link href={`/${locale}/paint-calculator-illinois`} className="hover:text-blue-600 transition-colors">Illinois</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href={`/${locale}/paint-calculator-chicago-il`} className="hover:text-blue-600 transition-colors">Chicago</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Paint Cost Calculator Chicago, IL</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Cost Calculator Chicago, IL
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Professional painters in Chicago charge <strong>$48–$78 per hour</strong> for residential work. Union painters working on commercial or large residential projects can reach <strong>$90–$110 per hour</strong>. An average Chicago room costs <strong>$290–$500 professionally</strong>. Paint costs <strong>$35–$78 per gallon</strong> from Chicago area stores.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$48–$78/hr labor · $35–$78/gal paint</p>
          <p className="text-sm opacity-90">Union painters in Chicago can reach $90–$110/hr for commercial work</p>
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
            Paint Costs in Chicago, IL — Full Breakdown
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `Professional painters in Chicago, IL charge <strong>$48–$78/hr per hour</strong>. Paint costs <strong>$35–$78/gal per gallon</strong> at local Chicago stores. Use the cost calculator above — pre-filled with Chicago local rates — for an accurate total project estimate including labour, paint, and materials.` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Project</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Chicago)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Chicago)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Single room (12×14)</td><td className="px-4 py-3 text-gray-700">$103–$210</td><td className="px-4 py-3 text-gray-700">$290–$490</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Whole house interior</td><td className="px-4 py-3 text-gray-700">$1000–$2060</td><td className="px-4 py-3 text-gray-700">$4,640–$7,740</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Exterior (2,000 sq ft)</td><td className="px-4 py-3 text-gray-700">$705–$1514</td><td className="px-4 py-3 text-gray-700">$2,704–$4,544</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Kitchen cabinets</td><td className="px-4 py-3 text-gray-700">$133–$267</td><td className="px-4 py-3 text-gray-700">$1160–$1960</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Front door</td><td className="px-4 py-3 text-gray-700">$20–$50</td><td className="px-4 py-3 text-gray-700">$156–$276</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Save on Painting Costs in Chicago, IL</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Get three quotes.</strong> Painter prices in Chicago vary significantly. Always get at least three quotes — prices often differ by 30–50% for identical work.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do your own prep.</strong> Moving furniture and filling nail holes yourself before the painter arrives can reduce professional quotes by $100–$300.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy during sales.</strong> Sherwin-Williams and Benjamin Moore run 30–40% off sales several times per year. Stock up on frequently used colours during sales.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-illinois`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Illinois →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-chicago-il`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Chicago IL →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much do painters charge in Chicago, IL?</h3>
              <p className="text-gray-700">Professional painters in Chicago charge $48–$78/hr per hour. An average room costs $290–$490 professionally including paint and labour.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a house in Chicago?</h3>
              <p className="text-gray-700">A whole-house interior paint job in Chicago costs $4,640–$7,740 professionally. Exterior painting costs $2,704–$4,544 for an average 2,000 sq ft home.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room yourself in Chicago?</h3>
              <p className="text-gray-700">DIY painting a standard 12×14 room in Chicago costs $103–$210 in paint and supplies — saving 60–70% vs professional painting.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it worth hiring a painter in Chicago?</h3>
              <p className="text-gray-700">Professional painters in Chicago work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. At $48–$78/hr/hr, hiring is worth it for large spaces, complex prep, or when your time has high value.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior painting cost in Chicago?</h3>
              <p className="text-gray-700">Exterior painting a 2,000 sq ft home in Chicago costs $2,704–$4,544 professionally. DIY costs $705–$1514 in paint and supplies.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does cabinet painting cost in Chicago?</h3>
              <p className="text-gray-700">Kitchen cabinet painting in Chicago costs $1160–$1960 professionally. DIY costs $133–$267 in paint, primer, and prep materials.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
