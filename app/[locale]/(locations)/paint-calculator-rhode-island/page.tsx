import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
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
      paintPrice: 57,
      primerPrice: 25, calculateLabor: false,
      laborRate: 62,
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
      ? 'https://thepaintcalculator.com/paint-calculator-rhode-island'
      : `https://thepaintcalculator.com/${locale}/paint-calculator-rhode-island`;
  return {
    title: 'Paint Calculator Rhode Island — How Much Paint Do You Need? | ThePaintCalculator.com',
    description: 'Free paint calculator for Rhode Island homeowners. Instant estimates for any room or whole house. Includes local Rhode Island painter costs, climate tips, and paint recommendations. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Calculator Rhode Island — Free Paint Estimator',
      description: 'Free paint calculator for Rhode Island homeowners. Get instant estimates with local Rhode Island cost data.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCalculatorRhodeIsland({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const stateParam = getStateParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Rhode Island","item":"https://thepaintcalculator.com/paint-calculator-rhode-island"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint do I need for an average Rhode Island home?","acceptedAnswer":{"@type":"Answer","text":"An average Rhode Island home of around 1650 sq ft needs 15–20 gallons for a full interior repaint (walls, ceilings, trim). Use the calculator above for a precise estimate based on your actual room dimensions."}},{"@type":"Question","name":"How much does it cost to paint a room in Rhode Island?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Rhode Island charge $48–$75 per hour. An average room costs $200–$600 professionally. DIY painting costs $60–$150 in paint and supplies."}},{"@type":"Question","name":"What type of exterior paint works best in Rhode Island?","acceptedAnswer":{"@type":"Answer","text":"For Rhode Island's humid continental climate, use a 100% acrylic exterior latex paint. Rhode Island's coastal New England location means salt air, humidity, and freeze-thaw cycles all affect exterior paint longevity. Use premium flexible exterior coatings for best results."}},{"@type":"Question","name":"How much does exterior house painting cost in Rhode Island?","acceptedAnswer":{"@type":"Answer","text":"Exterior painting for an average Rhode Island home costs $1815–$3960 professionally. DIY exterior painting costs $400–$1,200 in paint and supplies depending on home size."}},{"@type":"Question","name":"How many gallons of paint for a room in Rhode Island?","acceptedAnswer":{"@type":"Answer","text":"A standard 12×14 room in Rhode Island needs about 2 gallons for two coats on the walls. Use the Rhode Island paint calculator above and enter your exact dimensions for a precise estimate."}},{"@type":"Question","name":"When is the best time to paint the exterior of a house in Rhode Island?","acceptedAnswer":{"@type":"Answer","text":"In Rhode Island's humid continental climate, the best time for exterior painting is when temperatures are between 50°F and 85°F with low humidity and no rain forecast. Spring and fall are typically ideal in most parts of Rhode Island."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Paint Calculator Rhode Island — How Much Paint Do You Need?","description":"Free paint calculator for Rhode Island homeowners. Get accurate paint estimates for any room or whole house with local Rhode Island cost data and climate-specific tips.","url":"https://thepaintcalculator.com/paint-calculator-rhode-island","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Paint Calculator Rhode Island</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Calculator Rhode Island
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Free paint calculator for <strong>Rhode Island homeowners</strong>. Get an exact paint estimate for any room or whole house — pre-filled for a standard 12×14 room. Includes local Rhode Island painter costs and climate-specific recommendations. No signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer — Rhode Island</p>
          <p className="text-2xl font-bold mb-1">2 gallons for a standard room</p>
          <p className="text-sm opacity-90">Professional painters in Rhode Island charge $48–$75/hr · Paint costs $36–$78/gal</p>
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
            How Much Paint Do You Need in Rhode Island?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The amount of paint needed is the same regardless of state — a standard 12×14 room needs about 2 gallons for two coats on the walls. What varies by state is paint cost, labor rates, and the type of exterior paint best suited to the local climate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In Rhode Island, paint costs range from <strong>$36–$78/gal per gallon</strong> depending on brand and quality. Professional painter labor rates in Rhode Island run <strong>$48–$75/hr</strong>. Use the calculator above — pre-filled for a standard 12×14 room — and adjust for your exact dimensions.
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
                  <th className="px-4 py-3 text-left font-semibold">DIY Cost (RI)</th>
                  <th className="px-4 py-3 text-left font-semibold">Pro Cost (RI)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10×10</td>
                  <td className="px-4 py-3 text-gray-700">1.3 gal</td>
                  <td className="px-4 py-3 text-gray-700">$77–$161</td>
                  <td className="px-4 py-3 text-gray-700">$184–$305</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">12×14</td>
                  <td className="px-4 py-3 text-gray-700">1.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">$105–$210</td>
                  <td className="px-4 py-3 text-gray-700">$290–$475</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">15×20</td>
                  <td className="px-4 py-3 text-gray-700">2.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">$154–$306</td>
                  <td className="px-4 py-3 text-gray-700">$396–$645</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Whole house (~1650 sq ft)</td>
                  <td className="px-4 py-3 text-gray-700">18–22 gal</td>
                  <td className="px-4 py-3 text-gray-700">$920–$1960</td>
                  <td className="px-4 py-3 text-gray-700">$1,815–$3,960</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Painter Labor Costs in Rhode Island
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional painters in Rhode Island charge <strong>$48–$75/hr per hour</strong>. For a standard 12×14 bedroom, expect to pay $290–$475 professionally including paint and labour. For whole-house interior painting, budget $1,815–$3,960 for an average Rhode Island home.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DIY painting saves 60–70% compared to hiring professionals. In Rhode Island, a typical room costs $105–$210 in paint and supplies for a standard 12×14 room. Use the paint cost calculator to estimate your full project cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Exterior Paint for Rhode Island's Climate
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Rhode Island has a <strong>humid continental climate</strong>. Rhode Island's coastal New England location means salt air, humidity, and freeze-thaw cycles all affect exterior paint longevity. Use premium flexible exterior coatings for best results.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For interior painting, the same rules apply regardless of state — eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for ceilings, and semi-gloss for all trim and doors.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting in Rhode Island
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Get multiple quotes.</strong> Painter prices in Rhode Island vary significantly. Get at least three quotes for any professional job — prices often differ by 30–50% for identical work.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Buy paint locally.</strong> Rhode Island has Sherwin-Williams, Benjamin Moore, and Home Depot stores throughout the state. Buying locally ensures the correct formulation for Rhode Island's climate and allows colour matching at the store.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Check the weather.</strong> For exterior painting in Rhode Island, check the forecast for 48 hours before and after application. Temperatures should be between 50°F and 85°F with no rain expected.
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for an average Rhode Island home?</h3>
              <p className="text-gray-700">An average Rhode Island home of around 1650 sq ft needs 15–20 gallons for a full interior repaint. Use the calculator above for a precise estimate based on your actual room dimensions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room in Rhode Island?</h3>
              <p className="text-gray-700">Professional painters in Rhode Island charge $48–$75/hr. An average room costs $290–$475 professionally. DIY painting costs $60–$150 in paint and supplies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of exterior paint works best in Rhode Island?</h3>
              <p className="text-gray-700">For Rhode Island's humid continental climate, use a 100% acrylic exterior latex. Rhode Island's coastal New England location means salt air, humidity, and freeze-thaw cycles all affect exterior paint longevity. Use premium flexible exterior coatings for best results.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior house painting cost in Rhode Island?</h3>
              <p className="text-gray-700">Exterior painting for an average Rhode Island home costs $1,815–$3,960 professionally. DIY costs $400–$1,200 in paint and supplies depending on home size.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a room in Rhode Island?</h3>
              <p className="text-gray-700">A standard 12×14 room needs about 2 gallons for two coats on the walls. Enter your exact dimensions in the Rhode Island paint calculator above for a precise estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint the exterior in Rhode Island?</h3>
              <p className="text-gray-700">In Rhode Island's humid continental climate, paint exterior surfaces when temperatures are between 50°F and 85°F with low humidity and no rain forecast. Spring and fall are typically ideal in most parts of Rhode Island.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
