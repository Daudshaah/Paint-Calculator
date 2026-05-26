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
      ? 'https://thepaintcalculator.com/school-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/school-paint-calculator`;
  return {
    title: 'School Paint Calculator — How Much Paint for a School? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a school or educational facility. Free professional estimator for classrooms, corridors, and gymnasiums. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'School Paint Calculator — How Much Paint for a School?',
      description: 'Calculate exactly how much paint you need for a school or educational facility. Free professional estimator for classrooms, corridors, and gymnasiums. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function SchoolPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'School Paint Calculator', item: 'https://thepaintcalculator.com/school-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint does a classroom need?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 30×30 ft classroom needs 3 to 4 gallons for two coats on walls. Add ceilings and the total is 5 to 6 gallons per classroom. A 20-classroom school needs 150 to 200 gallons for all walls.' },
      },
      {
        '@type': 'Question',
        name: 'What paint is used in schools?',
        acceptedAnswer: { '@type': 'Answer', text: 'Zero-VOC paints are required for schools. Sherwin-Williams Harmony, Benjamin Moore Natura, and Behr Premium Plus Ultra zero VOC are the most common specifications. Eggshell for classrooms, satin for corridors.' },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to paint a school?',
        acceptedAnswer: { '@type': 'Answer', text: 'Professional school painting costs $1.50 to $3.50 per sq ft for interior walls. A 20-classroom primary school costs $80,000 to $200,000 for a full interior repaint including all spaces.' },
      },
      {
        '@type': 'Question',
        name: 'When should schools be painted?',
        acceptedAnswer: { '@type': 'Answer', text: 'Schools should be painted during summer holidays for minimum disruption and to allow adequate ventilation time. All painting must be completed and the building fully ventilated before students return.' },
      },
      {
        '@type': 'Question',
        name: 'What finish paint is best for school corridors?',
        acceptedAnswer: { '@type': 'Answer', text: 'Satin or semi-gloss finish for school corridors — it is highly washable and resists scuff marks from bags and equipment. Flat paint is not suitable for school corridors.' },
      },
      {
        '@type': 'Question',
        name: 'How often should schools be repainted?',
        acceptedAnswer: { '@type': 'Answer', text: 'Classrooms and corridors should be repainted every 5 to 7 years. High-traffic areas like corridors may need spot repainting every 2 to 3 years. Gymnasiums every 7 to 10 years.' },
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
            <li className="text-gray-700 font-medium">School Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            School Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 30×30 foot classroom needs <strong>8 to 12 gallons</strong> of paint for two coats on all walls. Add each space separately in the calculator for a complete school estimate. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">8 to 12 gallons per classroom</p>
          <p className="text-sm opacity-90">Standard 30x30ft classroom — two coats on walls — 9ft ceiling height</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Add each classroom, corridor, gymnasium, and bathroom separately in the calculator. School corridors are long and narrow — measure them carefully as they have a high wall-to-floor ratio.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a School Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            School painting projects are among the most complex commercial painting jobs due to the variety of spaces — classrooms, corridors, gymnasiums, cafeterias, bathrooms, offices, and stairwells — each with different size, ceiling height, and finish requirements.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 30×30 foot elementary school classroom with 9-foot ceilings has 720 square feet of wall area. Subtract two doors and several windows and the paintable wall area is approximately 550 to 600 square feet. At 350 square feet per gallon, two coats requires 3 to 4 gallons per classroom. Adding ceilings increases the total to 5 to 6 gallons per classroom.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            School corridors are the most paint-intensive spaces relative to their floor area. A 200-foot school corridor with 9-foot ceilings has 3,600 square feet of wall area — far more than the corridor floor area of 800 square feet. Always calculate corridor wall areas separately and accurately.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">School Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Space</th>
                  <th className="px-4 py-3 text-left font-semibold">Typical Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (2 coats walls)</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (walls + ceiling)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Classroom', '30×30 ft', '3–4 gal', '5–6 gal'],
                  ['Corridor 200ft long', '200×8 ft', '10–12 gal', '14–17 gal'],
                  ['Gymnasium', '80×100 ft', '35–45 gal', '55–70 gal'],
                  ['Cafeteria', '60×80 ft', '25–30 gal', '38–46 gal'],
                  ['Bathroom block', '20×30 ft', '4–5 gal', '6–7 gal'],
                  ['Whole primary school', '20 classrooms', '150–200 gal', '220–300 gal'],
                ].map(([space, size, walls, both], i) => (
                  <tr key={space} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{space}</td>
                    <td className="px-4 py-3 text-gray-700">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Schools</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Schools require extremely durable, washable, and low-VOC paints. Children are more sensitive to VOC exposure than adults, making zero-VOC paint specification critical for educational facilities. <strong>Sherwin-Williams Harmony</strong> (zero VOC, antimicrobial properties) is the most commonly specified school paint in the US. <strong>Benjamin Moore Natura</strong> and <strong>Behr Premium Plus Ultra</strong> zero VOC are equally popular alternatives.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            School corridors and high-traffic areas require a scrubbable semi-gloss or satin finish that withstands frequent cleaning and resists scuff marks. Classrooms typically use eggshell for a less institutional appearance while maintaining washability. Gymnasiums require specialised gymnasium wall paint that resists ball impacts and is not reflective.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">School Paint Colour Guidelines</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            School colour schemes balance stimulation and focus. Research suggests warm yellows and light greens in classrooms promote concentration and learning. Corridors are often painted in the school brand colours to create identity and wayfinding. High-contrast colour schemes at door frames and transitions help students with visual impairment navigate the building.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">School Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always use zero-VOC paint in schools.</strong> Children are significantly more sensitive to VOC exposure than adults. Zero-VOC paint is non-negotiable for any school painting project.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Schedule during school holidays.</strong> All school painting must be done during holidays or at minimum weekend periods to comply with health and safety requirements and avoid disrupting education.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use scrubbable paint in classrooms.</strong> Classroom walls are subject to heavy marking and cleaning. Specify a minimum eggshell finish in all classroom areas for adequate washability.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Allow full ventilation time.</strong> Even zero-VOC paints should be allowed 48 to 72 hours of full ventilation before classrooms are re-occupied by children.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/commercial-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Commercial Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/office-building-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Office Building Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/hotel-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Hotel Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-for-contractors`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator for Contractors →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint does a classroom need?', 'A standard 30×30 ft classroom needs 3 to 4 gallons for two coats on walls. Add ceilings and the total is 5 to 6 gallons per classroom. A 20-classroom school needs 150 to 200 gallons for all walls.'],
              ['What paint is used in schools?', 'Zero-VOC paints are required for schools. Sherwin-Williams Harmony, Benjamin Moore Natura, and Behr Premium Plus Ultra zero VOC are the most common specifications. Eggshell for classrooms, satin for corridors.'],
              ['How much does it cost to paint a school?', 'Professional school painting costs $1.50 to $3.50 per sq ft for interior walls. A 20-classroom primary school costs $80,000 to $200,000 for a full interior repaint including all spaces.'],
              ['When should schools be painted?', 'Schools should be painted during summer holidays for minimum disruption and to allow adequate ventilation time. All painting must be completed and the building fully ventilated before students return.'],
              ['What finish paint is best for school corridors?', 'Satin or semi-gloss finish for school corridors — it is highly washable and resists scuff marks from bags and equipment. Flat paint is not suitable for school corridors.'],
              ['How often should schools be repainted?', 'Classrooms and corridors should be repainted every 5 to 7 years. High-traffic areas like corridors may need spot repainting every 2 to 3 years. Gymnasiums every 7 to 10 years.'],
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
