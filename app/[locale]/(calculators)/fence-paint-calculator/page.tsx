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
      ? 'https://thepaintcalculator.com/fence-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/fence-paint-calculator`;
  return {
    title: 'Fence Paint Calculator — How Much Paint for a Fence? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint or stain you need for your fence. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Fence Paint Calculator — How Much Paint for a Fence?',
      description: 'Calculate exactly how much paint or stain you need for your fence. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function FencePaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Fence Paint Calculator', item: 'https://thepaintcalculator.com/fence-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a fence?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 6ft tall fence 100 feet long has 600 square feet of surface area per side. For both sides that is 1,200 square feet. At 150 to 200 square feet per gallon on rough wood fence, you need 6 to 8 gallons for one coat on both sides.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a fence?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 100 foot fence needs 6 to 8 gallons per coat when painting both sides. A 200 foot fence needs 12 to 16 gallons per coat. Rough sawn wood absorbs significantly more paint than smooth wood — always buy 20% extra for rough fence boards.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint or stain a wood fence?',
        acceptedAnswer: { '@type': 'Answer', text: 'Stain is generally better for wood fences. Stain penetrates the wood and does not peel or crack like paint. It lasts 3 to 5 years before needing reapplication. Paint lasts longer but peels on outdoor wood and requires more prep when repainting.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best paint for a fence?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use an exterior latex paint with a flat or satin finish for wood fences. Cuprinol Garden Shades is the most popular fence paint in the UK. In the US, Behr Premium Exterior and Rust-Oleum Fence and Deck are reliable options.' },
      },
      {
        '@type': 'Question',
        name: 'How long does fence paint last?',
        acceptedAnswer: { '@type': 'Answer', text: 'Quality fence paint lasts 3 to 5 years on a well-prepared wood fence. Fence stain lasts 2 to 4 years. Pressure treated wood fences may need less frequent painting as the treatment protects against moisture and rot.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a fence?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 100 foot fence needs 22 to 30 litres per coat when painting both sides. Most fence paint in the UK is sold in 5 litre and 9 litre tins. Buy multiple 5 litre tins for large fence projects.' },
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
            <li className="text-gray-700 font-medium">Fence Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Fence Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 6ft fence 100 feet long needs <strong>6 to 8 gallons</strong> (22 to 30 litres) per coat when painting both sides. Enter your fence dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">6 to 8 gallons per 100ft of fence</p>
          <p className="text-sm opacity-90">For a 6ft tall fence — one coat on both sides</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> In the calculator below use <strong>Enter wall area directly</strong> and enter your total fence surface area. Multiply fence length by height for one side — double it for both sides.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Fence Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Fence paint coverage is significantly lower than interior wall paint because rough sawn wood fence boards are highly porous and absorb paint heavily. While interior walls achieve 400 square feet per gallon, rough wood fences typically achieve only 150 to 200 square feet per gallon. A new or bare wood fence may only achieve 100 to 150 square feet per gallon on the first coat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 6ft tall privacy fence 100 feet long has 600 square feet per side and 1,200 square feet total for both sides. At 150 square feet per gallon, that equals 8 gallons per coat for both sides. For two coats you need 16 gallons. Most homeowners paint only the visible side which halves the quantity to 4 gallons per coat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Picket fences have significantly more surface area than privacy fences due to the gaps between pickets creating more edges and end grain to paint. Add 30 to 40% to your estimate when painting a picket or rail fence versus a solid privacy fence.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Fence Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Fence Length</th>
                  <th className="px-4 py-3 text-left font-semibold">Height</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Side (1 coat)</th>
                  <th className="px-4 py-3 text-left font-semibold">Both Sides (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['50 ft', '4 ft', '1.5 gal', '6 gal'],
                  ['100 ft', '4 ft', '2.5 gal', '10 gal'],
                  ['50 ft', '6 ft', '2.0 gal', '8 gal'],
                  ['100 ft', '6 ft', '4.0 gal', '16 gal'],
                  ['150 ft', '6 ft', '6.0 gal', '24 gal'],
                  ['200 ft', '6 ft', '8.0 gal', '32 gal'],
                ].map(([length, height, one, both], i) => (
                  <tr key={`${length}-${height}`} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{length}</td>
                    <td className="px-4 py-3 text-gray-700">{height}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint vs Stain for Fences</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The choice between paint and stain is one of the most important decisions when finishing a wood fence. Paint sits on top of the wood surface and provides an opaque finish in any colour. Stain penetrates into the wood fibres and enhances the natural wood grain while providing protection.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Stain is generally the better choice for wood fences. Because stain penetrates the wood rather than forming a surface film, it does not peel, crack, or blister when moisture gets into the wood. This makes maintenance much easier — reapplication simply requires cleaning the fence and applying a fresh coat without scraping or sanding old peeling paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Paint is the right choice when you want a specific opaque colour — white picket fences, coloured garden fences, or fences that need to match your house exterior. Use a quality exterior latex paint and expect to repaint every 3 to 5 years with proper prep.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Fence Paint and Stain Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Cuprinol Garden Shades</strong> is the most popular fence paint in the UK — available in 30 colours, easy to apply, and lasts 6 years on fences and sheds. <strong>Ronseal Fence Life Plus</strong> is the most popular fence stain in the UK with excellent weatherproofing and a 5-year guarantee.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In the US, <strong>Behr Premium Exterior Wood Stain</strong> and <strong>Cabot Australian Timber Oil</strong> are the most popular fence stain options. For fence paint, <strong>Rust-Oleum Fence and Deck</strong> and <strong>Behr Premium Plus Exterior</strong> in flat finish are reliable choices for wood fences.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Fence</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean the fence before painting.</strong> Pressure wash or scrub with a fence cleaner to remove dirt, mildew, and old flaking paint. Paint applied to a dirty fence will peel within one season.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Let wood dry completely.</strong> Never paint wet or damp wood. Let the fence dry for at least 48 hours after rain or pressure washing before applying paint or stain.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a brush or pad applicator.</strong> A wide brush or fence paint pad covers fence boards faster than a roller and gets paint into cracks and gaps between boards. A pump sprayer is fastest but requires more masking to protect surrounding plants and surfaces.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint on a dry overcast day.</strong> Avoid painting in direct hot sunlight — paint dries too fast and leaves brush marks. Overcast conditions give the best results for fence painting.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy 20% extra for rough wood.</strong> Rough sawn fence boards absorb significantly more paint than the label coverage rate suggests. Always overbuy for fence projects.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Garage Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a fence?', 'A 6ft tall fence 100 feet long needs 4 gallons per coat when painting one side. For both sides that is 8 gallons per coat. For two coats on both sides buy 16 gallons. Rough wood absorbs more — always buy 20% extra.'],
              ['How many gallons of paint for a fence?', 'A 100 foot fence needs 6 to 8 gallons per coat when painting both sides. A 200 foot fence needs 12 to 16 gallons per coat. Always overbuy for rough sawn wood fences.'],
              ['Should I paint or stain a wood fence?', 'Stain is generally better for wood fences. It penetrates the wood and does not peel like paint. Stain lasts 3 to 5 years before reapplication. Use paint when you want a specific opaque colour.'],
              ['What is the best paint for a fence?', 'Cuprinol Garden Shades is the most popular in the UK. Behr Premium Exterior and Rust-Oleum Fence and Deck are reliable US options. Always use exterior paint or stain rated for outdoor wood.'],
              ['How long does fence paint last?', 'Quality fence paint lasts 3 to 5 years on a well-prepared wood fence. Fence stain lasts 2 to 4 years. Proper prep — cleaning and drying — dramatically extends how long the finish lasts.'],
              ['How many litres of paint for a fence?', 'A 100 foot fence needs 22 to 30 litres per coat when painting both sides. Buy multiple 5 litre tins for large fence projects. A small garden fence under 50 feet needs 5 to 10 litres per coat.'],
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
