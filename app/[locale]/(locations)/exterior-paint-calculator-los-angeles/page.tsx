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
    activeTab: 'exterior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex',
      finish: 'flat',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 350, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 65,
      primerPrice: 25, calculateLabor: false,
      laborRate: 77,
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
      ? 'https://thepaintcalculator.com/exterior-paint-calculator-los-angeles'
      : `https://thepaintcalculator.com/${locale}/exterior-paint-calculator-los-angeles`;
  return {
    title: 'Exterior Paint Calculator Los Angeles CA — Local Rates & Estimates | ThePaintCalculator.com',
    description: 'Free exterior paint calculator for Los Angeles, CA. SCAQMD-compliant, with local LA painter rates and Mediterranean climate tips. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Exterior Paint Calculator Los Angeles, CA',
      description: 'Free exterior paint calculator for Los Angeles, CA. SCAQMD-compliant, with local LA painter rates and Mediterranean climate tips. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function ExteriorPaintCalculatorLosAngeles({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator California","item":"https://thepaintcalculator.com/paint-calculator-california"},{"@type":"ListItem","position":3,"name":"Paint Calculator Los Angeles","item":"https://thepaintcalculator.com/paint-calculator-los-angeles-ca"},{"@type":"ListItem","position":4,"name":"Exterior Paint Calculator Los Angeles, CA","item":"https://thepaintcalculator.com/exterior-paint-calculator-los-angeles"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much exterior paint for a house in Los Angeles, CA?","acceptedAnswer":{"@type":"Answer","text":"A 1,500 sq ft home needs 9–12 gallons. A 2,000 sq ft home needs 12–15 gallons. Stucco and rough surfaces need 50–100% more paint than smooth siding."}},{"@type":"Question","name":"How much does exterior painting cost in Los Angeles?","acceptedAnswer":{"@type":"Answer","text":"Professional exterior painters in Los Angeles charge $58–$95/hr. A 1,500 sq ft home costs $3030–$5325 professionally."}},{"@type":"Question","name":"What is the best exterior paint for Los Angeles's climate?","acceptedAnswer":{"@type":"Answer","text":"Los Angeles requires SCAQMD-compliant low-VOC exterior paint. The dry Santa Ana winds create ideal painting conditions in fall but also extreme fire risk. Coastal LA properties need salt-resistant coatings. The intense Inland Empire UV requires maximum UV inhibitors for homes in the San Fernando Valley and East LA."}},{"@type":"Question","name":"When is the best time to paint the exterior in Los Angeles?","acceptedAnswer":{"@type":"Answer","text":"Year-round exterior painting is possible in LA. Spring and early fall are ideal. Avoid Santa Ana wind events (October–December) for exterior work."}},{"@type":"Question","name":"How long does exterior house painting take in Los Angeles?","acceptedAnswer":{"@type":"Answer","text":"A professional crew of two takes 2–4 days for an average home exterior in Los Angeles. DIY exterior painting takes 3–5 days."}},{"@type":"Question","name":"How often should you repaint the exterior in Los Angeles?","acceptedAnswer":{"@type":"Answer","text":"In Los Angeles's Mediterranean climate, quality exterior paint lasts 7–12 years on smooth siding. Stucco and masonry may need repainting every 5–8 years."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Exterior Paint Calculator Los Angeles, CA","description":"Free exterior paint calculator for Los Angeles, CA. SCAQMD-compliant, with local LA painter rates and Mediterranean climate tips. No signup.","url":"https://thepaintcalculator.com/exterior-paint-calculator-los-angeles","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li><Link href={`/${locale}/paint-calculator-california`} className="hover:text-blue-600 transition-colors">California</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href={`/${locale}/paint-calculator-los-angeles-ca`} className="hover:text-blue-600 transition-colors">Los Angeles</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Exterior Paint Calculator Los Angeles, CA</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Exterior Paint Calculator Los Angeles, CA
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `An average Los Angeles home needs <strong>10–13 gallons for two coats</strong> on exterior siding. LA requires <strong>SCAQMD-compliant low-VOC exterior paint</strong> — all major premium brands (Sherwin-Williams Emerald, Benjamin Moore Aura) comply automatically. Professional exterior painters in LA charge <strong>$58–$95 per hour</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">10 to 13 gallons for an average LA home exterior</p>
          <p className="text-sm opacity-90">LA painters charge $58–$95/hr · SCAQMD low-VOC paint required</p>
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
            How Much Exterior Paint for a Home in Los Angeles, CA?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `An average home in Los Angeles, CA needs <strong>10–14 gallons for two coats</strong> on smooth exterior siding. Rough surfaces like stucco, brick, and textured siding absorb significantly more — use 150–200 sq ft per gallon for stucco. Professional exterior painters in Los Angeles charge <strong>$58–$95/hr</strong>.` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Home Size</th>
                <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Los Angeles)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Los Angeles)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td className="px-4 py-3 text-gray-700">6–8 gal</td><td className="px-4 py-3 text-gray-700">$444–$916</td><td className="px-4 py-3 text-gray-700">$1650–$2775</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td className="px-4 py-3 text-gray-700">9–12 gal</td><td className="px-4 py-3 text-gray-700">$620–$1280</td><td className="px-4 py-3 text-gray-700">$2330–$3925</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td className="px-4 py-3 text-gray-700">12–15 gal</td><td className="px-4 py-3 text-gray-700">$796–$1644</td><td className="px-4 py-3 text-gray-700">$3184–$5360</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td className="px-4 py-3 text-gray-700">15–20 gal</td><td className="px-4 py-3 text-gray-700">$1014–$2096</td><td className="px-4 py-3 text-gray-700">$3980–$6700</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Exterior Painting Tips for Los Angeles, CA</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Los Angeles requires SCAQMD-compliant low-VOC exterior paint. The dry Santa Ana winds create ideal painting conditions in fall but also extreme fire risk. Coastal LA properties need salt-resistant coatings. The intense Inland Empire UV requires maximum UV inhibitors for homes in the San Fernando Valley and East LA.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Best time to paint exterior in Los Angeles:</strong> Year-round exterior painting is possible in LA. Spring and early fall are ideal. Avoid Santa Ana wind events (October–December) for exterior work.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-california`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator California →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-los-angeles-ca`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator Los Angeles CA →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much exterior paint for a house in Los Angeles, CA?</h3>
              <p className="text-gray-700">A 1,500 sq ft home needs 9–12 gallons. A 2,000 sq ft home needs 12–15 gallons. Stucco and rough surfaces need 50–100% more paint than smooth siding.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior painting cost in Los Angeles?</h3>
              <p className="text-gray-700">Professional exterior painters in Los Angeles charge $58–$95/hr. A 1,500 sq ft home costs $3030–$5325 professionally.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best exterior paint for Los Angeles's climate?</h3>
              <p className="text-gray-700">Los Angeles requires SCAQMD-compliant low-VOC exterior paint. The dry Santa Ana winds create ideal painting conditions in fall but also extreme fire risk. Coastal LA properties need salt-resistant coatings. The intense Inland Empire UV requires maximum UV inhibitors for homes in the San Fernando Valley and East LA.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint the exterior in Los Angeles?</h3>
              <p className="text-gray-700">Year-round exterior painting is possible in LA. Spring and early fall are ideal. Avoid Santa Ana wind events (October–December) for exterior work.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does exterior house painting take in Los Angeles?</h3>
              <p className="text-gray-700">A professional crew of two takes 2–4 days for an average home exterior in Los Angeles. DIY exterior painting takes 3–5 days.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How often should you repaint the exterior in Los Angeles?</h3>
              <p className="text-gray-700">In Los Angeles's Mediterranean climate, quality exterior paint lasts 7–12 years on smooth siding. Stucco and masonry may need repainting every 5–8 years.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
