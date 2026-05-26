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
      ? 'https://thepaintcalculator.com/textured-wall-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/textured-wall-paint-calculator`;
  return {
    title: 'Textured Wall Paint Calculator — How Much Paint for Textured Walls? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for textured, orange peel, or knockdown walls. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Textured Wall Paint Calculator — How Much Paint for Textured Walls?',
      description: 'Calculate exactly how much paint you need for textured, orange peel, or knockdown walls. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function TexturedWallPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Textured Wall Paint Calculator', item: 'https://thepaintcalculator.com/textured-wall-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much more paint do textured walls need?',
        acceptedAnswer: { '@type': 'Answer', text: 'Orange peel texture needs 20 to 25% more paint than smooth walls. Heavy knockdown texture needs 35 to 50% more. Always increase your estimate when painting textured surfaces.' },
      },
      {
        '@type': 'Question',
        name: 'What roller nap should I use for textured walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use ½ inch nap for light orange peel texture. Use ¾ inch nap for medium to heavy knockdown and skip trowel texture. A thin ⅜ inch nap is only suitable for smooth walls.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best paint finish for textured walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Flat or matte finish for heavy texture — it hides the uneven sheen on texture peaks. Eggshell for light orange peel texture in living areas. Avoid satin and semi-gloss on pronounced texture.' },
      },
      {
        '@type': 'Question',
        name: 'How many coats does textured wall paint need?',
        acceptedAnswer: { '@type': 'Answer', text: 'Always apply two coats on textured walls. The first coat settles into the texture valleys and highlights missed spots. The second coat provides uniform coverage. Budget paint may require three coats.' },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate paint for textured walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Calculate the paint quantity for smooth walls using the calculator above, then multiply by 1.25 for orange peel texture or 1.35 for heavy knockdown texture.' },
      },
      {
        '@type': 'Question',
        name: 'Can I smooth textured walls before painting?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — skim coating over textured walls with joint compound creates a smooth surface and reduces paint usage. It is labour intensive but reduces long-term painting costs on future repaints.' },
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
            <li className="text-gray-700 font-medium">Textured Wall Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Textured Wall Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Textured walls need <strong>20 to 30% more paint</strong> than smooth walls. A room that needs 2 gallons on smooth walls needs 2.5 to 2.6 gallons on textured walls. Enter your room dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">20–30% more paint than smooth walls</p>
          <p className="text-sm opacity-90">Textured walls absorb significantly more paint than smooth drywall</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> After getting your result from the calculator below, multiply the total by 1.25 for orange peel texture or 1.35 for heavy knockdown texture to get your adjusted quantity for textured walls.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much More Paint Do Textured Walls Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Textured walls have significantly more surface area than they appear. The peaks and valleys of orange peel, knockdown, and skip trowel textures increase the actual paintable surface by 20 to 40% compared to a smooth flat wall of the same dimensions. This means you need proportionally more paint to achieve the same film thickness and coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            On smooth drywall, one gallon covers 380 to 400 square feet. On orange peel texture, one gallon covers 300 to 340 square feet. On medium knockdown texture, one gallon covers 260 to 300 square feet. On heavy popcorn or skip trowel texture, one gallon may only cover 200 to 250 square feet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The type of applicator also matters significantly with textured walls. A thick nap roller (¾ inch) reaches into the valleys of texture and provides more complete coverage than a thin nap roller but uses more paint. Brush-applied paint on heavy texture can achieve good penetration into deep texture but is slow. Spraying provides the most complete coverage on heavily textured walls but uses the most paint due to overspray.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Coverage by Texture Type</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Texture Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage/Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">Extra Paint vs Smooth</th>
                  <th className="px-4 py-3 text-left font-semibold">Roller Nap</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Smooth drywall', '380–400 sq ft', 'Baseline', '⅜ inch'],
                  ['Light orange peel', '340–380 sq ft', '+10%', '½ inch'],
                  ['Medium orange peel', '300–340 sq ft', '+20%', '½ inch'],
                  ['Light knockdown', '280–320 sq ft', '+25%', '¾ inch'],
                  ['Heavy knockdown', '240–280 sq ft', '+35%', '¾ inch'],
                  ['Skip trowel/popcorn', '200–240 sq ft', '+50%', '¾–1 inch'],
                ].map(([texture, coverage, extra, nap], i) => (
                  <tr key={texture} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{texture}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{extra}</td>
                    <td className="px-4 py-3 text-gray-700">{nap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Textured Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Flat and matte finishes work best on heavy texture — they hide the uneven sheen that satin and eggshell can create on pronounced texture peaks. For light orange peel texture in living areas, eggshell is the standard choice. For heavy knockdown or popcorn ceilings, always use flat paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            High-hide paints with high titanium dioxide content are worth the extra cost on textured walls. The deep valleys of texture can show colour inconsistency if the paint has poor hide. <strong>Sherwin-Williams Emerald Interior</strong> and <strong>Benjamin Moore Aura</strong> both have excellent hide ratings that cover textured walls more uniformly in two coats.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting Textured Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always use a thick nap roller.</strong> A ½ to ¾ inch nap roller reaches into texture valleys. A thin ¼ inch nap roller skims over texture peaks and leaves valleys unpainted.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply more paint per coat.</strong> Textured walls need a wetter, heavier coat than smooth walls to fill in the valleys. Do not spread paint as thin as you would on smooth walls.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a brush to work paint into deep crevices.</strong> After rolling, back-brush heavy texture areas to work paint into deep crevices that the roller skimmed over.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Two coats are always necessary.</strong> Textured walls almost always require two coats for uniform coverage — the first coat highlights any missed spots and the second coat evens everything out.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy 30% more paint than you think you need.</strong> It is always better to have leftover touch-up paint than to run out mid-project with a textured wall that is hard to match exactly.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much more paint do textured walls need?', 'Orange peel texture needs 20 to 25% more paint than smooth walls. Heavy knockdown texture needs 35 to 50% more. Always increase your estimate when painting textured surfaces.'],
              ['What roller nap should I use for textured walls?', 'Use ½ inch nap for light orange peel texture. Use ¾ inch nap for medium to heavy knockdown and skip trowel texture. A thin ⅜ inch nap is only suitable for smooth walls.'],
              ['What is the best paint finish for textured walls?', 'Flat or matte finish for heavy texture — it hides the uneven sheen on texture peaks. Eggshell for light orange peel texture in living areas. Avoid satin and semi-gloss on pronounced texture.'],
              ['How many coats does textured wall paint need?', 'Always apply two coats on textured walls. The first coat settles into the texture valleys and highlights missed spots. The second coat provides uniform coverage. Budget paint may require three coats.'],
              ['How do I calculate paint for textured walls?', 'Calculate the paint quantity for smooth walls using the calculator above, then multiply by 1.25 for orange peel texture or 1.35 for heavy knockdown texture.'],
              ['Can I smooth textured walls before painting?', 'Yes — skim coating over textured walls with joint compound creates a smooth surface and reduces paint usage. It is labour intensive but reduces long-term painting costs on future repaints.'],
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
