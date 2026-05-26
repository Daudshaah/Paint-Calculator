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
      ? 'https://thepaintcalculator.com/interior-vs-exterior-paint'
      : `https://thepaintcalculator.com/${locale}/interior-vs-exterior-paint`;
  return {
    title: 'Interior vs Exterior Paint — What is the Difference? | ThePaintCalculator.com',
    description: 'Learn the key differences between interior and exterior paint. Can you use exterior paint inside? Find out what makes each paint type different.',
    alternates: { canonical },
    openGraph: {
      title: 'Interior vs Exterior Paint — What is the Difference?',
      description: 'Learn the key differences between interior and exterior paint. Can you use exterior paint inside? Find out what makes each paint type different.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function InteriorVsExteriorPaint({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Interior vs Exterior Paint","item":"https://thepaintcalculator.com/interior-vs-exterior-paint"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the main difference between interior and exterior paint?","acceptedAnswer":{"@type":"Answer","text":"Interior paint uses hard resins for scrub resistance and low odour. Exterior paint uses flexible resins to resist UV, moisture, and temperature changes without cracking."}},{"@type":"Question","name":"Can you use exterior paint inside a garage?","acceptedAnswer":{"@type":"Answer","text":"Not recommended. Exterior paints have higher VOC levels and mildewcides that off-gas in enclosed spaces. Use interior semi-gloss or garage-specific paint indoors."}},{"@type":"Question","name":"Is exterior paint more durable than interior?","acceptedAnswer":{"@type":"Answer","text":"Exterior paint is more durable against weather, UV, and moisture. Interior paint is more durable for scrubbing and cleaning. Each is optimised for its specific environment."}},{"@type":"Question","name":"Can exterior paint be used on interior walls?","acceptedAnswer":{"@type":"Answer","text":"Technically yes but not recommended — higher VOCs, tackier finish, and stronger odour make it unsuitable for living spaces. Always use interior paint indoors."}},{"@type":"Question","name":"Why does exterior paint cost more than interior?","acceptedAnswer":{"@type":"Answer","text":"Exterior paint contains more expensive UV absorbers, flexible resins, and mildewcides. The formulation is more complex and the materials more costly."}},{"@type":"Question","name":"How long does exterior paint last vs interior?","acceptedAnswer":{"@type":"Answer","text":"Quality exterior paint lasts 7–15 years depending on climate and surface prep. Interior paint lasts 7–10 years with normal use before a repaint is needed."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Interior vs Exterior Paint — Key Differences Explained","description":"Complete comparison of interior and exterior paint — resins, additives, VOCs, and when to use each.","url":"https://thepaintcalculator.com/interior-vs-exterior-paint","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Interior vs Exterior Paint</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Interior vs Exterior Paint — What is the Difference?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Interior and exterior paints <strong>look similar but are fundamentally different products</strong>. Exterior paint is formulated to resist UV, moisture, and temperature changes. Interior paint is designed for low odour, washability, and colour retention indoors. Never use them interchangeably.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Never swap them — each is formulated for its specific environment</p>
          <p className="text-sm opacity-90">Interior and exterior paints use different resins, additives, and VOC levels</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Key Differences Between Interior and Exterior Paint</h2>
          <p className="text-gray-700 leading-relaxed mb-4">The core difference is in the <strong>resin (binder)</strong> used in each formula. Exterior paints use flexible acrylic resins that expand and contract with temperature changes without cracking. Interior paints use harder resins that provide better scrub resistance and colour retention but will crack if used outdoors where temperatures fluctuate dramatically.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Exterior paints also contain UV absorbers to prevent colour fading from sun exposure, mildewcides to prevent mould growth in damp conditions, and additives that allow the paint to shed water rather than absorbing it.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Interior vs Exterior Paint Comparison</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Feature</th>
                <th className="px-4 py-3 text-left font-semibold">Interior Paint</th>
                <th className="px-4 py-3 text-left font-semibold">Exterior Paint</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Resin type</td><td className="px-4 py-3 text-gray-700">Hard acrylic/vinyl</td><td className="px-4 py-3 text-gray-700">Flexible acrylic</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">UV resistance</td><td className="px-4 py-3 text-gray-700">Low</td><td className="px-4 py-3 text-gray-700">High</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Mildew resistance</td><td className="px-4 py-3 text-gray-700">Low–medium</td><td className="px-4 py-3 text-gray-700">High</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">VOC levels</td><td className="px-4 py-3 text-gray-700">Low</td><td className="px-4 py-3 text-gray-700">Higher</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Scrub resistance</td><td className="px-4 py-3 text-gray-700">High</td><td className="px-4 py-3 text-gray-700">Medium</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Flexibility</td><td className="px-4 py-3 text-gray-700">Low (cracks outside)</td><td className="px-4 py-3 text-gray-700">High</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Odour</td><td className="px-4 py-3 text-gray-700">Low</td><td className="px-4 py-3 text-gray-700">Higher</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Can You Use Exterior Paint Inside?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Using exterior paint indoors is <strong>not recommended</strong>. Exterior paints contain higher levels of VOCs (volatile organic compounds) and mildewcides that off-gas for much longer indoors than outdoors. In a poorly ventilated interior space this can cause headaches, respiratory irritation, and lingering chemical odour for months.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Some exterior paints also have a naturally tackier surface finish that attracts dust and dirt indoors, making the walls harder to keep clean. Always use interior paint indoors — even in garages, sunrooms, or covered porches where you might be tempted to use exterior paint.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Can You Use Interior Paint Outside?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Interior paint used outdoors will fail quickly — typically within 1–2 years. Without UV stabilisers, the colour fades fast. Without flexible resins, the paint cracks as the substrate expands and contracts with temperature changes. Without mildewcides, mould and mildew grow on the surface rapidly in damp conditions.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The cost saving of using interior paint on an exterior surface is always false economy — you will repaint far more often than if you used the correct exterior product.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-finish-guide`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Finish Guide — Matte, Eggshell, Satin, Gloss →</Link></li>
            <li><Link href={`/${locale}/best-exterior-paint-for-houses`} className="text-blue-600 hover:text-blue-700 font-medium">Best Exterior Paint for Houses →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 2000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the main difference between interior and exterior paint?</h3>
              <p className="text-gray-700">Interior paint uses hard resins for scrub resistance and low odour. Exterior paint uses flexible resins to resist UV, moisture, and temperature changes without cracking.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can you use exterior paint inside a garage?</h3>
              <p className="text-gray-700">Not recommended. Exterior paints have higher VOC levels and mildewcides that off-gas in enclosed spaces. Use interior semi-gloss or garage-specific paint indoors.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is exterior paint more durable than interior?</h3>
              <p className="text-gray-700">Exterior paint is more durable against weather, UV, and moisture. Interior paint is more durable for scrubbing and cleaning. Each is optimised for its specific environment.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can exterior paint be used on interior walls?</h3>
              <p className="text-gray-700">Technically yes but not recommended — higher VOCs, tackier finish, and stronger odour make it unsuitable for living spaces. Always use interior paint indoors.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does exterior paint cost more than interior?</h3>
              <p className="text-gray-700">Exterior paint contains more expensive UV absorbers, flexible resins, and mildewcides. The formulation is more complex and the materials more costly.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does exterior paint last vs interior?</h3>
              <p className="text-gray-700">Quality exterior paint lasts 7–15 years depending on climate and surface prep. Interior paint lasts 7–10 years with normal use before a repaint is needed.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
