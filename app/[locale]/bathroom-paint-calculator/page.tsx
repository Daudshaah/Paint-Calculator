import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
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
      ? 'https://thepaintcalculator.com/bathroom-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/bathroom-paint-calculator`;

  return {
    title: 'Bathroom Paint Calculator — How Much Paint for a Bathroom? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your bathroom. Pre-filled for a standard 8x6 bathroom — adjust for your size. Free instant results in gallons or litres. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Bathroom Paint Calculator — How Much Paint for a Bathroom?',
      description: 'Calculate exactly how much paint you need for your bathroom. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function BathroomPaintCalculator({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Bathroom Paint Calculator', item: 'https://thepaintcalculator.com/bathroom-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most bathrooms need 1 to 1.5 gallons of paint for two coats on the walls. A standard 8x6 bathroom with 8ft ceilings needs about 0.9 gallons. A larger master bathroom may need 2 gallons.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Semi-gloss is the best finish for bathrooms. It resists moisture and humidity, is highly washable, and holds up to steam from showers and baths. Satin is an acceptable alternative if you prefer a lower sheen.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need special paint for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — use a paint labelled for bathrooms or kitchens, or any paint with mildew resistance. Standard latex paint will work short-term but will peel in high-humidity bathrooms. Look for paints with built-in mildewcide on the label.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard bathroom needs 3 to 5 litres for two coats on the walls. A small 5x7 bathroom can be done with a single 2.5 litre tin. A larger bathroom needs a 5 litre tin.' },
      },
      {
        '@type': 'Question',
        name: 'How long does bathroom paint take to dry?',
        acceptedAnswer: { '@type': 'Answer', text: 'Bathroom paint feels dry to touch in 1 to 2 hours. Wait at least 4 hours before applying a second coat. Allow 24 to 48 hours before using the shower or bath to let the paint fully cure before steam exposure.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint bathroom ceiling the same colour as walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'In small bathrooms, painting the ceiling the same colour as the walls makes the room feel larger and more cohesive. In larger bathrooms, white ceilings are more common. Use ceiling paint or semi-gloss on the ceiling in high-humidity bathrooms.' },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Bathroom Paint Calculator — How Much Paint for a Bathroom?',
    description: 'Complete guide to calculating how much paint you need for any bathroom size including gallons, litres, finish recommendations and moisture-resistant paint advice.',
    url: 'https://thepaintcalculator.com/bathroom-paint-calculator',
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
            <li className="text-gray-700 font-medium">Bathroom Paint Calculator</li>
          </ol>
        </nav>

        {/* H1 + intro */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bathroom Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Most bathrooms need <strong>1 to 1.5 gallons</strong> (3 to 5 litres) of paint for two coats on the walls. Our calculator is pre-filled for a standard 8x6 bathroom — adjust the dimensions to match your room for an exact result. Free, no signup required.
          </p>
        </div>

        {/* Quick answer box */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 1.5 gallons (3 to 5 litres)</p>
          <p className="text-sm opacity-90">For a standard 8x6 bathroom with 8ft ceilings — two coats on walls</p>
        </div>

        {/* Calculator */}
        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        {/* Article content */}
        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How Much Paint Does a Bathroom Need?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bathrooms are the smallest rooms in most homes, which means they need less paint than any other room. A standard 8x6 bathroom has approximately 210 square feet of wall area before deducting one door and one window. After deductions, the paintable wall area is around 175 square feet. At 400 square feet per gallon with two coats, that equals about 0.9 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most homeowners buy a single quart for very small bathrooms and 1 gallon for standard bathrooms. A large master bathroom measuring 10x12 or bigger will need 1.5 to 2 gallons for two coats. Use the calculator above and enter your exact dimensions for a precise estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard bathroom needs 3 to 5 litres for two coats. A single 2.5 litre tin is enough for most small bathrooms. A larger bathroom needs a 5 litre tin. In the UK, most bathroom paint is sold in 2.5 litre tins which is the right size for a standard bathroom.
          </p>

          {/* Reference table */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Bathroom Paint Calculator — Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Bathroom Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">5x7 (small)</td>
                  <td className="px-4 py-3 text-gray-700">0.35 gal</td>
                  <td className="px-4 py-3 text-gray-700">0.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">~2.5 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">8x6 (standard)</td>
                  <td className="px-4 py-3 text-gray-700">0.45 gal</td>
                  <td className="px-4 py-3 text-gray-700">0.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">~3.5 litres</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">8x10 (medium)</td>
                  <td className="px-4 py-3 text-gray-700">0.6 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.2 gal</td>
                  <td className="px-4 py-3 text-gray-700">~4.5 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10x12 (large)</td>
                  <td className="px-4 py-3 text-gray-700">0.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.6 gal</td>
                  <td className="px-4 py-3 text-gray-700">~6 litres</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-800">12x14 (master bath)</td>
                  <td className="px-4 py-3 text-gray-700">0.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">~7 litres</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint Finish for a Bathroom
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Semi-gloss is the best finish for bathrooms. It resists moisture and humidity, wipes clean easily, and holds up to steam from showers and baths over years of use. Most professional painters use semi-gloss on all bathroom walls as standard practice.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is an acceptable alternative if you prefer a lower sheen. It is more moisture resistant than eggshell and still looks refined. Avoid flat or eggshell finishes in bathrooms — they absorb moisture, grow mildew, and peel within a year in high-humidity conditions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For the ceiling, use either semi-gloss or a dedicated ceiling paint with mildew resistance. Steam rises and collects on the ceiling, making it the most vulnerable surface in the bathroom. A flat ceiling paint will peel quickly in a bathroom without proper ventilation.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint for Bathrooms — Moisture Resistant Options
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Not all paints are equal in bathrooms. Always look for paints labelled as bathroom paint, kitchen and bath paint, or paints with built-in mildewcide. These contain additives that prevent mould and mildew growth on the painted surface.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Zinsser Perma-White Mould & Mildew-Proof Paint</strong> is the top choice for problem bathrooms — it is self-priming, semi-gloss, and guaranteed against mould for 5 years. <strong>Behr Premium Plus Kitchen & Bath</strong> at around $34 per gallon is a reliable mid-range option. <strong>Sherwin-Williams Emerald Bath</strong> at around $92 per gallon is the premium choice for long-lasting protection.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint Colours for a Bathroom
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Soft neutrals and spa-inspired tones are the most popular bathroom colour choices. Light colours make small bathrooms feel larger and brighter, while darker tones can create a dramatic spa-like feel in larger master bathrooms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Benjamin Moore Sea Salt (2123-40)</strong> is a perennial favourite — a soft blue-green that evokes a spa-like atmosphere. <strong>Sherwin-Williams Alabaster (SW 7008)</strong> is a warm white that brightens small bathrooms without looking stark. <strong>Behr Silver Drop (790C-2)</strong> is a cool light gray that pairs beautifully with white fixtures and chrome hardware.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting a Bathroom
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Ventilate before and during painting.</strong> Run the exhaust fan during painting and for 24 hours after. Good ventilation is critical for paint adhesion and drying time in humid bathrooms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Clean walls thoroughly first.</strong> Bathroom walls accumulate soap scum, mildew, and grease. Wipe down with TSP cleaner or sugar soap before painting. Paint will not adhere properly to dirty surfaces.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use semi-gloss — not eggshell.</strong> This is the most common bathroom painting mistake. Eggshell looks fine initially but will peel within 12 months in a shower bathroom.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Caulk before painting.</strong> Re-caulk around the bath, shower, and sink before painting. Fresh paint over cracked caulk looks immediately unfinished.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Wait 48 hours before using the shower.</strong> Paint feels dry in 2 hours but needs 48 hours to fully cure before exposure to steam. Using the shower too soon causes peeling.
          </p>

          {/* Internal links */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator — How Much Primer Do I Need? →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does it Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for a bathroom?</h3>
              <p className="text-gray-700">Most bathrooms need 1 to 1.5 gallons for two coats on the walls. A standard 8x6 bathroom needs about 0.9 gallons. Use the calculator above and enter your exact dimensions for a precise estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What paint finish is best for a bathroom?</h3>
              <p className="text-gray-700">Semi-gloss is the best finish for bathrooms. It resists moisture and humidity, wipes clean easily, and prevents mildew growth. Avoid flat or eggshell finishes — they peel in high-humidity bathrooms.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need special bathroom paint?</h3>
              <p className="text-gray-700">Yes — use a paint labelled for bathrooms or kitchens, or any paint with built-in mildewcide. Zinsser Perma-White, Behr Kitchen & Bath, and Sherwin-Williams Emerald Bath are all good choices.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres of paint for a bathroom?</h3>
              <p className="text-gray-700">A standard bathroom needs 3 to 5 litres for two coats. A small bathroom can be done with a single 2.5 litre tin. A larger bathroom needs a 5 litre tin.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does bathroom paint take to dry?</h3>
              <p className="text-gray-700">Bathroom paint feels dry in 1 to 2 hours. Wait 4 hours before a second coat. Wait 24 to 48 hours before using the shower to allow the paint to fully cure before steam exposure.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint the bathroom ceiling the same colour as the walls?</h3>
              <p className="text-gray-700">In small bathrooms, painting ceiling and walls the same colour makes the space feel larger and more cohesive. In larger bathrooms, a white ceiling is more common. Always use a moisture-resistant paint on bathroom ceilings.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}