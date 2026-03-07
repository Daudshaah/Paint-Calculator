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
      ? 'https://thepaintcalculator.com/roof-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/roof-paint-calculator`;
  return {
    title: 'Roof Paint Calculator — How Much Paint for a Roof? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint or coating you need for your roof. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Roof Paint Calculator — How Much Paint for a Roof?',
      description: 'Calculate exactly how much paint or coating you need for your roof. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function RoofPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Roof Paint Calculator', item: 'https://thepaintcalculator.com/roof-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a roof?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 1,000 sq ft flat roof needs 10 to 14 gallons of elastomeric coating per coat. Roof tile paint covers much more — 150 to 200 sq ft per gallon. Always follow the manufacturer\'s spread rate.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of roof coating for a flat roof?',
        acceptedAnswer: { '@type': 'Answer', text: 'Apply elastomeric roof coating at 2 to 3 gallons per 100 sq ft per coat. A 1,000 sq ft flat roof needs 20 to 30 gallons for two coats at the correct film thickness.' },
      },
      {
        '@type': 'Question',
        name: 'How often should you paint a roof?',
        acceptedAnswer: { '@type': 'Answer', text: 'Elastomeric roof coatings last 5 to 10 years. Roof tile paint lasts 10 to 15 years. Reflective roof coatings may need reapplication every 5 to 7 years depending on climate and UV exposure.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best roof paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Henry White Roof Coating and Rust-Oleum LeakSeal for flat roofs in the US. Cromar Pro Grade Solar Reflective Roof Coating is popular in the UK. Always choose a product rated for your specific roof material.' },
      },
      {
        '@type': 'Question',
        name: 'Can you paint over old roof coating?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes if the old coating is clean, well-bonded, and in good condition. Remove all loose or peeling areas first. New coating bonds well to old coating that is firmly adhered.' },
      },
      {
        '@type': 'Question',
        name: 'How long does roof paint take to dry?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most elastomeric roof coatings dry to touch in 4 to 8 hours and cure fully in 24 to 72 hours. Do not allow foot traffic or rain exposure until fully cured.' },
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
            <li className="text-gray-700 font-medium">Roof Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Roof Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A typical 1,000 square foot flat roof needs <strong>4 to 6 gallons</strong> of elastomeric roof coating for two coats. Enter your roof dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">4 to 6 gallons per 1,000 sq ft of roof</p>
          <p className="text-sm opacity-90">For a flat or low pitch roof — two coats of elastomeric coating</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your roof square footage. For pitched roofs multiply your floor area by 1.15 for a low pitch or 1.3 for a medium pitch.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Roof Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Roof paint coverage depends on the type of coating, the roofing material, and the condition of the surface. Elastomeric roof coatings — the most common type used for flat and low-pitch roofs — typically cover 50 to 100 square feet per gallon when applied at the recommended thickness. This is significantly less coverage per gallon than standard paint due to the thick film required for waterproofing.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A 1,000 square foot flat roof needs 10 to 20 gallons of elastomeric coating for two coats at the correct film thickness. Applying too thin reduces waterproofing performance significantly. Always follow the manufacturer's specified spread rate for roofing products rather than trying to stretch coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pitched roofs have more surface area than their floor plan suggests. A roof with a low 4:12 pitch has 15% more area than the floor plan. A medium 6:12 pitch has 30% more area. A steep 9:12 pitch has 50% more area. Always account for pitch when calculating roof paint quantities.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Roof Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Roof Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['500 sq ft', 'Flat roof coating', '5–7 gal', '10–14 gal'],
                  ['1,000 sq ft', 'Flat roof coating', '10–14 gal', '20–28 gal'],
                  ['1,000 sq ft', 'Roof tile paint', '3–4 gal', '6–8 gal'],
                  ['1,500 sq ft', 'Flat roof coating', '15–20 gal', '30–40 gal'],
                  ['1,500 sq ft', 'Roof tile paint', '4–6 gal', '8–12 gal'],
                  ['2,000 sq ft', 'Roof tile paint', '6–8 gal', '12–16 gal'],
                ].map(([size, type, one, two], i) => (
                  <tr key={size + type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Types of Roof Paint and Coating</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Elastomeric roof coatings</strong> are thick rubber-like coatings applied to flat and low-pitch roofs to waterproof and protect the membrane. They expand and contract with temperature changes without cracking. Applied at 2 to 3 gallons per 100 square feet per coat, they form a seamless waterproof membrane.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Roof tile paint</strong> is a thin penetrating coating applied to concrete or clay roof tiles to restore colour and apply a protective finish. Coverage is much higher — 150 to 200 square feet per gallon. Popular in Australia and the UK for restoring faded terracotta or concrete tiles.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Reflective roof coatings</strong> are white elastomeric coatings that reflect sunlight and reduce cooling costs by up to 40% in hot climates. <strong>Henry White Roof Coating</strong> and <strong>Rust-Oleum LeakSeal</strong> are the most widely available options in the US.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Roof</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Safety first.</strong> Always use proper roof safety equipment including a harness, non-slip footwear, and roof brackets. Never work on a wet or frosty roof.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean the roof thoroughly.</strong> Pressure wash to remove all dirt, moss, algae, and loose material. Allow to dry completely before coating — minimum 48 hours.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply at the correct spread rate.</strong> Roof coatings must be applied at the manufacturer's specified thickness to achieve their rated waterproofing performance. Spreading too thin voids the warranty.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Treat moss and algae first.</strong> Apply a biocide treatment to kill moss and algae before painting. Painting over live moss and algae causes rapid peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Never paint a roof in rain or high humidity.</strong> Roof coatings require dry conditions to cure properly. Check the weather forecast and allow at least 24 hours of dry weather after application.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a roof?', 'A 1,000 sq ft flat roof needs 10 to 14 gallons of elastomeric coating per coat. Roof tile paint covers much more — 150 to 200 sq ft per gallon. Always follow the manufacturer\'s spread rate.'],
              ['How many gallons of roof coating for a flat roof?', 'Apply elastomeric roof coating at 2 to 3 gallons per 100 sq ft per coat. A 1,000 sq ft flat roof needs 20 to 30 gallons for two coats at the correct film thickness.'],
              ['How often should you paint a roof?', 'Elastomeric roof coatings last 5 to 10 years. Roof tile paint lasts 10 to 15 years. Reflective roof coatings may need reapplication every 5 to 7 years depending on climate and UV exposure.'],
              ['What is the best roof paint?', 'Henry White Roof Coating and Rust-Oleum LeakSeal for flat roofs in the US. Cromar Pro Grade Solar Reflective Roof Coating is popular in the UK. Always choose a product rated for your specific roof material.'],
              ['Can you paint over old roof coating?', 'Yes if the old coating is clean, well-bonded, and in good condition. Remove all loose or peeling areas first. New coating bonds well to old coating that is firmly adhered.'],
              ['How long does roof paint take to dry?', 'Most elastomeric roof coatings dry to touch in 4 to 8 hours and cure fully in 24 to 72 hours. Do not allow foot traffic or rain exposure until fully cured.'],
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
