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
      ? 'https://thepaintcalculator.com/living-room-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/living-room-paint-calculator`;
  return {
    title: 'Living Room Paint Calculator — How Much Paint for a Living Room? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your living room. Pre-filled for a standard 16x14 living room. Free instant results in gallons or litres. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Living Room Paint Calculator — How Much Paint for a Living Room?',
      description: 'Calculate exactly how much paint you need for your living room. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function LivingRoomPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Living Room Paint Calculator', item: 'https://thepaintcalculator.com/living-room-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most living rooms need 2 to 3 gallons of paint for two coats on the walls. A standard 16x14 living room with 9ft ceilings needs about 2.3 gallons after deducting doors and windows.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'Eggshell is the best finish for living rooms. It has a soft low-sheen look that hides wall imperfections, is washable, and holds up to everyday use. Satin is a good alternative for high-traffic living rooms.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a large living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A large living room measuring 18x20 or bigger needs 3 to 4 gallons for two coats on the walls. Add another 1 to 1.5 gallons if you are also painting the ceiling.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard living room needs 8 to 11 litres of paint for two coats on the walls. Buy two 5 litre tins for most living rooms. A large open-plan space may need three 5 litre tins.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint the living room ceiling the same colour as walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most living rooms have white or off-white ceilings which create contrast and make the room feel taller. Matching ceiling and walls works well in rooms with very high ceilings and creates a cocooning effect.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard living room takes 6 to 8 hours to paint with two coats including prep and drying time. A large living room may take a full day. Move all furniture to the centre before starting.' },
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
            <li className="text-gray-700 font-medium">Living Room Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Living Room Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Most living rooms need <strong>2 to 3 gallons</strong> (8 to 11 litres) of paint for two coats on the walls. Pre-filled for a standard 16x14 living room with 9ft ceilings — adjust for your size. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 3 gallons (8 to 11 litres)</p>
          <p className="text-sm opacity-90">For a standard 16x14 living room with 9ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Living Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Living rooms are typically the largest room in a home which means they need more paint than bedrooms or bathrooms. A standard 16x14 living room has approximately 540 square feet of gross wall area with 9ft ceilings. After deducting one door and two large windows, the paintable area is around 460 square feet. At 400 square feet per gallon with two coats, that equals about 2.3 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most homeowners buy 3 gallons for a standard living room — giving enough for two full coats plus extra for touch-ups. An open-plan living and dining room measuring 20x18 or larger will need 4 to 5 gallons for two coats. Use the calculator above and enter your exact dimensions for a precise estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard living room needs 8 to 11 litres for two coats. Two 5 litre tins is the standard purchase for most living rooms. A large open-plan space may need three 5 litre tins.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Living Room Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Living Room Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['12x14 (small)', '1.1 gal', '2.2 gal', '~8 litres'],
                  ['14x16 (medium)', '1.3 gal', '2.6 gal', '~10 litres'],
                  ['16x14 (standard)', '1.2 gal', '2.4 gal', '~9 litres'],
                  ['18x16 (large)', '1.6 gal', '3.2 gal', '~12 litres'],
                  ['20x18 (open plan)', '2.0 gal', '4.0 gal', '~15 litres'],
                ].map(([size, one, two, litres], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                    <td className="px-4 py-3 text-gray-700">{litres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Living Room</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Eggshell is the most popular finish for living rooms. It has a soft low-sheen appearance that looks elegant, hides minor wall imperfections, and is washable for everyday family life. Most interior designers specify eggshell as the default for living room walls.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is a good alternative if your living room gets heavy use or has children and pets. Avoid flat paint in living rooms unless you have perfectly smooth walls — flat paint marks easily and cannot be scrubbed.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Colours for a Living Room in 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Living room colour trends in 2026 lean toward warm earthy tones, soft greens, and deep moody blues. <strong>Sherwin-Williams Agreeable Gray (SW 7029)</strong> remains the most popular living room colour in the US. <strong>Benjamin Moore Pale Oak (OC-20)</strong> is a warm beige that feels sophisticated and pairs well with natural materials. <strong>Farrow & Ball Mizzle (No.266)</strong> is a muted sage green that suits both modern and traditional living rooms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For accent walls, <strong>Sherwin-Williams Cyberspace (SW 7076)</strong> and <strong>Benjamin Moore Black Forest Green (2047-10)</strong> are trending as bold statement colours behind sofas and media walls.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Living Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Move all furniture to the centre first.</strong> Living rooms have the most furniture of any room — plan at least 30 minutes for prep before opening any paint.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint an accent wall first.</strong> If doing an accent wall in a different colour, paint it first and let it dry fully before cutting in adjacent wall colours.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a 9-inch roller with half-inch nap.</strong> Living rooms have large flat walls where a wide roller saves significant time.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Cut in before rolling.</strong> Use a 2.5-inch angled brush to cut in all edges and corners before rolling the main wall areas.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Check colour in natural and artificial light.</strong> Always test a large patch and check it at different times of day before committing to the full room.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a living room?', 'Most living rooms need 2 to 3 gallons for two coats on the walls. A standard 16x14 living room needs about 2.3 gallons. Use the calculator above and enter your exact dimensions for a precise estimate.'],
              ['What paint finish is best for a living room?', 'Eggshell is the best finish for most living rooms. It looks elegant, hides wall imperfections, and is washable. Satin is a good alternative for high-traffic living rooms with children or pets.'],
              ['How many gallons for a large living room?', 'A large living room measuring 18x20 or bigger needs 3 to 4 gallons for two coats. Add another 1 to 1.5 gallons if you are also painting the ceiling.'],
              ['How many litres of paint for a living room?', 'A standard living room needs 8 to 11 litres for two coats. Two 5 litre tins covers most living rooms. A large open-plan space may need three 5 litre tins.'],
              ['Should I paint the living room ceiling the same colour as walls?', 'Most living rooms have white or off-white ceilings which create contrast and make the room feel taller. Matching ceiling and walls works well in rooms with very high ceilings.'],
              ['How long does it take to paint a living room?', 'A standard living room takes 6 to 8 hours with two coats including prep and drying time. A large living room may take a full day. Move all furniture to the centre before starting.'],
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