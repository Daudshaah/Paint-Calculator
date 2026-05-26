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
      ? 'https://thepaintcalculator.com/how-to-calculate-paint-for-a-room'
      : `https://thepaintcalculator.com/${locale}/how-to-calculate-paint-for-a-room`;
  return {
    title: 'How to Calculate Paint for a Room | ThePaintCalculator.com',
    description: 'Learn exactly how to calculate how much paint you need for any room. Step-by-step formula, worked examples, and a free calculator. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How to Calculate Paint for a Room',
      description: 'Learn exactly how to calculate how much paint you need for any room. Step-by-step formula, worked examples, and a free calculator. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function HowToCalculatePaint({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How to Calculate Paint for a Room","item":"https://thepaintcalculator.com/how-to-calculate-paint-for-a-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the formula for calculating paint?","acceptedAnswer":{"@type":"Answer","text":"(Perimeter × Ceiling Height) − (20 sq ft per door + 15 sq ft per window) = Paintable Area. Divide by 400 for gallons per coat. Multiply by number of coats."}},{"@type":"Question","name":"How do I calculate paint for an irregular room?","acceptedAnswer":{"@type":"Answer","text":"Measure each wall individually, multiply each wall's length by the ceiling height, add all walls together, then subtract doors and windows. Use the calculator above for accurate results."}},{"@type":"Question","name":"Does ceiling height affect how much paint I need?","acceptedAnswer":{"@type":"Answer","text":"Yes significantly. A room with 9ft ceilings needs 12.5% more wall paint than the same footprint with 8ft ceilings. Always use your actual ceiling height in calculations."}},{"@type":"Question","name":"Should I round up my paint calculation?","acceptedAnswer":{"@type":"Answer","text":"Always round up to the nearest half gallon. Running out of paint mid-wall forces a second store trip and risks a slight colour mismatch between batches."}},{"@type":"Question","name":"How accurate is the paint calculator?","acceptedAnswer":{"@type":"Answer","text":"The calculator is accurate for standard rooms with flat walls. It accounts for doors, windows, ceiling height, number of coats, and surface condition for a precise estimate."}},{"@type":"Question","name":"How much extra paint should I buy?","acceptedAnswer":{"@type":"Answer","text":"Add 10% to your calculated total for touch-ups. Keep leftover paint sealed and labelled — it stays usable for 2–5 years and is invaluable for future spot repairs."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"How to Calculate Paint for a Room","description":"Step-by-step guide to calculating exactly how much paint you need for any room size.","url":"https://thepaintcalculator.com/how-to-calculate-paint-for-a-room","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">How to Calculate Paint for a Room</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How to Calculate Paint for a Room
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `To calculate paint for a room: <strong>measure the perimeter × ceiling height</strong>, subtract 20 sq ft per door and 15 sq ft per window, then divide by 400. That gives you gallons per coat — double it for two coats.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Measure wall area, subtract doors & windows, divide by 400</p>
          <p className="text-sm opacity-90">The paint calculation formula every DIY painter needs</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">The Paint Calculation Formula</h2>
          <p className="text-gray-700 leading-relaxed mb-4">The formula for calculating interior wall paint is straightforward: <strong>(Room Perimeter × Ceiling Height) − Deductions = Paintable Wall Area</strong>. Divide the result by 400 (the standard coverage rate per gallon) to get gallons per coat. Multiply by your number of coats for the total.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Standard deductions are 20 square feet per standard door and 15 square feet per medium window. Large windows and double doors need larger deductions — use 30 sq ft for a patio door or picture window.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For example: a 12×14 room with 8ft ceilings has a perimeter of 52ft. 52 × 8 = 416 sq ft gross. Subtract one door (20 sq ft) and two windows (30 sq ft) = 366 sq ft net. Divide by 400 = 0.92 gallons per coat. For two coats: 1.84 gallons — buy 2 gallons.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Calculation — Step by Step</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Step 1: Measure your room.</strong> Measure the length and width of the room in feet. Add all four wall lengths together to get the perimeter. Multiply by the ceiling height.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Step 2: Deduct doors and windows.</strong> Subtract 20 sq ft for each standard door and 15 sq ft for each medium window. Skip deductions if you want a conservative (slightly generous) estimate.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Step 3: Divide by coverage rate.</strong> Standard paint covers 350–400 sq ft per gallon. Divide your net wall area by 400 for a standard estimate. Use 350 for textured walls or porous surfaces.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Step 4: Multiply by coats.</strong> Two coats are standard. Multiply your single-coat result by 2 for the total gallons needed.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Step 5: Round up.</strong> Always round up to the nearest half gallon. Having slightly too much paint is far better than running short mid-wall.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Calculation Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Room Size</th>
                <th className="px-4 py-3 text-left font-semibold">Wall Area</th>
                <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">10×10</td><td className="px-4 py-3 text-gray-700">~285 sq ft</td><td className="px-4 py-3 text-gray-700">0.75 gal</td><td className="px-4 py-3 text-gray-700">1.4 gal</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">12×14</td><td className="px-4 py-3 text-gray-700">~366 sq ft</td><td className="px-4 py-3 text-gray-700">0.92 gal</td><td className="px-4 py-3 text-gray-700">1.84 gal</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">14×16</td><td className="px-4 py-3 text-gray-700">~430 sq ft</td><td className="px-4 py-3 text-gray-700">1.1 gal</td><td className="px-4 py-3 text-gray-700">2.2 gal</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">15×20</td><td className="px-4 py-3 text-gray-700">~575 sq ft</td><td className="px-4 py-3 text-gray-700">1.44 gal</td><td className="px-4 py-3 text-gray-700">2.9 gal</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Factors That Change Your Paint Calculation</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ceiling height.</strong> Standard calculations assume 8ft ceilings. For 9ft ceilings add 12.5% more paint. For 10ft ceilings add 25%.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Surface texture.</strong> Textured walls absorb more paint. Use 300 sq ft per gallon instead of 400 for orange-peel or knockdown texture.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Colour change.</strong> Going from a very light to very dark colour (or vice versa) typically requires a third coat for full opacity. Add 50% to your estimate.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Paint quality.</strong> Budget paints cover less — around 300–350 sq ft per gallon. Premium paints can cover 400–450 sq ft per gallon. Always check the label for the manufacturer's stated coverage rate.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-living-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Living Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-to-cover-500-sq-ft`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint to Cover 500 Sq Ft? →</Link></li>
            <li><Link href={`/${locale}/how-many-gallons-of-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Gallons of Paint for a Room? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the formula for calculating paint?</h3>
              <p className="text-gray-700">(Perimeter × Ceiling Height) − (20 sq ft per door + 15 sq ft per window) = Paintable Area. Divide by 400 for gallons per coat. Multiply by number of coats.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I calculate paint for an irregular room?</h3>
              <p className="text-gray-700">Measure each wall individually, multiply each wall's length by the ceiling height, add all walls together, then subtract doors and windows. Use the calculator above for accurate results.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does ceiling height affect how much paint I need?</h3>
              <p className="text-gray-700">Yes significantly. A room with 9ft ceilings needs 12.5% more wall paint than the same footprint with 8ft ceilings. Always use your actual ceiling height in calculations.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I round up my paint calculation?</h3>
              <p className="text-gray-700">Always round up to the nearest half gallon. Running out of paint mid-wall forces a second store trip and risks a slight colour mismatch between batches.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is the paint calculator?</h3>
              <p className="text-gray-700">The calculator is accurate for standard rooms with flat walls. It accounts for doors, windows, ceiling height, number of coats, and surface condition for a precise estimate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much extra paint should I buy?</h3>
              <p className="text-gray-700">Add 10% to your calculated total for touch-ups. Keep leftover paint sealed and labelled — it stays usable for 2–5 years and is invaluable for future spot repairs.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
