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
      ? 'https://thepaintcalculator.com/stain-calculator'
      : `https://thepaintcalculator.com/${locale}/stain-calculator`;
  return {
    title: 'Stain Calculator — How Much Wood Stain Do I Need? | ThePaintCalculator.com',
    description: 'Calculate exactly how much wood stain you need for any surface. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Stain Calculator — How Much Wood Stain Do I Need?',
      description: 'Calculate exactly how much wood stain you need for any surface. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function StainCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Stain Calculator', item: 'https://thepaintcalculator.com/stain-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much wood stain do I need?',
        acceptedAnswer: { '@type': 'Answer', text: 'One gallon covers 150 to 200 sq ft on rough wood per coat. Smooth sanded wood achieves 250 to 300 sq ft per gallon. Always buy 15 to 20% more than calculated.' },
      },
      {
        '@type': 'Question',
        name: 'How many coats of stain do I need?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most penetrating stains require one coat. Solid colour stains require two coats. Applying a second coat of penetrating stain while the first is wet deepens the colour slightly.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best wood stain?',
        acceptedAnswer: { '@type': 'Answer', text: 'Cabot Australian Timber Oil for hardwood decks, Armstrong Clark for pressure treated pine, Ready Seal for easiest application, Minwax Wood Finish for interior wood staining.' },
      },
      {
        '@type': 'Question',
        name: 'How long does wood stain last?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oil-based exterior stain lasts 3 to 5 years. Water-based exterior stain lasts 2 to 4 years. Interior stain lasts 5 to 10 years when sealed with a top coat.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use oil or water based stain?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oil-based stain penetrates deeper and lasts longer but has higher VOC and longer dry time. Water-based stain dries faster, cleans up easily, and is more environmentally friendly. Both produce similar final results.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need to seal wood after staining?',
        acceptedAnswer: { '@type': 'Answer', text: 'Penetrating stains do not require a separate sealer — the stain and sealer are combined. Solid colour stains may benefit from a clear top coat for extra durability on high traffic surfaces like decks.' },
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
            <li className="text-gray-700 font-medium">Stain Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Stain Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            One gallon of wood stain covers <strong>150 to 200 square feet</strong> on rough wood surfaces per coat. Enter your surface dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon per 150–200 sq ft</p>
          <p className="text-sm opacity-90">For rough wood surfaces — one coat</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your total surface area in square feet. Rough wood absorbs significantly more stain than smooth wood.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Stain Do I Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wood stain coverage varies significantly based on the porosity and roughness of the wood. Smooth sanded wood achieves 250 to 300 square feet per gallon. Rough sawn wood achieves 150 to 200 square feet per gallon. Bare new wood and highly porous wood species like pine and cedar absorb heavily on the first coat and may only achieve 100 to 150 square feet per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike paint which builds up on the surface, penetrating stains soak into the wood. This means a second coat applied while the first is still wet adds little additional colour — most penetrating stains are applied as a single coat. Solid colour stains behave more like paint and typically require two coats for full coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always test your chosen stain on a hidden area of the wood before committing to the full project. Wood species, age, and previous treatments all affect how the stain absorbs and the final colour result.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Stain Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage/Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">100 sq ft</th>
                  <th className="px-4 py-3 text-left font-semibold">200 sq ft</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Smooth sanded wood', '250–300 sq ft', '0.4 gal', '0.7 gal'],
                  ['Planed lumber', '200–250 sq ft', '0.5 gal', '0.9 gal'],
                  ['Rough sawn wood', '150–200 sq ft', '0.6 gal', '1.2 gal'],
                  ['New bare pine/cedar', '100–150 sq ft', '0.8 gal', '1.5 gal'],
                  ['Weathered grey wood', '100–130 sq ft', '0.9 gal', '1.7 gal'],
                  ['Log cabin (round logs)', '80–100 sq ft', '1.1 gal', '2.2 gal'],
                ].map(([surface, coverage, s100, s200], i) => (
                  <tr key={surface} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{surface}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{s100}</td>
                    <td className="px-4 py-3 text-gray-700">{s200}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Types of Wood Stain</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Transparent stains</strong> add a tint of colour while allowing the full wood grain and texture to show through. Best for new or good condition wood where you want to enhance the natural appearance. <strong>Semi-transparent stains</strong> provide more colour while still allowing grain to show. The most popular choice for decks and fences. <strong>Solid colour stains</strong> are fully opaque and hide the wood grain completely. Best for weathered or damaged wood that needs colour correction.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Oil-based stains</strong> penetrate deeper and last longer — typically 3 to 5 years. They require mineral spirits for cleanup and have longer dry times. <strong>Water-based stains</strong> dry faster, clean up with soap and water, and have lower VOC content. They last 2 to 4 years and are the more environmentally friendly choice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Wood Stain Brands</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Cabot Australian Timber Oil</strong> is the top-rated penetrating oil stain for hardwood and exotic decking. <strong>Armstrong Clark Wood Stain</strong> consistently earns the highest ratings for pressure treated pine decks and fences. <strong>Ready Seal Natural Cedar</strong> is a popular combination stain and sealer that requires no primer and is one of the easiest to apply.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For interior wood staining, <strong>Minwax Wood Finish</strong> and <strong>Varathane Premium Wood Stain</strong> are the two most widely available and reliable options. Both are oil-based, available in 50 plus colours, and dry in 2 hours.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Applying Wood Stain</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Test on a hidden area first.</strong> Wood species and existing treatments affect stain colour dramatically. Always test before committing to the full project.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply with the grain.</strong> Always brush stain in the direction of the wood grain for the most even finish and best penetration.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Wipe off excess penetrating stain.</strong> After applying penetrating stain, wipe off any excess that has not absorbed within 5 to 15 minutes. Excess stain that dries on the surface becomes sticky and blotchy.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Work in sections.</strong> Avoid stopping mid-board as this creates lap marks. Work from one end to the other without stopping.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Dispose of oil-stained rags safely.</strong> Oil-soaked rags can spontaneously combust. Spread them flat to dry outdoors or submerge in water before disposal.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/deck-stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/fence-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Fence Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/deck-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much wood stain do I need?', 'One gallon covers 150 to 200 sq ft on rough wood per coat. Smooth sanded wood achieves 250 to 300 sq ft per gallon. Always buy 15 to 20% more than calculated.'],
              ['How many coats of stain do I need?', 'Most penetrating stains require one coat. Solid colour stains require two coats. Applying a second coat of penetrating stain while the first is wet deepens the colour slightly.'],
              ['What is the best wood stain?', 'Cabot Australian Timber Oil for hardwood decks, Armstrong Clark for pressure treated pine, Ready Seal for easiest application, Minwax Wood Finish for interior wood staining.'],
              ['How long does wood stain last?', 'Oil-based exterior stain lasts 3 to 5 years. Water-based exterior stain lasts 2 to 4 years. Interior stain lasts 5 to 10 years when sealed with a top coat.'],
              ['Should I use oil or water based stain?', 'Oil-based stain penetrates deeper and lasts longer but has higher VOC and longer dry time. Water-based stain dries faster, cleans up easily, and is more environmentally friendly. Both produce similar final results.'],
              ['Do I need to seal wood after staining?', 'Penetrating stains do not require a separate sealer — the stain and sealer are combined. Solid colour stains may benefit from a clear top coat for extra durability on high traffic surfaces like decks.'],
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
