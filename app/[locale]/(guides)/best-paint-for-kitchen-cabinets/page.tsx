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
      ? 'https://thepaintcalculator.com/best-paint-for-kitchen-cabinets'
      : `https://thepaintcalculator.com/${locale}/best-paint-for-kitchen-cabinets`;
  return {
    title: 'Best Paint for Kitchen Cabinets 2026 | ThePaintCalculator.com',
    description: 'Find the best paint for kitchen cabinets in 2026. Top picks for durability, chip resistance, and professional finish on painted cabinets.',
    alternates: { canonical },
    openGraph: {
      title: 'Best Paint for Kitchen Cabinets 2026',
      description: 'Find the best paint for kitchen cabinets in 2026. Top picks for durability, chip resistance, and professional finish on painted cabinets.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function BestPaintForKitchenCabinets({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Best Paint for Kitchen Cabinets","item":"https://thepaintcalculator.com/best-paint-for-kitchen-cabinets"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can I use regular paint on kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"No — standard wall paint is not hard enough to withstand cabinet use. It will chip and scuff within weeks. Always use a dedicated cabinet enamel or alkyd-hybrid paint."}},{"@type":"Question","name":"What sheen is best for kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Satin or semi-gloss — both are easy to wipe clean and have enough sheen to look polished without being too shiny. Gloss is also used for a high-end look but shows every imperfection."}},{"@type":"Question","name":"Do I need to sand cabinets before painting?","acceptedAnswer":{"@type":"Answer","text":"Yes — lightly sand with 120-grit to remove the existing sheen and give the primer tooth to adhere to. Wipe clean thoroughly with a tack cloth before priming."}},{"@type":"Question","name":"How long do painted cabinets last?","acceptedAnswer":{"@type":"Answer","text":"Properly painted cabinets using a quality alkyd-hybrid enamel last 7–10 years with normal use before chipping or wear requires a touch-up or repaint."}},{"@type":"Question","name":"Should I spray or brush kitchen cabinets?","acceptedAnswer":{"@type":"Answer","text":"Spraying gives the smoothest, most factory-like finish. Brushing with a quality foam roller and angled brush gives excellent results for DIY. The key is using a self-levelling cabinet paint."}},{"@type":"Question","name":"How long does cabinet paint take to cure?","acceptedAnswer":{"@type":"Answer","text":"Cabinet paint is dry to touch in 2–4 hours but takes 2–4 weeks to fully cure to maximum hardness. Avoid heavy use for the first month after painting."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Best Paint for Kitchen Cabinets 2026 — Tested Picks","description":"Top kitchen cabinet paint picks for durability, chip resistance, and a professional factory-like finish.","url":"https://thepaintcalculator.com/best-paint-for-kitchen-cabinets","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Best Paint for Kitchen Cabinets</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Best Paint for Kitchen Cabinets 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The best kitchen cabinet paint is <strong>hard, chip-resistant, and self-levelling</strong>. Alkyd-hybrid enamels and 100% acrylic cabinet paints are the top choices. Never use standard wall paint on cabinets — it is not hard enough to withstand daily use.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Alkyd-hybrid or 100% acrylic enamel in satin or semi-gloss</p>
          <p className="text-sm opacity-90">Cabinet paint needs hardness, chip resistance, and a level, smooth finish</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Makes a Good Cabinet Paint?</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Hardness.</strong> Cabinet doors open and close hundreds of times per week. The paint must cure to a very hard film that resists chipping, scratching, and scuffing from daily use.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Self-levelling.</strong> Brush marks visible on cabinet doors look amateurish. The best cabinet paints flow out and level themselves as they dry, eliminating brush marks even on hand-applied finishes.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Grease and moisture resistance.</strong> Kitchen environments expose cabinets to cooking grease, steam, and moisture. The paint needs to resist all three without softening, staining, or peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Full cure time.</strong> Cabinet paints typically feel dry in hours but need 2–4 weeks to fully cure and reach maximum hardness. Avoid heavy use during this period.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Cabinet Paint Picks for 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Benjamin Moore Advance (Satin or Semi-Gloss).</strong> Widely considered the best cabinet paint for DIY. Alkyd-hybrid formula cures extremely hard, self-levels beautifully to eliminate brush marks, and is available in thousands of custom colours. Requires patience — full cure takes 30 days.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sherwin-Williams Emerald Urethane Trim Enamel.</strong> The hardest-curing water-based cabinet paint available. Excellent levelling, exceptional chip resistance, and good grease resistance. A top choice for professional painters.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Rust-Oleum Cabinet Transformations.</strong> A complete cabinet painting system that includes deglosser, primer, coating, and glaze. Good for DIY beginners — the system approach reduces the chance of errors.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Farrow & Ball Full Gloss.</strong> Premium option for white or off-white cabinets. Beautiful depth of finish, exceptional durability. Expensive and requires careful application — best for experienced painters.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Dulux Trade Satinwood (UK).</strong> The professional-grade cabinet and trim paint used by UK painters. Excellent levelling, very durable, and available in custom colours.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint for Kitchen Cabinets?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">An average kitchen with 20 cabinet doors needs about 1 gallon for two coats. A large kitchen with 30+ doors needs 1.5 to 2 gallons. Always add one quart of primer — cabinet primer improves adhesion dramatically and is essential for laminate or previously painted cabinets.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/cabinet-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Cabinet Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-kitchen-cabinets`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Kitchen Cabinets? →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-finish-guide`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Finish Guide →</Link></li>
            <li><Link href={`/${locale}/do-i-need-primer-before-painting`} className="text-blue-600 hover:text-blue-700 font-medium">Do I Need Primer Before Painting? →</Link></li>
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use regular paint on kitchen cabinets?</h3>
              <p className="text-gray-700">No — standard wall paint is not hard enough to withstand cabinet use. It will chip and scuff within weeks. Always use a dedicated cabinet enamel or alkyd-hybrid paint.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What sheen is best for kitchen cabinets?</h3>
              <p className="text-gray-700">Satin or semi-gloss — both are easy to wipe clean and have enough sheen to look polished without being too shiny. Gloss is also used for a high-end look but shows every imperfection.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to sand cabinets before painting?</h3>
              <p className="text-gray-700">Yes — lightly sand with 120-grit to remove the existing sheen and give the primer tooth to adhere to. Wipe clean thoroughly with a tack cloth before priming.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long do painted cabinets last?</h3>
              <p className="text-gray-700">Properly painted cabinets using a quality alkyd-hybrid enamel last 7–10 years with normal use before chipping or wear requires a touch-up or repaint.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I spray or brush kitchen cabinets?</h3>
              <p className="text-gray-700">Spraying gives the smoothest, most factory-like finish. Brushing with a quality foam roller and angled brush gives excellent results for DIY. The key is using a self-levelling cabinet paint.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does cabinet paint take to cure?</h3>
              <p className="text-gray-700">Cabinet paint is dry to touch in 2–4 hours but takes 2–4 weeks to fully cure to maximum hardness. Avoid heavy use for the first month after painting.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
