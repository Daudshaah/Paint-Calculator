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
      ? 'https://thepaintcalculator.com/spray-paint-calculator'
      : `https://thepaintcalculator.com/${locale}/spray-paint-calculator`;
  return {
    title: 'Spray Paint Calculator — How Many Cans of Spray Paint Do I Need? | ThePaintCalculator.com',
    description: 'Calculate exactly how many cans of spray paint you need for any project. Free instant results. No signup required.',
    alternates: { canonical },
    openGraph: {
      title: 'Spray Paint Calculator — How Many Cans of Spray Paint Do I Need?',
      description: 'Calculate exactly how many cans of spray paint you need for any project. Free instant results. No signup required.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function SprayPaintCalculator({
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
      { '@type': 'ListItem', position: 2, name: 'Spray Paint Calculator', item: 'https://thepaintcalculator.com/spray-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many cans of spray paint do I need?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12oz can covers 10 to 15 square feet per coat. For two coats on 20 square feet you need 3 to 4 cans. Always buy one extra can for touch-ups and overspray.' },
      },
      {
        '@type': 'Question',
        name: 'How much does a can of spray paint cover?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard 12oz aerosol can covers 10 to 15 square feet per coat. Dark colours cover less — 8 to 10 sq ft. Light colours and primers cover more — up to 15 sq ft per can.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best spray paint brand?',
        acceptedAnswer: { '@type': 'Answer', text: 'Rust-Oleum 2X Ultra Cover for general use, Krylon ColorMaxx for colour range, Montana Cans for professional and art projects, Rust-Oleum Stops Rust for metal surfaces.' },
      },
      {
        '@type': 'Question',
        name: 'How far should you hold spray paint from the surface?',
        acceptedAnswer: { '@type': 'Answer', text: 'Hold the can 10 to 12 inches from the surface. Too close causes drips and runs. Too far causes dry spray and a rough dusty finish.' },
      },
      {
        '@type': 'Question',
        name: 'How long does spray paint take to dry?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most spray paints are dry to touch in 20 to 30 minutes and dry to handle in 1 to 2 hours. Full cure takes 24 hours. Recoat within 1 hour or after 24 hours to avoid lifting.' },
      },
      {
        '@type': 'Question',
        name: 'Can you spray paint over old paint?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes if the old paint is clean, dry, and in good condition. Sand lightly to improve adhesion. If the old paint is peeling or flaking, remove it completely before spray painting.' },
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
            <li className="text-gray-700 font-medium">Spray Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Spray Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            A standard 12oz can of spray paint covers <strong>10 to 15 square feet</strong> per coat. Enter your project dimensions below to find out how many cans you need. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">3 to 4 cans per 10 square feet</p>
          <p className="text-sm opacity-90">Standard 12oz aerosol spray paint — two coats</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your total surface area in square feet. Use the result to calculate cans — divide total square feet by 12 for number of cans needed.
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Many Cans of Spray Paint Do I Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 12oz aerosol spray paint can covers 10 to 15 square feet per coat depending on the brand, colour, and how heavily you spray. Dark colours and metallics typically cover less — around 8 to 10 square feet per can. Light colours and primers cover more — up to 15 square feet per can.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For two coats on a 20 square foot surface, you need 3 to 4 cans. For a small piece of furniture like a chair, allow 2 to 3 cans for two coats. For a full set of dining chairs (4 chairs), allow 8 to 12 cans. Always buy one extra can to account for overspray and touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Large format spray paint cans (20oz to 30oz) used by graffiti artists and muralists cover 25 to 35 square feet per can. HVLP spray guns used for furniture and cabinets use standard gallon paint — see our Cabinet Paint Calculator for those projects.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Spray Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Project</th>
                  <th className="px-4 py-3 text-left font-semibold">Surface Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Cans (1 coat)</th>
                  <th className="px-4 py-3 text-left font-semibold">Cans (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Small item (pot, frame)', '1–2 sq ft', '1 can', '2 cans'],
                  ['Chair', '8–10 sq ft', '1–2 cans', '2–3 cans'],
                  ['4 dining chairs', '32–40 sq ft', '3–4 cans', '6–8 cans'],
                  ['Small table', '15–20 sq ft', '2 cans', '3–4 cans'],
                  ['Bicycle frame', '10–15 sq ft', '1–2 cans', '3–4 cans'],
                  ['Fence panel 6×6ft', '36 sq ft', '3–4 cans', '6–8 cans'],
                ].map(([project, area, one, two], i) => (
                  <tr key={project} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{project}</td>
                    <td className="px-4 py-3 text-gray-700">{area}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Spray Paint Brands</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Rust-Oleum 2X Ultra Cover</strong> is the most popular general purpose spray paint — it covers in one coat, bonds to most surfaces without primer, and is available in over 100 colours. <strong>Krylon ColorMaxx</strong> is a close competitor with excellent fade resistance and a wide colour range. <strong>Montana Cans</strong> is the professional choice for detailed work and art projects with superior colour accuracy and consistency.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For metal surfaces, <strong>Rust-Oleum Stops Rust</strong> provides the best rust prevention and is formulated specifically for bare and rusty metal. For plastic, use <strong>Rust-Oleum Painter's Touch 2X</strong> or <strong>Krylon Fusion</strong> which bond to plastic without a separate primer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Spray Painting</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Shake the can for 2 minutes before use.</strong> Insufficient shaking causes splattering and uneven colour. Shake again every few minutes during use.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Spray in thin even coats.</strong> Hold the can 10 to 12 inches from the surface and keep moving. Multiple thin coats always produce better results than one thick coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Spray in temperatures above 50°F (10°C).</strong> Cold temperatures cause spray paint to crack and bubble. Never spray paint in cold or humid conditions.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clear the nozzle after use.</strong> Turn the can upside down and spray until only clear gas comes out. This prevents the nozzle from clogging for next use.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Always use in a ventilated area.</strong> Spray paint fumes are toxic. Always spray outdoors or in a well-ventilated area and wear a respirator mask.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/cabinet-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Cabinet Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/fence-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Fence Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-cost-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={`/${locale}/exterior-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-coverage-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Coverage Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How many cans of spray paint do I need?', 'A standard 12oz can covers 10 to 15 square feet per coat. For two coats on 20 square feet you need 3 to 4 cans. Always buy one extra can for touch-ups and overspray.'],
              ['How much does a can of spray paint cover?', 'A standard 12oz aerosol can covers 10 to 15 square feet per coat. Dark colours cover less — 8 to 10 sq ft. Light colours and primers cover more — up to 15 sq ft per can.'],
              ['What is the best spray paint brand?', 'Rust-Oleum 2X Ultra Cover for general use, Krylon ColorMaxx for colour range, Montana Cans for professional and art projects, Rust-Oleum Stops Rust for metal surfaces.'],
              ['How far should you hold spray paint from the surface?', 'Hold the can 10 to 12 inches from the surface. Too close causes drips and runs. Too far causes dry spray and a rough dusty finish.'],
              ['How long does spray paint take to dry?', 'Most spray paints are dry to touch in 20 to 30 minutes and dry to handle in 1 to 2 hours. Full cure takes 24 hours. Recoat within 1 hour or after 24 hours to avoid lifting.'],
              ['Can you spray paint over old paint?', 'Yes if the old paint is clean, dry, and in good condition. Sand lightly to improve adhesion. If the old paint is peeling or flaking, remove it completely before spray painting.'],
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
