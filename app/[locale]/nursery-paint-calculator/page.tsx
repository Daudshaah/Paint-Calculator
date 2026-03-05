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
      ? 'https://thepaintcalculator.com/nursery-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/nursery-paint-calculator`;
  return {
    title: 'Nursery Paint Calculator — How Much Paint for a Nursery? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your nursery or baby room. Free instant results in gallons or litres. Safe paint recommendations included. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Nursery Paint Calculator — How Much Paint for a Nursery?',
      description: 'Calculate exactly how much paint you need for your nursery. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function NurseryPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Nursery Paint Calculator', item: 'https://thepaintcalculator.com/nursery-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a nursery?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard nursery measuring 10x10 with 8ft ceilings needs about 1 to 1.5 gallons for two coats on the walls. A larger nursery measuring 12x12 needs about 1.5 to 2 gallons. Use the calculator above for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'What paint is safe for a nursery?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use zero-VOC or low-VOC paint for nurseries. VOCs are volatile organic compounds that off-gas from paint and can irritate babies lungs. Look for paints labelled zero-VOC such as Benjamin Moore Natura, Sherwin-Williams Harmony, or ECOS Paints.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a nursery?',
        acceptedAnswer: { '@type': 'Answer', text: 'Eggshell or satin is best for nurseries. Eggshell looks soft and elegant and is washable enough for most nurseries. Satin is more durable and easier to wipe clean which is useful as the child grows and the room gets more use.' },
      },
      {
        '@type': 'Question',
        name: 'How long after painting is a nursery safe?',
        acceptedAnswer: { '@type': 'Answer', text: 'With zero-VOC paint, a nursery is safe after 24 to 48 hours of ventilation with windows open. With standard low-VOC paint, wait at least 72 hours before moving a baby into the room. Always ventilate well during and after painting regardless of paint type.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a nursery?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 10x10 nursery needs 3.5 to 5 litres for two coats on the walls. A single 5 litre tin is enough for most nurseries. Buy a 2.5 litre tin for very small nurseries under 10x10.' },
      },
      {
        '@type': 'Question',
        name: 'What are the best nursery paint colours?',
        acceptedAnswer: { '@type': 'Answer', text: 'Soft neutrals, pale greens, warm whites, and dusty blues and pinks are the most popular nursery colours. Avoid bright saturated colours which can be visually overstimulating for newborns. Soft muted tones create a calm soothing environment.' },
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
            <li className="text-gray-700 font-medium">Nursery Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nursery Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard nursery needs <strong>1 to 1.5 gallons</strong> (3.5 to 5 litres) for two coats on the walls. Enter your nursery dimensions below for an exact result. Always use zero-VOC paint in nurseries. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 1.5 gallons (3.5 to 5 litres)</p>
          <p className="text-sm opacity-90">For a standard 10x10 nursery with 8ft ceilings — two coats on walls</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-green-800 text-center">
          🌿 <strong>Safety tip:</strong> Always use <strong>zero-VOC paint</strong> in nurseries. Look for Benjamin Moore Natura, Sherwin-Williams Harmony, or ECOS Paints for the safest options.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Nursery Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nurseries are typically one of the smaller bedrooms in a home, which means they need less paint than master bedrooms or living rooms. A standard nursery measuring 10x10 with 8ft ceilings has approximately 320 square feet of gross wall area. After deducting one door and one window, the paintable wall area is around 265 square feet. At 400 square feet per gallon with two coats, that equals about 1.3 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A larger nursery measuring 12x12 has approximately 384 square feet of gross wall area. After deductions, the paintable area is around 320 square feet — requiring about 1.6 gallons for two coats. Most parents buy 2 gallons to ensure full coverage and have extra for touch-ups as the room gets used over the years.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard 10x10 nursery needs 3.5 to 5 litres for two coats. A single 5 litre tin is enough for most nurseries. Buy a 2.5 litre tin for very small nurseries under 10x10.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Nursery Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Nursery Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['8x8 (small)', '0.4 gal', '0.8 gal', '~3 litres'],
                  ['10x10 (standard)', '0.65 gal', '1.3 gal', '~5 litres'],
                  ['10x12 (medium)', '0.75 gal', '1.5 gal', '~5.5 litres'],
                  ['12x12 (large)', '0.8 gal', '1.6 gal', '~6 litres'],
                  ['12x14 (very large)', '0.9 gal', '1.8 gal', '~7 litres'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Paint is Safe for a Nursery?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Paint safety is the most important consideration when painting a nursery. Standard interior paints contain volatile organic compounds — VOCs — which off-gas from painted surfaces for weeks after application. In adults this causes mild irritation but in newborns and infants whose lungs are still developing, VOC exposure is a genuine health concern.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always use zero-VOC or low-VOC paint in nurseries. Zero-VOC paints contain less than 5 grams per litre of VOCs — compared to 150 to 400 g/L in standard latex paint. The three most trusted zero-VOC nursery paint brands are <strong>Benjamin Moore Natura</strong>, <strong>Sherwin-Williams Harmony</strong>, and <strong>ECOS Paints</strong>. All three are available in hundreds of colours, zero-VOC formula, and perform comparably to standard latex paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Even with zero-VOC paint, always ventilate the nursery well during painting and for at least 48 hours afterward with windows open before moving a baby into the room.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Nursery</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Eggshell is the most popular finish for nurseries. It has a soft, subtle sheen that looks beautiful in a baby room and is washable enough to handle the occasional mark. Satin is a practical alternative that is more durable and easier to wipe clean — useful as the child grows from baby to toddler and the room sees heavier use.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Avoid flat paint in nurseries. Flat paint cannot be scrubbed and will permanently mark when wiped. Once a toddler starts drawing on walls, flat paint becomes impossible to clean.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Nursery Paint Colours</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The most popular nursery colours are soft and muted — bright saturated colours are visually overstimulating for newborns. Soft neutrals, pale greens, dusty pinks, and warm whites create the calm soothing environment that promotes sleep and relaxation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Benjamin Moore White Dove (OC-17)</strong> is the most popular nursery white — warm, soft, and universally flattering in any light. <strong>Sherwin-Williams Aged Linen (SW 6133)</strong> is a warm off-white with a hint of yellow that feels cosy and nurturing. <strong>Benjamin Moore Pale Moon (OC-108)</strong> is a pale sage green that works for any gender and creates a nature-inspired calming atmosphere. <strong>Farrow & Ball Peignoir (No.286)</strong> is a dusty blush pink that is sophisticated enough to last through toddler and early childhood years.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Nursery</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint at least 2 weeks before the due date.</strong> Even zero-VOC paint needs time to fully cure and off-gas. Paint the nursery early and ventilate well — do not paint the week before the baby arrives.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always use zero-VOC paint.</strong> There is no reason to use standard paint in a nursery. Zero-VOC options are available at every price point and perform identically to standard paint.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ventilate during and after painting.</strong> Keep windows open during painting and for 48 to 72 hours afterward. Use a fan to circulate fresh air through the room.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Choose satin over eggshell if in doubt.</strong> Satin is easier to wipe clean and more durable — important as the nursery transitions into a toddler room over the following years.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Test colours in the actual room first.</strong> Nursery colours look very different on a paint chip versus on a wall under the room's specific lighting. Always test a large swatch before committing to the full room.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Ceiling Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-10x10-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x10 Room →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a nursery?', 'A standard 10x10 nursery needs about 1.3 gallons for two coats on the walls. A larger 12x12 nursery needs about 1.6 gallons. Use the calculator above for a precise estimate.'],
              ['What paint is safe for a nursery?', 'Use zero-VOC paint in nurseries. Benjamin Moore Natura, Sherwin-Williams Harmony, and ECOS Paints are the most trusted zero-VOC nursery paint brands. Always ventilate well during and after painting.'],
              ['What paint finish is best for a nursery?', 'Eggshell or satin is best for nurseries. Eggshell looks soft and elegant. Satin is more durable and easier to wipe clean — better for rooms that will be used through toddler years.'],
              ['How long after painting is a nursery safe?', 'With zero-VOC paint, ventilate for 24 to 48 hours before moving a baby in. With standard low-VOC paint, wait at least 72 hours. Always paint at least 2 weeks before the due date.'],
              ['How many litres of paint for a nursery?', 'A standard 10x10 nursery needs 3.5 to 5 litres for two coats. A single 5 litre tin covers most nurseries. Buy a 2.5 litre tin for nurseries smaller than 10x10.'],
              ['What are the best nursery paint colours?', 'Soft neutrals, pale greens, warm whites, and muted pinks and blues are most popular. Benjamin Moore White Dove, Sherwin-Williams Aged Linen, and Benjamin Moore Pale Moon are top choices. Avoid bright saturated colours which can overstimulate newborns.'],
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
