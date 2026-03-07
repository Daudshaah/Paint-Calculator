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
      ? 'https://thepaintcalculator.com/spray-paint-vs-roller-vs-brush'
      : `https://thepaintcalculator.com/${locale}/spray-paint-vs-roller-vs-brush`;
  return {
    title: 'Spray Paint vs Roller vs Brush — Which is Best? | ThePaintCalculator.com',
    description: 'Spray paint vs roller vs brush — which gives the best results? Complete comparison of coverage, speed, finish quality, and when to use each method.',
    alternates: { canonical },
    openGraph: {
      title: 'Spray Paint vs Roller vs Brush — Which is Best?',
      description: 'Spray paint vs roller vs brush — which gives the best results? Complete comparison of coverage, speed, finish quality, and when to use each method.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function SprayVsRollerVsBrush({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Spray vs Roller vs Brush","item":"https://thepaintcalculator.com/spray-paint-vs-roller-vs-brush"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is a sprayer or roller better for interior walls?","acceptedAnswer":{"@type":"Answer","text":"A roller is better for interior walls — less setup, less masking, less waste, and easier for a DIYer to use. Sprayers are better for large open exterior spaces."}},{"@type":"Question","name":"Does spraying use more paint than rolling?","acceptedAnswer":{"@type":"Answer","text":"Yes — airless sprayers waste 20–30% of paint as overspray compared to 5–10% for rollers. When calculating paint quantities for spraying, add 30% to your estimate."}},{"@type":"Question","name":"Can I use a roller on kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"A foam roller works well on flat cabinet door panels and gives a smooth finish. Use a small angled brush for recessed panels, edges, and corners."}},{"@type":"Question","name":"What roller nap for smooth walls?","acceptedAnswer":{"@type":"Answer","text":"3/8 inch nap for smooth walls. 1/2 inch nap for lightly textured walls. 3/4 inch nap for heavily textured walls or exterior rough surfaces."}},{"@type":"Question","name":"Is it faster to spray or roll a room?","acceptedAnswer":{"@type":"Answer","text":"Spraying is faster for the actual application but slower overall due to masking and cleanup time. For a single room, rolling is usually faster start to finish."}},{"@type":"Question","name":"Can I spray paint interior walls?","acceptedAnswer":{"@type":"Answer","text":"Yes but it requires masking every surface you don't want painted — floors, ceilings, trim, furniture, fixtures. For most interior rooms, rolling is more practical and just as fast overall."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Spray Paint vs Roller vs Brush — Complete Comparison","description":"Detailed comparison of spray, roller, and brush painting methods — speed, finish quality, and when each is the best choice.","url":"https://thepaintcalculator.com/spray-paint-vs-roller-vs-brush","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Spray vs Roller vs Brush</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Spray Paint vs Roller vs Brush — Which is Best?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The best application method depends on the surface and job. <strong>Rollers are best for large flat walls</strong>. Brushes are essential for cutting in, trim, and detail work. Airless sprayers excel on large exterior surfaces and cabinets. Most interior painting jobs use all three.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Roller for walls, brush for edges and trim, sprayer for large exteriors</p>
          <p className="text-sm opacity-90">Each method has its ideal application — no single tool is best for everything</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Roller — Best for Interior Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 9-inch roller with the correct nap is the fastest and most efficient way to paint large interior wall surfaces. It applies paint evenly, leaves a consistent texture, and is easy to reload. A quality roller with a 3/8 inch nap on smooth walls can apply a full coat to an average bedroom in under an hour.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Rollers do not work well in corners, along edges, or on detailed surfaces — a brush is needed for these areas. The standard technique is to cut in all edges with a brush first, then fill in the main wall area with the roller.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Brush — Essential for Detail and Trim</h2>
          <p className="text-gray-700 leading-relaxed mb-4">An angled sash brush is the right tool for cutting in edges, painting trim, doors, baseboards, and any detailed or intricate surface. Brushes give precise control where a roller cannot reach and are the only practical tool for interior trim and woodwork.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Brushes are slow for large surfaces and leave visible brush marks if the paint does not self-level well. For wall surfaces, a brush is only used for cutting in — the roller covers the main area.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Airless Sprayer — Best for Exteriors and Cabinets</h2>
          <p className="text-gray-700 leading-relaxed mb-4">An airless sprayer is dramatically faster than a roller for large exterior surfaces — a professional can spray a house exterior in a fraction of the time of brushing or rolling. Sprayers also produce the smoothest, most factory-like finish on cabinets and furniture.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The downsides: sprayers require significant setup, masking, and cleanup time. Overspray is a serious concern — everything within 10–15 feet of the sprayer must be masked or covered. Paint waste from overspray is typically 20–30% compared to 5–10% for a roller. Sprayers also require practice to achieve consistent results.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Method Comparison</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Factor</th>
                <th className="px-4 py-3 text-left font-semibold">Brush</th>
                <th className="px-4 py-3 text-left font-semibold">Roller</th>
                <th className="px-4 py-3 text-left font-semibold">Sprayer</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Speed (large areas)</td><td className="px-4 py-3 text-gray-700">Slow</td><td className="px-4 py-3 text-gray-700">Fast</td><td className="px-4 py-3 text-gray-700">Very fast</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Finish quality</td><td className="px-4 py-3 text-gray-700">Good (trim)</td><td className="px-4 py-3 text-gray-700">Very good</td><td className="px-4 py-3 text-gray-700">Excellent</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Setup time</td><td className="px-4 py-3 text-gray-700">Minimal</td><td className="px-4 py-3 text-gray-700">Minimal</td><td className="px-4 py-3 text-gray-700">Significant</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Paint waste</td><td className="px-4 py-3 text-gray-700">5%</td><td className="px-4 py-3 text-gray-700">5–10%</td><td className="px-4 py-3 text-gray-700">20–30%</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Best for</td><td className="px-4 py-3 text-gray-700">Trim, edges</td><td className="px-4 py-3 text-gray-700">Interior walls</td><td className="px-4 py-3 text-gray-700">Exteriors, cabinets</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Skill needed</td><td className="px-4 py-3 text-gray-700">Medium</td><td className="px-4 py-3 text-gray-700">Low</td><td className="px-4 py-3 text-gray-700">High</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/spray-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Spray Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}/how-long-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Long Does It Take to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/cabinet-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Cabinet Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is a sprayer or roller better for interior walls?</h3>
              <p className="text-gray-700">A roller is better for interior walls — less setup, less masking, less waste, and easier for a DIYer to use. Sprayers are better for large open exterior spaces.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does spraying use more paint than rolling?</h3>
              <p className="text-gray-700">Yes — airless sprayers waste 20–30% of paint as overspray compared to 5–10% for rollers. When calculating paint quantities for spraying, add 30% to your estimate.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use a roller on kitchen cabinets?</h3>
              <p className="text-gray-700">A foam roller works well on flat cabinet door panels and gives a smooth finish. Use a small angled brush for recessed panels, edges, and corners.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What roller nap for smooth walls?</h3>
              <p className="text-gray-700">3/8 inch nap for smooth walls. 1/2 inch nap for lightly textured walls. 3/4 inch nap for heavily textured walls or exterior rough surfaces.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it faster to spray or roll a room?</h3>
              <p className="text-gray-700">Spraying is faster for the actual application but slower overall due to masking and cleanup time. For a single room, rolling is usually faster start to finish.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I spray paint interior walls?</h3>
              <p className="text-gray-700">Yes but it requires masking every surface you don't want painted — floors, ceilings, trim, furniture, fixtures. For most interior rooms, rolling is more practical and just as fast overall.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
