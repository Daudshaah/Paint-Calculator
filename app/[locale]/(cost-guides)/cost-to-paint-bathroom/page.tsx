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
      ? 'https://thepaintcalculator.com/cost-to-paint-bathroom'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-bathroom`;
  return {
    title: 'Cost to Paint a Bathroom in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a bathroom in 2026. DIY and professional estimates for small and large bathrooms.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint a Bathroom in 2026',
      description: 'Find out exactly how much it costs to paint a bathroom in 2026. DIY and professional estimates for small and large bathrooms.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintBathroom({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint a Bathroom","item":"https://thepaintcalculator.com/cost-to-paint-bathroom"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a bathroom?","acceptedAnswer":{"@type":"Answer","text":"An average 5×8 bathroom costs $150–$350 professionally and $30–$70 DIY. Large master bathrooms cost $350–$700 professionally."}},{"@type":"Question","name":"Do I need special paint for a bathroom?","acceptedAnswer":{"@type":"Answer","text":"Yes — use satin or semi-gloss with mildew-resistant additives. Standard flat paint absorbs moisture and will peel or grow mould in any bathroom."}},{"@type":"Question","name":"Is bathroom painting a good DIY project?","acceptedAnswer":{"@type":"Answer","text":"Yes — small size makes it one of the easiest rooms to paint. Most bathrooms can be completed in 2–3 hours including prep. The cost savings are significant relative to the effort."}},{"@type":"Question","name":"How often should you repaint a bathroom?","acceptedAnswer":{"@type":"Answer","text":"With quality moisture-resistant paint, every 3–5 years. Poor ventilation or cheap paint may require repainting sooner."}},{"@type":"Question","name":"Why does a tiny bathroom cost so much professionally?","acceptedAnswer":{"@type":"Answer","text":"Professional painters have minimum charges regardless of room size, plus bathroom prep (removing fixtures, caulking, mould treatment) takes proportionally more time in small spaces."}},{"@type":"Question","name":"What is the best paint colour for a small bathroom?","acceptedAnswer":{"@type":"Answer","text":"Light colours — pale blue, soft white, light grey — make small bathrooms feel larger. Dark tones work in larger bathrooms with good lighting and create a spa-like atmosphere."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint a Bathroom in 2026","description":"2026 cost guide for painting a bathroom — small and large bathroom estimates, DIY vs professional.","url":"https://thepaintcalculator.com/cost-to-paint-bathroom","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint a Bathroom</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint a Bathroom in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Bathrooms are the most affordable room to paint due to their small size. An average 5×8 bathroom costs <strong>$40 to $90 DIY</strong> and <strong>$150 to $400 professionally</strong>. The key cost is using the right moisture-resistant paint.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$150 to $400 professional / $40 to $90 DIY</p>
          <p className="text-sm opacity-90">For an average 5×8 bathroom — walls, two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bathroom Painting Cost by Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Bathroom Size</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small 5×8</td><td className="px-4 py-3 text-gray-700">$30–$70</td><td className="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Average 8×10</td><td className="px-4 py-3 text-gray-700">$50–$100</td><td className="px-4 py-3 text-gray-700">$200–$450</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Large 10×12</td><td className="px-4 py-3 text-gray-700">$70–$140</td><td className="px-4 py-3 text-gray-700">$250–$550</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Master bath 12×14</td><td className="px-4 py-3 text-gray-700">$100–$180</td><td className="px-4 py-3 text-gray-700">$350–$700</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Bathroom Paint Costs More Per Sq Ft</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Professional painters often charge a minimum call-out fee regardless of room size — meaning a small bathroom costs more per square foot than a large living room. A minimum charge of $150–$200 is common even for the smallest bathroom.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Bathroom-specific moisture-resistant paints also cost more than standard wall paint — typically $40–$65 per gallon vs $25–$40 for standard latex. The premium is worth paying — standard paint in a bathroom will fail within 1–2 years.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">DIY Bathroom Painting — Is It Worth It?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Bathrooms are ideal DIY painting projects because of their small size. One gallon of bathroom paint costs $40–$65 and covers a small bathroom for two coats. A small bathroom can be painted in 2–3 hours including prep — making DIY very practical even for beginners.</p>
          <p className="text-gray-700 leading-relaxed mb-4">The one area where professional help is worth considering is bathrooms with extensive tile removal, mould remediation, or complex prep work. Basic repainting over existing sound paint is always a DIY-friendly job.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/best-paint-for-bathrooms`} className="text-blue-600 hover:text-blue-700 font-medium">Best Paint for Bathrooms →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bathroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bathroom? →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-does-it-cost-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/paint-finish-guide`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Finish Guide →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a bathroom?</h3>
              <p className="text-gray-700">An average 5×8 bathroom costs $150–$350 professionally and $30–$70 DIY. Large master bathrooms cost $350–$700 professionally.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need special paint for a bathroom?</h3>
              <p className="text-gray-700">Yes — use satin or semi-gloss with mildew-resistant additives. Standard flat paint absorbs moisture and will peel or grow mould in any bathroom.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is bathroom painting a good DIY project?</h3>
              <p className="text-gray-700">Yes — small size makes it one of the easiest rooms to paint. Most bathrooms can be completed in 2–3 hours including prep. The cost savings are significant relative to the effort.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How often should you repaint a bathroom?</h3>
              <p className="text-gray-700">With quality moisture-resistant paint, every 3–5 years. Poor ventilation or cheap paint may require repainting sooner.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does a tiny bathroom cost so much professionally?</h3>
              <p className="text-gray-700">Professional painters have minimum charges regardless of room size, plus bathroom prep (removing fixtures, caulking, mould treatment) takes proportionally more time in small spaces.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint colour for a small bathroom?</h3>
              <p className="text-gray-700">Light colours — pale blue, soft white, light grey — make small bathrooms feel larger. Dark tones work in larger bathrooms with good lighting and create a spa-like atmosphere.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
