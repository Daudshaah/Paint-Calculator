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
      ? 'https://thepaintcalculator.com/industrial-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/industrial-paint-calculator`;
  return {
    title: 'Industrial Paint Calculator — How Much Paint for Industrial Facilities? | ThePaintCalculator.com',
    description: 'Calculate exactly how much industrial paint or coating you need for factories, plants, and industrial facilities. Free professional estimator. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Industrial Paint Calculator — How Much Paint for Industrial Facilities?',
      description: 'Calculate exactly how much industrial paint or coating you need for factories, plants, and industrial facilities. Free professional estimator. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function IndustrialPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Industrial Paint Calculator', item: 'https://thepaintcalculator.com/industrial-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much industrial paint do I need?',
        acceptedAnswer: { '@type': 'Answer', text: 'Industrial coatings cover 100 to 250 sq ft per gallon depending on the system. A full three-coat system on 1,000 sq ft of steel needs 15 to 25 gallons total. Always follow the manufacturer\'s specified spread rate.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best industrial paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sherwin-Williams Macropoxy 646 for general industrial use, Rust-Oleum Industrial High Performance Epoxy for floors, Jotun Jotamastic for offshore and marine environments.' },
      },
      {
        '@type': 'Question',
        name: 'How long does industrial paint last?',
        acceptedAnswer: { '@type': 'Answer', text: 'A properly applied industrial coating system on correctly prepared steel lasts 15 to 20 years. The same system on poorly prepared steel fails in 2 to 3 years. Surface preparation is the critical factor.' },
      },
      {
        '@type': 'Question',
        name: 'How do you prepare surfaces for industrial painting?',
        acceptedAnswer: { '@type': 'Answer', text: 'Steel must be blast-cleaned to SSPC-SP6 minimum. Concrete must be shot-blasted or scarified. All oil, grease, and contamination must be removed before blasting. Surface profile must meet the coating specification requirements.' },
      },
      {
        '@type': 'Question',
        name: 'How much does industrial painting cost?',
        acceptedAnswer: { '@type': 'Answer', text: 'Industrial painting costs $3 to $10 per sq ft depending on the coating system and surface preparation required. High-performance chemical-resistant systems with full blast cleaning cost $8 to $15 per sq ft.' },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between industrial and commercial paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Industrial coatings are designed for protection — corrosion resistance, chemical resistance, abrasion resistance — and are applied at much higher film thicknesses. Commercial paint is designed for appearance and washability in occupied buildings.' },
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
            <li className="text-gray-700 font-medium">Industrial Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Industrial Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Industrial coatings cover <strong>150 to 200 square feet per gallon</strong> on steel and concrete surfaces — significantly less than standard paint due to the high-build films required for corrosion protection. Enter your facility dimensions below for an exact estimate. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon per 150–200 sq ft on steel and concrete</p>
          <p className="text-sm opacity-90">Industrial epoxy or alkyd coating — two coats — standard industrial coverage</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Use the <strong>Enter wall area directly</strong> option and enter your total surface area in square feet. Industrial coatings are applied at much heavier film thicknesses than standard paint — always follow the manufacturer's specified spread rate.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does an Industrial Facility Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Industrial painting differs fundamentally from commercial and residential painting in its primary purpose — protection rather than decoration. Industrial coatings must resist corrosion, chemical exposure, abrasion, extreme temperatures, and UV degradation. These protective requirements mean industrial coatings are applied at much higher film thicknesses than standard paint, resulting in lower coverage rates per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard industrial coating system for steel structures consists of three coats — a zinc-rich primer for corrosion protection at 100 to 150 sq ft per gallon, an epoxy intermediate coat at 150 to 200 sq ft per gallon, and a polyurethane topcoat at 200 to 250 sq ft per gallon. The full three-coat system for 1,000 square feet of steel structure requires 15 to 25 gallons total across all coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For industrial floor coatings, heavy-duty epoxy systems achieve 150 to 200 square feet per gallon at the required film thickness for forklift and chemical resistance. Thinner decorative epoxy floor coatings achieve 200 to 300 square feet per gallon but provide less protection in demanding environments.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Industrial Paint Coverage Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Coating Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage/Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">1,000 sq ft Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Zinc-rich primer (steel)', '100–150 sq ft', '1', '7–10 gal'],
                  ['Epoxy intermediate coat', '150–200 sq ft', '1', '5–7 gal'],
                  ['Polyurethane topcoat', '200–250 sq ft', '1', '4–5 gal'],
                  ['Heavy-duty floor epoxy', '150–200 sq ft', '2', '10–14 gal'],
                  ['Chemical resistant epoxy', '100–150 sq ft', '2', '14–20 gal'],
                  ['Industrial wall coating', '200–300 sq ft', '2', '7–10 gal'],
                ].map(([type, coverage, coats, total], i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{coats}</td>
                    <td className="px-4 py-3 text-gray-700">{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Industrial Paint Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams Macropoxy 646</strong> is the most widely used industrial epoxy coating for steel and concrete structures. <strong>Rust-Oleum Industrial High Performance Epoxy</strong> is a popular choice for industrial floors and walls requiring chemical resistance. <strong>Jotun Jotamastic</strong> and <strong>International Paint Intergard</strong> are the leading marine and offshore industrial coating systems.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For industrial floors with heavy forklift traffic and chemical spill exposure, <strong>Sherwin-Williams ArmorSeal 1000 HS</strong> and <strong>Rust-Oleum EpoxyShield Professional Grade Floor Coating</strong> provide the best combination of chemical resistance, abrasion resistance, and durability.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Surface Preparation for Industrial Painting</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Surface preparation is the most critical step in industrial painting — accounting for 60 to 80% of the total coating system cost and effort. The most common cause of industrial coating failure is inadequate surface preparation, not coating quality.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Steel surfaces must be blast-cleaned to SSPC-SP6 (Commercial Blast) minimum for most industrial coatings, and SSPC-SP10 (Near-White Blast) for high-performance and chemical-resistant systems. Concrete surfaces must be mechanically prepared by shot-blasting or scarifying to achieve the required surface profile for epoxy adhesion.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Industrial Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always follow manufacturer spread rates.</strong> Industrial coatings must be applied at specified dry film thickness (DFT) to achieve their rated performance. Spreading too thin voids all performance guarantees.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Surface preparation determines coating life.</strong> Invest in proper blast cleaning and surface preparation. A premium coating on poorly prepared steel will fail within 2 to 3 years. The same coating on properly prepared steel lasts 15 to 20 years.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Monitor temperature and humidity during application.</strong> Most industrial coatings have strict application temperature and humidity requirements. Apply outside these parameters and the coating will not cure correctly.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Use wet film thickness gauges.</strong> Professional industrial applicators use wet film thickness gauges during application to ensure the correct film thickness is being achieved at every pass.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/warehouse-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Warehouse Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/commercial-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Commercial Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-for-contractors`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator for Contractors →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much industrial paint do I need?', 'Industrial coatings cover 100 to 250 sq ft per gallon depending on the system. A full three-coat system on 1,000 sq ft of steel needs 15 to 25 gallons total. Always follow the manufacturer\'s specified spread rate.'],
              ['What is the best industrial paint?', 'Sherwin-Williams Macropoxy 646 for general industrial use, Rust-Oleum Industrial High Performance Epoxy for floors, Jotun Jotamastic for offshore and marine environments.'],
              ['How long does industrial paint last?', 'A properly applied industrial coating system on correctly prepared steel lasts 15 to 20 years. The same system on poorly prepared steel fails in 2 to 3 years. Surface preparation is the critical factor.'],
              ['How do you prepare surfaces for industrial painting?', 'Steel must be blast-cleaned to SSPC-SP6 minimum. Concrete must be shot-blasted or scarified. All oil, grease, and contamination must be removed before blasting. Surface profile must meet the coating specification requirements.'],
              ['How much does industrial painting cost?', 'Industrial painting costs $3 to $10 per sq ft depending on the coating system and surface preparation required. High-performance chemical-resistant systems with full blast cleaning cost $8 to $15 per sq ft.'],
              ['What is the difference between industrial and commercial paint?', 'Industrial coatings are designed for protection — corrosion resistance, chemical resistance, abrasion resistance — and are applied at much higher film thicknesses. Commercial paint is designed for appearance and washability in occupied buildings.'],
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
