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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-ceiling'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-ceiling`;
  return {
    title: 'How Much Paint for a Ceiling? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a ceiling. Estimates by room size in gallons and litres. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Ceiling?',
      description: 'Calculate exactly how much paint you need for a ceiling. Estimates by room size in gallons and litres. Free, no signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Ceiling?","item":"https://thepaintcalculator.com/how-much-paint-for-a-ceiling"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much ceiling paint do I need?","acceptedAnswer":{"@type":"Answer","text":"One gallon of ceiling paint covers 350 to 400 sq ft per coat. For a standard 12x12 ceiling (144 sq ft), one gallon is more than enough for two coats."}},{"@type":"Question","name":"Do I need two coats of ceiling paint?","acceptedAnswer":{"@type":"Answer","text":"Yes — two coats are recommended for even, uniform coverage. Some white-on-white repaints may look fine with one coat, but two coats always produces a more professional result."}},{"@type":"Question","name":"Can I use wall paint on the ceiling?","acceptedAnswer":{"@type":"Answer","text":"You can, but ceiling-specific paint is formulated to resist drips when applied overhead and hides roller marks better. It is worth using the right product for the ceiling."}},{"@type":"Question","name":"How much paint for a textured popcorn ceiling?","acceptedAnswer":{"@type":"Answer","text":"Textured ceilings absorb 20 to 30% more paint. Add 25% to your standard estimate. Use a thick nap roller (3/4 inch) to work paint into the texture."}},{"@type":"Question","name":"Should I paint the ceiling before or after the walls?","acceptedAnswer":{"@type":"Answer","text":"Always paint the ceiling first. Any drips or spatters on the walls will be covered when you paint the walls afterward."}},{"@type":"Question","name":"What colour should I paint my ceiling?","acceptedAnswer":{"@type":"Answer","text":"Flat white is the most common ceiling colour. Painting the ceiling the same colour as the walls creates a cocoon effect popular in dining rooms and bedrooms. A slightly lighter version of the wall colour is a good compromise."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Ceiling?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Ceiling?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `A standard 12x12 ceiling needs approximately <strong>0.5 to 1 gallon</strong> (2 to 4 litres) for two coats. Enter your room dimensions below for an exact result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">0.5 to 1 gallon (2 to 4 litres)</p>
          <p className="text-sm opacity-90">For a standard 12x12 ceiling — two coats of ceiling paint</p>
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
          <p className="text-gray-700 leading-relaxed mb-4">Ceiling paint coverage is straightforward to calculate — it is simply the floor area of the room. A 12x12 room has a 144 sq ft ceiling. At 400 sq ft per gallon, one gallon covers the ceiling for 2.7 coats — so one gallon is more than enough for two coats with some left over.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A large 20x20 room has a 400 sq ft ceiling — exactly one gallon per coat, meaning you need 2 gallons for two coats. Very large open-plan ceilings may need 3 or more gallons.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Textured ceilings (popcorn, knockdown) absorb 20 to 30% more paint than smooth ceilings. Always add a 25% buffer to your estimate for textured surfaces.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Ceiling Paint — Reference Table by Room Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Room Size</th><th className="px-4 py-3 text-left font-semibold">Ceiling Area</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">10x10</td><td className="px-4 py-3 text-gray-700">100 sq ft</td><td className="px-4 py-3 text-gray-700">~0.25 gal</td><td className="px-4 py-3 text-gray-700">~0.5 gal</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">12x12</td><td className="px-4 py-3 text-gray-700">144 sq ft</td><td className="px-4 py-3 text-gray-700">~0.36 gal</td><td className="px-4 py-3 text-gray-700">~0.72 gal</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">14x14</td><td className="px-4 py-3 text-gray-700">196 sq ft</td><td className="px-4 py-3 text-gray-700">~0.5 gal</td><td className="px-4 py-3 text-gray-700">~1 gal</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">15x20</td><td className="px-4 py-3 text-gray-700">300 sq ft</td><td className="px-4 py-3 text-gray-700">~0.75 gal</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">20x20</td><td className="px-4 py-3 text-gray-700">400 sq ft</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~2 gal</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Ceilings</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Always use flat or matte white ceiling paint rather than standard wall paint applied overhead. Ceiling-specific paints are formulated to resist drips and spatters when applied overhead, dry without sheen, and hide roller marks and imperfections better than wall paint.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For bathrooms and kitchens, use a ceiling paint with a mould and mildew resistant formula. The extra moisture in these rooms can cause standard ceiling paint to bubble or grow mould over time.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Ceiling</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint the ceiling before the walls</strong> — any drips or spatters on the walls will be covered when you paint the walls afterward.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use an extension pole</strong> on your roller to avoid working off a ladder. It is faster, safer, and produces more even coverage.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Work in natural light or use bright work lights</strong> so you can see missed spots. Ceiling paint is notoriously easy to miss in patches.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply with a thick nap roller (3/4 inch)</strong> for textured ceilings. The extra nap works paint into the texture effectively.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Cut in carefully along the ceiling-wall joint</strong> with an angled brush before rolling. This is the hardest part of painting a ceiling cleanly.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/ceiling-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Ceiling Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bedroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bedroom? →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much ceiling pai">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much ceiling paint do I need?</h3>
              <p className="text-gray-700">One gallon of ceiling paint covers 350 to 400 sq ft per coat. For a standard 12x12 ceiling (144 sq ft), one gallon is more than enough for two coats.</p>
            </div>
            <div key="Do I need two coats ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need two coats of ceiling paint?</h3>
              <p className="text-gray-700">Yes — two coats are recommended for even, uniform coverage. Some white-on-white repaints may look fine with one coat, but two coats always produces a more professional result.</p>
            </div>
            <div key="Can I use wall paint">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use wall paint on the ceiling?</h3>
              <p className="text-gray-700">You can, but ceiling-specific paint is formulated to resist drips when applied overhead and hides roller marks better. It is worth using the right product for the ceiling.</p>
            </div>
            <div key="How much paint for a">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint for a textured popcorn ceiling?</h3>
              <p className="text-gray-700">Textured ceilings absorb 20 to 30% more paint. Add 25% to your standard estimate. Use a thick nap roller (3/4 inch) to work paint into the texture.</p>
            </div>
            <div key="Should I paint the c">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint the ceiling before or after the walls?</h3>
              <p className="text-gray-700">Always paint the ceiling first. Any drips or spatters on the walls will be covered when you paint the walls afterward.</p>
            </div>
            <div key="What colour should I">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What colour should I paint my ceiling?</h3>
              <p className="text-gray-700">Flat white is the most common ceiling colour. Painting the ceiling the same colour as the walls creates a cocoon effect popular in dining rooms and bedrooms. A slightly lighter version of the wall colour is a good compromise.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
