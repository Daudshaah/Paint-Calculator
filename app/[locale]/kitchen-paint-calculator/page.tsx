'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';

const KITCHEN_STATE = {
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
      id: 'room_kitchen_prefill',
      measurements: {
        name: 'Kitchen',
        mode: 'dimensions',
        length: '12',
        width: '10',
        height: '9',
        directWallArea: '',
        directCeilingArea: '',
        directPerimeter: '',
        doors: [
          { id: 'door_kitchen_1', size: 'standard', quantity: 1, customWidth: '', customHeight: '' },
        ],
        windows: [
          { id: 'window_kitchen_1', size: 'medium', quantity: 2, customWidth: '', customHeight: '' },
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
  const json = JSON.stringify(KITCHEN_STATE);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default function KitchenPaintCalculator() {
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Kitchen Paint Calculator', item: 'https://thepaintcalculator.com/kitchen-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a kitchen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most kitchens need 1.5 to 2 gallons of paint for two coats on the walls. A standard 12x10 kitchen with 9ft ceilings needs about 1.5 gallons after deducting cabinets and windows. Use the calculator above for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a kitchen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Semi-gloss is the best finish for kitchens. It resists grease and moisture, wipes clean easily, and holds up to the humidity from cooking. Satin is a good alternative if you prefer a less shiny look.' },
      },
      {
        '@type': 'Question',
        name: 'Do I need special paint for a kitchen?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use a paint labelled for kitchens and baths, or any paint with a semi-gloss or satin finish and mildew resistance. These paints resist grease splatter and steam better than standard interior paint.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a kitchen?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard kitchen needs 5 to 7 litres of paint for two coats on the walls. Buy a 5 litre tin as your base and a 2.5 litre tin for touch-ups and a second coat if needed.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint kitchen cabinets the same colour as the walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Painting cabinets and walls the same colour creates a seamless monochromatic look that feels modern and spacious. However most homeowners prefer contrast — white or light cabinets against a mid-tone wall colour is the most popular kitchen combination.' },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate kitchen wall area with cabinets?',
        acceptedAnswer: { '@type': 'Answer', text: 'Enter your kitchen dimensions in the calculator above. Then subtract the cabinet areas by using the built-ins exclusion option in the Special Situations section. Alternatively add 10% less paint than the calculator suggests to account for upper cabinets covering wall area.' },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Kitchen Paint Calculator — How Much Paint for a Kitchen?',
    description: 'Calculate exactly how much paint you need for your kitchen walls. Pre-filled for a standard 12x10 kitchen with advice on finish, colour, and moisture-resistant paints.',
    url: 'https://thepaintcalculator.com/kitchen-paint-calculator',
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
            <li className="text-gray-700 font-medium">Kitchen Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Kitchen Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Most kitchens need <strong>1.5 to 2 gallons</strong> (5 to 7 litres) of paint for two coats on the walls. Our calculator is pre-filled for a standard 12x10 kitchen with 9ft ceilings — adjust the dimensions to match your kitchen for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">1.5 to 2 gallons (5 to 7 litres)</p>
          <p className="text-sm opacity-90">For a standard 12x10 kitchen with 9ft ceilings — two coats on walls</p>
        </div>

        {ready && <PaintCalculatorClient locale="en" as any />}

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Kitchen Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kitchens are more complex to paint than other rooms because cabinets, appliances, and backsplash tiles cover a significant portion of the wall area. A standard 12x10 kitchen has approximately 352 square feet of gross wall area with 9ft ceilings. After deducting one door, two windows, and upper cabinet coverage, the paintable area is typically around 250 to 280 square feet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            At 400 square feet per gallon with two coats, a standard kitchen needs about 1.4 to 1.5 gallons. Most homeowners buy 2 gallons to ensure full coverage and have extra for touch-ups. A large open-plan kitchen measuring 14x16 or bigger will need 2.5 to 3 gallons for two coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard kitchen needs 5 to 7 litres for two coats. A 5 litre tin is the standard purchase for most kitchens. Buy an additional 2.5 litre tin if your kitchen is larger than 12x14 or has very high ceilings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Kitchen Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Kitchen Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['8x10 (small)', '0.7 gal', '1.4 gal', '~5 litres'],
                  ['10x12 (medium)', '0.85 gal', '1.7 gal', '~6.5 litres'],
                  ['12x10 (standard)', '0.9 gal', '1.8 gal', '~7 litres'],
                  ['12x14 (large)', '1.1 gal', '2.2 gal', '~8 litres'],
                  ['14x16 (open plan)', '1.4 gal', '2.8 gal', '~10.5 litres'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Kitchen</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Semi-gloss is the best finish for kitchen walls. Kitchens generate grease, steam, and splatter daily — semi-gloss wipes clean without damaging the paint film. It also reflects more light which makes kitchens feel brighter and larger.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is a popular alternative for homeowners who find semi-gloss too shiny. It is more forgiving on wall imperfections while still being washable and grease resistant. Avoid eggshell or flat finishes on kitchen walls — they cannot handle the scrubbing that kitchen walls require.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Colours for a Kitchen in 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            White and off-white remain the most popular kitchen wall colours because they pair well with any cabinet colour and make small kitchens feel open and bright. Warm whites with yellow or beige undertones work better than cool bright whites in most kitchens.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Benjamin Moore Simply White (OC-117)</strong> is the most popular kitchen white — warm, clean, and pairs perfectly with both white and wood cabinets. <strong>Sherwin-Williams Accessible Beige (SW 7036)</strong> is a warm greige that works well in kitchens that get strong afternoon light. <strong>Behr Pale Yellow (330C-2)</strong> brings warmth and energy to north-facing kitchens that lack natural light.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For bolder kitchens, deep navy, forest green, and terracotta are trending in 2026. These work best on a single feature wall or lower cabinets while keeping upper walls and ceiling light.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Kitchen</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Degrease walls before painting.</strong> Kitchen walls accumulate invisible grease from cooking. Wipe every wall with TSP cleaner or sugar soap before painting. Paint applied over grease will peel within months.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Remove cabinet doors for easy painting.</strong> Painting behind hinges and around cabinet frames is tedious. Removing doors takes 20 minutes and makes the job significantly cleaner and faster.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use semi-gloss — not satin — near the stove.</strong> The area within 3 feet of the stove should always be semi-gloss due to heavy grease and heat exposure. You can use satin on other walls if preferred.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Tape appliances carefully.</strong> Refrigerators, dishwashers, and stoves are easy to splash. Cover them with drop cloths and tape the edges before rolling walls.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Buy 10% extra for kitchens.</strong> Kitchens have awkward angles around cabinets and appliances that cause more waste than standard rooms. Buy one extra quart beyond your calculator estimate.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href="/en/bathroom-paint-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href="/en/bedroom-paint-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href="/en/how-much-paint-for-12x12-room" className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x12 Room →</Link></li>
            <li><Link href="/en/primer-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href="/en/how-much-paint-for-12x14-room" className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room →</Link></li>
            <li><Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a kitchen?', 'Most kitchens need 1.5 to 2 gallons for two coats on the walls. A standard 12x10 kitchen needs about 1.5 gallons after deducting cabinets and windows. Use the calculator above for a precise estimate.'],
              ['What paint finish is best for a kitchen?', 'Semi-gloss is the best finish for kitchens. It resists grease and moisture, wipes clean easily, and holds up to steam from cooking. Satin is a good alternative if you prefer a lower sheen.'],
              ['Do I need special paint for a kitchen?', 'Use a paint labelled for kitchens and baths, or any semi-gloss or satin paint with mildew resistance. These resist grease splatter and steam better than standard interior paint.'],
              ['How many litres of paint for a kitchen?', 'A standard kitchen needs 5 to 7 litres for two coats. A 5 litre tin covers most kitchens. Buy an additional 2.5 litre tin for larger kitchens or high ceilings.'],
              ['Should I paint kitchen cabinets the same colour as walls?', 'Matching cabinets and walls creates a modern seamless look. However most homeowners prefer contrast — white or light cabinets against a mid-tone wall colour is the most popular kitchen combination.'],
              ['How do I calculate kitchen wall area with cabinets?', 'Enter your kitchen dimensions in the calculator above. Use the built-ins exclusion in Special Situations to subtract cabinet areas. Alternatively reduce your estimate by 15 to 20% to account for upper cabinet coverage.'],
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