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
      ? 'https://thepaintcalculator.com/paint-calculator-for-contractors'
      : `https://thepaintcalculator.com/${locale}/paint-calculator-for-contractors`;
  return {
    title: 'Paint Calculator for Contractors — Professional Paint Estimating Tool | ThePaintCalculator.com',
    description: 'Professional paint calculator for contractors. Calculate paint quantities, costs, and labour for any commercial or residential painting project. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Calculator for Contractors — Professional Paint Estimating Tool',
      description: 'Professional paint calculator for contractors. Calculate paint quantities, costs, and labour for any commercial or residential painting project. Free, no signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function ContractorPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Paint Calculator for Contractors', item: 'https://thepaintcalculator.com/paint-calculator-for-contractors' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do contractors calculate how much paint they need?',
        acceptedAnswer: { '@type': 'Answer', text: 'Measure total wall area, subtract doors and windows, divide by coverage rate (350 to 380 sq ft per gallon for interior), multiply by number of coats, then add 10 to 15% waste. Use our calculator above for each room and it totals automatically.' },
      },
      {
        '@type': 'Question',
        name: 'How much do painters charge per square foot?',
        acceptedAnswer: { '@type': 'Answer', text: 'Interior painting costs $2 to $6 per sq ft including labour and materials. Exterior painting costs $1.50 to $4.50 per sq ft. Rates vary by market, complexity, and finish quality.' },
      },
      {
        '@type': 'Question',
        name: 'What paint do professional painters use?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sherwin-Williams Duration and ProClassic, Benjamin Moore Regal Select and Aura are the most used professional paints. Contractors buy through accounts at 30 to 40% off retail pricing.' },
      },
      {
        '@type': 'Question',
        name: 'How much paint do I need for a 2000 sq ft house?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 2,000 sq ft home interior needs 18 to 22 gallons for two coats on all walls. Add 4 to 6 gallons for ceilings and 2 to 3 gallons for trim. Buy in 5-gallon buckets for bulk savings.' },
      },
      {
        '@type': 'Question',
        name: 'How do you bid a painting job?',
        acceptedAnswer: { '@type': 'Answer', text: 'Calculate materials (15 to 25% of job total), estimate labour hours at your hourly rate (70 to 80%), add overhead and profit (10 to 15%). Always do a site visit before quoting. Never bid from photos alone.' },
      },
      {
        '@type': 'Question',
        name: 'What is the average paint job profit margin?',
        acceptedAnswer: { '@type': 'Answer', text: 'Professional painting companies target 15 to 25% net profit margin. New contractors often underprice labour. Always calculate your true hourly cost including travel, prep, and cleanup before pricing any job.' },
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
            <li className="text-gray-700 font-medium">Paint Calculator for Contractors</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Calculator for Contractors
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Professional paint estimating tool for contractors. Calculate paint quantities for <strong>multiple rooms in one project</strong> including walls, ceilings, and trim. Get totals in gallons or litres. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Add multiple rooms — get a full project total</p>
          <p className="text-sm opacity-90">Calculate paint, primer, and labour for complete painting projects</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Use the <strong>Add Room</strong> button to add each room or area in your project. The calculator totals all rooms automatically for a complete project estimate.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Calculate Paint for a Contracting Job</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Accurate paint estimation is critical for profitable contracting. Over-ordering wastes materials cost and ties up capital. Under-ordering causes project delays and colour inconsistency from different dye lots. Professional contractors use a systematic room-by-room approach to calculate total paint quantities for every project.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard formula for wall paint is: total wall area minus door and window deductions, divided by coverage rate per gallon, multiplied by number of coats. A professional crew typically uses a coverage rate of 350 to 380 square feet per gallon for interior smooth walls — slightly below the label rate to account for cutting in, roller waste, and touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Add 10% waste allowance for standard projects and 15% for cut-up rooms with many windows, doors, and obstacles. Add 20% for new construction where walls may be more absorbent and extra touch-up is required after other trades finish.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Contractor Paint Estimating — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Project Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage Rate</th>
                  <th className="px-4 py-3 text-left font-semibold">Waste Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Interior repaint', '370 sq ft/gal', '10%', '2'],
                  ['New construction interior', '350 sq ft/gal', '15%', '2'],
                  ['Exterior repaint', '300 sq ft/gal', '10%', '2'],
                  ['New exterior (bare)', '250 sq ft/gal', '15%', '2'],
                  ['Ceiling repaint', '380 sq ft/gal', '10%', '1–2'],
                  ['Trim and doors', '200 sq ft/gal', '15%', '2'],
                ].map(([type, coverage, waste, coats], i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{waste}</td>
                    <td className="px-4 py-3 text-gray-700">{coats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Price a Painting Job</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional painters price jobs using one of three methods: price per square foot, hourly rate, or project-based pricing. Price per square foot is the most common — $2 to $6 per square foot for interior painting depending on your market, complexity, and finish level. Exterior painting runs $1.50 to $4.50 per square foot.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A typical interior repaint job breakdown: materials are 15 to 25% of total job cost, labour is 70 to 80%, and overhead and profit is 10 to 15%. Beginners often underprice labour. Always calculate your actual hourly rate — include travel time, prep time, cleanup time, and equipment maintenance — before pricing any job.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For commercial painting projects, add separate line items for surface preparation, primer, number of coats, and any specialty coatings. Commercial clients and property managers expect detailed itemised quotes, not lump sum pricing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Brands for Contractors</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams ProClassic</strong> and <strong>Duration</strong> are the most widely used professional interior paints — available through Sherwin-Williams contractor accounts at significant discounts from retail price. <strong>Benjamin Moore Regal Select</strong> and <strong>Aura</strong> are the premium choices that clients recognise by name and are willing to pay a premium for.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For exterior commercial projects, <strong>Sherwin-Williams Emerald Exterior</strong> and <strong>Duration Exterior</strong> provide the best durability and warranty coverage. Many commercial contracts specify paint brands — always confirm with the client before purchasing materials.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Contractor Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Open a contractor account.</strong> Sherwin-Williams, Benjamin Moore, and PPG all offer contractor accounts with 30 to 40% off retail pricing. The savings on a full year of jobs easily justify the paperwork.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Box your paint for large jobs.</strong> Pour all cans of the same colour into a large bucket and mix before starting. This eliminates colour variation between cans from different batches.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a paint tracker spreadsheet.</strong> Track paint quantities used per room on every job. Over time this builds your own real-world coverage database for your specific methods and markets.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Always do a site visit before quoting.</strong> Never quote a painting job from photos or measurements alone. Surface condition, accessibility, and prep requirements can double or triple material and labour costs.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How do contractors calculate how much paint they need?', 'Measure total wall area, subtract doors and windows, divide by coverage rate (350 to 380 sq ft per gallon for interior), multiply by number of coats, then add 10 to 15% waste. Use our calculator above for each room and it totals automatically.'],
              ['How much do painters charge per square foot?', 'Interior painting costs $2 to $6 per sq ft including labour and materials. Exterior painting costs $1.50 to $4.50 per sq ft. Rates vary by market, complexity, and finish quality.'],
              ['What paint do professional painters use?', 'Sherwin-Williams Duration and ProClassic, Benjamin Moore Regal Select and Aura are the most used professional paints. Contractors buy through accounts at 30 to 40% off retail pricing.'],
              ['How much paint do I need for a 2000 sq ft house?', 'A 2,000 sq ft home interior needs 18 to 22 gallons for two coats on all walls. Add 4 to 6 gallons for ceilings and 2 to 3 gallons for trim. Buy in 5-gallon buckets for bulk savings.'],
              ['How do you bid a painting job?', 'Calculate materials (15 to 25% of job total), estimate labour hours at your hourly rate (70 to 80%), add overhead and profit (10 to 15%). Always do a site visit before quoting. Never bid from photos alone.'],
              ['What is the average paint job profit margin?', 'Professional painting companies target 15 to 25% net profit margin. New contractors often underprice labour. Always calculate your true hourly cost including travel, prep, and cleanup before pricing any job.'],
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
