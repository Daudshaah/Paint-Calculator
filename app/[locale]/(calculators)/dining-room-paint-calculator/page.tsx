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
      ? 'https://thepaintcalculator.com/dining-room-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/dining-room-paint-calculator`;
  return {
    title: 'Dining Room Paint Calculator — How Much Paint for a Dining Room? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your dining room. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Dining Room Paint Calculator — How Much Paint for a Dining Room?',
      description: 'Calculate exactly how much paint you need for your dining room. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function DiningRoomPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Dining Room Paint Calculator', item: 'https://thepaintcalculator.com/dining-room-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a dining room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard dining room measuring 12x14 with 9ft ceilings needs about 1.8 to 2 gallons for two coats on the walls. A smaller 10x12 dining room needs about 1.5 gallons. Use the calculator above for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a dining room?',
        acceptedAnswer: { '@type': 'Answer', text: 'Eggshell or satin is best for dining rooms. Eggshell gives a refined low-sheen look ideal for formal dining rooms. Satin is more washable and better for family dining rooms that see daily use and occasional food splatter.' },
      },
      {
        '@type': 'Question',
        name: 'What are the best dining room paint colours?',
        acceptedAnswer: { '@type': 'Answer', text: 'Deep moody tones like navy, forest green, burgundy, and charcoal are extremely popular in dining rooms. These colours create an intimate atmosphere that enhances the dining experience. Warm neutrals and off-whites work well in smaller dining rooms that need to feel larger.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a dining room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12x14 dining room needs 7 to 8 litres for two coats on the walls. A 5 litre tin plus a 2.5 litre tin covers most dining rooms. A larger dining room may need two 5 litre tins.' },
      },
      {
        '@type': 'Question',
        name: 'Should dining room and living room be the same colour?',
        acceptedAnswer: { '@type': 'Answer', text: 'In open-plan homes, using the same colour or complementary tones creates a cohesive flow. In separate rooms, the dining room can take a bolder or deeper version of the living room colour for a more intimate feel.' },
      },
      {
        '@type': 'Question',
        name: 'Can I use dark paint in a small dining room?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — dark paint actually works well in small dining rooms. A deep colour wraps the room in atmosphere and makes it feel cosy and intentional rather than cramped. Use good artificial lighting and keep table linens and trim light to balance the dark walls.' },
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
            <li className="text-gray-700 font-medium">Dining Room Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Dining Room Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard dining room needs <strong>1.5 to 2 gallons</strong> (6 to 8 litres) for two coats on the walls. Enter your dining room dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1.5 to 2 gallons (6 to 8 litres)</p>
          <p className="text-sm opacity-90">For a standard 12x14 dining room with 9ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Dining Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard dining room measuring 12x14 with 9ft ceilings has approximately 468 square feet of gross wall area. After deducting one door and one or two windows, the paintable wall area is around 390 square feet. At 400 square feet per gallon with two coats, that equals about 1.95 gallons — most homeowners buy 2 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A smaller 10x12 dining room needs about 1.5 gallons for two coats. A large formal dining room measuring 14x18 will need 2.5 to 3 gallons. If you are painting a bold or dark colour over a light wall, always budget for a third coat — deep colours often require three coats for full opaque coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard dining room needs 6 to 8 litres for two coats. A 5 litre tin plus a 2.5 litre tin covers most dining rooms. A larger dining room may need two 5 litre tins.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Dining Room Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Dining Room Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['10x10 (small)', '0.65 gal', '1.3 gal', '~5 litres'],
                  ['10x12 (medium)', '0.75 gal', '1.5 gal', '~5.5 litres'],
                  ['12x14 (standard)', '0.95 gal', '1.9 gal', '~7 litres'],
                  ['14x16 (large)', '1.2 gal', '2.4 gal', '~9 litres'],
                  ['14x18 (formal)', '1.35 gal', '2.7 gal', '~10 litres'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Dining Room</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Eggshell is the most popular finish for formal dining rooms. It gives a refined low-sheen appearance that looks elegant under candlelight and artificial dining room lighting. Satin is the better choice for family dining rooms that see daily use — it is more washable and handles food splatter, greasy fingers, and regular wiping without damage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Avoid flat paint in dining rooms. Dining rooms are social spaces that accumulate marks and stains over time. Flat paint cannot be scrubbed clean without damaging the surface.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Colours for a Dining Room in 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Dining rooms are the one room in a home where bold and dramatic colours consistently work well. The room is used primarily in the evening under artificial light, which means deep saturated tones look rich and atmospheric rather than dark and oppressive. Navy, forest green, burgundy, charcoal, and deep teal are the most popular dining room colour choices.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Farrow & Ball Hague Blue (No.30)</strong> is arguably the most famous dining room colour in the world — a deep teal-navy that looks extraordinary under candlelight. <strong>Benjamin Moore Black Forest Green (2047-10)</strong> is a deep forest green that creates a dramatic botanical atmosphere. <strong>Sherwin-Williams Burgundy (SW 6300)</strong> is a rich red-brown that evokes traditional formal dining rooms and pairs beautifully with dark wood furniture.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For smaller dining rooms or those connected to open-plan living spaces, warmer neutrals work better. <strong>Benjamin Moore AF-20 Pale Straw</strong> is a warm golden white that makes small dining rooms feel bright and welcoming. <strong>Sherwin-Williams Accessible Beige (SW 7036)</strong> is a reliable warm greige that bridges dining and living spaces seamlessly.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Dining Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Move the dining table and chairs out first.</strong> Dining room furniture is large and heavy. Move it out of the room entirely rather than pushing it to the centre — you need access to all four walls without obstacles.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy extra for dark colours.</strong> Deep navy, green, and burgundy typically require three coats over a light base. Buy 50% more paint than the calculator suggests when going from light to dark.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use tinted primer for dramatic colour changes.</strong> Ask your paint store to tint a primer to a mid-tone of your chosen colour before applying the top coats. This reduces the number of top coats needed for full coverage.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint the ceiling too for maximum drama.</strong> In dining rooms, painting the ceiling the same deep colour as the walls creates an immersive cocoon effect that is very popular in formal dining spaces.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Check the colour under dining lighting.</strong> Dining rooms are used primarily at night. Always check your test swatch under the room's artificial lighting in the evening — colours look completely different under warm incandescent or pendant lighting versus daylight.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Ceiling Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a dining room?', 'A standard 12x14 dining room needs about 1.9 gallons for two coats on the walls. A smaller 10x12 dining room needs about 1.5 gallons. Use the calculator above for a precise estimate.'],
              ['What paint finish is best for a dining room?', 'Eggshell for formal dining rooms, satin for family dining rooms. Eggshell looks elegant and refined. Satin is more washable and handles food splatter and daily use better.'],
              ['What are the best dining room paint colours?', 'Deep moody tones like navy, forest green, and burgundy are extremely popular. Farrow & Ball Hague Blue, Benjamin Moore Black Forest Green, and Sherwin-Williams Burgundy are top choices. Warm neutrals work well in smaller dining rooms.'],
              ['How many litres of paint for a dining room?', 'A standard 12x14 dining room needs 6 to 8 litres for two coats. A 5 litre tin plus a 2.5 litre tin covers most dining rooms. A larger dining room may need two 5 litre tins.'],
              ['Should dining room and living room be the same colour?', 'In open-plan homes use the same or complementary tones for cohesive flow. In separate rooms, the dining room can take a bolder or deeper version of the living room colour for a more intimate atmosphere.'],
              ['Can I use dark paint in a small dining room?', 'Yes — dark paint works well in small dining rooms. Deep colour creates atmosphere and makes the room feel cosy. Use good artificial lighting and keep trim and table linens light to balance the dark walls.'],
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
