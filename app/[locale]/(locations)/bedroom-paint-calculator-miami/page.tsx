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
      paintPrice: 49,
      primerPrice: 25, calculateLabor: false,
      laborRate: 50,
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
      ? 'https://thepaintcalculator.com/bedroom-paint-calculator-miami'
      : `https://thepaintcalculator.com/${locale}/bedroom-paint-calculator-miami`;
  return {
    title: 'Bedroom Paint Calculator Miami FL — Local Rates & Paint Estimates | ThePaintCalculator.com',
    description: 'Free bedroom paint calculator for Miami, FL. Local Miami painter rates ($38–$62/hr), tropical climate tips, and accurate estimates. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Bedroom Paint Calculator Miami, FL',
      description: 'Free bedroom paint calculator for Miami, FL. Local Miami painter rates ($38–$62/hr), tropical climate tips, and accurate estimates. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function BedroomPaintCalculatorMiami({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Florida","item":"https://thepaintcalculator.com/paint-calculator-florida"},{"@type":"ListItem","position":3,"name":"Paint Calculator Miami","item":"https://thepaintcalculator.com/paint-calculator-miami-fl"},{"@type":"ListItem","position":4,"name":"Bedroom Paint Calculator Miami, FL","item":"https://thepaintcalculator.com/bedroom-paint-calculator-miami"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint for a bedroom in Miami, FL?","acceptedAnswer":{"@type":"Answer","text":"A standard 12×14 bedroom needs about 2 gallons for two coats on the walls. A master bedroom needs 2.5–3.5 gallons. Paint costs $30–$68/gal in Miami."}},{"@type":"Question","name":"How much does it cost to paint a bedroom in Miami?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Miami charge $38–$62/hr. A standard 12×14 bedroom costs $240–$410 professionally. DIY costs $94–$192."}},{"@type":"Question","name":"What is the best paint finish for a bedroom in Miami?","acceptedAnswer":{"@type":"Answer","text":"Miami's humidity and AC use create condensation on walls — especially exterior-facing walls. Use moisture-resistant interior paint throughout. Satin is more practical than eggshell in Miami's humid climate."}},{"@type":"Question","name":"How long does it take to paint a bedroom in Miami?","acceptedAnswer":{"@type":"Answer","text":"A professional takes 2–4 hours for a standard bedroom in Miami. A DIYer should allow a full day including prep, two coats, and drying time."}},{"@type":"Question","name":"How many gallons for a master bedroom in Miami?","acceptedAnswer":{"@type":"Answer","text":"A master bedroom (14×16 to 16×20 ft) needs 2.5–3.5 gallons for two coats. Use the calculator above with your exact dimensions for a precise estimate."}},{"@type":"Question","name":"When is the best time to paint interiors in Miami?","acceptedAnswer":{"@type":"Answer","text":"Interior painting in Miami is possible year-round. November through April (dry season). Avoid the June–November hurricane season for exterior projects."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Bedroom Paint Calculator Miami, FL","description":"Free bedroom paint calculator for Miami, FL. Local Miami painter rates ($38–$62/hr), tropical climate tips, and accurate estimates. No signup.","url":"https://thepaintcalculator.com/bedroom-paint-calculator-miami","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li><Link href={`/${locale}/paint-calculator-miami-fl`} className="hover:text-blue-600 transition-colors">Miami</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Bedroom Paint Calculator Miami, FL</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bedroom Paint Calculator Miami, FL
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard Miami bedroom needs <strong>2 gallons for two coats</strong> on the walls. Miami's tropical humidity makes <strong>satin the right finish for bedrooms</strong> — flat and eggshell absorb moisture and mark quickly. Professional painters in Miami charge <strong>$38–$62 per hour</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 2.5 gallons for a standard Miami bedroom</p>
          <p className="text-sm opacity-90">Miami painters charge $38–$62/hr · Use satin or semi-gloss for humidity resistance</p>
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
            How Much Paint for a Bedroom in Miami, FL?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `A bedroom in Miami, FL needs the same amount of paint as any other location — wall area determines paint quantity, not geography. A standard 12×14 bedroom needs about <strong>2 gallons for two coats</strong> on the walls. A master bedroom (14×16 or larger) needs 2.5 to 3.5 gallons. What varies locally is the cost of paint ($30–$68/gal in Miami) and labour ($38–$62/hr professionally).` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Bedroom Size</th>
                <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Miami)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Miami)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">10×10</td><td className="px-4 py-3 text-gray-700">1.3 gal</td><td className="px-4 py-3 text-gray-700">$69–$148</td><td className="px-4 py-3 text-gray-700">$154–$266</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">12×14 (standard)</td><td className="px-4 py-3 text-gray-700">1.8 gal</td><td className="px-4 py-3 text-gray-700">$94–$192</td><td className="px-4 py-3 text-gray-700">$240–$410</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">14×16 (large)</td><td className="px-4 py-3 text-gray-700">2.4 gal</td><td className="px-4 py-3 text-gray-700">$122–$243</td><td className="px-4 py-3 text-gray-700">$288–$482</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">16×20 (master)</td><td className="px-4 py-3 text-gray-700">3.4 gal</td><td className="px-4 py-3 text-gray-700">$172–$341</td><td className="px-4 py-3 text-gray-700">$384–$636</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bedroom Paint Tips for Miami, FL</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Best finish for Miami bedrooms.</strong> Miami's humidity and AC use create condensation on walls — especially exterior-facing walls. Use moisture-resistant interior paint throughout. Satin is more practical than eggshell in Miami's humid climate.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Climate note.</strong> Miami's tropical climate — year-round heat, intense UV, hurricane-season storms, and salt air — is the most demanding exterior paint environment in the US. For interiors this means ensuring good ventilation during painting and using moisture-resistant finishes in rooms facing the exterior.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-florida`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Florida →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-miami-fl`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Miami FL →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a bedroom in Miami, FL?</h3>
              <p className="text-gray-700">A standard 12×14 bedroom needs about 2 gallons for two coats on the walls. A master bedroom needs 2.5–3.5 gallons. Paint costs $30–$68/gal in Miami.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bedroom in Miami?</h3>
              <p className="text-gray-700">Professional painters in Miami charge $38–$62/hr. A standard 12×14 bedroom costs $240–$410 professionally. DIY costs $94–$192.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint finish for a bedroom in Miami?</h3>
              <p className="text-gray-700">Miami's humidity and AC use create condensation on walls — especially exterior-facing walls. Use moisture-resistant interior paint throughout. Satin is more practical than eggshell in Miami's humid climate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a bedroom in Miami?</h3>
              <p className="text-gray-700">A professional takes 2–4 hours for a standard bedroom in Miami. A DIYer should allow a full day including prep, two coats, and drying time.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a master bedroom in Miami?</h3>
              <p className="text-gray-700">A master bedroom (14×16 to 16×20 ft) needs 2.5–3.5 gallons for two coats. Use the calculator above with your exact dimensions for a precise estimate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint interiors in Miami?</h3>
              <p className="text-gray-700">Interior painting in Miami is possible year-round. November through April (dry season). Avoid the June–November hurricane season for exterior projects.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
