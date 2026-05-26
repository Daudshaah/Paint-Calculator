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
      ? 'https://thepaintcalculator.com/how-much-paint-for-stucco'
      : `https://thepaintcalculator.com/${locale}/how-much-paint-for-stucco`;
  return {
    title: 'How Much Paint for Stucco? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need for stucco. Free estimates for stucco walls in gallons and litres.',
    alternates: { canonical },
    openGraph: {
      title: 'How Much Paint for Stucco?',
      description: 'Calculate exactly how much paint you need for stucco. Free estimates for stucco walls in gallons and litres.',
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

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How Much Paint for Stucco?","item":"https://thepaintcalculator.com/how-much-paint-for-stucco"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much more paint does stucco need vs smooth walls?","acceptedAnswer":{"@type":"Answer","text":"Stucco needs 2 to 4 times more paint than smooth walls. Plan on 1 gallon per 100 to 200 sq ft for stucco vs 400 sq ft for smooth drywall."}},{"@type":"Question","name":"What type of paint is best for stucco?","acceptedAnswer":{"@type":"Answer","text":"Elastomeric masonry paint — it is waterproof, flexible enough to bridge cracks, and designed to expand and contract with the stucco surface through temperature changes."}},{"@type":"Question","name":"Do I need to seal stucco before painting?","acceptedAnswer":{"@type":"Answer","text":"Yes — new stucco must cure 28 days before painting. A masonry sealer or primer significantly reduces absorption and improves adhesion."}},{"@type":"Question","name":"How often should stucco be repainted?","acceptedAnswer":{"@type":"Answer","text":"Exterior stucco should be repainted every 5 to 10 years. Elastomeric coatings last longer — up to 10 to 15 years with proper prep and application."}},{"@type":"Question","name":"Can I use a roller to paint stucco?","acceptedAnswer":{"@type":"Answer","text":"Use a thick nap roller (3/4 to 1 inch) for small stucco areas. An airless sprayer is faster and more effective for large exterior stucco surfaces."}},{"@type":"Question","name":"How do I repair cracks in stucco before painting?","acceptedAnswer":{"@type":"Answer","text":"Fill hairline cracks with elastomeric caulk or stucco patch compound. Allow repairs to cure fully before priming and painting. Large structural cracks should be assessed by a contractor."}}]};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How Much Paint for Stucco?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Much Paint for Stucco?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Stucco requires approximately <strong>1 gallon per 100 to 200 sq ft</strong> — compared to 400 sq ft per gallon on smooth walls. A typical stucco home exterior needs 15 to 25 gallons for two coats.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 gallon per 100 to 200 sq ft</p>
          <p className="text-sm opacity-90">Stucco absorbs 2 to 4× more paint than smooth walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does Stucco Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Stucco is a textured masonry surface that absorbs significantly more paint than smooth drywall. The rough texture increases the effective surface area, and the porous nature of the material means paint soaks in rather than sitting on top. Plan on 1 gallon covering 100 to 200 sq ft of stucco depending on texture coarseness.</p>
          <p className="text-gray-700 leading-relaxed mb-4">A typical 1,500 sq ft stucco home exterior has approximately 1,200 to 1,500 sq ft of stucco surface. Budget 8 to 15 gallons for the first coat and 5 to 8 gallons for the second coat — 13 to 23 gallons total for two coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4">New stucco must cure for at least 28 days before painting. Applying paint to uncured stucco causes adhesion failure and early peeling.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Stucco Paint — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th><th className="px-4 py-3 text-left font-semibold">1st Coat</th><th className="px-4 py-3 text-left font-semibold">2nd Coat</th><th className="px-4 py-3 text-left font-semibold">Litres (total 2 coats)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={0 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Small stucco exterior 1000 sq ft</td><td className="px-4 py-3 text-gray-700">5–8 gal</td><td className="px-4 py-3 text-gray-700">3–5 gal</td><td className="px-4 py-3 text-gray-700">30–49 litres</td>
                  </tr>
                <tr className={1 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Medium stucco exterior 1500 sq ft</td><td className="px-4 py-3 text-gray-700">8–12 gal</td><td className="px-4 py-3 text-gray-700">5–7 gal</td><td className="px-4 py-3 text-gray-700">49–72 litres</td>
                  </tr>
                <tr className={2 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Large stucco exterior 2000 sq ft</td><td className="px-4 py-3 text-gray-700">10–15 gal</td><td className="px-4 py-3 text-gray-700">7–10 gal</td><td className="px-4 py-3 text-gray-700">64–95 litres</td>
                  </tr>
                <tr className={3 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Interior stucco feature wall 10x8</td><td className="px-4 py-3 text-gray-700">1.5 gal</td><td className="px-4 py-3 text-gray-700">0.75 gal</td><td className="px-4 py-3 text-gray-700">~8.5 litres</td>
                  </tr>
                <tr className={4 % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">Masonry sealer/primer</td><td className="px-4 py-3 text-gray-700">1 gal per 150 sq ft</td><td className="px-4 py-3 text-gray-700">—</td><td className="px-4 py-3 text-gray-700">3.8 L per 13.9 sq m</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Stucco</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Elastomeric masonry paint is the best choice for exterior stucco. It is waterproof, flexible, and bridges hairline cracks that naturally develop in stucco over time. The flexibility allows it to expand and contract with temperature changes without cracking — critical for an exterior surface in any climate.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Avoid standard interior or exterior latex wall paint on stucco — it is not flexible enough and will crack as the stucco moves. Also avoid paints labelled as waterproof sealers — while they prevent water penetration from outside, they trap moisture that enters through other means and cause blistering.</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting Stucco</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply a masonry sealer or primer first</strong> — this dramatically reduces absorption and the amount of expensive topcoat needed.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use an airless sprayer for large stucco areas</strong> — a thick nap roller (3/4 to 1 inch) works for smaller areas but a sprayer is far faster and penetrates the texture more effectively.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow new stucco 28 days to cure</strong> before painting — unpainted fresh stucco must be fully cured or the paint will fail.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Repair all cracks with elastomeric caulk</strong> before painting — stucco cracks are common and must be filled to prevent water ingress.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint in mild weather below 90°F</strong> — hot, dry conditions cause stucco paint to dry too quickly, reducing penetration and adhesion.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-brick-wall`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Brick Wall? →</Link></li>
            <li><Link href={`/${locale}/textured-wall-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Textured Wall Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}/spray-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Spray Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div key="How much more paint ">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much more paint does stucco need vs smooth walls?</h3>
              <p className="text-gray-700">Stucco needs 2 to 4 times more paint than smooth walls. Plan on 1 gallon per 100 to 200 sq ft for stucco vs 400 sq ft for smooth drywall.</p>
            </div>
            <div key="What type of paint i">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of paint is best for stucco?</h3>
              <p className="text-gray-700">Elastomeric masonry paint — it is waterproof, flexible enough to bridge cracks, and designed to expand and contract with the stucco surface through temperature changes.</p>
            </div>
            <div key="Do I need to seal st">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to seal stucco before painting?</h3>
              <p className="text-gray-700">Yes — new stucco must cure 28 days before painting. A masonry sealer or primer significantly reduces absorption and improves adhesion.</p>
            </div>
            <div key="How often should stu">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How often should stucco be repainted?</h3>
              <p className="text-gray-700">Exterior stucco should be repainted every 5 to 10 years. Elastomeric coatings last longer — up to 10 to 15 years with proper prep and application.</p>
            </div>
            <div key="Can I use a roller t">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use a roller to paint stucco?</h3>
              <p className="text-gray-700">Use a thick nap roller (3/4 to 1 inch) for small stucco areas. An airless sprayer is faster and more effective for large exterior stucco surfaces.</p>
            </div>
            <div key="How do I repair crac">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I repair cracks in stucco before painting?</h3>
              <p className="text-gray-700">Fill hairline cracks with elastomeric caulk or stucco patch compound. Allow repairs to cure fully before priming and painting. Large structural cracks should be assessed by a contractor.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
