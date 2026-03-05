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
      ? 'https://thepaintcalculator.com/how-much-paint-for-12x14-room'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-12x14-room`;

  return {
    title: 'How Much Paint for a 12x14 Room — Free Calculator | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a 12x14 room. Get instant results in gallons or litres. Free paint calculator — no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a 12x14 Room — Free Calculator',
      description: 'Find out exactly how much paint you need for a 12x14 room. Instant results in gallons or litres. Free — no signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function HowMuchPaintFor12x14Room({
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
      { '@type': 'ListItem', position: 2, name: 'How Much Paint for a 12x14 Room', item: 'https://thepaintcalculator.com/how-much-paint-for-12x14-room' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a 12x14 room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 12x14 room with 8ft ceilings needs approximately 1.5 to 2 gallons of paint for two coats on the walls. If you are painting the ceiling too, add another 0.5 gallons.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a 12x14 room with two coats?',
        acceptedAnswer: { '@type': 'Answer', text: 'For two coats on the walls of a 12x14 room with 8ft ceilings, you need 1.5 to 2 gallons. One gallon plus one quart covers most 12x14 rooms with smooth walls.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a 12x14 room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 12x14 room needs approximately 6 to 8 litres of paint for two coats on the walls. Buy a 5 litre tin plus a 2.5 litre tin to be safe.' },
      },
      {
        '@type': 'Question',
        name: 'Is a 12x14 room a standard bedroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — 12x14 is a common medium bedroom size in the US and UK. It fits a queen bed with side tables and a small dresser comfortably.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need primer for a 12x14 room?',
        acceptedAnswer: { '@type': 'Answer', text: 'Primer is needed for new drywall, major colour changes, or walls with stains. For previously painted walls in good condition with a similar colour, two coats of quality paint is sufficient.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint a 12x14 room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 12x14 room takes 3 to 5 hours to paint with two coats including drying time. Prep work such as taping and laying drop cloths adds another 30 to 60 minutes.' },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Paint for a 12x14 Room',
    description: 'Complete guide to calculating how much paint you need for a 12x14 room including gallons, litres, coats and costs.',
    url: 'https://thepaintcalculator.com/how-much-paint-for-12x14-room',
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
            <li className="text-gray-700 font-medium">How Much Paint for a 12x14 Room</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a 12x14 Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A 12x14 room needs <strong>1.5 to 2 gallons</strong> (6 to 8 litres) of paint for two coats on the walls. Use our free paint calculator below to get the exact amount for your ceiling height, number of coats, and whether you are including the ceiling or trim. No signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1.5 to 2 gallons (6 to 8 litres)</p>
          <p className="text-sm opacity-90">For a 12x14 room with 8ft ceilings — two coats on walls only</p>
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
            How Much Paint Does a 12x14 Room Need?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 12x14 room has 416 square feet of wall space with 8ft ceilings — calculated as the perimeter (52 feet) multiplied by the ceiling height (8 feet). After deducting a standard door (21 sq ft) and two windows (30 sq ft total), you have approximately 365 square feet of paintable wall area.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            At 400 square feet coverage per gallon, one coat needs just under one gallon. For two coats you need approximately 1.8 gallons. The practical approach is one gallon plus one quart for smooth walls, or two full gallons for textured walls or a colour change.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a 12x14 room requires approximately 6 to 8 litres for two coats. Buy a 5 litre tin plus a 2.5 litre tin. In the UK and Australia, two 4 litre tins of Dulux or Taubmans interior paint covers this room comfortably.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            12x14 Room Paint Reference Table
          </h2>
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
                  <td className="px-4 py-3 text-gray-700">0.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">1.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">~7 litres</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">9 ft</td>
                  <td className="px-4 py-3 text-gray-700">1.0 gal</td>
                  <td className="px-4 py-3 text-gray-700">2.0 gal</td>
                  <td className="px-4 py-3 text-gray-700">~7.5 litres</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10 ft</td>
                  <td className="px-4 py-3 text-gray-700">1.1 gal</td>
                  <td className="px-4 py-3 text-gray-700">2.2 gal</td>
                  <td className="px-4 py-3 text-gray-700">~8.5 litres</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">+ Ceiling</td>
                  <td className="px-4 py-3 text-gray-700">+0.4 gal</td>
                  <td className="px-4 py-3 text-gray-700">+0.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">+3 litres</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            What Affects Paint Coverage in a 12x14 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The 1.5 to 2 gallon estimate assumes smooth walls in good condition. Textured walls absorb 15 to 20 percent more paint — budget 2 to 2.5 gallons for textured walls with two coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Going from a dark colour to a light one requires primer. Kilz Premium Primer ($22/gallon) or Zinsser Bulls Eye 1-2-3 ($25/gallon) are excellent choices that seal the old colour in one coat. Add a quart of primer to your shopping list.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Paint quality directly affects how many coats you need. Premium paints like Behr Marquee ($58/gallon) often cover in a single coat — meaning one gallon may be enough for a 12x14 room. Budget paints almost always need two coats minimum.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Paint for a 12x14 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a bedroom use eggshell or satin finish. Behr Premium Plus Interior Eggshell ($34/gallon) gives a soft washable finish that works well in bedrooms. One gallon covers the walls of most 12x14 bedrooms with two coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a living room use satin finish. Sherwin-Williams Emerald Interior Satin ($92/gallon) is the premium choice with outstanding hide and a smooth durable finish. For a budget option Behr Ultra Satin ($45/gallon) performs nearly as well at half the price.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Popular colours for a 12x14 room include Sherwin-Williams Agreeable Gray (SW 7029), Benjamin Moore White Dove (OC-17), and Behr Cracked Pepper (N520-7) for a bold accent wall.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting a 12x14 Room
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use a 9-inch roller with a half-inch nap</strong> for smooth to slightly textured walls. For heavily textured walls use a three-quarter inch nap roller.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Paint in natural light.</strong> Artificial lighting changes how colours appear. Always check your colour sample in daylight before painting the full room.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Roll in a consistent direction.</strong> Always finish with vertical strokes on the final pass to minimise roller marks and give the most even finish.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Allow 24 hours before replacing furniture.</strong> Paint feels dry after 2 hours but takes 24 hours to fully cure. Moving furniture too soon causes scuffs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/how-much-paint-for-10x10-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x10 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-14x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 14x14 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for a 12x14 room?</h3>
              <p className="text-gray-700">A 12x14 room with 8ft ceilings needs 1.5 to 2 gallons (6 to 8 litres) for two coats on the walls. One gallon plus one quart covers most 12x14 rooms with smooth walls.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons for a 12x14 room with two coats?</h3>
              <p className="text-gray-700">Two coats on the walls of a 12x14 room requires 1.5 to 2 gallons. Buy one gallon plus one quart for smooth walls or two full gallons for textured walls or a colour change.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres for a 12x14 room?</h3>
              <p className="text-gray-700">A 12x14 room needs 6 to 8 litres for two coats. Buy a 5 litre tin plus a 2.5 litre tin. In Australia and the UK a 7.5 litre combined purchase covers this room comfortably.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is a 12x14 room a standard bedroom size?</h3>
              <p className="text-gray-700">Yes — 12x14 is a comfortable medium bedroom. It fits a queen bed with side tables and a small dresser with room to move. The average US bedroom is between 12x12 and 14x14.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer for a 12x14 room?</h3>
              <p className="text-gray-700">Primer is needed for new drywall, major colour changes, or walls with stains. For walls already painted in a similar colour and in good condition, skip primer and use two coats of quality paint.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 12x14 room?</h3>
              <p className="text-gray-700">A 12x14 room takes 3 to 5 hours with two coats including prep and drying time. Allow a full day if this is your first time painting a room.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}