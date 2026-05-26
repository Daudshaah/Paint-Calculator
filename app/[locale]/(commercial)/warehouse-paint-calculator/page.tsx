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
      ? 'https://thepaintcalculator.com/warehouse-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/warehouse-paint-calculator`;
  return {
    title: 'Warehouse Paint Calculator — How Much Paint for a Warehouse? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a warehouse including walls, floors, and high bay ceilings. Free professional estimator. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Warehouse Paint Calculator — How Much Paint for a Warehouse?',
      description: 'Calculate exactly how much paint you need for a warehouse including walls, floors, and high bay ceilings. Free professional estimator. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function WarehousePaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Warehouse Paint Calculator', item: 'https://thepaintcalculator.com/warehouse-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint does a warehouse need?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 10,000 sq ft warehouse with 20ft ceilings needs 50 to 60 gallons for walls (two coats) plus 80 to 100 gallons of epoxy floor coating. Always prime concrete block walls first with block filler.' },
      },
      {
        '@type': 'Question',
        name: 'What paint is used on warehouse walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Concrete block walls need a block filler primer first, then flat white latex topcoat. Sherwin-Williams ProMar 200 flat white is the most common warehouse wall paint. White maximises light reflection.' },
      },
      {
        '@type': 'Question',
        name: 'How do you paint a warehouse floor?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use a two-part epoxy floor coating. Mechanically prepare the floor first by grinding or shot-blasting. Apply two coats of epoxy at 200 to 250 sq ft per gallon. Allow 3 to 5 days full cure before forklift traffic.' },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to paint a warehouse?',
        acceptedAnswer: { '@type': 'Answer', text: 'Professional warehouse painting costs $0.50 to $2 per sq ft for walls and $2 to $5 per sq ft for epoxy floor coating. A 10,000 sq ft warehouse costs $25,000 to $60,000 for a full repaint including floors.' },
      },
      {
        '@type': 'Question',
        name: 'How long does warehouse paint last?',
        acceptedAnswer: { '@type': 'Answer', text: 'Quality warehouse wall paint lasts 5 to 10 years. Epoxy floor coatings last 3 to 7 years under forklift traffic. High-traffic floor areas may need recoating every 2 to 3 years.' },
      },
      {
        '@type': 'Question',
        name: 'Do warehouse walls need primer?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — concrete block walls always need block filler primer. Without primer, bare concrete block absorbs enormous amounts of topcoat paint and will never achieve a uniform finish.' },
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
            <li className="text-gray-700 font-medium">Warehouse Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Warehouse Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 10,000 square foot warehouse needs <strong>50 to 80 gallons</strong> of paint for walls and floor markings. Enter your warehouse dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">50 to 80 gallons for a 10,000 sq ft warehouse</p>
          <p className="text-sm opacity-90">Walls and floor markings — two coats — standard 20ft ceiling height</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Use the <strong>Add Room</strong> button to add the main warehouse floor area, then add office areas and bathrooms separately. Enter ceiling height accurately — warehouse ceilings are typically 18 to 30 feet high.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Warehouse Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Warehouse painting is more complex than standard commercial painting because of high ceilings, large uninterrupted wall areas, and specialised floor coatings. A standard 10,000 square foot warehouse with 20-foot ceilings has approximately 8,000 square feet of wall area on four sides. At 300 to 350 square feet per gallon on concrete block walls, two coats requires 45 to 55 gallons for walls alone.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Warehouse floors typically require epoxy floor coating rather than standard paint. Epoxy floor coatings cover 200 to 250 square feet per gallon and require two coats for full durability. A 10,000 square foot warehouse floor needs 80 to 100 gallons of epoxy coating for two coats — the floor coating is usually the largest single material cost in a warehouse painting project.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Floor safety markings — aisle lines, hazard zones, loading areas — use traffic marking paint at 200 to 300 linear feet per gallon for 4-inch wide lines. A fully marked warehouse with 500 linear feet of aisle markings and safety zones needs 2 to 3 gallons of traffic marking paint.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Warehouse Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Warehouse Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Ceiling Height</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">Floor Epoxy (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['5,000 sq ft', '16 ft', '25–30 gal', '40–50 gal'],
                  ['10,000 sq ft', '20 ft', '50–60 gal', '80–100 gal'],
                  ['20,000 sq ft', '24 ft', '90–110 gal', '160–200 gal'],
                  ['50,000 sq ft', '30 ft', '220–270 gal', '400–500 gal'],
                  ['Small unit 2,500 sq ft', '12 ft', '12–15 gal', '20–25 gal'],
                  ['Industrial unit 7,500 sq ft', '18 ft', '35–45 gal', '60–75 gal'],
                ].map(([size, ceiling, walls, floor], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{ceiling}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{floor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Warehouses</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Warehouse walls are typically concrete block (CMU) or metal panels. Concrete block requires a block filler primer before painting to seal the porous surface and reduce paint consumption significantly. Without block filler, bare concrete block absorbs 100 to 150 square feet per gallon — with block filler, subsequent coats achieve 300 to 350 square feet per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams PrepRite Block Filler</strong> is the standard primer for concrete block walls. For topcoats, <strong>Sherwin-Williams ProMar 200</strong> flat white is the most common warehouse wall paint. White walls maximise light reflection in warehouse environments reducing lighting energy costs.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For warehouse floors, <strong>Rust-Oleum EpoxyShield Professional Floor Coating</strong> and <strong>Sherwin-Williams ArmorSeal Tread-Plex</strong> are the most durable options. Both are two-part epoxy systems that resist forklift traffic, oil spills, and chemical exposure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Warehouse Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prime concrete block before painting.</strong> Apply a block filler primer to all bare concrete block walls. This is the single most important step for warehouse painting — without it you will use 3 times more topcoat paint.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use an airless sprayer for large walls.</strong> Rolling warehouse walls is extremely slow. An airless sprayer covers 10 to 15 times faster than rolling for large uninterrupted wall areas.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prepare floors thoroughly before epoxy coating.</strong> Warehouse floors must be mechanically prepared — ground or shot-blasted — before epoxy coating. Epoxy applied to unprepared concrete delaminate within months.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Paint floor markings last.</strong> Apply all floor epoxy coating first, allow full cure (3 to 5 days), then apply traffic marking paint for aisle lines and safety zones.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/commercial-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Commercial Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/industrial-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Industrial Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-for-contractors`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator for Contractors →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint does a warehouse need?', 'A 10,000 sq ft warehouse with 20ft ceilings needs 50 to 60 gallons for walls (two coats) plus 80 to 100 gallons of epoxy floor coating. Always prime concrete block walls first with block filler.'],
              ['What paint is used on warehouse walls?', 'Concrete block walls need a block filler primer first, then flat white latex topcoat. Sherwin-Williams ProMar 200 flat white is the most common warehouse wall paint. White maximises light reflection.'],
              ['How do you paint a warehouse floor?', 'Use a two-part epoxy floor coating. Mechanically prepare the floor first by grinding or shot-blasting. Apply two coats of epoxy at 200 to 250 sq ft per gallon. Allow 3 to 5 days full cure before forklift traffic.'],
              ['How much does it cost to paint a warehouse?', 'Professional warehouse painting costs $0.50 to $2 per sq ft for walls and $2 to $5 per sq ft for epoxy floor coating. A 10,000 sq ft warehouse costs $25,000 to $60,000 for a full repaint including floors.'],
              ['How long does warehouse paint last?', 'Quality warehouse wall paint lasts 5 to 10 years. Epoxy floor coatings last 3 to 7 years under forklift traffic. High-traffic floor areas may need recoating every 2 to 3 years.'],
              ['Do warehouse walls need primer?', 'Yes — concrete block walls always need block filler primer. Without primer, bare concrete block absorbs enormous amounts of topcoat paint and will never achieve a uniform finish.'],
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
