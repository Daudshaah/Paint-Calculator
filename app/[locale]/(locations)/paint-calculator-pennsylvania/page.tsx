import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

function getStateParam(): string {
  const state = {
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex', finish: 'eggshell',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 400, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 50,
      primerPrice: 25, calculateLabor: false,
      laborRate: 53,
      includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_state_prefill',
      measurements: {
        name: 'Room', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_state_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_state_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
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
      ? 'https://thepaintcalculator.com/paint-calculator-pennsylvania'
      : `https://thepaintcalculator.com/${locale}/paint-calculator-pennsylvania`;
  return {
    title: 'Paint Calculator Pennsylvania — How Much Paint Do You Need? | ThePaintCalculator.com',
    description: 'Free paint calculator for Pennsylvania homeowners. Instant estimates for any room or whole house. Includes local Pennsylvania painter costs, climate tips, and paint recommendations. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Calculator Pennsylvania — Free Paint Estimator',
      description: 'Free paint calculator for Pennsylvania homeowners. Get instant estimates with local Pennsylvania cost data.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCalculatorPennsylvania({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const stateParam = getStateParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Pennsylvania","item":"https://thepaintcalculator.com/paint-calculator-pennsylvania"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint do I need for an average Pennsylvania home?","acceptedAnswer":{"@type":"Answer","text":"An average Pennsylvania home of around 1900 sq ft needs 15–20 gallons for a full interior repaint (walls, ceilings, trim). Use the calculator above for a precise estimate based on your actual room dimensions."}},{"@type":"Question","name":"How much does it cost to paint a room in Pennsylvania?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Pennsylvania charge $40–$65 per hour. An average room costs $220–$620 professionally. DIY painting costs $60–$150 in paint and supplies."}},{"@type":"Question","name":"What type of exterior paint works best in Pennsylvania?","acceptedAnswer":{"@type":"Answer","text":"For Pennsylvania's humid continental climate, use a 100% acrylic exterior latex paint. Pennsylvania has many historic properties — Philadelphia and Pittsburgh both have significant stocks of pre-1978 housing that may contain lead paint. Always test before disturbing old painted surfaces."}},{"@type":"Question","name":"How much does exterior house painting cost in Pennsylvania?","acceptedAnswer":{"@type":"Answer","text":"Exterior painting for an average Pennsylvania home costs $2090–$4560 professionally. DIY exterior painting costs $400–$1,200 in paint and supplies depending on home size."}},{"@type":"Question","name":"How many gallons of paint for a room in Pennsylvania?","acceptedAnswer":{"@type":"Answer","text":"A standard 12×14 room in Pennsylvania needs about 2 gallons for two coats on the walls. Use the Pennsylvania paint calculator above and enter your exact dimensions for a precise estimate."}},{"@type":"Question","name":"When is the best time to paint the exterior of a house in Pennsylvania?","acceptedAnswer":{"@type":"Answer","text":"In Pennsylvania's humid continental climate, the best time for exterior painting is when temperatures are between 50°F and 85°F with low humidity and no rain forecast. Spring and fall are typically ideal in most parts of Pennsylvania."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Paint Calculator Pennsylvania — How Much Paint Do You Need?","description":"Free paint calculator for Pennsylvania homeowners. Get accurate paint estimates for any room or whole house with local Pennsylvania cost data and climate-specific tips.","url":"https://thepaintcalculator.com/paint-calculator-pennsylvania","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Paint Calculator Pennsylvania</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Calculator Pennsylvania
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Free paint calculator for <strong>Pennsylvania homeowners</strong>. Get an exact paint estimate for any room or whole house — pre-filled for a standard 12×14 room. Includes local Pennsylvania painter costs and climate-specific recommendations. No signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer — Pennsylvania</p>
          <p className="text-2xl font-bold mb-1">2 gallons for a standard room</p>
          <p className="text-sm opacity-90">Professional painters in Pennsylvania charge $40–$65/hr · Paint costs $30–$70/gal</p>
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
                    url.searchParams.set('p', '${stateParam}');
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
            How Much Paint Do You Need in Pennsylvania?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The amount of paint needed is the same regardless of state — a standard 12×14 room needs about 2 gallons for two coats on the walls. What varies by state is paint cost, labor rates, and the type of exterior paint best suited to the local climate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In Pennsylvania, paint costs range from <strong>$30–$70/gal per gallon</strong> depending on brand and quality. Professional painter labor rates in Pennsylvania run <strong>$40–$65/hr</strong>. Use the calculator above — pre-filled for a standard 12×14 room — and adjust for your exact dimensions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Paint Calculator — Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Room Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint Needed (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">DIY Cost (PA)</th>
                  <th className="px-4 py-3 text-left font-semibold">Pro Cost (PA)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10×10</td>
                  <td className="px-4 py-3 text-gray-700">1.3 gal</td>
                  <td className="px-4 py-3 text-gray-700">$69–$151</td>
                  <td className="px-4 py-3 text-gray-700">$160–$275</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">12×14</td>
                  <td className="px-4 py-3 text-gray-700">1.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">$94–$196</td>
                  <td className="px-4 py-3 text-gray-700">$250–$425</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">15×20</td>
                  <td className="px-4 py-3 text-gray-700">2.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">$137–$283</td>
                  <td className="px-4 py-3 text-gray-700">$340–$575</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Whole house (~1900 sq ft)</td>
                  <td className="px-4 py-3 text-gray-700">18–22 gal</td>
                  <td className="px-4 py-3 text-gray-700">$800–$1800</td>
                  <td className="px-4 py-3 text-gray-700">$2,090–$4,560</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Painter Labor Costs in Pennsylvania
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional painters in Pennsylvania charge <strong>$40–$65/hr per hour</strong>. For a standard 12×14 bedroom, expect to pay $250–$425 professionally including paint and labour. For whole-house interior painting, budget $2,090–$4,560 for an average Pennsylvania home.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DIY painting saves 60–70% compared to hiring professionals. In Pennsylvania, a typical room costs $94–$196 in paint and supplies for a standard 12×14 room. Use the paint cost calculator to estimate your full project cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Exterior Paint for Pennsylvania's Climate
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pennsylvania has a <strong>humid continental climate</strong>. Pennsylvania has many historic properties — Philadelphia and Pittsburgh both have significant stocks of pre-1978 housing that may contain lead paint. Always test before disturbing old painted surfaces.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For interior painting, the same rules apply regardless of state — eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for ceilings, and semi-gloss for all trim and doors.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting in Pennsylvania
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Get multiple quotes.</strong> Painter prices in Pennsylvania vary significantly. Get at least three quotes for any professional job — prices often differ by 30–50% for identical work.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Buy paint locally.</strong> Pennsylvania has Sherwin-Williams, Benjamin Moore, and Home Depot stores throughout the state. Buying locally ensures the correct formulation for Pennsylvania's climate and allows colour matching at the store.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Check the weather.</strong> For exterior painting in Pennsylvania, check the forecast for 48 hours before and after application. Temperatures should be between 50°F and 85°F with no rain expected.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Use the paint calculator.</strong> Adjust the calculator above for your exact room dimensions to avoid buying too much or running short mid-project. Always round up to the next whole gallon.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/best-exterior-paint-for-houses`} className="text-blue-600 hover:text-blue-700 font-medium">Best Exterior Paint for Houses →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for an average Pennsylvania home?</h3>
              <p className="text-gray-700">An average Pennsylvania home of around 1900 sq ft needs 15–20 gallons for a full interior repaint. Use the calculator above for a precise estimate based on your actual room dimensions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room in Pennsylvania?</h3>
              <p className="text-gray-700">Professional painters in Pennsylvania charge $40–$65/hr. An average room costs $250–$425 professionally. DIY painting costs $60–$150 in paint and supplies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of exterior paint works best in Pennsylvania?</h3>
              <p className="text-gray-700">For Pennsylvania's humid continental climate, use a 100% acrylic exterior latex. Pennsylvania has many historic properties — Philadelphia and Pittsburgh both have significant stocks of pre-1978 housing that may contain lead paint. Always test before disturbing old painted surfaces.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior house painting cost in Pennsylvania?</h3>
              <p className="text-gray-700">Exterior painting for an average Pennsylvania home costs $2,090–$4,560 professionally. DIY costs $400–$1,200 in paint and supplies depending on home size.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a room in Pennsylvania?</h3>
              <p className="text-gray-700">A standard 12×14 room needs about 2 gallons for two coats on the walls. Enter your exact dimensions in the Pennsylvania paint calculator above for a precise estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint the exterior in Pennsylvania?</h3>
              <p className="text-gray-700">In Pennsylvania's humid continental climate, paint exterior surfaces when temperatures are between 50°F and 85°F with low humidity and no rain forecast. Spring and fall are typically ideal in most parts of Pennsylvania.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
