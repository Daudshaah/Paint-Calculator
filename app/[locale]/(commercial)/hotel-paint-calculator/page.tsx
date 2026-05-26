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
      ? 'https://thepaintcalculator.com/hotel-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/hotel-paint-calculator`;
  return {
    title: 'Hotel Paint Calculator — How Much Paint for a Hotel? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a hotel including guest rooms, corridors, and public areas. Free professional estimator. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Hotel Paint Calculator — How Much Paint for a Hotel?',
      description: 'Calculate exactly how much paint you need for a hotel including guest rooms, corridors, and public areas. Free professional estimator. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function HotelPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Hotel Paint Calculator', item: 'https://thepaintcalculator.com/hotel-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint does a hotel room need?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12×18 ft guest room needs 2 to 3 gallons for two coats on walls. Add 1 gallon for the bathroom. A 100-room hotel needs 300 to 400 gallons for guest rooms alone plus corridors and public areas.' },
      },
      {
        '@type': 'Question',
        name: 'What paint do hotels use?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sherwin-Williams Duration Home and Benjamin Moore Aura are the most specified hotel paints. Satin finish for corridors and bathrooms, eggshell for guest rooms. Always scrubbable — never flat paint in guest-facing areas.' },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to paint a hotel?',
        acceptedAnswer: { '@type': 'Answer', text: 'Professional hotel painting costs $2 to $5 per sq ft. A 100-room hotel full repaint costs $150,000 to $400,000 including all guest rooms, corridors, and public areas.' },
      },
      {
        '@type': 'Question',
        name: 'How often do hotels repaint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Guest rooms are repainted every 5 to 7 years. Hotel corridors every 3 to 5 years due to heavy wear. Lobby and restaurant every 7 to 10 years. Regular touch-up maintenance extends time between full repaints.' },
      },
      {
        '@type': 'Question',
        name: 'Can hotels stay open during repainting?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — hotels typically repaint in rotation, completing 5 to 10 rooms per week during lower occupancy periods. Public areas are painted overnight or during closed periods.' },
      },
      {
        '@type': 'Question',
        name: 'What colour should hotel walls be?',
        acceptedAnswer: { '@type': 'Answer', text: 'Warm neutrals for guest rooms — beige, greige, and warm white create a welcoming calming environment. Brand colours feature in lobbies and corridors. Consistency across all guest rooms is essential for brand standards.' },
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
            <li className="text-gray-700 font-medium">Hotel Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hotel Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard hotel guest room needs <strong>2 to 3 gallons</strong> for two coats on all walls. For a full hotel project, add each room type separately in the calculator below. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 3 gallons per guest room</p>
          <p className="text-sm opacity-90">Standard hotel room 12×18ft — two coats on all walls — 8ft ceiling</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Add a standard guest room first, then use the room count to multiply up. Add corridors, lobby, restaurant, and bathrooms separately as they have different dimensions and finishes.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Hotel Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotel painting projects are large-scale commercial jobs that require careful planning by area. A typical 100-room hotel has approximately 100 guest rooms, 1,500 linear feet of corridors, a lobby, restaurant, bar, conference rooms, and back-of-house areas. Total paintable wall area in a 100-room hotel is typically 150,000 to 200,000 square feet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard hotel guest room measuring 12×18 feet with 8-foot ceilings has approximately 480 square feet of wall area. Subtract the bathroom door, entry door, and windows and the paintable wall area is around 350 to 380 square feet. At 350 square feet per gallon for two coats, each guest room needs 2 gallons of wall paint plus 1 gallon for the bathroom.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotel corridors are among the highest-traffic painted surfaces in any building and must use extremely durable scrubbable paint. A 200-foot hotel corridor with 8-foot ceilings has 3,200 square feet of wall area requiring 18 to 20 gallons for two coats of heavy-duty corridor paint.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Hotel Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Guest room (standard)', '12×18 ft', '2–3 gal', '8–11 L'],
                  ['Guest bathroom', '8×6 ft', '0.8–1 gal', '3–4 L'],
                  ['Suite', '20×30 ft', '4–5 gal', '15–19 L'],
                  ['Corridor per 100ft', '100×6 ft', '9–11 gal', '34–42 L'],
                  ['Hotel lobby', '40×60 ft', '18–22 gal', '68–83 L'],
                  ['50-room hotel (all areas)', 'Full property', '250–320 gal', '950–1,200 L'],
                ].map(([area, size, gal, lit], i) => (
                  <tr key={area} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{area}</td>
                    <td className="px-4 py-3 text-gray-700">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{gal}</td>
                    <td className="px-4 py-3 text-gray-700">{lit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Hotels</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotels require the most durable and washable paints available due to the constant cycle of guests and cleaning. <strong>Sherwin-Williams Duration Home</strong> and <strong>Benjamin Moore Aura Bath and Spa</strong> are among the most specified hotel guest room paints — both are highly washable, resist scuffs and marks, and maintain their appearance through hundreds of cleaning cycles.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotel corridors require the most durable paint in the entire property. Specify <strong>Sherwin-Williams Emerald</strong> or <strong>Benjamin Moore Aura</strong> in satin finish for all corridor walls — these premium paints withstand daily cleaning and frequent contact from luggage and housekeeping trolleys.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For hotel lobbies and restaurants, the aesthetic quality of the finish is as important as durability. Premium paints with excellent colour depth and a smooth finish are essential for public-facing areas of luxury and mid-scale hotels.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Hotel Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint rooms in rotation.</strong> Hotels rarely close for full repaints. Work with hotel management to paint rooms in rotation — typically 5 to 10 rooms per week during lower occupancy periods.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use consistent guest room colours.</strong> Standardise guest room colours across the property to simplify maintenance and touch-up. Keep paint records for every area including exact colour code and batch numbers.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Specify scrubbable finishes everywhere.</strong> Even in areas that appear low-traffic, hotel cleaning standards require scrubbable finishes. Never specify flat paint in any guest-facing area of a hotel.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Budget for frequent corridor repainting.</strong> Hotel corridors receive extreme wear and typically need repainting every 3 to 5 years. Guest rooms last 5 to 7 years with quality paint.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/commercial-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Commercial Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/office-building-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Office Building Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/school-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">School Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-for-contractors`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator for Contractors →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint does a hotel room need?', 'A standard 12×18 ft guest room needs 2 to 3 gallons for two coats on walls. Add 1 gallon for the bathroom. A 100-room hotel needs 300 to 400 gallons for guest rooms alone plus corridors and public areas.'],
              ['What paint do hotels use?', 'Sherwin-Williams Duration Home and Benjamin Moore Aura are the most specified hotel paints. Satin finish for corridors and bathrooms, eggshell for guest rooms. Always scrubbable — never flat paint in guest-facing areas.'],
              ['How much does it cost to paint a hotel?', 'Professional hotel painting costs $2 to $5 per sq ft. A 100-room hotel full repaint costs $150,000 to $400,000 including all guest rooms, corridors, and public areas.'],
              ['How often do hotels repaint?', 'Guest rooms are repainted every 5 to 7 years. Hotel corridors every 3 to 5 years due to heavy wear. Lobby and restaurant every 7 to 10 years. Regular touch-up maintenance extends time between full repaints.'],
              ['Can hotels stay open during repainting?', 'Yes — hotels typically repaint in rotation, completing 5 to 10 rooms per week during lower occupancy periods. Public areas are painted overnight or during closed periods.'],
              ['What colour should hotel walls be?', 'Warm neutrals for guest rooms — beige, greige, and warm white create a welcoming calming environment. Brand colours feature in lobbies and corridors. Consistency across all guest rooms is essential for brand standards.'],
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
