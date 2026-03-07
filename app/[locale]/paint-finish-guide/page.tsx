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
      ? 'https://thepaintcalculator.com/paint-finish-guide'
      : `https://thepaintcalculator.com/${locale}/paint-finish-guide`;
  return {
    title: 'Paint Finish Guide — Matte, Eggshell, Satin, Gloss | ThePaintCalculator.com',
    description: 'Complete guide to paint finishes — matte, eggshell, satin, semi-gloss, and gloss. Learn which finish is best for every room and surface.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Finish Guide — Matte, Eggshell, Satin, Semi-Gloss & Gloss',
      description: 'Complete guide to paint finishes — matte, eggshell, satin, semi-gloss, and gloss. Learn which finish is best for every room and surface.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintFinishGuide({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Paint Finish Guide","item":"https://thepaintcalculator.com/paint-finish-guide"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the most popular interior paint finish?","acceptedAnswer":{"@type":"Answer","text":"Eggshell is the most popular interior finish for walls — it balances washability, durability, and an elegant low-sheen appearance suitable for most rooms."}},{"@type":"Question","name":"What finish should I use in a bathroom?","acceptedAnswer":{"@type":"Answer","text":"Satin or semi-gloss — both resist moisture, are easy to wipe clean, and do not absorb condensation. Flat paint in a bathroom will absorb moisture and eventually peel."}},{"@type":"Question","name":"Can I use flat paint in a kitchen?","acceptedAnswer":{"@type":"Answer","text":"Not recommended. Kitchen walls accumulate grease and steam. Flat paint cannot be scrubbed and will stain and deteriorate quickly. Use satin or semi-gloss in kitchens."}},{"@type":"Question","name":"Is eggshell or satin better for a living room?","acceptedAnswer":{"@type":"Answer","text":"Eggshell is ideal for living rooms without children or pets. Satin is better for busy family living rooms that need regular scrubbing."}},{"@type":"Question","name":"What finish is best for ceiling paint?","acceptedAnswer":{"@type":"Answer","text":"Flat white — it absorbs light rather than reflecting it, hides roller marks and imperfections, and creates a clean neutral ceiling that suits any wall colour."}},{"@type":"Question","name":"Does paint finish affect durability?","acceptedAnswer":{"@type":"Answer","text":"Yes significantly. Gloss and semi-gloss are the most durable and scrub-resistant. Flat paint is the least durable and cannot be scrubbed without surface damage."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Paint Finish Guide — Matte, Eggshell, Satin, Semi-Gloss and Gloss Explained","description":"Complete guide to choosing the right paint finish for every room and surface in your home.","url":"https://thepaintcalculator.com/paint-finish-guide","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Paint Finish Guide</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Finish Guide — Matte, Eggshell, Satin, Semi-Gloss & Gloss
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Paint finish affects <strong>sheen, durability, and washability</strong>. Flat/matte hides imperfections but marks easily. Eggshell suits living areas and bedrooms. Satin works in kitchens and bathrooms. Semi-gloss and gloss are best for trim, doors, and cabinets.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Eggshell for living areas, satin for kitchens & bathrooms, semi-gloss for trim</p>
          <p className="text-sm opacity-90">The right finish is as important as the right colour</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Finish Types Explained</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Flat / Matte.</strong> Zero sheen. Hides wall imperfections better than any other finish. Poor washability — marks and scuffs cannot be scrubbed without damaging the surface. Best for ceilings and low-traffic adult spaces like formal dining rooms and master bedrooms.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Eggshell.</strong> Very low sheen — like the surface of an eggshell. The most popular interior finish. Washable, hides minor imperfections, and looks elegant on walls. Best for living rooms, bedrooms, hallways, and dining rooms.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Satin.</strong> A soft pearl sheen. More durable and washable than eggshell. Resists moisture and staining. Best for kitchens, bathrooms, children's rooms, and any high-traffic area. Also works well on exterior trim.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Semi-Gloss.</strong> Noticeable sheen, very washable, and moisture resistant. The standard choice for all interior trim, doors, window frames, and baseboards. Also good for bathroom and kitchen walls.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Gloss / High Gloss.</strong> Mirror-like finish. Extremely durable and washable. Best for doors, cabinets, furniture, and exterior front doors. Highlights every surface imperfection — requires excellent surface prep.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Finish by Room — Quick Reference</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Room / Surface</th>
                <th className="px-4 py-3 text-left font-semibold">Recommended Finish</th>
                <th className="px-4 py-3 text-left font-semibold">Why</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Ceilings</td><td className="px-4 py-3 text-gray-700">Flat white</td><td className="px-4 py-3 text-gray-700">Hides imperfections, no glare</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Living room walls</td><td className="px-4 py-3 text-gray-700">Eggshell</td><td className="px-4 py-3 text-gray-700">Washable, elegant finish</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Bedroom walls</td><td className="px-4 py-3 text-gray-700">Eggshell or flat</td><td className="px-4 py-3 text-gray-700">Low sheen, relaxing look</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Kitchen walls</td><td className="px-4 py-3 text-gray-700">Satin</td><td className="px-4 py-3 text-gray-700">Resists grease, washable</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Bathroom walls</td><td className="px-4 py-3 text-gray-700">Satin or semi-gloss</td><td className="px-4 py-3 text-gray-700">Moisture resistant</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">All trim & doors</td><td className="px-4 py-3 text-gray-700">Semi-gloss</td><td className="px-4 py-3 text-gray-700">Durable, easy to clean</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Front door & cabinets</td><td className="px-4 py-3 text-gray-700">Gloss</td><td className="px-4 py-3 text-gray-700">Maximum durability</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Does Finish Affect How Much Paint You Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Paint finish has a minor effect on coverage. Flat and matte paints typically cover slightly more per gallon (400–450 sq ft) because they contain more pigment and less resin. Gloss and semi-gloss paints cover slightly less (350–400 sq ft) because the resin-heavy formula is thinner.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For practical planning purposes, use 400 sq ft per gallon as your standard estimate regardless of finish. The difference between finish types is small enough that it will not affect how many cans you need to buy for most rooms.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/best-paint-for-bathrooms`} className="text-blue-600 hover:text-blue-700 font-medium">Best Paint for Bathrooms →</Link></li>
            <li><Link href={`/${locale}/best-paint-for-kitchen-cabinets`} className="text-blue-600 hover:text-blue-700 font-medium">Best Paint for Kitchen Cabinets →</Link></li>
            <li><Link href={`/${locale}/cabinet-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Cabinet Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the most popular interior paint finish?</h3>
              <p className="text-gray-700">Eggshell is the most popular interior finish for walls — it balances washability, durability, and an elegant low-sheen appearance suitable for most rooms.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What finish should I use in a bathroom?</h3>
              <p className="text-gray-700">Satin or semi-gloss — both resist moisture, are easy to wipe clean, and do not absorb condensation. Flat paint in a bathroom will absorb moisture and eventually peel.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use flat paint in a kitchen?</h3>
              <p className="text-gray-700">Not recommended. Kitchen walls accumulate grease and steam. Flat paint cannot be scrubbed and will stain and deteriorate quickly. Use satin or semi-gloss in kitchens.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is eggshell or satin better for a living room?</h3>
              <p className="text-gray-700">Eggshell is ideal for living rooms without children or pets. Satin is better for busy family living rooms that need regular scrubbing.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What finish is best for ceiling paint?</h3>
              <p className="text-gray-700">Flat white — it absorbs light rather than reflecting it, hides roller marks and imperfections, and creates a clean neutral ceiling that suits any wall colour.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Does paint finish affect durability?</h3>
              <p className="text-gray-700">Yes significantly. Gloss and semi-gloss are the most durable and scrub-resistant. Flat paint is the least durable and cannot be scrubbed without surface damage.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
