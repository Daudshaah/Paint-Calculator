'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';

const BATHROOM_STATE = {
  activeTab: 'interior',
  unit: 'imperial',
  paintDetails: {
    coats: 2,
    paintType: 'latex',
    finish: 'semigloss',
    wallCondition: 'good',
    usePrimer: false,
    primerCoats: 1,
    paintCoverageRate: 400,
    primerCoverageRate: 350,
  },
  costDetails: {
    paintPrice: 35,
    primerPrice: 25,
    calculateLabor: false,
    laborRate: 50,
    includeMaterials: true,
    brushRoller: 25,
    tape: 10,
    dropCloths: 15,
    other: 0,
  },
  rooms: [
    {
      id: 'room_bathroom_prefill',
      measurements: {
        name: 'Bathroom',
        mode: 'dimensions',
        length: '8',
        width: '6',
        height: '8',
        directWallArea: '',
        directCeilingArea: '',
        directPerimeter: '',
        doors: [
          { id: 'door_bathroom_1', size: 'standard', quantity: 1, customWidth: '', customHeight: '' },
        ],
        windows: [
          { id: 'window_bathroom_1', size: 'small', quantity: 1, customWidth: '', customHeight: '' },
        ],
      },
      surfaces: { walls: true, ceiling: false, trim: false, doors: false },
      extras: {
        accentWall: false,
        accentWallArea: '',
        wainscoting: false,
        wainscotingHeight: 36,
        crownMolding: false,
        builtIns: false,
        builtInsArea: '',
        fireplace: false,
        fireplaceArea: '',
      },
    },
  ],
};

function getEncodedState() {
  const json = JSON.stringify(BATHROOM_STATE);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default function BathroomPaintCalculator() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (!url.searchParams.get('p')) {
        url.searchParams.set('p', getEncodedState());
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {}
    setReady(true);
  }, []);

  const locale = 'en';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Bathroom Paint Calculator', item: 'https://thepaintcalculator.com/bathroom-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most bathrooms need 1 to 1.5 gallons of paint for two coats on the walls. A standard 8x6 bathroom with 8ft ceilings needs about 0.9 gallons. A larger master bathroom may need 2 gallons.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Semi-gloss is the best finish for bathrooms. It resists moisture and humidity, is highly washable, and holds up to steam from showers and baths.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need special paint for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes — use a paint labelled for bathrooms or kitchens, or any paint with mildew resistance. Look for paints with built-in mildewcide on the label.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a bathroom?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard bathroom needs 3 to 5 litres for two coats on the walls. A small bathroom can be done with a single 2.5 litre tin. A larger bathroom needs a 5 litre tin.' },
      },
      {
        '@type': 'Question',
        name: 'How long does bathroom paint take to dry?',
        acceptedAnswer: { '@type': 'Answer', text: 'Bathroom paint feels dry to touch in 1 to 2 hours. Wait at least 4 hours before applying a second coat. Allow 24 to 48 hours before using the shower to let the paint fully cure.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint the bathroom ceiling the same colour as walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'In small bathrooms, painting ceiling and walls the same colour makes the room feel larger. In larger bathrooms, white ceilings are more common. Always use moisture-resistant paint on bathroom ceilings.' },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Bathroom Paint Calculator — How Much Paint for a Bathroom?',
    description: 'Complete guide to calculating how much paint you need for any bathroom size including gallons, litres, finish recommendations and moisture-resistant paint advice.',
    url: 'https://thepaintcalculator.com/bathroom-paint-calculator',
    publisher: { '@type': 'Organization', name: 'ThePaintCalculator.com', url: 'https://thepaintcalculator.com' },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Bathroom Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bathroom Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Most bathrooms need <strong>1 to 1.5 gallons</strong> (3 to 5 litres) of paint for two coats on the walls. Our calculator is pre-filled for a standard 8x6 bathroom — adjust the dimensions to match your room for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1 to 1.5 gallons (3 to 5 litres)</p>
          <p className="text-sm opacity-90">For a standard 8x6 bathroom with 8ft ceilings — two coats on walls</p>
        </div>

        {ready && <PaintCalculatorClient locale={locale as any} />}

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Bathroom Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bathrooms are the smallest rooms in most homes, which means they need less paint than any other room. A standard 8x6 bathroom has approximately 210 square feet of wall area before deducting one door and one small window. After deductions the paintable wall area is around 175 square feet. At 400 square feet per gallon with two coats, that equals about 0.9 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most homeowners buy a single quart for very small bathrooms and 1 gallon for standard bathrooms. A large master bathroom measuring 10x12 or bigger will need 1.5 to 2 gallons for two coats. Use the calculator above and enter your exact dimensions for a precise estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard bathroom needs 3 to 5 litres for two coats. A single 2.5 litre tin is enough for most small bathrooms. A larger bathroom needs a 5 litre tin.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bathroom Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Bathroom Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['5x7 (small)', '0.35 gal', '0.7 gal', '~2.5 litres'],
                  ['8x6 (standard)', '0.45 gal', '0.9 gal', '~3.5 litres'],
                  ['8x10 (medium)', '0.6 gal', '1.2 gal', '~4.5 litres'],
                  ['10x12 (large)', '0.8 gal', '1.6 gal', '~6 litres'],
                  ['12x14 (master bath)', '0.9 gal', '1.8 gal', '~7 litres'],
                ].map(([size, one, two, litres], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                    <td className="px-4 py-3 text-gray-700">{litres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Bathroom</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Semi-gloss is the best finish for bathrooms. It resists moisture and humidity, wipes clean easily, and holds up to years of steam from showers and baths. Most professional painters use semi-gloss on all bathroom walls as standard practice.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is an acceptable alternative if you prefer a lower sheen. Avoid flat or eggshell finishes in bathrooms — they absorb moisture, grow mildew, and peel within a year in high-humidity conditions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Moisture-Resistant Bathroom Paints</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always look for paints labelled as bathroom paint, kitchen and bath paint, or paints with built-in mildewcide. <strong>Zinsser Perma-White</strong> is the top choice for problem bathrooms — guaranteed against mould for 5 years. <strong>Behr Premium Plus Kitchen & Bath</strong> at around $34 per gallon is a reliable mid-range option. <strong>Sherwin-Williams Emerald Bath</strong> at around $92 per gallon is the premium long-lasting choice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Bathroom</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Ventilate during and after painting.</strong> Run the exhaust fan during painting and for 24 hours after. Good ventilation is critical for paint adhesion in humid bathrooms.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean walls thoroughly first.</strong> Wipe down with TSP cleaner or sugar soap. Paint will not adhere properly to soap scum or mildew.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use semi-gloss — not eggshell.</strong> The most common bathroom painting mistake. Eggshell looks fine initially but peels within 12 months in a shower bathroom.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Caulk before painting.</strong> Re-caulk around the bath, shower, and sink before painting. Fresh paint over cracked caulk looks immediately unfinished.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Wait 48 hours before using the shower.</strong> Paint feels dry in 2 hours but needs 48 hours to fully cure before steam exposure.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href="/en/bedroom-paint-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href="/en/how-much-paint-for-12x12-room" className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href="/en/primer-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href="/en/how-much-paint-for-12x14-room" className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room →</Link></li>
            <li><Link href="/en/how-much-paint-for-10x10-room" className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 10x10 Room →</Link></li>
            <li><Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a bathroom?', 'Most bathrooms need 1 to 1.5 gallons for two coats on the walls. A standard 8x6 bathroom needs about 0.9 gallons. Use the calculator above and enter your exact dimensions for a precise estimate.'],
              ['What paint finish is best for a bathroom?', 'Semi-gloss is the best finish for bathrooms. It resists moisture and humidity, wipes clean easily, and prevents mildew growth. Avoid flat or eggshell finishes — they peel in high-humidity bathrooms.'],
              ['Do I need special bathroom paint?', 'Yes — use a paint labelled for bathrooms or kitchens, or any paint with built-in mildewcide. Zinsser Perma-White, Behr Kitchen & Bath, and Sherwin-Williams Emerald Bath are all good choices.'],
              ['How many litres of paint for a bathroom?', 'A standard bathroom needs 3 to 5 litres for two coats. A small bathroom can be done with a 2.5 litre tin. A larger bathroom needs a 5 litre tin.'],
              ['How long does bathroom paint take to dry?', 'Bathroom paint feels dry in 1 to 2 hours. Wait 4 hours before a second coat. Wait 24 to 48 hours before using the shower to allow the paint to fully cure.'],
              ['Should I paint the bathroom ceiling the same colour as the walls?', 'In small bathrooms, matching ceiling and walls makes the space feel larger. In larger bathrooms a white ceiling is more common. Always use moisture-resistant paint on bathroom ceilings.'],
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
