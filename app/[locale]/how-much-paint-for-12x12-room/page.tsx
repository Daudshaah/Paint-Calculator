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
      ? 'https://thepaintcalculator.com/how-much-paint-for-12x12-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-12x12-room`;

  return {
    title:
      'How Much Paint for a 12x12 Room — Free Calculator | ThePaintCalculator.com',
    description:
      'Find out exactly how much paint you need for a 12x12 room. Get instant results in gallons or litres. Free paint calculator — no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 12x12 Room — Free Calculator',
      description:
        'Find out exactly how much paint you need for a 12x12 room. Instant results in gallons or litres. Free — no signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function HowMuchPaintFor12x12Room({
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
        name: 'How Much Paint for a 12x12 Room',
        item: 'https://thepaintcalculator.com/how-much-paint-for-12x12-room',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a 12x12 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 12x12 room with 8ft ceilings needs approximately 1.5 to 2 gallons of paint for two coats on the walls. If you are painting the ceiling too, add another 0.5 gallons.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a 12x12 room with two coats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For two coats on the walls of a 12x12 room with 8ft ceilings, you need 1.5 to 2 gallons. Buying two quarts plus one gallon is the most cost effective approach.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a 12x12 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 12x12 room needs approximately 5 to 7 litres of paint for two coats on the walls. A single 5 litre tin may not be quite enough — buy a 5 litre plus a 1 litre top-up.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a 12x12 room the same as a standard bedroom?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 12x12 room is on the smaller end for a bedroom. The average US bedroom is 12x12 to 14x14. Our bedroom paint calculator gives you a more tailored estimate if you know your exact dimensions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need primer for a 12x12 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Primer is needed for new drywall, major colour changes, or walls with stains or repairs. For previously painted walls in good condition with a similar colour, two coats of quality paint is sufficient.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint a 12x12 room?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 12x12 room takes 3 to 5 hours to paint with two coats including drying time. Prep work such as taping edges and laying drop cloths adds another 30 to 60 minutes.',
        },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Paint for a 12x12 Room',
    description:
      'Complete guide to calculating how much paint you need for a 12x12 room including gallons, litres, coats and costs.',
    url: 'https://thepaintcalculator.com/how-much-paint-for-12x12-room',
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
              How Much Paint for a 12x12 Room
            </li>
          </ol>
        </nav>

        {/* H1 and intro */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 12x12 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A 12x12 room needs <strong>1.5 to 2 gallons</strong> (5 to 7 litres)
            of paint for two coats on the walls. Use our free paint calculator
            below to get the exact amount for your specific ceiling height,
            number of coats, and whether you are including the ceiling or trim.
            No signup required.
          </p>
        </div>

        {/* Quick answer box */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">
            Quick Answer
          </p>
          <p className="text-2xl font-bold mb-1">
            1.5 to 2 gallons (5 to 7 litres)
          </p>
          <p className="text-sm opacity-90">
            For a 12x12 room with 8ft ceilings — two coats on walls only
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
            How Much Paint Does a 12x12 Room Need?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 12x12 room has 384 square feet of wall space with 8ft
            ceilings — calculated as the perimeter (48 feet) multiplied by the
            ceiling height (8 feet). After deducting a standard door (21 sq ft)
            and two windows (30 sq ft total), you have approximately 333 square
            feet of paintable wall area.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            At 400 square feet coverage per gallon, one coat needs just under
            one gallon. For two coats you need approximately 1.7 gallons.
            The practical approach is to buy one gallon plus one quart — that
            gives you 1.25 gallons which covers most 12x12 rooms with two coats
            on smooth walls.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, the same room requires approximately 5 to 7 litres for
            two coats. A 5 litre tin may be just short — buy a 5 litre plus a
            1 litre tin to be safe. In the UK, Dulux and Crown both sell 6 litre
            tins that are the ideal size for a 12x12 room.
          </p>

          {/* Reference table */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            12x12 Room Paint Calculator — Reference Table
          </h2>
          <p className="text-gray-700 mb-4">
            Use this quick reference table to estimate paint needed based on
            ceiling height and number of coats for a 12x12 room.
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
                  <td className="px-4 py-3 text-gray-700">0.85 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">~6.5 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">9 ft</td>
                  <td className="px-4 py-3 text-gray-700">0.95 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">~7 litres</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10 ft</td>
                  <td className="px-4 py-3 text-gray-700">1.05 gal</td>
                  <td className="px-4 py-3 text-gray-700">2.1 gal</td>
                  <td className="px-4 py-3 text-gray-700">~8 litres</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">+ Ceiling</td>
                  <td className="px-4 py-3 text-gray-700">+0.4 gal</td>
                  <td className="px-4 py-3 text-gray-700">+0.7 gal</td>
                  <td className="px-4 py-3 text-gray-700">+2.5 litres</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            What Affects How Much Paint You Need for a 12x12 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The 1.5 to 2 gallon estimate assumes smooth walls in good condition
            with standard 8ft ceilings. Several factors will change how much
            paint you actually need.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Number of doors and windows</strong> reduces your paintable
            area. A 12x12 room with one door and two standard windows has about
            333 square feet of wall to paint. A room with more windows — such as
            a sunroom or kitchen — may need significantly less paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Wall texture</strong> increases paint consumption by 15 to
            20 percent. A heavily textured 12x12 room may need up to 2.5 gallons
            for two coats. Use our calculator above and select your surface
            condition for an accurate estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Colour change</strong> from dark to light requires primer
            plus two coats of paint. Budget an extra quart of primer on top of
            your paint estimate. Sherwin-Williams Extreme Block primer is
            excellent for covering dark colours in a single coat.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint for a 12x12 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A 12x12 room is a common bedroom or small living room size. The
            finish you choose matters as much as the colour — here are the best
            options for each room type.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>For a bedroom</strong> use an eggshell or satin finish.
            Behr Premium Plus Interior Eggshell ($34/gallon) gives a soft,
            washable finish that works well in bedrooms. One gallon covers the
            walls of most 12x12 bedrooms with two coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>For a living room</strong> use a satin or low-sheen finish.
            Sherwin-Williams Emerald Interior Satin ($92/gallon) is the premium
            choice with outstanding hide and a smooth, durable finish. One
            gallon is enough for a 12x12 living room.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>For a kitchen or bathroom</strong> use semi-gloss or gloss.
            Benjamin Moore Advance Semi-Gloss ($75/gallon) is highly washable
            and resists moisture — ideal for high-traffic rooms.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting a 12x12 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Start with the ceiling if painting it.</strong> Always paint
            top to bottom. Ceiling drips onto walls get covered when you roll
            the walls.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Cut in before rolling.</strong> Use a 2.5-inch angled brush
            to paint a 2-3 inch border around all edges, corners, and trim
            before rolling the main wall areas.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use a W or M rolling pattern.</strong> Roll in a W or M
            shape on the wall then fill in without lifting the roller. This
            avoids lap marks and gives even coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Keep a wet edge.</strong> Work quickly enough that each new
            roller stroke overlaps with still-wet paint. Letting paint dry
            between strokes creates visible lines.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Buy 10 percent extra.</strong> Always purchase slightly more
            than calculated. Touch-ups months later require the exact same
            colour from the same batch — impossible if you run out.
          </p>

          {/* Internal links */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <p className="text-gray-700 mb-4">
            Need paint estimates for a different room size or surface? Try
            one of these free calculators.
          </p>
          <ul className="space-y-2 mb-8">
            <li>
              <Link
                href={`/${locale}/how-much-paint-for-10x10-room`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                How Much Paint for a 10x10 Room →
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/how-much-paint-for-12x14-room`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                How Much Paint for a 12x14 Room →
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

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How much paint do I need for a 12x12 room?
              </h3>
              <p className="text-gray-700">
                A 12x12 room with 8ft ceilings needs 1.5 to 2 gallons (5 to 7
                litres) for two coats on the walls. Buy one gallon plus one
                quart for smooth walls or two full gallons for textured walls.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How many gallons for a 12x12 room with two coats?
              </h3>
              <p className="text-gray-700">
                Two coats on the walls of a 12x12 room requires 1.5 to 2
                gallons. One gallon plus one quart covers most 12x12 rooms
                with smooth walls. For textured walls or a major colour change
                buy two full gallons.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How many litres of paint for a 12x12 room?
              </h3>
              <p className="text-gray-700">
                A 12x12 room needs 5 to 7 litres for two coats on the walls.
                Buy a 5 litre tin plus a 1 litre top-up. In the UK a standard
                6 litre Dulux tin is the right size for this room.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is a 12x12 room a standard bedroom size?
              </h3>
              <p className="text-gray-700">
                Yes — 12x12 is a common small to medium bedroom size in the US.
                The average American bedroom ranges from 12x12 to 14x14. Use
                our bedroom paint calculator for a more detailed estimate based
                on your exact room dimensions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do I need primer for a 12x12 room?
              </h3>
              <p className="text-gray-700">
                Primer is needed for new drywall, major colour changes from dark
                to light, or walls with visible stains. For walls already
                painted in a similar colour and in good condition, skip primer
                and apply two coats of quality paint.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does it take to paint a 12x12 room?
              </h3>
              <p className="text-gray-700">
                Expect 3 to 5 hours for a 12x12 room with two coats including
                prep and drying time between coats. An experienced painter can
                do it in 2 to 3 hours. First time painters should allow a full
                day to avoid rushing.
              </p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}