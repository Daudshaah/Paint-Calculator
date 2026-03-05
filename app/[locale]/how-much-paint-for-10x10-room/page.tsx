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
      ? 'https://thepaintcalculator.com/how-much-paint-for-10x10-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-10x10-room`;

  return {
    title:
      'How Much Paint for a 10x10 Room — Free Calculator | ThePaintCalculator.com',
    description:
      'Find out exactly how much paint you need for a 10x10 room. Get instant results in gallons or litres. Free paint calculator — no signup required.',
    alternates: {
      canonical,
    },
    openGraph: {
      title: 'How Much Paint for a 10x10 Room — Free Calculator',
      description:
        'Find out exactly how much paint you need for a 10x10 room. Get instant results in gallons or litres. Free — no signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function HowMuchPaintFor10x10Room({
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thepaintcalculator.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'How Much Paint for a 10x10 Room',
        item: 'https://thepaintcalculator.com/how-much-paint-for-10x10-room',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a 10x10 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 10x10 room with 8ft ceilings needs approximately 1 to 1.5 gallons of paint for two coats on the walls only. If you are painting the ceiling too, add another 0.5 gallons.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a 10x10 room with two coats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For two coats on the walls of a 10x10 room with 8ft ceilings, you need 1 to 1.5 gallons. Buy a single gallon to start — most standard paints cover 350 to 400 square feet per gallon.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a 10x10 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 10x10 room needs approximately 4 to 6 litres of paint for two coats on the walls. In metric, standard paint covers around 10 to 12 square metres per litre.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need primer for a 10x10 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If the walls are already painted in a similar colour and in good condition, primer is not required. For new drywall, dark colours, or stains, use one coat of primer before painting.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint a 10x10 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 10x10 room takes 2 to 4 hours to paint with two coats including drying time between coats. Prep work such as taping and laying drop cloths adds another 30 to 60 minutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What size paint can do I need for a 10x10 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A single quart of paint covers approximately 100 square feet — enough for one coat on a 10x10 room. For two coats buy a full gallon. Most paint stores sell quarts and gallons.',
        },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Paint for a 10x10 Room',
    description:
      'Complete guide to calculating how much paint you need for a 10x10 room including gallons, litres, coats and costs.',
    url: 'https://thepaintcalculator.com/how-much-paint-for-10x10-room',
    publisher: {
      '@type': 'Organization',
      name: 'ThePaintCalculator.com',
      url: 'https://thepaintcalculator.com',
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">
              How Much Paint for a 10x10 Room
            </li>
          </ol>
        </nav>

        {/* H1 and intro */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 10x10 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A 10x10 room needs <strong>1 to 1.5 gallons</strong> (4 to 6 litres)
            of paint for two coats on the walls. Use our free paint calculator
            below to get the exact amount for your specific room height,
            number of coats, and whether you are painting the ceiling or trim.
            No signup required.
          </p>
        </div>

        {/* Quick answer box */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">
            Quick Answer
          </p>
          <p className="text-2xl font-bold mb-1">
            1 to 1.5 gallons (4 to 6 litres)
          </p>
          <p className="text-sm opacity-90">
            For a 10x10 room with 8ft ceilings — two coats on walls only
          </p>
        </div>

        {/* Calculator */}
        <Suspense
          fallback={
            <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
              <p className="text-gray-500">Loading calculator...</p>
            </div>
          }
        >
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        {/* Article content */}
        <article className="max-w-3xl mx-auto mt-16 prose prose-gray prose-lg">

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How Much Paint Does a 10x10 Room Need?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 10x10 room has 320 square feet of wall space with 8ft
            ceilings — calculated as the perimeter (40 feet) multiplied by the
            ceiling height (8 feet). After deducting a standard door (21 sq ft)
            and two windows (30 sq ft total), you have approximately 269 square
            feet of paintable wall area.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            At 400 square feet coverage per gallon, one coat needs under one
            gallon. For two coats — which most professionals recommend for a
            solid finish — you need approximately 1.3 gallons. Rounding up to
            buy one full gallon plus one quart is the smart approach.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, the same room requires approximately 4 to 5 litres for
            two coats. Standard UK and Australian paint tins come in 2.5 litre
            and 5 litre sizes — a single 5 litre tin is usually enough for a
            10x10 room with two coats.
          </p>

          {/* Paint reference table */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            10x10 Room Paint Calculator — Reference Table
          </h2>
          <p className="text-gray-700 mb-4">
            Use this quick reference table to estimate paint needed based on
            ceiling height and number of coats.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Ceiling Height</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">8 ft (standard)</td>
                  <td className="px-4 py-3 text-gray-700">0.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.3 gal</td>
                  <td className="px-4 py-3 text-gray-700">~5 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">9 ft</td>
                  <td className="px-4 py-3 text-gray-700">0.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.5 gal</td>
                  <td className="px-4 py-3 text-gray-700">~6 litres</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10 ft</td>
                  <td className="px-4 py-3 text-gray-700">0.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">~6.5 litres</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">+ Ceiling</td>
                  <td className="px-4 py-3 text-gray-700">+0.3 gal</td>
                  <td className="px-4 py-3 text-gray-700">+0.5 gal</td>
                  <td className="px-4 py-3 text-gray-700">+2 litres</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            What Affects How Much Paint You Need
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The 1 to 1.5 gallon estimate assumes smooth walls in good condition
            with standard 8ft ceilings. Several factors can increase or decrease
            how much paint you actually need.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Wall texture</strong> is the biggest variable. Textured walls
            — such as orange peel, knockdown, or skip trowel — absorb 15 to 20
            percent more paint than smooth walls. For a textured 10x10 room,
            budget 1.5 to 2 gallons for two coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Colour change</strong> also matters. Going from a dark colour
            to a light one — or painting new drywall — typically requires a coat
            of primer plus two coats of paint. Add a quart of primer to your
            shopping list in this case.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Paint quality</strong> affects coverage rate. Premium paints
            like Behr Marquee and Sherwin-Williams Emerald cover 350 to 400
            square feet per gallon and often achieve full coverage in one coat.
            Budget paints cover 250 to 300 square feet and almost always need
            two coats.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint for a 10x10 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a small room like a 10x10, quality matters more than saving a
            few dollars on a cheaper can. Here are three paints that work well
            and give excellent coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Behr Premium Plus Interior</strong> ($34/gallon) is the best
            value for a 10x10 room. It covers 400 square feet per gallon and is
            available in eggshell, satin, and semi-gloss finishes. One gallon is
            enough for two coats in most 10x10 rooms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams SuperPaint</strong> ($58/gallon) is a
            professional-grade option that hides dark colours better than most.
            Worth the extra cost if you are making a dramatic colour change.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Benjamin Moore Regal Select</strong> ($62/gallon) offers the
            smoothest finish and is particularly good for bedrooms and living
            rooms where you want a premium look.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting a 10x10 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Buy 10 percent extra.</strong> Always purchase slightly more
            paint than calculated. You will need it for touch-ups months later
            and the exact batch colour may not be available again.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use a 9-inch roller for walls.</strong> A standard 9-inch
            roller covers a 10x10 room efficiently. Use a 2.5-inch angled brush
            for cutting in around edges.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Let the first coat dry fully.</strong> Wait at least 2 hours
            between coats for latex paint — 4 hours for oil-based. Rushing the
            second coat causes peeling.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Paint ceiling first, walls second.</strong> Always paint top
            to bottom. Any ceiling drips onto walls get covered when you paint
            the walls.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Use FrogTape not masking tape.</strong> FrogTape creates
            cleaner lines than standard blue painter's tape, especially on
            textured walls.
          </p>

          {/* Internal links */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <p className="text-gray-700 mb-4">
            Need to calculate paint for a different room size or surface? Use
            one of our free calculators below.
          </p>
          <ul className="space-y-2 mb-8">
            <li>
              <Link
                href={`/${locale}/how-much-paint-for-12x12-room`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                How Much Paint for a 12x12 Room →
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/how-much-paint-for-bedroom`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Bedroom Paint Calculator →
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/primer-calculator`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Primer Calculator — How Much Primer Do I Need? →
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/how-much-does-it-cost-to-paint-a-room`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                How Much Does it Cost to Paint a Room? →
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Free Paint Calculator — Calculate Any Room →
              </Link>
            </li>
          </ul>

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How much paint do I need for a 10x10 room?
              </h3>
              <p className="text-gray-700">
                A 10x10 room with 8ft ceilings needs 1 to 1.5 gallons (4 to 6
                litres) for two coats on the walls. If you are also painting the
                ceiling, add another 0.5 gallons. Use the calculator above for
                your exact dimensions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How many gallons of paint for a 10x10 room with two coats?
              </h3>
              <p className="text-gray-700">
                Two coats on the walls of a 10x10 room requires 1 to 1.5
                gallons. Buying one full gallon is usually enough. If your walls
                are textured or you are covering a dark colour, buy a gallon
                plus a quart to be safe.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How many litres of paint for a 10x10 room?
              </h3>
              <p className="text-gray-700">
                A 10x10 room needs approximately 4 to 6 litres for two coats on
                the walls. A standard 5 litre tin is the right size for most
                10x10 rooms. In the UK and Australia, Dulux and Taubmans both
                sell 5 litre tins that are ideal for this size.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do I need primer for a 10x10 room?
              </h3>
              <p className="text-gray-700">
                Primer is needed for new drywall, major colour changes (dark to
                light), or walls with stains. For previously painted walls in
                good condition with a similar colour, you can skip primer and
                apply two coats of paint directly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does it take to paint a 10x10 room?
              </h3>
              <p className="text-gray-700">
                Expect 2 to 4 hours total for a 10x10 room including prep,
                cutting in, rolling, and a second coat. Allow 2 hours drying
                time between coats for latex paint.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What size paint can for a 10x10 room?
              </h3>
              <p className="text-gray-700">
                Buy a single gallon (3.78 litres) for a 10x10 room with one
                coat. For two coats buy one gallon plus one quart. Most paint
                stores sell quart (0.94 litre) and gallon sizes — avoid buying
                5 gallon buckets for a room this small.
              </p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}