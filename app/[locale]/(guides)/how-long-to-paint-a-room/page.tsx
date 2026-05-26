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
      ? 'https://thepaintcalculator.com/how-long-to-paint-a-room'
      : `https://thepaintcalculator.com/${locale}/how-long-to-paint-a-room`;
  return {
    title: 'How Long Does It Take to Paint a Room? | ThePaintCalculator.com',
    description: 'Find out exactly how long it takes to paint a room. Time estimates for all room sizes including prep, drying time, and cleanup.',
    alternates: { canonical },
    openGraph: {
      title: 'How Long Does It Take to Paint a Room?',
      description: 'Find out exactly how long it takes to paint a room. Time estimates for all room sizes including prep, drying time, and cleanup.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function HowLongToPaintRoom({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Long to Paint a Room","item":"https://thepaintcalculator.com/how-long-to-paint-a-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does it take to paint a 12×14 bedroom?","acceptedAnswer":{"@type":"Answer","text":"An average 12×14 bedroom takes 4–6 hours for two wall coats including prep and drying time between coats. Allow a full day to also paint the ceiling and trim."}},{"@type":"Question","name":"How long does paint take to dry between coats?","acceptedAnswer":{"@type":"Answer","text":"Latex paint needs 2–4 hours between coats. Oil-based paints need 8–24 hours. Always check the manufacturer's recoat time on the tin."}},{"@type":"Question","name":"Can I paint a room in one day?","acceptedAnswer":{"@type":"Answer","text":"Yes — most rooms up to a large bedroom can be completed in one day starting in the morning. Living rooms and large master bedrooms may need a second day for the second coat and trim."}},{"@type":"Question","name":"How long before I can sleep in a freshly painted room?","acceptedAnswer":{"@type":"Answer","text":"Most latex paints are dry to the touch in 1–2 hours and safe to sleep in after 4 hours with good ventilation. Wait 24 hours before closing windows in a freshly painted room."}},{"@type":"Question","name":"How long does a professional painter take to paint a room?","acceptedAnswer":{"@type":"Answer","text":"An experienced professional painter completes an average bedroom in 2–3 hours — roughly twice as fast as a careful DIYer. They work faster due to experience, better equipment, and fewer breaks."}},{"@type":"Question","name":"How long does it take to paint a whole house interior?","acceptedAnswer":{"@type":"Answer","text":"A professional crew of two takes 3–4 days for a 1,500 sq ft house interior. A solo DIYer should allow 7–10 days to do it properly with adequate drying time between coats."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"How Long Does It Take to Paint a Room?","description":"Realistic time estimates for painting rooms of all sizes including prep, application, drying time and cleanup.","url":"https://thepaintcalculator.com/how-long-to-paint-a-room","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">How Long to Paint a Room</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Long Does It Take to Paint a Room?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `An average room takes <strong>4 to 8 hours</strong> to paint from start to finish including prep, two coats, and drying time. A small 10×10 room takes 3–4 hours. A large living room or master bedroom can take a full day.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">4 to 8 hours for an average room including prep</p>
          <p className="text-sm opacity-90">A 12×14 bedroom takes most people a full day start to finish</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Painting Time by Room Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Room</th>
                <th className="px-4 py-3 text-left font-semibold">Prep</th>
                <th className="px-4 py-3 text-left font-semibold">Painting</th>
                <th className="px-4 py-3 text-left font-semibold">Total (2 coats)</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small bathroom 5×8</td><td className="px-4 py-3 text-gray-700">30 min</td><td className="px-4 py-3 text-gray-700">1.5 hrs</td><td className="px-4 py-3 text-gray-700">~2–3 hours</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small bedroom 10×10</td><td className="px-4 py-3 text-gray-700">45 min</td><td className="px-4 py-3 text-gray-700">2 hrs</td><td className="px-4 py-3 text-gray-700">~3–4 hours</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Average bedroom 12×14</td><td className="px-4 py-3 text-gray-700">1 hour</td><td className="px-4 py-3 text-gray-700">3 hrs</td><td className="px-4 py-3 text-gray-700">~4–6 hours</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Living room 15×20</td><td className="px-4 py-3 text-gray-700">1.5 hrs</td><td className="px-4 py-3 text-gray-700">4 hrs</td><td className="px-4 py-3 text-gray-700">~6–8 hours</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Large open plan 20×30</td><td className="px-4 py-3 text-gray-700">2 hrs</td><td className="px-4 py-3 text-gray-700">6 hrs</td><td className="px-4 py-3 text-gray-700">~8–12 hours</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Long Does Each Stage Take?</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prep (20–30% of total time).</strong> Moving furniture, laying drop cloths, filling holes, sanding, and taping edges. Prep is the most time-consuming part — but the most important. Rushing prep means imperfect results that are visible for years.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>First coat (30–40% of total time).</strong> Cutting in with a brush around all edges and corners, then rolling the main wall surfaces. Allow 2–4 hours before applying the second coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Drying time between coats.</strong> Latex paint needs 2–4 hours between coats. This is dead time — use it to clean brushes, eat lunch, or prep another room.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Second coat (similar to first coat).</strong> Goes faster than the first coat as edges are already cut in cleanly.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Cleanup (15–20 minutes).</strong> Remove tape while paint is still slightly tacky to avoid peeling. Clean brushes and rollers. Replace furniture after 24 hours.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Paint a Room Faster</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a quality roller.</strong> A good 9-inch roller with a 3/8 inch nap applies paint twice as fast as a cheap one and gives better coverage in fewer passes.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Cut in all edges first.</strong> Cut in the entire room before you start rolling. This lets you roll quickly without worrying about edges and creates a consistent wet edge.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Work wall to wall.</strong> Complete each wall fully before moving to the next. Do not roll halfway across a wall and leave it — this creates lap marks.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Paint the ceiling first.</strong> If painting both ceiling and walls, do the ceiling before the walls — any drips are covered when you roll the walls.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/how-many-coats-of-paint`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Coats of Paint Do You Need? →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a 12×14 bedroom?</h3>
              <p className="text-gray-700">An average 12×14 bedroom takes 4–6 hours for two wall coats including prep and drying time between coats. Allow a full day to also paint the ceiling and trim.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does paint take to dry between coats?</h3>
              <p className="text-gray-700">Latex paint needs 2–4 hours between coats. Oil-based paints need 8–24 hours. Always check the manufacturer's recoat time on the tin.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint a room in one day?</h3>
              <p className="text-gray-700">Yes — most rooms up to a large bedroom can be completed in one day starting in the morning. Living rooms and large master bedrooms may need a second day for the second coat and trim.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long before I can sleep in a freshly painted room?</h3>
              <p className="text-gray-700">Most latex paints are dry to the touch in 1–2 hours and safe to sleep in after 4 hours with good ventilation. Wait 24 hours before closing windows in a freshly painted room.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does a professional painter take to paint a room?</h3>
              <p className="text-gray-700">An experienced professional painter completes an average bedroom in 2–3 hours — roughly twice as fast as a careful DIYer. They work faster due to experience, better equipment, and fewer breaks.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does it take to paint a whole house interior?</h3>
              <p className="text-gray-700">A professional crew of two takes 3–4 days for a 1,500 sq ft house interior. A solo DIYer should allow 7–10 days to do it properly with adequate drying time between coats.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
