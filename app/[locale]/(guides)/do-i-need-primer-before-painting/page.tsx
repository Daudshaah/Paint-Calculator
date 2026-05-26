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
      ? 'https://thepaintcalculator.com/do-i-need-primer-before-painting'
      : `https://thepaintcalculator.com/${locale}/do-i-need-primer-before-painting`;
  return {
    title: 'Do I Need Primer Before Painting? | ThePaintCalculator.com',
    description: 'Find out exactly when you need primer before painting and when you can skip it. Complete primer guide with surface-by-surface breakdown.',
    alternates: { canonical },
    openGraph: {
      title: 'Do I Need Primer Before Painting?',
      description: 'Find out exactly when you need primer before painting and when you can skip it. Complete primer guide with surface-by-surface breakdown.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function DoINeedPrimer({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"Do I Need Primer Before Painting?","item":"https://thepaintcalculator.com/do-i-need-primer-before-painting"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can I paint without primer?","acceptedAnswer":{"@type":"Answer","text":"Yes — when repainting over an existing similar colour on a good surface. For new drywall, stains, bare wood, or major colour changes, primer is essential."}},{"@type":"Question","name":"What happens if I skip primer on new drywall?","acceptedAnswer":{"@type":"Answer","text":"Without primer, paint soaks unevenly into new drywall creating a patchy, dull finish called flashing. You will likely need 3–4 topcoats to cover instead of the standard 2."}},{"@type":"Question","name":"Is paint and primer in one as good as separate primer?","acceptedAnswer":{"@type":"Answer","text":"For simple repaints over similar colours on good surfaces — yes. For stains, new drywall, or dramatic colour changes, a separate dedicated primer is always better."}},{"@type":"Question","name":"What primer blocks water stains?","acceptedAnswer":{"@type":"Answer","text":"Shellac-based primers (Zinsser BIN) are the most effective at blocking water stains, smoke damage, and tannin bleed. Oil-based stain blockers are the next best option."}},{"@type":"Question","name":"Do I need primer when going from light to dark?","acceptedAnswer":{"@type":"Answer","text":"Not always — dark colours cover well and a standard 2-coat topcoat usually works when going from light to dark. Primer helps adhesion but is not required for coverage in this direction."}},{"@type":"Question","name":"How long does primer take to dry?","acceptedAnswer":{"@type":"Answer","text":"Latex primer dries in 1 hour and can be topcoated after 3–4 hours. Shellac-based primer dries in 45 minutes. Oil-based primer needs 8–24 hours before topcoating."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"Do I Need Primer Before Painting?","description":"Complete guide to when you need primer before painting, what type to use, and when you can safely skip it.","url":"https://thepaintcalculator.com/do-i-need-primer-before-painting","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">Do I Need Primer Before Painting?</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Do I Need Primer Before Painting?
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `You need primer when painting <strong>new drywall, covering stains, changing from dark to light</strong>, or painting bare wood or masonry. You can skip primer when repainting over a similar colour on a clean, well-prepared surface using a quality paint-and-primer-in-one.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Yes — for new drywall, stains, and major colour changes</p>
          <p className="text-sm opacity-90">Skip primer only when repainting with a similar colour over a good surface</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When You Must Use Primer</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>New drywall.</strong> Raw drywall is extremely porous. Without primer, topcoat paint soaks in unevenly — creating a patchy finish called "flashing" where some areas look duller than others. Always prime new drywall.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Water stains and smoke damage.</strong> Standard paint will not block water stains or smoke odour — they bleed through within days. Use a shellac-based primer (Zinsser BIN) or oil-based stain blocker before painting.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Dramatic colour changes.</strong> Going from dark to light requires a tinted primer to prevent the dark colour from bleeding through. Ask your paint store to tint the primer to a mid-tone of your new colour.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Bare wood.</strong> Wood absorbs paint unevenly and tannins can bleed through light paint. Use a wood primer or shellac-based primer on bare wood before any topcoat.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Masonry and concrete.</strong> Masonry primer seals porous surfaces, preventing excessive paint absorption and improving adhesion dramatically.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When You Can Skip Primer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">You can skip separate primer when repainting over an existing painted surface with a similar colour, the existing paint is in good condition (no peeling, no stains), and you are using a high-quality paint-and-primer-in-one product. In these situations, the first coat of paint acts as the primer and two topcoats give a professional result.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Budget paints labelled "paint and primer in one" vary in quality — premium brands like Benjamin Moore Aura and Sherwin-Williams Emerald genuinely build enough film in the first coat to act as primer. Cheaper equivalents often do not, and a separate primer may still be needed.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Primer Type by Surface</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Surface</th>
                <th className="px-4 py-3 text-left font-semibold">Primer Type</th>
                <th className="px-4 py-3 text-left font-semibold">Top Pick</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">New drywall</td><td className="px-4 py-3 text-gray-700">Drywall PVA primer</td><td className="px-4 py-3 text-gray-700">Zinsser Drywall Primer</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Water/smoke stains</td><td className="px-4 py-3 text-gray-700">Shellac or oil-based stain block</td><td className="px-4 py-3 text-gray-700">Zinsser BIN</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Bare wood</td><td className="px-4 py-3 text-gray-700">Oil-based wood primer</td><td className="px-4 py-3 text-gray-700">Zinsser Cover Stain</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Masonry/concrete</td><td className="px-4 py-3 text-gray-700">Masonry primer/sealer</td><td className="px-4 py-3 text-gray-700">Behr Masonry Primer</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Dark to light colour</td><td className="px-4 py-3 text-gray-700">Tinted latex primer</td><td className="px-4 py-3 text-gray-700">Any tinted to mid-tone</td></tr>
                <tr className="bg-gray-50"><td className="px-4 py-3 font-medium text-gray-800">Repaint same colour</td><td className="px-4 py-3 text-gray-700">None needed</td><td className="px-4 py-3 text-gray-700">Paint-and-primer-in-one</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Primer Do You Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Primer coverage is typically 350 sq ft per gallon — slightly less than topcoat paint. For an average 12×14 bedroom, one gallon of primer is more than enough for a single primer coat. For a whole house, use the same formula as wall paint — wall area divided by 350 gives gallons of primer needed.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Use the primer calculator above to get an exact estimate for any room size. Always prime before calculating topcoat quantities — primed surfaces absorb topcoat paint less and your topcoat paint goes further.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}/how-many-coats-of-paint`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Coats of Paint Do You Need? →</Link></li>
            <li><Link href={`/${locale}/how-to-calculate-paint-for-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I paint without primer?</h3>
              <p className="text-gray-700">Yes — when repainting over an existing similar colour on a good surface. For new drywall, stains, bare wood, or major colour changes, primer is essential.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens if I skip primer on new drywall?</h3>
              <p className="text-gray-700">Without primer, paint soaks unevenly into new drywall creating a patchy, dull finish called flashing. You will likely need 3–4 topcoats to cover instead of the standard 2.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is paint and primer in one as good as separate primer?</h3>
              <p className="text-gray-700">For simple repaints over similar colours on good surfaces — yes. For stains, new drywall, or dramatic colour changes, a separate dedicated primer is always better.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What primer blocks water stains?</h3>
              <p className="text-gray-700">Shellac-based primers (Zinsser BIN) are the most effective at blocking water stains, smoke damage, and tannin bleed. Oil-based stain blockers are the next best option.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need primer when going from light to dark?</h3>
              <p className="text-gray-700">Not always — dark colours cover well and a standard 2-coat topcoat usually works when going from light to dark. Primer helps adhesion but is not required for coverage in this direction.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does primer take to dry?</h3>
              <p className="text-gray-700">Latex primer dries in 1 hour and can be topcoated after 3–4 hours. Shellac-based primer dries in 45 minutes. Oil-based primer needs 8–24 hours before topcoating.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
