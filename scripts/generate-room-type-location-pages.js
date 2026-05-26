const fs = require('fs');
const path = require('path');

// ─── LOCATION DATA ────────────────────────────────────────────────────────────

const locations = {
  // STATES
  texas: {
    type: 'state', name: 'Texas', abbr: 'TX', stateSlug: 'paint-calculator-texas',
    climate: 'varied — humid Gulf Coast to dry West Texas',
    laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65,
    avgHome: 2000,
    exteriorTip: 'Texas has multiple climates in one state. Houston and the Gulf Coast need maximum mildew resistance. Dallas and Fort Worth need flexible paint for temperature swings. West Texas and El Paso need UV-resistant coatings for desert sun. Use 100% acrylic exterior latex throughout.',
    interiorTip: 'Texas homes average 2,000+ sq ft — larger than the national average. Eggshell for living areas and bedrooms, satin for kitchens and bathrooms. Flat white for ceilings.',
    bestTime: 'Spring (March–May) and fall (October–November) statewide. Avoid Houston summers for exterior work — too humid. Avoid West Texas summers — too hot.',
    population: '30 million',
  },
  california: {
    type: 'state', name: 'California', abbr: 'CA', stateSlug: 'paint-calculator-california',
    climate: 'Mediterranean coast to desert inland',
    laborLow: 55, laborHigh: 95, paintLow: 40, paintHigh: 88,
    avgHome: 1900,
    exteriorTip: 'California requires SCAQMD-compliant low-VOC exterior paints in Southern California and Bay Area air districts. Coastal properties need salt and moisture resistance. Inland areas (Sacramento, Riverside) need UV-resistant coatings for intense summer sun.',
    interiorTip: 'California\'s mild climate means homes are well-ventilated — low-VOC interior paints dry quickly. The state requires low-VOC content — most premium brands comply automatically.',
    bestTime: 'Exterior painting is possible year-round in most of California. Avoid the LA wildfire season (Oct–Dec) for outdoor work. Bay Area exterior work is best July–September.',
    population: '39 million',
  },
  florida: {
    type: 'state', name: 'Florida', abbr: 'FL', stateSlug: 'paint-calculator-florida',
    climate: 'tropical to subtropical',
    laborLow: 35, laborHigh: 60, paintLow: 28, paintHigh: 66,
    avgHome: 1900,
    exteriorTip: 'Florida\'s tropical climate is the most demanding for exterior paint in the US. Use elastomeric coatings on stucco (the dominant exterior surface statewide). Mildew-resistant additives are essential throughout. Hurricane-season storms accelerate paint wear — repaint exterior surfaces every 5–7 years.',
    interiorTip: 'Florida homes need moisture-resistant interior paint in all rooms — not just bathrooms. The year-round humidity means semi-gloss or satin is preferable to flat paint even in living areas.',
    bestTime: 'November through April (dry season). The June–September rainy season limits exterior painting. Interior painting is year-round.',
    population: '22 million',
  },
  newyork: {
    type: 'state', name: 'New York', abbr: 'NY', stateSlug: 'paint-calculator-new-york',
    climate: 'humid continental to coastal',
    laborLow: 55, laborHigh: 95, paintLow: 40, paintHigh: 88,
    avgHome: 1900,
    exteriorTip: 'New York\'s climate ranges from NYC\'s humid coastal conditions to the severe winters of upstate. Flexible exterior paint is essential for freeze-thaw cycles. NYC metro labor rates are the highest in the country — $70–$115/hr for professional painters.',
    interiorTip: 'New York\'s pre-war and historic housing stock often contains lead paint. Always test before sanding or disturbing old painted surfaces in homes built before 1978. Use low-VOC interior paint for good indoor air quality in smaller NYC apartments.',
    bestTime: 'May through October statewide. NYC exterior painting is possible through November. Upstate NY has a shorter season: June through September.',
    population: '20 million',
  },
};

const cities = {
  houston: {
    type: 'city', name: 'Houston', state: 'Texas', abbr: 'TX',
    stateSlug: 'paint-calculator-texas', citySlug: 'paint-calculator-houston-tx',
    climate: 'hot humid subtropical',
    laborLow: 38, laborHigh: 62, paintLow: 28, paintHigh: 68,
    avgHome: 2100,
    exteriorTip: 'Houston\'s extreme humidity — averaging 75% year-round — demands the highest mildew-resistant exterior coatings. Use elastomeric paint on stucco and mildewcide-fortified latex on wood and fiber cement siding. Houston\'s clay soil causes foundation movement — inspect exterior paint for cracks before repainting.',
    interiorTip: 'Houston\'s humidity affects interiors too — use satin or semi-gloss in all rooms, not just kitchens and bathrooms. The high moisture means flat paint absorbs odors and marks faster than in drier climates.',
    bestTime: 'October through April. Houston summers are too hot and humid for reliable exterior paint adhesion.',
    population: '2.3 million',
  },
  dallas: {
    type: 'city', name: 'Dallas', state: 'Texas', abbr: 'TX',
    stateSlug: 'paint-calculator-texas', citySlug: 'paint-calculator-dallas-tx',
    climate: 'humid subtropical with temperature extremes',
    laborLow: 38, laborHigh: 65, paintLow: 28, paintHigh: 68,
    avgHome: 2050,
    exteriorTip: 'Dallas clay soil causes significant foundation movement that can crack exterior paint. Use flexible 100% acrylic exterior coatings rated for temperature extremes. The DFW market has a large pool of professional painters keeping labor rates competitive compared to Austin.',
    interiorTip: 'Dallas\'s growing interior design scene has driven demand for higher-end paint finishes. Eggshell and satin are standard. Many Dallas homeowners are opting for designer colors — test large swatches before committing to bold choices.',
    bestTime: 'March through May and October through November. Avoid Dallas summers (regularly 100°F+) for exterior painting.',
    population: '1.3 million',
  },
  miami: {
    type: 'city', name: 'Miami', state: 'Florida', abbr: 'FL',
    stateSlug: 'paint-calculator-florida', citySlug: 'paint-calculator-miami-fl',
    climate: 'tropical monsoon',
    laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68,
    avgHome: 1750,
    exteriorTip: 'Miami\'s tropical climate — year-round heat, intense UV, hurricane-season storms, and salt air — is the most demanding exterior paint environment in the US. Elastomeric coatings are standard for Miami stucco homes. Anti-fungal additives and mildewcide are essential in every exterior coat. Expect to repaint every 5–7 years.',
    interiorTip: 'Miami\'s humidity and AC use create condensation on walls — especially exterior-facing walls. Use moisture-resistant interior paint throughout. Satin is more practical than eggshell in Miami\'s humid climate.',
    bestTime: 'November through April (dry season). Avoid the June–November hurricane season for exterior projects.',
    population: '442,000',
  },
  losangeles: {
    type: 'city', name: 'Los Angeles', state: 'California', abbr: 'CA',
    stateSlug: 'paint-calculator-california', citySlug: 'paint-calculator-los-angeles-ca',
    climate: 'Mediterranean',
    laborLow: 58, laborHigh: 95, paintLow: 42, paintHigh: 88,
    avgHome: 1800,
    exteriorTip: 'Los Angeles requires SCAQMD-compliant low-VOC exterior paint. The dry Santa Ana winds create ideal painting conditions in fall but also extreme fire risk. Coastal LA properties need salt-resistant coatings. The intense Inland Empire UV requires maximum UV inhibitors for homes in the San Fernando Valley and East LA.',
    interiorTip: 'LA\'s mild climate means homes are painted more for aesthetics than protection. The city\'s design-conscious culture drives demand for premium finishes and designer colors. Low-VOC is required by SCAQMD regulations for indoor air quality.',
    bestTime: 'Year-round exterior painting is possible in LA. Spring and early fall are ideal. Avoid Santa Ana wind events (October–December) for exterior work.',
    population: '3.9 million',
  },
  chicago: {
    type: 'city', name: 'Chicago', state: 'Illinois', abbr: 'IL',
    stateSlug: 'paint-calculator-illinois', citySlug: 'paint-calculator-chicago-il',
    climate: 'humid continental with harsh winters',
    laborLow: 48, laborHigh: 78, paintLow: 35, paintHigh: 78,
    avgHome: 1750,
    exteriorTip: 'Chicago\'s extreme temperature range — from -20°F winters to 95°F summers — demands the most flexible exterior paint available. Union painters are common in the Chicago market. Lake Michigan shoreline properties have above-average moisture and salt exposure.',
    interiorTip: 'Chicago\'s older housing stock — including two-flats, greystones, and brick bungalows — often has lead paint in homes built before 1978. Always test before sanding. Interior painting is a year-round activity in Chicago given the long cold season.',
    bestTime: 'May through September. Chicago winters and early spring are too cold for exterior painting. The exterior season is short — book painters early.',
    population: '2.7 million',
  },
  atlanta: {
    type: 'city', name: 'Atlanta', state: 'Georgia', abbr: 'GA',
    stateSlug: 'paint-calculator-georgia', citySlug: 'paint-calculator-atlanta-ga',
    climate: 'humid subtropical',
    laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65,
    avgHome: 2000,
    exteriorTip: 'Atlanta\'s hot, humid summers and the urban heat island effect accelerate mold and mildew growth on exterior surfaces. Use mildewcide-fortified exterior paint on all surfaces. Atlanta\'s red clay soil causes staining on lower exterior surfaces — use a concrete-to-surface primer before painting lower sections.',
    interiorTip: 'Atlanta\'s booming population growth means high demand for renovation painters. The city\'s mix of historic in-town bungalows and new suburban construction creates demand for painters familiar with both lead-paint historic restoration and new construction finishing.',
    bestTime: 'March through May and September through November are ideal. Atlanta summers are hot and humid but manageable for morning exterior work.',
    population: '498,000',
  },
};

// ─── PAGE CONFIGS ─────────────────────────────────────────────────────────────

const pages = [

  // ── STATE PAGES ──────────────────────────────────────────────────────────────

  // Bedroom TX
  {
    slug: 'bedroom-paint-calculator-texas',
    functionName: 'BedroomPaintCalculatorTexas',
    type: 'bedroom', location: locations.texas,
    title: 'Bedroom Paint Calculator Texas — How Much Paint for a Texas Bedroom?',
    metaDesc: 'Free bedroom paint calculator for Texas homeowners. Accurate paint estimates with local Texas painter rates and climate tips. No signup.',
    h1: 'Bedroom Paint Calculator Texas',
    quickAnswer: '2 to 2.5 gallons for a standard Texas bedroom',
    quickAnswerSub: 'Texas bedrooms average larger than the national norm — budget accordingly',
    intro: 'Texas bedrooms average <strong>larger than the national norm</strong> — many master bedrooms run 14×16 to 16×20 feet. A standard 12×14 bedroom needs 2 gallons for two coats; a Texas master bedroom typically needs 2.5 to 3.5 gallons. Professional painters in Texas charge <strong>$35–$58 per hour</strong>.',
    relatedCalc: 'bedroom-paint-calculator',
    relatedCalcLabel: 'Bedroom Paint Calculator',
  },
  // Bedroom CA
  {
    slug: 'bedroom-paint-calculator-california',
    functionName: 'BedroomPaintCalculatorCalifornia',
    type: 'bedroom', location: locations.california,
    title: 'Bedroom Paint Calculator California — How Much Paint for a California Bedroom?',
    metaDesc: 'Free bedroom paint calculator for California homeowners. Includes local CA painter rates, low-VOC requirements, and accurate paint estimates. No signup.',
    h1: 'Bedroom Paint Calculator California',
    quickAnswer: '2 to 2.5 gallons for a standard California bedroom',
    quickAnswerSub: 'California requires low-VOC interior paint in most air districts',
    intro: 'A standard 12×14 bedroom in California needs <strong>2 gallons for two coats</strong> on the walls — the same calculation regardless of state. What differs is cost: California paint runs <strong>$40–$88 per gallon</strong> and professional painters charge <strong>$55–$95 per hour</strong> — among the highest rates in the US.',
    relatedCalc: 'bedroom-paint-calculator',
    relatedCalcLabel: 'Bedroom Paint Calculator',
  },
  // Bedroom FL
  {
    slug: 'bedroom-paint-calculator-florida',
    functionName: 'BedroomPaintCalculatorFlorida',
    type: 'bedroom', location: locations.florida,
    title: 'Bedroom Paint Calculator Florida — How Much Paint for a Florida Bedroom?',
    metaDesc: 'Free bedroom paint calculator for Florida homeowners. Includes local FL painter rates, humidity tips, and accurate paint estimates. No signup.',
    h1: 'Bedroom Paint Calculator Florida',
    quickAnswer: '2 to 2.5 gallons for a standard Florida bedroom',
    quickAnswerSub: 'Florida humidity means satin is better than eggshell for bedrooms',
    intro: 'A standard Florida bedroom needs <strong>2 gallons for two coats</strong> on the walls. Florida\'s year-round humidity means <strong>satin finish is often better than eggshell</strong> for bedrooms — more moisture-resistant and easier to keep clean. Professional painters in Florida charge <strong>$35–$60 per hour</strong>.',
    relatedCalc: 'bedroom-paint-calculator',
    relatedCalcLabel: 'Bedroom Paint Calculator',
  },

  // Exterior TX
  {
    slug: 'exterior-paint-calculator-texas',
    functionName: 'ExteriorPaintCalculatorTexas',
    type: 'exterior', location: locations.texas,
    title: 'Exterior Paint Calculator Texas — How Much Exterior Paint for a Texas Home?',
    metaDesc: 'Free exterior paint calculator for Texas homes. Accurate estimates for Houston, Dallas, Austin and all Texas climates. Local TX painter rates included. No signup.',
    h1: 'Exterior Paint Calculator Texas',
    quickAnswer: '10 to 15 gallons for an average Texas home exterior',
    quickAnswerSub: 'Texas homes average 2,000+ sq ft — larger than the national average',
    intro: 'An average Texas home of 2,000 sq ft needs <strong>10–14 gallons for two coats</strong> on the exterior siding. Texas\'s diverse climates — from Houston\'s humidity to the Panhandle\'s cold winters to West Texas\'s desert UV — mean paint selection varies significantly by region. Professional exterior painters in Texas charge <strong>$35–$58 per hour</strong>.',
    relatedCalc: 'exterior-paint-calculator',
    relatedCalcLabel: 'Exterior Paint Calculator',
  },
  // Exterior CA
  {
    slug: 'exterior-paint-calculator-california',
    functionName: 'ExteriorPaintCalculatorCalifornia',
    type: 'exterior', location: locations.california,
    title: 'Exterior Paint Calculator California — How Much Exterior Paint for a California Home?',
    metaDesc: 'Free exterior paint calculator for California homes. SCAQMD-compliant, with local CA painter rates and climate-specific recommendations. No signup.',
    h1: 'Exterior Paint Calculator California',
    quickAnswer: '10 to 14 gallons for an average California home exterior',
    quickAnswerSub: 'California requires low-VOC exterior paint in most air quality districts',
    intro: 'An average California home needs <strong>10–14 gallons for two coats</strong> on exterior siding. California\'s SCAQMD and BAAQMD air quality rules require low-VOC exterior paints in most areas — major brands like Sherwin-Williams Emerald and Benjamin Moore Aura comply automatically. Professional painters in California charge <strong>$55–$95 per hour</strong>.',
    relatedCalc: 'exterior-paint-calculator',
    relatedCalcLabel: 'Exterior Paint Calculator',
  },
  // Exterior FL
  {
    slug: 'exterior-paint-calculator-florida',
    functionName: 'ExteriorPaintCalculatorFlorida',
    type: 'exterior', location: locations.florida,
    title: 'Exterior Paint Calculator Florida — How Much Exterior Paint for a Florida Home?',
    metaDesc: 'Free exterior paint calculator for Florida homes. Includes elastomeric stucco estimates, local FL painter rates, and tropical climate tips. No signup.',
    h1: 'Exterior Paint Calculator Florida',
    quickAnswer: '10 to 14 gallons for an average Florida home exterior',
    quickAnswerSub: 'Stucco homes need elastomeric coating — use 150–200 sq ft/gal coverage rate',
    intro: 'An average Florida home needs <strong>10–14 gallons for two coats</strong> on smooth siding — but Florida\'s dominant stucco exterior absorbs significantly more. For stucco, use <strong>150–200 sq ft per gallon</strong> and budget 15–20 gallons for an average home. Professional exterior painters in Florida charge <strong>$35–$60 per hour</strong>.',
    relatedCalc: 'exterior-paint-calculator',
    relatedCalcLabel: 'Exterior Paint Calculator',
  },

  // Paint Cost TX
  {
    slug: 'paint-cost-calculator-texas',
    functionName: 'PaintCostCalculatorTexas',
    type: 'cost', location: locations.texas,
    title: 'Paint Cost Calculator Texas — How Much Does Painting Cost in Texas?',
    metaDesc: 'Free paint cost calculator for Texas. Local Texas painter rates for Houston, Dallas, Austin, San Antonio. Accurate DIY and professional cost estimates. No signup.',
    h1: 'Paint Cost Calculator Texas',
    quickAnswer: '$35–$58/hr labor · $28–$65/gal paint',
    quickAnswerSub: 'Texas painter rates vary by city — Austin and DFW are highest',
    intro: 'Professional painters in Texas charge <strong>$35–$58 per hour</strong> on average — but rates vary significantly by city. Austin and Dallas command $40–$65/hr. Smaller Texas cities and rural areas run $28–$48/hr. Paint costs <strong>$28–$65 per gallon</strong> depending on brand and quality.',
    relatedCalc: 'paint-cost-calculator',
    relatedCalcLabel: 'Paint Cost Calculator',
  },
  // Paint Cost CA
  {
    slug: 'paint-cost-calculator-california',
    functionName: 'PaintCostCalculatorCalifornia',
    type: 'cost', location: locations.california,
    title: 'Paint Cost Calculator California — How Much Does Painting Cost in California?',
    metaDesc: 'Free paint cost calculator for California. Local painter rates for LA, San Francisco, San Diego, Sacramento. Accurate DIY and professional estimates. No signup.',
    h1: 'Paint Cost Calculator California',
    quickAnswer: '$55–$95/hr labor · $40–$88/gal paint',
    quickAnswerSub: 'California has the highest painter labor rates in the US outside NYC',
    intro: 'Professional painters in California charge <strong>$55–$95 per hour</strong> — among the highest rates in the country. San Francisco and Silicon Valley painters charge $70–$110/hr. LA runs $58–$95/hr. Sacramento is more affordable at $48–$78/hr. California paint costs <strong>$40–$88 per gallon</strong>.',
    relatedCalc: 'paint-cost-calculator',
    relatedCalcLabel: 'Paint Cost Calculator',
  },
  // Paint Cost NY
  {
    slug: 'paint-cost-calculator-new-york',
    functionName: 'PaintCostCalculatorNewYork',
    type: 'cost', location: locations.newyork,
    title: 'Paint Cost Calculator New York — How Much Does Painting Cost in New York?',
    metaDesc: 'Free paint cost calculator for New York. NYC union painter rates vs upstate NY costs. Accurate DIY and professional estimates. No signup.',
    h1: 'Paint Cost Calculator New York',
    quickAnswer: '$55–$95/hr labor · $40–$88/gal paint',
    quickAnswerSub: 'NYC rates are $70–$115/hr — upstate NY is significantly more affordable',
    intro: 'New York\'s painter labor rates are the most varied in any US state. <strong>New York City</strong> professional painters charge <strong>$70–$115 per hour</strong> — union painters in Manhattan can reach $150/hr. <strong>Upstate New York</strong> (Albany, Buffalo, Rochester) runs a much more affordable <strong>$40–$68/hr</strong>. Paint costs <strong>$40–$88 per gallon</strong> statewide.',
    relatedCalc: 'paint-cost-calculator',
    relatedCalcLabel: 'Paint Cost Calculator',
  },

  // Whole House TX
  {
    slug: 'whole-house-paint-calculator-texas',
    functionName: 'WholeHousePaintCalculatorTexas',
    type: 'wholehouse', location: locations.texas,
    title: 'Whole House Paint Calculator Texas — How Much Paint for a Texas Home?',
    metaDesc: 'Free whole house paint calculator for Texas homes. Accurate estimates for all Texas home sizes with local painter rates. No signup.',
    h1: 'Whole House Paint Calculator Texas',
    quickAnswer: '18 to 25 gallons for an average Texas home interior',
    quickAnswerSub: 'Texas homes average 2,000+ sq ft — more paint than the national average',
    intro: 'An average Texas home of <strong>2,000 sq ft needs 18–25 gallons</strong> for a complete interior repaint (walls, ceilings, and trim). Texas homes are larger than the US average — budget more than you would for a typical national estimate. Professional whole-house interior painting in Texas costs <strong>$3,500–$7,000</strong> for an average 2,000 sq ft home.',
    relatedCalc: 'whole-house-paint-calculator',
    relatedCalcLabel: 'Whole House Paint Calculator',
  },

  // ── CITY PAGES ───────────────────────────────────────────────────────────────

  // Bedroom Houston
  {
    slug: 'bedroom-paint-calculator-houston',
    functionName: 'BedroomPaintCalculatorHouston',
    type: 'bedroom', location: cities.houston,
    title: 'Bedroom Paint Calculator Houston TX — Local Rates & Paint Estimates',
    metaDesc: 'Free bedroom paint calculator for Houston, TX. Local Houston painter rates ($38–$62/hr), humidity tips, and accurate paint estimates. No signup.',
    h1: 'Bedroom Paint Calculator Houston, TX',
    quickAnswer: '2 to 2.5 gallons for a standard Houston bedroom',
    quickAnswerSub: 'Houston painters charge $38–$62/hr · Paint costs $28–$68/gal locally',
    intro: 'A standard Houston bedroom needs <strong>2 gallons for two coats</strong> on the walls. Houston\'s extreme humidity means <strong>satin finish is recommended</strong> over eggshell — even in bedrooms — for better moisture resistance and easier cleaning. Professional painters in Houston charge <strong>$38–$62 per hour</strong>.',
    relatedCalc: 'bedroom-paint-calculator',
    relatedCalcLabel: 'Bedroom Paint Calculator',
  },
  // Bedroom Dallas
  {
    slug: 'bedroom-paint-calculator-dallas',
    functionName: 'BedroomPaintCalculatorDallas',
    type: 'bedroom', location: cities.dallas,
    title: 'Bedroom Paint Calculator Dallas TX — Local Rates & Paint Estimates',
    metaDesc: 'Free bedroom paint calculator for Dallas, TX. Local Dallas painter rates ($38–$65/hr) and accurate paint estimates. No signup.',
    h1: 'Bedroom Paint Calculator Dallas, TX',
    quickAnswer: '2 to 2.5 gallons for a standard Dallas bedroom',
    quickAnswerSub: 'Dallas painters charge $38–$65/hr · Paint costs $28–$68/gal locally',
    intro: 'A standard Dallas bedroom needs <strong>2 gallons for two coats</strong> on the walls. Dallas\'s large new-construction homes often have master bedrooms of 16×20 feet or larger — these need 3 to 3.5 gallons. Professional painters in Dallas charge <strong>$38–$65 per hour</strong> — slightly higher than the Texas average due to DFW demand.',
    relatedCalc: 'bedroom-paint-calculator',
    relatedCalcLabel: 'Bedroom Paint Calculator',
  },
  // Bedroom Miami
  {
    slug: 'bedroom-paint-calculator-miami',
    functionName: 'BedroomPaintCalculatorMiami',
    type: 'bedroom', location: cities.miami,
    title: 'Bedroom Paint Calculator Miami FL — Local Rates & Paint Estimates',
    metaDesc: 'Free bedroom paint calculator for Miami, FL. Local Miami painter rates ($38–$62/hr), tropical climate tips, and accurate estimates. No signup.',
    h1: 'Bedroom Paint Calculator Miami, FL',
    quickAnswer: '2 to 2.5 gallons for a standard Miami bedroom',
    quickAnswerSub: 'Miami painters charge $38–$62/hr · Use satin or semi-gloss for humidity resistance',
    intro: 'A standard Miami bedroom needs <strong>2 gallons for two coats</strong> on the walls. Miami\'s tropical humidity makes <strong>satin the right finish for bedrooms</strong> — flat and eggshell absorb moisture and mark quickly. Professional painters in Miami charge <strong>$38–$62 per hour</strong>.',
    relatedCalc: 'bedroom-paint-calculator',
    relatedCalcLabel: 'Bedroom Paint Calculator',
  },

  // Exterior Houston
  {
    slug: 'exterior-paint-calculator-houston',
    functionName: 'ExteriorPaintCalculatorHouston',
    type: 'exterior', location: cities.houston,
    title: 'Exterior Paint Calculator Houston TX — Local Rates & Estimates',
    metaDesc: 'Free exterior paint calculator for Houston, TX. Local Houston painter rates, humidity-specific product tips, and accurate exterior estimates. No signup.',
    h1: 'Exterior Paint Calculator Houston, TX',
    quickAnswer: '10 to 15 gallons for an average Houston home exterior',
    quickAnswerSub: 'Houston painters charge $38–$62/hr for exterior work',
    intro: 'An average Houston home needs <strong>10–14 gallons for two coats</strong> on exterior siding. Houston\'s extreme humidity demands <strong>mildewcide-fortified elastomeric exterior paint</strong> — the most moisture and mold resistant formulation available. Professional exterior painters in Houston charge <strong>$38–$62 per hour</strong>.',
    relatedCalc: 'exterior-paint-calculator',
    relatedCalcLabel: 'Exterior Paint Calculator',
  },
  // Exterior LA
  {
    slug: 'exterior-paint-calculator-los-angeles',
    functionName: 'ExteriorPaintCalculatorLosAngeles',
    type: 'exterior', location: cities.losangeles,
    title: 'Exterior Paint Calculator Los Angeles CA — Local Rates & Estimates',
    metaDesc: 'Free exterior paint calculator for Los Angeles, CA. SCAQMD-compliant, with local LA painter rates and Mediterranean climate tips. No signup.',
    h1: 'Exterior Paint Calculator Los Angeles, CA',
    quickAnswer: '10 to 13 gallons for an average LA home exterior',
    quickAnswerSub: 'LA painters charge $58–$95/hr · SCAQMD low-VOC paint required',
    intro: 'An average Los Angeles home needs <strong>10–13 gallons for two coats</strong> on exterior siding. LA requires <strong>SCAQMD-compliant low-VOC exterior paint</strong> — all major premium brands (Sherwin-Williams Emerald, Benjamin Moore Aura) comply automatically. Professional exterior painters in LA charge <strong>$58–$95 per hour</strong>.',
    relatedCalc: 'exterior-paint-calculator',
    relatedCalcLabel: 'Exterior Paint Calculator',
  },

  // Paint Cost Houston
  {
    slug: 'paint-cost-calculator-houston',
    functionName: 'PaintCostCalculatorHouston',
    type: 'cost', location: cities.houston,
    title: 'Paint Cost Calculator Houston TX — How Much Does Painting Cost in Houston?',
    metaDesc: 'Free paint cost calculator for Houston TX. Local Houston painter rates ($38–$62/hr) with DIY and professional cost estimates for all project types. No signup.',
    h1: 'Paint Cost Calculator Houston, TX',
    quickAnswer: '$38–$62/hr labor · $28–$68/gal paint',
    quickAnswerSub: 'Houston average room: $250–$420 professionally / $70–$150 DIY',
    intro: 'Professional painters in Houston charge <strong>$38–$62 per hour</strong>. An average 12×14 bedroom costs <strong>$250–$420 professionally</strong> in Houston. DIY painting the same room costs <strong>$70–$150 in paint and supplies</strong>. Houston\'s competitive painter market keeps rates below Austin and the national coastal average.',
    relatedCalc: 'paint-cost-calculator',
    relatedCalcLabel: 'Paint Cost Calculator',
  },
  // Paint Cost Chicago
  {
    slug: 'paint-cost-calculator-chicago',
    functionName: 'PaintCostCalculatorChicago',
    type: 'cost', location: cities.chicago,
    title: 'Paint Cost Calculator Chicago IL — How Much Does Painting Cost in Chicago?',
    metaDesc: 'Free paint cost calculator for Chicago IL. Local Chicago painter rates ($48–$78/hr) with union vs non-union cost comparison. No signup.',
    h1: 'Paint Cost Calculator Chicago, IL',
    quickAnswer: '$48–$78/hr labor · $35–$78/gal paint',
    quickAnswerSub: 'Union painters in Chicago can reach $90–$110/hr for commercial work',
    intro: 'Professional painters in Chicago charge <strong>$48–$78 per hour</strong> for residential work. Union painters working on commercial or large residential projects can reach <strong>$90–$110 per hour</strong>. An average Chicago room costs <strong>$290–$500 professionally</strong>. Paint costs <strong>$35–$78 per gallon</strong> from Chicago area stores.',
    relatedCalc: 'paint-cost-calculator',
    relatedCalcLabel: 'Paint Cost Calculator',
  },
  // Paint Cost Atlanta
  {
    slug: 'paint-cost-calculator-atlanta',
    functionName: 'PaintCostCalculatorAtlanta',
    type: 'cost', location: cities.atlanta,
    title: 'Paint Cost Calculator Atlanta GA — How Much Does Painting Cost in Atlanta?',
    metaDesc: 'Free paint cost calculator for Atlanta GA. Local Atlanta painter rates ($35–$58/hr) with accurate DIY and professional estimates. No signup.',
    h1: 'Paint Cost Calculator Atlanta, GA',
    quickAnswer: '$35–$58/hr labor · $28–$65/gal paint',
    quickAnswerSub: 'Atlanta average room: $235–$400 professionally / $65–$140 DIY',
    intro: 'Professional painters in Atlanta charge <strong>$35–$58 per hour</strong>. Atlanta\'s competitive painting market — with a large pool of contractors — keeps prices below East and West Coast rates. An average 12×14 bedroom costs <strong>$235–$400 professionally</strong> in Atlanta. DIY costs <strong>$65–$140 in paint and supplies</strong>.',
    relatedCalc: 'paint-cost-calculator',
    relatedCalcLabel: 'Paint Cost Calculator',
  },
];

// ─── GENERATORS ──────────────────────────────────────────────────────────────

function getRoomTypeContent(page) {
  const loc = page.location;
  const locName = loc.name;
  const isCity = loc.type === 'city';
  const stateOrCity = isCity ? `${loc.name}, ${loc.abbr}` : `${loc.name}`;
  const laborRange = `$${loc.laborLow}–$${loc.laborHigh}/hr`;
  const paintRange = `$${loc.paintLow}–$${loc.paintHigh}/gal`;
  const avgPaint = Math.round((loc.paintLow + loc.paintHigh) / 2);
  const avgLabor = Math.round((loc.laborLow + loc.laborHigh) / 2);

  // Breadcrumb path
  const breadcrumb = isCity
    ? `[
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Paint Calculator ${loc.state}', item: 'https://thepaintcalculator.com/${loc.stateSlug}' },
      { '@type': 'ListItem', position: 3, name: 'Paint Calculator ${loc.name}', item: 'https://thepaintcalculator.com/${loc.citySlug}' },
      { '@type': 'ListItem', position: 4, name: '${page.h1}', item: 'https://thepaintcalculator.com/${page.slug}' },
    ]`
    : `[
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: 'Paint Calculator ${loc.name}', item: 'https://thepaintcalculator.com/${loc.stateSlug}' },
      { '@type': 'ListItem', position: 3, name: '${page.h1}', item: 'https://thepaintcalculator.com/${page.slug}' },
    ]`;

  // Type-specific content
  const typeContent = {
    bedroom: {
      sectionTitle: `How Much Paint for a Bedroom in ${stateOrCity}?`,
      sectionBody: `A bedroom in ${stateOrCity} needs the same amount of paint as any other location — wall area determines paint quantity, not geography. A standard 12×14 bedroom needs about <strong>2 gallons for two coats</strong> on the walls. A master bedroom (14×16 or larger) needs 2.5 to 3.5 gallons. What varies locally is the cost of paint (${paintRange} in ${locName}) and labour (${laborRange} professionally).`,
      refTable: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Bedroom Size</th>
                <th class="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost (${locName})</th>
                <th class="px-4 py-3 text-left font-semibold">Pro Cost (${locName})</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">10×10</td><td class="px-4 py-3 text-gray-700">1.3 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(1.3*loc.paintLow+30)}–$${Math.round(1.3*loc.paintHigh+60)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*3+40)}–$${Math.round(loc.laborHigh*3+80)}</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">12×14 (standard)</td><td class="px-4 py-3 text-gray-700">1.8 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(1.8*loc.paintLow+40)}–$${Math.round(1.8*loc.paintHigh+70)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*5+50)}–$${Math.round(loc.laborHigh*5+100)}</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">14×16 (large)</td><td class="px-4 py-3 text-gray-700">2.4 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(2.4*loc.paintLow+50)}–$${Math.round(2.4*loc.paintHigh+80)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*6+60)}–$${Math.round(loc.laborHigh*6+110)}</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">16×20 (master)</td><td class="px-4 py-3 text-gray-700">3.4 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(3.4*loc.paintLow+70)}–$${Math.round(3.4*loc.paintHigh+110)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*8+80)}–$${Math.round(loc.laborHigh*8+140)}</td></tr>
              </tbody>
            </table>
          </div>`,
      tipSection: `<h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Bedroom Paint Tips for ${stateOrCity}</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Best finish for ${locName} bedrooms.</strong> ${loc.interiorTip}</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Climate note.</strong> ${loc.exteriorTip.split('.')[0]}. For interiors this means ensuring good ventilation during painting and using moisture-resistant finishes in rooms facing the exterior.</p>`,
      faqs: [
        { q: `How much paint for a bedroom in ${stateOrCity}?`, a: `A standard 12×14 bedroom needs about 2 gallons for two coats on the walls. A master bedroom needs 2.5–3.5 gallons. Paint costs ${paintRange} in ${locName}.` },
        { q: `How much does it cost to paint a bedroom in ${locName}?`, a: `Professional painters in ${locName} charge ${laborRange}. A standard 12×14 bedroom costs $${Math.round(loc.laborLow*5+50)}–$${Math.round(loc.laborHigh*5+100)} professionally. DIY costs $${Math.round(1.8*loc.paintLow+40)}–$${Math.round(1.8*loc.paintHigh+70)}.` },
        { q: `What is the best paint finish for a bedroom in ${locName}?`, a: loc.interiorTip },
        { q: `How long does it take to paint a bedroom in ${locName}?`, a: `A professional takes 2–4 hours for a standard bedroom in ${locName}. A DIYer should allow a full day including prep, two coats, and drying time.` },
        { q: `How many gallons for a master bedroom in ${locName}?`, a: `A master bedroom (14×16 to 16×20 ft) needs 2.5–3.5 gallons for two coats. Use the calculator above with your exact dimensions for a precise estimate.` },
        { q: `When is the best time to paint interiors in ${locName}?`, a: `Interior painting in ${locName} is possible year-round. ${loc.bestTime}` },
      ],
    },
    exterior: {
      sectionTitle: `How Much Exterior Paint for a Home in ${stateOrCity}?`,
      sectionBody: `An average home in ${stateOrCity} needs <strong>10–14 gallons for two coats</strong> on smooth exterior siding. Rough surfaces like stucco, brick, and textured siding absorb significantly more — use 150–200 sq ft per gallon for stucco. Professional exterior painters in ${locName} charge <strong>${laborRange}</strong>.`,
      refTable: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Home Size</th>
                <th class="px-4 py-3 text-left font-semibold">Paint (2 coats)</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost (${locName})</th>
                <th class="px-4 py-3 text-left font-semibold">Pro Cost (${locName})</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td class="px-4 py-3 text-gray-700">6–8 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(7*loc.paintLow+150)}–$${Math.round(7*loc.paintHigh+300)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*25+200)}–$${Math.round(loc.laborHigh*25+400)}</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td class="px-4 py-3 text-gray-700">9–12 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(10*loc.paintLow+200)}–$${Math.round(10*loc.paintHigh+400)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*35+300)}–$${Math.round(loc.laborHigh*35+600)}</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td class="px-4 py-3 text-gray-700">12–15 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(13*loc.paintLow+250)}–$${Math.round(13*loc.paintHigh+500)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*48+400)}–$${Math.round(loc.laborHigh*48+800)}</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td class="px-4 py-3 text-gray-700">15–20 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(17*loc.paintLow+300)}–$${Math.round(17*loc.paintHigh+600)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*60+500)}–$${Math.round(loc.laborHigh*60+1000)}</td></tr>
              </tbody>
            </table>
          </div>`,
      tipSection: `<h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Exterior Painting Tips for ${stateOrCity}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">${loc.exteriorTip}</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Best time to paint exterior in ${locName}:</strong> ${loc.bestTime}</p>`,
      faqs: [
        { q: `How much exterior paint for a house in ${stateOrCity}?`, a: `A 1,500 sq ft home needs 9–12 gallons. A 2,000 sq ft home needs 12–15 gallons. Stucco and rough surfaces need 50–100% more paint than smooth siding.` },
        { q: `How much does exterior painting cost in ${locName}?`, a: `Professional exterior painters in ${locName} charge ${laborRange}. A 1,500 sq ft home costs $${Math.round(loc.laborLow*35+1000)}–$${Math.round(loc.laborHigh*35+2000)} professionally.` },
        { q: `What is the best exterior paint for ${locName}'s climate?`, a: loc.exteriorTip },
        { q: `When is the best time to paint the exterior in ${locName}?`, a: loc.bestTime },
        { q: `How long does exterior house painting take in ${locName}?`, a: `A professional crew of two takes 2–4 days for an average home exterior in ${locName}. DIY exterior painting takes 3–5 days.` },
        { q: `How often should you repaint the exterior in ${locName}?`, a: `In ${locName}'s ${loc.climate} climate, quality exterior paint lasts 7–12 years on smooth siding. Stucco and masonry may need repainting every 5–8 years.` },
      ],
    },
    cost: {
      sectionTitle: `Paint Costs in ${stateOrCity} — Full Breakdown`,
      sectionBody: `Professional painters in ${stateOrCity} charge <strong>${laborRange} per hour</strong>. Paint costs <strong>${paintRange} per gallon</strong> at local ${locName} stores. Use the cost calculator above — pre-filled with ${locName} local rates — for an accurate total project estimate including labour, paint, and materials.`,
      refTable: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Project</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost (${locName})</th>
                <th class="px-4 py-3 text-left font-semibold">Pro Cost (${locName})</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Single room (12×14)</td><td class="px-4 py-3 text-gray-700">$${Math.round(1.8*loc.paintLow+40)}–$${Math.round(1.8*loc.paintHigh+70)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*5+50)}–$${Math.round(loc.laborHigh*5+100)}</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Whole house interior</td><td class="px-4 py-3 text-gray-700">$${Math.round(20*loc.paintLow+300)}–$${Math.round(20*loc.paintHigh+500)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*80+800).toLocaleString()}–$${Math.round(loc.laborHigh*80+1500).toLocaleString()}</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Exterior (2,000 sq ft)</td><td class="px-4 py-3 text-gray-700">$${Math.round(13*loc.paintLow+250)}–$${Math.round(13*loc.paintHigh+500)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*48+400).toLocaleString()}–$${Math.round(loc.laborHigh*48+800).toLocaleString()}</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">Kitchen cabinets</td><td class="px-4 py-3 text-gray-700">$${Math.round(1.5*loc.paintLow+80)}–$${Math.round(1.5*loc.paintHigh+150)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*20+200)}–$${Math.round(loc.laborHigh*20+400)}</td></tr>
                <tr class="bg-white"><td class="px-4 py-3 font-medium text-gray-800">Front door</td><td class="px-4 py-3 text-gray-700">$20–$50</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*2+60)}–$${Math.round(loc.laborHigh*2+120)}</td></tr>
              </tbody>
            </table>
          </div>`,
      tipSection: `<h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How to Save on Painting Costs in ${stateOrCity}</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Get three quotes.</strong> Painter prices in ${locName} vary significantly. Always get at least three quotes — prices often differ by 30–50% for identical work.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Do your own prep.</strong> Moving furniture and filling nail holes yourself before the painter arrives can reduce professional quotes by $100–$300.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Buy during sales.</strong> Sherwin-Williams and Benjamin Moore run 30–40% off sales several times per year. Stock up on frequently used colours during sales.</p>`,
      faqs: [
        { q: `How much do painters charge in ${stateOrCity}?`, a: `Professional painters in ${locName} charge ${laborRange} per hour. An average room costs $${Math.round(loc.laborLow*5+50)}–$${Math.round(loc.laborHigh*5+100)} professionally including paint and labour.` },
        { q: `How much does it cost to paint a house in ${locName}?`, a: `A whole-house interior paint job in ${locName} costs $${Math.round(loc.laborLow*80+800).toLocaleString()}–$${Math.round(loc.laborHigh*80+1500).toLocaleString()} professionally. Exterior painting costs $${Math.round(loc.laborLow*48+400).toLocaleString()}–$${Math.round(loc.laborHigh*48+800).toLocaleString()} for an average 2,000 sq ft home.` },
        { q: `How much does it cost to paint a room yourself in ${locName}?`, a: `DIY painting a standard 12×14 room in ${locName} costs $${Math.round(1.8*loc.paintLow+40)}–$${Math.round(1.8*loc.paintHigh+70)} in paint and supplies — saving 60–70% vs professional painting.` },
        { q: `Is it worth hiring a painter in ${locName}?`, a: `Professional painters in ${locName} work 2–3× faster than DIY, include all prep, and produce a higher-quality finish. At ${laborRange}/hr, hiring is worth it for large spaces, complex prep, or when your time has high value.` },
        { q: `How much does exterior painting cost in ${locName}?`, a: `Exterior painting a 2,000 sq ft home in ${locName} costs $${Math.round(loc.laborLow*48+400).toLocaleString()}–$${Math.round(loc.laborHigh*48+800).toLocaleString()} professionally. DIY costs $${Math.round(13*loc.paintLow+250)}–$${Math.round(13*loc.paintHigh+500)} in paint and supplies.` },
        { q: `How much does cabinet painting cost in ${locName}?`, a: `Kitchen cabinet painting in ${locName} costs $${Math.round(loc.laborLow*20+200)}–$${Math.round(loc.laborHigh*20+400)} professionally. DIY costs $${Math.round(1.5*loc.paintLow+80)}–$${Math.round(1.5*loc.paintHigh+150)} in paint, primer, and prep materials.` },
      ],
    },
    wholehouse: {
      sectionTitle: `How Much Paint to Paint a Whole House in ${stateOrCity}?`,
      sectionBody: `A complete interior repaint of an average ${stateOrCity} home needs <strong>18–25 gallons total</strong> — wall paint, ceiling paint, and trim paint combined. Professional whole-house interior painting in ${locName} costs <strong>$${Math.round(loc.laborLow*80+800).toLocaleString()}–$${Math.round(loc.laborHigh*80+1500).toLocaleString()}</strong> for an average home.`,
      refTable: `<div class="overflow-x-auto mb-8">
            <table class="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr class="bg-blue-600 text-white">
                <th class="px-4 py-3 text-left font-semibold">Home Size</th>
                <th class="px-4 py-3 text-left font-semibold">Total Paint</th>
                <th class="px-4 py-3 text-left font-semibold">DIY Cost (${locName})</th>
                <th class="px-4 py-3 text-left font-semibold">Pro Cost (${locName})</th>
              </tr></thead>
              <tbody>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,000 sq ft</td><td class="px-4 py-3 text-gray-700">12–16 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(14*loc.paintLow+200)}–$${Math.round(14*loc.paintHigh+400)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*45+500).toLocaleString()}–$${Math.round(loc.laborHigh*45+900).toLocaleString()}</td></tr>
                <tr class="bg-gray-50 border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">1,500 sq ft</td><td class="px-4 py-3 text-gray-700">16–22 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(19*loc.paintLow+300)}–$${Math.round(19*loc.paintHigh+500)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*60+700).toLocaleString()}–$${Math.round(loc.laborHigh*60+1200).toLocaleString()}</td></tr>
                <tr class="bg-white border-b border-gray-100"><td class="px-4 py-3 font-medium text-gray-800">2,000 sq ft</td><td class="px-4 py-3 text-gray-700">20–28 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(24*loc.paintLow+400)}–$${Math.round(24*loc.paintHigh+700)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*80+900).toLocaleString()}–$${Math.round(loc.laborHigh*80+1600).toLocaleString()}</td></tr>
                <tr class="bg-gray-50"><td class="px-4 py-3 font-medium text-gray-800">2,500 sq ft</td><td class="px-4 py-3 text-gray-700">25–35 gal</td><td class="px-4 py-3 text-gray-700">$${Math.round(30*loc.paintLow+500)}–$${Math.round(30*loc.paintHigh+900)}</td><td class="px-4 py-3 text-gray-700">$${Math.round(loc.laborLow*100+1100).toLocaleString()}–$${Math.round(loc.laborHigh*100+2000).toLocaleString()}</td></tr>
              </tbody>
            </table>
          </div>`,
      tipSection: `<h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Tips for Painting a Whole House in ${stateOrCity}</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Buy in 5-gallon buckets.</strong> For a whole house you will need 15+ gallons of wall colour. Buying in 5-gallon buckets saves 10–15% per gallon and guarantees colour batch consistency.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>One colour throughout.</strong> Using the same wall colour in all rooms reduces total cans needed and simplifies touch-ups for years after painting.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Climate note for ${locName}.</strong> ${loc.interiorTip}</p>`,
      faqs: [
        { q: `How much paint to paint a whole house in ${stateOrCity}?`, a: `A 1,500 sq ft home needs 16–22 gallons total. A 2,000 sq ft home needs 20–28 gallons. Use the calculator above with your exact floor plan for a precise estimate.` },
        { q: `How much does it cost to paint a whole house in ${locName}?`, a: `Whole-house interior painting in ${locName} costs $${Math.round(loc.laborLow*80+800).toLocaleString()}–$${Math.round(loc.laborHigh*80+1500).toLocaleString()} professionally for an average home. DIY costs $${Math.round(24*loc.paintLow+400)}–$${Math.round(24*loc.paintHigh+700)} for a 2,000 sq ft home.` },
        { q: `How long does it take to paint a whole house in ${locName}?`, a: `A professional crew of two takes 3–5 days for an average ${locName} home interior. A solo DIYer should allow 7–14 days to complete the job properly.` },
        { q: `What type of paint for a whole house interior in ${locName}?`, a: `Eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for all ceilings, and semi-gloss for all trim and doors. ${loc.interiorTip}` },
        { q: `How many gallons of paint for a 2,000 sq ft house in ${locName}?`, a: `A 2,000 sq ft home needs 20–28 gallons total for a complete interior repaint including walls, ceilings, and trim.` },
        { q: `Is it cheaper to paint a whole house at once in ${locName}?`, a: `Yes — painting all rooms at once allows bulk paint buying (5-gallon buckets), one contractor mobilisation, and a single prep phase, reducing per-room cost by 15–25%.` },
      ],
    },
  };

  const tc = typeContent[page.type];
  const parentCalcLink = page.relatedCalc;

  // Related links based on type
  const relatedLinks = [
    `<li><Link href={\`/\${locale}/${page.relatedCalc}\`} className="text-blue-600 hover:text-blue-700 font-medium">${page.relatedCalcLabel} →</Link></li>`,
    isCity ? `<li><Link href={\`/\${locale}/${loc.stateSlug}\`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator ${loc.state} →</Link></li>` : '',
    isCity ? `<li><Link href={\`/\${locale}/${loc.citySlug}\`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator ${loc.name} ${loc.abbr} →</Link></li>` : `<li><Link href={\`/\${locale}/${loc.stateSlug}\`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator ${loc.name} →</Link></li>`,
    `<li><Link href={\`/\${locale}/paint-cost-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>`,
    `<li><Link href={\`/\${locale}/how-much-does-it-cost-to-paint-a-room\`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>`,
    `<li><Link href={\`/\${locale}/how-to-calculate-paint-for-a-room\`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>`,
    page.type !== 'exterior' ? `<li><Link href={\`/\${locale}/exterior-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>` : `<li><Link href={\`/\${locale}/whole-house-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>`,
    `<li><Link href={\`/\${locale}\`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>`,
  ].filter(Boolean).join('\n            ');

  const faqItems = tc.faqs.map(f => `
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">${f.q}</h3>
              <p className="text-gray-700">${f.a}</p>
            </div>`).join('\n');

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tc.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  });

  const breadcrumbSchemaObj = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: isCity
      ? [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
          { '@type': 'ListItem', position: 2, name: `Paint Calculator ${loc.state}`, item: `https://thepaintcalculator.com/${loc.stateSlug}` },
          { '@type': 'ListItem', position: 3, name: `Paint Calculator ${loc.name}`, item: `https://thepaintcalculator.com/${loc.citySlug}` },
          { '@type': 'ListItem', position: 4, name: page.h1, item: `https://thepaintcalculator.com/${page.slug}` },
        ]
      : [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
          { '@type': 'ListItem', position: 2, name: `Paint Calculator ${loc.name}`, item: `https://thepaintcalculator.com/${loc.stateSlug}` },
          { '@type': 'ListItem', position: 3, name: page.h1, item: `https://thepaintcalculator.com/${page.slug}` },
        ],
  };

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDesc,
    url: `https://thepaintcalculator.com/${page.slug}`,
    publisher: { '@type': 'Organization', name: 'ThePaintCalculator.com', url: 'https://thepaintcalculator.com' },
  });

  const breadcrumbNav = isCity
    ? `<li><Link href={\`/\${locale}\`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href={\`/\${locale}/${loc.stateSlug}\`} className="hover:text-blue-600 transition-colors">${loc.state}</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href={\`/\${locale}/${loc.citySlug}\`} className="hover:text-blue-600 transition-colors">${loc.name}</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">${page.h1}</li>`
    : `<li><Link href={\`/\${locale}\`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href={\`/\${locale}/${loc.stateSlug}\`} className="hover:text-blue-600 transition-colors">${loc.name}</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">${page.h1}</li>`;

  return {
    faqSchema, breadcrumbSchema: JSON.stringify(breadcrumbSchemaObj), articleSchema,
    tc, relatedLinks, faqItems, breadcrumbNav, avgPaint, avgLabor,
  };
}

function generatePage(page) {
  const c = getRoomTypeContent(page);
  const loc = page.location;

  return `import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

function getPageParam(): string {
  const state = {
    activeTab: '${page.type === 'exterior' ? 'exterior' : 'interior'}',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex',
      finish: '${page.type === 'bedroom' ? 'eggshell' : page.type === 'exterior' ? 'flat' : 'eggshell'}',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: ${page.type === 'exterior' ? 350 : 400}, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: ${c.avgPaint},
      primerPrice: 25, calculateLabor: ${page.type === 'cost' ? 'true' : 'false'},
      laborRate: ${c.avgLabor},
      includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_loc_prefill',
      measurements: {
        name: '${page.type === 'bedroom' ? 'Bedroom' : 'Room'}', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_loc_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_loc_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
      },
      surfaces: { walls: true, ceiling: ${page.type === 'wholehouse'}, trim: ${page.type === 'wholehouse'}, doors: false },
      extras: {
        accentWall: false, accentWallArea: '', wainscoting: false,
        wainscotingHeight: 36, crownMolding: false,
        builtIns: false, builtInsArea: '', fireplace: false, fireplaceArea: '',
      },
    }],
  };
  if (typeof window === 'undefined') {
    return Buffer.from(JSON.stringify(state)).toString('base64url');
  }
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
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
      title: '${page.h1}',
      description: '${page.metaDesc}',
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
  const pageParam = getPageParam();

  const breadcrumbSchema = ${c.breadcrumbSchema};
  const faqSchema = ${c.faqSchema};
  const articleSchema = ${c.articleSchema};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            ${c.breadcrumbNav}
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ${page.h1}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: \`${page.intro}\` }}
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

        <script
          dangerouslySetInnerHTML={{
            __html: \`
              (function() {
                try {
                  if (typeof window === 'undefined') return;
                  var url = new URL(window.location.href);
                  if (!url.searchParams.get('p')) {
                    url.searchParams.set('p', '\${pageParam}');
                    window.history.replaceState({}, '', url.toString());
                    window.location.reload();
                  }
                } catch(e) {}
              })();
            \`,
          }}
        />

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            ${c.tc.sectionTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: \`${c.tc.sectionBody}\` }}
          />

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Cost & Paint Reference Table
          </h2>
          ${c.tc.refTable.replace(/class=/g, 'className=')}

          ${c.tc.tipSection}

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            ${c.relatedLinks}
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            ${c.faqItems}
          </div>

        </article>
      </div>
    </main>
  );
}
`;
}

// ─── WRITE FILES ──────────────────────────────────────────────────────────────
const projectRoot = process.cwd();
let created = 0;
let skipped = 0;

for (const page of pages) {
  const dir  = path.join(projectRoot, 'app', '[locale]', page.slug);
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
