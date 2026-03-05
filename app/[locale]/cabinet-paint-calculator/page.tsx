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
      ? 'https://thepaintcalculator.com/cabinet-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/cabinet-paint-calculator`;
  return {
    title: 'Cabinet Paint Calculator — How Much Paint for Kitchen Cabinets? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for kitchen or bathroom cabinets. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Cabinet Paint Calculator — How Much Paint for Kitchen Cabinets?',
      description: 'Calculate exactly how much paint you need for kitchen or bathroom cabinets. Free instant results. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function CabinetPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Cabinet Paint Calculator', item: 'https://thepaintcalculator.com/cabinet-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for kitchen cabinets?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard kitchen with 20 to 25 cabinet doors needs 1 to 1.5 gallons for two coats. A large kitchen with 30 or more doors needs 2 gallons.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best paint for kitchen cabinets?',
        acceptedAnswer: { '@type': 'Answer', text: 'Benjamin Moore Advance, Sherwin-Williams Emerald Urethane Trim Enamel, and Rust-Oleum Cabinet Transformations are the top choices. Always use semi-gloss or satin finish.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need to prime cabinets before painting?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — always prime cabinets. Use a shellac-based primer like Zinsser BIN or a bonding primer. Priming is the most important step.' },
      },
      {
        '@type': 'Question',
        name: 'How many coats of paint do cabinets need?',
        acceptedAnswer: { '@type': 'Answer', text: 'One coat of primer and two coats of paint for most cabinets. Three coats for dark to light colour changes.' },
      },
      {
        '@type': 'Question',
        name: 'How long does cabinet paint last?',
        acceptedAnswer: { '@type': 'Answer', text: 'Properly painted cabinets using alkyd paint last 8 to 15 years. Cabinets painted with standard latex wall paint typically need repainting within 3 to 5 years.' },
      },
      {
        '@type': 'Question',
        name: 'Should I spray or brush paint kitchen cabinets?',
        acceptedAnswer: { '@type': 'Answer', text: 'Spraying produces the smoothest finish. Brushing with a foam roller is the practical DIY method and produces excellent results. Always remove doors before painting.' },
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
            <li className="text-gray-700 font-medium">Cabinet Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cabinet Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard kitchen with 20 to 25 cabinet doors needs <strong>1 to 1.5 gallons</strong> of cabinet paint for two coats. Use the calculator below for a precise result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 1.5 gallons per standard kitchen</p>
          <p className="text-sm opacity-90">For 20 to 25 cabinet doors and drawer fronts — two coats</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your total cabinet surface area in square feet for the most accurate estimate.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Do Kitchen Cabinets Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cabinet paint coverage is calculated differently from wall paint because you paint both sides of each door plus face frames and drawer fronts. A standard cabinet door measuring 15x24 inches has about 5 square feet of paintable surface for both sides. A kitchen with 20 doors has approximately 100 square feet of door surface. Add face frames and drawer fronts and the total paintable area is typically 150 to 200 square feet for a standard kitchen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            At 400 square feet per gallon with two coats, a standard kitchen with 150 to 200 square feet of cabinet surface needs 0.75 to 1 gallon of paint. Most homeowners buy 1.5 gallons to account for waste and touch-ups. A large kitchen with 30 or more doors needs 2 gallons.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Cabinet Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Kitchen Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Cabinet Doors</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">Primer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Small kitchen', '10–15 doors', '0.75 gal', '0.5 gal'],
                  ['Standard kitchen', '20–25 doors', '1.0–1.5 gal', '1.0 gal'],
                  ['Large kitchen', '30–35 doors', '1.5–2.0 gal', '1.5 gal'],
                  ['Very large kitchen', '40+ doors', '2.0–2.5 gal', '2.0 gal'],
                  ['Bathroom vanity', '4–6 doors', '0.25–0.5 gal', '0.25 gal'],
                ].map(([size, doors, paint, primer], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{doors}</td>
                    <td className="px-4 py-3 text-gray-700">{paint}</td>
                    <td className="px-4 py-3 text-gray-700">{primer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Kitchen Cabinets</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cabinet paint must be harder and more durable than standard wall paint. Kitchen cabinets are opened and closed hundreds of times per year and exposed to grease and moisture. Standard latex wall paint will chip and peel within a few years.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Benjamin Moore Advance Waterborne Interior Alkyd</strong> is the most popular cabinet paint among professional painters. <strong>Sherwin-Williams Emerald Urethane Trim Enamel</strong> is equally excellent. <strong>Rust-Oleum Cabinet Transformations</strong> is the most popular DIY kit at home improvement stores. Always use semi-gloss or satin finish on cabinets.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Cabinet Paint Colours</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            White and off-white remain the most popular cabinet colours. <strong>Sherwin-Williams Alabaster (SW 7008)</strong> is the most popular cabinet white in the US. <strong>Benjamin Moore Simply White (OC-117)</strong> is a slightly brighter warm white that looks fresh under kitchen lighting.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two-tone kitchens are extremely popular in 2026 — upper cabinets in white and lower cabinets in a contrasting colour. <strong>Sherwin-Williams Naval (SW 6244)</strong>, <strong>Benjamin Moore Newburyport Blue (HC-155)</strong>, and <strong>Sherwin-Williams Pewter Green (SW 6208)</strong> are the most popular lower cabinet colours.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Paint Kitchen Cabinets</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Remove all doors and hardware first.</strong> Never paint cabinet doors while hung. Label each door so you know where it goes back.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean and degrease thoroughly.</strong> Wipe every surface with TSP cleaner. Paint will not adhere to greasy surfaces.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sand lightly before priming.</strong> Sand with 120-grit sandpaper to scuff the existing finish. Wipe away all dust before priming.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always prime before painting.</strong> Use Zinsser BIN shellac-based primer for best adhesion. Skipping primer is the main reason cabinet paint jobs fail.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a foam roller for doors.</strong> A 4-inch foam roller produces a nearly brush-mark-free finish on flat cabinet doors.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Allow full cure time before rehanging.</strong> Alkyd paints take 30 days to fully harden. Avoid heavy use for the first 2 to 4 weeks after rehanging.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for kitchen cabinets?', 'A standard kitchen with 20 to 25 cabinet doors needs 1 to 1.5 gallons for two coats. A large kitchen with 30 or more doors needs 2 gallons. Budget the same amount for primer as for paint.'],
              ['What is the best paint for kitchen cabinets?', 'Benjamin Moore Advance, Sherwin-Williams Emerald Urethane Trim Enamel, and Rust-Oleum Cabinet Transformations are the top choices. Always use semi-gloss or satin finish. Avoid standard latex wall paint.'],
              ['Do I need to prime cabinets before painting?', 'Yes — always prime cabinets. Use Zinsser BIN shellac-based primer or a bonding primer. Priming is the most important step and skipping it is the main reason cabinet paint jobs fail.'],
              ['How many coats of paint do cabinets need?', 'One coat of primer and two coats of paint for most cabinets. Three coats for dark to light colour changes or very light whites.'],
              ['How long does cabinet paint last?', 'Properly painted cabinets using alkyd paint last 8 to 15 years. Cabinets painted with standard latex wall paint typically need repainting within 3 to 5 years.'],
              ['Should I spray or brush paint kitchen cabinets?', 'Spraying produces the smoothest finish. A foam roller is the practical DIY method and produces excellent results. Remove all doors before either method.'],
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