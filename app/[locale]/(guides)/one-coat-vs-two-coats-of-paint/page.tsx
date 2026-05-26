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
      ? 'https://thepaintcalculator.com/one-coat-vs-two-coats-of-paint'
      : `https://thepaintcalculator.com/${locale}/one-coat-vs-two-coats-of-paint`;
  return {
    title: 'One Coat vs Two Coats of Paint — Which is Better? | ThePaintCalculator.com',
    description: 'One coat vs two coats of paint — which gives better results? Find out when one coat works and when two coats are essential for a professional finish.',
    alternates: { canonical },
    openGraph: {
      title: 'One Coat vs Two Coats of Paint — Which is Better?',
      description: 'One coat vs two coats of paint — which gives better results? Find out when one coat works and when two coats are essential for a professional finish.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function OneCoatVsTwoCoats({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"One Coat vs Two Coats","item":"https://thepaintcalculator.com/one-coat-vs-two-coats-of-paint"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is one coat of paint ever enough?","acceptedAnswer":{"@type":"Answer","text":"Only for touch-ups or repainting with an identical colour on a good surface. For any colour change, new surface, or professional finish, two coats are required."}},{"@type":"Question","name":"Does two coats make paint last longer?","acceptedAnswer":{"@type":"Answer","text":"Yes — two coats provides a thicker, more durable film that resists scrubbing, scuffs, and wear better than a single coat."}},{"@type":"Question","name":"Why does one coat look patchy?","acceptedAnswer":{"@type":"Answer","text":"The first coat of any paint is partially absorbed by the surface and applied unevenly by the roller. The second coat evens out these variations and fills any thin spots."}},{"@type":"Question","name":"Do I need two coats if I use primer?","acceptedAnswer":{"@type":"Answer","text":"Yes — primer prepares the surface for paint adhesion but does not replace topcoat coverage. You still need two topcoats over primer for a complete, professional finish."}},{"@type":"Question","name":"How much more paint does two coats need?","acceptedAnswer":{"@type":"Answer","text":"Exactly double the amount of one coat. Our calculator accounts for your selected number of coats automatically."}},{"@type":"Question","name":"Can I apply a second coat the next day?","acceptedAnswer":{"@type":"Answer","text":"Yes — latex paint can be recoated after 2–4 hours but can also be left overnight. Waiting until the next day is fine as long as the room stays clean and dust-free."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"One Coat vs Two Coats of Paint — Complete Comparison","description":"Detailed comparison of one coat vs two coats of paint — when each is appropriate and why two coats is almost always better.","url":"https://thepaintcalculator.com/one-coat-vs-two-coats-of-paint","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">One Coat vs Two Coats</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            One Coat vs Two Coats of Paint — Which is Better?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `<strong>Two coats of paint is the professional standard</strong> for virtually every painting project. One coat is only sufficient for minor repaints over identical colours. Even "one coat" paints produce a better result with two coats.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Two coats is almost always better — one coat is rarely enough</p>
          <p className="text-sm opacity-90">Two coats gives better coverage, durability, and a more professional finish</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Two Coats is the Professional Standard</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Two coats of paint achieves full opacity, even colour distribution, and a more durable finish than a single coat can provide. The first coat soaks into the surface and provides adhesion. The second coat sits on top providing the colour and sheen you see. Without the second coat, the finish is often slightly uneven, thin in places, and less washable.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Professional painters universally apply two coats on all interior walls. Paint manufacturers who advertise "one coat coverage" are referring to coverage per coat (hiding power of the pigment) — not that one coat is sufficient for a complete, professional finish.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When One Coat May Be Sufficient</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Touching up small areas.</strong> For small patch repairs over an existing finish, one coat matched exactly to the existing colour is usually fine.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Repainting with the identical colour.</strong> If the walls are already in good condition and you are using the exact same colour and sheen, one coat may refresh the finish adequately — though two coats will always look better.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Very high-build paints.</strong> Some specialist high-build interior paints are genuinely designed to achieve full coverage in one coat. These are typically much thicker than standard paint and more expensive. Check the label and verify the manufacturer's claim for your specific colour.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">One Coat vs Two Coats Comparison</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Factor</th>
                <th className="px-4 py-3 text-left font-semibold">One Coat</th>
                <th className="px-4 py-3 text-left font-semibold">Two Coats</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Coverage</td><td className="px-4 py-3 text-gray-700">Often patchy</td><td className="px-4 py-3 text-gray-700">Full, even</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Durability</td><td className="px-4 py-3 text-gray-700">Lower</td><td className="px-4 py-3 text-gray-700">Higher</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Washability</td><td className="px-4 py-3 text-gray-700">Reduced</td><td className="px-4 py-3 text-gray-700">Full</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Colour accuracy</td><td className="px-4 py-3 text-gray-700">May look different</td><td className="px-4 py-3 text-gray-700">True to chip</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Time</td><td className="px-4 py-3 text-gray-700">Faster</td><td className="px-4 py-3 text-gray-700">2× longer</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Professional result</td><td className="px-4 py-3 text-gray-700">Rarely</td><td className="px-4 py-3 text-gray-700">Always</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/how-many-coats-of-paint`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Coats of Paint Do You Need? →</Link></li>
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/do-i-need-primer-before-painting`} className="text-blue-600 hover:text-blue-700 font-medium">Do I Need Primer Before Painting? →</Link></li>
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is one coat of paint ever enough?</h3>
              <p className="text-gray-700">Only for touch-ups or repainting with an identical colour on a good surface. For any colour change, new surface, or professional finish, two coats are required.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does two coats make paint last longer?</h3>
              <p className="text-gray-700">Yes — two coats provides a thicker, more durable film that resists scrubbing, scuffs, and wear better than a single coat.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does one coat look patchy?</h3>
              <p className="text-gray-700">The first coat of any paint is partially absorbed by the surface and applied unevenly by the roller. The second coat evens out these variations and fills any thin spots.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need two coats if I use primer?</h3>
              <p className="text-gray-700">Yes — primer prepares the surface for paint adhesion but does not replace topcoat coverage. You still need two topcoats over primer for a complete, professional finish.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much more paint does two coats need?</h3>
              <p className="text-gray-700">Exactly double the amount of one coat. Our calculator accounts for your selected number of coats automatically.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I apply a second coat the next day?</h3>
              <p className="text-gray-700">Yes — latex paint can be recoated after 2–4 hours but can also be left overnight. Waiting until the next day is fine as long as the room stays clean and dust-free.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
