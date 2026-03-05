'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';

const LIVING_ROOM_STATE = {
  activeTab: 'interior',
  unit: 'imperial',
  paintDetails: {
    coats: 2,
    paintType: 'latex',
    finish: 'eggshell',
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
      id: 'room_livingroom_prefill',
      measurements: {
        name: 'Living Room',
        mode: 'dimensions',
        length: '16',
        width: '14',
        height: '9',
        directWallArea: '',
        directCeilingArea: '',
        directPerimeter: '',
        doors: [
          { id: 'door_livingroom_1', size: 'standard', quantity: 1, customWidth: '', customHeight: '' },
        ],
        windows: [
          { id: 'window_livingroom_1', size: 'large', quantity: 2, customWidth: '', customHeight: '' },
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
  const json = JSON.stringify(LIVING_ROOM_STATE);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default function LivingRoomPaintCalculator() {
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
      { '@type': 'ListItem', position: 2, name: 'Living Room Paint Calculator', item: 'https://thepaintcalculator.com/living-room-paint-calculator' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much paint do I need for a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most living rooms need 2 to 3 gallons of paint for two coats on the walls. A standard 16x14 living room with 9ft ceilings needs about 2.3 gallons after deducting doors and windows. Use the calculator above for a precise estimate.' },
      },
      {
        '@type': 'Question',
        name: 'What paint finish is best for a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'Eggshell is the best finish for living rooms. It has a soft low-sheen look that hides wall imperfections, is washable, and holds up to everyday use. Satin is a good alternative if you want a slightly more durable finish.' },
      },
      {
        '@type': 'Question',
        name: 'How many gallons of paint for a large living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A large living room measuring 18x20 or bigger needs 3 to 4 gallons for two coats on the walls. If you are also painting the ceiling add another 1 to 1.5 gallons. Use the calculator above and enter your exact dimensions.' },
      },
      {
        '@type': 'Question',
        name: 'How many litres of paint for a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard living room needs 8 to 11 litres of paint for two coats on the walls. Buy a 10 litre tin or two 5 litre tins for most living rooms. A large living room may need 12 to 15 litres.' },
      },
      {
        '@type': 'Question',
        name: 'Should I paint the living room ceiling the same colour as walls?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most living rooms have white or off-white ceilings which create contrast with the wall colour and make the room feel taller. Painting ceiling and walls the same colour works well in living rooms with high ceilings and creates a cocooning effect.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to paint a living room?',
        acceptedAnswer: { '@type': 'Answer', text: 'A standard living room takes 6 to 8 hours to paint with two coats including prep and drying time between coats. A large living room may take a full day. Move all furniture to the centre and cover before starting.' },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Living Room Paint Calculator — How Much Paint for a Living Room?',
    description: 'Calculate exactly how much paint you need for your living room. Pre-filled for a standard 16x14 living room with finish recommendations and colour ideas for 2026.',
    url: 'https://thepaintcalculator.com/living-room-paint-calculator',
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
            <li className="text-gray-700 font-medium">Living Room Paint Calculator</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Living Room Paint Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Most living rooms need <strong>2 to 3 gallons</strong> (8 to 11 litres) of paint for two coats on the walls. Our calculator is pre-filled for a standard 16x14 living room with 9ft ceilings — adjust the dimensions to match your room for an exact result. Free, no signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">2 to 3 gallons (8 to 11 litres)</p>
          <p className="text-sm opacity-90">For a standard 16x14 living room with 9ft ceilings — two coats on walls</p>
        </div>

        {ready && <PaintCalculatorClient locale={"en" as any} />}

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Living Room Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Living rooms are typically the largest room in a home, which means they need more paint than bedrooms or bathrooms. A standard 16x14 living room has approximately 540 square feet of gross wall area with 9ft ceilings. After deducting one door and two large windows, the paintable area is around 460 square feet. At 400 square feet per gallon with two coats, that equals about 2.3 gallons.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most homeowners buy 3 gallons for a standard living room — giving enough for two full coats plus extra for touch-ups. An open-plan living and dining room measuring 20x18 or larger will need 4 to 5 gallons for two coats. Use the calculator above and enter your exact dimensions for a precise estimate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In litres, a standard living room needs 8 to 11 litres for two coats. Two 5 litre tins is the standard purchase for most living rooms. A large open-plan space may need three 5 litre tins.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Living Room Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Living Room Size</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['12x14 (small)', '1.1 gal', '2.2 gal', '~8 litres'],
                  ['14x16 (medium)', '1.3 gal', '2.6 gal', '~10 litres'],
                  ['16x14 (standard)', '1.2 gal', '2.4 gal', '~9 litres'],
                  ['18x16 (large)', '1.6 gal', '3.2 gal', '~12 litres'],
                  ['20x18 (open plan)', '2.0 gal', '4.0 gal', '~15 litres'],
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

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Finish for a Living Room</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Eggshell is the most popular finish for living rooms. It has a soft low-sheen appearance that looks elegant, hides minor wall imperfections, and is washable for everyday family life. Most interior designers specify eggshell as the default for living room walls.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Satin is a good alternative if your living room gets heavy use or has children and pets. It is slightly more durable and easier to wipe clean than eggshell. Avoid flat paint in living rooms unless you have perfectly smooth walls — flat paint marks easily and cannot be scrubbed.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Colours for a Living Room in 2026</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Living room colour trends in 2026 lean toward warm earthy tones, soft greens, and deep moody blues. Warm neutrals remain the most popular choice because they work with any furniture style and feel welcoming in the most-used room in the home.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams Agreeable Gray (SW 7029)</strong> remains the most popular living room colour in the US — a warm greige that works with wood, white, and coloured furniture. <strong>Benjamin Moore Pale Oak (OC-20)</strong> is a warm beige with pink undertones that feels sophisticated and pairs well with natural materials. <strong>Farrow & Ball Mizzle (No.266)</strong> is a muted sage green that brings the outdoors in and suits both modern and traditional living rooms.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For accent walls, deep tones like <strong>Sherwin-Williams Cyberspace (SW 7076)</strong> — a near-black navy — and <strong>Benjamin Moore Black Forest Green (2047-10)</strong> are trending as bold statement colours behind sofas and media walls.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Living Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Move all furniture to the centre first.</strong> Cover with drop cloths and tape edges. Living rooms have the most furniture of any room — plan at least 30 minutes for prep before opening any paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Paint an accent wall first.</strong> If you are doing an accent wall in a different colour, paint it first and let it dry fully before cutting in the adjacent wall colours. This prevents bleed and makes clean lines easier.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Use a 9-inch roller with half-inch nap.</strong> Living rooms have large flat walls where a wide roller saves significant time. A half-inch nap handles most standard wall textures.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Cut in before rolling.</strong> Use a 2.5-inch angled brush to cut in all edges, corners, and around trim before rolling the main wall areas. Do one wall at a time to keep a wet edge.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Check colour in natural and artificial light.</strong> Living rooms are used in both daylight and evening light. Always test a large patch and check it at different times of day before committing to the full room.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href="/en/bedroom-paint-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href="/en/kitchen-paint-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Kitchen Paint Calculator →</Link></li>
            <li><Link href="/en/bathroom-paint-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href="/en/how-much-paint-for-12x14-room" className="text-blue-600 hover:text-blue-700 font-medium">How Much Paint for a 12x14 Room →</Link></li>
            <li><Link href="/en/primer-calculator" className="text-blue-600 hover:text-blue-700 font-medium">Primer Calculator →</Link></li>
            <li><Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              ['How much paint do I need for a living room?', 'Most living rooms need 2 to 3 gallons for two coats on the walls. A standard 16x14 living room needs about 2.3 gallons. Use the calculator above and enter your exact dimensions for a precise estimate.'],
              ['What paint finish is best for a living room?', 'Eggshell is the best finish for most living rooms. It looks elegant, hides wall imperfections, and is washable. Satin is a good alternative for high-traffic living rooms with children or pets.'],
              ['How many gallons for a large living room?', 'A large living room measuring 18x20 or bigger needs 3 to 4 gallons for two coats on the walls. Add another 1 to 1.5 gallons if you are also painting the ceiling.'],
              ['How many litres of paint for a living room?', 'A standard living room needs 8 to 11 litres for two coats. Two 5 litre tins covers most living rooms. A large open-plan space may need three 5 litre tins.'],
              ['Should I paint the living room ceiling the same colour as walls?', 'Most living rooms have white or off-white ceilings which create contrast and make the room feel taller. Matching ceiling and walls works well in rooms with very high ceilings and creates a cocooning effect.'],
              ['How long does it take to paint a living room?', 'A standard living room takes 6 to 8 hours to paint with two coats including prep and drying time. A large living room may take a full day. Move all furniture to the centre before starting.'],
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
