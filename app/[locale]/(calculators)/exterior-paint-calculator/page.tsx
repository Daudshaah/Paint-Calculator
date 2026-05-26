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
      ? 'https://thepaintcalculator.com/exterior-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/exterior-paint-calculator`;
  return {
    title: 'Exterior Paint Calculator — How Much Paint to Paint a House? | ThePaintCalculator.com',
    description: 'Calculate exactly how much exterior paint you need to paint your house. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Exterior Paint Calculator — How Much Paint to Paint a House?',
      description: 'Calculate exactly how much exterior paint you need. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function ExteriorPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Exterior Paint Calculator', item: 'https://thepaintcalculator.com/exterior-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need to paint the exterior of a house?',
        acceptedAnswer: { '@type': 'Answer', text: 'A typical 2,000 square foot two-story house needs 10 to 15 gallons for two coats on the siding. A smaller single-story ranch house needs 6 to 8 gallons. Use the calculator above for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best exterior paint finish?',
        acceptedAnswer: { '@type': 'Answer', text: 'Satin is the most popular exterior finish for siding. Semi-gloss is best for trim, doors, and shutters as it highlights architectural details and is highly washable.' },
      },
      {
        '@type': 'Question',
        name: 'How long does exterior paint last?',
        acceptedAnswer: { '@type': 'Answer', text: 'Quality exterior paint lasts 7 to 10 years on wood siding, 10 to 15 years on fiber cement, and 15 to 20 years on masonry. Cheap exterior paint may only last 3 to 5 years.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a 2000 sq ft house exterior?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 2,000 square foot house needs 10 to 12 gallons for two coats on the siding. Add another 2 to 3 gallons for trim and doors.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need to prime before exterior painting?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes in most cases. Bare wood, previously unpainted surfaces, and surfaces being changed from dark to light all require primer before applying exterior topcoats.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best exterior paint brand?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sherwin-Williams Emerald Exterior, Benjamin Moore Aura Exterior, and Behr Marquee Exterior are the top three premium options. For best value, Behr Premium Plus Exterior at around $45 per gallon is a reliable mid-range choice.' },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Exterior Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Exterior Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A typical house exterior needs <strong>10 to 15 gallons</strong> (38 to 57 litres) for two coats on the siding. Enter each wall as a separate room in the calculator below for a precise estimate. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">10 to 15 gallons (38 to 57 litres)</p>
          <p className="text-sm opacity-90">For a typical 2,000 sq ft two-story house — two coats on siding</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Click the <strong>Exterior</strong> tab in the calculator below. Add each wall as a separate room for the most accurate estimate.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a House Exterior Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Exterior paint quantities depend on the size of your home, the surface material, and how many coats you apply. A typical single-story ranch house measuring 40x30 feet has approximately 1,120 square feet of exterior wall area before deducting windows and doors. After deductions, the paintable siding area is around 900 square feet. At 300 to 350 square feet per gallon on rough wood siding with two coats, that equals 5 to 6 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A two-story colonial measuring 40x30 feet has approximately 2,240 square feet of exterior wall area. After deductions, the paintable area is around 1,800 square feet — requiring 10 to 12 gallons for two coats on the siding. Add another 2 to 3 gallons for trim, shutters, and doors in a contrasting colour.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Rough surfaces like wood shingles, textured stucco, and brick absorb significantly more paint than smooth surfaces. Reduce your coverage estimate by 20 to 30% for highly textured exterior surfaces. Smooth fiber cement and hardboard siding can achieve 350 to 400 square feet per gallon.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Exterior Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">House Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Stories</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats Siding</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1,000 sq ft', 'Single story', '5–6 gal', '~19–23 litres'],
                  ['1,500 sq ft', 'Single story', '7–9 gal', '~26–34 litres'],
                  ['2,000 sq ft', 'Two story', '10–12 gal', '~38–45 litres'],
                  ['2,500 sq ft', 'Two story', '12–15 gal', '~45–57 litres'],
                  ['3,000 sq ft', 'Two story', '15–18 gal', '~57–68 litres'],
                ].map(([size, stories, two, litres], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{stories}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                    <td className="px-4 py-3 text-gray-700">{litres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Exterior Paint Finish</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is the most popular finish for exterior siding. It resists dirt, mildew, and moisture, and holds up to UV exposure and weathering better than flat exterior paint. Semi-gloss is the standard finish for exterior trim, doors, shutters, and architectural details — it highlights these elements and provides maximum washability on high-contact surfaces.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Flat exterior paint is used on rough masonry, stucco, and brick where a non-reflective finish is preferred. Flat hides surface imperfections better than satin but is less washable and more susceptible to mildew over time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Exterior Paint Brands</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams Emerald Exterior</strong> at around $92 per gallon is the premium choice with exceptional hide, fade resistance, and a lifetime warranty against peeling. <strong>Benjamin Moore Aura Exterior</strong> at around $85 per gallon offers the best colour accuracy and fade resistance. <strong>Behr Marquee Exterior</strong> at around $55 per gallon is the best value premium option available at Home Depot.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For mid-range projects, <strong>Sherwin-Williams Duration Exterior</strong> at around $75 per gallon and <strong>Behr Premium Plus Exterior</strong> at around $45 per gallon both offer excellent durability. Avoid budget exterior paints under $25 per gallon — the savings are quickly offset by shorter lifespan and the cost of repainting sooner.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Exterior Paint Colours in 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Greige remains the most popular exterior house colour in North America. <strong>Sherwin-Williams Accessible Beige (SW 7036)</strong> and <strong>Benjamin Moore Revere Pewter (HC-172)</strong> are the two most widely used exterior colours for suburban homes.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bold colours are trending strongly in 2026. Deep navy like <strong>Sherwin-Williams Trending Navy (SW 9176)</strong>, forest greens like <strong>Sherwin-Williams Hunt Club (SW 6468)</strong>, and near-black like <strong>Sherwin-Williams Tricorn Black (SW 6258)</strong> are all growing in popularity for homes seeking strong curb appeal.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a House Exterior</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Check the weather forecast.</strong> Never paint when rain is forecast within 24 hours, temperatures are below 50°F (10°C) or above 90°F (32°C), or in direct hot sunlight.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Power wash before painting.</strong> Clean all surfaces with a pressure washer. Dirt, mildew, and chalky old paint prevent adhesion and cause premature peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always prime bare wood.</strong> Any bare or exposed wood must be primed with an exterior primer before painting. Unprimed wood causes rapid peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Caulk all gaps before painting.</strong> Caulk around windows, doors, and trim before painting. Uncaulked gaps allow water infiltration and cause paint failure.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint top to bottom.</strong> Start with soffits and fascia, then walls, then trim. Drips fall onto unpainted surfaces below.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy 15% extra for rough surfaces.</strong> Wood shingles, textured stucco, and rough masonry absorb significantly more paint than smooth surfaces.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Garage Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/basement-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Basement Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Ceiling Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need to paint a house exterior?', 'A typical 2,000 sq ft two-story house needs 10 to 12 gallons for two coats on the siding. A smaller single-story ranch needs 5 to 6 gallons. Add 2 to 3 gallons for trim and doors.'],
              ['What is the best exterior paint finish?', 'Satin for siding and walls, semi-gloss for trim, doors, and shutters. Satin resists dirt and mildew. Semi-gloss is highly washable on high-contact surfaces.'],
              ['How long does exterior paint last?', 'Quality exterior paint lasts 7 to 10 years on wood siding, 10 to 15 years on fiber cement, and 15 to 20 years on masonry. Premium paint lasts significantly longer than budget options.'],
              ['How many gallons for a 2000 sq ft house exterior?', 'A 2,000 sq ft house needs 10 to 12 gallons for two coats on the siding. Add 2 to 3 gallons for trim and doors. Buy 15% extra for rough wood shingles or textured stucco.'],
              ['Do I need to prime before exterior painting?', 'Yes in most cases. Bare wood, stained surfaces, and surfaces changing from dark to light all require exterior primer for best adhesion and durability.'],
              ['What is the best exterior paint brand?', 'Sherwin-Williams Emerald Exterior, Benjamin Moore Aura Exterior, and Behr Marquee Exterior are the top three premium options. Behr Premium Plus Exterior at $45 per gallon is the best mid-range value.'],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-700">{a}</p>
              </div>
            ))}
          </div>

        </article>
      </div>
    </main>
  );
}