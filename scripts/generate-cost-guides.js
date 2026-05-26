const fs = require('fs');
const path = require('path');

const pages = [

  // ── 1 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'how-much-does-it-cost-to-paint-a-room',
    functionName: 'CostToPaintRoom',
    title: 'How Much Does It Cost to Paint a Room? | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a room in 2026. DIY vs professional costs, paint prices, and money-saving tips.',
    h1: 'How Much Does It Cost to Paint a Room?',
    breadcrumb: 'Cost to Paint a Room',
    quickAnswer: '$150 to $800 professional / $50 to $150 DIY',
    quickAnswerSub: 'For an average 12×14 room — walls only, two coats',
    introPara: 'The cost to paint an average room ranges from <strong>$50 to $150 for DIY</strong> and <strong>$150 to $800 for a professional painter</strong>. Room size, paint quality, and whether you include ceiling and trim significantly affect the total.',
    articleSchema: {
      headline: 'How Much Does It Cost to Paint a Room?',
      description: 'Complete 2026 cost guide for painting a room — DIY vs professional, paint costs, labour rates, and money-saving tips.',
    },
    sections: [
      {
        h2: 'Room Painting Cost by Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Room Size</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Includes</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Small 10×10</td><td class="px-4 py-3 text-gray-700">$40–$80</td><td class="px-4 py-3 text-gray-700">$150–$350</td><td class="px-4 py-3 text-gray-700">Walls only</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Average 12×14</td><td class="px-4 py-3 text-gray-700">$60–$120</td><td class="px-4 py-3 text-gray-700">$250–$600</td><td class="px-4 py-3 text-gray-700">Walls only</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Large 15×20</td><td class="px-4 py-3 text-gray-700">$100–$180</td><td class="px-4 py-3 text-gray-700">$400–$900</td><td class="px-4 py-3 text-gray-700">Walls only</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">With ceiling + trim</td><td class="px-4 py-3 text-gray-700">+$30–$60</td><td class="px-4 py-3 text-gray-700">+$100–$250</td><td class="px-4 py-3 text-gray-700">Add to above</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'What Affects the Cost to Paint a Room?',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Room size.</strong> The biggest factor. More wall area means more paint and more labour time. Painters typically charge $2–$6 per square foot of wall area.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Paint quality.</strong> Budget paint costs $20–$30 per gallon. Premium paints (Benjamin Moore Aura, Sherwin-Williams Emerald) cost $60–$90 per gallon. For an average room, this is a $40–$100 difference in paint cost alone.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Number of coats.</strong> Two coats are standard. A dramatic colour change requiring three coats adds 30–50% to labour time and paint cost.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Ceiling and trim.</strong> Adding ceiling painting typically adds $50–$150 to professional cost. Trim painting adds $75–$200 depending on the amount of trim.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Location.</strong> Labour rates vary significantly by region. Professional painters in major metropolitan areas charge 30–50% more than rural areas.</p>`,
      },
      {
        h2: 'DIY vs Professional — True Cost Comparison',
        content: `<p class="text-gray-700 leading-relaxed mb-4">DIY painting saves 60–70% compared to hiring professionals. For an average 12×14 bedroom, professional painting costs $250–$600 vs $60–$120 DIY. However, DIY requires your time — typically a full day for an average room.</p>
          <p class="text-gray-700 leading-relaxed mb-4">Professional painters include all prep work in their quote — filling holes, sanding, priming, and masking. First-time DIY painters often underestimate the time and cost of prep materials (tape, drop cloths, spackle, sandpaper) which add $30–$60 to the DIY cost.</p>`,
      },
      {
        h2: 'Money-Saving Tips for Painting a Room',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Do the prep yourself.</strong> If hiring professionals, offer to move furniture and do the prep work yourself. Many painters will reduce their quote by $50–$100.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Buy paint during sales.</strong> Major paint brands run 30–40% off sales several times a year. Stock up on frequently used colours when sales occur.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Use a tinted primer for dramatic colour changes.</strong> A $15–$20 quart of tinted primer can eliminate the need for a third topcoat, saving the cost of an extra gallon.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Get multiple quotes.</strong> Professional painter prices vary significantly. Get at least three quotes for any room — prices often differ by 30–50% for identical work.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-to-calculate-paint-for-a-room', label: 'How to Calculate Paint for a Room' },
      { href: 'cost-to-paint-bedroom', label: 'Cost to Paint a Bedroom' },
      { href: 'cost-to-paint-living-room', label: 'Cost to Paint a Living Room' },
      { href: 'bedroom-paint-calculator', label: 'Bedroom Paint Calculator' },
      { href: 'how-many-gallons-of-paint-for-a-room', label: 'How Many Gallons of Paint for a Room?' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a room professionally?', a: 'Professional painters charge $150–$800 for an average room depending on size. An average 12×14 bedroom typically costs $250–$600 including labour and paint.' },
      { q: 'How much does it cost to paint a room yourself?', a: 'DIY painting an average room costs $60–$120 in paint plus $30–$60 in supplies (tape, drop cloths, rollers, brushes). Total DIY cost is typically $80–$180 per room.' },
      { q: 'How much do painters charge per square foot?', a: 'Professional painters typically charge $2–$6 per square foot of wall area including labour and paint. The rate varies by region, with metropolitan areas at the higher end.' },
      { q: 'Is it worth hiring a professional painter?', a: 'Professional painters work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. Worth it for large spaces, difficult prep situations, or when your time has high value.' },
      { q: 'How much does paint cost per gallon?', a: 'Paint costs $20–$35 per gallon for budget brands and $55–$90 per gallon for premium paints like Benjamin Moore Aura or Sherwin-Williams Emerald.' },
      { q: 'Does the type of paint finish affect cost?', a: 'Finish type has minimal impact on paint cost — most brands charge the same price across finishes. Semi-gloss trim paint may cost slightly more than flat ceiling paint in some product lines.' },
    ],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-bedroom',
    functionName: 'CostToPaintBedroom',
    title: 'Cost to Paint a Bedroom in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a bedroom in 2026. DIY and professional cost estimates for all bedroom sizes.',
    h1: 'Cost to Paint a Bedroom in 2026',
    breadcrumb: 'Cost to Paint a Bedroom',
    quickAnswer: '$200 to $600 professional / $60 to $120 DIY',
    quickAnswerSub: 'For a standard 12×14 bedroom — walls, two coats',
    introPara: 'The cost to paint a standard 12×14 bedroom ranges from <strong>$60 to $120 DIY</strong> and <strong>$200 to $600 professionally</strong>. Master bedrooms and rooms requiring ceiling and trim painting cost more.',
    articleSchema: {
      headline: 'Cost to Paint a Bedroom in 2026',
      description: '2026 cost guide for painting a bedroom — all sizes, DIY vs professional, and what affects the price.',
    },
    sections: [
      {
        h2: 'Bedroom Painting Cost by Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Bedroom Size</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Small 10×10</td><td class="px-4 py-3 text-gray-700">$40–$80</td><td class="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Standard 12×12</td><td class="px-4 py-3 text-gray-700">$55–$100</td><td class="px-4 py-3 text-gray-700">$200–$450</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Standard 12×14</td><td class="px-4 py-3 text-gray-700">$60–$120</td><td class="px-4 py-3 text-gray-700">$200–$600</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Large 14×16</td><td class="px-4 py-3 text-gray-700">$80–$150</td><td class="px-4 py-3 text-gray-700">$300–$700</td></tr>
                <tr class="bg-white"><td class="px-4 py-3 font-medium text-gray-800">Master 16×20</td><td class="px-4 py-3 text-gray-700">$120–$200</td><td class="px-4 py-3 text-gray-700">$450–$1,000</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'What is Included in a Bedroom Paint Quote?',
        content: `<p class="text-gray-700 leading-relaxed mb-4">A standard professional bedroom painting quote includes all labour, primer if needed, two coats of wall paint, masking, prep work (filling small holes, light sanding), and cleanup. It typically does not include the ceiling, trim, or doors unless specifically requested — always confirm what is included before signing.</p>
          <p class="text-gray-700 leading-relaxed mb-4">Adding the ceiling to a bedroom paint job typically costs an extra $75–$200 professionally and $20–$40 in extra paint for DIY. Adding the trim and baseboards adds another $75–$200 professionally.</p>`,
      },
      {
        h2: 'DIY Bedroom Painting — Full Cost Breakdown',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Item</th>
                <th class="px-4 py-3 text-left font-semibold">Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Notes</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Wall paint (2 gal)</td><td class="px-4 py-3 text-gray-700">$50–$160</td><td class="px-4 py-3 text-gray-700">Budget to premium</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Roller + tray</td><td class="px-4 py-3 text-gray-700">$10–$25</td><td class="px-4 py-3 text-gray-700">Reusable</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Angled brush</td><td class="px-4 py-3 text-gray-700">$8–$18</td><td class="px-4 py-3 text-gray-700">Reusable</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Painter's tape</td><td class="px-4 py-3 text-gray-700">$6–$12</td><td class="px-4 py-3 text-gray-700">Per room</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Drop cloths</td><td class="px-4 py-3 text-gray-700">$8–$20</td><td class="px-4 py-3 text-gray-700">Reusable</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">Spackle + sandpaper</td><td class="px-4 py-3 text-gray-700">$5–$15</td><td class="px-4 py-3 text-gray-700">Prep materials</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'How to Save Money on Bedroom Painting',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Paint yourself.</strong> DIY saves $150–$500 compared to professional painting for a standard bedroom. The job takes one full day but requires no special skills.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Choose the right colour first time.</strong> Colour changes require extra coats and more paint. Spend time testing before committing — it saves money and effort.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Reuse tools.</strong> Rollers, brushes, and drop cloths can be reused for years. Clean them properly after each use and the first-time tool investment spreads across many projects.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'bedroom-paint-calculator', label: 'Bedroom Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-much-does-it-cost-to-paint-a-room', label: 'How Much Does It Cost to Paint a Room?' },
      { href: 'how-much-paint-for-a-bedroom', label: 'How Much Paint for a Bedroom?' },
      { href: 'how-many-gallons-of-paint-for-a-room', label: 'How Many Gallons of Paint for a Room?' },
      { href: 'cost-to-paint-living-room', label: 'Cost to Paint a Living Room' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a bedroom?', a: 'A standard 12×14 bedroom costs $200–$600 professionally and $60–$120 DIY for walls only. Adding ceiling and trim increases both DIY and professional costs.' },
      { q: 'How long does it take to paint a bedroom?', a: 'A professional takes 2–4 hours for a standard bedroom. A DIYer takes a full day including prep, two coats, and drying time between coats.' },
      { q: 'Does the painter supply the paint?', a: 'It varies — some painters include paint in their quote, others charge labour only and you supply paint. Always clarify this before agreeing to a quote.' },
      { q: 'How much does it cost to paint a master bedroom?', a: 'A master bedroom (16×20 or larger) costs $450–$1,000 professionally and $120–$200 DIY. Large rooms with tall ceilings or complex prep cost more.' },
      { q: 'Is it cheaper to hire a painter or DIY?', a: 'DIY is consistently 60–70% cheaper than professional painting. The trade-off is your time — an average bedroom takes a full day for a careful DIYer.' },
      { q: 'How much does it cost to paint a bedroom ceiling?', a: 'Adding ceiling painting to a bedroom job costs $75–$200 more professionally and $20–$40 more in paint for DIY.' },
    ],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-exterior-house',
    functionName: 'CostToPaintExteriorHouse',
    title: 'Cost to Paint Exterior of House in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint the exterior of a house in 2026. Cost per sq ft, total estimates by home size, and DIY vs professional comparison.',
    h1: 'Cost to Paint Exterior of House in 2026',
    breadcrumb: 'Cost to Paint Exterior of House',
    quickAnswer: '$1,800 to $5,000 professional / $400 to $1,200 DIY',
    quickAnswerSub: 'For a typical 1,500–2,000 sq ft home — two coats on siding',
    introPara: 'The cost to paint the exterior of a typical home ranges from <strong>$400 to $1,200 for DIY</strong> and <strong>$1,800 to $5,000 for a professional crew</strong>. Home size, siding type, number of storeys, and surface condition are the main cost drivers.',
    articleSchema: {
      headline: 'Cost to Paint Exterior of House in 2026',
      description: '2026 guide to exterior house painting costs — professional and DIY estimates by home size with cost breakdown.',
    },
    sections: [
      {
        h2: 'Exterior House Painting Cost by Home Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Home Size</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td class="px-4 py-3 text-gray-700">$250–$600</td><td class="px-4 py-3 text-gray-700">$1,000–$2,500</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td class="px-4 py-3 text-gray-700">$400–$900</td><td class="px-4 py-3 text-gray-700">$1,800–$3,500</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td class="px-4 py-3 text-gray-700">$600–$1,200</td><td class="px-4 py-3 text-gray-700">$2,500–$5,000</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td class="px-4 py-3 text-gray-700">$800–$1,600</td><td class="px-4 py-3 text-gray-700">$3,500–$7,000</td></tr>
                <tr class="bg-white"><td class="px-4 py-3 font-medium text-gray-800">3,000 sq ft</td><td class="px-4 py-3 text-gray-700">$1,000–$2,000</td><td class="px-4 py-3 text-gray-700">$4,500–$9,000</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'What Affects Exterior Painting Cost?',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Siding type.</strong> Smooth vinyl siding is the cheapest to paint. Rough wood, stucco, and brick absorb significantly more paint and take longer — adding 30–50% to both material and labour costs.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Number of storeys.</strong> Two and three storey homes require ladders, scaffolding, or lift equipment — adding $500–$2,000 to professional labour.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Surface prep.</strong> Peeling paint, rot repair, power washing, and caulking gaps all add to the cost. Homes with extensive prep needs can see prep costs equal to or exceed the painting cost.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Number of colours.</strong> A second colour for trim, shutters, or accents adds masking time and cost. Each additional colour typically adds $200–$500 to a professional job.</p>`,
      },
      {
        h2: 'Exterior Paint Cost Breakdown',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Cost Component</th>
                <th class="px-4 py-3 text-left font-semibold">DIY (1,500 sq ft)</th>
                <th class="px-4 py-3 text-left font-semibold">Professional (1,500 sq ft)</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Exterior paint (10 gal)</td><td class="px-4 py-3 text-gray-700">$300–$800</td><td class="px-4 py-3 text-gray-700">Included</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Primer (3 gal)</td><td class="px-4 py-3 text-gray-700">$60–$120</td><td class="px-4 py-3 text-gray-700">Included</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Tools & equipment</td><td class="px-4 py-3 text-gray-700">$50–$200</td><td class="px-4 py-3 text-gray-700">Included</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Labour</td><td class="px-4 py-3 text-gray-700">Your time (2–4 days)</td><td class="px-4 py-3 text-gray-700">$1,200–$2,500</td></tr>
                <tr class="bg-white"><td class="px-4 py-3 font-medium text-gray-800">Total estimate</td><td class="px-4 py-3 text-gray-700">$410–$1,120</td><td class="px-4 py-3 text-gray-700">$1,800–$3,500</td></tr>
              </tbody>
            </table>
          </div>`,
      },
    ],
    relatedLinks: [
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'whole-house-paint-calculator', label: 'Whole House Paint Calculator' },
      { href: 'best-exterior-paint-for-houses', label: 'Best Exterior Paint for Houses' },
      { href: 'how-much-paint-for-a-2000-sq-ft-house', label: 'How Much Paint for a 2000 Sq Ft House?' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'cost-to-paint-whole-house-interior', label: 'Cost to Paint Whole House Interior' },
    ],
    faqs: [
      { q: 'How much does it cost to paint the exterior of a house?', a: 'A typical 1,500–2,000 sq ft home costs $1,800–$5,000 professionally and $400–$1,200 DIY for two coats on the siding.' },
      { q: 'How much do painters charge per sq ft for exterior?', a: 'Professional exterior painters charge $1.50–$4 per square foot of siding area including labour and paint.' },
      { q: 'How long does exterior house painting last?', a: 'Quality exterior paint properly applied lasts 7–15 years. Cheap paint or poor prep leads to peeling within 3–5 years.' },
      { q: 'Can I paint the exterior of my house myself?', a: 'Yes — DIY exterior painting is feasible for a one-storey home. Two-storey homes require scaffolding or tall ladders which add safety risks and equipment cost.' },
      { q: 'What is the best time of year to paint the exterior?', a: 'Late spring and early autumn — mild temperatures between 50°F and 85°F with low humidity and no rain forecast for 24–48 hours after application.' },
      { q: 'How many gallons of paint for house exterior?', a: 'A 1,500 sq ft home needs 7–10 gallons. A 2,000 sq ft home needs 10–14 gallons for two coats. Use the exterior paint calculator for your specific home size.' },
    ],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-kitchen-cabinets',
    functionName: 'CostToPaintKitchenCabinets',
    title: 'Cost to Paint Kitchen Cabinets in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint kitchen cabinets in 2026. Professional and DIY cost estimates, what affects price, and money-saving tips.',
    h1: 'Cost to Paint Kitchen Cabinets in 2026',
    breadcrumb: 'Cost to Paint Kitchen Cabinets',
    quickAnswer: '$900 to $3,800 professional / $200 to $600 DIY',
    quickAnswerSub: 'For an average kitchen with 20–30 cabinet doors',
    introPara: 'The cost to paint kitchen cabinets ranges from <strong>$200 to $600 for DIY</strong> and <strong>$900 to $3,800 for a professional</strong>. Cabinet painting is one of the highest-ROI home improvements — a fraction of the cost of new cabinets with a similarly dramatic result.',
    articleSchema: {
      headline: 'Cost to Paint Kitchen Cabinets in 2026',
      description: '2026 cost guide for kitchen cabinet painting — professional vs DIY, cost per door, and full project estimates.',
    },
    sections: [
      {
        h2: 'Cabinet Painting Cost by Kitchen Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Kitchen Size</th>
                <th class="px-4 py-3 text-left font-semibold">Doors</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Small kitchen</td><td class="px-4 py-3 text-gray-700">10–15 doors</td><td class="px-4 py-3 text-gray-700">$150–$300</td><td class="px-4 py-3 text-gray-700">$600–$1,500</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Medium kitchen</td><td class="px-4 py-3 text-gray-700">20–25 doors</td><td class="px-4 py-3 text-gray-700">$250–$450</td><td class="px-4 py-3 text-gray-700">$1,200–$2,500</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Large kitchen</td><td class="px-4 py-3 text-gray-700">30–40 doors</td><td class="px-4 py-3 text-gray-700">$400–$700</td><td class="px-4 py-3 text-gray-700">$2,000–$3,800</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">Per door (professional)</td><td class="px-4 py-3 text-gray-700">—</td><td class="px-4 py-3 text-gray-700">—</td><td class="px-4 py-3 text-gray-700">$60–$120 per door</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'Cabinet Painting vs New Cabinets — Cost Comparison',
        content: `<p class="text-gray-700 leading-relaxed mb-4">New kitchen cabinets cost $5,000–$25,000 installed depending on material and quality. Professional cabinet painting costs $900–$3,800. DIY cabinet painting costs $200–$600. Painting is the most cost-effective way to transform a kitchen — achieving 70–80% of the visual impact of new cabinets for 10–20% of the cost.</p>
          <p class="text-gray-700 leading-relaxed mb-4">Cabinet refacing (replacing doors while keeping boxes) costs $4,000–$12,000 — still significantly more than painting for a similar visual result.</p>`,
      },
      {
        h2: 'What is Included in a Professional Cabinet Painting Quote?',
        content: `<p class="text-gray-700 leading-relaxed mb-4">A complete professional cabinet painting job includes removing all doors and hardware, degreasing and sanding, applying primer, two topcoats on doors and box fronts, and reinstalling. Some painters spray doors off-site for a smoother finish — this typically costs more but produces a better result.</p>
          <p class="text-gray-700 leading-relaxed mb-4">Always ask whether the quote includes hardware reinstallation and whether doors will be sprayed or brush/roller applied. Spray application typically adds 20–30% to cost but produces a significantly better finish.</p>`,
      },
      {
        h2: 'DIY Cabinet Painting Cost Breakdown',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Cabinet paint (1–2 gallons): $60–$180.</strong> Use Benjamin Moore Advance or Sherwin-Williams Emerald Urethane for the best results.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Cabinet primer (1 quart): $15–$25.</strong> Essential for adhesion, especially over previously painted or laminate surfaces.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Deglosser/TSP cleaner: $10–$20.</strong> Removes grease and prepares the surface for primer.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Sandpaper, foam rollers, brushes: $20–$50.</strong> Use 220-grit between coats for a smooth finish.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'cabinet-paint-calculator', label: 'Cabinet Paint Calculator' },
      { href: 'how-much-paint-for-kitchen-cabinets', label: 'How Much Paint for Kitchen Cabinets?' },
      { href: 'best-paint-for-kitchen-cabinets', label: 'Best Paint for Kitchen Cabinets' },
      { href: 'kitchen-paint-calculator', label: 'Kitchen Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-much-does-it-cost-to-paint-a-room', label: 'How Much Does It Cost to Paint a Room?' },
    ],
    faqs: [
      { q: 'How much does it cost to paint kitchen cabinets?', a: 'Professional cabinet painting costs $900–$3,800 for an average kitchen. DIY costs $200–$600 in materials. The cost per door is typically $60–$120 professionally.' },
      { q: 'Is it worth painting kitchen cabinets?', a: 'Yes — cabinet painting delivers one of the highest ROIs of any home improvement. It costs 10–20% of new cabinets while achieving 70–80% of the visual impact.' },
      { q: 'How long does it take to paint kitchen cabinets?', a: 'A professional takes 2–3 days for an average kitchen. DIY typically takes a full weekend plus additional drying time between coats.' },
      { q: 'How long do painted kitchen cabinets last?', a: 'Professionally painted cabinets using quality enamel last 7–10 years with normal use. DIY results vary based on prep quality and paint choice.' },
      { q: 'Should I paint or replace kitchen cabinets?', a: 'If the cabinet boxes are in good structural condition, painting is almost always the right choice — significantly cheaper with excellent results.' },
      { q: 'What colour is most popular for kitchen cabinets?', a: 'White and off-white remain the most popular cabinet colours, followed by navy blue, sage green, and warm grey. Two-tone kitchens (white uppers, colour lowers) are increasingly popular.' },
    ],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-living-room',
    functionName: 'CostToPaintLivingRoom',
    title: 'Cost to Paint a Living Room in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a living room in 2026. DIY and professional cost estimates for all living room sizes.',
    h1: 'Cost to Paint a Living Room in 2026',
    breadcrumb: 'Cost to Paint a Living Room',
    quickAnswer: '$300 to $900 professional / $80 to $200 DIY',
    quickAnswerSub: 'For a standard 15×20 living room — walls, two coats',
    introPara: 'The cost to paint a standard 15×20 living room ranges from <strong>$80 to $200 for DIY</strong> and <strong>$300 to $900 professionally</strong>. Open-plan living areas with high ceilings and large wall areas cost significantly more.',
    articleSchema: {
      headline: 'Cost to Paint a Living Room in 2026',
      description: '2026 cost guide for painting a living room — DIY vs professional estimates for all living room sizes.',
    },
    sections: [
      {
        h2: 'Living Room Painting Cost by Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Living Room Size</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Small 12×15</td><td class="px-4 py-3 text-gray-700">$60–$120</td><td class="px-4 py-3 text-gray-700">$250–$550</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Standard 15×18</td><td class="px-4 py-3 text-gray-700">$90–$160</td><td class="px-4 py-3 text-gray-700">$300–$700</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Standard 15×20</td><td class="px-4 py-3 text-gray-700">$100–$180</td><td class="px-4 py-3 text-gray-700">$350–$850</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Large 18×24</td><td class="px-4 py-3 text-gray-700">$150–$250</td><td class="px-4 py-3 text-gray-700">$500–$1,200</td></tr>
                <tr class="bg-white"><td class="px-4 py-3 font-medium text-gray-800">Open plan 20×30</td><td class="px-4 py-3 text-gray-700">$200–$380</td><td class="px-4 py-3 text-gray-700">$700–$1,800</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'Additional Living Room Painting Costs',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Accent wall.</strong> Adding a feature or accent wall in a different colour typically adds $50–$150 professionally and $15–$30 in extra paint for DIY.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Ceiling.</strong> Painting a 15×20 living room ceiling adds $100–$250 professionally and $25–$50 in extra ceiling paint for DIY.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Trim and baseboards.</strong> A living room with extensive trim and baseboards adds $100–$300 professionally. Semi-gloss trim paint for DIY adds $20–$40.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>High or vaulted ceilings.</strong> Rooms with 10ft+ or vaulted ceilings require ladders or scaffolding. Professional labour adds $100–$300 for the extra height.</p>`,
      },
      {
        h2: 'Living Room Accent Wall Cost',
        content: `<p class="text-gray-700 leading-relaxed mb-4">A single 15ft accent wall in a contrasting colour costs $50–$150 professionally and $15–$30 in paint for DIY. An accent wall is the most cost-effective way to add drama to a living room — one quart of paint is often enough for two coats on a standard accent wall.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'living-room-paint-calculator', label: 'Living Room Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-much-paint-for-a-living-room', label: 'How Much Paint for a Living Room?' },
      { href: 'cost-to-paint-bedroom', label: 'Cost to Paint a Bedroom' },
      { href: 'how-much-does-it-cost-to-paint-a-room', label: 'How Much Does It Cost to Paint a Room?' },
      { href: 'how-to-choose-paint-color-for-a-room', label: 'How to Choose Paint Color for a Room' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a living room?', a: 'A standard 15×20 living room costs $350–$850 professionally and $100–$180 DIY for walls only with two coats.' },
      { q: 'How much paint does a living room need?', a: 'A 15×20 living room needs about 3 gallons for two coats on the walls. Use the living room paint calculator for your exact dimensions.' },
      { q: 'How long does it take to paint a living room?', a: 'A professional takes 4–6 hours for an average living room. A DIYer should allow a full day including prep, two coats, and drying time.' },
      { q: 'Should I paint living room walls and ceiling the same colour?', a: 'Matching ceiling to walls creates a cocooning effect popular in formal living rooms. White or off-white ceilings are more common and make the room feel taller and brighter.' },
      { q: 'How much does an accent wall cost to paint?', a: 'A living room accent wall costs $50–$150 professionally and $15–$30 in paint for DIY — making it one of the most affordable ways to transform a room.' },
      { q: 'What is the most popular living room paint colour?', a: 'Warm neutrals dominate — SW Agreeable Gray, BM Revere Pewter, and BM Classic Gray are consistently top sellers. Warm greiges suit most living rooms and furniture combinations.' },
    ],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-bathroom',
    functionName: 'CostToPaintBathroom',
    title: 'Cost to Paint a Bathroom in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a bathroom in 2026. DIY and professional estimates for small and large bathrooms.',
    h1: 'Cost to Paint a Bathroom in 2026',
    breadcrumb: 'Cost to Paint a Bathroom',
    quickAnswer: '$150 to $400 professional / $40 to $90 DIY',
    quickAnswerSub: 'For an average 5×8 bathroom — walls, two coats',
    introPara: 'Bathrooms are the most affordable room to paint due to their small size. An average 5×8 bathroom costs <strong>$40 to $90 DIY</strong> and <strong>$150 to $400 professionally</strong>. The key cost is using the right moisture-resistant paint.',
    articleSchema: {
      headline: 'Cost to Paint a Bathroom in 2026',
      description: '2026 cost guide for painting a bathroom — small and large bathroom estimates, DIY vs professional.',
    },
    sections: [
      {
        h2: 'Bathroom Painting Cost by Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Bathroom Size</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Small 5×8</td><td class="px-4 py-3 text-gray-700">$30–$70</td><td class="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Average 8×10</td><td class="px-4 py-3 text-gray-700">$50–$100</td><td class="px-4 py-3 text-gray-700">$200–$450</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Large 10×12</td><td class="px-4 py-3 text-gray-700">$70–$140</td><td class="px-4 py-3 text-gray-700">$250–$550</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">Master bath 12×14</td><td class="px-4 py-3 text-gray-700">$100–$180</td><td class="px-4 py-3 text-gray-700">$350–$700</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'Why Bathroom Paint Costs More Per Sq Ft',
        content: `<p class="text-gray-700 leading-relaxed mb-4">Professional painters often charge a minimum call-out fee regardless of room size — meaning a small bathroom costs more per square foot than a large living room. A minimum charge of $150–$200 is common even for the smallest bathroom.</p>
          <p class="text-gray-700 leading-relaxed mb-4">Bathroom-specific moisture-resistant paints also cost more than standard wall paint — typically $40–$65 per gallon vs $25–$40 for standard latex. The premium is worth paying — standard paint in a bathroom will fail within 1–2 years.</p>`,
      },
      {
        h2: 'DIY Bathroom Painting — Is It Worth It?',
        content: `<p class="text-gray-700 leading-relaxed mb-4">Bathrooms are ideal DIY painting projects because of their small size. One gallon of bathroom paint costs $40–$65 and covers a small bathroom for two coats. A small bathroom can be painted in 2–3 hours including prep — making DIY very practical even for beginners.</p>
          <p class="text-gray-700 leading-relaxed mb-4">The one area where professional help is worth considering is bathrooms with extensive tile removal, mould remediation, or complex prep work. Basic repainting over existing sound paint is always a DIY-friendly job.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'bathroom-paint-calculator', label: 'Bathroom Paint Calculator' },
      { href: 'best-paint-for-bathrooms', label: 'Best Paint for Bathrooms' },
      { href: 'how-much-paint-for-a-bathroom', label: 'How Much Paint for a Bathroom?' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-much-does-it-cost-to-paint-a-room', label: 'How Much Does It Cost to Paint a Room?' },
      { href: 'paint-finish-guide', label: 'Paint Finish Guide' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a bathroom?', a: 'An average 5×8 bathroom costs $150–$350 professionally and $30–$70 DIY. Large master bathrooms cost $350–$700 professionally.' },
      { q: 'Do I need special paint for a bathroom?', a: 'Yes — use satin or semi-gloss with mildew-resistant additives. Standard flat paint absorbs moisture and will peel or grow mould in any bathroom.' },
      { q: 'Is bathroom painting a good DIY project?', a: 'Yes — small size makes it one of the easiest rooms to paint. Most bathrooms can be completed in 2–3 hours including prep. The cost savings are significant relative to the effort.' },
      { q: 'How often should you repaint a bathroom?', a: 'With quality moisture-resistant paint, every 3–5 years. Poor ventilation or cheap paint may require repainting sooner.' },
      { q: 'Why does a tiny bathroom cost so much professionally?', a: 'Professional painters have minimum charges regardless of room size, plus bathroom prep (removing fixtures, caulking, mould treatment) takes proportionally more time in small spaces.' },
      { q: 'What is the best paint colour for a small bathroom?', a: 'Light colours — pale blue, soft white, light grey — make small bathrooms feel larger. Dark tones work in larger bathrooms with good lighting and create a spa-like atmosphere.' },
    ],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-whole-house-interior',
    functionName: 'CostToPaintWholeHouseInterior',
    title: 'Cost to Paint Whole House Interior in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint the interior of a whole house in 2026. Cost estimates by home size, DIY vs professional breakdown.',
    h1: 'Cost to Paint Whole House Interior in 2026',
    breadcrumb: 'Cost to Paint Whole House Interior',
    quickAnswer: '$2,000 to $8,000 professional / $500 to $1,500 DIY',
    quickAnswerSub: 'For a typical 1,500–2,500 sq ft home — walls, ceilings, and trim',
    introPara: 'The cost to paint a whole house interior ranges from <strong>$500 to $1,500 for DIY</strong> and <strong>$2,000 to $8,000 for professional painters</strong> depending on home size, number of rooms, and whether ceilings and trim are included.',
    articleSchema: {
      headline: 'Cost to Paint Whole House Interior in 2026',
      description: '2026 guide to whole house interior painting costs by home size — professional and DIY estimates with full cost breakdown.',
    },
    sections: [
      {
        h2: 'Whole House Interior Painting Cost by Home Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Home Size</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">800 sq ft</td><td class="px-4 py-3 text-gray-700">$300–$700</td><td class="px-4 py-3 text-gray-700">$1,200–$3,000</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td class="px-4 py-3 text-gray-700">$400–$900</td><td class="px-4 py-3 text-gray-700">$1,500–$3,800</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td class="px-4 py-3 text-gray-700">$600–$1,200</td><td class="px-4 py-3 text-gray-700">$2,500–$5,500</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td class="px-4 py-3 text-gray-700">$800–$1,600</td><td class="px-4 py-3 text-gray-700">$3,500–$7,000</td></tr>
                <tr class="bg-white"><td class="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td class="px-4 py-3 text-gray-700">$1,000–$2,000</td><td class="px-4 py-3 text-gray-700">$4,500–$9,000</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'How to Reduce Whole House Painting Cost',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Use one colour throughout.</strong> Using the same wall colour in all rooms eliminates colour change prep, reduces total cans needed, and allows bulk buying in 5-gallon buckets at lower per-gallon cost.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Buy in 5-gallon buckets.</strong> For a whole house job you will need 10+ gallons of wall colour. Buying in 5-gallon buckets saves 10–15% per gallon and guarantees colour batch consistency.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Do prep yourself when hiring professionals.</strong> Moving furniture, washing walls, and filling nail holes yourself before the painter arrives can reduce the quote by $200–$500.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Paint in spring or autumn.</strong> Professional painters are often less busy in shoulder seasons — you may negotiate a better rate compared to peak summer demand.</p>`,
      },
      {
        h2: 'What Does a Whole House Paint Job Include?',
        content: `<p class="text-gray-700 leading-relaxed mb-4">A complete whole house interior paint job typically includes all walls, ceilings (flat white), and trim/baseboards in each room. Doors, closet interiors, and built-in shelving may or may not be included — always confirm in writing before the job starts.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'whole-house-paint-calculator', label: 'Whole House Paint Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-much-paint-for-interior-of-house', label: 'How Much Paint for Interior of House?' },
      { href: 'how-much-paint-for-a-2000-sq-ft-house', label: 'How Much Paint for a 2000 Sq Ft House?' },
      { href: 'cost-to-paint-exterior-house', label: 'Cost to Paint Exterior of House' },
      { href: 'how-to-calculate-paint-for-a-room', label: 'How to Calculate Paint for a Room' },
    ],
    faqs: [
      { q: 'How much does it cost to paint the interior of a whole house?', a: 'A 1,500 sq ft home costs $2,500–$5,500 professionally and $600–$1,200 DIY. A 2,000 sq ft home costs $3,500–$7,000 professionally and $800–$1,600 DIY.' },
      { q: 'How long does it take to paint a whole house interior?', a: 'A professional crew of two takes 3–5 days for a 1,500 sq ft house. A solo DIYer should budget 7–14 days to complete the job properly.' },
      { q: 'How many gallons of paint for a whole house interior?', a: 'A 1,500 sq ft home needs 15–20 gallons total — 9–12 for walls, 4–5 for ceilings, and 2–3 for trim. Use the whole house paint calculator for your exact estimate.' },
      { q: 'Is it cheaper to paint the whole house at once?', a: 'Yes — painting all rooms at once allows bulk paint buying, one contractor mobilisation cost, and a single prep and cleanup phase, reducing per-room cost by 15–25%.' },
      { q: 'What type of paint for whole house interior?', a: 'Eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for all ceilings, and semi-gloss for all trim and baseboards.' },
      { q: 'Should I paint the whole house one colour?', a: 'Using one main neutral colour throughout with white ceilings and trim is the most cost-effective approach and creates a cohesive, spacious feel throughout the home.' },
    ],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-garage',
    functionName: 'CostToPaintGarage',
    title: 'Cost to Paint a Garage in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a garage in 2026. Wall, floor, and ceiling cost estimates for single and two-car garages.',
    h1: 'Cost to Paint a Garage in 2026',
    breadcrumb: 'Cost to Paint a Garage',
    quickAnswer: '$400 to $1,200 professional / $100 to $350 DIY',
    quickAnswerSub: 'For a standard two-car garage — walls and ceiling',
    introPara: 'The cost to paint a standard two-car garage ranges from <strong>$100 to $350 for DIY</strong> and <strong>$400 to $1,200 for a professional</strong>. Adding epoxy floor coating adds $300–$1,500 depending on size and product.',
    articleSchema: {
      headline: 'Cost to Paint a Garage in 2026',
      description: '2026 cost guide for garage painting — walls, floor, and ceiling estimates for single and double garages.',
    },
    sections: [
      {
        h2: 'Garage Painting Cost Breakdown',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Surface</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Single garage walls</td><td class="px-4 py-3 text-gray-700">$60–$150</td><td class="px-4 py-3 text-gray-700">$200–$500</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Two-car garage walls</td><td class="px-4 py-3 text-gray-700">$120–$250</td><td class="px-4 py-3 text-gray-700">$350–$900</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Garage floor (epoxy)</td><td class="px-4 py-3 text-gray-700">$100–$300</td><td class="px-4 py-3 text-gray-700">$600–$1,500</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Garage ceiling</td><td class="px-4 py-3 text-gray-700">$40–$100</td><td class="px-4 py-3 text-gray-700">$150–$400</td></tr>
                <tr class="bg-white"><td class="px-4 py-3 font-medium text-gray-800">Complete garage (2-car)</td><td class="px-4 py-3 text-gray-700">$250–$600</td><td class="px-4 py-3 text-gray-700">$1,000–$2,500</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'Garage Epoxy Floor Cost',
        content: `<p class="text-gray-700 leading-relaxed mb-4">A two-car garage floor (approximately 400 sq ft) costs $100–$300 DIY with a water-based one-part floor paint kit, or $600–$1,500 professionally with a two-part epoxy coating. Professional two-part epoxy is significantly more durable — lasting 10–20 years under vehicle traffic vs 3–5 years for DIY one-part floor paint.</p>
          <p class="text-gray-700 leading-relaxed mb-4">Floor preparation is the most critical factor — concrete must be etched with acid or mechanically ground before coating. Surface prep kits cost $30–$60 extra for DIY.</p>`,
      },
      {
        h2: 'Is Painting a Garage Worth It?',
        content: `<p class="text-gray-700 leading-relaxed mb-4">Painting garage walls and floor dramatically improves the space — brighter, cleaner, and significantly easier to keep clean. For a workshop, home gym, or living-adjacent garage, painted walls and an epoxy floor can add real value to how the space is used and perceived.</p>
          <p class="text-gray-700 leading-relaxed mb-4">The ROI is high for a DIY job — paint a two-car garage yourself for $250–$600 and the result is a completely transformed space. Professional epoxy floor coating is the one area where professional application is genuinely worth the premium for longevity.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'garage-paint-calculator', label: 'Garage Paint Calculator' },
      { href: 'how-much-paint-for-a-garage', label: 'How Much Paint for a Garage?' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-much-does-it-cost-to-paint-a-room', label: 'How Much Does It Cost to Paint a Room?' },
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'cost-to-paint-whole-house-interior', label: 'Cost to Paint Whole House Interior' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a garage?', a: 'A two-car garage costs $350–$900 professionally for walls and ceiling, and $120–$250 DIY. Adding an epoxy floor adds $600–$1,500 professionally or $100–$300 DIY.' },
      { q: 'What type of paint for garage walls?', a: 'Semi-gloss or satin latex in a light colour — it reflects light, is easy to wipe clean, and resists the moisture and temperature changes in a garage environment.' },
      { q: 'What is the best garage floor paint?', a: 'Two-part epoxy coating gives the most durable and professional floor finish. One-part water-based floor paint is easier to apply DIY but less durable under vehicle traffic.' },
      { q: 'Do garage walls need primer?', a: 'Yes — bare drywall and concrete block are both porous and require primer for proper adhesion. Always prime unfinished garage surfaces before painting.' },
      { q: 'How long does garage paint last?', a: 'Wall paint lasts 5–10 years. Epoxy floor coating lasts 10–20 years professionally applied. One-part DIY floor paint lasts 3–5 years with vehicle traffic.' },
      { q: 'Can I paint a garage in one day?', a: 'Walls and ceiling of a standard garage can be painted in one day by two people. Floor coating requires a second day after the acid etch prep and must cure 48–72 hours before vehicle traffic.' },
    ],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-deck',
    functionName: 'CostToPaintDeck',
    title: 'Cost to Paint a Deck in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint or stain a deck in 2026. Cost estimates by deck size for DIY and professional painting.',
    h1: 'Cost to Paint a Deck in 2026',
    breadcrumb: 'Cost to Paint a Deck',
    quickAnswer: '$300 to $1,200 professional / $100 to $400 DIY',
    quickAnswerSub: 'For a standard 300–400 sq ft deck — two coats',
    introPara: 'The cost to paint or stain an average 300–400 sq ft deck ranges from <strong>$100 to $400 for DIY</strong> and <strong>$300 to $1,200 for a professional</strong>. Deck condition and whether you choose paint or stain significantly affect the price.',
    articleSchema: {
      headline: 'Cost to Paint a Deck in 2026',
      description: '2026 cost guide for deck painting and staining — DIY vs professional estimates by deck size.',
    },
    sections: [
      {
        h2: 'Deck Painting Cost by Size',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Deck Size</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Small 200 sq ft</td><td class="px-4 py-3 text-gray-700">$60–$180</td><td class="px-4 py-3 text-gray-700">$200–$600</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Average 300 sq ft</td><td class="px-4 py-3 text-gray-700">$100–$280</td><td class="px-4 py-3 text-gray-700">$350–$900</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Large 500 sq ft</td><td class="px-4 py-3 text-gray-700">$170–$450</td><td class="px-4 py-3 text-gray-700">$600–$1,500</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">Railings + stairs (add)</td><td class="px-4 py-3 text-gray-700">+$40–$100</td><td class="px-4 py-3 text-gray-700">+$150–$400</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'Deck Paint vs Deck Stain — Cost Comparison',
        content: `<p class="text-gray-700 leading-relaxed mb-4">Deck stain typically costs the same as deck paint per gallon ($30–$60) but is more economical long-term because it is easier to reapply — no stripping required. Paint can peel and may require stripping before recoating, adding $200–$600 in prep cost to the next paint job.</p>
          <p class="text-gray-700 leading-relaxed mb-4">For a new deck, stain is the more cost-effective long-term choice. For an existing painted deck, repainting is usually more practical than stripping back to bare wood.</p>`,
      },
      {
        h2: 'What Adds Cost to a Deck Paint Job?',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Deck condition.</strong> Weathered or peeling decks need power washing, sanding, and possibly board replacement before painting — adding $100–$400 to prep costs.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Railings and stairs.</strong> Railings and stairs take proportionally more time than flat deck boards — add 30–50% to the deck estimate for comprehensive railing and stair painting.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Two colours.</strong> Using a different colour for railings vs deck boards requires masking and adds $100–$200 professionally.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'deck-paint-calculator', label: 'Deck Paint Calculator' },
      { href: 'deck-stain-calculator', label: 'Deck Stain Calculator' },
      { href: 'how-much-paint-for-a-deck', label: 'How Much Paint for a Deck?' },
      { href: 'stain-calculator', label: 'Stain Calculator' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'cost-to-paint-exterior-house', label: 'Cost to Paint Exterior of House' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a deck?', a: 'An average 300 sq ft deck costs $350–$900 professionally and $100–$280 DIY for two coats. Add $150–$400 professionally for railings and stairs.' },
      { q: 'Is it cheaper to paint or stain a deck?', a: 'Initial cost is similar. Stain is cheaper long-term because reapplication requires no stripping — just clean and apply. Paint can peel and require expensive prep before recoating.' },
      { q: 'How often does a deck need to be painted?', a: 'A well-painted deck needs repainting every 3–5 years. Deck stain needs reapplication every 2–4 years but is much easier to reapply.' },
      { q: 'Can I paint a deck myself?', a: 'Yes — deck painting is a manageable DIY project. The most important step is thorough prep — power wash and allow 48 hours to dry before applying any coating.' },
      { q: 'What is the best paint for a deck?', a: 'Use a 100% acrylic exterior deck paint or solid colour deck stain. Avoid interior paints or standard exterior wall paint — they are not formulated for deck foot traffic.' },
      { q: 'How long after painting a deck can you use it?', a: 'Most deck paints are safe to walk on within 24–48 hours. Allow 7 days before replacing heavy furniture or subjecting the deck to heavy foot traffic.' },
    ],
  },

  // ── 10 ─────────────────────────────────────────────────────────────────────
  {
    slug: 'cost-to-paint-front-door',
    functionName: 'CostToPaintFrontDoor',
    title: 'Cost to Paint a Front Door in 2026 | ThePaintCalculator.com',
    description: 'Find out exactly how much it costs to paint a front door in 2026. Professional and DIY cost estimates for single and double doors.',
    h1: 'Cost to Paint a Front Door in 2026',
    breadcrumb: 'Cost to Paint a Front Door',
    quickAnswer: '$100 to $300 professional / $20 to $60 DIY',
    quickAnswerSub: 'For a standard single front door — two coats both sides',
    introPara: 'Painting a front door costs <strong>$20 to $60 for DIY</strong> and <strong>$100 to $300 professionally</strong>. It is one of the highest-impact, lowest-cost home improvements — dramatically improving curb appeal for minimal spend.',
    articleSchema: {
      headline: 'Cost to Paint a Front Door in 2026',
      description: '2026 cost guide for painting a front door — professional and DIY estimates, paint options, and curb appeal tips.',
    },
    sections: [
      {
        h2: 'Front Door Painting Cost Breakdown',
        content: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Surface</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost</th>
                <th class="px-4 py-3 text-left font-semibold">Professional Cost</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Single front door</td><td class="px-4 py-3 text-gray-700">$20–$50</td><td class="px-4 py-3 text-gray-700">$100–$250</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Double front door</td><td class="px-4 py-3 text-gray-700">$35–$80</td><td class="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Door + frame</td><td class="px-4 py-3 text-gray-700">$30–$70</td><td class="px-4 py-3 text-gray-700">$150–$350</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">Door + frame + sidelights</td><td class="px-4 py-3 text-gray-700">$45–$100</td><td class="px-4 py-3 text-gray-700">$200–$450</td></tr>
              </tbody>
            </table>
          </div>`,
      },
      {
        h2: 'DIY Front Door Painting — Full Cost Breakdown',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Quart of exterior door paint: $15–$30.</strong> One quart is more than enough for both sides of a single door with two coats. Use a gloss or semi-gloss exterior paint specifically for doors.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Small foam roller and brush: $8–$15.</strong> A 4-inch foam roller for flat panels and a small angled brush for detail work and edges.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Painter's tape, sandpaper, primer: $10–$20.</strong> 220-grit sandpaper for light sanding between coats, painter's tape for hardware masking.</p>`,
      },
      {
        h2: 'Front Door Painting — Best ROI in Home Improvement',
        content: `<p class="text-gray-700 leading-relaxed mb-4">Real estate studies consistently show that a freshly painted front door returns $5–$10 in home value for every $1 spent. A bold, well-chosen door colour significantly improves curb appeal — one of the first things buyers notice.</p>
          <p class="text-gray-700 leading-relaxed mb-4">The DIY cost of $20–$60 for one quart of premium door paint makes front door painting the highest-ROI home improvement per dollar spent. Even hiring a professional at $100–$250 delivers exceptional value relative to the visual impact and property value improvement.</p>`,
      },
      {
        h2: 'Most Popular Front Door Colours',
        content: `<p class="text-gray-700 leading-relaxed mb-2"><strong>Black.</strong> The most universally popular front door colour — works with virtually every house style and exterior colour. Bold, classic, and timeless.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Navy blue.</strong> A sophisticated, welcoming alternative to black. Works particularly well on white or light-coloured homes.</p>
          <p class="text-gray-700 leading-relaxed mb-2"><strong>Red.</strong> A classic traditional front door colour that adds energy and character. Popular on brick homes.</p>
          <p class="text-gray-700 leading-relaxed mb-4"><strong>Forest green.</strong> A modern, nature-inspired choice that has grown significantly in popularity. Works well on both modern and traditional homes.</p>`,
      },
    ],
    relatedLinks: [
      { href: 'exterior-paint-calculator', label: 'Exterior Paint Calculator' },
      { href: 'how-much-paint-for-a-front-door', label: 'How Much Paint for a Front Door?' },
      { href: 'best-exterior-paint-for-houses', label: 'Best Exterior Paint for Houses' },
      { href: 'paint-cost-calculator', label: 'Paint Cost Calculator' },
      { href: 'how-to-paint-a-room', label: 'How to Paint a Room — Step by Step' },
      { href: 'cost-to-paint-exterior-house', label: 'Cost to Paint Exterior of House' },
    ],
    faqs: [
      { q: 'How much does it cost to paint a front door?', a: 'A standard single front door costs $100–$250 professionally and $20–$50 DIY including a quart of door paint. Double doors cost $150–$350 professionally.' },
      { q: 'What type of paint for a front door?', a: 'Exterior gloss or semi-gloss formulated for doors and trim. Oil-based alkyd gives the hardest finish; quality exterior latex is easier to apply. Both work well.' },
      { q: 'How long does front door paint last?', a: 'Quality exterior door paint in a sheltered location lasts 5–10 years. South or west-facing doors in full sun may need repainting every 3–5 years due to UV exposure.' },
      { q: 'Is painting a front door a good DIY project?', a: 'Yes — one of the best DIY projects for impact vs effort. One quart of paint, a small roller, and a brush are all you need. The entire job takes 2–3 hours.' },
      { q: 'Do I need to prime a front door before painting?', a: 'If painting over a previously painted door in good condition, light sanding and no primer is often sufficient. For bare wood or dramatic colour changes, a coat of exterior primer improves adhesion and coverage.' },
      { q: 'What is the most popular front door colour?', a: 'Black is currently the most popular front door colour in the US and UK, followed by navy blue, red, and forest green. A bold door colour has proven positive impact on curb appeal and property value.' },
    ],
  },

];

// ─── CODE GENERATOR ──────────────────────────────────────────────────────────

function generatePage(page) {
  const sectionsHtml = page.sections.map(s => `
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">${s.h2}</h2>
          ${s.content.replace(/class=/g, 'className=')}`).join('\n');

  const relatedLinks = page.relatedLinks.map(l =>
    `            <li><Link href={\`/\${locale}/${l.href}\`} className="text-blue-600 hover:text-blue-700 font-medium">${l.label} →</Link></li>`
  ).join('\n');

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: `https://thepaintcalculator.com/${page.slug}` },
    ],
  });

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.articleSchema.headline,
    description: page.articleSchema.description,
    url: `https://thepaintcalculator.com/${page.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'ThePaintCalculator.com',
      url: 'https://thepaintcalculator.com',
    },
  });

  const faqItems = page.faqs.map(f => `
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">${f.q}</h3>
              <p className="text-gray-700">${f.a}</p>
            </div>`).join('\n');

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
    title: '${page.title}',
    description: '${page.description}',
    alternates: { canonical },
    openGraph: {
      title: '${page.h1}',
      description: '${page.description}',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function ${page.functionName}({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = ${breadcrumbSchema};
  const faqSchema = ${faqSchema};
  const articleSchema = ${articleSchema};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={\`/\${locale}\`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">${page.breadcrumb}</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ${page.h1}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: \`${page.introPara}\` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">${page.quickAnswer}</p>
          <p className="text-sm opacity-90">${page.quickAnswerSub}</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">
${sectionsHtml}

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
${relatedLinks}
            <li><Link href={\`/\${locale}\`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
${faqItems}
          </div>

        </article>
      </div>
    </main>
  );
}
`;
}

// ─── WRITE FILES ─────────────────────────────────────────────────────────────

const projectRoot = process.cwd();
let created = 0;
let skipped = 0;

for (const page of pages) {
  const dir = path.join(projectRoot, 'app', '[locale]', page.slug);
  const file = path.join(dir, 'page.tsx');

  if (fs.existsSync(file)) {
    console.log('SKIP (exists):', page.slug);
    skipped++;
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, generatePage(page), 'utf8');
  console.log('Created:', page.slug);
  created++;
}

console.log(`\nDone! Created: ${created} | Skipped: ${skipped} | Total: ${pages.length}`);
