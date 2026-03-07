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
      ? 'https://thepaintcalculator.com/best-exterior-paint-for-houses'
      : `https://thepaintcalculator.com/${locale}/best-exterior-paint-for-houses`;
  return {
    title: 'Best Exterior Paint for Houses 2026 | ThePaintCalculator.com',
    description: 'Find the best exterior paint for houses in 2026. Top picks for durability, weather resistance, and long-lasting colour on all exterior surfaces.',
    alternates: { canonical },
    openGraph: {
      title: 'Best Exterior Paint for Houses 2026',
      description: 'Find the best exterior paint for houses in 2026. Top picks for durability, weather resistance, and long-lasting colour on all exterior surfaces.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function BestExteriorPaintHouses({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Best Exterior Paint for Houses","item":"https://thepaintcalculator.com/best-exterior-paint-for-houses"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What type of exterior paint lasts the longest?","acceptedAnswer":{"@type":"Answer","text":"100% acrylic latex exterior paint lasts the longest — up to 10–15 years with proper preparation and two coats over exterior primer."}},{"@type":"Question","name":"What is the best exterior paint for wood siding?","acceptedAnswer":{"@type":"Answer","text":"A 100% acrylic exterior paint with good flexibility ratings. Sherwin-Williams Emerald and Benjamin Moore Aura Exterior are top choices for wood siding."}},{"@type":"Question","name":"How often does exterior paint need to be redone?","acceptedAnswer":{"@type":"Answer","text":"Quality exterior paint lasts 7–15 years. Budget exterior paint may only last 3–5 years. Good surface prep before painting is the single biggest factor in longevity."}},{"@type":"Question","name":"What sheen for exterior house paint?","acceptedAnswer":{"@type":"Answer","text":"Satin or low-lustre for main exterior walls — it resists dirt better than flat and does not look too shiny. Semi-gloss for exterior trim, doors, and fascia boards."}},{"@type":"Question","name":"Do I need primer for exterior painting?","acceptedAnswer":{"@type":"Answer","text":"Yes — primer on bare wood, new or repaired surfaces, and areas where old paint has been removed is essential for adhesion and durability."}},{"@type":"Question","name":"Can I paint the exterior of my house in winter?","acceptedAnswer":{"@type":"Answer","text":"Not in freezing temperatures — latex paint needs temperatures above 50°F (10°C) during application and for at least 24 hours after. Spring and autumn are ideal for exterior painting."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Best Exterior Paint for Houses 2026 — Top Picks","description":"Top exterior house paint picks for maximum durability, weather resistance, and long-lasting colour retention.","url":"https://thepaintcalculator.com/best-exterior-paint-for-houses","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Best Exterior Paint for Houses</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Best Exterior Paint for Houses 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The best exterior house paint is <strong>100% acrylic latex</strong> with strong UV inhibitors, mildew resistance, and flexible resins that expand and contract with temperature changes. Quality exterior paint applied over proper primer lasts 10–15 years.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">100% acrylic latex exterior paint — the most durable option</p>
          <p className="text-sm opacity-90">UV resistance, flexibility, and moisture resistance are the key factors</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Makes a Good Exterior House Paint?</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>UV resistance.</strong> The sun bleaches and degrades paint over time. Quality exterior paints contain UV absorbers that prevent colour fading and resin degradation. Cheaper paints fade significantly faster — often within 3–5 years.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Flexibility.</strong> Wood and siding expand and contract with temperature changes. The paint must flex with the substrate without cracking. 100% acrylic resins are the most flexible and most durable for exterior use.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Moisture resistance.</strong> Exterior walls face rain, dew, and humidity. Quality paint repels water rather than absorbing it, preventing rot, swelling, and paint failure.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Mildew resistance.</strong> Exterior paint on north-facing or shaded walls is particularly susceptible to mould. Built-in mildewcides prevent mould growth on the painted surface.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Exterior Paint Picks for 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sherwin-Williams Emerald Exterior.</strong> The highest-rated exterior house paint in consumer and professional testing. Exceptional UV resistance, excellent coverage, and a 10-year fade and peel warranty. Best overall choice for most homes.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Benjamin Moore Aura Exterior.</strong> Outstanding colour retention and excellent moisture resistance. Colour Lock technology maintains colour accuracy longer than standard exterior paints. Best for bold or saturated exterior colours.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Behr Marquee Exterior.</strong> Excellent performance at a mid-range price point. One-coat coverage claim is genuine in many applications. Available at Home Depot with good colour matching.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>PPG Diamond Exterior.</strong> Very strong UV resistance and mildew resistance. Popular with professional painting contractors for its consistent results and easy application.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Dulux Weathershield (UK).</strong> The most popular exterior masonry paint in the UK. 15-year weather protection, excellent coverage on brick and render, and available in a wide colour range including custom tints.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Exterior Paint for a House?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A 1,500 sq ft home typically needs 7–10 gallons for two coats on exterior siding. A 2,000 sq ft home needs 10–14 gallons. Rough surfaces like stucco and brick absorb significantly more — add 50–100% for these materials. Use the exterior paint calculator for precise estimates based on your home size and surface type.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/whole-house-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-2000-sq-ft-house`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 2000 Sq Ft House? →</Link></li>
            <li><Link href={`/${locale}/interior-vs-exterior-paint`} className="text-blue-600 hover:text-blue-700 font-medium">Interior vs Exterior Paint — What is the Difference? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-brick-wall`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Brick Wall? →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-stucco`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for Stucco? →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of exterior paint lasts the longest?</h3>
              <p className="text-gray-700">100% acrylic latex exterior paint lasts the longest — up to 10–15 years with proper preparation and two coats over exterior primer.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best exterior paint for wood siding?</h3>
              <p className="text-gray-700">A 100% acrylic exterior paint with good flexibility ratings. Sherwin-Williams Emerald and Benjamin Moore Aura Exterior are top choices for wood siding.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How often does exterior paint need to be redone?</h3>
              <p className="text-gray-700">Quality exterior paint lasts 7–15 years. Budget exterior paint may only last 3–5 years. Good surface prep before painting is the single biggest factor in longevity.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What sheen for exterior house paint?</h3>
              <p className="text-gray-700">Satin or low-lustre for main exterior walls — it resists dirt better than flat and does not look too shiny. Semi-gloss for exterior trim, doors, and fascia boards.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer for exterior painting?</h3>
              <p className="text-gray-700">Yes — primer on bare wood, new or repaired surfaces, and areas where old paint has been removed is essential for adhesion and durability.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint the exterior of my house in winter?</h3>
              <p className="text-gray-700">Not in freezing temperatures — latex paint needs temperatures above 50°F (10°C) during application and for at least 24 hours after. Spring and autumn are ideal for exterior painting.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
