import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

function getCityParam(): string {
  const state = {
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex', finish: 'eggshell',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 400, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 52,
      primerPrice: 25, calculateLabor: false,
      laborRate: 55,
      includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_city_prefill',
      measurements: {
        name: 'Room', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_city_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_city_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
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
      ? 'https://thepaintcalculator.com/paint-calculator-baltimore-md'
      : `https://thepaintcalculator.com/${locale}/paint-calculator-baltimore-md`;
  return {
    title: 'Paint Calculator Baltimore MD — Local Costs & Free Estimator | ThePaintCalculator.com',
    description: 'Free paint calculator for Baltimore, MD. Get instant paint estimates with local Baltimore painter rates ($42–$68/hr), climate tips, and room-by-room calculations. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Calculator Baltimore MD — Local Paint Cost Estimator',
      description: 'Free paint calculator with local Baltimore painter rates and climate-specific recommendations.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCalculatorBaltimoreMD({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const cityParam = getCityParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Maryland","item":"https://thepaintcalculator.com/paint-calculator-maryland"},{"@type":"ListItem","position":3,"name":"Paint Calculator Baltimore MD","item":"https://thepaintcalculator.com/paint-calculator-baltimore-md"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a room in Baltimore?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Baltimore charge $42–$68/hr. An average room costs $270–$450 professionally including paint and labour. DIY painting costs $60–$150 in paint and supplies."}},{"@type":"Question","name":"How much paint do I need for a room in Baltimore?","acceptedAnswer":{"@type":"Answer","text":"A standard 12×14 room needs about 2 gallons for two coats on the walls regardless of location. Use the Baltimore paint calculator above and enter your exact dimensions for a precise estimate."}},{"@type":"Question","name":"How much does exterior painting cost in Baltimore?","acceptedAnswer":{"@type":"Answer","text":"Exterior painting for an average Baltimore home costs $1,870–$4,080 professionally. DIY exterior painting costs $400–$1,200 depending on home size."}},{"@type":"Question","name":"What is the best exterior paint for Baltimore's climate?","acceptedAnswer":{"@type":"Answer","text":"For Baltimore's humid subtropical climate, use a 100% acrylic exterior latex. Baltimore's signature painted brick row homes require masonry-specific exterior primers. The Chesapeake Bay proximity creates high humidity and salt air exposure — use moisture and salt-resistant exterior coatings. Baltimore has a large stock of pre-1978 homes with lead paint requiring proper handling."}},{"@type":"Question","name":"When is the best time to paint a house in Baltimore?","acceptedAnswer":{"@type":"Answer","text":"April through October. Baltimore summers are hot and humid but manageable for early morning exterior work."}},{"@type":"Question","name":"How do I find a good painter in Baltimore?","acceptedAnswer":{"@type":"Answer","text":"Get at least three quotes from licensed and insured painters in Baltimore. Check Google reviews, ask for references, and verify they carry liability insurance. Baltimore painters typically book 2–4 weeks in advance for exterior projects."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Paint Calculator Baltimore MD — Local Paint Costs & Estimates","description":"Free paint calculator for Baltimore homeowners with local Baltimore painter rates, climate-specific tips, and accurate paint estimates for any room or whole house.","url":"https://thepaintcalculator.com/paint-calculator-baltimore-md","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li><Link href={`/${locale}/paint-calculator-maryland`} className="hover:text-blue-600 transition-colors">Paint Calculator Maryland</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Paint Calculator Baltimore</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Calculator Baltimore, MD
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Free paint calculator for <strong>Baltimore homeowners</strong>. Pre-filled for a standard 12×14 room with local Baltimore paint prices and labor rates. Adjust dimensions for your exact room. No signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Baltimore, MD — Local Rates</p>
          <p className="text-2xl font-bold mb-1">$42–$68/hr painter labor · $32–$72/gal paint</p>
          <p className="text-sm opacity-90">Average room costs $270–$450 professionally in Baltimore</p>
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
                    url.searchParams.set('p', '${cityParam}');
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
            Painter Costs in Baltimore, MD
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional painters in Baltimore charge <strong>$42–$68/hr per hour</strong>. Paint costs <strong>$32–$72/gal per gallon</strong> from local Baltimore paint stores and home improvement retailers. An average 12×14 room costs <strong>$270–$450 professionally</strong> including labour and paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DIY painting a standard room in Baltimore costs $98–$200 in paint and supplies — saving 60–70% vs hiring a professional. Use the calculator above to estimate your exact project cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Baltimore Paint Cost Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Project</th>
                  <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                  <th className="px-4 py-3 text-left font-semibold">Professional Cost in Baltimore</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">Single room (12×14)</td>
                  <td className="px-4 py-3 text-gray-700">$98–$200</td>
                  <td className="px-4 py-3 text-gray-700">$270–$450</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">Whole house interior</td>
                  <td className="px-4 py-3 text-gray-700">$940–$1940</td>
                  <td className="px-4 py-3 text-gray-700">$1,870–$4,080</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">Exterior (average home)</td>
                  <td className="px-4 py-3 text-gray-700">$584–$1264</td>
                  <td className="px-4 py-3 text-gray-700">$1,590–$4,488</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Kitchen cabinets</td>
                  <td className="px-4 py-3 text-gray-700">$128–$258</td>
                  <td className="px-4 py-3 text-gray-700">$1040–$1760</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Painting in Baltimore's Climate
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Baltimore's signature painted brick row homes require masonry-specific exterior primers. The Chesapeake Bay proximity creates high humidity and salt air exposure — use moisture and salt-resistant exterior coatings. Baltimore has a large stock of pre-1978 homes with lead paint requiring proper handling.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Best time to paint in Baltimore:</strong> April through October. Baltimore summers are hot and humid but manageable for early morning exterior work.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Baltimore Neighborhoods & Painting Tips
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            High-demand painting areas include Federal Hill, Canton, Fells Point, Roland Park, Towson, and Columbia. Baltimore's row home renovation market is one of the most active in the Mid-Atlantic region.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How to Find a Painter in Baltimore
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Get multiple quotes.</strong> Baltimore painter prices vary significantly — get at least three quotes for any professional job. Prices often differ by 30–50% for identical work.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Verify insurance.</strong> Always confirm your painter carries liability insurance and workers' compensation before work begins. Ask to see the certificate of insurance directly.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Check reviews.</strong> Google and Yelp reviews are reliable indicators of quality. Look for painters with 20+ reviews and a consistent track record.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Use the calculator first.</strong> Know your paint quantities before meeting contractors — it helps you evaluate quotes and prevents overpaying for materials.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-calculator-maryland`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Maryland →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-exterior-house`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint Exterior of House →</Link></li>
            <li><Link href={`/${locale}/best-exterior-paint-for-houses`} className="text-blue-600 hover:text-blue-700 font-medium">Best Exterior Paint for Houses →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room in Baltimore?</h3>
              <p className="text-gray-700">Professional painters in Baltimore charge $42–$68/hr. An average room costs $270–$450 professionally. DIY painting costs $60–$150 in paint and supplies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for a room in Baltimore?</h3>
              <p className="text-gray-700">A standard 12×14 room needs about 2 gallons for two coats. Enter your exact dimensions in the Baltimore paint calculator above for a precise estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior painting cost in Baltimore?</h3>
              <p className="text-gray-700">Exterior painting for an average Baltimore home costs $1,870–$4,080 professionally. DIY costs $400–$1,200 in paint and supplies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best exterior paint for Baltimore's climate?</h3>
              <p className="text-gray-700">Baltimore's signature painted brick row homes require masonry-specific exterior primers. The Chesapeake Bay proximity creates high humidity and salt air exposure — use moisture and salt-resistant exterior coatings. Baltimore has a large stock of pre-1978 homes with lead paint requiring proper handling.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint a house in Baltimore?</h3>
              <p className="text-gray-700">April through October. Baltimore summers are hot and humid but manageable for early morning exterior work.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I find a good painter in Baltimore?</h3>
              <p className="text-gray-700">Get at least three quotes from licensed and insured painters. Check Google reviews, verify liability insurance, and ask for references. Baltimore painters typically book 2–4 weeks in advance.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
