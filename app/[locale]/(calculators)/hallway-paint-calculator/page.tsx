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
      ? 'https://thepaintcalculator.com/hallway-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/hallway-paint-calculator`;
  return {
    title: 'Hallway Paint Calculator — How Much Paint for a Hallway? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your hallway. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Hallway Paint Calculator — How Much Paint for a Hallway?',
      description: 'Calculate exactly how much paint you need for your hallway. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function HallwayPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Hallway Paint Calculator', item: 'https://thepaintcalculator.com/hallway-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a hallway?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard hallway measuring 4x12 with 8ft ceilings needs about 0.7 gallons for two coats on the walls. A longer hallway measuring 4x20 needs about 1 gallon for two coats. Use the calculator above for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a hallway?',
        acceptedAnswer: { '@type': 'Answer', text: 'Satin is the best finish for hallways. Hallways are high-traffic areas that get scuffed and touched constantly. Satin is durable, washable, and holds up to daily use far better than eggshell or flat finishes.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a hallway?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard hallway needs 2.5 to 4 litres for two coats. A single 2.5 litre tin covers most small hallways. A longer hallway needs a 5 litre tin.' },
      },
      {
        '@type': 'Question',
        name: 'What colour should I paint my hallway?',
        acceptedAnswer: { '@type': 'Answer', text: 'Light neutrals make narrow hallways feel wider and brighter. Off-whites, warm creams, and light grays are the most popular hallway colours. If your hallway has no natural light, use a warm white with yellow undertones to avoid a cold clinical feel.' },
      },
      {
        '@type': 'Question',
        name: 'How do I paint a narrow hallway?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use a small 4-inch roller or a brush for narrow hallways where a standard roller cannot fit comfortably. Remove all pictures and hooks before painting. Use a mini roller for the walls and a 2-inch angled brush to cut in edges and corners.' },
      },
      {
        '@type': 'Question',
        name: 'Should hallway and living room be the same colour?',
        acceptedAnswer: { '@type': 'Answer', text: 'Using the same colour or a lighter shade of the same colour family in the hallway creates a cohesive flow between spaces. A hallway that is a slightly lighter version of the living room colour makes the home feel larger and more connected.' },
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
            <li className="text-gray-700 font-medium">Hallway Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Hallway Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Most hallways need <strong>1 to 1.5 gallons</strong> (3 to 5 litres) for two coats on the walls. Enter your hallway dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 1.5 gallons (3 to 5 litres)</p>
          <p className="text-sm opacity-90">For a standard 4x12 hallway with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Hallway Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hallways are the smallest painted spaces in most homes but they are also the most frequently scuffed and marked — making paint quality and finish more important than quantity. A standard hallway measuring 4x12 with 8ft ceilings has approximately 256 square feet of gross wall area. After deducting two to three doorways, the paintable wall area is around 180 to 200 square feet. At 400 square feet per gallon with two coats, that equals about 0.9 to 1 gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A longer hallway measuring 4x20 has about 320 square feet of gross wall area. After deducting three or four doorways, the paintable area is around 240 square feet — requiring about 1.2 gallons for two coats. Most homeowners buy a single quart for very short hallways and 1 gallon for standard hallways.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, most hallways need 2.5 to 5 litres for two coats. A single 2.5 litre tin covers most small hallways. A longer hallway or one with a staircase needs a 5 litre tin.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Hallway Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Hallway Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['3x8 (small)', '0.2 gal', '0.4 gal', '~1.5 litres'],
                  ['4x10 (short)', '0.3 gal', '0.6 gal', '~2.5 litres'],
                  ['4x12 (standard)', '0.35 gal', '0.7 gal', '~2.7 litres'],
                  ['4x20 (long)', '0.55 gal', '1.1 gal', '~4 litres'],
                  ['5x24 (large with staircase)', '0.75 gal', '1.5 gal', '~5.5 litres'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Hallway</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is the best finish for hallways. Hallways are the highest traffic areas in any home — bags, coats, and hands brush against the walls constantly. Satin is durable, washable, and holds up to daily scuffs and marks far better than eggshell or flat finishes. It can be wiped clean with a damp cloth without damaging the paint film.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Semi-gloss is an even more durable alternative for hallways with heavy use or young children. It is slightly shinier than satin but provides maximum washability. Avoid eggshell and flat finishes in hallways — they mark easily and cannot be scrubbed without removing the paint.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Colours for a Hallway</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Light colours are almost always the right choice for hallways. Hallways are typically narrow with limited natural light — a light colour reflects available light and makes the space feel wider and more welcoming. Dark colours can work in hallways with good artificial lighting but require more coats and make the space feel enclosed.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Farrow & Ball Pointing (No.2003)</strong> is one of the most popular hallway colours in the UK — a warm off-white that feels elegant without being stark. <strong>Sherwin-Williams Accessible Beige (SW 7036)</strong> is the most popular hallway colour in the US — a warm greige that bridges the gap between white and beige. <strong>Benjamin Moore Revere Pewter (HC-172)</strong> is a warm mid-tone gray that works beautifully in hallways with good lighting.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Hallway</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Remove all pictures, hooks, and coat racks first.</strong> Hallways are cluttered with wall fixtures. Remove everything before painting — painting around fixtures leaves unpainted patches that look unfinished.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a mini roller for narrow hallways.</strong> A standard 9-inch roller is too wide for very narrow hallways. A 4-inch mini roller gives better control in tight spaces.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use satin — not eggshell.</strong> The most common hallway painting mistake. Eggshell marks permanently with daily use. Satin can be wiped clean repeatedly.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint the ceiling last.</strong> In narrow hallways the ceiling is easy to reach while painting walls. Paint walls first then roll the ceiling to cover any wall paint that landed on it.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Two thin coats beat one thick coat.</strong> Thick coats drip and sag on vertical hallway walls. Two thin coats dry faster, look better, and provide more durable coverage.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Ceiling Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a hallway?', 'A standard 4x12 hallway needs about 0.7 gallons for two coats on the walls. A longer 4x20 hallway needs about 1.1 gallons. Use the calculator above for a precise estimate based on your exact dimensions.'],
              ['What paint finish is best for a hallway?', 'Satin is the best finish for hallways. It is durable, washable, and holds up to daily scuffs and marks. Semi-gloss is an even more durable alternative for very high-traffic hallways.'],
              ['How many litres of paint for a hallway?', 'Most hallways need 2.5 to 5 litres for two coats. A small hallway can be done with a 2.5 litre tin. A longer hallway needs a 5 litre tin.'],
              ['What colour should I paint my hallway?', 'Light neutrals make narrow hallways feel wider and brighter. Off-whites, warm creams, and light grays are the most popular choices. Use a warm white with yellow undertones in hallways with no natural light.'],
              ['How do I paint a narrow hallway?', 'Use a 4-inch mini roller for narrow hallways where a standard roller cannot fit comfortably. Remove all pictures and hooks before starting. Use a 2-inch angled brush to cut in edges and corners.'],
              ['Should hallway and living room be the same colour?', 'Using the same colour or a lighter shade of the same colour family in the hallway creates a cohesive flow. A hallway in a slightly lighter version of the living room colour makes the home feel larger and more connected.'],
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