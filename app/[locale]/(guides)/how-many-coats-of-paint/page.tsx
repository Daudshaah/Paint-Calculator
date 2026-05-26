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
      ? 'https://thepaintcalculator.com/how-many-coats-of-paint'
      : `https://thepaintcalculator.com/${locale}/how-many-coats-of-paint`;
  return {
    title: 'How Many Coats of Paint Do You Need? | ThePaintCalculator.com',
    description: 'Find out exactly how many coats of paint you need for any surface. When to use one coat, two coats, or three coats. Free paint calculator included.',
    alternates: { canonical },
    openGraph: {
      title: 'How Many Coats of Paint Do You Need?',
      description: 'Find out exactly how many coats of paint you need for any surface. When to use one coat, two coats, or three coats. Free paint calculator included.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function HowManyCoatsPaint({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Many Coats of Paint","item":"https://thepaintcalculator.com/how-many-coats-of-paint"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is one coat of paint ever enough?","acceptedAnswer":{"@type":"Answer","text":"One coat is only sufficient when repainting with the same or very similar colour over a well-prepared surface. For any colour change, new surface, or professional finish, two coats are required."}},{"@type":"Question","name":"How long should I wait between coats of paint?","acceptedAnswer":{"@type":"Answer","text":"Wait 2–4 hours between coats of latex wall paint. Oil-based paints and cabinet enamels require 8–24 hours. Always check the manufacturer's recoat time on the label."}},{"@type":"Question","name":"Does two coats double the paint needed?","acceptedAnswer":{"@type":"Answer","text":"Yes — two coats require exactly double the amount of paint as one coat. Our calculator automatically calculates for your selected number of coats."}},{"@type":"Question","name":"Do I need three coats when going from dark to light?","acceptedAnswer":{"@type":"Answer","text":"Usually yes. Going from a deep colour to a pale one requires a tinted primer plus 2–3 topcoats for the dark colour to stop showing through."}},{"@type":"Question","name":"Does more coats make paint more durable?","acceptedAnswer":{"@type":"Answer","text":"Up to a point — two coats is significantly more durable than one. Three coats does not provide much additional durability over two once full opacity is achieved."}},{"@type":"Question","name":"Can I apply a second coat the same day?","acceptedAnswer":{"@type":"Answer","text":"For latex paint, yes — if the first coat has dried for at least 2–4 hours. Applying the second coat too soon while the first coat is still wet causes lifting and poor adhesion."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"How Many Coats of Paint Do You Need?","description":"Complete guide to determining the right number of paint coats for walls, ceilings, trim and exterior surfaces.","url":"https://thepaintcalculator.com/how-many-coats-of-paint","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">How Many Coats of Paint</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Many Coats of Paint Do You Need?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Most interior walls need <strong>2 coats of paint</strong> for a professional, even finish. One coat is only appropriate for minor touch-ups or when using a high-build primer. Three coats are needed for dramatic colour changes or porous surfaces.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 coats for most rooms and surfaces</p>
          <p className="text-sm opacity-90">One coat is rarely enough — two coats gives a professional, durable finish</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">One Coat vs Two Coats of Paint</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Two coats of paint is the industry standard for interior walls and the right choice for almost every painting project. Two coats provide full, even colour coverage, better durability, better washability, and a more professional finish than a single coat can achieve.</p>
          <p className="text-gray-700 leading-relaxed mb-4">One coat is only truly sufficient when you are repainting a wall with the same or very similar colour and the existing paint is in good condition. Even then, a second coat will always improve the finish. Paint manufacturers list one-coat coverage on the tin for marketing purposes — in practice two coats is always better.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When You Need Three Coats</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Covering dark colours with light paint.</strong> Going from deep navy or charcoal to a pale neutral requires three coats — sometimes four — for the dark colour to stop bleeding through.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Very bold or saturated colours.</strong> Deep reds, bright yellows, and vivid oranges are notoriously difficult to apply. These pigments require extra coats for full opacity.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Bare or new drywall.</strong> New unpainted drywall is highly absorbent. Without a primer, the first coat soaks in unevenly and three topcoats may be needed for a consistent finish.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Stucco, brick, and masonry.</strong> Porous surfaces absorb the first coat heavily. Three coats is often standard for exterior masonry painting.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Coats of Paint by Surface Type</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Surface</th>
                <th className="px-4 py-3 text-left font-semibold">Recommended Coats</th>
                <th className="px-4 py-3 text-left font-semibold">Notes</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Interior walls (repaint)</td><td className="px-4 py-3 text-gray-700">2 coats</td><td className="px-4 py-3 text-gray-700">Standard for all repaints</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">New drywall</td><td className="px-4 py-3 text-gray-700">1 primer + 2 topcoats</td><td className="px-4 py-3 text-gray-700">Primer is essential</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Dark to light colour</td><td className="px-4 py-3 text-gray-700">1 tinted primer + 2–3 coats</td><td className="px-4 py-3 text-gray-700">Tinted primer reduces coats</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Ceiling</td><td className="px-4 py-3 text-gray-700">2 coats</td><td className="px-4 py-3 text-gray-700">Always 2 for even finish</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Trim and doors</td><td className="px-4 py-3 text-gray-700">1 primer + 2 topcoats</td><td className="px-4 py-3 text-gray-700">Enamel needs full build</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Exterior walls</td><td className="px-4 py-3 text-gray-700">2 coats</td><td className="px-4 py-3 text-gray-700">3 for masonry/stucco</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Long to Wait Between Coats</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Latex paint is dry to touch in 1–2 hours, but you should wait at least <strong>2–4 hours between coats</strong> for interior walls. Rushing the second coat before the first is properly dry causes lifting, brush marks, and poor adhesion.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Oil-based paints and cabinet enamels require much longer recoat times — typically 8–24 hours. Always check the manufacturer's recoat time on the tin label. Temperature and humidity affect drying time — in cold or humid conditions, add at least 50% to the recommended drying time.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/two-coat-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Two Coat Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/do-i-need-primer-before-painting`} className="text-blue-600 hover:text-blue-700 font-medium">Do I Need Primer Before Painting? →</Link></li>
            <li><Link href={`/${locale}/one-coat-vs-two-coats-of-paint`} className="text-blue-600 hover:text-blue-700 font-medium">One Coat vs Two Coats of Paint →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is one coat of paint ever enough?</h3>
              <p className="text-gray-700">One coat is only sufficient when repainting with the same or very similar colour over a well-prepared surface. For any colour change, new surface, or professional finish, two coats are required.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long should I wait between coats of paint?</h3>
              <p className="text-gray-700">Wait 2–4 hours between coats of latex wall paint. Oil-based paints and cabinet enamels require 8–24 hours. Always check the manufacturer's recoat time on the label.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does two coats double the paint needed?</h3>
              <p className="text-gray-700">Yes — two coats require exactly double the amount of paint as one coat. Our calculator automatically calculates for your selected number of coats.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need three coats when going from dark to light?</h3>
              <p className="text-gray-700">Usually yes. Going from a deep colour to a pale one requires a tinted primer plus 2–3 topcoats for the dark colour to stop showing through.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does more coats make paint more durable?</h3>
              <p className="text-gray-700">Up to a point — two coats is significantly more durable than one. Three coats does not provide much additional durability over two once full opacity is achieved.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I apply a second coat the same day?</h3>
              <p className="text-gray-700">For latex paint, yes — if the first coat has dried for at least 2–4 hours. Applying the second coat too soon while the first coat is still wet causes lifting and poor adhesion.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
