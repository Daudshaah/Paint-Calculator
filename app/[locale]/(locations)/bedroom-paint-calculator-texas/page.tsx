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
      primerPrice: 25, calculateLabor: false,
      laborRate: 47,
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
      ? 'https://thepaintcalculator.com/bedroom-paint-calculator-texas'
      : `https://thepaintcalculator.com/${locale}/bedroom-paint-calculator-texas`;
  return {
    title: 'Bedroom Paint Calculator Texas — How Much Paint for a Texas Bedroom? | ThePaintCalculator.com',
    description: 'Free bedroom paint calculator for Texas homeowners. Accurate paint estimates with local Texas painter rates and climate tips. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Bedroom Paint Calculator Texas',
      description: 'Free bedroom paint calculator for Texas homeowners. Accurate paint estimates with local Texas painter rates and climate tips. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function BedroomPaintCalculatorTexas({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Texas","item":"https://thepaintcalculator.com/paint-calculator-texas"},{"@type":"ListItem","position":3,"name":"Bedroom Paint Calculator Texas","item":"https://thepaintcalculator.com/bedroom-paint-calculator-texas"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint for a bedroom in Texas?","acceptedAnswer":{"@type":"Answer","text":"A standard 12×14 bedroom needs about 2 gallons for two coats on the walls. A master bedroom needs 2.5–3.5 gallons. Paint costs $28–$65/gal in Texas."}},{"@type":"Question","name":"How much does it cost to paint a bedroom in Texas?","acceptedAnswer":{"@type":"Answer","text":"Professional painters in Texas charge $35–$58/hr. A standard 12×14 bedroom costs $225–$390 professionally. DIY costs $90–$187."}},{"@type":"Question","name":"What is the best paint finish for a bedroom in Texas?","acceptedAnswer":{"@type":"Answer","text":"Texas homes average 2,000+ sq ft — larger than the national average. Eggshell for living areas and bedrooms, satin for kitchens and bathrooms. Flat white for ceilings."}},{"@type":"Question","name":"How long does it take to paint a bedroom in Texas?","acceptedAnswer":{"@type":"Answer","text":"A professional takes 2–4 hours for a standard bedroom in Texas. A DIYer should allow a full day including prep, two coats, and drying time."}},{"@type":"Question","name":"How many gallons for a master bedroom in Texas?","acceptedAnswer":{"@type":"Answer","text":"A master bedroom (14×16 to 16×20 ft) needs 2.5–3.5 gallons for two coats. Use the calculator above with your exact dimensions for a precise estimate."}},{"@type":"Question","name":"When is the best time to paint interiors in Texas?","acceptedAnswer":{"@type":"Answer","text":"Interior painting in Texas is possible year-round. Spring (March–May) and fall (October–November) statewide. Avoid Houston summers for exterior work — too humid. Avoid West Texas summers — too hot."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Bedroom Paint Calculator Texas","description":"Free bedroom paint calculator for Texas homeowners. Accurate paint estimates with local Texas painter rates and climate tips. No signup.","url":"https://thepaintcalculator.com/bedroom-paint-calculator-texas","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Bedroom Paint Calculator Texas</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bedroom Paint Calculator Texas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Texas bedrooms average <strong>larger than the national norm</strong> — many master bedrooms run 14×16 to 16×20 feet. A standard 12×14 bedroom needs 2 gallons for two coats; a Texas master bedroom typically needs 2.5 to 3.5 gallons. Professional painters in Texas charge <strong>$35–$58 per hour</strong>.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 2.5 gallons for a standard Texas bedroom</p>
          <p className="text-sm opacity-90">Texas bedrooms average larger than the national norm — budget accordingly</p>
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
            How Much Paint for a Bedroom in Texas?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `A bedroom in Texas needs the same amount of paint as any other location — wall area determines paint quantity, not geography. A standard 12×14 bedroom needs about <strong>2 gallons for two coats</strong> on the walls. A master bedroom (14×16 or larger) needs 2.5 to 3.5 gallons. What varies locally is the cost of paint ($28–$65/gal in Texas) and labour ($35–$58/hr professionally).` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Bedroom Size</th>
                <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Texas)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Texas)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">10×10</td><td className="px-4 py-3 text-gray-700">1.3 gal</td><td className="px-4 py-3 text-gray-700">$66–$145</td><td className="px-4 py-3 text-gray-700">$145–$254</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">12×14 (standard)</td><td className="px-4 py-3 text-gray-700">1.8 gal</td><td className="px-4 py-3 text-gray-700">$90–$187</td><td className="px-4 py-3 text-gray-700">$225–$390</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">14×16 (large)</td><td className="px-4 py-3 text-gray-700">2.4 gal</td><td className="px-4 py-3 text-gray-700">$117–$236</td><td className="px-4 py-3 text-gray-700">$270–$458</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">16×20 (master)</td><td className="px-4 py-3 text-gray-700">3.4 gal</td><td className="px-4 py-3 text-gray-700">$165–$331</td><td className="px-4 py-3 text-gray-700">$360–$604</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bedroom Paint Tips for Texas</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Best finish for Texas bedrooms.</strong> Texas homes average 2,000+ sq ft — larger than the national average. Eggshell for living areas and bedrooms, satin for kitchens and bathrooms. Flat white for ceilings.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Climate note.</strong> Texas has multiple climates in one state. For interiors this means ensuring good ventilation during painting and using moisture-resistant finishes in rooms facing the exterior.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a bedroom in Texas?</h3>
              <p className="text-gray-700">A standard 12×14 bedroom needs about 2 gallons for two coats on the walls. A master bedroom needs 2.5–3.5 gallons. Paint costs $28–$65/gal in Texas.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bedroom in Texas?</h3>
              <p className="text-gray-700">Professional painters in Texas charge $35–$58/hr. A standard 12×14 bedroom costs $225–$390 professionally. DIY costs $90–$187.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint finish for a bedroom in Texas?</h3>
              <p className="text-gray-700">Texas homes average 2,000+ sq ft — larger than the national average. Eggshell for living areas and bedrooms, satin for kitchens and bathrooms. Flat white for ceilings.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a bedroom in Texas?</h3>
              <p className="text-gray-700">A professional takes 2–4 hours for a standard bedroom in Texas. A DIYer should allow a full day including prep, two coats, and drying time.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a master bedroom in Texas?</h3>
              <p className="text-gray-700">A master bedroom (14×16 to 16×20 ft) needs 2.5–3.5 gallons for two coats. Use the calculator above with your exact dimensions for a precise estimate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint interiors in Texas?</h3>
              <p className="text-gray-700">Interior painting in Texas is possible year-round. Spring (March–May) and fall (October–November) statewide. Avoid Houston summers for exterior work — too humid. Avoid West Texas summers — too hot.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
