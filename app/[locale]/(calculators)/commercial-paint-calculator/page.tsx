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
      ? 'https://thepaintcalculator.com/commercial-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/commercial-paint-calculator`;
  return {
    title: 'Commercial Paint Calculator — Professional Paint Estimating for Commercial Projects | ThePaintCalculator.com',
    description: 'Calculate paint quantities for commercial painting projects including offices, retail, and multi-unit buildings. Free professional paint estimator. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Commercial Paint Calculator — Professional Paint Estimating for Commercial Projects',
      description: 'Calculate paint quantities for commercial painting projects including offices, retail, and multi-unit buildings. Free professional paint estimator. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function CommercialPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Commercial Paint Calculator', item: 'https://thepaintcalculator.com/commercial-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you calculate paint for a commercial building?',
        acceptedAnswer: { '@type': 'Answer', text: 'Measure total wall area per zone, subtract doors and windows, divide by 350 to 400 sq ft per gallon, multiply by number of coats, then add 10 to 15% waste. Use the calculator above and add each zone separately.' },
      },
      {
        '@type': 'Question',
        name: 'How much paint does a 5,000 sq ft office need?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 5,000 sq ft office floor needs 40 to 50 gallons for two coats on walls. Add another 20 to 30 gallons if painting ceilings. Buy in 5-gallon buckets for commercial projects.' },
      },
      {
        '@type': 'Question',
        name: 'What paint is used in commercial buildings?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sherwin-Williams ProMar 200 is the most widely used commercial paint. For premium projects, Sherwin-Williams Duration and Benjamin Moore Regal Select. For healthcare and schools, zero-VOC paints like Sherwin-Williams Harmony.' },
      },
      {
        '@type': 'Question',
        name: 'How much does commercial painting cost?',
        acceptedAnswer: { '@type': 'Answer', text: 'Commercial interior painting costs $1.50 to $4 per sq ft for labour and materials. A 5,000 sq ft office floor costs $7,500 to $20,000 professionally painted. DIY commercial painting is not practical at this scale.' },
      },
      {
        '@type': 'Question',
        name: 'What finish is best for commercial walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Eggshell for offices and conference rooms. Satin for corridors and lobbies. Semi-gloss for bathrooms and kitchens. Flat for ceilings throughout.' },
      },
      {
        '@type': 'Question',
        name: 'How long does commercial painting take?',
        acceptedAnswer: { '@type': 'Answer', text: 'A professional crew of 3 to 4 painters can paint approximately 3,000 to 4,000 sq ft of walls per day. A 10,000 sq ft office takes 3 to 4 days for walls only working full days.' },
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
            <li className="text-gray-700 font-medium">Commercial Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Commercial Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Commercial painting projects use the same coverage rates as residential — <strong>350 to 400 square feet per gallon</strong> on smooth drywall. Add each room or area separately for a complete project total. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon per 350–400 sq ft per coat</p>
          <p className="text-sm opacity-90">Standard commercial interior — smooth drywall — two coats</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Use the <strong>Add Room</strong> button to add each area — offices, corridors, lobbies, bathrooms. The calculator totals all areas automatically for your full commercial project estimate.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Calculate Paint for Commercial Projects</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Commercial paint estimation follows the same principles as residential but at larger scale. Calculate the total wall area of each space, subtract doors and windows, divide by the coverage rate per gallon, and multiply by the number of coats. Add a 10 to 15% waste factor for commercial projects to account for cutting in, overspray, and touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Commercial projects typically specify paint by brand and product in the project specifications. Always confirm the specified paint and its coverage rate before estimating quantities. Commercial paints vary widely in spread rate — architectural coatings achieve 400 square feet per gallon while heavy-duty epoxy coatings may only achieve 200 square feet per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Large commercial buildings are typically estimated by zone — office areas, corridors, lobby, bathrooms, stairwells — each with different surface types and finish requirements. Use the calculator above to add each zone separately and get a full project total.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Commercial Paint Coverage Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Building Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Floor Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (2 coats walls)</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (walls + ceiling)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Small office suite', '1,000 sq ft', '8–10 gal', '12–15 gal'],
                  ['Medium office', '2,500 sq ft', '20–25 gal', '30–38 gal'],
                  ['Large office floor', '5,000 sq ft', '40–50 gal', '60–75 gal'],
                  ['Retail unit 2,000 sq ft', '2,000 sq ft', '16–20 gal', '24–30 gal'],
                  ['Restaurant 1,500 sq ft', '1,500 sq ft', '14–18 gal', '20–26 gal'],
                  ['Apartment block 10 units', '8,000 sq ft', '65–80 gal', '95–120 gal'],
                ].map(([type, area, walls, both], i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{area}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Commercial Paint Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams ProMar 200</strong> is the most widely specified commercial interior paint — excellent coverage, low VOC, and available through contractor accounts at significant discounts. <strong>Sherwin-Williams Duration</strong> and <strong>Benjamin Moore Regal Select</strong> are the premium commercial choices for high-specification projects where longevity is critical.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For high-traffic commercial areas like corridors, lobbies, and healthcare facilities, <strong>Sherwin-Williams Harmony</strong> (zero VOC, antimicrobial) and <strong>Benjamin Moore Natura</strong> (zero VOC) are the standard specifications. Both are washable, scrubbable, and meet the indoor air quality requirements of most commercial building certifications including LEED.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Commercial Paint Finishes by Area</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Different areas of a commercial building require different paint finishes based on traffic levels and cleaning requirements. Offices and conference rooms typically use eggshell for a professional appearance with good washability. Corridors and lobbies use satin for high washability under heavy foot traffic. Bathrooms and kitchens use semi-gloss for maximum moisture resistance. Ceilings throughout use flat white.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Commercial Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Schedule painting outside business hours.</strong> Most commercial painting is done evenings and weekends to avoid disrupting business operations. Factor overtime labour rates into your project budget.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Specify low-VOC paint for occupied buildings.</strong> Standard paints off-gas VOCs for days after application. Use zero or low-VOC paints in any building that will be occupied within 24 to 48 hours of painting.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow extra for colour matching existing walls.</strong> In commercial repaint projects where only some walls are repainted, colour matching existing paint requires testing and approval — add time and cost for colour matching.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy in 5-gallon buckets for large projects.</strong> Commercial projects should always be purchased in 5-gallon buckets to save 15 to 20% on material costs versus single gallons.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/warehouse-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Warehouse Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/office-building-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Office Building Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-for-contractors`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator for Contractors →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How do you calculate paint for a commercial building?', 'Measure total wall area per zone, subtract doors and windows, divide by 350 to 400 sq ft per gallon, multiply by number of coats, then add 10 to 15% waste. Use the calculator above and add each zone separately.'],
              ['How much paint does a 5,000 sq ft office need?', 'A 5,000 sq ft office floor needs 40 to 50 gallons for two coats on walls. Add another 20 to 30 gallons if painting ceilings. Buy in 5-gallon buckets for commercial projects.'],
              ['What paint is used in commercial buildings?', 'Sherwin-Williams ProMar 200 is the most widely used commercial paint. For premium projects, Sherwin-Williams Duration and Benjamin Moore Regal Select. For healthcare and schools, zero-VOC paints like Sherwin-Williams Harmony.'],
              ['How much does commercial painting cost?', 'Commercial interior painting costs $1.50 to $4 per sq ft for labour and materials. A 5,000 sq ft office floor costs $7,500 to $20,000 professionally painted. DIY commercial painting is not practical at this scale.'],
              ['What finish is best for commercial walls?', 'Eggshell for offices and conference rooms. Satin for corridors and lobbies. Semi-gloss for bathrooms and kitchens. Flat for ceilings throughout.'],
              ['How long does commercial painting take?', 'A professional crew of 3 to 4 painters can paint approximately 3,000 to 4,000 sq ft of walls per day. A 10,000 sq ft office takes 3 to 4 days for walls only working full days.'],
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
