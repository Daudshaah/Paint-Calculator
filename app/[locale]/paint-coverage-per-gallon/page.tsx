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
      ? 'https://thepaintcalculator.com/paint-coverage-per-gallon'
      : `https://thepaintcalculator.com/${locale}/paint-coverage-per-gallon`;
  return {
    title: 'Paint Coverage Per Gallon Explained | ThePaintCalculator.com',
    description: 'Everything you need to know about paint coverage per gallon. Why coverage rates vary, how to calculate accurately, and how to avoid buying too much or too little.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Coverage Per Gallon Explained',
      description: 'Everything you need to know about paint coverage per gallon. Why coverage rates vary, how to calculate accurately, and how to avoid buying too much or too little.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCoveragePerGallon({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Coverage Per Gallon","item":"https://thepaintcalculator.com/paint-coverage-per-gallon"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Why does the paint cover less than the tin says?","acceptedAnswer":{"@type":"Answer","text":"Tin coverage rates are ideal lab conditions on smooth surfaces. Real coverage is lower due to texture, surface porosity, application method, and waste. Use a conservative 350 sq ft/gal estimate for real projects."}},{"@type":"Question","name":"How do I calculate coverage for a textured wall?","acceptedAnswer":{"@type":"Answer","text":"Use 300 sq ft/gal for light orange-peel texture and 200–250 sq ft/gal for heavy knockdown or popcorn texture. Our calculator has a texture adjustment option."}},{"@type":"Question","name":"Does the paint finish affect coverage per gallon?","acceptedAnswer":{"@type":"Answer","text":"Slightly — flat paints cover 5–10% more per gallon than gloss. In practice, the difference is minor and 400 sq ft/gal is a reliable estimate for all finishes."}},{"@type":"Question","name":"Is premium paint worth the extra cost for coverage?","acceptedAnswer":{"@type":"Answer","text":"Yes — premium paints cover 400–450 sq ft/gal vs 300–350 for budget paints. Over a whole house, the extra coverage often means you need fewer cans, partly offsetting the higher price per gallon."}},{"@type":"Question","name":"What is the coverage rate for ceiling paint?","acceptedAnswer":{"@type":"Answer","text":"Ceiling paint covers 350–400 sq ft/gal on smooth ceilings. Popcorn or heavily textured ceilings reduce coverage to 200–250 sq ft/gal."}},{"@type":"Question","name":"How much does a 5 litre tin cover?","acceptedAnswer":{"@type":"Answer","text":"A 5 litre tin covers approximately 45 to 55 square metres (480 to 590 sq ft) on smooth walls per coat — roughly the walls of a standard bedroom."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Paint Coverage Per Gallon — Complete Explanation","description":"Why paint coverage per gallon varies and how to calculate accurately for any surface and project.","url":"https://thepaintcalculator.com/paint-coverage-per-gallon","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Paint Coverage Per Gallon</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Coverage Per Gallon Explained
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Standard paint coverage is <strong>400 square feet per gallon</strong> per coat on smooth interior walls. But real-world coverage varies significantly based on surface condition, texture, paint quality, and application method. Always calculate with realistic coverage rates for your specific surface.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">400 sq ft per gallon is the standard — but real coverage is often less</p>
          <p className="text-sm opacity-90">Surface texture, porosity, and paint quality all change coverage significantly</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Does Paint Coverage Per Gallon Mean?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Paint coverage per gallon is the area that one gallon of paint will cover with a single coat at the manufacturer's recommended application thickness. It is measured in square feet (US) or square metres (UK/EU).</p>
          <p className="text-gray-700 leading-relaxed mb-4">The coverage rate printed on the tin is measured under ideal laboratory conditions — smooth surface, perfect application, no waste. In real painting conditions, coverage is typically 10–30% lower than stated. Always use a conservative (lower) coverage estimate when calculating how much paint to buy.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Factors That Reduce Coverage Per Gallon</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Surface texture.</strong> The most significant factor. Every bump, ridge, and texture adds surface area that paint must cover. Lightly textured walls reduce coverage by 10–15%. Heavy knockdown or popcorn texture reduces coverage by 30–50%.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Surface porosity.</strong> Bare or unpainted surfaces absorb paint. New drywall, bare wood, and unpainted masonry can absorb 50–100% more paint than a previously painted surface.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Dark colours.</strong> Deep, saturated colours contain more pigment but are applied at the same film thickness — coverage is similar, but more coats may be needed for full opacity.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Application method.</strong> Brushes apply paint less efficiently than rollers. Airless sprayers can be efficient but generate overspray that wastes paint.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Paint quality.</strong> Budget paints contain more water and less pigment and resin — they cover less per gallon than premium paints.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Coverage Per Gallon for Common Paint Types</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Paint Type</th>
                <th className="px-4 py-3 text-left font-semibold">Typical Coverage</th>
                <th className="px-4 py-3 text-left font-semibold">Best Used For</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Premium interior latex</td><td className="px-4 py-3 text-gray-700">400–450 sq ft/gal</td><td className="px-4 py-3 text-gray-700">Walls, ceilings</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Standard interior latex</td><td className="px-4 py-3 text-gray-700">350–400 sq ft/gal</td><td className="px-4 py-3 text-gray-700">Walls, ceilings</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Budget interior latex</td><td className="px-4 py-3 text-gray-700">250–350 sq ft/gal</td><td className="px-4 py-3 text-gray-700">Low priority areas</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Exterior acrylic</td><td className="px-4 py-3 text-gray-700">300–400 sq ft/gal</td><td className="px-4 py-3 text-gray-700">Exterior walls</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Cabinet enamel</td><td className="px-4 py-3 text-gray-700">350–400 sq ft/gal</td><td className="px-4 py-3 text-gray-700">Cabinets, trim</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Masonry paint</td><td className="px-4 py-3 text-gray-700">100–200 sq ft/gal</td><td className="px-4 py-3 text-gray-700">Brick, stucco</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-does-a-gallon-cover`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does a Gallon of Paint Cover? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-brick-wall`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Brick Wall? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-stucco`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Stucco? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does the paint cover less than the tin says?</h3>
              <p className="text-gray-700">Tin coverage rates are ideal lab conditions on smooth surfaces. Real coverage is lower due to texture, surface porosity, application method, and waste. Use a conservative 350 sq ft/gal estimate for real projects.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I calculate coverage for a textured wall?</h3>
              <p className="text-gray-700">Use 300 sq ft/gal for light orange-peel texture and 200–250 sq ft/gal for heavy knockdown or popcorn texture. Our calculator has a texture adjustment option.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does the paint finish affect coverage per gallon?</h3>
              <p className="text-gray-700">Slightly — flat paints cover 5–10% more per gallon than gloss. In practice, the difference is minor and 400 sq ft/gal is a reliable estimate for all finishes.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is premium paint worth the extra cost for coverage?</h3>
              <p className="text-gray-700">Yes — premium paints cover 400–450 sq ft/gal vs 300–350 for budget paints. Over a whole house, the extra coverage often means you need fewer cans, partly offsetting the higher price per gallon.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the coverage rate for ceiling paint?</h3>
              <p className="text-gray-700">Ceiling paint covers 350–400 sq ft/gal on smooth ceilings. Popcorn or heavily textured ceilings reduce coverage to 200–250 sq ft/gal.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does a 5 litre tin cover?</h3>
              <p className="text-gray-700">A 5 litre tin covers approximately 45 to 55 square metres (480 to 590 sq ft) on smooth walls per coat — roughly the walls of a standard bedroom.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
