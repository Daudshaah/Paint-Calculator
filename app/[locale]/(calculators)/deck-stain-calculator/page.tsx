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
      ? 'https://thepaintcalculator.com/deck-stain-calculator'
      : `https://thepaintcalculator.com/${locale}/deck-stain-calculator`;
  return {
    title: 'Deck Stain Calculator — How Much Stain for a Deck? | ThePaintCalculator.com',
    description: 'Calculate exactly how much stain or paint you need for your deck. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Deck Stain Calculator — How Much Stain for a Deck?',
      description: 'Calculate exactly how much stain or paint you need for your deck. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function DeckStainCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Deck Stain Calculator', item: 'https://thepaintcalculator.com/deck-stain-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much stain do I need for a deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12x16 deck has 192 square feet of surface area. At 150 to 200 square feet per gallon for rough deck boards, you need 1 to 1.5 gallons per coat. For two coats buy 2 to 3 gallons. Add 20% for railings and stairs.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of stain for a deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 12x16 deck needs 1 to 1.5 gallons per coat. A larger 16x20 deck needs 1.5 to 2 gallons per coat. A 20x24 deck needs 2.5 to 3 gallons per coat. Always add 20% extra for railings, stairs, and rough wood absorption.' },
      },
      {
        '@type': 'Question',
        name: 'How often should I stain my deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most decks need restaining every 2 to 3 years. A semi-transparent stain lasts 2 to 3 years. A solid colour stain lasts 3 to 5 years. Decks in harsh climates with heavy sun or rain exposure may need restaining every 1 to 2 years.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best deck stain?',
        acceptedAnswer: { '@type': 'Answer', text: 'Cabot Australian Timber Oil, Armstrong Clark Wood Stain, and Defy Extreme Wood Stain are consistently rated as the best deck stains. For a solid colour stain, Behr Premium Solid Colour Waterproofing Stain and Seal is a reliable and affordable option.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use transparent or solid stain on my deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use transparent or semi-transparent stain on new or good condition wood to show the natural grain. Use solid stain on older weathered or grey wood that needs colour correction. Solid stain is harder to strip if you want to change it later.' },
      },
      {
        '@type': 'Question',
        name: 'How do I prepare a deck for staining?',
        acceptedAnswer: { '@type': 'Answer', text: 'Clean the deck with a deck cleaner or pressure washer to remove dirt, mildew, and grey oxidation. Let it dry completely for 48 hours. Sand any rough or splintered boards. Apply stain on a dry day when temperatures are between 50 and 90 degrees Fahrenheit.' },
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
            <li className="text-gray-700 font-medium">Deck Stain Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Deck Stain Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 12x16 deck needs <strong>2 to 3 gallons</strong> of stain for two coats. Enter your deck dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 3 gallons for a standard deck</p>
          <p className="text-sm opacity-90">For a 12x16 deck — two coats including railings</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> In the calculator below use <strong>Enter wall area directly</strong> and enter your deck square footage. Multiply length by width for the floor area then add 20% for railings and stairs.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Stain Does a Deck Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Deck stain coverage depends on the wood species, the age and condition of the wood, and whether you are applying a transparent or solid stain. Rough weathered deck boards absorb significantly more stain than new smooth boards. As a general rule, use 150 to 200 square feet per gallon as your coverage estimate for most deck staining projects.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 12x16 deck has 192 square feet of floor area. At 150 square feet per gallon, that is 1.3 gallons per coat. For two coats you need 2.6 gallons — buy 3 gallons. Add railings and stairs and the total is typically 3.5 to 4 gallons for a complete deck refinish including two coats on all surfaces.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            New or recently stripped bare wood absorbs more stain than previously stained wood in good condition. If staining bare wood for the first time, buy 30% more than calculated. The first coat soaks in heavily and provides less surface coverage than subsequent coats.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Deck Stain Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Deck Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Sq Footage</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats + Railings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['10x10', '100 sq ft', '0.7 gal', '1.5 gal'],
                  ['12x16', '192 sq ft', '1.3 gal', '3.0 gal'],
                  ['16x16', '256 sq ft', '1.7 gal', '4.0 gal'],
                  ['16x20', '320 sq ft', '2.1 gal', '5.0 gal'],
                  ['20x20', '400 sq ft', '2.7 gal', '6.5 gal'],
                  ['20x24', '480 sq ft', '3.2 gal', '7.5 gal'],
                ].map(([size, sqft, one, two], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{sqft}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Transparent vs Solid Deck Stain</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Choosing between transparent and solid stain depends on the condition of your wood. Transparent and semi-transparent stains allow the natural wood grain to show through and work best on new or good condition decks where you want to enhance the natural wood appearance. They penetrate deeply, last 2 to 3 years, and are easy to reapply.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Solid colour stains are opaque and completely hide the wood grain. They are the right choice for older weathered grey decks that have lost their colour, boards with stains or imperfections, or when you want a specific bold colour. Solid stains last 3 to 5 years but are harder to remove if you want to switch back to a transparent finish later.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Deck Stains</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Cabot Australian Timber Oil</strong> is consistently rated the best penetrating deck oil for hardwood and exotic wood decks — it conditions the wood while providing UV and moisture protection. <strong>Armstrong Clark Wood Stain</strong> is the top-rated semi-transparent stain for pressure treated pine decks with exceptional durability and colour retention. <strong>Defy Extreme Wood Stain</strong> is a water-based semi-transparent stain that resists mildew and UV fading and is easy to clean up.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For solid colour stains, <strong>Behr Premium Solid Colour Waterproofing Stain and Seal</strong> at around $45 per gallon is the most popular and affordable option at Home Depot. <strong>Sherwin-Williams SuperDeck Solid Colour Stain</strong> is the premium choice for maximum durability on high-traffic decks.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Prepare a Deck for Staining</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean the deck first.</strong> Use a dedicated deck cleaner or pressure washer to remove dirt, mildew, and grey oxidation. A clean deck stains evenly — a dirty deck stains blotchy.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Let the wood dry completely.</strong> Wait at least 48 hours after cleaning or rain before staining. Stain applied to damp wood will not penetrate properly and will peel.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sand rough or splintered boards.</strong> Sand with 60 to 80-grit sandpaper to smooth splinters and open the wood grain for better stain absorption. Sweep away all dust before staining.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Strip old peeling stain completely.</strong> Never apply new stain over peeling old stain. Use a deck stripper to remove all old finish before restaining or the new stain will peel in the same spots.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Stain on a cool overcast day.</strong> Direct hot sunlight causes stain to dry too fast before it penetrates the wood. Ideal staining temperature is 50 to 80 degrees Fahrenheit with no rain forecast for 24 hours.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/fence-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Fence Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Garage Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much stain do I need for a deck?', 'A standard 12x16 deck needs 1 to 1.5 gallons per coat. For two coats plus railings and stairs buy 3 to 4 gallons. Add 30% extra for bare or very weathered wood.'],
              ['How many gallons of stain for a deck?', 'A 12x16 deck needs 2 to 3 gallons for two coats. A 16x20 deck needs 4 to 5 gallons. A 20x24 deck needs 6 to 8 gallons including railings. Always add 20% for rough wood absorption.'],
              ['How often should I stain my deck?', 'Most decks need restaining every 2 to 3 years. Semi-transparent stain lasts 2 to 3 years. Solid colour stain lasts 3 to 5 years. Decks in harsh climates may need restaining every 1 to 2 years.'],
              ['What is the best deck stain?', 'Cabot Australian Timber Oil, Armstrong Clark Wood Stain, and Defy Extreme Wood Stain are consistently top-rated. For solid colour, Behr Premium Solid Colour Waterproofing Stain is the most popular affordable option.'],
              ['Should I use transparent or solid stain on my deck?', 'Transparent stain for new or good condition wood to show the natural grain. Solid stain for older weathered or grey wood that needs colour correction. Solid stain is harder to remove later.'],
              ['How do I prepare a deck for staining?', 'Clean with a deck cleaner or pressure washer. Let dry for 48 hours. Sand rough boards. Strip any peeling old stain completely. Apply on a cool overcast day between 50 and 80 degrees Fahrenheit.'],
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