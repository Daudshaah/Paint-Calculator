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
      ? 'https://thepaintcalculator.com/driveway-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/driveway-paint-calculator`;
  return {
    title: 'Driveway Paint Calculator — How Much Paint for a Driveway? | ThePaintCalculator.com',
    description: 'Calculate exactly how much driveway paint or sealer you need. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Driveway Paint Calculator — How Much Paint for a Driveway?',
      description: 'Calculate exactly how much driveway paint or sealer you need. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function DrivewayPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Driveway Paint Calculator', item: 'https://thepaintcalculator.com/driveway-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a driveway?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard double car driveway of 400 sq ft needs 3 gallons per coat. For two coats buy 6 gallons. Asphalt sealers cover less — 100 to 150 sq ft per gallon — so buy accordingly.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons to seal a driveway?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 400 sq ft double driveway needs 3 to 4 gallons per coat of asphalt sealer. A 600 sq ft driveway needs 4 to 6 gallons per coat. Always apply two coats for full protection.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best driveway paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Rust-Oleum EpoxyShield for concrete driveways. Black Jack Drive-Maxx 1000 or Armor All Asphalt Sealer for asphalt driveways. Always choose a product rated for your specific driveway material.' },
      },
      {
        '@type': 'Question',
        name: 'How often should you seal a driveway?',
        acceptedAnswer: { '@type': 'Answer', text: 'Seal concrete driveways every 3 to 5 years. Seal asphalt driveways every 2 to 3 years. Regular sealing prevents water damage and dramatically extends driveway life.' },
      },
      {
        '@type': 'Question',
        name: 'Can you paint a concrete driveway?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — use a concrete-specific paint or epoxy coating. Standard exterior house paint is not durable enough for driveways. Epoxy coatings resist oil stains, tyre marks, and salt damage.' },
      },
      {
        '@type': 'Question',
        name: 'How long does driveway sealer take to dry?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most driveway sealers dry to foot traffic in 4 to 8 hours. Allow 48 to 72 hours before vehicle traffic. Avoid turning vehicle wheels on newly sealed driveways for the first week.' },
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
            <li className="text-gray-700 font-medium">Driveway Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Driveway Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard single car driveway of 400 square feet needs <strong>3 to 4 gallons</strong> of driveway paint or sealer for two coats. Enter your driveway dimensions below for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">3 to 4 gallons per 400 sq ft</p>
          <p className="text-sm opacity-90">For a standard single car driveway — two coats of driveway sealer</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your driveway square footage. Measure the length and width of your driveway and multiply together.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Driveway Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Driveway paint coverage depends on the surface material — concrete or asphalt — and the type of product you are applying. Standard driveway paint or masonry paint covers 150 to 200 square feet per gallon on smooth concrete. Driveway sealers for asphalt cover 100 to 150 square feet per gallon as they penetrate deeply into the porous asphalt surface.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard single car driveway is typically 10 feet wide by 20 feet long — 200 square feet. A double car driveway is 20 feet wide by 20 feet long — 400 square feet. At 150 square feet per gallon for two coats, a double car driveway needs approximately 5 to 6 gallons of driveway coating.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            New concrete driveways should be allowed to cure for at least 30 days before painting or sealing. New asphalt driveways should cure for 6 to 12 months before sealing. Applying sealer too soon prevents proper curing and causes long-term surface problems.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Driveway Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Driveway Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Sq Footage</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Single car 10×20ft', '200 sq ft', '1.5 gal', '3.0 gal'],
                  ['Single car 10×30ft', '300 sq ft', '2.0 gal', '4.0 gal'],
                  ['Double car 20×20ft', '400 sq ft', '3.0 gal', '6.0 gal'],
                  ['Double car 20×30ft', '600 sq ft', '4.0 gal', '8.0 gal'],
                  ['Large 20×40ft', '800 sq ft', '5.5 gal', '11.0 gal'],
                  ['Large 24×40ft', '960 sq ft', '6.5 gal', '13.0 gal'],
                ].map(([size, sqft, one, two], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{sqft}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Driveway Paint and Sealer Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For concrete driveways, <strong>Rust-Oleum EpoxyShield Driveway Coating</strong> is the most popular choice — a two-part epoxy that resists oil stains, salt damage, and tyre marks. <strong>KILZ Concrete and Masonry Paint</strong> is a simpler one-coat option for concrete driveways that want a coloured finish.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For asphalt driveways, <strong>Armor All Asphalt Driveway Filler and Sealer</strong> and <strong>Black Jack Drive-Maxx 1000</strong> are the two most popular asphalt sealers available at home improvement stores. Both provide excellent UV and water protection and restore the deep black colour of faded asphalt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Driveway</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean the surface thoroughly.</strong> Degrease oil stains with a concrete degreaser. Pressure wash all dirt and loose material. Allow to dry completely before applying any coating.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Fill cracks before sealing.</strong> Use a concrete crack filler or asphalt crack filler to repair all cracks before applying the main coating. Sealers do not bridge cracks.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply on a dry warm day.</strong> Ideal application temperature is 60 to 90 degrees Fahrenheit with no rain forecast for 24 hours. Never apply in direct hot sunlight as the coating dries too fast.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Keep vehicles off for 48 to 72 hours.</strong> Most driveway coatings need 48 to 72 hours before vehicle traffic. Turning vehicle wheels on newly sealed driveways causes scuff marks.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Reseal every 2 to 3 years.</strong> Regular sealing every 2 to 3 years prevents water infiltration and dramatically extends the life of both concrete and asphalt driveways.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Garage Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a driveway?', 'A standard double car driveway of 400 sq ft needs 3 gallons per coat. For two coats buy 6 gallons. Asphalt sealers cover less — 100 to 150 sq ft per gallon — so buy accordingly.'],
              ['How many gallons to seal a driveway?', 'A 400 sq ft double driveway needs 3 to 4 gallons per coat of asphalt sealer. A 600 sq ft driveway needs 4 to 6 gallons per coat. Always apply two coats for full protection.'],
              ['What is the best driveway paint?', 'Rust-Oleum EpoxyShield for concrete driveways. Black Jack Drive-Maxx 1000 or Armor All Asphalt Sealer for asphalt driveways. Always choose a product rated for your specific driveway material.'],
              ['How often should you seal a driveway?', 'Seal concrete driveways every 3 to 5 years. Seal asphalt driveways every 2 to 3 years. Regular sealing prevents water damage and dramatically extends driveway life.'],
              ['Can you paint a concrete driveway?', 'Yes — use a concrete-specific paint or epoxy coating. Standard exterior house paint is not durable enough for driveways. Epoxy coatings resist oil stains, tyre marks, and salt damage.'],
              ['How long does driveway sealer take to dry?', 'Most driveway sealers dry to foot traffic in 4 to 8 hours. Allow 48 to 72 hours before vehicle traffic. Avoid turning vehicle wheels on newly sealed driveways for the first week.'],
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
