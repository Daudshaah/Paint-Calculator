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
      ? 'https://thepaintcalculator.com/whole-house-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/whole-house-paint-calculator`;
  return {
    title: 'Whole House Paint Calculator — How Much Paint to Paint a Whole House? | ThePaintCalculator.com',
    description: 'Calculate exactly how much paint you need to paint your entire house interior. Free instant results in gallons or litres. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Whole House Paint Calculator — How Much Paint to Paint a Whole House?',
      description: 'Calculate exactly how much paint you need to paint your entire house. Free instant results in gallons or litres. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function WholeHousePaintCalculator({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Whole House Paint Calculator', item: 'https://thepaintcalculator.com/whole-house-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need to paint a whole house interior?',
        acceptedAnswer: { '@type': 'Answer', text: 'A typical 1,500 square foot home with 3 bedrooms, 2 bathrooms, a kitchen, living room, and hallways needs 15 to 20 gallons for two coats on all walls. A larger 2,500 square foot home needs 25 to 30 gallons. Use the calculator above and add each room separately for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint a whole house interior?',
        acceptedAnswer: { '@type': 'Answer', text: 'A professional crew of two painters can paint a 1,500 square foot home interior in 3 to 4 days. A single DIY painter typically takes 7 to 10 days working weekends. Factor in drying time between coats — at least 4 hours per coat for latex paint.' },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to paint a whole house interior?',
        acceptedAnswer: { '@type': 'Answer', text: 'Professional interior painting costs $3,500 to $7,000 for a 1,500 square foot home including labour and materials. DIY painting costs $300 to $800 in paint and supplies for the same size home. Premium paint brands cost more but last longer and cover better.' },
      },
      {
        '@type': 'Question',
        name: 'Should I use the same paint colour throughout the whole house?',
        acceptedAnswer: { '@type': 'Answer', text: 'Using one neutral colour throughout creates a cohesive open feel and simplifies buying — one large quantity instead of many small ones. Different colours per room creates character and definition. A popular approach is one neutral for common areas and bolder accents in bedrooms.' },
      },
      {
        '@type': 'Question',
        name: 'What order should I paint rooms when painting a whole house?',
        acceptedAnswer: { '@type': 'Answer', text: 'Paint in this order: ceilings first in all rooms, then walls, then trim and doors. Room order should go from the furthest room from the front door working toward the exit — bedrooms first, then bathrooms, then hallways, then kitchen, then living room last.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a 2000 sq ft house interior?',
        acceptedAnswer: { '@type': 'Answer', text: 'A 2,000 square foot home typically needs 18 to 22 gallons for two coats on all interior walls. Add another 4 to 6 gallons if painting ceilings. Add 2 to 3 gallons for trim and doors. Buy paint in bulk 5 gallon buckets for whole house projects to save money.' },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Whole House Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Whole House Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A typical 1,500 sq ft home needs <strong>15 to 20 gallons</strong> for two coats on all interior walls. Add each room separately in the calculator below for a precise whole-house total. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">15 to 20 gallons (57 to 76 litres)</p>
          <p className="text-sm opacity-90">For a typical 1,500 sq ft home — two coats on all interior walls</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Use the <strong>Add Room</strong> button in the calculator to add each room separately — bedroom, bathroom, kitchen, living room, hallway. The calculator totals everything automatically.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Do You Need for a Whole House?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Painting a whole house interior is the largest paint project most homeowners ever undertake. The total paint quantity depends on the number of rooms, ceiling height, and how many surfaces you are painting. A typical 1,500 square foot home with 3 bedrooms, 2 bathrooms, a kitchen, living room, and hallways has approximately 3,000 to 3,500 square feet of paintable wall area across all rooms. At 400 square feet per gallon with two coats, that equals 15 to 17 gallons for walls only.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A larger 2,500 square foot home with 4 bedrooms and open-plan living areas has approximately 5,000 to 5,500 square feet of paintable wall area — requiring 25 to 28 gallons for two coats on walls. If you are also painting ceilings, add 30 to 40% more paint to cover all horizontal surfaces.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The most accurate way to calculate whole house paint is to add each room individually in the calculator above. Enter the dimensions of each room, check the surfaces you are painting, and the calculator totals the paint needed across all rooms automatically.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Whole House Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">House Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Bedrooms</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls Only</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls + Ceilings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['800 sq ft', '1–2 bed', '8–10 gal', '11–14 gal'],
                  ['1,000 sq ft', '2 bed', '10–13 gal', '14–18 gal'],
                  ['1,500 sq ft', '3 bed', '15–18 gal', '20–25 gal'],
                  ['2,000 sq ft', '3–4 bed', '18–22 gal', '25–30 gal'],
                  ['2,500 sq ft', '4 bed', '25–28 gal', '33–38 gal'],
                  ['3,000 sq ft', '4–5 bed', '28–34 gal', '38–46 gal'],
                ].map(([size, beds, walls, wallsCeilings], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{beds}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{wallsCeilings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Save Money Painting a Whole House</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Buying paint in 5-gallon buckets instead of individual gallons saves 15 to 20% on paint costs for whole house projects. Most paint brands offer 5-gallon buckets at a significant discount per gallon compared to single gallons. For a 15 to 20 gallon whole house project, buying four 5-gallon buckets saves $40 to $80 over buying individual gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Using the same colour throughout the entire house is the most cost-effective approach — one large quantity at a bulk discount rather than many small quantities. A single neutral colour like Sherwin-Williams Agreeable Gray or Benjamin Moore Simply White in one 5-gallon bucket covers the entire house and creates a cohesive unified look.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Colours for a Whole House</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When painting a whole house in one colour, warm neutrals are the safest and most universally appealing choice. They work with any furniture style, look good in both natural and artificial light, and appeal to the widest range of buyers if you are painting before selling.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams Agreeable Gray (SW 7029)</strong> is the most popular whole-house colour in the US — a warm greige that flatters every room. <strong>Benjamin Moore Pale Oak (OC-20)</strong> is a warm beige with pink undertones that looks sophisticated throughout an entire home. <strong>Sherwin-Williams Accessible Beige (SW 7036)</strong> is slightly warmer than Agreeable Gray and works beautifully in homes with warm wood floors and furniture.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a whole house white, <strong>Benjamin Moore White Dove (OC-17)</strong> and <strong>Sherwin-Williams Alabaster (SW 7008)</strong> are the two most popular choices — both warm whites that avoid the clinical coldness of pure bright white.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Order to Paint Rooms When Painting a Whole House</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Paint rooms in this order to minimise disruption and maximise efficiency. Start with the rooms furthest from the front door and work toward the exit so you never paint yourself into a corner. Bedrooms and bathrooms first, then hallways, then kitchen, then living and dining rooms last.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Within each room, always paint in this order: ceiling first, then walls, then trim and doors last. This way any ceiling drips get covered by wall paint, and any wall paint on trim gets cleaned up when you paint the trim.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Whole House</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy all paint at once.</strong> Paint colour can vary between batches — known as lot variation. Buy all your paint in a single purchase to ensure consistent colour throughout the house.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Box your paint.</strong> Pour all cans of the same colour into a large bucket and mix together before painting. This eliminates any subtle colour differences between cans.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use the same finish throughout common areas.</strong> Use eggshell or satin for all common areas — living room, hallways, dining room. Use semi-gloss for bathrooms and kitchen. This simplifies buying and creates visual consistency.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Label each room's paint.</strong> Keep a small labelled sample jar from each room's paint for future touch-ups. Touch-up paint that is stored correctly lasts 5 to 10 years.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Rent a paint sprayer for large projects.</strong> A paint sprayer covers whole house interiors significantly faster than rolling. Rent one for the day for around $60 to $80 — the time saved on a whole house project is worth it.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/kitchen-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/primer-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need to paint a whole house interior?', 'A typical 1,500 sq ft home needs 15 to 20 gallons for two coats on all walls. A larger 2,500 sq ft home needs 25 to 30 gallons. Use the calculator above and add each room separately for a precise total.'],
              ['How long does it take to paint a whole house interior?', 'A professional crew of two takes 3 to 4 days for a 1,500 sq ft home. A single DIY painter takes 7 to 10 days working weekends. Factor in at least 4 hours drying time between coats.'],
              ['How much does it cost to paint a whole house interior?', 'Professional painting costs $3,500 to $7,000 for a 1,500 sq ft home including labour and materials. DIY costs $300 to $800 in paint and supplies for the same size home.'],
              ['Should I use the same colour throughout the whole house?', 'One neutral throughout creates a cohesive open feel and simplifies buying. Different colours per room creates character. A popular approach is one neutral for common areas and bolder accents in bedrooms.'],
              ['What order should I paint rooms in a whole house?', 'Bedrooms and bathrooms first, then hallways, then kitchen, then living and dining rooms last. Within each room: ceiling first, then walls, then trim and doors.'],
              ['How many gallons for a 2000 sq ft house interior?', 'A 2,000 sq ft home needs 18 to 22 gallons for two coats on all interior walls. Add 4 to 6 gallons for ceilings and 2 to 3 gallons for trim and doors. Buy in 5-gallon buckets to save money.'],
            ].map(([q, a]) => (
              <div key={q}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-700">{a}</p>
              </div>
            ))}
          </div>

        </article>
      </div>
    </main>
  );
}