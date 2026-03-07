const fs = require('fs');
const path = require('path');

// ─── Safety check ───────────────────────────────────────────────────────────
const cwd = process.cwd();
if (!fs.existsSync(path.join(cwd, 'app', '[locale]'))) {
  console.error('❌  Run this script from your project root (where app/[locale] exists).');
  console.error('   cd to your paintcalculator folder first, then run: node generate-pages.js');
  process.exit(1);
}

// ─── Page definitions ────────────────────────────────────────────────────────
const pages = [

  // ── 1. Deck Paint Calculator ───────────────────────────────────────────────
  {
    slug: 'deck-paint-calculator',
    component: 'DeckPaintCalculator',
    title: 'Deck Paint Calculator — How Much Paint for a Deck?',
    metaDesc: 'Calculate exactly how much paint or stain you need for your deck. Free instant results in gallons or litres. No signup required.',
    h1: 'Deck Paint Calculator',
    quickAnswer: '2 to 3 gallons for a standard deck',
    quickSub: 'For a 12×16 deck — two coats including railings',
    intro: 'A standard 12×16 deck needs <strong>2 to 3 gallons</strong> of deck paint for two coats. Enter your deck dimensions below for an exact result. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your deck square footage. Multiply length × width then add 20% for railings and stairs.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Deck Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Deck paint coverage depends on the wood species, condition, and porosity of the boards. Rough weathered deck boards absorb significantly more paint than new smooth boards. As a general rule, use 150 to 200 square feet per gallon as your coverage estimate for most deck painting projects.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 12×16 deck has 192 square feet of floor area. At 150 square feet per gallon, that is 1.3 gallons per coat. For two coats you need 2.6 gallons — buy 3 gallons. Add railings and stairs and the total is typically 3.5 to 4 gallons for a complete deck including two coats on all surfaces.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            New or bare wood absorbs significantly more paint on the first coat. If painting a bare deck for the first time, buy 30% more than calculated. The first coat soaks in heavily and provides less surface coverage than subsequent coats.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Deck Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Deck Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Sq Footage</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats + Railings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['10×10', '100 sq ft', '0.7 gal', '1.5 gal'],
                  ['12×16', '192 sq ft', '1.3 gal', '3.0 gal'],
                  ['16×16', '256 sq ft', '1.7 gal', '4.0 gal'],
                  ['16×20', '320 sq ft', '2.1 gal', '5.0 gal'],
                  ['20×20', '400 sq ft', '2.7 gal', '6.5 gal'],
                  ['20×24', '480 sq ft', '3.2 gal', '7.5 gal'],
                ].map(([size, sqft, one, two], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{sqft}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Deck Paint Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Behr Premium Deck Over</strong> is the most popular deck paint in the US — a thick coating that fills cracks up to ¼ inch and resurfaces weathered decks. <strong>Rust-Oleum Deck and Concrete Restore</strong> is a similar resurfacing product that adds texture for slip resistance. For a thinner traditional deck paint, <strong>Sherwin-Williams SuperDeck Exterior Deck and Dock Coating</strong> is a reliable mid-range option.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always use a paint specifically formulated for decks rather than standard exterior house paint. Deck paint contains additives for slip resistance, flexibility under foot traffic, and resistance to moisture from rain and snow. Standard exterior paint will crack and peel quickly under the stress of regular foot traffic.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Deck Paint Colours</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Grey and greige tones dominate deck colour trends in 2026. <strong>Behr Silver Strand</strong>, <strong>Sherwin-Williams Flagstone</strong>, and <strong>Benjamin Moore Rockport Gray</strong> are the most popular neutral deck colours. These colours complement most house exterior colours and blend naturally with landscaping.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For a warmer look, medium brown tones like <strong>Behr Log Cabin</strong> and <strong>Sherwin-Williams Kaffee</strong> are popular choices that mimic the natural look of stained wood. White and light grey decks are popular on coastal homes and modern exterior designs.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Deck</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean and dry thoroughly first.</strong> Pressure wash the deck and let it dry for 48 hours minimum before painting. Any moisture trapped under paint causes rapid peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Sand or scrape all peeling areas.</strong> New paint will not bond over old peeling paint. Scrape all loose paint and sand edges smooth before applying a fresh coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prime bare or repaired areas.</strong> Spot prime any bare wood, filled holes, or replaced boards before applying the full deck paint coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint with the grain.</strong> Apply deck paint along the length of the boards rather than across them. This gives the most even finish and gets paint into the gaps between boards.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Allow full cure before use.</strong> Most deck paints require 24 to 48 hours drying time before light foot traffic and 72 hours before furniture is placed back on the deck.</p>`,
    relatedLinks: [
      { href: 'deck-stain-calculator', label: 'Deck Stain Calculator' },
      { href: 'fence-paint-calculator', label: 'Fence Paint Calculator' },
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'primer-calculator', label: 'Primer Calculator' },
    ],
    faqs: [
      ['How much paint do I need for a deck?', 'A standard 12×16 deck needs 1.3 gallons per coat. For two coats plus railings and stairs buy 3 to 4 gallons. Add 30% extra for bare or weathered wood.'],
      ['How many gallons of paint for a deck?', 'A 12×16 deck needs 2 to 3 gallons for two coats. A 16×20 deck needs 4 to 5 gallons. A 20×24 deck needs 6 to 8 gallons including railings.'],
      ['What is the best paint for a deck?', 'Behr Premium Deck Over, Rust-Oleum Deck and Concrete Restore, and Sherwin-Williams SuperDeck are the top choices. Always use paint formulated specifically for decks.'],
      ['How long does deck paint last?', 'Quality deck paint lasts 3 to 5 years with proper prep. Deck resurfacing products like Behr Deck Over last 4 to 6 years. High traffic areas may show wear sooner.'],
      ['Should I paint or stain my deck?', 'Paint provides an opaque colour and hides imperfections. Stain shows the wood grain and is easier to reapply. For weathered or damaged decks, paint or a resurfacing product is the better choice.'],
      ['How do I prepare a deck for painting?', 'Pressure wash, let dry 48 hours, scrape all peeling paint, sand rough areas, spot prime bare wood, then apply deck paint on a dry day between 50 and 90 degrees Fahrenheit.'],
    ],
  },

  // ── 2. Spray Paint Calculator ──────────────────────────────────────────────
  {
    slug: 'spray-paint-calculator',
    component: 'SprayPaintCalculator',
    title: 'Spray Paint Calculator — How Many Cans of Spray Paint Do I Need?',
    metaDesc: 'Calculate exactly how many cans of spray paint you need for any project. Free instant results. No signup required.',
    h1: 'Spray Paint Calculator',
    quickAnswer: '3 to 4 cans per 10 square feet',
    quickSub: 'Standard 12oz aerosol spray paint — two coats',
    intro: 'A standard 12oz can of spray paint covers <strong>10 to 15 square feet</strong> per coat. Enter your project dimensions below to find out how many cans you need. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your total surface area in square feet. Use the result to calculate cans — divide total square feet by 12 for number of cans needed.',
    body: `
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
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Always use in a ventilated area.</strong> Spray paint fumes are toxic. Always spray outdoors or in a well-ventilated area and wear a respirator mask.</p>`,
    relatedLinks: [
      { href: 'cabinet-paint-calculator', label: 'Cabinet Paint Calculator' },
      { href: 'fence-paint-calculator', label: 'Fence Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
    ],
    faqs: [
      ['How many cans of spray paint do I need?', 'A standard 12oz can covers 10 to 15 square feet per coat. For two coats on 20 square feet you need 3 to 4 cans. Always buy one extra can for touch-ups and overspray.'],
      ['How much does a can of spray paint cover?', 'A standard 12oz aerosol can covers 10 to 15 square feet per coat. Dark colours cover less — 8 to 10 sq ft. Light colours and primers cover more — up to 15 sq ft per can.'],
      ['What is the best spray paint brand?', 'Rust-Oleum 2X Ultra Cover for general use, Krylon ColorMaxx for colour range, Montana Cans for professional and art projects, Rust-Oleum Stops Rust for metal surfaces.'],
      ['How far should you hold spray paint from the surface?', 'Hold the can 10 to 12 inches from the surface. Too close causes drips and runs. Too far causes dry spray and a rough dusty finish.'],
      ['How long does spray paint take to dry?', 'Most spray paints are dry to touch in 20 to 30 minutes and dry to handle in 1 to 2 hours. Full cure takes 24 hours. Recoat within 1 hour or after 24 hours to avoid lifting.'],
      ['Can you spray paint over old paint?', 'Yes if the old paint is clean, dry, and in good condition. Sand lightly to improve adhesion. If the old paint is peeling or flaking, remove it completely before spray painting.'],
    ],
  },

  // ── 3. Stain Calculator ────────────────────────────────────────────────────
  {
    slug: 'stain-calculator',
    component: 'StainCalculator',
    title: 'Stain Calculator — How Much Wood Stain Do I Need?',
    metaDesc: 'Calculate exactly how much wood stain you need for any surface. Free instant results in gallons or litres. No signup required.',
    h1: 'Stain Calculator',
    quickAnswer: '1 gallon per 150–200 sq ft',
    quickSub: 'For rough wood surfaces — one coat',
    intro: 'One gallon of wood stain covers <strong>150 to 200 square feet</strong> on rough wood surfaces per coat. Enter your surface dimensions below for an exact result. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your total surface area in square feet. Rough wood absorbs significantly more stain than smooth wood.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Stain Do I Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Wood stain coverage varies significantly based on the porosity and roughness of the wood. Smooth sanded wood achieves 250 to 300 square feet per gallon. Rough sawn wood achieves 150 to 200 square feet per gallon. Bare new wood and highly porous wood species like pine and cedar absorb heavily on the first coat and may only achieve 100 to 150 square feet per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike paint which builds up on the surface, penetrating stains soak into the wood. This means a second coat applied while the first is still wet adds little additional colour — most penetrating stains are applied as a single coat. Solid colour stains behave more like paint and typically require two coats for full coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Always test your chosen stain on a hidden area of the wood before committing to the full project. Wood species, age, and previous treatments all affect how the stain absorbs and the final colour result.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Stain Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage/Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">100 sq ft</th>
                  <th className="px-4 py-3 text-left font-semibold">200 sq ft</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Smooth sanded wood', '250–300 sq ft', '0.4 gal', '0.7 gal'],
                  ['Planed lumber', '200–250 sq ft', '0.5 gal', '0.9 gal'],
                  ['Rough sawn wood', '150–200 sq ft', '0.6 gal', '1.2 gal'],
                  ['New bare pine/cedar', '100–150 sq ft', '0.8 gal', '1.5 gal'],
                  ['Weathered grey wood', '100–130 sq ft', '0.9 gal', '1.7 gal'],
                  ['Log cabin (round logs)', '80–100 sq ft', '1.1 gal', '2.2 gal'],
                ].map(([surface, coverage, s100, s200], i) => (
                  <tr key={surface} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{surface}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{s100}</td>
                    <td className="px-4 py-3 text-gray-700">{s200}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Types of Wood Stain</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Transparent stains</strong> add a tint of colour while allowing the full wood grain and texture to show through. Best for new or good condition wood where you want to enhance the natural appearance. <strong>Semi-transparent stains</strong> provide more colour while still allowing grain to show. The most popular choice for decks and fences. <strong>Solid colour stains</strong> are fully opaque and hide the wood grain completely. Best for weathered or damaged wood that needs colour correction.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Oil-based stains</strong> penetrate deeper and last longer — typically 3 to 5 years. They require mineral spirits for cleanup and have longer dry times. <strong>Water-based stains</strong> dry faster, clean up with soap and water, and have lower VOC content. They last 2 to 4 years and are the more environmentally friendly choice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Wood Stain Brands</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Cabot Australian Timber Oil</strong> is the top-rated penetrating oil stain for hardwood and exotic decking. <strong>Armstrong Clark Wood Stain</strong> consistently earns the highest ratings for pressure treated pine decks and fences. <strong>Ready Seal Natural Cedar</strong> is a popular combination stain and sealer that requires no primer and is one of the easiest to apply.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For interior wood staining, <strong>Minwax Wood Finish</strong> and <strong>Varathane Premium Wood Stain</strong> are the two most widely available and reliable options. Both are oil-based, available in 50 plus colours, and dry in 2 hours.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Applying Wood Stain</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Test on a hidden area first.</strong> Wood species and existing treatments affect stain colour dramatically. Always test before committing to the full project.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply with the grain.</strong> Always brush stain in the direction of the wood grain for the most even finish and best penetration.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Wipe off excess penetrating stain.</strong> After applying penetrating stain, wipe off any excess that has not absorbed within 5 to 15 minutes. Excess stain that dries on the surface becomes sticky and blotchy.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Work in sections.</strong> Avoid stopping mid-board as this creates lap marks. Work from one end to the other without stopping.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Dispose of oil-stained rags safely.</strong> Oil-soaked rags can spontaneously combust. Spread them flat to dry outdoors or submerge in water before disposal.</p>`,
    relatedLinks: [
      { href: 'deck-stain-calculator', label: 'Deck Stain Calculator' },
      { href: 'fence-paint-calculator', label: 'Fence Paint Calculator' },
      { href: 'deck-paint-calculator', label: 'Deck Paint Calculator' },
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
    ],
    faqs: [
      ['How much wood stain do I need?', 'One gallon covers 150 to 200 sq ft on rough wood per coat. Smooth sanded wood achieves 250 to 300 sq ft per gallon. Always buy 15 to 20% more than calculated.'],
      ['How many coats of stain do I need?', 'Most penetrating stains require one coat. Solid colour stains require two coats. Applying a second coat of penetrating stain while the first is wet deepens the colour slightly.'],
      ['What is the best wood stain?', 'Cabot Australian Timber Oil for hardwood decks, Armstrong Clark for pressure treated pine, Ready Seal for easiest application, Minwax Wood Finish for interior wood staining.'],
      ['How long does wood stain last?', 'Oil-based exterior stain lasts 3 to 5 years. Water-based exterior stain lasts 2 to 4 years. Interior stain lasts 5 to 10 years when sealed with a top coat.'],
      ['Should I use oil or water based stain?', 'Oil-based stain penetrates deeper and lasts longer but has higher VOC and longer dry time. Water-based stain dries faster, cleans up easily, and is more environmentally friendly. Both produce similar final results.'],
      ['Do I need to seal wood after staining?', 'Penetrating stains do not require a separate sealer — the stain and sealer are combined. Solid colour stains may benefit from a clear top coat for extra durability on high traffic surfaces like decks.'],
    ],
  },

  // ── 4. Roof Paint Calculator ───────────────────────────────────────────────
  {
    slug: 'roof-paint-calculator',
    component: 'RoofPaintCalculator',
    title: 'Roof Paint Calculator — How Much Paint for a Roof?',
    metaDesc: 'Calculate exactly how much paint or coating you need for your roof. Free instant results in gallons or litres. No signup required.',
    h1: 'Roof Paint Calculator',
    quickAnswer: '4 to 6 gallons per 1,000 sq ft of roof',
    quickSub: 'For a flat or low pitch roof — two coats of elastomeric coating',
    intro: 'A typical 1,000 square foot flat roof needs <strong>4 to 6 gallons</strong> of elastomeric roof coating for two coats. Enter your roof dimensions below for an exact result. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your roof square footage. For pitched roofs multiply your floor area by 1.15 for a low pitch or 1.3 for a medium pitch.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Roof Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Roof paint coverage depends on the type of coating, the roofing material, and the condition of the surface. Elastomeric roof coatings — the most common type used for flat and low-pitch roofs — typically cover 50 to 100 square feet per gallon when applied at the recommended thickness. This is significantly less coverage per gallon than standard paint due to the thick film required for waterproofing.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A 1,000 square foot flat roof needs 10 to 20 gallons of elastomeric coating for two coats at the correct film thickness. Applying too thin reduces waterproofing performance significantly. Always follow the manufacturer's specified spread rate for roofing products rather than trying to stretch coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Pitched roofs have more surface area than their floor plan suggests. A roof with a low 4:12 pitch has 15% more area than the floor plan. A medium 6:12 pitch has 30% more area. A steep 9:12 pitch has 50% more area. Always account for pitch when calculating roof paint quantities.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Roof Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Roof Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Type</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['500 sq ft', 'Flat roof coating', '5–7 gal', '10–14 gal'],
                  ['1,000 sq ft', 'Flat roof coating', '10–14 gal', '20–28 gal'],
                  ['1,000 sq ft', 'Roof tile paint', '3–4 gal', '6–8 gal'],
                  ['1,500 sq ft', 'Flat roof coating', '15–20 gal', '30–40 gal'],
                  ['1,500 sq ft', 'Roof tile paint', '4–6 gal', '8–12 gal'],
                  ['2,000 sq ft', 'Roof tile paint', '6–8 gal', '12–16 gal'],
                ].map(([size, type, one, two], i) => (
                  <tr key={size + type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Types of Roof Paint and Coating</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Elastomeric roof coatings</strong> are thick rubber-like coatings applied to flat and low-pitch roofs to waterproof and protect the membrane. They expand and contract with temperature changes without cracking. Applied at 2 to 3 gallons per 100 square feet per coat, they form a seamless waterproof membrane.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Roof tile paint</strong> is a thin penetrating coating applied to concrete or clay roof tiles to restore colour and apply a protective finish. Coverage is much higher — 150 to 200 square feet per gallon. Popular in Australia and the UK for restoring faded terracotta or concrete tiles.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Reflective roof coatings</strong> are white elastomeric coatings that reflect sunlight and reduce cooling costs by up to 40% in hot climates. <strong>Henry White Roof Coating</strong> and <strong>Rust-Oleum LeakSeal</strong> are the most widely available options in the US.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Roof</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Safety first.</strong> Always use proper roof safety equipment including a harness, non-slip footwear, and roof brackets. Never work on a wet or frosty roof.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean the roof thoroughly.</strong> Pressure wash to remove all dirt, moss, algae, and loose material. Allow to dry completely before coating — minimum 48 hours.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply at the correct spread rate.</strong> Roof coatings must be applied at the manufacturer's specified thickness to achieve their rated waterproofing performance. Spreading too thin voids the warranty.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Treat moss and algae first.</strong> Apply a biocide treatment to kill moss and algae before painting. Painting over live moss and algae causes rapid peeling.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Never paint a roof in rain or high humidity.</strong> Roof coatings require dry conditions to cure properly. Check the weather forecast and allow at least 24 hours of dry weather after application.</p>`,
    relatedLinks: [
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'primer-calculator', label: 'Primer Calculator' },
      { href: 'whole-house-paint-calculator', label: 'Whole House Paint Calculator' },
    ],
    faqs: [
      ['How much paint do I need for a roof?', 'A 1,000 sq ft flat roof needs 10 to 14 gallons of elastomeric coating per coat. Roof tile paint covers much more — 150 to 200 sq ft per gallon. Always follow the manufacturer\'s spread rate.'],
      ['How many gallons of roof coating for a flat roof?', 'Apply elastomeric roof coating at 2 to 3 gallons per 100 sq ft per coat. A 1,000 sq ft flat roof needs 20 to 30 gallons for two coats at the correct film thickness.'],
      ['How often should you paint a roof?', 'Elastomeric roof coatings last 5 to 10 years. Roof tile paint lasts 10 to 15 years. Reflective roof coatings may need reapplication every 5 to 7 years depending on climate and UV exposure.'],
      ['What is the best roof paint?', 'Henry White Roof Coating and Rust-Oleum LeakSeal for flat roofs in the US. Cromar Pro Grade Solar Reflective Roof Coating is popular in the UK. Always choose a product rated for your specific roof material.'],
      ['Can you paint over old roof coating?', 'Yes if the old coating is clean, well-bonded, and in good condition. Remove all loose or peeling areas first. New coating bonds well to old coating that is firmly adhered.'],
      ['How long does roof paint take to dry?', 'Most elastomeric roof coatings dry to touch in 4 to 8 hours and cure fully in 24 to 72 hours. Do not allow foot traffic or rain exposure until fully cured.'],
    ],
  },

  // ── 5. Driveway Paint Calculator ───────────────────────────────────────────
  {
    slug: 'driveway-paint-calculator',
    component: 'DrivewayPaintCalculator',
    title: 'Driveway Paint Calculator — How Much Paint for a Driveway?',
    metaDesc: 'Calculate exactly how much driveway paint or sealer you need. Free instant results in gallons or litres. No signup required.',
    h1: 'Driveway Paint Calculator',
    quickAnswer: '3 to 4 gallons per 400 sq ft',
    quickSub: 'For a standard single car driveway — two coats of driveway sealer',
    intro: 'A standard single car driveway of 400 square feet needs <strong>3 to 4 gallons</strong> of driveway paint or sealer for two coats. Enter your driveway dimensions below for an exact result. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Select <strong>Enter wall area directly</strong> in the calculator and enter your driveway square footage. Measure the length and width of your driveway and multiply together.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Driveway Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Driveway paint coverage depends on the surface material — concrete or asphalt — and the type of product you are applying. Standard driveway paint or masonry paint covers 150 to 200 square feet per gallon on smooth concrete. Driveway sealers for asphalt cover 100 to 150 square feet per gallon as they penetrate deeply into the porous asphalt surface.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard single car driveway is typically 10 feet wide by 20 feet long — 200 square feet. A double car driveway is 20 feet wide by 20 feet long — 400 square feet. At 150 square feet per gallon for two coats, a double car driveway needs approximately 5 to 6 gallons of driveway coating.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            New concrete driveways should be allowed to cure for at least 30 days before painting or sealing. New asphalt driveways should cure for 6 to 12 months before sealing. Applying sealer too soon prevents proper curing and causes long-term surface problems.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Driveway Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Driveway Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Sq Footage</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Single car 10×20ft', '200 sq ft', '1.5 gal', '3.0 gal'],
                  ['Single car 10×30ft', '300 sq ft', '2.0 gal', '4.0 gal'],
                  ['Double car 20×20ft', '400 sq ft', '3.0 gal', '6.0 gal'],
                  ['Double car 20×30ft', '600 sq ft', '4.0 gal', '8.0 gal'],
                  ['Large 20×40ft', '800 sq ft', '5.5 gal', '11.0 gal'],
                  ['Large 24×40ft', '960 sq ft', '6.5 gal', '13.0 gal'],
                ].map(([size, sqft, one, two], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{sqft}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Driveway Paint and Sealer Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For concrete driveways, <strong>Rust-Oleum EpoxyShield Driveway Coating</strong> is the most popular choice — a two-part epoxy that resists oil stains, salt damage, and tyre marks. <strong>KILZ Concrete and Masonry Paint</strong> is a simpler one-coat option for concrete driveways that want a coloured finish.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For asphalt driveways, <strong>Armor All Asphalt Driveway Filler and Sealer</strong> and <strong>Black Jack Drive-Maxx 1000</strong> are the two most popular asphalt sealers available at home improvement stores. Both provide excellent UV and water protection and restore the deep black colour of faded asphalt.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Driveway</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean the surface thoroughly.</strong> Degrease oil stains with a concrete degreaser. Pressure wash all dirt and loose material. Allow to dry completely before applying any coating.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Fill cracks before sealing.</strong> Use a concrete crack filler or asphalt crack filler to repair all cracks before applying the main coating. Sealers do not bridge cracks.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply on a dry warm day.</strong> Ideal application temperature is 60 to 90 degrees Fahrenheit with no rain forecast for 24 hours. Never apply in direct hot sunlight as the coating dries too fast.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Keep vehicles off for 48 to 72 hours.</strong> Most driveway coatings need 48 to 72 hours before vehicle traffic. Turning vehicle wheels on newly sealed driveways causes scuff marks.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Reseal every 2 to 3 years.</strong> Regular sealing every 2 to 3 years prevents water infiltration and dramatically extends the life of both concrete and asphalt driveways.</p>`,
    relatedLinks: [
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'garage-paint-calculator', label: 'Garage Paint Calculator' },
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'primer-calculator', label: 'Primer Calculator' },
    ],
    faqs: [
      ['How much paint do I need for a driveway?', 'A standard double car driveway of 400 sq ft needs 3 gallons per coat. For two coats buy 6 gallons. Asphalt sealers cover less — 100 to 150 sq ft per gallon — so buy accordingly.'],
      ['How many gallons to seal a driveway?', 'A 400 sq ft double driveway needs 3 to 4 gallons per coat of asphalt sealer. A 600 sq ft driveway needs 4 to 6 gallons per coat. Always apply two coats for full protection.'],
      ['What is the best driveway paint?', 'Rust-Oleum EpoxyShield for concrete driveways. Black Jack Drive-Maxx 1000 or Armor All Asphalt Sealer for asphalt driveways. Always choose a product rated for your specific driveway material.'],
      ['How often should you seal a driveway?', 'Seal concrete driveways every 3 to 5 years. Seal asphalt driveways every 2 to 3 years. Regular sealing prevents water damage and dramatically extends driveway life.'],
      ['Can you paint a concrete driveway?', 'Yes — use a concrete-specific paint or epoxy coating. Standard exterior house paint is not durable enough for driveways. Epoxy coatings resist oil stains, tyre marks, and salt damage.'],
      ['How long does driveway sealer take to dry?', 'Most driveway sealers dry to foot traffic in 4 to 8 hours. Allow 48 to 72 hours before vehicle traffic. Avoid turning vehicle wheels on newly sealed driveways for the first week.'],
    ],
  },

  // ── 6. Paint Coverage Calculator ──────────────────────────────────────────
  {
    slug: 'paint-coverage-calculator',
    component: 'PaintCoverageCalculator',
    title: 'Paint Coverage Calculator — How Far Does a Gallon of Paint Go?',
    metaDesc: 'Calculate exactly how far a gallon of paint will go and how many gallons you need for any surface. Free instant results. No signup required.',
    h1: 'Paint Coverage Calculator',
    quickAnswer: '400 sq ft per gallon on smooth walls',
    quickSub: '350–400 sq ft per gallon — standard interior latex paint — one coat',
    intro: 'One gallon of standard interior paint covers <strong>350 to 400 square feet</strong> on smooth walls per coat. Enter your room dimensions below to calculate how many gallons you need. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> The calculator below uses 400 sq ft per gallon as the default coverage rate for smooth interior walls. Rough or textured surfaces cover less — see the reference table below for coverage by surface type.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Far Does a Gallon of Paint Go?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Paint coverage — also called spread rate — is the area one gallon of paint covers at the correct film thickness. Most interior latex paints claim 400 square feet per gallon on the label. In practice, real-world coverage is typically 350 to 380 square feet per gallon on smooth walls due to surface texture, roller absorption, and lap allowances.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Coverage varies significantly by surface type. Smooth drywall achieves the label rate of 400 square feet per gallon. Orange peel textured walls achieve 300 to 350 square feet per gallon. Heavy knockdown texture achieves 250 to 300 square feet per gallon. Rough masonry, brick, and stucco achieve 150 to 200 square feet per gallon due to deep penetration into the porous surface.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The number of coats also affects how you calculate coverage. One coat of a premium self-priming paint may achieve the same result as a primer coat plus one coat of standard paint. Premium paints with high hide ratings cover better in fewer coats saving money overall despite the higher per-gallon cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Coverage by Surface Type</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Surface Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage per Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres per 10 sq m</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Smooth drywall', '380–400 sq ft', '0.25 L'],
                  ['Lightly textured wall', '340–380 sq ft', '0.28 L'],
                  ['Orange peel texture', '300–340 sq ft', '0.33 L'],
                  ['Heavy knockdown texture', '250–300 sq ft', '0.40 L'],
                  ['Smooth wood', '350–400 sq ft', '0.27 L'],
                  ['Rough sawn wood', '150–200 sq ft', '0.55 L'],
                  ['Smooth masonry', '200–250 sq ft', '0.45 L'],
                  ['Rough brick/stucco', '100–150 sq ft', '0.70 L'],
                ].map(([surface, coverage, litres], i) => (
                  <tr key={surface} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{surface}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{litres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Paint Coverage Affects Cost</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Understanding coverage rates helps you compare paint value more accurately than price per gallon alone. A $90 per gallon premium paint that covers 400 square feet in one coat costs $0.225 per square foot. A $35 per gallon budget paint that covers 300 square feet per coat and requires two coats costs $0.233 per square foot — more expensive than the premium paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Premium paints with high hide pigmentation — titanium dioxide — cover in fewer coats and produce richer, more accurate colours. For whole house projects or large commercial jobs, comparing cost per square foot of coverage rather than cost per gallon gives a more accurate budget picture.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Paint Coverage Matters for Colour Changes</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Changing from a dark colour to a light colour requires the most coats — sometimes 3 or 4 — because the dark colour bleeds through light paint. Primer is essential for dark-to-light colour changes. A tinted primer matched to your topcoat colour reduces the number of topcoats needed from 3 to 2 in most cases.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Changing from light to dark requires fewer coats — typically 2 — because dark paint has high pigment concentration that covers in fewer applications. Changing between similar colours of similar darkness typically requires 1 to 2 coats with a good quality paint.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips to Maximise Paint Coverage</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Fill and sand before painting.</strong> Smooth walls absorb less paint and achieve higher coverage rates. Fill holes, sand rough spots, and prime bare drywall patches before painting.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use the right roller nap.</strong> A ⅜ inch nap for smooth walls, ½ inch for light texture, ¾ inch for heavy texture. The wrong nap wastes paint and reduces coverage.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do not over-thin paint.</strong> Thinning paint too much reduces coverage and hide. Only thin when the label specifically recommends it for your application method.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Apply at the correct film thickness.</strong> Apply paint at the coverage rate on the label — not thinner to make it go further. Thin application reduces hide, durability, and colour accuracy.</p>`,
    relatedLinks: [
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'whole-house-paint-calculator', label: 'Whole House Paint Calculator' },
      { href: 'two-coat-paint-calculator', label: 'Two Coat Paint Calculator' },
      { href: 'primer-calculator', label: 'Primer Calculator' },
      { href: 'textured-wall-paint-calculator', label: 'Textured Wall Paint Calculator' },
    ],
    faqs: [
      ['How far does a gallon of paint go?', 'One gallon covers 350 to 400 sq ft on smooth walls per coat. Textured walls achieve 250 to 350 sq ft per gallon. Rough masonry achieves 100 to 200 sq ft per gallon.'],
      ['How many square feet does a gallon of paint cover?', '350 to 400 sq ft on smooth interior walls. 300 to 350 sq ft on lightly textured walls. 150 to 200 sq ft on rough exterior wood. Always use the lower end of the range for budgeting.'],
      ['How many gallons do I need for a room?', 'A standard 12×12 bedroom needs 1.5 to 2 gallons for two coats. A larger 16×14 living room needs 2.5 to 3 gallons. Use our room calculators for exact estimates.'],
      ['Does expensive paint cover better?', 'Yes — premium paints with high titanium dioxide content cover better in fewer coats. A $90 premium paint often costs less per covered square foot than a $35 budget paint requiring extra coats.'],
      ['How much paint do I need for two coats?', 'Double your single-coat quantity. If a room needs 1.5 gallons per coat, buy 3 gallons for two coats. The second coat typically uses slightly less paint as the surface is already sealed.'],
      ['What affects paint coverage rate?', 'Surface texture (rough surfaces absorb more), application method (spraying wastes more), colour change (dark to light needs more coats), paint quality (premium paints hide better), and roller nap thickness.'],
    ],
  },

  // ── 7. Contractor Calculator ───────────────────────────────────────────────
  {
    slug: 'paint-calculator-for-contractors',
    component: 'ContractorPaintCalculator',
    title: 'Paint Calculator for Contractors — Professional Paint Estimating Tool',
    metaDesc: 'Professional paint calculator for contractors. Calculate paint quantities, costs, and labour for any commercial or residential painting project. Free, no signup required.',
    h1: 'Paint Calculator for Contractors',
    quickAnswer: 'Add multiple rooms — get a full project total',
    quickSub: 'Calculate paint, primer, and labour for complete painting projects',
    intro: 'Professional paint estimating tool for contractors. Calculate paint quantities for <strong>multiple rooms in one project</strong> including walls, ceilings, and trim. Get totals in gallons or litres. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Use the <strong>Add Room</strong> button to add each room or area in your project. The calculator totals all rooms automatically for a complete project estimate.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Calculate Paint for a Contracting Job</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Accurate paint estimation is critical for profitable contracting. Over-ordering wastes materials cost and ties up capital. Under-ordering causes project delays and colour inconsistency from different dye lots. Professional contractors use a systematic room-by-room approach to calculate total paint quantities for every project.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The standard formula for wall paint is: total wall area minus door and window deductions, divided by coverage rate per gallon, multiplied by number of coats. A professional crew typically uses a coverage rate of 350 to 380 square feet per gallon for interior smooth walls — slightly below the label rate to account for cutting in, roller waste, and touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Add 10% waste allowance for standard projects and 15% for cut-up rooms with many windows, doors, and obstacles. Add 20% for new construction where walls may be more absorbent and extra touch-up is required after other trades finish.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Contractor Paint Estimating — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Project Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage Rate</th>
                  <th className="px-4 py-3 text-left font-semibold">Waste Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Interior repaint', '370 sq ft/gal', '10%', '2'],
                  ['New construction interior', '350 sq ft/gal', '15%', '2'],
                  ['Exterior repaint', '300 sq ft/gal', '10%', '2'],
                  ['New exterior (bare)', '250 sq ft/gal', '15%', '2'],
                  ['Ceiling repaint', '380 sq ft/gal', '10%', '1–2'],
                  ['Trim and doors', '200 sq ft/gal', '15%', '2'],
                ].map(([type, coverage, waste, coats], i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{waste}</td>
                    <td className="px-4 py-3 text-gray-700">{coats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Price a Painting Job</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional painters price jobs using one of three methods: price per square foot, hourly rate, or project-based pricing. Price per square foot is the most common — $2 to $6 per square foot for interior painting depending on your market, complexity, and finish level. Exterior painting runs $1.50 to $4.50 per square foot.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A typical interior repaint job breakdown: materials are 15 to 25% of total job cost, labour is 70 to 80%, and overhead and profit is 10 to 15%. Beginners often underprice labour. Always calculate your actual hourly rate — include travel time, prep time, cleanup time, and equipment maintenance — before pricing any job.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For commercial painting projects, add separate line items for surface preparation, primer, number of coats, and any specialty coatings. Commercial clients and property managers expect detailed itemised quotes, not lump sum pricing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint Brands for Contractors</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams ProClassic</strong> and <strong>Duration</strong> are the most widely used professional interior paints — available through Sherwin-Williams contractor accounts at significant discounts from retail price. <strong>Benjamin Moore Regal Select</strong> and <strong>Aura</strong> are the premium choices that clients recognise by name and are willing to pay a premium for.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For exterior commercial projects, <strong>Sherwin-Williams Emerald Exterior</strong> and <strong>Duration Exterior</strong> provide the best durability and warranty coverage. Many commercial contracts specify paint brands — always confirm with the client before purchasing materials.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Contractor Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Open a contractor account.</strong> Sherwin-Williams, Benjamin Moore, and PPG all offer contractor accounts with 30 to 40% off retail pricing. The savings on a full year of jobs easily justify the paperwork.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Box your paint for large jobs.</strong> Pour all cans of the same colour into a large bucket and mix before starting. This eliminates colour variation between cans from different batches.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a paint tracker spreadsheet.</strong> Track paint quantities used per room on every job. Over time this builds your own real-world coverage database for your specific methods and markets.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Always do a site visit before quoting.</strong> Never quote a painting job from photos or measurements alone. Surface condition, accessibility, and prep requirements can double or triple material and labour costs.</p>`,
    relatedLinks: [
      { href: 'whole-house-paint-calculator', label: 'Whole House Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'primer-calculator', label: 'Primer Calculator' },
    ],
    faqs: [
      ['How do contractors calculate how much paint they need?', 'Measure total wall area, subtract doors and windows, divide by coverage rate (350 to 380 sq ft per gallon for interior), multiply by number of coats, then add 10 to 15% waste. Use our calculator above for each room and it totals automatically.'],
      ['How much do painters charge per square foot?', 'Interior painting costs $2 to $6 per sq ft including labour and materials. Exterior painting costs $1.50 to $4.50 per sq ft. Rates vary by market, complexity, and finish quality.'],
      ['What paint do professional painters use?', 'Sherwin-Williams Duration and ProClassic, Benjamin Moore Regal Select and Aura are the most used professional paints. Contractors buy through accounts at 30 to 40% off retail pricing.'],
      ['How much paint do I need for a 2000 sq ft house?', 'A 2,000 sq ft home interior needs 18 to 22 gallons for two coats on all walls. Add 4 to 6 gallons for ceilings and 2 to 3 gallons for trim. Buy in 5-gallon buckets for bulk savings.'],
      ['How do you bid a painting job?', 'Calculate materials (15 to 25% of job total), estimate labour hours at your hourly rate (70 to 80%), add overhead and profit (10 to 15%). Always do a site visit before quoting. Never bid from photos alone.'],
      ['What is the average paint job profit margin?', 'Professional painting companies target 15 to 25% net profit margin. New contractors often underprice labour. Always calculate your true hourly cost including travel, prep, and cleanup before pricing any job.'],
    ],
  },

  // ── 8. Textured Wall Paint Calculator ─────────────────────────────────────
  {
    slug: 'textured-wall-paint-calculator',
    component: 'TexturedWallPaintCalculator',
    title: 'Textured Wall Paint Calculator — How Much Paint for Textured Walls?',
    metaDesc: 'Calculate exactly how much paint you need for textured, orange peel, or knockdown walls. Free instant results in gallons or litres. No signup required.',
    h1: 'Textured Wall Paint Calculator',
    quickAnswer: '20–30% more paint than smooth walls',
    quickSub: 'Textured walls absorb significantly more paint than smooth drywall',
    intro: 'Textured walls need <strong>20 to 30% more paint</strong> than smooth walls. A room that needs 2 gallons on smooth walls needs 2.5 to 2.6 gallons on textured walls. Enter your room dimensions below for an exact result. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> After getting your result from the calculator below, multiply the total by 1.25 for orange peel texture or 1.35 for heavy knockdown texture to get your adjusted quantity for textured walls.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much More Paint Do Textured Walls Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Textured walls have significantly more surface area than they appear. The peaks and valleys of orange peel, knockdown, and skip trowel textures increase the actual paintable surface by 20 to 40% compared to a smooth flat wall of the same dimensions. This means you need proportionally more paint to achieve the same film thickness and coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            On smooth drywall, one gallon covers 380 to 400 square feet. On orange peel texture, one gallon covers 300 to 340 square feet. On medium knockdown texture, one gallon covers 260 to 300 square feet. On heavy popcorn or skip trowel texture, one gallon may only cover 200 to 250 square feet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The type of applicator also matters significantly with textured walls. A thick nap roller (¾ inch) reaches into the valleys of texture and provides more complete coverage than a thin nap roller but uses more paint. Brush-applied paint on heavy texture can achieve good penetration into deep texture but is slow. Spraying provides the most complete coverage on heavily textured walls but uses the most paint due to overspray.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Paint Coverage by Texture Type</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Texture Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage/Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">Extra Paint vs Smooth</th>
                  <th className="px-4 py-3 text-left font-semibold">Roller Nap</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Smooth drywall', '380–400 sq ft', 'Baseline', '⅜ inch'],
                  ['Light orange peel', '340–380 sq ft', '+10%', '½ inch'],
                  ['Medium orange peel', '300–340 sq ft', '+20%', '½ inch'],
                  ['Light knockdown', '280–320 sq ft', '+25%', '¾ inch'],
                  ['Heavy knockdown', '240–280 sq ft', '+35%', '¾ inch'],
                  ['Skip trowel/popcorn', '200–240 sq ft', '+50%', '¾–1 inch'],
                ].map(([texture, coverage, extra, nap], i) => (
                  <tr key={texture} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{texture}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{extra}</td>
                    <td className="px-4 py-3 text-gray-700">{nap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Textured Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Flat and matte finishes work best on heavy texture — they hide the uneven sheen that satin and eggshell can create on pronounced texture peaks. For light orange peel texture in living areas, eggshell is the standard choice. For heavy knockdown or popcorn ceilings, always use flat paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            High-hide paints with high titanium dioxide content are worth the extra cost on textured walls. The deep valleys of texture can show colour inconsistency if the paint has poor hide. <strong>Sherwin-Williams Emerald Interior</strong> and <strong>Benjamin Moore Aura</strong> both have excellent hide ratings that cover textured walls more uniformly in two coats.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting Textured Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always use a thick nap roller.</strong> A ½ to ¾ inch nap roller reaches into texture valleys. A thin ¼ inch nap roller skims over texture peaks and leaves valleys unpainted.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply more paint per coat.</strong> Textured walls need a wetter, heavier coat than smooth walls to fill in the valleys. Do not spread paint as thin as you would on smooth walls.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use a brush to work paint into deep crevices.</strong> After rolling, back-brush heavy texture areas to work paint into deep crevices that the roller skimmed over.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Two coats are always necessary.</strong> Textured walls almost always require two coats for uniform coverage — the first coat highlights any missed spots and the second coat evens everything out.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy 30% more paint than you think you need.</strong> It is always better to have leftover touch-up paint than to run out mid-project with a textured wall that is hard to match exactly.</p>`,
    relatedLinks: [
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
      { href: 'bedroom-paint-calculator', label: 'Bedroom Paint Calculator' },
      { href: 'living-room-paint-calculator', label: 'Living Room Paint Calculator' },
      { href: 'two-coat-paint-calculator', label: 'Two Coat Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
    ],
    faqs: [
      ['How much more paint do textured walls need?', 'Orange peel texture needs 20 to 25% more paint than smooth walls. Heavy knockdown texture needs 35 to 50% more. Always increase your estimate when painting textured surfaces.'],
      ['What roller nap should I use for textured walls?', 'Use ½ inch nap for light orange peel texture. Use ¾ inch nap for medium to heavy knockdown and skip trowel texture. A thin ⅜ inch nap is only suitable for smooth walls.'],
      ['What is the best paint finish for textured walls?', 'Flat or matte finish for heavy texture — it hides the uneven sheen on texture peaks. Eggshell for light orange peel texture in living areas. Avoid satin and semi-gloss on pronounced texture.'],
      ['How many coats does textured wall paint need?', 'Always apply two coats on textured walls. The first coat settles into the texture valleys and highlights missed spots. The second coat provides uniform coverage. Budget paint may require three coats.'],
      ['How do I calculate paint for textured walls?', 'Calculate the paint quantity for smooth walls using the calculator above, then multiply by 1.25 for orange peel texture or 1.35 for heavy knockdown texture.'],
      ['Can I smooth textured walls before painting?', 'Yes — skim coating over textured walls with joint compound creates a smooth surface and reduces paint usage. It is labour intensive but reduces long-term painting costs on future repaints.'],
    ],
  },

  // ── 9. Two Coat Paint Calculator ──────────────────────────────────────────
  {
    slug: 'two-coat-paint-calculator',
    component: 'TwoCoatPaintCalculator',
    title: 'Two Coat Paint Calculator — How Much Paint for Two Coats?',
    metaDesc: 'Calculate exactly how much paint you need for two coats on any room or surface. Free instant results in gallons or litres. No signup required.',
    h1: 'Two Coat Paint Calculator',
    quickAnswer: 'Double your single coat quantity',
    quickSub: 'The second coat uses 10–15% less paint than the first coat',
    intro: 'Two coats of paint requires approximately <strong>1.9 times</strong> the single coat quantity — not exactly double, because the sealed surface absorbs less on the second coat. Enter your room dimensions below for an exact two-coat total. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Select <strong>2 coats</strong> in the calculator below and it automatically calculates the correct two-coat quantity accounting for reduced absorption on the second coat.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Do You Need for Two Coats?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two coats of paint does not require exactly double the quantity of one coat. The first coat seals the surface and the second coat applies over a non-porous sealed film, absorbing less and achieving slightly better coverage. In practice, two coats requires 1.8 to 2.0 times the single coat quantity — budget for double to be safe.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            On new drywall or bare wood, the first coat soaks into the porous surface and provides minimal coverage. The second coat goes over the sealed surface and covers much more efficiently. In this case, two coats requires closer to 2.2 to 2.5 times the theoretical single-coat quantity because the first coat is effectively a sealer coat.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For colour changes from dark to light, two coats is rarely sufficient — three or four coats are typically needed for complete coverage. Using a tinted primer matched to the topcoat colour reduces the total number of coats needed and saves money on large projects.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Two Coat Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Room</th>
                  <th className="px-4 py-3 text-left font-semibold">1 Coat</th>
                  <th className="px-4 py-3 text-left font-semibold">2 Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">3 Coats</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Bedroom 10×10', '1.0 gal', '1.9 gal', '2.8 gal'],
                  ['Bedroom 12×12', '1.3 gal', '2.5 gal', '3.7 gal'],
                  ['Bathroom 8×6', '0.7 gal', '1.3 gal', '2.0 gal'],
                  ['Kitchen 12×10', '1.2 gal', '2.3 gal', '3.4 gal'],
                  ['Living room 16×14', '1.8 gal', '3.4 gal', '5.0 gal'],
                  ['Whole house 1,500 sq ft', '9.0 gal', '17 gal', '25 gal'],
                ].map(([room, one, two, three], i) => (
                  <tr key={room} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{room}</td>
                    <td className="px-4 py-3 text-gray-700">{one}</td>
                    <td className="px-4 py-3 text-gray-700">{two}</td>
                    <td className="px-4 py-3 text-gray-700">{three}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Do You Need Two Coats vs One Coat?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Two coats are always recommended for the best and most durable finish. One coat is only acceptable for touch-ups, minor colour refreshes where you are using the exact same colour, or when using a premium self-priming paint specifically rated for one coat coverage.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Situations that always require two coats: colour changes of any kind, new drywall or bare surfaces, previously unpainted surfaces, any change to a lighter colour, and any room that will receive heavy use such as kitchens, bathrooms, and hallways.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Situations that may need three or more coats: dark to light colour changes (especially dark red, dark navy, or dark green to a light or white colour), painting over high-tannin woods without primer, and covering severe water stains or smoke damage without a stain-blocking primer.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Long to Wait Between Coats</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Standard latex paint requires a minimum of 4 hours between coats under normal temperature and humidity conditions. Premium paints and self-priming formulas typically require 2 to 4 hours. Oil-based paints require 24 hours between coats. Always check the specific recoat time on your paint can label.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Applying a second coat too soon — before the first coat has fully dried — causes the wet layers to mix, creating streaks, roller marks, and uneven sheen. If in doubt, wait longer. A fully dried first coat always produces a better second coat result.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Two Coat Painting</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Apply first coat in one direction, second coat perpendicular.</strong> Rolling the first coat horizontally and the second coat vertically (or vice versa) produces the most uniform and even finish.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Lightly sand between coats.</strong> Lightly sand with 220-grit sandpaper between the first and second coats to smooth any raised grain or roller texture. Wipe away dust before applying the second coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use the same batch of paint for both coats.</strong> Buy all paint needed for the project at once to ensure consistent colour. Paint from different batches can have subtle colour variations that show between coats.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Keep leftover paint for touch-ups.</strong> Store leftover second-coat paint in a sealed container labelled with the room and colour. Properly stored latex paint lasts 5 to 10 years for touch-ups.</p>`,
    relatedLinks: [
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
      { href: 'whole-house-paint-calculator', label: 'Whole House Paint Calculator' },
      { href: 'textured-wall-paint-calculator', label: 'Textured Wall Paint Calculator' },
      { href: 'primer-calculator', label: 'Primer Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
    ],
    faqs: [
      ['How much paint do I need for two coats?', 'Budget for 1.9 times your single coat quantity — the second coat absorbs slightly less than the first. For safety, simply double your single coat estimate. Our calculator sets 2 coats automatically.'],
      ['Does two coats use double the paint?', 'Not exactly — two coats uses about 1.8 to 2.0 times the single coat quantity. The sealed surface absorbs less on the second coat. Budget for double to be safe.'],
      ['How long to wait between coats of paint?', 'Standard latex: 4 hours minimum. Premium latex: 2 to 4 hours. Oil-based paint: 24 hours. Always check the recoat time on your paint can label. Waiting longer never hurts.'],
      ['Do I need two coats of paint?', 'Yes in almost all cases. Two coats provides better coverage, more durable finish, more accurate colour, and longer-lasting results than one coat. One coat is only acceptable for minor touch-ups.'],
      ['How many coats for a dark to light colour change?', 'Three to four coats are typically needed for dark to light changes. Use a tinted primer matched to your topcoat colour to reduce total coats from four to two or three.'],
      ['What is the best paint for one coat coverage?', 'Sherwin-Williams Emerald Interior, Benjamin Moore Aura, and Behr Marquee are all marketed as one coat paints. In practice they still benefit from two coats but provide excellent coverage in one thick coat on simple repaints.'],
    ],
  },

];

// ─── Page template ───────────────────────────────────────────────────────────
function generatePage(page) {
  const relatedLinksJSX = page.relatedLinks
    .map(({ href, label }) => `            <li><Link href={\`/\${locale}/${href}\`} className="text-blue-600 hover:text-blue-700 font-medium">${label} →</Link></li>`)
    .join('\n');

  const faqSchemaItems = page.faqs
    .map(([q, a]) => `      {
        '@type': 'Question',
        name: '${q.replace(/'/g, "\\'")}',
        acceptedAnswer: { '@type': 'Answer', text: '${a.replace(/'/g, "\\'")}' },
      }`)
    .join(',\n');

  const faqJSX = page.faqs
    .map(([q, a]) => `              ['${q.replace(/'/g, "\\'")}', '${a.replace(/'/g, "\\'")}'],`)
    .join('\n');

  const canonicalPath = page.slug;

  return `import { Suspense } from 'react';
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
      ? 'https://thepaintcalculator.com/${canonicalPath}'
      : \`https://thepaintcalculator.com/\${locale}/${canonicalPath}\`;
  return {
    title: '${page.title} | ThePaintCalculator.com',
    description: '${page.metaDesc}',
    alternates: { canonical },
    openGraph: {
      title: '${page.title}',
      description: '${page.metaDesc}',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function ${page.component}({
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
      { '@type': 'ListItem', position: 2, name: '${page.h1}', item: 'https://thepaintcalculator.com/${canonicalPath}' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
${faqSchemaItems},
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={\`/\${locale}\`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">${page.h1}</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ${page.h1}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            ${page.intro}
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">${page.quickAnswer}</p>
          <p className="text-sm opacity-90">${page.quickSub}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto text-sm text-amber-800 text-center">
          ${page.tip}
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">
${page.body}

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
${relatedLinksJSX}
            <li><Link href={\`/\${locale}\`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
${faqJSX}
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
`;
}

// ─── Generate all pages ───────────────────────────────────────────────────────
let created = 0;
let skipped = 0;

for (const page of pages) {
  const dir = path.join(cwd, 'app', '[locale]', page.slug);
  const file = path.join(dir, 'page.tsx');

  if (fs.existsSync(file)) {
    console.log(`⏭  Skipped (already exists): ${page.slug}`);
    skipped++;
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, generatePage(page), 'utf8');
  console.log(`✅  Created: ${page.slug}`);
  created++;
}

console.log('\n─────────────────────────────────────────');
console.log(`✅  ${created} pages created`);
if (skipped > 0) console.log(`⏭  ${skipped} pages skipped (already exist)`);
console.log('\nNext steps:');
console.log('  git add .');
console.log('  git commit -m "feat: add all remaining calculator pages"');
console.log('  git push');
console.log('─────────────────────────────────────────\n');
