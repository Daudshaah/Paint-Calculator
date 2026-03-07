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
      ? 'https://thepaintcalculator.com/two-coat-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/two-coat-paint-calculator`;
  return {
    title: 'Two Coat Paint Calculator — How Much Paint for Two Coats? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for two coats on any room or surface. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Two Coat Paint Calculator — How Much Paint for Two Coats?',
      description: 'Calculate exactly how much paint you need for two coats on any room or surface. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function TwoCoatPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Two Coat Paint Calculator', item: 'https://thepaintcalculator.com/two-coat-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for two coats?',
        acceptedAnswer: { '@type': 'Answer', text: 'Budget for 1.9 times your single coat quantity — the second coat absorbs slightly less than the first. For safety, simply double your single coat estimate. Our calculator sets 2 coats automatically.' },
      },
      {
        '@type': 'Question',
        name: 'Does two coats use double the paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Not exactly — two coats uses about 1.8 to 2.0 times the single coat quantity. The sealed surface absorbs less on the second coat. Budget for double to be safe.' },
      },
      {
        '@type': 'Question',
        name: 'How long to wait between coats of paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Standard latex: 4 hours minimum. Premium latex: 2 to 4 hours. Oil-based paint: 24 hours. Always check the recoat time on your paint can label. Waiting longer never hurts.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need two coats of paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes in almost all cases. Two coats provides better coverage, more durable finish, more accurate colour, and longer-lasting results than one coat. One coat is only acceptable for minor touch-ups.' },
      },
      {
        '@type': 'Question',
        name: 'How many coats for a dark to light colour change?',
        acceptedAnswer: { '@type': 'Answer', text: 'Three to four coats are typically needed for dark to light changes. Use a tinted primer matched to your topcoat colour to reduce total coats from four to two or three.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best paint for one coat coverage?',
        acceptedAnswer: { '@type': 'Answer', text: 'Sherwin-Williams Emerald Interior, Benjamin Moore Aura, and Behr Marquee are all marketed as one coat paints. In practice they still benefit from two coats but provide excellent coverage in one thick coat on simple repaints.' },
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
            <li className="text-gray-700 font-medium">Two Coat Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Two Coat Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Two coats of paint requires approximately <strong>1.9 times</strong> the single coat quantity — not exactly double, because the sealed surface absorbs less on the second coat. Enter your room dimensions below for an exact two-coat total. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Double your single coat quantity</p>
          <p className="text-sm opacity-90">The second coat uses 10–15% less paint than the first coat</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Select <strong>2 coats</strong> in the calculator below and it automatically calculates the correct two-coat quantity accounting for reduced absorption on the second coat.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Do You Need for Two Coats?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two coats of paint does not require exactly double the quantity of one coat. The first coat seals the surface and the second coat applies over a non-porous sealed film, absorbing less and achieving slightly better coverage. In practice, two coats requires 1.8 to 2.0 times the single coat quantity — budget for double to be safe.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            On new drywall or bare wood, the first coat soaks into the porous surface and provides minimal coverage. The second coat goes over the sealed surface and covers much more efficiently. In this case, two coats requires closer to 2.2 to 2.5 times the theoretical single-coat quantity because the first coat is effectively a sealer coat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For colour changes from dark to light, two coats is rarely sufficient — three or four coats are typically needed for complete coverage. Using a tinted primer matched to the topcoat colour reduces the total number of coats needed and saves money on large projects.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Two Coat Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Room</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">3 Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Bedroom 10×10', '1.0 gal', '1.9 gal', '2.8 gal'],
                  ['Bedroom 12×12', '1.3 gal', '2.5 gal', '3.7 gal'],
                  ['Bathroom 8×6', '0.7 gal', '1.3 gal', '2.0 gal'],
                  ['Kitchen 12×10', '1.2 gal', '2.3 gal', '3.4 gal'],
                  ['Living room 16×14', '1.8 gal', '3.4 gal', '5.0 gal'],
                  ['Whole house 1,500 sq ft', '9.0 gal', '17 gal', '25 gal'],
                ].map(([room, one, two, three], i) => (
                  <tr key={room} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{room}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                    <td className="px-4 py-3 text-gray-700">{three}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Do You Need Two Coats vs One Coat?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two coats are always recommended for the best and most durable finish. One coat is only acceptable for touch-ups, minor colour refreshes where you are using the exact same colour, or when using a premium self-priming paint specifically rated for one coat coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Situations that always require two coats: colour changes of any kind, new drywall or bare surfaces, previously unpainted surfaces, any change to a lighter colour, and any room that will receive heavy use such as kitchens, bathrooms, and hallways.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Situations that may need three or more coats: dark to light colour changes (especially dark red, dark navy, or dark green to a light or white colour), painting over high-tannin woods without primer, and covering severe water stains or smoke damage without a stain-blocking primer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Long to Wait Between Coats</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Standard latex paint requires a minimum of 4 hours between coats under normal temperature and humidity conditions. Premium paints and self-priming formulas typically require 2 to 4 hours. Oil-based paints require 24 hours between coats. Always check the specific recoat time on your paint can label.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Applying a second coat too soon — before the first coat has fully dried — causes the wet layers to mix, creating streaks, roller marks, and uneven sheen. If in doubt, wait longer. A fully dried first coat always produces a better second coat result.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Two Coat Painting</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply first coat in one direction, second coat perpendicular.</strong> Rolling the first coat horizontally and the second coat vertically (or vice versa) produces the most uniform and even finish.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Lightly sand between coats.</strong> Lightly sand with 220-grit sandpaper between the first and second coats to smooth any raised grain or roller texture. Wipe away dust before applying the second coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use the same batch of paint for both coats.</strong> Buy all paint needed for the project at once to ensure consistent colour. Paint from different batches can have subtle colour variations that show between coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Keep leftover paint for touch-ups.</strong> Store leftover second-coat paint in a sealed container labelled with the room and colour. Properly stored latex paint lasts 5 to 10 years for touch-ups.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for two coats?', 'Budget for 1.9 times your single coat quantity — the second coat absorbs slightly less than the first. For safety, simply double your single coat estimate. Our calculator sets 2 coats automatically.'],
              ['Does two coats use double the paint?', 'Not exactly — two coats uses about 1.8 to 2.0 times the single coat quantity. The sealed surface absorbs less on the second coat. Budget for double to be safe.'],
              ['How long to wait between coats of paint?', 'Standard latex: 4 hours minimum. Premium latex: 2 to 4 hours. Oil-based paint: 24 hours. Always check the recoat time on your paint can label. Waiting longer never hurts.'],
              ['Do I need two coats of paint?', 'Yes in almost all cases. Two coats provides better coverage, more durable finish, more accurate colour, and longer-lasting results than one coat. One coat is only acceptable for minor touch-ups.'],
              ['How many coats for a dark to light colour change?', 'Three to four coats are typically needed for dark to light changes. Use a tinted primer matched to your topcoat colour to reduce total coats from four to two or three.'],
              ['What is the best paint for one coat coverage?', 'Sherwin-Williams Emerald Interior, Benjamin Moore Aura, and Behr Marquee are all marketed as one coat paints. In practice they still benefit from two coats but provide excellent coverage in one thick coat on simple repaints.'],
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
