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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-garage'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-garage`;
  return {
    title: 'How Much Paint for a Garage? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a garage. Estimates for walls, floor, and ceiling for single and double garages.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Garage?',
      description: 'Calculate exactly how much paint you need for a garage. Estimates for walls, floor, and ceiling for single and double garages.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Garage?","item":"https://thepaintcalculator.com/how-much-paint-for-a-garage"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint for a two-car garage?","acceptedAnswer":{"@type":"Answer","text":"A standard 20x20 two-car garage needs 4 to 5 gallons for the walls and 2 gallons for the floor, totalling 6 to 7 gallons for walls and floor."}},{"@type":"Question","name":"What type of paint is best for garage walls?","acceptedAnswer":{"@type":"Answer","text":"Semi-gloss or satin latex paint — it is easy to wipe clean, reflects more light, and resists the moisture and temperature changes that garages experience."}},{"@type":"Question","name":"What paint do I use for a garage floor?","acceptedAnswer":{"@type":"Answer","text":"A two-part epoxy floor coating gives the most durable result. Water-based one-part floor paint is easier to apply but less durable under vehicle traffic."}},{"@type":"Question","name":"Do garage walls need primer?","acceptedAnswer":{"@type":"Answer","text":"Yes — bare drywall and concrete block are both highly porous and will absorb paint excessively without primer. A concrete primer or all-purpose primer is essential."}},{"@type":"Question","name":"How long does garage floor paint take to dry?","acceptedAnswer":{"@type":"Answer","text":"Water-based floor paint is dry to walk on in 24 hours but needs 72 hours before vehicle traffic. Two-part epoxy needs 48 to 72 hours before any traffic."}},{"@type":"Question","name":"How much paint for a garage door?","acceptedAnswer":{"@type":"Answer","text":"A standard 9x7 garage door needs about 1 quart for two coats on the exterior face. Use exterior semi-gloss or gloss for maximum durability."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Garage?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Garage?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard two-car garage needs approximately <strong>4 to 5 gallons</strong> (15 to 19 litres) for two wall coats. The floor needs <strong>2 to 3 gallons</strong> of epoxy or floor paint.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">4 to 5 gallons walls (15 to 19 litres)</p>
          <p className="text-sm opacity-90">For a standard two-car garage — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Garage Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A standard two-car garage is roughly 20x20 feet with 10ft walls. The gross wall area is approximately 800 square feet. After deducting the garage door opening and a personnel door, the paintable wall area is about 700 square feet. At 400 sq ft per gallon and two coats, that is 3.5 gallons — buy 4 to 5 gallons to account for absorption in porous surfaces.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Garage walls are often unprimed drywall, concrete block, or OSB — all of which absorb significantly more paint than previously painted surfaces. Budget 20 to 30% extra paint compared to a standard interior room.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For the garage floor, a standard two-car floor (400 sq ft) needs 2 gallons of water-based epoxy paint or 1 gallon of concentrated two-part epoxy per coat.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Garage Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Single garage walls</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~3 gal</td><td className="px-4 py-3 text-gray-700">~11.4 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Two-car garage walls</td><td className="px-4 py-3 text-gray-700">~2.5 gal</td><td className="px-4 py-3 text-gray-700">~5 gal</td><td className="px-4 py-3 text-gray-700">~18.9 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Garage floor (2-car)</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~2 gal</td><td className="px-4 py-3 text-gray-700">~7.5 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Garage ceiling</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~2 gal</td><td className="px-4 py-3 text-gray-700">~7.5 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Garage door (exterior)</td><td className="px-4 py-3 text-gray-700">~0.2 gal</td><td className="px-4 py-3 text-gray-700">~0.4 gal</td><td className="px-4 py-3 text-gray-700">~1.5 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for a Garage</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Use a semi-gloss or satin latex paint for garage walls. The higher sheen makes walls easier to wipe clean and reflects more light into what is often a dark space. For the floor, use a two-part epoxy coating for the most durable result — water-based one-part floor paint is simpler but less durable.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For concrete block or masonry walls, use a concrete primer or block filler first. This seals the porous surface and prevents paint absorption that would otherwise require multiple extra coats.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Garage</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prime bare drywall and concrete block</strong> before painting — both surfaces absorb paint heavily without primer.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use semi-gloss on garage walls</strong> for maximum reflectivity and washability — garages get dirty and need to be wiped regularly.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Etch concrete floors</strong> with an acid etcher or degreaser before applying floor paint — adhesion on smooth concrete is poor without surface preparation.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint the floor last</strong> after all wall and ceiling work is complete to avoid damaging the floor finish.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow 72 hours before driving on epoxy floors</strong> — vehicle tyres exert significant pressure and can lift floor paint that has not fully cured.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/garage-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Garage Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-interior-of-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Interior of House? →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-ceiling`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Ceiling? →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a two-car garage?</h3>
              <p className="text-gray-700">A standard 20x20 two-car garage needs 4 to 5 gallons for the walls and 2 gallons for the floor, totalling 6 to 7 gallons for walls and floor.</p>
            </div>
            <div key="What type of paint i">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint is best for garage walls?</h3>
              <p className="text-gray-700">Semi-gloss or satin latex paint — it is easy to wipe clean, reflects more light, and resists the moisture and temperature changes that garages experience.</p>
            </div>
            <div key="What paint do I use ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What paint do I use for a garage floor?</h3>
              <p className="text-gray-700">A two-part epoxy floor coating gives the most durable result. Water-based one-part floor paint is easier to apply but less durable under vehicle traffic.</p>
            </div>
            <div key="Do garage walls need">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do garage walls need primer?</h3>
              <p className="text-gray-700">Yes — bare drywall and concrete block are both highly porous and will absorb paint excessively without primer. A concrete primer or all-purpose primer is essential.</p>
            </div>
            <div key="How long does garage">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does garage floor paint take to dry?</h3>
              <p className="text-gray-700">Water-based floor paint is dry to walk on in 24 hours but needs 72 hours before vehicle traffic. Two-part epoxy needs 48 to 72 hours before any traffic.</p>
            </div>
            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a garage door?</h3>
              <p className="text-gray-700">A standard 9x7 garage door needs about 1 quart for two coats on the exterior face. Use exterior semi-gloss or gloss for maximum durability.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
