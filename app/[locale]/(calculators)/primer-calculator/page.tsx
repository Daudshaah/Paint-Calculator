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
      ? 'https://thepaintcalculator.com/primer-calculator'
      : `https://thepaintcalculator.com/${locale}/primer-calculator`;

  return {
    title: 'Primer Calculator — How Much Primer Do I Need? | ThePaintCalculator.com',
    description: 'Calculate exactly how much primer you need for any room or surface. Get instant results in gallons or litres. Free primer calculator — no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Primer Calculator — How Much Primer Do I Need?',
      description: 'Calculate exactly how much primer you need for any room or surface. Instant results in gallons or litres. Free — no signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function PrimerCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Primer Calculator', item: 'https://thepaintcalculator.com/primer-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much primer do I need for a room?',
        acceptedAnswer: { '@type': 'Answer', text: 'One gallon of primer covers 200 to 300 square feet. A standard 12x12 room with 8ft ceilings has about 333 square feet of wall area — so one gallon of primer is enough for one coat on most rooms.' },
      },
      {
        '@type': 'Question',
        name: 'Do I always need primer before painting?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. Primer is needed for new drywall, major colour changes from dark to light, walls with stains or repairs, and bare wood or metal surfaces. For previously painted walls in good condition with a similar colour, you can skip primer.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of primer for a 12x12 room?',
        acceptedAnswer: { '@type': 'Answer', text: 'One gallon of primer is enough for a 12x12 room with 8ft ceilings in one coat. For heavily stained walls or new drywall buy 1.5 gallons to ensure full coverage.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best primer for new drywall?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sherwin-Williams ProBlock Primer and Zinsser Bulls Eye 1-2-3 are both excellent for new drywall. They seal the surface and prevent paint from soaking in unevenly. One coat is usually sufficient before painting.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of primer do I need?',
        acceptedAnswer: { '@type': 'Answer', text: 'One litre of primer covers approximately 8 to 10 square metres. A standard bedroom needs 3 to 4 litres of primer for one coat on the walls.' },
      },
      {
        '@type': 'Question',
        name: 'Can I use paint and primer in one?',
        acceptedAnswer: { '@type': 'Answer', text: 'Paint and primer in one works well for previously painted walls in good condition. For new drywall, stained walls, or major colour changes, a dedicated primer coat gives better results than paint and primer combined products.' },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Primer Calculator — How Much Primer Do I Need?',
    description: 'Complete guide to calculating how much primer you need for any room or surface including gallons and litres.',
    url: 'https://thepaintcalculator.com/primer-calculator',
    publisher: {
      '@type': 'Organization',
      name: 'ThePaintCalculator.com',
      url: 'https://thepaintcalculator.com',
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Primer Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Primer Calculator — How Much Primer Do I Need?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            One gallon of primer covers <strong>200 to 300 square feet</strong> (18 to 28 square metres). Use our free primer calculator below to get the exact amount for your room dimensions and surface type. Works for walls, ceilings, new drywall, wood and more. No signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon per room (3 to 4 litres)</p>
          <p className="text-sm opacity-90">For a standard 12x12 room with 8ft ceilings — one coat on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How Much Primer Do I Need?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Primer coverage depends on the surface type and condition. Standard interior primer covers 200 to 300 square feet per gallon — less than regular paint because primer is designed to penetrate and seal the surface rather than sit on top of it.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a typical 12x12 room with 8ft ceilings and one door and two windows, you have approximately 333 square feet of wall area. One gallon of primer covers this in a single coat. For larger rooms or rooms with heavily stained walls, buy 1.5 gallons to ensure complete coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, one litre of primer covers 8 to 10 square metres. A standard bedroom in the UK or Australia needs 3 to 4 litres for one primer coat on the walls. Most UK paint retailers sell primer in 2.5 litre tins — two tins are sufficient for most bedrooms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Primer Coverage Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Room Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Wall Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Primer Needed</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10x10 room</td>
                  <td className="px-4 py-3 text-gray-700">~269 sq ft</td>
                  <td className="px-4 py-3 text-gray-700">1 gallon</td>
                  <td className="px-4 py-3 text-gray-700">~3 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">12x12 room</td>
                  <td className="px-4 py-3 text-gray-700">~333 sq ft</td>
                  <td className="px-4 py-3 text-gray-700">1 gallon</td>
                  <td className="px-4 py-3 text-gray-700">~3.5 litres</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">12x14 room</td>
                  <td className="px-4 py-3 text-gray-700">~365 sq ft</td>
                  <td className="px-4 py-3 text-gray-700">1.5 gallons</td>
                  <td className="px-4 py-3 text-gray-700">~4 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">14x14 room</td>
                  <td className="px-4 py-3 text-gray-700">~420 sq ft</td>
                  <td className="px-4 py-3 text-gray-700">1.5 gallons</td>
                  <td className="px-4 py-3 text-gray-700">~5 litres</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-gray-800">Living room 16x20</td>
                  <td className="px-4 py-3 text-gray-700">~560 sq ft</td>
                  <td className="px-4 py-3 text-gray-700">2 gallons</td>
                  <td className="px-4 py-3 text-gray-700">~7 litres</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            When Do You Need Primer?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Primer is not always necessary. Here is exactly when you need it and when you can skip it.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Always use primer for new drywall.</strong> Fresh drywall is extremely porous and absorbs paint unevenly — giving a blotchy finish called flashing. One coat of drywall primer seals the surface and ensures even paint coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use primer for major colour changes.</strong> Going from a dark colour such as navy or forest green to a light colour like white or cream requires primer. Without it you will need 3 or 4 coats of paint to cover the dark colour. One coat of tinted primer gets you there in 2 coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use primer for stained walls.</strong> Water stains, smoke damage, marker, or grease stains bleed through regular paint. A stain-blocking primer like Zinsser BIN or Kilz Original seals them permanently in one coat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use primer for bare wood or metal.</strong> Raw wood and metal surfaces need a bonding primer before paint. Without it paint peels within months.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Skip primer for previously painted walls in good condition</strong> where you are making a similar colour change. Two coats of quality paint is all you need.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Primers for Every Surface
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Choosing the right primer matters as much as calculating the right quantity. Different surfaces need different primer formulas.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>New drywall:</strong> Sherwin-Williams ProBlock Primer ($28/gallon) or Zinsser Bulls Eye 1-2-3 ($25/gallon). Both seal drywall effectively and accept any topcoat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Stained walls:</strong> Zinsser BIN Shellac-Based Primer ($35/gallon) is the strongest stain blocker available. It seals water stains, smoke, and even marker permanently. Kilz Original ($22/gallon) is a budget alternative for light stains.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Dark colour change:</strong> Use a tinted primer — ask your paint store to tint it to a colour between your old and new colour. This reduces the number of topcoats needed from 3-4 down to 2.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Bare wood:</strong> Zinsser Cover Stain Oil-Based Primer ($30/gallon) is the best choice for raw wood trim and cabinets. It prevents tannin bleed and gives a hard smooth base.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Paint and primer in one:</strong> Behr Premium Plus ($34/gallon) and Sherwin-Williams SuperPaint ($58/gallon) both include primer in the formula. These work well for previously painted walls in good condition but are not a substitute for dedicated primer on new drywall or stains.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Applying Primer
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Thin coats dry faster.</strong> A thin even coat of primer dries in 1 to 2 hours. A thick coat takes 4 to 6 hours and is more likely to drip and sag.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Sand between primer and paint.</strong> Once primer is fully dry lightly sand the walls with 220 grit sandpaper. This removes any bumps or brush marks and gives a perfectly smooth base for your topcoat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Do not skip drying time.</strong> Most primers need at least 1 hour before recoating and some oil-based primers need 24 hours. Check the label — painting too soon causes the primer to peel.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Use the same applicator as your paint.</strong> If you are rolling your topcoat use a roller for primer too. This gives a consistent texture that looks better under the final coat.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/how-much-paint-for-10x10-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x10 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does it Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/paint-calculator-for-contractors`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator for Contractors →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much primer do I need for a room?</h3>
              <p className="text-gray-700">One gallon of primer covers 200 to 300 square feet. A standard 12x12 room needs one gallon for one coat on the walls. Larger rooms or heavily stained walls may need 1.5 gallons.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I always need primer before painting?</h3>
              <p className="text-gray-700">No. Primer is needed for new drywall, major colour changes, stained walls, and bare wood or metal. For previously painted walls in good condition with a similar colour you can skip primer and apply two coats of paint directly.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of primer for a 12x12 room?</h3>
              <p className="text-gray-700">One gallon covers a 12x12 room with 8ft ceilings in one coat. For heavily stained walls or new drywall buy 1.5 gallons to be safe.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best primer for new drywall?</h3>
              <p className="text-gray-700">Sherwin-Williams ProBlock and Zinsser Bulls Eye 1-2-3 are both excellent for new drywall. They seal the porous surface and prevent uneven paint absorption. One coat is usually enough before applying two coats of paint.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres of primer do I need?</h3>
              <p className="text-gray-700">One litre of primer covers 8 to 10 square metres. A standard bedroom needs 3 to 4 litres for one coat on the walls. Buy two 2.5 litre tins for most bedrooms.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use paint and primer in one?</h3>
              <p className="text-gray-700">Paint and primer in one works well for previously painted walls in good condition. For new drywall, stained walls, or major colour changes a dedicated primer coat gives significantly better results.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}