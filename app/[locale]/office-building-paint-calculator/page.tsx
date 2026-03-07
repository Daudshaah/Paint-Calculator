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
      ? 'https://thepaintcalculator.com/office-building-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/office-building-paint-calculator`;
  return {
    title: 'Office Building Paint Calculator — How Much Paint for an Office Building? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for an office building interior. Free professional estimator for multi-floor office projects. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Office Building Paint Calculator — How Much Paint for an Office Building?',
      description: 'Calculate exactly how much paint you need for an office building interior. Free professional estimator for multi-floor office projects. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function OfficeBuildingPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Office Building Paint Calculator', item: 'https://thepaintcalculator.com/office-building-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint does an office building need?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 1,000 sq ft office suite needs 8 to 10 gallons for two coats on walls. A full 5,000 sq ft office floor needs 40 to 50 gallons. Add each floor separately in the calculator for multi-floor buildings.' },
      },
      {
        '@type': 'Question',
        name: 'What paint is used in office buildings?',
        acceptedAnswer: { '@type': 'Answer', text: 'Low-VOC or zero-VOC paints are standard for office buildings. Sherwin-Williams Harmony and Benjamin Moore Natura are the most commonly specified. Eggshell for offices, satin for corridors, semi-gloss for bathrooms.' },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to paint an office building?',
        acceptedAnswer: { '@type': 'Answer', text: 'Professional office interior painting costs $1.50 to $4 per sq ft. A 10,000 sq ft office floor costs $15,000 to $40,000 professionally painted including labour and materials.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint an office building?',
        acceptedAnswer: { '@type': 'Answer', text: 'A professional crew of 4 painters covers approximately 3,000 to 4,000 sq ft of walls per day. A 10-floor office building takes 2 to 4 weeks depending on crew size and access.' },
      },
      {
        '@type': 'Question',
        name: 'What colour should office walls be?',
        acceptedAnswer: { '@type': 'Answer', text: 'Warm neutrals are most common — Sherwin-Williams Agreeable Gray, Benjamin Moore Pale Oak, and Sherwin-Williams Accessible Beige. Brand accent colours work well in reception and feature walls.' },
      },
      {
        '@type': 'Question',
        name: 'Do offices need low-VOC paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most commercial building standards and LEED certification require low-VOC or zero-VOC paints. Even without certification requirements, low-VOC paint is recommended to minimise health impacts on building occupants.' },
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
            <li className="text-gray-700 font-medium">Office Building Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Office Building Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 1,000 square foot office suite needs <strong>8 to 10 gallons</strong> for two coats on all walls. For multi-floor buildings, add each floor separately in the calculator below. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">8 to 10 gallons per 1,000 sq ft of office space</p>
          <p className="text-sm opacity-90">Interior walls — two coats — standard 9ft ceiling height</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Add each floor or zone as a separate room in the calculator — open plan areas, private offices, corridors, reception, bathrooms. The calculator totals everything automatically.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does an Office Building Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Office building paint estimation requires breaking the building into zones — open plan areas, private offices, corridors, reception and lobby, bathrooms, and stairwells. Each zone has different surface areas and often different finish requirements. A systematic room-by-room approach prevents costly under or over-ordering on large projects.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A typical open plan office floor of 5,000 square feet with 9-foot ceilings has approximately 4,000 square feet of perimeter wall area plus interior partition walls. Total paintable wall area for a standard open plan floor is typically 150 to 200% of the floor area — 7,500 to 10,000 square feet of wall area on a 5,000 square foot floor.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Corridors and stairwells have a higher wall-to-floor ratio than open plan areas. A 4-foot wide corridor with 9-foot ceilings has 18 square feet of wall per linear foot — far more wall area relative to floor space than an open office. Always calculate corridor and stairwell wall areas separately.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Office Building Paint Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Office Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Floors</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls + Ceilings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Small suite 500 sq ft', '1', '4–5 gal', '6–8 gal'],
                  ['Office suite 1,000 sq ft', '1', '8–10 gal', '12–15 gal'],
                  ['Office floor 5,000 sq ft', '1', '40–50 gal', '60–75 gal'],
                  ['Office floor 10,000 sq ft', '1', '80–100 gal', '120–150 gal'],
                  ['3-floor building 15,000 sq ft', '3', '120–150 gal', '180–220 gal'],
                  ['5-floor building 25,000 sq ft', '5', '200–250 gal', '300–375 gal'],
                ].map(([size, floors, walls, both], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{floors}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Office Buildings</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Office buildings are typically specified with low-VOC or zero-VOC paints to comply with indoor air quality requirements and LEED certification standards. <strong>Sherwin-Williams Harmony Interior Latex</strong> (zero VOC, antimicrobial) and <strong>Benjamin Moore Natura</strong> (zero VOC) are the most commonly specified commercial office paints in North America.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For high-traffic areas like corridors and reception, use a scrubbable satin finish that withstands regular cleaning. Private offices and conference rooms can use eggshell for a more refined appearance. All bathrooms and any kitchen or breakroom areas should use semi-gloss for maximum moisture and stain resistance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Office Building Paint Colour Strategy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Modern office design typically uses a neutral base colour throughout common areas with brand accent colours in reception and feature walls. Warm whites and light greiges dominate office colour specifications — <strong>Sherwin-Williams Accessible Beige</strong>, <strong>Benjamin Moore Pale Oak</strong>, and <strong>Sherwin-Williams Agreeable Gray</strong> are the most commonly specified office wall colours.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Office Building Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint outside business hours.</strong> Schedule all painting during evenings and weekends to avoid VOC exposure for building occupants and disruption to business operations.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Protect IT equipment and furniture.</strong> Cover all computer equipment, server rooms, and furniture with dust sheets before painting. Paint dust and fumes damage electronic equipment.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use consistent colour throughout floors.</strong> Specify one neutral colour for all common areas on each floor to simplify future touch-up maintenance. Keep records of exact paint colour and batch for each area.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Allow 24 to 48 hours ventilation before occupation.</strong> Even low-VOC paints require adequate ventilation time before the space is occupied. Maximise fresh air ventilation after painting.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/commercial-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Commercial Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/warehouse-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Warehouse Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/school-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">School Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-for-contractors`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator for Contractors →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint does an office building need?', 'A 1,000 sq ft office suite needs 8 to 10 gallons for two coats on walls. A full 5,000 sq ft office floor needs 40 to 50 gallons. Add each floor separately in the calculator for multi-floor buildings.'],
              ['What paint is used in office buildings?', 'Low-VOC or zero-VOC paints are standard for office buildings. Sherwin-Williams Harmony and Benjamin Moore Natura are the most commonly specified. Eggshell for offices, satin for corridors, semi-gloss for bathrooms.'],
              ['How much does it cost to paint an office building?', 'Professional office interior painting costs $1.50 to $4 per sq ft. A 10,000 sq ft office floor costs $15,000 to $40,000 professionally painted including labour and materials.'],
              ['How long does it take to paint an office building?', 'A professional crew of 4 painters covers approximately 3,000 to 4,000 sq ft of walls per day. A 10-floor office building takes 2 to 4 weeks depending on crew size and access.'],
              ['What colour should office walls be?', 'Warm neutrals are most common — Sherwin-Williams Agreeable Gray, Benjamin Moore Pale Oak, and Sherwin-Williams Accessible Beige. Brand accent colours work well in reception and feature walls.'],
              ['Do offices need low-VOC paint?', 'Most commercial building standards and LEED certification require low-VOC or zero-VOC paints. Even without certification requirements, low-VOC paint is recommended to minimise health impacts on building occupants.'],
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
