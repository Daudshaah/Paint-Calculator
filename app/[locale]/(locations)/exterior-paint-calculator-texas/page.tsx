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
    activeTab: 'exterior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex',
      finish: 'flat',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 350, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 47,
      primerPrice: 25, calculateLabor: false,
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
      ? 'https://thepaintcalculator.com/exterior-paint-calculator-texas'
      : `https://thepaintcalculator.com/${locale}/exterior-paint-calculator-texas`;
  return {
    title: 'Exterior Paint Calculator Texas — How Much Exterior Paint for a Texas Home? | ThePaintCalculator.com',
    description: 'Free exterior paint calculator for Texas homes. Accurate estimates for Houston, Dallas, Austin and all Texas climates. Local TX painter rates included. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Exterior Paint Calculator Texas',
      description: 'Free exterior paint calculator for Texas homes. Accurate estimates for Houston, Dallas, Austin and all Texas climates. Local TX painter rates included. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function ExteriorPaintCalculatorTexas({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Texas","item":"https://thepaintcalculator.com/paint-calculator-texas"},{"@type":"ListItem","position":3,"name":"Exterior Paint Calculator Texas","item":"https://thepaintcalculator.com/exterior-paint-calculator-texas"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much exterior paint for a house in Texas?","acceptedAnswer":{"@type":"Answer","text":"A 1,500 sq ft home needs 9–12 gallons. A 2,000 sq ft home needs 12–15 gallons. Stucco and rough surfaces need 50–100% more paint than smooth siding."}},{"@type":"Question","name":"How much does exterior painting cost in Texas?","acceptedAnswer":{"@type":"Answer","text":"Professional exterior painters in Texas charge $35–$58/hr. A 1,500 sq ft home costs $2225–$4030 professionally."}},{"@type":"Question","name":"What is the best exterior paint for Texas's climate?","acceptedAnswer":{"@type":"Answer","text":"Texas has multiple climates in one state. Houston and the Gulf Coast need maximum mildew resistance. Dallas and Fort Worth need flexible paint for temperature swings. West Texas and El Paso need UV-resistant coatings for desert sun. Use 100% acrylic exterior latex throughout."}},{"@type":"Question","name":"When is the best time to paint the exterior in Texas?","acceptedAnswer":{"@type":"Answer","text":"Spring (March–May) and fall (October–November) statewide. Avoid Houston summers for exterior work — too humid. Avoid West Texas summers — too hot."}},{"@type":"Question","name":"How long does exterior house painting take in Texas?","acceptedAnswer":{"@type":"Answer","text":"A professional crew of two takes 2–4 days for an average home exterior in Texas. DIY exterior painting takes 3–5 days."}},{"@type":"Question","name":"How often should you repaint the exterior in Texas?","acceptedAnswer":{"@type":"Answer","text":"In Texas's varied — humid Gulf Coast to dry West Texas climate, quality exterior paint lasts 7–12 years on smooth siding. Stucco and masonry may need repainting every 5–8 years."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Exterior Paint Calculator Texas","description":"Free exterior paint calculator for Texas homes. Accurate estimates for Houston, Dallas, Austin and all Texas climates. Local TX painter rates included. No signup.","url":"https://thepaintcalculator.com/exterior-paint-calculator-texas","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Exterior Paint Calculator Texas</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Exterior Paint Calculator Texas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `An average Texas home of 2,000 sq ft needs <strong>10–14 gallons for two coats</strong> on the exterior siding. Texas's diverse climates — from Houston's humidity to the Panhandle's cold winters to West Texas's desert UV — mean paint selection varies significantly by region. Professional exterior painters in Texas charge <strong>$35–$58 per hour</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">10 to 15 gallons for an average Texas home exterior</p>
          <p className="text-sm opacity-90">Texas homes average 2,000+ sq ft — larger than the national average</p>
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
            How Much Exterior Paint for a Home in Texas?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `An average home in Texas needs <strong>10–14 gallons for two coats</strong> on smooth exterior siding. Rough surfaces like stucco, brick, and textured siding absorb significantly more — use 150–200 sq ft per gallon for stucco. Professional exterior painters in Texas charge <strong>$35–$58/hr</strong>.` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Home Size</th>
                <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Texas)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Texas)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td className="px-4 py-3 text-gray-700">6–8 gal</td><td className="px-4 py-3 text-gray-700">$346–$755</td><td className="px-4 py-3 text-gray-700">$1075–$1850</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td className="px-4 py-3 text-gray-700">9–12 gal</td><td className="px-4 py-3 text-gray-700">$480–$1050</td><td className="px-4 py-3 text-gray-700">$1525–$2630</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td className="px-4 py-3 text-gray-700">12–15 gal</td><td className="px-4 py-3 text-gray-700">$614–$1345</td><td className="px-4 py-3 text-gray-700">$2080–$3584</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td className="px-4 py-3 text-gray-700">15–20 gal</td><td className="px-4 py-3 text-gray-700">$776–$1705</td><td className="px-4 py-3 text-gray-700">$2600–$4480</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Exterior Painting Tips for Texas</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Texas has multiple climates in one state. Houston and the Gulf Coast need maximum mildew resistance. Dallas and Fort Worth need flexible paint for temperature swings. West Texas and El Paso need UV-resistant coatings for desert sun. Use 100% acrylic exterior latex throughout.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Best time to paint exterior in Texas:</strong> Spring (March–May) and fall (October–November) statewide. Avoid Houston summers for exterior work — too humid. Avoid West Texas summers — too hot.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-texas`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Texas →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much exterior paint for a house in Texas?</h3>
              <p className="text-gray-700">A 1,500 sq ft home needs 9–12 gallons. A 2,000 sq ft home needs 12–15 gallons. Stucco and rough surfaces need 50–100% more paint than smooth siding.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior painting cost in Texas?</h3>
              <p className="text-gray-700">Professional exterior painters in Texas charge $35–$58/hr. A 1,500 sq ft home costs $2225–$4030 professionally.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best exterior paint for Texas's climate?</h3>
              <p className="text-gray-700">Texas has multiple climates in one state. Houston and the Gulf Coast need maximum mildew resistance. Dallas and Fort Worth need flexible paint for temperature swings. West Texas and El Paso need UV-resistant coatings for desert sun. Use 100% acrylic exterior latex throughout.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint the exterior in Texas?</h3>
              <p className="text-gray-700">Spring (March–May) and fall (October–November) statewide. Avoid Houston summers for exterior work — too humid. Avoid West Texas summers — too hot.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does exterior house painting take in Texas?</h3>
              <p className="text-gray-700">A professional crew of two takes 2–4 days for an average home exterior in Texas. DIY exterior painting takes 3–5 days.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How often should you repaint the exterior in Texas?</h3>
              <p className="text-gray-700">In Texas's varied — humid Gulf Coast to dry West Texas climate, quality exterior paint lasts 7–12 years on smooth siding. Stucco and masonry may need repainting every 5–8 years.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
