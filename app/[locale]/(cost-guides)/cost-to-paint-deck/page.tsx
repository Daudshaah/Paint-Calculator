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
      ? 'https://thepaintcalculator.com/cost-to-paint-deck'
      : `https://thepaintcalculator.com/${locale}/cost-to-paint-deck`;
  return {
    title: 'Cost to Paint a Deck in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint or stain a deck in 2026. Cost estimates by deck size for DIY and professional painting.',
    alternates: { canonical },
    openGraph: {
      title: 'Cost to Paint a Deck in 2026',
      description: 'Find out exactly how much it costs to paint or stain a deck in 2026. Cost estimates by deck size for DIY and professional painting.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function CostToPaintDeck({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Cost to Paint a Deck","item":"https://thepaintcalculator.com/cost-to-paint-deck"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How much does it cost to paint a deck?","acceptedAnswer":{"@type":"Answer","text":"An average 300 sq ft deck costs $350–$900 professionally and $100–$280 DIY for two coats. Add $150–$400 professionally for railings and stairs."}},{"@type":"Question","name":"Is it cheaper to paint or stain a deck?","acceptedAnswer":{"@type":"Answer","text":"Initial cost is similar. Stain is cheaper long-term because reapplication requires no stripping — just clean and apply. Paint can peel and require expensive prep before recoating."}},{"@type":"Question","name":"How often does a deck need to be painted?","acceptedAnswer":{"@type":"Answer","text":"A well-painted deck needs repainting every 3–5 years. Deck stain needs reapplication every 2–4 years but is much easier to reapply."}},{"@type":"Question","name":"Can I paint a deck myself?","acceptedAnswer":{"@type":"Answer","text":"Yes — deck painting is a manageable DIY project. The most important step is thorough prep — power wash and allow 48 hours to dry before applying any coating."}},{"@type":"Question","name":"What is the best paint for a deck?","acceptedAnswer":{"@type":"Answer","text":"Use a 100% acrylic exterior deck paint or solid colour deck stain. Avoid interior paints or standard exterior wall paint — they are not formulated for deck foot traffic."}},{"@type":"Question","name":"How long after painting a deck can you use it?","acceptedAnswer":{"@type":"Answer","text":"Most deck paints are safe to walk on within 24–48 hours. Allow 7 days before replacing heavy furniture or subjecting the deck to heavy foot traffic."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Cost to Paint a Deck in 2026","description":"2026 cost guide for deck painting and staining — DIY vs professional estimates by deck size.","url":"https://thepaintcalculator.com/cost-to-paint-deck","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Cost to Paint a Deck</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cost to Paint a Deck in 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The cost to paint or stain an average 300–400 sq ft deck ranges from <strong>$100 to $400 for DIY</strong> and <strong>$300 to $1,200 for a professional</strong>. Deck condition and whether you choose paint or stain significantly affect the price.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">$300 to $1,200 professional / $100 to $400 DIY</p>
          <p className="text-sm opacity-90">For a standard 300–400 sq ft deck — two coats</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Deck Painting Cost by Size</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Deck Size</th>
                <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th className="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Small 200 sq ft</td><td className="px-4 py-3 text-gray-700">$60–$180</td><td className="px-4 py-3 text-gray-700">$200–$600</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Average 300 sq ft</td><td className="px-4 py-3 text-gray-700">$100–$280</td><td className="px-4 py-3 text-gray-700">$350–$900</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Large 500 sq ft</td><td className="px-4 py-3 text-gray-700">$170–$450</td><td className="px-4 py-3 text-gray-700">$600–$1,500</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Railings + stairs (add)</td><td className="px-4 py-3 text-gray-700">+$40–$100</td><td className="px-4 py-3 text-gray-700">+$150–$400</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Deck Paint vs Deck Stain — Cost Comparison</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Deck stain typically costs the same as deck paint per gallon ($30–$60) but is more economical long-term because it is easier to reapply — no stripping required. Paint can peel and may require stripping before recoating, adding $200–$600 in prep cost to the next paint job.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For a new deck, stain is the more cost-effective long-term choice. For an existing painted deck, repainting is usually more practical than stripping back to bare wood.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Adds Cost to a Deck Paint Job?</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Deck condition.</strong> Weathered or peeling decks need power washing, sanding, and possibly board replacement before painting — adding $100–$400 to prep costs.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Railings and stairs.</strong> Railings and stairs take proportionally more time than flat deck boards — add 30–50% to the deck estimate for comprehensive railing and stair painting.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Two colours.</strong> Using a different colour for railings vs deck boards requires masking and adds $100–$200 professionally.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/deck-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/deck-stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Deck Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-deck`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Deck? →</Link></li>
            <li><Link href={`/${locale}/stain-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Stain Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/cost-to-paint-exterior-house`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint Exterior of House →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a deck?</h3>
              <p className="text-gray-700">An average 300 sq ft deck costs $350–$900 professionally and $100–$280 DIY for two coats. Add $150–$400 professionally for railings and stairs.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it cheaper to paint or stain a deck?</h3>
              <p className="text-gray-700">Initial cost is similar. Stain is cheaper long-term because reapplication requires no stripping — just clean and apply. Paint can peel and require expensive prep before recoating.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How often does a deck need to be painted?</h3>
              <p className="text-gray-700">A well-painted deck needs repainting every 3–5 years. Deck stain needs reapplication every 2–4 years but is much easier to reapply.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint a deck myself?</h3>
              <p className="text-gray-700">Yes — deck painting is a manageable DIY project. The most important step is thorough prep — power wash and allow 48 hours to dry before applying any coating.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint for a deck?</h3>
              <p className="text-gray-700">Use a 100% acrylic exterior deck paint or solid colour deck stain. Avoid interior paints or standard exterior wall paint — they are not formulated for deck foot traffic.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long after painting a deck can you use it?</h3>
              <p className="text-gray-700">Most deck paints are safe to walk on within 24–48 hours. Allow 7 days before replacing heavy furniture or subjecting the deck to heavy foot traffic.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
