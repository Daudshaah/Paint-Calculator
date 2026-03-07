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
      ? 'https://thepaintcalculator.com/paint-coverage-calculator'
      : `https://thepaintcalculator.com/${locale}/paint-coverage-calculator`;
  return {
    title: 'Paint Coverage Calculator — How Far Does a Gallon of Paint Go? | ThePaintCalculator.com',
    description: 'Calculate exactly how far a gallon of paint will go and how many gallons you need for any surface. Free instant results. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Coverage Calculator — How Far Does a Gallon of Paint Go?',
      description: 'Calculate exactly how far a gallon of paint will go and how many gallons you need for any surface. Free instant results. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function PaintCoverageCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Paint Coverage Calculator', item: 'https://thepaintcalculator.com/paint-coverage-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How far does a gallon of paint go?',
        acceptedAnswer: { '@type': 'Answer', text: 'One gallon covers 350 to 400 sq ft on smooth walls per coat. Textured walls achieve 250 to 350 sq ft per gallon. Rough masonry achieves 100 to 200 sq ft per gallon.' },
      },
      {
        '@type': 'Question',
        name: 'How many square feet does a gallon of paint cover?',
        acceptedAnswer: { '@type': 'Answer', text: '350 to 400 sq ft on smooth interior walls. 300 to 350 sq ft on lightly textured walls. 150 to 200 sq ft on rough exterior wood. Always use the lower end of the range for budgeting.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons do I need for a room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12×12 bedroom needs 1.5 to 2 gallons for two coats. A larger 16×14 living room needs 2.5 to 3 gallons. Use our room calculators for exact estimates.' },
      },
      {
        '@type': 'Question',
        name: 'Does expensive paint cover better?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — premium paints with high titanium dioxide content cover better in fewer coats. A $90 premium paint often costs less per covered square foot than a $35 budget paint requiring extra coats.' },
      },
      {
        '@type': 'Question',
        name: 'How much paint do I need for two coats?',
        acceptedAnswer: { '@type': 'Answer', text: 'Double your single-coat quantity. If a room needs 1.5 gallons per coat, buy 3 gallons for two coats. The second coat typically uses slightly less paint as the surface is already sealed.' },
      },
      {
        '@type': 'Question',
        name: 'What affects paint coverage rate?',
        acceptedAnswer: { '@type': 'Answer', text: 'Surface texture (rough surfaces absorb more), application method (spraying wastes more), colour change (dark to light needs more coats), paint quality (premium paints hide better), and roller nap thickness.' },
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
            <li className="text-gray-700 font-medium">Paint Coverage Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Coverage Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            One gallon of standard interior paint covers <strong>350 to 400 square feet</strong> on smooth walls per coat. Enter your room dimensions below to calculate how many gallons you need. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">400 sq ft per gallon on smooth walls</p>
          <p className="text-sm opacity-90">350–400 sq ft per gallon — standard interior latex paint — one coat</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> The calculator below uses 400 sq ft per gallon as the default coverage rate for smooth interior walls. Rough or textured surfaces cover less — see the reference table below for coverage by surface type.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Far Does a Gallon of Paint Go?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Paint coverage — also called spread rate — is the area one gallon of paint covers at the correct film thickness. Most interior latex paints claim 400 square feet per gallon on the label. In practice, real-world coverage is typically 350 to 380 square feet per gallon on smooth walls due to surface texture, roller absorption, and lap allowances.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Coverage varies significantly by surface type. Smooth drywall achieves the label rate of 400 square feet per gallon. Orange peel textured walls achieve 300 to 350 square feet per gallon. Heavy knockdown texture achieves 250 to 300 square feet per gallon. Rough masonry, brick, and stucco achieve 150 to 200 square feet per gallon due to deep penetration into the porous surface.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The number of coats also affects how you calculate coverage. One coat of a premium self-priming paint may achieve the same result as a primer coat plus one coat of standard paint. Premium paints with high hide ratings cover better in fewer coats saving money overall despite the higher per-gallon cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Coverage by Surface Type</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage per Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres per 10 sq m</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Smooth drywall', '380–400 sq ft', '0.25 L'],
                  ['Lightly textured wall', '340–380 sq ft', '0.28 L'],
                  ['Orange peel texture', '300–340 sq ft', '0.33 L'],
                  ['Heavy knockdown texture', '250–300 sq ft', '0.40 L'],
                  ['Smooth wood', '350–400 sq ft', '0.27 L'],
                  ['Rough sawn wood', '150–200 sq ft', '0.55 L'],
                  ['Smooth masonry', '200–250 sq ft', '0.45 L'],
                  ['Rough brick/stucco', '100–150 sq ft', '0.70 L'],
                ].map(([surface, coverage, litres], i) => (
                  <tr key={surface} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{surface}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{litres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Paint Coverage Affects Cost</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Understanding coverage rates helps you compare paint value more accurately than price per gallon alone. A $90 per gallon premium paint that covers 400 square feet in one coat costs $0.225 per square foot. A $35 per gallon budget paint that covers 300 square feet per coat and requires two coats costs $0.233 per square foot — more expensive than the premium paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Premium paints with high hide pigmentation — titanium dioxide — cover in fewer coats and produce richer, more accurate colours. For whole house projects or large commercial jobs, comparing cost per square foot of coverage rather than cost per gallon gives a more accurate budget picture.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Paint Coverage Matters for Colour Changes</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Changing from a dark colour to a light colour requires the most coats — sometimes 3 or 4 — because the dark colour bleeds through light paint. Primer is essential for dark-to-light colour changes. A tinted primer matched to your topcoat colour reduces the number of topcoats needed from 3 to 2 in most cases.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Changing from light to dark requires fewer coats — typically 2 — because dark paint has high pigment concentration that covers in fewer applications. Changing between similar colours of similar darkness typically requires 1 to 2 coats with a good quality paint.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips to Maximise Paint Coverage</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Fill and sand before painting.</strong> Smooth walls absorb less paint and achieve higher coverage rates. Fill holes, sand rough spots, and prime bare drywall patches before painting.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use the right roller nap.</strong> A ⅜ inch nap for smooth walls, ½ inch for light texture, ¾ inch for heavy texture. The wrong nap wastes paint and reduces coverage.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do not over-thin paint.</strong> Thinning paint too much reduces coverage and hide. Only thin when the label specifically recommends it for your application method.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Apply at the correct film thickness.</strong> Apply paint at the coverage rate on the label — not thinner to make it go further. Thin application reduces hide, durability, and colour accuracy.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How far does a gallon of paint go?', 'One gallon covers 350 to 400 sq ft on smooth walls per coat. Textured walls achieve 250 to 350 sq ft per gallon. Rough masonry achieves 100 to 200 sq ft per gallon.'],
              ['How many square feet does a gallon of paint cover?', '350 to 400 sq ft on smooth interior walls. 300 to 350 sq ft on lightly textured walls. 150 to 200 sq ft on rough exterior wood. Always use the lower end of the range for budgeting.'],
              ['How many gallons do I need for a room?', 'A standard 12×12 bedroom needs 1.5 to 2 gallons for two coats. A larger 16×14 living room needs 2.5 to 3 gallons. Use our room calculators for exact estimates.'],
              ['Does expensive paint cover better?', 'Yes — premium paints with high titanium dioxide content cover better in fewer coats. A $90 premium paint often costs less per covered square foot than a $35 budget paint requiring extra coats.'],
              ['How much paint do I need for two coats?', 'Double your single-coat quantity. If a room needs 1.5 gallons per coat, buy 3 gallons for two coats. The second coat typically uses slightly less paint as the surface is already sealed.'],
              ['What affects paint coverage rate?', 'Surface texture (rough surfaces absorb more), application method (spraying wastes more), colour change (dark to light needs more coats), paint quality (premium paints hide better), and roller nap thickness.'],
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
