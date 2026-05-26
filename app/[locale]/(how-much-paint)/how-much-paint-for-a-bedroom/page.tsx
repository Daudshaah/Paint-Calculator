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
      ? 'https://thepaintcalculator.com/how-much-paint-for-a-bedroom'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-a-bedroom`;
  return {
    title: 'How Much Paint for a Bedroom? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for a bedroom. Estimates for all bedroom sizes in gallons and litres. Free, no signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for a Bedroom?',
      description: 'Calculate exactly how much paint you need for a bedroom. Estimates for all bedroom sizes in gallons and litres. Free, no signup required.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for a Bedroom?","item":"https://thepaintcalculator.com/how-much-paint-for-a-bedroom"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many gallons of paint do I need for a bedroom?","acceptedAnswer":{"@type":"Answer","text":"An average 12x12 bedroom needs 2 gallons for two coats on the walls. A large master bedroom 14x16 or bigger needs 2.5 to 3 gallons."}},{"@type":"Question","name":"How many litres of paint for a bedroom?","acceptedAnswer":{"@type":"Answer","text":"A standard 12x12 bedroom needs 7 to 8 litres for two coats. A large master bedroom needs 10 to 12 litres."}},{"@type":"Question","name":"Do I need primer in a bedroom?","acceptedAnswer":{"@type":"Answer","text":"Primer is recommended when painting over bare drywall, covering a dark colour, or dealing with stains. For a simple colour refresh, a paint-and-primer-in-one product is sufficient."}},{"@type":"Question","name":"What paint finish is best for a bedroom?","acceptedAnswer":{"@type":"Answer","text":"Eggshell is the most popular finish for bedrooms — it looks refined and is easy to clean. Satin is better for children's bedrooms. Flat paint suits luxurious master bedrooms that see light use."}},{"@type":"Question","name":"How many coats of paint does a bedroom need?","acceptedAnswer":{"@type":"Answer","text":"Two coats are standard for a professional finish. If covering a very dark colour, three coats or a tinted primer plus two coats may be needed."}},{"@type":"Question","name":"How much does it cost to paint a bedroom?","acceptedAnswer":{"@type":"Answer","text":"DIY paint costs $30 to $80 for an average bedroom. Hiring a professional painter typically costs $200 to $600 depending on room size and location."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for a Bedroom?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for a Bedroom?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `An average bedroom needs <strong>1 to 3 gallons</strong> (4 to 12 litres) for two coats on the walls depending on size. Enter your bedroom dimensions below for an exact result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 3 gallons (4 to 12 litres)</p>
          <p className="text-sm opacity-90">For an average 12x12 bedroom with 8ft ceilings — two coats on walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Bedroom Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Bedroom paint requirements vary significantly by size. A small 10x10 guest bedroom needs about 1.5 gallons for two coats. A standard 12x12 bedroom needs about 2 gallons. A large 14x16 master bedroom needs 2.5 to 3 gallons for two coats on the walls.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Ceiling height matters too. If your bedroom has 9ft or 10ft ceilings instead of standard 8ft, add 10 to 15% more paint to your estimate. Vaulted ceilings can nearly double the wall area.</p>
          <p className="text-gray-700 leading-relaxed mb-4">In litres, a standard 12x12 bedroom needs 7 to 8 litres for two coats. A large master bedroom needs 10 to 12 litres.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bedroom Paint — Reference Table by Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Bedroom Size</th><th className="px-4 py-3 text-left font-semibold">1 Coat</th><th className="px-4 py-3 text-left font-semibold">2 Coats</th><th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">10x10 small</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~1.5 gal</td><td className="px-4 py-3 text-gray-700">~5.5 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">12x12 standard</td><td className="px-4 py-3 text-gray-700">~1 gal</td><td className="px-4 py-3 text-gray-700">~2 gal</td><td className="px-4 py-3 text-gray-700">~7.5 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">12x14 medium</td><td className="px-4 py-3 text-gray-700">~1.1 gal</td><td className="px-4 py-3 text-gray-700">~2.2 gal</td><td className="px-4 py-3 text-gray-700">~8.3 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">14x14 large</td><td className="px-4 py-3 text-gray-700">~1.2 gal</td><td className="px-4 py-3 text-gray-700">~2.4 gal</td><td className="px-4 py-3 text-gray-700">~9 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">14x16 master</td><td className="px-4 py-3 text-gray-700">~1.3 gal</td><td className="px-4 py-3 text-gray-700">~2.6 gal</td><td className="px-4 py-3 text-gray-700">~10 litres</td>
                  </tr>
                <tr className={5 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">16x18 master</td><td className="px-4 py-3 text-gray-700">~1.6 gal</td><td className="px-4 py-3 text-gray-700">~3.2 gal</td><td className="px-4 py-3 text-gray-700">~12 litres</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Bedroom</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Eggshell is the most popular finish for bedrooms. It gives a soft, low-sheen look that is flattering under bedroom lighting and easy to wipe clean when needed. Satin is a good choice for children's bedrooms or rooms that see heavy use as it is more durable and scrubbable.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Flat or matte paint is sometimes used in master bedrooms for a luxurious, velvety look — but only in rooms that see light use and do not need regular cleaning. Avoid flat paint in kids' rooms where walls get touched and marked daily.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Bedroom</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Remove or cover furniture</strong> before starting. Move large pieces out of the room where possible to give yourself full access to all walls.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint the ceiling first</strong> if you are repainting it. Any drips or spatters will be covered when you do the walls.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a quality primer</strong> if changing from a dark colour to a light one or vice versa. Tinted primer reduces the number of topcoats needed.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Test your colour in the room</strong> before committing. Bedroom colours look very different under warm bedside lighting versus daylight. Always check your swatch at night under the room's actual lighting.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow walls to fully dry</strong> before replacing furniture. Latex paint takes 30 days to fully cure — pushing heavy furniture against fresh walls can leave marks.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-12x12-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-14x14-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 14x14 Room? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-ceiling`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Ceiling? →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How many gallons of ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint do I need for a bedroom?</h3>
              <p className="text-gray-700">An average 12x12 bedroom needs 2 gallons for two coats on the walls. A large master bedroom 14x16 or bigger needs 2.5 to 3 gallons.</p>
            </div>
            <div key="How many litres of p">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many litres of paint for a bedroom?</h3>
              <p className="text-gray-700">A standard 12x12 bedroom needs 7 to 8 litres for two coats. A large master bedroom needs 10 to 12 litres.</p>
            </div>
            <div key="Do I need primer in ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer in a bedroom?</h3>
              <p className="text-gray-700">Primer is recommended when painting over bare drywall, covering a dark colour, or dealing with stains. For a simple colour refresh, a paint-and-primer-in-one product is sufficient.</p>
            </div>
            <div key="What paint finish is">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What paint finish is best for a bedroom?</h3>
              <p className="text-gray-700">Eggshell is the most popular finish for bedrooms — it looks refined and is easy to clean. Satin is better for children's bedrooms. Flat paint suits luxurious master bedrooms that see light use.</p>
            </div>
            <div key="How many coats of pa">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many coats of paint does a bedroom need?</h3>
              <p className="text-gray-700">Two coats are standard for a professional finish. If covering a very dark colour, three coats or a tinted primer plus two coats may be needed.</p>
            </div>
            <div key="How much does it cos">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bedroom?</h3>
              <p className="text-gray-700">DIY paint costs $30 to $80 for an average bedroom. Hiring a professional painter typically costs $200 to $600 depending on room size and location.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
