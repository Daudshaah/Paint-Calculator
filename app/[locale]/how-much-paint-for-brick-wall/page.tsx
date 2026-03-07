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
      ? 'https://thepaintcalculator.com/how-much-paint-for-brick-wall'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-brick-wall`;
  return {
    title: 'How Much Paint for Brick Wall? | ThePaintCalculator.com',
    description: 'Find out exactly how much paint you need for a brick wall. Free estimates for interior and exterior brick in gallons and litres.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Brick Wall?',
      description: 'Find out exactly how much paint you need for a brick wall. Free estimates for interior and exterior brick in gallons and litres.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for Brick Wall?","item":"https://thepaintcalculator.com/how-much-paint-for-brick-wall"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much paint does brick absorb vs drywall?","acceptedAnswer":{"@type":"Answer","text":"Brick absorbs 2 to 3 times more paint than smooth drywall. A gallon covering 400 sq ft on drywall will only cover 100 to 150 sq ft on bare brick."}},{"@type":"Question","name":"Do I need special paint for brick?","acceptedAnswer":{"@type":"Answer","text":"Use a breathable masonry or elastomeric paint for exterior brick. Interior brick can use standard latex paint but always apply a masonry primer first."}},{"@type":"Question","name":"How many coats of paint does brick need?","acceptedAnswer":{"@type":"Answer","text":"Three coats are recommended — one masonry primer coat plus two topcoats. The first topcoat absorbs heavily; the second gives full, even coverage."}},{"@type":"Question","name":"Can you unpaint brick?","acceptedAnswer":{"@type":"Answer","text":"Painted brick is very difficult to restore. Sandblasting can remove paint but often damages the brick face. Consider limewash as a more reversible alternative to paint."}},{"@type":"Question","name":"What is limewash and is it better than paint for brick?","acceptedAnswer":{"@type":"Answer","text":"Limewash is a breathable coating made from slaked lime that penetrates brick rather than coating it. It is reversible, ages beautifully, and is often preferred over paint for exterior brick."}},{"@type":"Question","name":"How long does paint last on brick?","acceptedAnswer":{"@type":"Answer","text":"Exterior brick paint lasts 15 to 20 years when properly applied over masonry primer. Interior brick paint in a dry environment can last indefinitely."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for Brick Wall?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for Brick Wall?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Brick walls require approximately <strong>1 gallon per 100 to 150 sq ft</strong> — compared to 400 sq ft per gallon on smooth drywall. Always prime before painting brick.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon per 100 to 150 sq ft</p>
          <p className="text-sm opacity-90">Brick absorbs 2 to 3× more paint than smooth drywall</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Brick Wall Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Brick is a highly porous, textured surface that absorbs paint at 2 to 3 times the rate of smooth painted drywall. A gallon that covers 400 sq ft on smooth walls will cover only 100 to 150 sq ft on unpainted brick. This dramatically increases paint quantities and cost compared to standard wall painting.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A full exterior brick home with 1,500 sq ft of brick surface needs 10 to 15 gallons for the first coat and 5 to 8 gallons for the second coat — 15 to 23 gallons total. After the first coat seals the pores, subsequent coats absorb less.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Always apply a masonry-specific primer before any topcoat. This seals the pores, improves adhesion, and dramatically reduces the amount of expensive topcoat paint needed.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Brick Wall Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1st Coat</th><th className="px-4 py-3 text-left font-semibold">2nd Coat</th><th className="px-4 py-3 text-left font-semibold">Litres (total 2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior brick wall 10x8</td><td className="px-4 py-3 text-gray-700">1.5 gal</td><td className="px-4 py-3 text-gray-700">0.75 gal</td><td className="px-4 py-3 text-gray-700">~8.5 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Fireplace brick surround</td><td className="px-4 py-3 text-gray-700">0.5 gal</td><td className="px-4 py-3 text-gray-700">0.25 gal</td><td className="px-4 py-3 text-gray-700">~2.8 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Exterior brick wall 20x10</td><td className="px-4 py-3 text-gray-700">2.5 gal</td><td className="px-4 py-3 text-gray-700">1.5 gal</td><td className="px-4 py-3 text-gray-700">~15 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Full exterior brick home</td><td className="px-4 py-3 text-gray-700">10–15 gal</td><td className="px-4 py-3 text-gray-700">5–8 gal</td><td className="px-4 py-3 text-gray-700">~57–87 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Masonry primer (first coat)</td><td className="px-4 py-3 text-gray-700">1 gal per 100 sq ft</td><td className="px-4 py-3 text-gray-700">—</td><td className="px-4 py-3 text-gray-700">~3.8 L per 9.3 sq m</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Brick Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Use a breathable masonry or elastomeric paint for exterior brick. Brick naturally absorbs and releases moisture — non-breathable paints trap this moisture behind the surface and cause blistering and paint failure. Elastomeric coatings also bridge hairline mortar cracks and are flexible enough to move with the wall through temperature cycles.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For interior brick (feature walls, fireplaces), standard latex paint can be used but always prime with a masonry primer first. Semi-gloss or satin finishes are easier to clean than flat and highlight the texture of the brick attractively.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting Brick Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always prime first with masonry primer</strong> — unpainted brick will absorb topcoat paint extremely heavily without it.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use an airless sprayer or thick nap roller</strong> (3/4 to 1 inch) to work paint into the irregular surface of brick.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Repair mortar joints</strong> before painting — cracked or missing mortar allows water ingress behind the paint, causing failure.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Consider limewash</strong> as an alternative to paint — it is breathable, reversible, and gives a beautiful weathered finish popular in modern design.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do not paint exterior brick</strong> without thoroughly considering the long-term maintenance implications — once painted, restoring unpainted brick is very difficult and expensive.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-stucco`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Stucco? →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/spray-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Spray Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much paint does ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint does brick absorb vs drywall?</h3>
              <p className="text-gray-700">Brick absorbs 2 to 3 times more paint than smooth drywall. A gallon covering 400 sq ft on drywall will only cover 100 to 150 sq ft on bare brick.</p>
            </div>
            <div key="Do I need special pa">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need special paint for brick?</h3>
              <p className="text-gray-700">Use a breathable masonry or elastomeric paint for exterior brick. Interior brick can use standard latex paint but always apply a masonry primer first.</p>
            </div>
            <div key="How many coats of pa">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many coats of paint does brick need?</h3>
              <p className="text-gray-700">Three coats are recommended — one masonry primer coat plus two topcoats. The first topcoat absorbs heavily; the second gives full, even coverage.</p>
            </div>
            <div key="Can you unpaint bric">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can you unpaint brick?</h3>
              <p className="text-gray-700">Painted brick is very difficult to restore. Sandblasting can remove paint but often damages the brick face. Consider limewash as a more reversible alternative to paint.</p>
            </div>
            <div key="What is limewash and">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is limewash and is it better than paint for brick?</h3>
              <p className="text-gray-700">Limewash is a breathable coating made from slaked lime that penetrates brick rather than coating it. It is reversible, ages beautifully, and is often preferred over paint for exterior brick.</p>
            </div>
            <div key="How long does paint ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does paint last on brick?</h3>
              <p className="text-gray-700">Exterior brick paint lasts 15 to 20 years when properly applied over masonry primer. Interior brick paint in a dry environment can last indefinitely.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
