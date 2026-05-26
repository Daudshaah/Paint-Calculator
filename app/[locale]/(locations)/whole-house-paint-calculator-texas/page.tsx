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
        name: 'Room', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_loc_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_loc_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
      },
      surfaces: { walls: true, ceiling: true, trim: true, doors: false },
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
      ? 'https://thepaintcalculator.com/whole-house-paint-calculator-texas'
      : `https://thepaintcalculator.com/${locale}/whole-house-paint-calculator-texas`;
  return {
    title: 'Whole House Paint Calculator Texas — How Much Paint for a Texas Home? | ThePaintCalculator.com',
    description: 'Free whole house paint calculator for Texas homes. Accurate estimates for all Texas home sizes with local painter rates. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Whole House Paint Calculator Texas',
      description: 'Free whole house paint calculator for Texas homes. Accurate estimates for all Texas home sizes with local painter rates. No signup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function WholeHousePaintCalculatorTexas({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const pageParam = getPageParam();

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Calculator Texas","item":"https://thepaintcalculator.com/paint-calculator-texas"},{"@type":"ListItem","position":3,"name":"Whole House Paint Calculator Texas","item":"https://thepaintcalculator.com/whole-house-paint-calculator-texas"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint to paint a whole house in Texas?","acceptedAnswer":{"@type":"Answer","text":"A 1,500 sq ft home needs 16–22 gallons total. A 2,000 sq ft home needs 20–28 gallons. Use the calculator above with your exact floor plan for a precise estimate."}},{"@type":"Question","name":"How much does it cost to paint a whole house in Texas?","acceptedAnswer":{"@type":"Answer","text":"Whole-house interior painting in Texas costs $3,600–$6,140 professionally for an average home. DIY costs $1072–$2260 for a 2,000 sq ft home."}},{"@type":"Question","name":"How long does it take to paint a whole house in Texas?","acceptedAnswer":{"@type":"Answer","text":"A professional crew of two takes 3–5 days for an average Texas home interior. A solo DIYer should allow 7–14 days to complete the job properly."}},{"@type":"Question","name":"What type of paint for a whole house interior in Texas?","acceptedAnswer":{"@type":"Answer","text":"Eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for all ceilings, and semi-gloss for all trim and doors. Texas homes average 2,000+ sq ft — larger than the national average. Eggshell for living areas and bedrooms, satin for kitchens and bathrooms. Flat white for ceilings."}},{"@type":"Question","name":"How many gallons of paint for a 2,000 sq ft house in Texas?","acceptedAnswer":{"@type":"Answer","text":"A 2,000 sq ft home needs 20–28 gallons total for a complete interior repaint including walls, ceilings, and trim."}},{"@type":"Question","name":"Is it cheaper to paint a whole house at once in Texas?","acceptedAnswer":{"@type":"Answer","text":"Yes — painting all rooms at once allows bulk paint buying (5-gallon buckets), one contractor mobilisation, and a single prep phase, reducing per-room cost by 15–25%."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Whole House Paint Calculator Texas","description":"Free whole house paint calculator for Texas homes. Accurate estimates for all Texas home sizes with local painter rates. No signup.","url":"https://thepaintcalculator.com/whole-house-paint-calculator-texas","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Whole House Paint Calculator Texas</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Whole House Paint Calculator Texas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `An average Texas home of <strong>2,000 sq ft needs 18–25 gallons</strong> for a complete interior repaint (walls, ceilings, and trim). Texas homes are larger than the US average — budget more than you would for a typical national estimate. Professional whole-house interior painting in Texas costs <strong>$3,500–$7,000</strong> for an average 2,000 sq ft home.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">18 to 25 gallons for an average Texas home interior</p>
          <p className="text-sm opacity-90">Texas homes average 2,000+ sq ft — more paint than the national average</p>
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
            How Much Paint to Paint a Whole House in Texas?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: `A complete interior repaint of an average Texas home needs <strong>18–25 gallons total</strong> — wall paint, ceiling paint, and trim paint combined. Professional whole-house interior painting in Texas costs <strong>$3,600–$6,140</strong> for an average home.` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Home Size</th>
                <th className="px-4 py-3 text-left font-semibold">Total Paint</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost (Texas)</th>
                <th className="px-4 py-3 text-left font-semibold">Pro Cost (Texas)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td className="px-4 py-3 text-gray-700">12–16 gal</td><td className="px-4 py-3 text-gray-700">$592–$1310</td><td className="px-4 py-3 text-gray-700">$2,075–$3,510</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td className="px-4 py-3 text-gray-700">16–22 gal</td><td className="px-4 py-3 text-gray-700">$832–$1735</td><td className="px-4 py-3 text-gray-700">$2,800–$4,680</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td className="px-4 py-3 text-gray-700">20–28 gal</td><td className="px-4 py-3 text-gray-700">$1072–$2260</td><td className="px-4 py-3 text-gray-700">$3,700–$6,240</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td className="px-4 py-3 text-gray-700">25–35 gal</td><td className="px-4 py-3 text-gray-700">$1340–$2850</td><td className="px-4 py-3 text-gray-700">$4,600–$7,800</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Whole House in Texas</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy in 5-gallon buckets.</strong> For a whole house you will need 15+ gallons of wall colour. Buying in 5-gallon buckets saves 10–15% per gallon and guarantees colour batch consistency.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>One colour throughout.</strong> Using the same wall colour in all rooms reduces total cans needed and simplifies touch-ups for years after painting.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Climate note for Texas.</strong> Texas homes average 2,000+ sq ft — larger than the national average. Eggshell for living areas and bedrooms, satin for kitchens and bathrooms. Flat white for ceilings.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint to paint a whole house in Texas?</h3>
              <p className="text-gray-700">A 1,500 sq ft home needs 16–22 gallons total. A 2,000 sq ft home needs 20–28 gallons. Use the calculator above with your exact floor plan for a precise estimate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a whole house in Texas?</h3>
              <p className="text-gray-700">Whole-house interior painting in Texas costs $3,600–$6,140 professionally for an average home. DIY costs $1072–$2260 for a 2,000 sq ft home.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a whole house in Texas?</h3>
              <p className="text-gray-700">A professional crew of two takes 3–5 days for an average Texas home interior. A solo DIYer should allow 7–14 days to complete the job properly.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint for a whole house interior in Texas?</h3>
              <p className="text-gray-700">Eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for all ceilings, and semi-gloss for all trim and doors. Texas homes average 2,000+ sq ft — larger than the national average. Eggshell for living areas and bedrooms, satin for kitchens and bathrooms. Flat white for ceilings.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a 2,000 sq ft house in Texas?</h3>
              <p className="text-gray-700">A 2,000 sq ft home needs 20–28 gallons total for a complete interior repaint including walls, ceilings, and trim.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it cheaper to paint a whole house at once in Texas?</h3>
              <p className="text-gray-700">Yes — painting all rooms at once allows bulk paint buying (5-gallon buckets), one contractor mobilisation, and a single prep phase, reducing per-room cost by 15–25%.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
