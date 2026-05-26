import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';
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
      ? 'https://thepaintcalculator.com/garage-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/garage-paint-calculator`;
  return {
    title: 'Garage Paint Calculator — How Much Paint for a Garage? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your garage walls, ceiling or floor. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Garage Paint Calculator — How Much Paint for a Garage?',
      description: 'Calculate exactly how much paint you need for your garage. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function GaragePaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Garage Paint Calculator', item: 'https://thepaintcalculator.com/garage-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a garage?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 2-car garage measuring 20x20 with 10ft ceilings needs about 3 to 4 gallons for two coats on the walls. A single car garage measuring 12x20 needs about 2 to 2.5 gallons for two coats.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a garage?',
        acceptedAnswer: { '@type': 'Answer', text: 'Satin or semi-gloss is best for garage walls. These finishes resist moisture, oil, and dirt, and are easy to wipe clean. Avoid flat paint in garages — it absorbs stains and cannot be scrubbed.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need special paint for a garage?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use a durable latex or masonry paint labelled for garages, workshops, or utility spaces. If your garage walls are bare concrete or cinder block, use a masonry paint or apply a masonry primer first before painting.' },
      },
      {
        '@type': 'Question',
        name: 'How much paint do I need for a garage floor?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 20x20 garage floor needs 2 to 3 gallons of epoxy floor paint for two coats. Use dedicated epoxy floor coating rather than regular paint — it bonds to concrete and resists oil, chemicals, and abrasion.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a garage?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard single car garage needs 7 to 10 litres for two coats on the walls. A two car garage needs 12 to 15 litres for two coats. Buy paint in 5 litre tins for best value.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint garage walls before or after the floor?',
        acceptedAnswer: { '@type': 'Answer', text: 'Always paint walls and ceiling before the floor. Any paint drips or roller spatters from the walls will land on the unpainted floor and can be covered by the floor coating. Painting the floor last protects it from damage during wall painting.' },
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
            <li className="text-gray-700 font-medium">Garage Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Garage Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 2-car garage needs <strong>3 to 4 gallons</strong> (12 to 15 litres) for two coats on the walls. Enter your garage dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">3 to 4 gallons (12 to 15 litres)</p>
          <p className="text-sm opacity-90">For a standard 20x20 two-car garage with 10ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Garage Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Garages are larger than most interior rooms and often have higher ceilings, which means they need significantly more paint than a standard bedroom or living room. A single car garage measuring 12x20 with 10ft ceilings has approximately 640 square feet of wall area before deductions. After deducting one large garage door and one entry door, the paintable wall area is around 520 square feet. At 400 square feet per gallon with two coats, that equals about 2.6 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard two-car garage measuring 20x20 with 10ft ceilings has approximately 800 square feet of gross wall area. After deducting two garage doors and one entry door, the paintable area is around 600 square feet — requiring about 3 gallons for two coats. Most homeowners buy 4 gallons to cover the ceiling and have extra for touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a single car garage needs 7 to 10 litres for two coats on the walls. A two car garage needs 12 to 15 litres. Buying paint in 5 litre tins gives the best value for garage projects.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Garage Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Garage Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats (walls)</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['10x20', 'Single car (small)', '2.0 gal', '~7.5 litres'],
                  ['12x20', 'Single car (standard)', '2.6 gal', '~10 litres'],
                  ['20x20', 'Two car (standard)', '3.2 gal', '~12 litres'],
                  ['22x22', 'Two car (large)', '3.8 gal', '~14 litres'],
                  ['24x24', 'Two car (oversized)', '4.2 gal', '~16 litres'],
                  ['24x36', 'Three car', '5.5 gal', '~21 litres'],
                ].map(([size, type, two, litres], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                    <td className="px-4 py-3 text-gray-700">{litres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Garage</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin or semi-gloss is the best finish for garage walls. Garages are exposed to moisture, oil splatter, exhaust fumes, and general dirt — satin and semi-gloss finishes resist staining and can be scrubbed clean. Semi-gloss also reflects more light which makes garages feel brighter and easier to work in.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Avoid flat or eggshell finishes in garages. They absorb oil and stains, cannot be scrubbed, and will look dirty within months of a garage being in regular use.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Garage Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If your garage walls are drywall or plywood, any durable interior latex paint in satin or semi-gloss finish will work. If your garage walls are bare concrete, cinder block, or masonry, you must use a masonry paint or apply a masonry primer before painting with standard latex.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Rust-Oleum Zinsser Watertite</strong> is the best choice for concrete and masonry garage walls — it waterproofs while painting. <strong>Behr Premium Plus Interior/Exterior</strong> in semi-gloss is a reliable all-purpose choice for drywalled garages. <strong>Sherwin-Williams Duration</strong> in satin is the premium option for maximum durability and washability.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Garage Floor Paint — How Much Do You Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Garage floor paint is a separate calculation from wall paint. A standard 20x20 garage floor has 400 square feet. Epoxy floor coatings typically cover 200 to 250 square feet per gallon, meaning a 20x20 floor needs 1.6 to 2 gallons per coat. For two coats, buy 3 to 4 gallons of epoxy floor coating.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always use dedicated epoxy floor coating for garage floors — never standard wall or ceiling paint. Epoxy bonds chemically to concrete and withstands oil, chemicals, abrasion, and heavy vehicle traffic. Standard paint will peel off a garage floor within weeks.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Garage</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean walls thoroughly before painting.</strong> Garage walls accumulate grease, oil, and exhaust deposits. Degrease with TSP cleaner and let dry fully before applying any paint or primer.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prime bare concrete and masonry.</strong> Never apply latex paint directly to unpainted concrete or cinder block without a masonry primer. The paint will flake off within months.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint walls before the floor.</strong> Always complete wall and ceiling painting before applying any floor coating. Drips and spatters from wall painting will be covered by the floor coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ventilate well during painting.</strong> Garages have limited airflow. Keep the garage door open and use a fan to exhaust fumes during and after painting.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy extra for concrete walls.</strong> Bare concrete and cinder block are highly porous and absorb the first coat heavily. Buy 20% more paint than calculated for bare masonry surfaces.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Ceiling Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a garage?', 'A standard 2-car garage needs 3 to 4 gallons for two coats on the walls. A single car garage needs about 2 to 2.5 gallons. Use the calculator above and enter your exact dimensions for a precise estimate.'],
              ['What paint finish is best for a garage?', 'Satin or semi-gloss is best for garage walls. These finishes resist moisture, oil, and dirt and are easy to wipe clean. Avoid flat paint in garages — it absorbs stains and cannot be scrubbed.'],
              ['Do I need special paint for a garage?', 'Use a durable latex or masonry paint for garages. If walls are bare concrete or cinder block, use masonry paint or apply a masonry primer before painting with standard latex.'],
              ['How much paint for a garage floor?', 'A standard 20x20 garage floor needs 3 to 4 gallons of epoxy floor coating for two coats. Always use dedicated epoxy floor coating — never standard wall paint on garage floors.'],
              ['How many litres of paint for a garage?', 'A single car garage needs 7 to 10 litres for two coats on the walls. A two car garage needs 12 to 15 litres. Buy paint in 5 litre tins for best value.'],
              ['Should I paint garage walls before or after the floor?', 'Always paint walls and ceiling before the floor. Drips and spatters from wall painting will be covered by the floor coating. Painting the floor last protects it from damage during wall painting.'],
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