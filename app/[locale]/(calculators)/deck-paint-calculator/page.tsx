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
      ? 'https://thepaintcalculator.com/deck-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/deck-paint-calculator`;
  return {
    title: 'Deck Paint Calculator — How Much Paint for a Deck? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint or stain you need for your deck. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Deck Paint Calculator — How Much Paint for a Deck?',
      description: 'Calculate exactly how much paint or stain you need for your deck. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function DeckPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Deck Paint Calculator', item: 'https://thepaintcalculator.com/deck-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12×16 deck needs 1.3 gallons per coat. For two coats plus railings and stairs buy 3 to 4 gallons. Add 30% extra for bare or weathered wood.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 12×16 deck needs 2 to 3 gallons for two coats. A 16×20 deck needs 4 to 5 gallons. A 20×24 deck needs 6 to 8 gallons including railings.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best paint for a deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'Behr Premium Deck Over, Rust-Oleum Deck and Concrete Restore, and Sherwin-Williams SuperDeck are the top choices. Always use paint formulated specifically for decks.' },
      },
      {
        '@type': 'Question',
        name: 'How long does deck paint last?',
        acceptedAnswer: { '@type': 'Answer', text: 'Quality deck paint lasts 3 to 5 years with proper prep. Deck resurfacing products like Behr Deck Over last 4 to 6 years. High traffic areas may show wear sooner.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint or stain my deck?',
        acceptedAnswer: { '@type': 'Answer', text: 'Paint provides an opaque colour and hides imperfections. Stain shows the wood grain and is easier to reapply. For weathered or damaged decks, paint or a resurfacing product is the better choice.' },
      },
      {
        '@type': 'Question',
        name: 'How do I prepare a deck for painting?',
        acceptedAnswer: { '@type': 'Answer', text: 'Pressure wash, let dry 48 hours, scrape all peeling paint, sand rough areas, spot prime bare wood, then apply deck paint on a dry day between 50 and 90 degrees Fahrenheit.' },
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
            <li className="text-gray-700 font-medium">Deck Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Deck Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 12×16 deck needs <strong>2 to 3 gallons</strong> of deck paint for two coats. Enter your deck dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 3 gallons for a standard deck</p>
          <p className="text-sm opacity-90">For a 12×16 deck — two coats including railings</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your deck square footage. Multiply length × width then add 20% for railings and stairs.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Deck Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Deck paint coverage depends on the wood species, condition, and porosity of the boards. Rough weathered deck boards absorb significantly more paint than new smooth boards. As a general rule, use 150 to 200 square feet per gallon as your coverage estimate for most deck painting projects.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 12×16 deck has 192 square feet of floor area. At 150 square feet per gallon, that is 1.3 gallons per coat. For two coats you need 2.6 gallons — buy 3 gallons. Add railings and stairs and the total is typically 3.5 to 4 gallons for a complete deck including two coats on all surfaces.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            New or bare wood absorbs significantly more paint on the first coat. If painting a bare deck for the first time, buy 30% more than calculated. The first coat soaks in heavily and provides less surface coverage than subsequent coats.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Deck Paint Calculator — Reference Table</h2>
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
                  ['10×10', '100 sq ft', '0.7 gal', '1.5 gal'],
                  ['12×16', '192 sq ft', '1.3 gal', '3.0 gal'],
                  ['16×16', '256 sq ft', '1.7 gal', '4.0 gal'],
                  ['16×20', '320 sq ft', '2.1 gal', '5.0 gal'],
                  ['20×20', '400 sq ft', '2.7 gal', '6.5 gal'],
                  ['20×24', '480 sq ft', '3.2 gal', '7.5 gal'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Deck Paint Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Behr Premium Deck Over</strong> is the most popular deck paint in the US — a thick coating that fills cracks up to ¼ inch and resurfaces weathered decks. <strong>Rust-Oleum Deck and Concrete Restore</strong> is a similar resurfacing product that adds texture for slip resistance. For a thinner traditional deck paint, <strong>Sherwin-Williams SuperDeck Exterior Deck and Dock Coating</strong> is a reliable mid-range option.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always use a paint specifically formulated for decks rather than standard exterior house paint. Deck paint contains additives for slip resistance, flexibility under foot traffic, and resistance to moisture from rain and snow. Standard exterior paint will crack and peel quickly under the stress of regular foot traffic.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Deck Paint Colours</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Grey and greige tones dominate deck colour trends in 2026. <strong>Behr Silver Strand</strong>, <strong>Sherwin-Williams Flagstone</strong>, and <strong>Benjamin Moore Rockport Gray</strong> are the most popular neutral deck colours. These colours complement most house exterior colours and blend naturally with landscaping.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a warmer look, medium brown tones like <strong>Behr Log Cabin</strong> and <strong>Sherwin-Williams Kaffee</strong> are popular choices that mimic the natural look of stained wood. White and light grey decks are popular on coastal homes and modern exterior designs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Deck</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean and dry thoroughly first.</strong> Pressure wash the deck and let it dry for 48 hours minimum before painting. Any moisture trapped under paint causes rapid peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sand or scrape all peeling areas.</strong> New paint will not bond over old peeling paint. Scrape all loose paint and sand edges smooth before applying a fresh coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prime bare or repaired areas.</strong> Spot prime any bare wood, filled holes, or replaced boards before applying the full deck paint coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint with the grain.</strong> Apply deck paint along the length of the boards rather than across them. This gives the most even finish and gets paint into the gaps between boards.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Allow full cure before use.</strong> Most deck paints require 24 to 48 hours drying time before light foot traffic and 72 hours before furniture is placed back on the deck.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/deck-stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/fence-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Fence Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a deck?', 'A standard 12×16 deck needs 1.3 gallons per coat. For two coats plus railings and stairs buy 3 to 4 gallons. Add 30% extra for bare or weathered wood.'],
              ['How many gallons of paint for a deck?', 'A 12×16 deck needs 2 to 3 gallons for two coats. A 16×20 deck needs 4 to 5 gallons. A 20×24 deck needs 6 to 8 gallons including railings.'],
              ['What is the best paint for a deck?', 'Behr Premium Deck Over, Rust-Oleum Deck and Concrete Restore, and Sherwin-Williams SuperDeck are the top choices. Always use paint formulated specifically for decks.'],
              ['How long does deck paint last?', 'Quality deck paint lasts 3 to 5 years with proper prep. Deck resurfacing products like Behr Deck Over last 4 to 6 years. High traffic areas may show wear sooner.'],
              ['Should I paint or stain my deck?', 'Paint provides an opaque colour and hides imperfections. Stain shows the wood grain and is easier to reapply. For weathered or damaged decks, paint or a resurfacing product is the better choice.'],
              ['How do I prepare a deck for painting?', 'Pressure wash, let dry 48 hours, scrape all peeling paint, sand rough areas, spot prime bare wood, then apply deck paint on a dry day between 50 and 90 degrees Fahrenheit.'],
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
