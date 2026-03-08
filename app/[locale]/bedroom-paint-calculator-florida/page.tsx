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
      paintPrice: 47,
      primerPrice: 25, calculateLabor: false,
      laborRate: 48,
      includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_loc_prefill',
      measurements: {
        name: 'Bedroom', mode: 'dimensions',
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
      ? 'https://thepaintcalculator.com/bedroom-paint-calculator-florida'
      : `https://thepaintcalculator.com/${locale}/bedroom-paint-calculator-florida`;
  return {
    title: 'Bedroom Paint Calculator Florida — How Much Paint for a Florida Bedroom? | ThePaintCalculator.com',
    description: 'Free bedroom paint calculator for Florida homeowners. Includes local FL painter rates, humidity tips, and accurate paint estimates. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Bedroom Paint Calculator Florida',
      description: 'Free bedroom paint calculator for Florida homeowners. Includes local FL painter rates, humidity tips, and accurate paint estimates. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function BedroomPaintCalculatorFlorida({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Florida","item":"https://thepaintcalculator.com/paint-calculator-florida"},{"@type":"ListItem","position":3,"name":"Bedroom Paint Calculator Florida","item":"https://thepaintcalculator.com/bedroom-paint-calculator-florida"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint for a bedroom in Florida?","acceptedAnswer":{"@type":"Answer","text":"A standard 12×14 bedroom needs about 2 gallons for two coats on the walls. A master bedroom needs 2.5–3.5 gallons. Paint costs $28–$66/gal in Florida."}},{"@type":"Question","name":"How much does it cost to paint a bedroom in Florida?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Florida charge $35–$60/hr. A standard 12×14 bedroom costs $225–$400 professionally. DIY costs $90–$189."}},{"@type":"Question","name":"What is the best paint finish for a bedroom in Florida?","acceptedAnswer":{"@type":"Answer","text":"Florida homes need moisture-resistant interior paint in all rooms — not just bathrooms. The year-round humidity means semi-gloss or satin is preferable to flat paint even in living areas."}},{"@type":"Question","name":"How long does it take to paint a bedroom in Florida?","acceptedAnswer":{"@type":"Answer","text":"A professional takes 2–4 hours for a standard bedroom in Florida. A DIYer should allow a full day including prep, two coats, and drying time."}},{"@type":"Question","name":"How many gallons for a master bedroom in Florida?","acceptedAnswer":{"@type":"Answer","text":"A master bedroom (14×16 to 16×20 ft) needs 2.5–3.5 gallons for two coats. Use the calculator above with your exact dimensions for a precise estimate."}},{"@type":"Question","name":"When is the best time to paint interiors in Florida?","acceptedAnswer":{"@type":"Answer","text":"Interior painting in Florida is possible year-round. November through April (dry season). The June–September rainy season limits exterior painting. Interior painting is year-round."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Bedroom Paint Calculator Florida","description":"Free bedroom paint calculator for Florida homeowners. Includes local FL painter rates, humidity tips, and accurate paint estimates. No signup.","url":"https://thepaintcalculator.com/bedroom-paint-calculator-florida","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li><Link href={`/${locale}/paint-calculator-florida`} className="hover:text-blue-600 transition-colors">Florida</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Bedroom Paint Calculator Florida</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bedroom Paint Calculator Florida
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard Florida bedroom needs <strong>2 gallons for two coats</strong> on the walls. Florida's year-round humidity means <strong>satin finish is often better than eggshell</strong> for bedrooms — more moisture-resistant and easier to keep clean. Professional painters in Florida charge <strong>$35–$60 per hour</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 2.5 gallons for a standard Florida bedroom</p>
          <p className="text-sm opacity-90">Florida humidity means satin is better than eggshell for bedrooms</p>
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
            How Much Paint for a Bedroom in Florida?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `A bedroom in Florida needs the same amount of paint as any other location — wall area determines paint quantity, not geography. A standard 12×14 bedroom needs about <strong>2 gallons for two coats</strong> on the walls. A master bedroom (14×16 or larger) needs 2.5 to 3.5 gallons. What varies locally is the cost of paint ($28–$66/gal in Florida) and labour ($35–$60/hr professionally).` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Bedroom Size</th>
                <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Florida)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Florida)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">10×10</td><td className="px-4 py-3 text-gray-700">1.3 gal</td><td className="px-4 py-3 text-gray-700">$66–$146</td><td className="px-4 py-3 text-gray-700">$145–$260</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">12×14 (standard)</td><td className="px-4 py-3 text-gray-700">1.8 gal</td><td className="px-4 py-3 text-gray-700">$90–$189</td><td className="px-4 py-3 text-gray-700">$225–$400</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">14×16 (large)</td><td className="px-4 py-3 text-gray-700">2.4 gal</td><td className="px-4 py-3 text-gray-700">$117–$238</td><td className="px-4 py-3 text-gray-700">$270–$470</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">16×20 (master)</td><td className="px-4 py-3 text-gray-700">3.4 gal</td><td className="px-4 py-3 text-gray-700">$165–$334</td><td className="px-4 py-3 text-gray-700">$360–$620</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bedroom Paint Tips for Florida</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Best finish for Florida bedrooms.</strong> Florida homes need moisture-resistant interior paint in all rooms — not just bathrooms. The year-round humidity means semi-gloss or satin is preferable to flat paint even in living areas.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Climate note.</strong> Florida's tropical climate is the most demanding for exterior paint in the US. For interiors this means ensuring good ventilation during painting and using moisture-resistant finishes in rooms facing the exterior.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-florida`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Florida →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a bedroom in Florida?</h3>
              <p className="text-gray-700">A standard 12×14 bedroom needs about 2 gallons for two coats on the walls. A master bedroom needs 2.5–3.5 gallons. Paint costs $28–$66/gal in Florida.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bedroom in Florida?</h3>
              <p className="text-gray-700">Professional painters in Florida charge $35–$60/hr. A standard 12×14 bedroom costs $225–$400 professionally. DIY costs $90–$189.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint finish for a bedroom in Florida?</h3>
              <p className="text-gray-700">Florida homes need moisture-resistant interior paint in all rooms — not just bathrooms. The year-round humidity means semi-gloss or satin is preferable to flat paint even in living areas.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a bedroom in Florida?</h3>
              <p className="text-gray-700">A professional takes 2–4 hours for a standard bedroom in Florida. A DIYer should allow a full day including prep, two coats, and drying time.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a master bedroom in Florida?</h3>
              <p className="text-gray-700">A master bedroom (14×16 to 16×20 ft) needs 2.5–3.5 gallons for two coats. Use the calculator above with your exact dimensions for a precise estimate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint interiors in Florida?</h3>
              <p className="text-gray-700">Interior painting in Florida is possible year-round. November through April (dry season). The June–September rainy season limits exterior painting. Interior painting is year-round.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
