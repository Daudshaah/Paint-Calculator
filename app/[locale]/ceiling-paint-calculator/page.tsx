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
      ? 'https://thepaintcalculator.com/ceiling-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/ceiling-paint-calculator`;
  return {
    title: 'Ceiling Paint Calculator — How Much Paint for a Ceiling? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your ceiling. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Ceiling Paint Calculator — How Much Paint for a Ceiling?',
      description: 'Calculate exactly how much paint you need for your ceiling. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function CeilingPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Ceiling Paint Calculator', item: 'https://thepaintcalculator.com/ceiling-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a ceiling?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 12x12 ceiling needs about 0.36 gallons per coat. For two coats that is 0.72 gallons — most people buy 1 gallon. A larger 16x20 ceiling needs about 1.6 gallons for two coats.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for ceilings?',
        acceptedAnswer: { '@type': 'Answer', text: 'Flat or matte finish is best for ceilings. It hides imperfections, does not reflect light harshly, and is specifically formulated to resist dripping during application. Use semi-gloss only in high-humidity rooms like bathrooms.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need special ceiling paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — dedicated ceiling paint is thicker than wall paint which reduces dripping and spattering when rolling overhead. It also dries quickly and has a flat finish that hides surface imperfections better than standard paint.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a ceiling?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12x12 ceiling needs about 2.5 litres for two coats. A larger 16x20 ceiling needs around 6 litres for two coats. A single 5 litre tin covers most standard room ceilings.' },
      },
      {
        '@type': 'Question',
        name: 'How many coats of paint does a ceiling need?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most ceilings need two coats of paint for full even coverage. New drywall ceilings always need two coats — the first coat soaks in and raises the surface texture. Previously painted ceilings in good condition may only need one coat if using the same colour.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use the same paint on ceiling and walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'No — use dedicated ceiling paint on ceilings. Ceiling paint is formulated to be thicker and less likely to drip when applied overhead. It also dries to a flat finish that hides imperfections better than wall paint.' },
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
            <li className="text-gray-700 font-medium">Ceiling Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ceiling Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 12x12 ceiling needs <strong>about 1 gallon</strong> (2.5 to 3 litres) for two coats. Enter your room dimensions below and select Ceiling in the surfaces section for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon per standard room ceiling</p>
          <p className="text-sm opacity-90">A 12x12 ceiling needs ~0.7 gallons for two coats — buy 1 gallon</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 max-w-2xl mx-auto text-center text-sm text-amber-800">
          <strong>Tip:</strong> In the calculator below — click the <strong>Ceiling</strong> tab at the top, then make sure <strong>Ceiling</strong> is checked under Surfaces to Paint.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Ceiling Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ceiling paint coverage is straightforward because ceilings are flat rectangular surfaces with no deductions for doors or windows. A 12x12 ceiling has exactly 144 square feet. At 400 square feet per gallon, one coat needs 0.36 gallons and two coats needs 0.72 gallons. Most homeowners buy 1 gallon for a standard bedroom or bathroom ceiling.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Living room and dining room ceilings are larger and typically need 1 to 1.5 gallons for two coats. A full open-plan living area measuring 20x18 needs about 1.8 gallons for two coats. Always buy slightly more than calculated — ceiling painting causes more waste than wall painting due to the overhead application angle.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard 12x12 ceiling needs about 2.5 litres for two coats. A single 2.5 litre tin is enough for small bedroom ceilings. Buy a 5 litre tin for larger living room and kitchen ceilings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ceiling Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Ceiling Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['8x10 (small bathroom)', '0.2 gal', '0.4 gal', '~1.5 litres'],
                  ['10x12 (bedroom)', '0.3 gal', '0.6 gal', '~2.5 litres'],
                  ['12x12 (standard)', '0.36 gal', '0.72 gal', '~2.7 litres'],
                  ['14x16 (living room)', '0.56 gal', '1.1 gal', '~4 litres'],
                  ['16x20 (large room)', '0.8 gal', '1.6 gal', '~6 litres'],
                  ['20x24 (open plan)', '1.2 gal', '2.4 gal', '~9 litres'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Ceilings</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always use dedicated ceiling paint rather than regular wall paint on ceilings. Ceiling paint is formulated to be thicker and more viscous which prevents dripping when applied overhead. It dries to a flat matte finish that hides surface imperfections like hairline cracks, roller marks, and uneven texture better than any other finish.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams Ceiling Bright White</strong> is the most popular ceiling paint in the US — bright white, flat finish, excellent hide. <strong>Behr Premium Plus Ceiling Paint</strong> at around $30 per gallon is a reliable and affordable option available at Home Depot. <strong>Benjamin Moore Waterborne Ceiling Paint</strong> is the premium choice — ultra flat finish with exceptional hide for problem ceilings.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For bathroom ceilings, use a ceiling paint with mildew resistance or a semi-gloss finish. Standard flat ceiling paint will peel in high-humidity bathrooms within 12 to 18 months.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Paint a Ceiling — Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use a roller extension pole.</strong> Never paint a ceiling from a ladder if you can avoid it. A 4 to 6 foot extension pole lets you roll the ceiling while standing on the floor — faster, safer, and less tiring.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Paint ceiling before walls.</strong> Always paint the ceiling first. Any drips or spatters land on unpainted walls and get covered when you roll the walls afterward.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Cut in edges first.</strong> Use a 2.5-inch angled brush to cut in a 3-inch border around the entire ceiling perimeter before rolling the main area.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Roll in one direction.</strong> Roll the ceiling in parallel strips working from one end to the other. Keep a wet edge by working quickly and overlapping each strip slightly.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Use a thick nap roller.</strong> A half-inch to three-quarter inch nap roller holds more paint and covers textured ceilings better than a thin nap roller.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a ceiling?', 'A 12x12 ceiling needs about 0.72 gallons for two coats — buy 1 gallon. A larger 16x20 ceiling needs about 1.6 gallons for two coats. Use the calculator above and enter your room dimensions for a precise estimate.'],
              ['What paint finish is best for ceilings?', 'Flat or matte finish is best for ceilings. It hides imperfections and does not reflect light harshly. Use semi-gloss only in high-humidity rooms like bathrooms to resist moisture and peeling.'],
              ['Do I need special ceiling paint?', 'Yes — dedicated ceiling paint is thicker than wall paint which reduces dripping when rolling overhead. It also dries quickly and hides surface imperfections better than standard paint.'],
              ['How many litres of paint for a ceiling?', 'A standard 12x12 ceiling needs about 2.5 litres for two coats. A single 2.5 litre tin covers most bedroom ceilings. Buy a 5 litre tin for larger living room and kitchen ceilings.'],
              ['How many coats does a ceiling need?', 'Most ceilings need two coats for full even coverage. New drywall always needs two coats. Previously painted ceilings in good condition may only need one coat if using the same colour.'],
              ['Should I use the same paint on ceiling and walls?', 'No — use dedicated ceiling paint on ceilings. It is formulated to be thicker, less likely to drip, and dries to a flat finish that hides imperfections better than wall paint.'],
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
