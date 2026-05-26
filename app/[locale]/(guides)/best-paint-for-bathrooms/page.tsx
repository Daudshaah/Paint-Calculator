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
      ? 'https://thepaintcalculator.com/best-paint-for-bathrooms'
      : `https://thepaintcalculator.com/${locale}/best-paint-for-bathrooms`;
  return {
    title: 'Best Paint for Bathrooms 2026 | ThePaintCalculator.com',
    description: 'Find the best paint for bathrooms in 2026. Top picks for moisture resistance, mould prevention, and durability in high-humidity spaces.',
    alternates: { canonical },
    openGraph: {
      title: 'Best Paint for Bathrooms 2026',
      description: 'Find the best paint for bathrooms in 2026. Top picks for moisture resistance, mould prevention, and durability in high-humidity spaces.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function BestPaintForBathrooms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Best Paint for Bathrooms","item":"https://thepaintcalculator.com/best-paint-for-bathrooms"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the best paint finish for a bathroom?","acceptedAnswer":{"@type":"Answer","text":"Satin or semi-gloss — both resist moisture, are easy to wipe clean, and do not absorb condensation. Flat paint in a bathroom will absorb moisture and peel."}},{"@type":"Question","name":"Do I need special bathroom paint?","acceptedAnswer":{"@type":"Answer","text":"For best results yes. Bathroom-specific paints include mildew-resistant additives that significantly outperform standard wall paint in high-humidity environments."}},{"@type":"Question","name":"Can I use regular wall paint in a bathroom?","acceptedAnswer":{"@type":"Answer","text":"You can use standard wall paint in satin or semi-gloss finish in a well-ventilated bathroom and get acceptable results. Bathroom-specific paint is better for poorly ventilated bathrooms."}},{"@type":"Question","name":"How do I prevent mould on bathroom walls?","acceptedAnswer":{"@type":"Answer","text":"Use a paint with antimicrobial/mildewcide additives, ensure the bathroom is well ventilated (extractor fan running during and after showers), and wipe down wet walls after bathing."}},{"@type":"Question","name":"How often should I repaint a bathroom?","acceptedAnswer":{"@type":"Answer","text":"A well-painted bathroom with quality moisture-resistant paint should last 3–5 years before repainting is needed. Poor ventilation or cheap paint may require repainting sooner."}},{"@type":"Question","name":"What colours work best in a bathroom?","acceptedAnswer":{"@type":"Answer","text":"Light, cool tones — pale blues, soft greens, and warm whites — are the most popular bathroom colours. They make small bathrooms feel larger and cleaner. Dark tones work in larger bathrooms with good lighting."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Best Paint for Bathrooms 2026 — Top Picks Reviewed","description":"Top bathroom paint picks for moisture resistance, mould prevention, and long-lasting colour in high-humidity environments.","url":"https://thepaintcalculator.com/best-paint-for-bathrooms","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Best Paint for Bathrooms</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Best Paint for Bathrooms 2026
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `The best bathroom paint combines <strong>moisture resistance, mildew inhibitors, and a cleanable finish</strong>. Satin or semi-gloss are the only appropriate sheens. Flat paint absorbs moisture and will peel or grow mould in any bathroom.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Satin or semi-gloss with mildew-resistant additives</p>
          <p className="text-sm opacity-90">Moisture, steam, and mould resistance are essential in bathrooms</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Makes a Paint Good for Bathrooms?</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Moisture resistance.</strong> Bathroom walls are exposed to steam and condensation daily. Standard wall paint absorbs moisture and eventually blisters, peels, or grows mould. Bathroom-specific paints use resins that repel moisture rather than absorbing it.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Mildew inhibitors.</strong> Bathrooms are warm, damp, and often poorly ventilated — ideal conditions for mould growth. The best bathroom paints contain antimicrobial additives that prevent mould and mildew from growing on the painted surface.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Washability.</strong> Bathroom walls need regular wiping from soap splatter, toothpaste, and fingerprints. A satin or semi-gloss finish that can be scrubbed clean is essential.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top Bathroom Paint Picks for 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Benjamin Moore Aura Bath & Spa (Matte finish).</strong> The only flat finish recommended for bathrooms — contains proprietary mildew inhibitors powerful enough to use matte sheen without moisture problems. Exceptional coverage and a luxurious velvety look. Best for high-end bathroom renovations.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sherwin-Williams Emerald Interior (Satin).</strong> Outstanding moisture resistance, built-in primer, and mildewcide. Covers in one coat in most situations. The best all-round bathroom paint for most homeowners.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Behr Premium Plus Ultra (Satin).</strong> Excellent moisture and mould resistance at a lower price point. Available exclusively at Home Depot. Strong coverage and wide colour range.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Dulux Bathroom+ (UK).</strong> Formulated specifically for UK bathrooms with Steam Shield technology that resists condensation. Available in a wide range of colours with a soft sheen.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Zinsser Perma-White (Semi-Gloss).</strong> The most mould-resistant bathroom paint available. Carries a 5-year mould-free guarantee. Particularly good for bathrooms with serious ventilation problems or previous mould issues.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Bathroom Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">A small 5×8 bathroom needs about 0.75 to 1 gallon for two coats on the walls. A larger 8×10 bathroom needs 1 to 1.5 gallons. A large master bathroom needs 1.5 to 2 gallons. Use the bathroom paint calculator above for a precise estimate based on your exact dimensions.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Bathrooms are small rooms — paint costs are relatively low. Invest in a premium bathroom-specific product rather than using standard wall paint. The performance difference is significant and the extra cost is typically only $10–20 for the amount needed.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-much-paint-for-a-bathroom`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a Bathroom? →</Link></li>
            <li><Link href={`/${locale}/paint-finish-guide`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Finish Guide — Which Finish for Which Room? →</Link></li>
            <li><Link href={`/${locale}/do-i-need-primer-before-painting`} className="text-blue-600 hover:text-blue-700 font-medium">Do I Need Primer Before Painting? →</Link></li>
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best paint finish for a bathroom?</h3>
              <p className="text-gray-700">Satin or semi-gloss — both resist moisture, are easy to wipe clean, and do not absorb condensation. Flat paint in a bathroom will absorb moisture and peel.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need special bathroom paint?</h3>
              <p className="text-gray-700">For best results yes. Bathroom-specific paints include mildew-resistant additives that significantly outperform standard wall paint in high-humidity environments.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use regular wall paint in a bathroom?</h3>
              <p className="text-gray-700">You can use standard wall paint in satin or semi-gloss finish in a well-ventilated bathroom and get acceptable results. Bathroom-specific paint is better for poorly ventilated bathrooms.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I prevent mould on bathroom walls?</h3>
              <p className="text-gray-700">Use a paint with antimicrobial/mildewcide additives, ensure the bathroom is well ventilated (extractor fan running during and after showers), and wipe down wet walls after bathing.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How often should I repaint a bathroom?</h3>
              <p className="text-gray-700">A well-painted bathroom with quality moisture-resistant paint should last 3–5 years before repainting is needed. Poor ventilation or cheap paint may require repainting sooner.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What colours work best in a bathroom?</h3>
              <p className="text-gray-700">Light, cool tones — pale blues, soft greens, and warm whites — are the most popular bathroom colours. They make small bathrooms feel larger and cleaner. Dark tones work in larger bathrooms with good lighting.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
