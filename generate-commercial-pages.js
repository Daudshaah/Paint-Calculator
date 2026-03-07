const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
if (!fs.existsSync(path.join(cwd, 'app', '[locale]'))) {
  console.error('❌  Run this script from your project root (where app/[locale] exists).');
  process.exit(1);
}

const pages = [

  // ── 1. Commercial Paint Calculator ────────────────────────────────────────
  {
    slug: 'commercial-paint-calculator',
    component: 'CommercialPaintCalculator',
    title: 'Commercial Paint Calculator — Professional Paint Estimating for Commercial Projects',
    metaDesc: 'Calculate paint quantities for commercial painting projects including offices, retail, and multi-unit buildings. Free professional paint estimator. No signup required.',
    h1: 'Commercial Paint Calculator',
    quickAnswer: '1 gallon per 350–400 sq ft per coat',
    quickSub: 'Standard commercial interior — smooth drywall — two coats',
    intro: 'Commercial painting projects use the same coverage rates as residential — <strong>350 to 400 square feet per gallon</strong> on smooth drywall. Add each room or area separately for a complete project total. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Use the <strong>Add Room</strong> button to add each area — offices, corridors, lobbies, bathrooms. The calculator totals all areas automatically for your full commercial project estimate.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Calculate Paint for Commercial Projects</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Commercial paint estimation follows the same principles as residential but at larger scale. Calculate the total wall area of each space, subtract doors and windows, divide by the coverage rate per gallon, and multiply by the number of coats. Add a 10 to 15% waste factor for commercial projects to account for cutting in, overspray, and touch-ups.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Commercial projects typically specify paint by brand and product in the project specifications. Always confirm the specified paint and its coverage rate before estimating quantities. Commercial paints vary widely in spread rate — architectural coatings achieve 400 square feet per gallon while heavy-duty epoxy coatings may only achieve 200 square feet per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Large commercial buildings are typically estimated by zone — office areas, corridors, lobby, bathrooms, stairwells — each with different surface types and finish requirements. Use the calculator above to add each zone separately and get a full project total.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Commercial Paint Coverage Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Building Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Floor Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (2 coats walls)</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (walls + ceiling)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Small office suite', '1,000 sq ft', '8–10 gal', '12–15 gal'],
                  ['Medium office', '2,500 sq ft', '20–25 gal', '30–38 gal'],
                  ['Large office floor', '5,000 sq ft', '40–50 gal', '60–75 gal'],
                  ['Retail unit 2,000 sq ft', '2,000 sq ft', '16–20 gal', '24–30 gal'],
                  ['Restaurant 1,500 sq ft', '1,500 sq ft', '14–18 gal', '20–26 gal'],
                  ['Apartment block 10 units', '8,000 sq ft', '65–80 gal', '95–120 gal'],
                ].map(([type, area, walls, both], i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{area}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Commercial Paint Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams ProMar 200</strong> is the most widely specified commercial interior paint — excellent coverage, low VOC, and available through contractor accounts at significant discounts. <strong>Sherwin-Williams Duration</strong> and <strong>Benjamin Moore Regal Select</strong> are the premium commercial choices for high-specification projects where longevity is critical.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For high-traffic commercial areas like corridors, lobbies, and healthcare facilities, <strong>Sherwin-Williams Harmony</strong> (zero VOC, antimicrobial) and <strong>Benjamin Moore Natura</strong> (zero VOC) are the standard specifications. Both are washable, scrubbable, and meet the indoor air quality requirements of most commercial building certifications including LEED.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Commercial Paint Finishes by Area</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Different areas of a commercial building require different paint finishes based on traffic levels and cleaning requirements. Offices and conference rooms typically use eggshell for a professional appearance with good washability. Corridors and lobbies use satin for high washability under heavy foot traffic. Bathrooms and kitchens use semi-gloss for maximum moisture resistance. Ceilings throughout use flat white.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Commercial Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Schedule painting outside business hours.</strong> Most commercial painting is done evenings and weekends to avoid disrupting business operations. Factor overtime labour rates into your project budget.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Specify low-VOC paint for occupied buildings.</strong> Standard paints off-gas VOCs for days after application. Use zero or low-VOC paints in any building that will be occupied within 24 to 48 hours of painting.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Allow extra for colour matching existing walls.</strong> In commercial repaint projects where only some walls are repainted, colour matching existing paint requires testing and approval — add time and cost for colour matching.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy in 5-gallon buckets for large projects.</strong> Commercial projects should always be purchased in 5-gallon buckets to save 15 to 20% on material costs versus single gallons.</p>`,
    relatedLinks: [
      { href: 'warehouse-paint-calculator', label: 'Warehouse Paint Calculator' },
      { href: 'office-building-paint-calculator', label: 'Office Building Paint Calculator' },
      { href: 'paint-calculator-for-contractors', label: 'Paint Calculator for Contractors' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'whole-house-paint-calculator', label: 'Whole House Paint Calculator' },
    ],
    faqs: [
      ['How do you calculate paint for a commercial building?', 'Measure total wall area per zone, subtract doors and windows, divide by 350 to 400 sq ft per gallon, multiply by number of coats, then add 10 to 15% waste. Use the calculator above and add each zone separately.'],
      ['How much paint does a 5,000 sq ft office need?', 'A 5,000 sq ft office floor needs 40 to 50 gallons for two coats on walls. Add another 20 to 30 gallons if painting ceilings. Buy in 5-gallon buckets for commercial projects.'],
      ['What paint is used in commercial buildings?', 'Sherwin-Williams ProMar 200 is the most widely used commercial paint. For premium projects, Sherwin-Williams Duration and Benjamin Moore Regal Select. For healthcare and schools, zero-VOC paints like Sherwin-Williams Harmony.'],
      ['How much does commercial painting cost?', 'Commercial interior painting costs $1.50 to $4 per sq ft for labour and materials. A 5,000 sq ft office floor costs $7,500 to $20,000 professionally painted. DIY commercial painting is not practical at this scale.'],
      ['What finish is best for commercial walls?', 'Eggshell for offices and conference rooms. Satin for corridors and lobbies. Semi-gloss for bathrooms and kitchens. Flat for ceilings throughout.'],
      ['How long does commercial painting take?', 'A professional crew of 3 to 4 painters can paint approximately 3,000 to 4,000 sq ft of walls per day. A 10,000 sq ft office takes 3 to 4 days for walls only working full days.'],
    ],
  },

  // ── 2. Warehouse Paint Calculator ─────────────────────────────────────────
  {
    slug: 'warehouse-paint-calculator',
    component: 'WarehousePaintCalculator',
    title: 'Warehouse Paint Calculator — How Much Paint for a Warehouse?',
    metaDesc: 'Calculate exactly how much paint you need for a warehouse including walls, floors, and high bay ceilings. Free professional estimator. No signup required.',
    h1: 'Warehouse Paint Calculator',
    quickAnswer: '50 to 80 gallons for a 10,000 sq ft warehouse',
    quickSub: 'Walls and floor markings — two coats — standard 20ft ceiling height',
    intro: 'A standard 10,000 square foot warehouse needs <strong>50 to 80 gallons</strong> of paint for walls and floor markings. Enter your warehouse dimensions below for an exact result. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Use the <strong>Add Room</strong> button to add the main warehouse floor area, then add office areas and bathrooms separately. Enter ceiling height accurately — warehouse ceilings are typically 18 to 30 feet high.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Warehouse Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Warehouse painting is more complex than standard commercial painting because of high ceilings, large uninterrupted wall areas, and specialised floor coatings. A standard 10,000 square foot warehouse with 20-foot ceilings has approximately 8,000 square feet of wall area on four sides. At 300 to 350 square feet per gallon on concrete block walls, two coats requires 45 to 55 gallons for walls alone.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Warehouse floors typically require epoxy floor coating rather than standard paint. Epoxy floor coatings cover 200 to 250 square feet per gallon and require two coats for full durability. A 10,000 square foot warehouse floor needs 80 to 100 gallons of epoxy coating for two coats — the floor coating is usually the largest single material cost in a warehouse painting project.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Floor safety markings — aisle lines, hazard zones, loading areas — use traffic marking paint at 200 to 300 linear feet per gallon for 4-inch wide lines. A fully marked warehouse with 500 linear feet of aisle markings and safety zones needs 2 to 3 gallons of traffic marking paint.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Warehouse Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Warehouse Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Ceiling Height</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">Floor Epoxy (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['5,000 sq ft', '16 ft', '25–30 gal', '40–50 gal'],
                  ['10,000 sq ft', '20 ft', '50–60 gal', '80–100 gal'],
                  ['20,000 sq ft', '24 ft', '90–110 gal', '160–200 gal'],
                  ['50,000 sq ft', '30 ft', '220–270 gal', '400–500 gal'],
                  ['Small unit 2,500 sq ft', '12 ft', '12–15 gal', '20–25 gal'],
                  ['Industrial unit 7,500 sq ft', '18 ft', '35–45 gal', '60–75 gal'],
                ].map(([size, ceiling, walls, floor], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{ceiling}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{floor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Warehouses</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Warehouse walls are typically concrete block (CMU) or metal panels. Concrete block requires a block filler primer before painting to seal the porous surface and reduce paint consumption significantly. Without block filler, bare concrete block absorbs 100 to 150 square feet per gallon — with block filler, subsequent coats achieve 300 to 350 square feet per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams PrepRite Block Filler</strong> is the standard primer for concrete block walls. For topcoats, <strong>Sherwin-Williams ProMar 200</strong> flat white is the most common warehouse wall paint. White walls maximise light reflection in warehouse environments reducing lighting energy costs.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For warehouse floors, <strong>Rust-Oleum EpoxyShield Professional Floor Coating</strong> and <strong>Sherwin-Williams ArmorSeal Tread-Plex</strong> are the most durable options. Both are two-part epoxy systems that resist forklift traffic, oil spills, and chemical exposure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Warehouse Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prime concrete block before painting.</strong> Apply a block filler primer to all bare concrete block walls. This is the single most important step for warehouse painting — without it you will use 3 times more topcoat paint.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use an airless sprayer for large walls.</strong> Rolling warehouse walls is extremely slow. An airless sprayer covers 10 to 15 times faster than rolling for large uninterrupted wall areas.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Prepare floors thoroughly before epoxy coating.</strong> Warehouse floors must be mechanically prepared — ground or shot-blasted — before epoxy coating. Epoxy applied to unprepared concrete delaminate within months.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Paint floor markings last.</strong> Apply all floor epoxy coating first, allow full cure (3 to 5 days), then apply traffic marking paint for aisle lines and safety zones.</p>`,
    relatedLinks: [
      { href: 'commercial-paint-calculator', label: 'Commercial Paint Calculator' },
      { href: 'industrial-paint-calculator', label: 'Industrial Paint Calculator' },
      { href: 'paint-calculator-for-contractors', label: 'Paint Calculator for Contractors' },
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
    ],
    faqs: [
      ['How much paint does a warehouse need?', 'A 10,000 sq ft warehouse with 20ft ceilings needs 50 to 60 gallons for walls (two coats) plus 80 to 100 gallons of epoxy floor coating. Always prime concrete block walls first with block filler.'],
      ['What paint is used on warehouse walls?', 'Concrete block walls need a block filler primer first, then flat white latex topcoat. Sherwin-Williams ProMar 200 flat white is the most common warehouse wall paint. White maximises light reflection.'],
      ['How do you paint a warehouse floor?', 'Use a two-part epoxy floor coating. Mechanically prepare the floor first by grinding or shot-blasting. Apply two coats of epoxy at 200 to 250 sq ft per gallon. Allow 3 to 5 days full cure before forklift traffic.'],
      ['How much does it cost to paint a warehouse?', 'Professional warehouse painting costs $0.50 to $2 per sq ft for walls and $2 to $5 per sq ft for epoxy floor coating. A 10,000 sq ft warehouse costs $25,000 to $60,000 for a full repaint including floors.'],
      ['How long does warehouse paint last?', 'Quality warehouse wall paint lasts 5 to 10 years. Epoxy floor coatings last 3 to 7 years under forklift traffic. High-traffic floor areas may need recoating every 2 to 3 years.'],
      ['Do warehouse walls need primer?', 'Yes — concrete block walls always need block filler primer. Without primer, bare concrete block absorbs enormous amounts of topcoat paint and will never achieve a uniform finish.'],
    ],
  },

  // ── 3. Office Building Paint Calculator ───────────────────────────────────
  {
    slug: 'office-building-paint-calculator',
    component: 'OfficeBuildingPaintCalculator',
    title: 'Office Building Paint Calculator — How Much Paint for an Office Building?',
    metaDesc: 'Calculate exactly how much paint you need for an office building interior. Free professional estimator for multi-floor office projects. No signup required.',
    h1: 'Office Building Paint Calculator',
    quickAnswer: '8 to 10 gallons per 1,000 sq ft of office space',
    quickSub: 'Interior walls — two coats — standard 9ft ceiling height',
    intro: 'A standard 1,000 square foot office suite needs <strong>8 to 10 gallons</strong> for two coats on all walls. For multi-floor buildings, add each floor separately in the calculator below. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Add each floor or zone as a separate room in the calculator — open plan areas, private offices, corridors, reception, bathrooms. The calculator totals everything automatically.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does an Office Building Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Office building paint estimation requires breaking the building into zones — open plan areas, private offices, corridors, reception and lobby, bathrooms, and stairwells. Each zone has different surface areas and often different finish requirements. A systematic room-by-room approach prevents costly under or over-ordering on large projects.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A typical open plan office floor of 5,000 square feet with 9-foot ceilings has approximately 4,000 square feet of perimeter wall area plus interior partition walls. Total paintable wall area for a standard open plan floor is typically 150 to 200% of the floor area — 7,500 to 10,000 square feet of wall area on a 5,000 square foot floor.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Corridors and stairwells have a higher wall-to-floor ratio than open plan areas. A 4-foot wide corridor with 9-foot ceilings has 18 square feet of wall per linear foot — far more wall area relative to floor space than an open office. Always calculate corridor and stairwell wall areas separately.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Office Building Paint Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Office Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Floors</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">Walls + Ceilings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Small suite 500 sq ft', '1', '4–5 gal', '6–8 gal'],
                  ['Office suite 1,000 sq ft', '1', '8–10 gal', '12–15 gal'],
                  ['Office floor 5,000 sq ft', '1', '40–50 gal', '60–75 gal'],
                  ['Office floor 10,000 sq ft', '1', '80–100 gal', '120–150 gal'],
                  ['3-floor building 15,000 sq ft', '3', '120–150 gal', '180–220 gal'],
                  ['5-floor building 25,000 sq ft', '5', '200–250 gal', '300–375 gal'],
                ].map(([size, floors, walls, both], i) => (
                  <tr key={size} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{floors}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Office Buildings</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Office buildings are typically specified with low-VOC or zero-VOC paints to comply with indoor air quality requirements and LEED certification standards. <strong>Sherwin-Williams Harmony Interior Latex</strong> (zero VOC, antimicrobial) and <strong>Benjamin Moore Natura</strong> (zero VOC) are the most commonly specified commercial office paints in North America.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For high-traffic areas like corridors and reception, use a scrubbable satin finish that withstands regular cleaning. Private offices and conference rooms can use eggshell for a more refined appearance. All bathrooms and any kitchen or breakroom areas should use semi-gloss for maximum moisture and stain resistance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Office Building Paint Colour Strategy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Modern office design typically uses a neutral base colour throughout common areas with brand accent colours in reception and feature walls. Warm whites and light greiges dominate office colour specifications — <strong>Sherwin-Williams Accessible Beige</strong>, <strong>Benjamin Moore Pale Oak</strong>, and <strong>Sherwin-Williams Agreeable Gray</strong> are the most commonly specified office wall colours.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Office Building Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint outside business hours.</strong> Schedule all painting during evenings and weekends to avoid VOC exposure for building occupants and disruption to business operations.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Protect IT equipment and furniture.</strong> Cover all computer equipment, server rooms, and furniture with dust sheets before painting. Paint dust and fumes damage electronic equipment.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use consistent colour throughout floors.</strong> Specify one neutral colour for all common areas on each floor to simplify future touch-up maintenance. Keep records of exact paint colour and batch for each area.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Allow 24 to 48 hours ventilation before occupation.</strong> Even low-VOC paints require adequate ventilation time before the space is occupied. Maximise fresh air ventilation after painting.</p>`,
    relatedLinks: [
      { href: 'commercial-paint-calculator', label: 'Commercial Paint Calculator' },
      { href: 'warehouse-paint-calculator', label: 'Warehouse Paint Calculator' },
      { href: 'school-paint-calculator', label: 'School Paint Calculator' },
      { href: 'paint-calculator-for-contractors', label: 'Paint Calculator for Contractors' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
    ],
    faqs: [
      ['How much paint does an office building need?', 'A 1,000 sq ft office suite needs 8 to 10 gallons for two coats on walls. A full 5,000 sq ft office floor needs 40 to 50 gallons. Add each floor separately in the calculator for multi-floor buildings.'],
      ['What paint is used in office buildings?', 'Low-VOC or zero-VOC paints are standard for office buildings. Sherwin-Williams Harmony and Benjamin Moore Natura are the most commonly specified. Eggshell for offices, satin for corridors, semi-gloss for bathrooms.'],
      ['How much does it cost to paint an office building?', 'Professional office interior painting costs $1.50 to $4 per sq ft. A 10,000 sq ft office floor costs $15,000 to $40,000 professionally painted including labour and materials.'],
      ['How long does it take to paint an office building?', 'A professional crew of 4 painters covers approximately 3,000 to 4,000 sq ft of walls per day. A 10-floor office building takes 2 to 4 weeks depending on crew size and access.'],
      ['What colour should office walls be?', 'Warm neutrals are most common — Sherwin-Williams Agreeable Gray, Benjamin Moore Pale Oak, and Sherwin-Williams Accessible Beige. Brand accent colours work well in reception and feature walls.'],
      ['Do offices need low-VOC paint?', 'Most commercial building standards and LEED certification require low-VOC or zero-VOC paints. Even without certification requirements, low-VOC paint is recommended to minimise health impacts on building occupants.'],
    ],
  },

  // ── 4. School Paint Calculator ─────────────────────────────────────────────
  {
    slug: 'school-paint-calculator',
    component: 'SchoolPaintCalculator',
    title: 'School Paint Calculator — How Much Paint for a School?',
    metaDesc: 'Calculate exactly how much paint you need for a school or educational facility. Free professional estimator for classrooms, corridors, and gymnasiums. No signup required.',
    h1: 'School Paint Calculator',
    quickAnswer: '8 to 12 gallons per classroom',
    quickSub: 'Standard 30x30ft classroom — two coats on walls — 9ft ceiling height',
    intro: 'A standard 30×30 foot classroom needs <strong>8 to 12 gallons</strong> of paint for two coats on all walls. Add each space separately in the calculator for a complete school estimate. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Add each classroom, corridor, gymnasium, and bathroom separately in the calculator. School corridors are long and narrow — measure them carefully as they have a high wall-to-floor ratio.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a School Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            School painting projects are among the most complex commercial painting jobs due to the variety of spaces — classrooms, corridors, gymnasiums, cafeterias, bathrooms, offices, and stairwells — each with different size, ceiling height, and finish requirements.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard 30×30 foot elementary school classroom with 9-foot ceilings has 720 square feet of wall area. Subtract two doors and several windows and the paintable wall area is approximately 550 to 600 square feet. At 350 square feet per gallon, two coats requires 3 to 4 gallons per classroom. Adding ceilings increases the total to 5 to 6 gallons per classroom.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            School corridors are the most paint-intensive spaces relative to their floor area. A 200-foot school corridor with 9-foot ceilings has 3,600 square feet of wall area — far more than the corridor floor area of 800 square feet. Always calculate corridor wall areas separately and accurately.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">School Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Space</th>
                  <th className="px-4 py-3 text-left font-semibold">Typical Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (2 coats walls)</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (walls + ceiling)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Classroom', '30×30 ft', '3–4 gal', '5–6 gal'],
                  ['Corridor 200ft long', '200×8 ft', '10–12 gal', '14–17 gal'],
                  ['Gymnasium', '80×100 ft', '35–45 gal', '55–70 gal'],
                  ['Cafeteria', '60×80 ft', '25–30 gal', '38–46 gal'],
                  ['Bathroom block', '20×30 ft', '4–5 gal', '6–7 gal'],
                  ['Whole primary school', '20 classrooms', '150–200 gal', '220–300 gal'],
                ].map(([space, size, walls, both], i) => (
                  <tr key={space} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{space}</td>
                    <td className="px-4 py-3 text-gray-700">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{walls}</td>
                    <td className="px-4 py-3 text-gray-700">{both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Schools</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Schools require extremely durable, washable, and low-VOC paints. Children are more sensitive to VOC exposure than adults, making zero-VOC paint specification critical for educational facilities. <strong>Sherwin-Williams Harmony</strong> (zero VOC, antimicrobial properties) is the most commonly specified school paint in the US. <strong>Benjamin Moore Natura</strong> and <strong>Behr Premium Plus Ultra</strong> zero VOC are equally popular alternatives.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            School corridors and high-traffic areas require a scrubbable semi-gloss or satin finish that withstands frequent cleaning and resists scuff marks. Classrooms typically use eggshell for a less institutional appearance while maintaining washability. Gymnasiums require specialised gymnasium wall paint that resists ball impacts and is not reflective.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">School Paint Colour Guidelines</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            School colour schemes balance stimulation and focus. Research suggests warm yellows and light greens in classrooms promote concentration and learning. Corridors are often painted in the school brand colours to create identity and wayfinding. High-contrast colour schemes at door frames and transitions help students with visual impairment navigate the building.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">School Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always use zero-VOC paint in schools.</strong> Children are significantly more sensitive to VOC exposure than adults. Zero-VOC paint is non-negotiable for any school painting project.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Schedule during school holidays.</strong> All school painting must be done during holidays or at minimum weekend periods to comply with health and safety requirements and avoid disrupting education.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use scrubbable paint in classrooms.</strong> Classroom walls are subject to heavy marking and cleaning. Specify a minimum eggshell finish in all classroom areas for adequate washability.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Allow full ventilation time.</strong> Even zero-VOC paints should be allowed 48 to 72 hours of full ventilation before classrooms are re-occupied by children.</p>`,
    relatedLinks: [
      { href: 'commercial-paint-calculator', label: 'Commercial Paint Calculator' },
      { href: 'office-building-paint-calculator', label: 'Office Building Paint Calculator' },
      { href: 'hotel-paint-calculator', label: 'Hotel Paint Calculator' },
      { href: 'paint-calculator-for-contractors', label: 'Paint Calculator for Contractors' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
    ],
    faqs: [
      ['How much paint does a classroom need?', 'A standard 30×30 ft classroom needs 3 to 4 gallons for two coats on walls. Add ceilings and the total is 5 to 6 gallons per classroom. A 20-classroom school needs 150 to 200 gallons for all walls.'],
      ['What paint is used in schools?', 'Zero-VOC paints are required for schools. Sherwin-Williams Harmony, Benjamin Moore Natura, and Behr Premium Plus Ultra zero VOC are the most common specifications. Eggshell for classrooms, satin for corridors.'],
      ['How much does it cost to paint a school?', 'Professional school painting costs $1.50 to $3.50 per sq ft for interior walls. A 20-classroom primary school costs $80,000 to $200,000 for a full interior repaint including all spaces.'],
      ['When should schools be painted?', 'Schools should be painted during summer holidays for minimum disruption and to allow adequate ventilation time. All painting must be completed and the building fully ventilated before students return.'],
      ['What finish paint is best for school corridors?', 'Satin or semi-gloss finish for school corridors — it is highly washable and resists scuff marks from bags and equipment. Flat paint is not suitable for school corridors.'],
      ['How often should schools be repainted?', 'Classrooms and corridors should be repainted every 5 to 7 years. High-traffic areas like corridors may need spot repainting every 2 to 3 years. Gymnasiums every 7 to 10 years.'],
    ],
  },

  // ── 5. Hotel Paint Calculator ──────────────────────────────────────────────
  {
    slug: 'hotel-paint-calculator',
    component: 'HotelPaintCalculator',
    title: 'Hotel Paint Calculator — How Much Paint for a Hotel?',
    metaDesc: 'Calculate exactly how much paint you need for a hotel including guest rooms, corridors, and public areas. Free professional estimator. No signup required.',
    h1: 'Hotel Paint Calculator',
    quickAnswer: '2 to 3 gallons per guest room',
    quickSub: 'Standard hotel room 12×18ft — two coats on all walls — 8ft ceiling',
    intro: 'A standard hotel guest room needs <strong>2 to 3 gallons</strong> for two coats on all walls. For a full hotel project, add each room type separately in the calculator below. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Add a standard guest room first, then use the room count to multiply up. Add corridors, lobby, restaurant, and bathrooms separately as they have different dimensions and finishes.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does a Hotel Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotel painting projects are large-scale commercial jobs that require careful planning by area. A typical 100-room hotel has approximately 100 guest rooms, 1,500 linear feet of corridors, a lobby, restaurant, bar, conference rooms, and back-of-house areas. Total paintable wall area in a 100-room hotel is typically 150,000 to 200,000 square feet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard hotel guest room measuring 12×18 feet with 8-foot ceilings has approximately 480 square feet of wall area. Subtract the bathroom door, entry door, and windows and the paintable wall area is around 350 to 380 square feet. At 350 square feet per gallon for two coats, each guest room needs 2 gallons of wall paint plus 1 gallon for the bathroom.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotel corridors are among the highest-traffic painted surfaces in any building and must use extremely durable scrubbable paint. A 200-foot hotel corridor with 8-foot ceilings has 3,200 square feet of wall area requiring 18 to 20 gallons for two coats of heavy-duty corridor paint.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Hotel Paint Calculator — Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">Litres (2 coats)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Guest room (standard)', '12×18 ft', '2–3 gal', '8–11 L'],
                  ['Guest bathroom', '8×6 ft', '0.8–1 gal', '3–4 L'],
                  ['Suite', '20×30 ft', '4–5 gal', '15–19 L'],
                  ['Corridor per 100ft', '100×6 ft', '9–11 gal', '34–42 L'],
                  ['Hotel lobby', '40×60 ft', '18–22 gal', '68–83 L'],
                  ['50-room hotel (all areas)', 'Full property', '250–320 gal', '950–1,200 L'],
                ].map(([area, size, gal, lit], i) => (
                  <tr key={area} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{area}</td>
                    <td className="px-4 py-3 text-gray-700">{size}</td>
                    <td className="px-4 py-3 text-gray-700">{gal}</td>
                    <td className="px-4 py-3 text-gray-700">{lit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Paint for Hotels</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotels require the most durable and washable paints available due to the constant cycle of guests and cleaning. <strong>Sherwin-Williams Duration Home</strong> and <strong>Benjamin Moore Aura Bath and Spa</strong> are among the most specified hotel guest room paints — both are highly washable, resist scuffs and marks, and maintain their appearance through hundreds of cleaning cycles.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hotel corridors require the most durable paint in the entire property. Specify <strong>Sherwin-Williams Emerald</strong> or <strong>Benjamin Moore Aura</strong> in satin finish for all corridor walls — these premium paints withstand daily cleaning and frequent contact from luggage and housekeeping trolleys.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For hotel lobbies and restaurants, the aesthetic quality of the finish is as important as durability. Premium paints with excellent colour depth and a smooth finish are essential for public-facing areas of luxury and mid-scale hotels.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Hotel Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Paint rooms in rotation.</strong> Hotels rarely close for full repaints. Work with hotel management to paint rooms in rotation — typically 5 to 10 rooms per week during lower occupancy periods.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Use consistent guest room colours.</strong> Standardise guest room colours across the property to simplify maintenance and touch-up. Keep paint records for every area including exact colour code and batch numbers.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Specify scrubbable finishes everywhere.</strong> Even in areas that appear low-traffic, hotel cleaning standards require scrubbable finishes. Never specify flat paint in any guest-facing area of a hotel.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Budget for frequent corridor repainting.</strong> Hotel corridors receive extreme wear and typically need repainting every 3 to 5 years. Guest rooms last 5 to 7 years with quality paint.</p>`,
    relatedLinks: [
      { href: 'commercial-paint-calculator', label: 'Commercial Paint Calculator' },
      { href: 'office-building-paint-calculator', label: 'Office Building Paint Calculator' },
      { href: 'school-paint-calculator', label: 'School Paint Calculator' },
      { href: 'paint-calculator-for-contractors', label: 'Paint Calculator for Contractors' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
    ],
    faqs: [
      ['How much paint does a hotel room need?', 'A standard 12×18 ft guest room needs 2 to 3 gallons for two coats on walls. Add 1 gallon for the bathroom. A 100-room hotel needs 300 to 400 gallons for guest rooms alone plus corridors and public areas.'],
      ['What paint do hotels use?', 'Sherwin-Williams Duration Home and Benjamin Moore Aura are the most specified hotel paints. Satin finish for corridors and bathrooms, eggshell for guest rooms. Always scrubbable — never flat paint in guest-facing areas.'],
      ['How much does it cost to paint a hotel?', 'Professional hotel painting costs $2 to $5 per sq ft. A 100-room hotel full repaint costs $150,000 to $400,000 including all guest rooms, corridors, and public areas.'],
      ['How often do hotels repaint?', 'Guest rooms are repainted every 5 to 7 years. Hotel corridors every 3 to 5 years due to heavy wear. Lobby and restaurant every 7 to 10 years. Regular touch-up maintenance extends time between full repaints.'],
      ['Can hotels stay open during repainting?', 'Yes — hotels typically repaint in rotation, completing 5 to 10 rooms per week during lower occupancy periods. Public areas are painted overnight or during closed periods.'],
      ['What colour should hotel walls be?', 'Warm neutrals for guest rooms — beige, greige, and warm white create a welcoming calming environment. Brand colours feature in lobbies and corridors. Consistency across all guest rooms is essential for brand standards.'],
    ],
  },

  // ── 6. Industrial Paint Calculator ────────────────────────────────────────
  {
    slug: 'industrial-paint-calculator',
    component: 'IndustrialPaintCalculator',
    title: 'Industrial Paint Calculator — How Much Paint for Industrial Facilities?',
    metaDesc: 'Calculate exactly how much industrial paint or coating you need for factories, plants, and industrial facilities. Free professional estimator. No signup required.',
    h1: 'Industrial Paint Calculator',
    quickAnswer: '1 gallon per 150–200 sq ft on steel and concrete',
    quickSub: 'Industrial epoxy or alkyd coating — two coats — standard industrial coverage',
    intro: 'Industrial coatings cover <strong>150 to 200 square feet per gallon</strong> on steel and concrete surfaces — significantly less than standard paint due to the high-build films required for corrosion protection. Enter your facility dimensions below for an exact estimate. Free, no signup required.',
    tip: '💡 <strong>Tip:</strong> Use the <strong>Enter wall area directly</strong> option and enter your total surface area in square feet. Industrial coatings are applied at much heavier film thicknesses than standard paint — always follow the manufacturer\'s specified spread rate.',
    body: `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How Much Paint Does an Industrial Facility Need?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Industrial painting differs fundamentally from commercial and residential painting in its primary purpose — protection rather than decoration. Industrial coatings must resist corrosion, chemical exposure, abrasion, extreme temperatures, and UV degradation. These protective requirements mean industrial coatings are applied at much higher film thicknesses than standard paint, resulting in lower coverage rates per gallon.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            A standard industrial coating system for steel structures consists of three coats — a zinc-rich primer for corrosion protection at 100 to 150 sq ft per gallon, an epoxy intermediate coat at 150 to 200 sq ft per gallon, and a polyurethane topcoat at 200 to 250 sq ft per gallon. The full three-coat system for 1,000 square feet of steel structure requires 15 to 25 gallons total across all coats.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For industrial floor coatings, heavy-duty epoxy systems achieve 150 to 200 square feet per gallon at the required film thickness for forklift and chemical resistance. Thinner decorative epoxy floor coatings achieve 200 to 300 square feet per gallon but provide less protection in demanding environments.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Industrial Paint Coverage Reference Table</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Coating Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Coverage/Gallon</th>
                  <th className="px-4 py-3 text-left font-semibold">Coats</th>
                  <th className="px-4 py-3 text-left font-semibold">1,000 sq ft Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Zinc-rich primer (steel)', '100–150 sq ft', '1', '7–10 gal'],
                  ['Epoxy intermediate coat', '150–200 sq ft', '1', '5–7 gal'],
                  ['Polyurethane topcoat', '200–250 sq ft', '1', '4–5 gal'],
                  ['Heavy-duty floor epoxy', '150–200 sq ft', '2', '10–14 gal'],
                  ['Chemical resistant epoxy', '100–150 sq ft', '2', '14–20 gal'],
                  ['Industrial wall coating', '200–300 sq ft', '2', '7–10 gal'],
                ].map(([type, coverage, coats, total], i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white border-b border-gray-100' : 'bg-gray-50 border-b border-gray-100'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                    <td className="px-4 py-3 text-gray-700">{coverage}</td>
                    <td className="px-4 py-3 text-gray-700">{coats}</td>
                    <td className="px-4 py-3 text-gray-700">{total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Industrial Paint Products</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Sherwin-Williams Macropoxy 646</strong> is the most widely used industrial epoxy coating for steel and concrete structures. <strong>Rust-Oleum Industrial High Performance Epoxy</strong> is a popular choice for industrial floors and walls requiring chemical resistance. <strong>Jotun Jotamastic</strong> and <strong>International Paint Intergard</strong> are the leading marine and offshore industrial coating systems.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For industrial floors with heavy forklift traffic and chemical spill exposure, <strong>Sherwin-Williams ArmorSeal 1000 HS</strong> and <strong>Rust-Oleum EpoxyShield Professional Grade Floor Coating</strong> provide the best combination of chemical resistance, abrasion resistance, and durability.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Surface Preparation for Industrial Painting</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Surface preparation is the most critical step in industrial painting — accounting for 60 to 80% of the total coating system cost and effort. The most common cause of industrial coating failure is inadequate surface preparation, not coating quality.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Steel surfaces must be blast-cleaned to SSPC-SP6 (Commercial Blast) minimum for most industrial coatings, and SSPC-SP10 (Near-White Blast) for high-performance and chemical-resistant systems. Concrete surfaces must be mechanically prepared by shot-blasting or scarifying to achieve the required surface profile for epoxy adhesion.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Industrial Painting Tips</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Always follow manufacturer spread rates.</strong> Industrial coatings must be applied at specified dry film thickness (DFT) to achieve their rated performance. Spreading too thin voids all performance guarantees.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Surface preparation determines coating life.</strong> Invest in proper blast cleaning and surface preparation. A premium coating on poorly prepared steel will fail within 2 to 3 years. The same coating on properly prepared steel lasts 15 to 20 years.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Monitor temperature and humidity during application.</strong> Most industrial coatings have strict application temperature and humidity requirements. Apply outside these parameters and the coating will not cure correctly.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Use wet film thickness gauges.</strong> Professional industrial applicators use wet film thickness gauges during application to ensure the correct film thickness is being achieved at every pass.</p>`,
    relatedLinks: [
      { href: 'warehouse-paint-calculator', label: 'Warehouse Paint Calculator' },
      { href: 'commercial-paint-calculator', label: 'Commercial Paint Calculator' },
      { href: 'paint-calculator-for-contractors', label: 'Paint Calculator for Contractors' },
      { href: 'paint-coverage-calculator', label: 'Paint Coverage Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
    ],
    faqs: [
      ['How much industrial paint do I need?', 'Industrial coatings cover 100 to 250 sq ft per gallon depending on the system. A full three-coat system on 1,000 sq ft of steel needs 15 to 25 gallons total. Always follow the manufacturer\'s specified spread rate.'],
      ['What is the best industrial paint?', 'Sherwin-Williams Macropoxy 646 for general industrial use, Rust-Oleum Industrial High Performance Epoxy for floors, Jotun Jotamastic for offshore and marine environments.'],
      ['How long does industrial paint last?', 'A properly applied industrial coating system on correctly prepared steel lasts 15 to 20 years. The same system on poorly prepared steel fails in 2 to 3 years. Surface preparation is the critical factor.'],
      ['How do you prepare surfaces for industrial painting?', 'Steel must be blast-cleaned to SSPC-SP6 minimum. Concrete must be shot-blasted or scarified. All oil, grease, and contamination must be removed before blasting. Surface profile must meet the coating specification requirements.'],
      ['How much does industrial painting cost?', 'Industrial painting costs $3 to $10 per sq ft depending on the coating system and surface preparation required. High-performance chemical-resistant systems with full blast cleaning cost $8 to $15 per sq ft.'],
      ['What is the difference between industrial and commercial paint?', 'Industrial coatings are designed for protection — corrosion resistance, chemical resistance, abrasion resistance — and are applied at much higher film thicknesses. Commercial paint is designed for appearance and washability in occupied buildings.'],
    ],
  },

];

// ─── Page template (same as generate-pages.js) ───────────────────────────────
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
      ? 'https://thepaintcalculator.com/${page.slug}'
      : \`https://thepaintcalculator.com/\${locale}/${page.slug}\`;
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
      { '@type': 'ListItem', position: 2, name: '${page.h1}', item: 'https://thepaintcalculator.com/${page.slug}' },
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
console.log('  git commit -m "feat: add commercial calculator pages"');
console.log('  git push');
console.log('─────────────────────────────────────────\n');
