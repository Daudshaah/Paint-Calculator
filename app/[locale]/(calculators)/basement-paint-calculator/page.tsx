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
      ? 'https://thepaintcalculator.com/basement-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/basement-paint-calculator`;
  return {
    title: 'Basement Paint Calculator — How Much Paint for a Basement? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for your basement walls, ceiling or floor. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Basement Paint Calculator — How Much Paint for a Basement?',
      description: 'Calculate exactly how much paint you need for your basement. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function BasementPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Basement Paint Calculator', item: 'https://thepaintcalculator.com/basement-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a basement?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 20x20 basement with 8ft ceilings needs about 3 to 4 gallons for two coats on the walls. A smaller 12x16 basement needs about 2 to 2.5 gallons. Use the calculator above for a precise estimate based on your exact dimensions.' },
      },
      {
        '@type': 'Question',
        name: 'What paint is best for basement walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use a waterproofing masonry paint for bare concrete or cinder block basement walls. Drylok and Zinsser Watertite are the two most popular options. For finished drywall basements, use a mildew-resistant interior latex paint in satin or eggshell finish.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need special paint for a basement?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — basements require moisture and mildew resistant paint. Bare concrete walls need a waterproofing masonry paint. Finished drywall walls need a mildew-resistant interior latex. Never use standard wall paint on bare concrete basement walls.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a basement?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 20x20 basement needs 11 to 15 litres for two coats on the walls. Buy three 5 litre tins for most standard basements. A smaller basement needs 7 to 10 litres.' },
      },
      {
        '@type': 'Question',
        name: 'How many coats of paint does a basement need?',
        acceptedAnswer: { '@type': 'Answer', text: 'Bare concrete basement walls always need two coats — the first coat soaks into the porous concrete and the second coat provides the finished coverage. Finished drywall basements need two coats for even coverage, especially when changing colours.' },
      },
      {
        '@type': 'Question',
        name: 'What colour should I paint my basement?',
        acceptedAnswer: { '@type': 'Answer', text: 'Light colours like white, off-white, and light gray make basements feel larger and brighter. Warm whites with yellow undertones feel welcoming in basements that lack natural light. If finishing as a living space, treat it like any other room and choose a colour that suits the function.' },
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
            <li className="text-gray-700 font-medium">Basement Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Basement Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 20x20 basement needs <strong>3 to 4 gallons</strong> (11 to 15 litres) for two coats on the walls. Enter your basement dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">3 to 4 gallons (11 to 15 litres)</p>
          <p className="text-sm opacity-90">For a standard 20x20 basement with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Basement Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Basements vary widely in size and wall type which makes accurate estimation important. A standard unfinished basement measuring 20x20 with 8ft ceilings has approximately 640 square feet of gross wall area. After deducting one entry door and any small windows, the paintable wall area is around 580 square feet. At 400 square feet per gallon with two coats, that equals about 2.9 gallons — most homeowners buy 4 gallons to cover waste and touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bare concrete and cinder block walls absorb significantly more paint than drywall. If your basement walls are unfinished concrete, add 25 to 30% to your calculated amount for the first coat alone. The porous surface soaks up paint heavily and the first coat rarely provides full coverage on bare masonry.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard 20x20 basement needs 11 to 15 litres for two coats. Three 5 litre tins is the standard purchase for most basement projects. A smaller 12x16 basement needs 7 to 10 litres.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Basement Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Basement Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['12x16 (small)', '1.0 gal', '2.0 gal', '~7.5 litres'],
                  ['16x20 (medium)', '1.5 gal', '3.0 gal', '~11 litres'],
                  ['20x20 (standard)', '1.8 gal', '3.6 gal', '~13.5 litres'],
                  ['20x24 (large)', '2.1 gal', '4.2 gal', '~16 litres'],
                  ['24x30 (full basement)', '2.7 gal', '5.4 gal', '~20 litres'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Basement Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The right paint for your basement depends entirely on what your walls are made of. There are two common situations — bare concrete or cinder block, and finished drywall.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Bare concrete or cinder block walls</strong> need a waterproofing masonry paint. <strong>Drylok Extreme Masonry Waterproofer</strong> is the most popular choice — it bonds to concrete, resists water pressure from the outside, and is available in white and tintable bases. <strong>Zinsser Watertite</strong> is the premium alternative with a 15-year waterproofing guarantee. Never apply standard latex paint directly to bare concrete basement walls — it will peel within months as moisture migrates through the masonry.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Finished drywall basement walls</strong> should be treated like any other interior room. Use a mildew-resistant interior latex paint in satin or eggshell finish. Look for paints labelled with mildewcide additives — basements have higher humidity than above-grade rooms and standard paint without mildew resistance will develop mould spots over time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for Basements</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For unfinished utility basements, semi-gloss is the best finish. It reflects light to brighten a typically dark space, resists moisture, and is easy to wipe clean. For finished basement living spaces, eggshell or satin gives a more refined look while still providing adequate moisture resistance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Avoid flat paint in any basement. Flat finishes absorb moisture and are impossible to clean — mould and stains will be permanent on a flat-painted basement wall.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Colours for a Basement</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Light colours dramatically improve dark basements. <strong>Sherwin-Williams Extra White (SW 7006)</strong> is the most popular basement colour — pure white maximises light reflection in rooms with few or no windows. <strong>Benjamin Moore Chantilly Lace (OC-65)</strong> is a crisp clean white that feels bright without looking stark. <strong>Behr Silver Drop (790C-2)</strong> is a light cool gray that gives a finished modern look to utility basements.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For finished basement living spaces, media rooms, or home gyms, deeper colours work well because artificial lighting compensates for the lack of natural light. Dark navy, charcoal, and forest green are popular choices for basement entertainment rooms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Basement</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Fix moisture problems before painting.</strong> No paint will solve an actively leaking basement. Address any water intrusion, cracks, or drainage issues before applying any paint or waterproofer.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean and etch bare concrete first.</strong> Bare concrete must be cleaned with TSP and then etched with muriatic acid solution to open the pores before applying masonry paint. This step dramatically improves adhesion.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a stiff brush on masonry walls.</strong> Apply masonry waterproofer with a stiff-bristled masonry brush rather than a roller to work the paint into the pores of the concrete.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ventilate well during painting.</strong> Basements have poor airflow. Use a fan to circulate air and open any windows or exterior access points during and after painting.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy 25% extra for bare concrete.</strong> Porous concrete absorbs the first coat heavily. Always buy significantly more paint than the calculator suggests when painting bare masonry for the first time.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Garage Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Ceiling Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a basement?', 'A standard 20x20 basement needs 3 to 4 gallons for two coats on the walls. A smaller 12x16 basement needs about 2 gallons. Use the calculator above for a precise estimate based on your exact dimensions.'],
              ['What paint is best for basement walls?', 'Use a waterproofing masonry paint like Drylok or Zinsser Watertite for bare concrete walls. For finished drywall basement walls, use a mildew-resistant interior latex paint in satin or eggshell finish.'],
              ['Do I need special paint for a basement?', 'Yes — basements need moisture and mildew resistant paint. Bare concrete walls need waterproofing masonry paint. Finished drywall needs mildew-resistant latex. Never use standard wall paint on bare concrete.'],
              ['How many litres of paint for a basement?', 'A standard 20x20 basement needs 11 to 15 litres for two coats. Three 5 litre tins covers most standard basements. A smaller basement needs 7 to 10 litres.'],
              ['How many coats does a basement need?', 'Bare concrete always needs two coats — the first soaks into the porous surface and the second provides finished coverage. Finished drywall basements need two coats for even coverage.'],
              ['What colour should I paint my basement?', 'Light colours like white, off-white, and light gray make basements feel larger and brighter. Sherwin-Williams Extra White and Benjamin Moore Chantilly Lace are the most popular basement colours.'],
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