import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Pre-filled bedroom state: 12x14x8, eggshell, walls only, 2 coats, 1 door, 2 windows
function getBedroomParam(): string {
  const state = {
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2,
      paintType: 'latex',
      finish: 'eggshell',
      wallCondition: 'good',
      usePrimer: false,
      primerCoats: 1,
      paintCoverageRate: 400,
      primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 35,
      primerPrice: 25,
      calculateLabor: false,
      laborRate: 50,
      includeMaterials: true,
      brushRoller: 25,
      tape: 10,
      dropCloths: 15,
      other: 0,
    },
    rooms: [
      {
        id: 'room_bedroom_prefill',
        measurements: {
          name: 'Bedroom',
          mode: 'dimensions',
          length: '12',
          width: '14',
          height: '8',
          directWallArea: '',
          directCeilingArea: '',
          directPerimeter: '',
          doors: [
            { id: 'door_bedroom_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' },
          ],
          windows: [
            { id: 'window_bedroom_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' },
          ],
        },
        surfaces: { walls: true, ceiling: false, trim: false, doors: false },
        extras: {
          accentWall: false,
          accentWallArea: '',
          wainscoting: false,
          wainscotingHeight: 36,
          crownMolding: false,
          builtIns: false,
          builtInsArea: '',
          fireplace: false,
          fireplaceArea: '',
        },
      },
    ],
  };

  if (typeof window === 'undefined') {
    // Server side — use Buffer
    return Buffer.from(JSON.stringify(state)).toString('base64url');
  }
  // Client side fallback
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
      ? 'https://thepaintcalculator.com/bedroom-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/bedroom-paint-calculator`;

  return {
    title: 'Bedroom Paint Calculator — How Much Paint for a Bedroom? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your bedroom. Pre-filled for a standard 12x14 bedroom — adjust for your size. Free, instant results in gallons or litres. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Bedroom Paint Calculator — How Much Paint for a Bedroom?',
      description: 'Calculate exactly how much paint you need for your bedroom. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function BedroomPaintCalculator({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const bedroomParam = getBedroomParam();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Bedroom Paint Calculator', item: 'https://thepaintcalculator.com/bedroom-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a bedroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most bedrooms need 2 to 2.5 gallons of paint for two coats on the walls. A standard 12x14 bedroom with 8ft ceilings needs about 1.8 gallons. Larger master bedrooms may need 3 gallons or more.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a bedroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Eggshell is the best finish for most bedrooms. It has a soft low-sheen look, is washable, and hides minor wall imperfections. Satin is a good alternative for childrens bedrooms where walls need more frequent scrubbing.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a master bedroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'A master bedroom typically measures 14x16 to 16x20 feet and needs 2.5 to 3.5 gallons for two coats on the walls. Use the calculator above and enter your exact dimensions for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a bedroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard bedroom needs 7 to 9 litres of paint for two coats on the walls. A 12x14 bedroom needs approximately 7 litres. Buy a 5 litre tin plus a 2.5 litre tin for most bedrooms.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint the bedroom ceiling the same colour as the walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Painting ceiling and walls the same colour creates a cocooning effect that works well in bedrooms. If you prefer contrast, white or off-white ceilings are the most popular choice. Check the ceiling box in the calculator to include it in your estimate.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint a bedroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard bedroom takes 4 to 6 hours to paint with two coats including prep and drying time. A large master bedroom may take a full day. Allow 24 hours before moving furniture back in.' },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Bedroom Paint Calculator — How Much Paint for a Bedroom?',
    description: 'Complete guide to calculating how much paint you need for any bedroom size including gallons, litres, finish recommendations and colour ideas.',
    url: 'https://thepaintcalculator.com/bedroom-paint-calculator',
    publisher: {
      '@type': 'Organization',
      name: 'ThePaintCalculator.com',
      url: 'https://thepaintcalculator.com',
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Bedroom Paint Calculator</li>
          </ol>
        </nav>

        {/* H1 and intro */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bedroom Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Most bedrooms need <strong>2 to 2.5 gallons</strong> (7 to 9 litres) of paint for two coats on the walls. Our calculator is pre-filled for a standard 12x14 bedroom — just adjust the dimensions to match your room for an exact result. Free, no signup required.
          </p>
        </div>

        {/* Quick answer box */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 2.5 gallons (7 to 9 litres)</p>
          <p className="text-sm opacity-90">For a standard 12x14 bedroom with 8ft ceilings — two coats on walls</p>
        </div>

        {/* Calculator pre-filled via URL param */}
        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        {/* Pre-fill script — sets the URL param on load so calculator shows bedroom defaults */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window === 'undefined') return;
                  var url = new URL(window.location.href);
                  if (!url.searchParams.get('p')) {
                    url.searchParams.set('p', '${bedroomParam}');
                    window.history.replaceState({}, '', url.toString());
                    window.location.reload();
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* Article content */}
        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How Much Paint Does a Bedroom Need?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The amount of paint a bedroom needs depends on its size, ceiling height, and number of coats. A standard 12x14 bedroom has approximately 365 square feet of wall area after deducting one door and two windows. At 400 square feet per gallon, two coats requires about 1.8 gallons. Most homeowners round up and buy 2 gallons — enough for two full coats plus touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a master bedroom measuring 14x16 or larger, budget 2.5 to 3.5 gallons for two coats. Use the calculator above and enter your exact dimensions for a precise estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard bedroom needs 7 to 9 litres for two coats. A 5 litre tin plus a 2.5 litre tin is the right combination for most bedrooms. In the UK, Dulux and Crown both sell bedroom paint in sizes ideally suited to this room size.
          </p>

          {/* Reference table */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Bedroom Paint Calculator — Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Bedroom Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10x10 (small)</td>
                  <td className="px-4 py-3 text-gray-700">0.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.3 gal</td>
                  <td className="px-4 py-3 text-gray-700">~5 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">12x12 (standard)</td>
                  <td className="px-4 py-3 text-gray-700">0.85 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">~6.5 litres</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">12x14 (standard)</td>
                  <td className="px-4 py-3 text-gray-700">0.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">~7 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">14x16 (large)</td>
                  <td className="px-4 py-3 text-gray-700">1.2 gal</td>
                  <td className="px-4 py-3 text-gray-700">2.4 gal</td>
                  <td className="px-4 py-3 text-gray-700">~9 litres</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-800">16x20 (master)</td>
                  <td className="px-4 py-3 text-gray-700">1.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">3.4 gal</td>
                  <td className="px-4 py-3 text-gray-700">~13 litres</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint Finish for a Bedroom
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Eggshell is the most popular finish for bedrooms and the right choice for most situations. It has a soft low-sheen appearance, is washable, and hides minor wall imperfections better than flat paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is a good alternative for children's bedrooms where walls get touched frequently. It is slightly more durable and scrubbable than eggshell. Avoid semi-gloss or gloss on bedroom walls — high-sheen finishes highlight every imperfection and feel clinical in living spaces.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint Colours for a Bedroom in 2026
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Neutral and soft tones dominate bedroom colour choices because they create a calm relaxing atmosphere. The most popular bedroom colours in 2026 are warm whites, soft greiges, and muted blues and greens.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams Agreeable Gray (SW 7029)</strong> is the best-selling bedroom colour in the US — a warm greige that works with virtually any furniture and bedding. <strong>Benjamin Moore White Dove (OC-17)</strong> is the go-to soft white for bedrooms with a warm undertone that prevents the cold look of pure white. <strong>Behr Dusty Miller (790C-3)</strong> is a popular soft blue-gray proven to promote relaxation and sleep quality.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting a Bedroom
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Move furniture to the centre first.</strong> Cover with drop cloths and tape edges. Trying to paint around furniture wastes time and causes missed spots.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Paint ceiling before walls.</strong> Always work top to bottom. Ceiling drips get covered when you roll the walls.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Two thin coats beat one thick coat.</strong> Thick coats drip, take longer to dry, and look uneven. Two thin coats give a smoother more professional finish.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Test a patch first.</strong> Always paint a 12x12 inch test patch and check it in both daylight and artificial light. Colours change dramatically under different lighting.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Allow 24 hours before replacing furniture.</strong> Paint feels dry after 2 hours but takes 24 hours to fully cure. Moving furniture too soon causes scuffs.
          </p>

          {/* Internal links */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/how-much-paint-for-10x10-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x10 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator — How Much Primer Do I Need? →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does it Cost to Paint a Bedroom? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for a bedroom?</h3>
              <p className="text-gray-700">Most bedrooms need 2 to 2.5 gallons for two coats on the walls. A standard 12x14 bedroom needs about 1.8 gallons. Use the calculator above and enter your exact dimensions for a precise estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What paint finish is best for a bedroom?</h3>
              <p className="text-gray-700">Eggshell is the best finish for most bedrooms. It has a soft low-sheen look, is washable, and hides wall imperfections. Satin is a good alternative for children's bedrooms where walls need more scrubbing.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a master bedroom?</h3>
              <p className="text-gray-700">A master bedroom typically needs 2.5 to 3.5 gallons for two coats. Enter your exact dimensions in the calculator above for a precise estimate based on your ceiling height and number of windows.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres of paint for a bedroom?</h3>
              <p className="text-gray-700">A standard bedroom needs 7 to 9 litres for two coats on the walls. Buy a 5 litre tin plus a 2.5 litre tin. A large master bedroom may need 10 to 13 litres.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint the bedroom ceiling the same colour as walls?</h3>
              <p className="text-gray-700">Painting ceiling and walls the same colour creates a cocooning effect that works well in bedrooms. If you prefer contrast, white or off-white ceilings are the most popular choice. Check the ceiling surface box in the calculator to include it in your estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a bedroom?</h3>
              <p className="text-gray-700">A standard bedroom takes 4 to 6 hours with two coats including prep and drying time. A large master bedroom may take a full day. Allow 24 hours before moving furniture back in.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
