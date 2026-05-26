const fs = require('fs');
const path = require('path');

// ─── STATE DATA ───────────────────────────────────────────────────────────────
const states = [
  { name: 'Alabama',       slug: 'paint-calculator-alabama',        abbr: 'AL', capital: 'Montgomery',     climate: 'humid subtropical',  laborLow: 35, laborHigh: 55, paintLow: 28, paintHigh: 65, avgHome: 1850, localTip: 'Alabama\'s hot, humid summers mean moisture-resistant exterior paint is essential. Use mildew-resistant additives for all exterior surfaces.' },
  { name: 'Alaska',        slug: 'paint-calculator-alaska',         abbr: 'AK', capital: 'Juneau',          climate: 'subarctic',          laborLow: 55, laborHigh: 85, paintLow: 35, paintHigh: 80, avgHome: 1900, localTip: 'Alaska\'s extreme cold and moisture require specialized exterior paints rated for sub-zero temperatures. Interior painting is year-round but exterior work is limited to the short summer season.' },
  { name: 'Arizona',       slug: 'paint-calculator-arizona',        abbr: 'AZ', capital: 'Phoenix',         climate: 'arid desert',        laborLow: 38, laborHigh: 60, paintLow: 30, paintHigh: 70, avgHome: 1950, localTip: 'Arizona\'s intense UV and extreme heat require 100% acrylic exterior paint with strong UV inhibitors. Elastomeric coatings are popular for stucco — the dominant exterior surface in the state.' },
  { name: 'Arkansas',      slug: 'paint-calculator-arkansas',       abbr: 'AR', capital: 'Little Rock',     climate: 'humid subtropical',  laborLow: 30, laborHigh: 50, paintLow: 25, paintHigh: 60, avgHome: 1700, localTip: 'Arkansas has lower-than-average labor costs making professional painting affordable. The humid climate requires mildew-resistant exterior coatings, especially in the southern part of the state.' },
  { name: 'California',    slug: 'paint-calculator-california',     abbr: 'CA', capital: 'Sacramento',      climate: 'Mediterranean',      laborLow: 55, laborHigh: 90, paintLow: 40, paintHigh: 85, avgHome: 2000, localTip: 'California requires low-VOC and zero-VOC paints in many areas due to air quality regulations. The coastal climate demands excellent moisture resistance while inland areas need strong UV protection.' },
  { name: 'Colorado',      slug: 'paint-calculator-colorado',       abbr: 'CO', capital: 'Denver',          climate: 'semi-arid',          laborLow: 42, laborHigh: 65, paintLow: 32, paintHigh: 72, avgHome: 2100, localTip: 'Colorado\'s high altitude means stronger UV exposure than lower-elevation states — budget for premium exterior paint with maximum UV protection. The dry climate is excellent for interior painting year-round.' },
  { name: 'Connecticut',   slug: 'paint-calculator-connecticut',    abbr: 'CT', capital: 'Hartford',        climate: 'humid continental',  laborLow: 50, laborHigh: 80, paintLow: 38, paintHigh: 80, avgHome: 1950, localTip: 'Connecticut\'s freeze-thaw cycles demand flexible exterior paint formulas. Historic homes are common — many require lead paint testing before repainting older surfaces.' },
  { name: 'Delaware',      slug: 'paint-calculator-delaware',       abbr: 'DE', capital: 'Dover',           climate: 'humid subtropical',  laborLow: 42, laborHigh: 68, paintLow: 32, paintHigh: 72, avgHome: 1800, localTip: 'Delaware\'s coastal location means salt air resistance is important for exterior paints near the shore. The Mid-Atlantic climate is ideal for exterior painting in spring and fall.' },
  { name: 'Florida',       slug: 'paint-calculator-florida',        abbr: 'FL', capital: 'Tallahassee',     climate: 'tropical',           laborLow: 38, laborHigh: 60, paintLow: 30, paintHigh: 68, avgHome: 1900, localTip: 'Florida\'s tropical climate — high humidity, intense UV, and hurricane-driven rain — demands the most moisture and mildew resistant exterior paints available. Elastomeric coatings are popular for stucco homes throughout the state.' },
  { name: 'Georgia',       slug: 'paint-calculator-georgia',        abbr: 'GA', capital: 'Atlanta',         climate: 'humid subtropical',  laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65, avgHome: 1950, localTip: 'Georgia\'s hot, humid summers accelerate mould growth on exterior surfaces. Use paint with built-in mildewcides and consider an antimicrobial additive for all exterior coats.' },
  { name: 'Hawaii',        slug: 'paint-calculator-hawaii',         abbr: 'HI', capital: 'Honolulu',        climate: 'tropical',           laborLow: 55, laborHigh: 85, paintLow: 45, paintHigh: 90, avgHome: 1650, localTip: 'Hawaii\'s tropical climate with salt air, constant humidity, and intense UV requires premium marine-grade or tropical exterior coatings. Paint costs are higher due to shipping to the islands.' },
  { name: 'Idaho',         slug: 'paint-calculator-idaho',          abbr: 'ID', capital: 'Boise',           climate: 'semi-arid',          laborLow: 35, laborHigh: 55, paintLow: 28, paintHigh: 62, avgHome: 1900, localTip: 'Idaho\'s variable climate — hot dry summers and cold winters — requires flexible, UV-resistant exterior paints. Labor costs are below the national average making professional painting more affordable.' },
  { name: 'Illinois',      slug: 'paint-calculator-illinois',       abbr: 'IL', capital: 'Springfield',     climate: 'humid continental',  laborLow: 42, laborHigh: 68, paintLow: 32, paintHigh: 72, avgHome: 1950, localTip: 'Illinois\' extreme temperature range from below zero winters to hot humid summers demands highly flexible exterior paint. Chicago-area labor rates are among the highest in the Midwest.' },
  { name: 'Indiana',       slug: 'paint-calculator-indiana',        abbr: 'IN', capital: 'Indianapolis',    climate: 'humid continental',  laborLow: 35, laborHigh: 55, paintLow: 27, paintHigh: 62, avgHome: 1800, localTip: 'Indiana\'s affordable labor costs make professional painting very accessible. The four-season climate requires good flexibility in exterior paints to handle freeze-thaw cycles.' },
  { name: 'Iowa',          slug: 'paint-calculator-iowa',           abbr: 'IA', capital: 'Des Moines',      climate: 'humid continental',  laborLow: 32, laborHigh: 52, paintLow: 25, paintHigh: 60, avgHome: 1750, localTip: 'Iowa has some of the lowest painting labor costs in the country. The harsh winter climate demands flexible, durable exterior paints. Exterior painting season runs May through September.' },
  { name: 'Kansas',        slug: 'paint-calculator-kansas',         abbr: 'KS', capital: 'Topeka',          climate: 'humid continental',  laborLow: 32, laborHigh: 52, paintLow: 25, paintHigh: 60, avgHome: 1800, localTip: 'Kansas has affordable painting labor costs and a wide temperature range. High winds carry dust and debris — smooth exterior finishes are harder to maintain than textured ones.' },
  { name: 'Kentucky',      slug: 'paint-calculator-kentucky',       abbr: 'KY', capital: 'Frankfort',       climate: 'humid subtropical',  laborLow: 32, laborHigh: 52, paintLow: 25, paintHigh: 60, avgHome: 1750, localTip: 'Kentucky\'s humid climate and moderate temperatures are ideal for most of the year. The state has affordable labor rates and readily available paint supplies in all major cities.' },
  { name: 'Louisiana',     slug: 'paint-calculator-louisiana',      abbr: 'LA', capital: 'Baton Rouge',     climate: 'humid subtropical',  laborLow: 32, laborHigh: 52, paintLow: 27, paintHigh: 62, avgHome: 1800, localTip: 'Louisiana\'s extreme humidity — among the highest in the US — means mold and mildew resistance is the top priority for all exterior and bathroom paints. Use fungicide-fortified coatings throughout.' },
  { name: 'Maine',         slug: 'paint-calculator-maine',          abbr: 'ME', capital: 'Augusta',         climate: 'humid continental',  laborLow: 38, laborHigh: 60, paintLow: 30, paintHigh: 68, avgHome: 1650, localTip: 'Maine\'s harsh coastal winters limit exterior painting to June through September. The salt air along the coast requires marine-grade exterior paints with excellent salt and moisture resistance.' },
  { name: 'Maryland',      slug: 'paint-calculator-maryland',       abbr: 'MD', capital: 'Annapolis',       climate: 'humid subtropical',  laborLow: 45, laborHigh: 72, paintLow: 35, paintHigh: 75, avgHome: 1900, localTip: 'Maryland\'s proximity to DC pushes labor costs above the regional average. The Chesapeake Bay region\'s humidity requires moisture-resistant coatings, especially for homes near the water.' },
  { name: 'Massachusetts', slug: 'paint-calculator-massachusetts',  abbr: 'MA', capital: 'Boston',          climate: 'humid continental',  laborLow: 52, laborHigh: 82, paintLow: 38, paintHigh: 82, avgHome: 1900, localTip: 'Massachusetts has among the highest painting labor costs in New England. Many historic homes have lead paint — always test before sanding or stripping painted surfaces in homes built before 1978.' },
  { name: 'Michigan',      slug: 'paint-calculator-michigan',       abbr: 'MI', capital: 'Lansing',         climate: 'humid continental',  laborLow: 38, laborHigh: 60, paintLow: 28, paintHigh: 65, avgHome: 1850, localTip: 'Michigan\'s Great Lakes location creates high humidity and heavy snowfall. Exterior painting season is limited to May–September. Use moisture-resistant exterior coatings throughout.' },
  { name: 'Minnesota',     slug: 'paint-calculator-minnesota',      abbr: 'MN', capital: 'Saint Paul',      climate: 'subarctic',          laborLow: 40, laborHigh: 62, paintLow: 30, paintHigh: 68, avgHome: 1900, localTip: 'Minnesota\'s extreme winters — among the coldest in the continental US — demand the most flexible and cold-weather-rated exterior paint available. Exterior work is confined to June through September.' },
  { name: 'Mississippi',   slug: 'paint-calculator-mississippi',    abbr: 'MS', capital: 'Jackson',         climate: 'humid subtropical',  laborLow: 28, laborHigh: 48, paintLow: 24, paintHigh: 58, avgHome: 1650, localTip: 'Mississippi has the lowest painting labor costs in the US. The hot, humid climate makes mildew resistance the top requirement for all exterior surfaces.' },
  { name: 'Missouri',      slug: 'paint-calculator-missouri',       abbr: 'MO', capital: 'Jefferson City',  climate: 'humid continental',  laborLow: 33, laborHigh: 53, paintLow: 26, paintHigh: 62, avgHome: 1800, localTip: 'Missouri\'s central location means wide temperature swings — cold winters and hot humid summers. Exterior paint needs both flexibility for freeze-thaw and mildew resistance for summer humidity.' },
  { name: 'Montana',       slug: 'paint-calculator-montana',        abbr: 'MT', capital: 'Helena',          climate: 'semi-arid',          laborLow: 35, laborHigh: 55, paintLow: 28, paintHigh: 62, avgHome: 1800, localTip: 'Montana\'s short painting season (May–September) and intense UV at altitude require UV-resistant exterior paints. Labor costs are moderate but availability of professional painters is limited in rural areas.' },
  { name: 'Nebraska',      slug: 'paint-calculator-nebraska',       abbr: 'NE', capital: 'Lincoln',         climate: 'humid continental',  laborLow: 32, laborHigh: 52, paintLow: 25, paintHigh: 60, avgHome: 1750, localTip: 'Nebraska\'s strong winds and temperature extremes demand durable exterior coatings. The affordable labor market makes professional painting very accessible compared to coastal states.' },
  { name: 'Nevada',        slug: 'paint-calculator-nevada',         abbr: 'NV', capital: 'Carson City',     climate: 'arid desert',        laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68, avgHome: 1900, localTip: 'Nevada\'s desert climate — intense UV, extreme heat, and very low humidity — requires UV-resistant exterior paints. Stucco is the dominant exterior surface and needs elastomeric coatings to bridge hairline cracks.' },
  { name: 'New Hampshire', slug: 'paint-calculator-new-hampshire',  abbr: 'NH', capital: 'Concord',         climate: 'humid continental',  laborLow: 42, laborHigh: 65, paintLow: 32, paintHigh: 72, avgHome: 1750, localTip: 'New Hampshire\'s short exterior painting season (June–September) and harsh winters require premium flexible exterior formulas. Historic covered bridges and colonial homes are common — many have lead paint requiring careful handling.' },
  { name: 'New Jersey',    slug: 'paint-calculator-new-jersey',     abbr: 'NJ', capital: 'Trenton',         climate: 'humid subtropical',  laborLow: 50, laborHigh: 80, paintLow: 38, paintHigh: 80, avgHome: 1900, localTip: 'New Jersey has among the highest painter labor rates in the Northeast, reflecting the high cost of living. Coastal properties require salt-resistant exterior coatings.' },
  { name: 'New Mexico',    slug: 'paint-calculator-new-mexico',     abbr: 'NM', capital: 'Santa Fe',        climate: 'arid desert',        laborLow: 33, laborHigh: 55, paintLow: 28, paintHigh: 62, avgHome: 1800, localTip: 'New Mexico\'s adobe and stucco homes require specialized elastomeric masonry coatings rather than standard exterior paint. The intense UV and dry climate demand maximum UV inhibitors in all exterior products.' },
  { name: 'New York',      slug: 'paint-calculator-new-york',       abbr: 'NY', capital: 'Albany',          climate: 'humid continental',  laborLow: 55, laborHigh: 95, paintLow: 40, paintHigh: 88, avgHome: 1950, localTip: 'New York City and surrounding metro areas have the highest painter labor rates in the country — $70–$110 per hour. Upstate NY labor rates are more moderate. Many older homes contain lead paint requiring certified removal.' },
  { name: 'North Carolina',slug: 'paint-calculator-north-carolina', abbr: 'NC', capital: 'Raleigh',         climate: 'humid subtropical',  laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65, avgHome: 1900, localTip: 'North Carolina\'s rapidly growing cities like Raleigh and Charlotte have increasing demand for painters. The humid Piedmont and coastal regions require mildew-resistant exterior coatings throughout.' },
  { name: 'North Dakota',  slug: 'paint-calculator-north-dakota',   abbr: 'ND', capital: 'Bismarck',        climate: 'subarctic',          laborLow: 35, laborHigh: 55, paintLow: 27, paintHigh: 62, avgHome: 1650, localTip: 'North Dakota has the most extreme winters in the continental US. Exterior painting is limited to a very short season. Premium cold-weather-rated exterior paints are essential for longevity.' },
  { name: 'Ohio',          slug: 'paint-calculator-ohio',           abbr: 'OH', capital: 'Columbus',        climate: 'humid continental',  laborLow: 35, laborHigh: 58, paintLow: 27, paintHigh: 64, avgHome: 1850, localTip: 'Ohio\'s Great Lakes influence creates high humidity and significant freeze-thaw cycles. Flexible, moisture-resistant exterior paints are important throughout the state.' },
  { name: 'Oklahoma',      slug: 'paint-calculator-oklahoma',       abbr: 'OK', capital: 'Oklahoma City',   climate: 'humid subtropical',  laborLow: 30, laborHigh: 50, paintLow: 25, paintHigh: 60, avgHome: 1800, localTip: 'Oklahoma\'s wide temperature range and severe weather — including tornadoes and hail — can accelerate paint wear on exterior surfaces. Durable, weather-resistant coatings are worth the investment.' },
  { name: 'Oregon',        slug: 'paint-calculator-oregon',         abbr: 'OR', capital: 'Salem',           climate: 'oceanic',            laborLow: 45, laborHigh: 72, paintLow: 35, paintHigh: 75, avgHome: 1900, localTip: 'Oregon\'s wet Pacific coast climate demands excellent moisture and mildew resistance for all exterior surfaces. Portland metro has higher labor costs than rural Oregon. The dry summer season is ideal for exterior painting.' },
  { name: 'Pennsylvania',  slug: 'paint-calculator-pennsylvania',   abbr: 'PA', capital: 'Harrisburg',      climate: 'humid continental',  laborLow: 40, laborHigh: 65, paintLow: 30, paintHigh: 70, avgHome: 1900, localTip: 'Pennsylvania has many historic properties — Philadelphia and Pittsburgh both have significant stocks of pre-1978 housing that may contain lead paint. Always test before disturbing old painted surfaces.' },
  { name: 'Rhode Island',  slug: 'paint-calculator-rhode-island',   abbr: 'RI', capital: 'Providence',      climate: 'humid continental',  laborLow: 48, laborHigh: 75, paintLow: 36, paintHigh: 78, avgHome: 1650, localTip: 'Rhode Island\'s coastal New England location means salt air, humidity, and freeze-thaw cycles all affect exterior paint longevity. Use premium flexible exterior coatings for best results.' },
  { name: 'South Carolina',slug: 'paint-calculator-south-carolina', abbr: 'SC', capital: 'Columbia',        climate: 'humid subtropical',  laborLow: 32, laborHigh: 52, paintLow: 26, paintHigh: 62, avgHome: 1800, localTip: 'South Carolina\'s hot, humid summers are ideal conditions for mold growth on exterior surfaces. Always use mildewcide-fortified exterior paint, especially in the coastal Lowcountry region.' },
  { name: 'South Dakota',  slug: 'paint-calculator-south-dakota',   abbr: 'SD', capital: 'Pierre',          climate: 'semi-arid',          laborLow: 32, laborHigh: 50, paintLow: 25, paintHigh: 58, avgHome: 1700, localTip: 'South Dakota\'s dramatic temperature swings demand highly flexible exterior paints. The dry climate with intense UV in the western Badlands region requires strong UV inhibitors in all exterior coatings.' },
  { name: 'Tennessee',     slug: 'paint-calculator-tennessee',      abbr: 'TN', capital: 'Nashville',       climate: 'humid subtropical',  laborLow: 33, laborHigh: 55, paintLow: 26, paintHigh: 62, avgHome: 1900, localTip: 'Tennessee\'s booming Nashville and Knoxville markets have pushed painting labor costs up in recent years. The humid climate requires mildew-resistant coatings for exterior surfaces.' },
  { name: 'Texas',         slug: 'paint-calculator-texas',          abbr: 'TX', capital: 'Austin',          climate: 'varied',             laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65, avgHome: 2000, localTip: 'Texas is the most climatically diverse state — from humid Houston to arid El Paso. Houston and coastal areas need maximum mildew resistance. Dallas and West Texas need UV-resistant coatings. Austin and San Antonio have rapidly rising labor costs.' },
  { name: 'Utah',          slug: 'paint-calculator-utah',           abbr: 'UT', capital: 'Salt Lake City',  climate: 'semi-arid',          laborLow: 38, laborHigh: 60, paintLow: 30, paintHigh: 68, avgHome: 2000, localTip: 'Utah\'s high altitude means intense UV exposure — use premium UV-resistant exterior coatings. The dry climate is excellent for exterior painting with fast drying times most of the year.' },
  { name: 'Vermont',       slug: 'paint-calculator-vermont',        abbr: 'VT', capital: 'Montpelier',      climate: 'humid continental',  laborLow: 40, laborHigh: 62, paintLow: 30, paintHigh: 68, avgHome: 1600, localTip: 'Vermont\'s harsh winters and short exterior painting season (June–September) demand the highest-grade flexible exterior paint. Many historic properties require lead paint testing before any stripping or sanding.' },
  { name: 'Virginia',      slug: 'paint-calculator-virginia',       abbr: 'VA', capital: 'Richmond',        climate: 'humid subtropical',  laborLow: 40, laborHigh: 65, paintLow: 32, paintHigh: 72, avgHome: 1950, localTip: 'Virginia\'s Northern Virginia/DC suburbs have labor costs comparable to the DC metro area. The coastal Tidewater region requires salt and moisture-resistant exterior coatings.' },
  { name: 'Washington',    slug: 'paint-calculator-washington',     abbr: 'WA', capital: 'Olympia',         climate: 'oceanic',            laborLow: 48, laborHigh: 78, paintLow: 36, paintHigh: 78, avgHome: 1950, localTip: 'Washington\'s rainy Pacific Northwest climate is the most demanding for exterior coatings in the US — constant moisture, mold pressure, and cool temperatures. Seattle metro has high labor costs. Use premium mildew-resistant exterior paint.' },
  { name: 'West Virginia', slug: 'paint-calculator-west-virginia',  abbr: 'WV', capital: 'Charleston',      climate: 'humid continental',  laborLow: 28, laborHigh: 48, paintLow: 24, paintHigh: 58, avgHome: 1600, localTip: 'West Virginia has among the lowest painting labor costs in the US. The mountainous terrain and four-season climate require flexible exterior coatings for freeze-thaw resistance.' },
  { name: 'Wisconsin',     slug: 'paint-calculator-wisconsin',      abbr: 'WI', capital: 'Madison',         climate: 'humid continental',  laborLow: 38, laborHigh: 60, paintLow: 28, paintHigh: 65, avgHome: 1800, localTip: 'Wisconsin\'s cold winters and hot summers require highly flexible exterior paints. Milwaukee and Madison metro areas have moderate labor costs. Exterior painting season runs May through September.' },
  { name: 'Wyoming',       slug: 'paint-calculator-wyoming',        abbr: 'WY', capital: 'Cheyenne',        climate: 'semi-arid',          laborLow: 35, laborHigh: 55, paintLow: 28, paintHigh: 62, avgHome: 1750, localTip: 'Wyoming\'s high altitude (the highest average elevation of any state), extreme winds, and UV intensity demand the most UV-resistant and durable exterior coatings. Labor costs are moderate but qualified painters are scarce in rural areas.' },
];

// ─── PRE-FILL STATE ───────────────────────────────────────────────────────────
// Same bedroom default as the reference bedroom page
const BASE64_PARAM = (() => {
  const state = {
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex', finish: 'eggshell',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 400, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 35, primerPrice: 25, calculateLabor: false,
      laborRate: 50, includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_state_prefill',
      measurements: {
        name: 'Room', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_state_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_state_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
      },
      surfaces: { walls: true, ceiling: false, trim: false, doors: false },
      extras: {
        accentWall: false, accentWallArea: '', wainscoting: false,
        wainscotingHeight: 36, crownMolding: false,
        builtIns: false, builtInsArea: '', fireplace: false, fireplaceArea: '',
      },
    }],
  };
  return Buffer.from(JSON.stringify(state)).toString('base64url');
})();

// ─── PAGE GENERATOR ───────────────────────────────────────────────────────────
function generatePage(s) {
  const canonicalSlug = s.slug;
  const profLaborRange = `$${s.laborLow}–$${s.laborHigh}/hr`;
  const paintRange     = `$${s.paintLow}–$${s.paintHigh}/gal`;
  const roomCostLow  = Math.round(s.avgHome / 200) * 10 + 120;
  const roomCostHigh = roomCostLow + 400;
  const houseCostLow  = Math.round(s.avgHome * 1.1);
  const houseCostHigh = Math.round(s.avgHome * 2.4);

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `How much paint do I need for an average ${s.name} home?`, acceptedAnswer: { '@type': 'Answer', text: `An average ${s.name} home of around ${s.avgHome} sq ft needs 15–20 gallons for a full interior repaint (walls, ceilings, trim). Use the calculator above for a precise estimate based on your actual room dimensions.` } },
      { '@type': 'Question', name: `How much does it cost to paint a room in ${s.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Professional painters in ${s.name} charge $${s.laborLow}–$${s.laborHigh} per hour. An average room costs $${roomCostLow}–$${roomCostHigh} professionally. DIY painting costs $60–$150 in paint and supplies.` } },
      { '@type': 'Question', name: `What type of exterior paint works best in ${s.name}?`, acceptedAnswer: { '@type': 'Answer', text: `For ${s.name}'s ${s.climate} climate, use a 100% acrylic exterior latex paint. ${s.localTip}` } },
      { '@type': 'Question', name: `How much does exterior house painting cost in ${s.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Exterior painting for an average ${s.name} home costs $${houseCostLow}–$${houseCostHigh} professionally. DIY exterior painting costs $400–$1,200 in paint and supplies depending on home size.` } },
      { '@type': 'Question', name: `How many gallons of paint for a room in ${s.name}?`, acceptedAnswer: { '@type': 'Answer', text: `A standard 12×14 room in ${s.name} needs about 2 gallons for two coats on the walls. Use the ${s.name} paint calculator above and enter your exact dimensions for a precise estimate.` } },
      { '@type': 'Question', name: `When is the best time to paint the exterior of a house in ${s.name}?`, acceptedAnswer: { '@type': 'Answer', text: `In ${s.name}'s ${s.climate} climate, the best time for exterior painting is when temperatures are between 50°F and 85°F with low humidity and no rain forecast. Spring and fall are typically ideal in most parts of ${s.name}.` } },
    ],
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: `Paint Calculator ${s.name}`, item: `https://thepaintcalculator.com/${canonicalSlug}` },
    ],
  });

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Paint Calculator ${s.name} — How Much Paint Do You Need?`,
    description: `Free paint calculator for ${s.name} homeowners. Get accurate paint estimates for any room or whole house with local ${s.name} cost data and climate-specific tips.`,
    url: `https://thepaintcalculator.com/${canonicalSlug}`,
    publisher: { '@type': 'Organization', name: 'ThePaintCalculator.com', url: 'https://thepaintcalculator.com' },
  });

  return `import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

function getStateParam(): string {
  const state = {
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex', finish: 'eggshell',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 400, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: ${Math.round((s.paintLow + s.paintHigh) / 2)},
      primerPrice: 25, calculateLabor: false,
      laborRate: ${Math.round((s.laborLow + s.laborHigh) / 2)},
      includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_state_prefill',
      measurements: {
        name: 'Room', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_state_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_state_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
      },
      surfaces: { walls: true, ceiling: false, trim: false, doors: false },
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
      ? 'https://thepaintcalculator.com/${canonicalSlug}'
      : \`https://thepaintcalculator.com/\${locale}/${canonicalSlug}\`;
  return {
    title: 'Paint Calculator ${s.name} — How Much Paint Do You Need? | ThePaintCalculator.com',
    description: 'Free paint calculator for ${s.name} homeowners. Instant estimates for any room or whole house. Includes local ${s.name} painter costs, climate tips, and paint recommendations. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Calculator ${s.name} — Free Paint Estimator',
      description: 'Free paint calculator for ${s.name} homeowners. Get instant estimates with local ${s.name} cost data.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCalculator${s.name.replace(/\s+/g, '')}({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const stateParam = getStateParam();

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
            <li className="text-gray-700 font-medium">Paint Calculator ${s.name}</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Calculator ${s.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Free paint calculator for <strong>${s.name} homeowners</strong>. Get an exact paint estimate for any room or whole house — pre-filled for a standard 12×14 room. Includes local ${s.name} painter costs and climate-specific recommendations. No signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer — ${s.name}</p>
          <p className="text-2xl font-bold mb-1">2 gallons for a standard room</p>
          <p className="text-sm opacity-90">Professional painters in ${s.name} charge ${profLaborRange} · Paint costs ${paintRange}</p>
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
                    url.searchParams.set('p', '\${stateParam}');
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
            How Much Paint Do You Need in ${s.name}?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The amount of paint needed is the same regardless of state — a standard 12×14 room needs about 2 gallons for two coats on the walls. What varies by state is paint cost, labor rates, and the type of exterior paint best suited to the local climate.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            In ${s.name}, paint costs range from <strong>${paintRange} per gallon</strong> depending on brand and quality. Professional painter labor rates in ${s.name} run <strong>${profLaborRange}</strong>. Use the calculator above — pre-filled for a standard 12×14 room — and adjust for your exact dimensions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Paint Calculator — Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Room Size</th>
                  <th className="px-4 py-3 text-left font-semibold">Paint Needed (2 coats)</th>
                  <th className="px-4 py-3 text-left font-semibold">DIY Cost (${s.abbr})</th>
                  <th className="px-4 py-3 text-left font-semibold">Pro Cost (${s.abbr})</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">10×10</td>
                  <td className="px-4 py-3 text-gray-700">1.3 gal</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(1.3 * s.paintLow + 30)}–$${Math.round(1.3 * s.paintHigh + 60)}</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(s.laborLow * 3 + 40)}–$${Math.round(s.laborHigh * 3 + 80)}</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">12×14</td>
                  <td className="px-4 py-3 text-gray-700">1.8 gal</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(1.8 * s.paintLow + 40)}–$${Math.round(1.8 * s.paintHigh + 70)}</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(s.laborLow * 5 + 50)}–$${Math.round(s.laborHigh * 5 + 100)}</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">15×20</td>
                  <td className="px-4 py-3 text-gray-700">2.9 gal</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(2.9 * s.paintLow + 50)}–$${Math.round(2.9 * s.paintHigh + 80)}</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(s.laborLow * 7 + 60)}–$${Math.round(s.laborHigh * 7 + 120)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Whole house (~${s.avgHome} sq ft)</td>
                  <td className="px-4 py-3 text-gray-700">18–22 gal</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(20 * s.paintLow + 200)}–$${Math.round(20 * s.paintHigh + 400)}</td>
                  <td className="px-4 py-3 text-gray-700">$${houseCostLow.toLocaleString()}–$${houseCostHigh.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Painter Labor Costs in ${s.name}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional painters in ${s.name} charge <strong>${profLaborRange} per hour</strong>. For a standard 12×14 bedroom, expect to pay $${Math.round(s.laborLow * 5 + 50)}–$${Math.round(s.laborHigh * 5 + 100)} professionally including paint and labour. For whole-house interior painting, budget $${houseCostLow.toLocaleString()}–$${houseCostHigh.toLocaleString()} for an average ${s.name} home.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DIY painting saves 60–70% compared to hiring professionals. In ${s.name}, a typical room costs $${Math.round(1.8 * s.paintLow + 40)}–$${Math.round(1.8 * s.paintHigh + 70)} in paint and supplies for a standard 12×14 room. Use the paint cost calculator to estimate your full project cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Best Exterior Paint for ${s.name}'s Climate
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ${s.name} has a <strong>${s.climate} climate</strong>. ${s.localTip}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For interior painting, the same rules apply regardless of state — eggshell for living areas and bedrooms, satin for kitchens and bathrooms, flat white for ceilings, and semi-gloss for all trim and doors.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Tips for Painting in ${s.name}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Get multiple quotes.</strong> Painter prices in ${s.name} vary significantly. Get at least three quotes for any professional job — prices often differ by 30–50% for identical work.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Buy paint locally.</strong> ${s.name} has Sherwin-Williams, Benjamin Moore, and Home Depot stores throughout the state. Buying locally ensures the correct formulation for ${s.name}'s climate and allows colour matching at the store.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Check the weather.</strong> For exterior painting in ${s.name}, check the forecast for 48 hours before and after application. Temperatures should be between 50°F and 85°F with no rain expected.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Use the paint calculator.</strong> Adjust the calculator above for your exact room dimensions to avoid buying too much or running short mid-project. Always round up to the next whole gallon.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={\`/\${locale}/bedroom-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={\`/\${locale}/living-room-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={\`/\${locale}/exterior-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={\`/\${locale}/whole-house-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={\`/\${locale}/paint-cost-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={\`/\${locale}/how-much-does-it-cost-to-paint-a-room\`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={\`/\${locale}/how-to-calculate-paint-for-a-room\`} className="text-blue-600 hover:text-blue-700 font-medium">How to Calculate Paint for a Room →</Link></li>
            <li><Link href={\`/\${locale}/best-exterior-paint-for-houses\`} className="text-blue-600 hover:text-blue-700 font-medium">Best Exterior Paint for Houses →</Link></li>
            <li><Link href={\`/\${locale}\`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator — Calculate Any Room →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for an average ${s.name} home?</h3>
              <p className="text-gray-700">An average ${s.name} home of around ${s.avgHome} sq ft needs 15–20 gallons for a full interior repaint. Use the calculator above for a precise estimate based on your actual room dimensions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room in ${s.name}?</h3>
              <p className="text-gray-700">Professional painters in ${s.name} charge ${profLaborRange}. An average room costs $${Math.round(s.laborLow * 5 + 50)}–$${Math.round(s.laborHigh * 5 + 100)} professionally. DIY painting costs $60–$150 in paint and supplies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What type of exterior paint works best in ${s.name}?</h3>
              <p className="text-gray-700">For ${s.name}'s ${s.climate} climate, use a 100% acrylic exterior latex. ${s.localTip}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior house painting cost in ${s.name}?</h3>
              <p className="text-gray-700">Exterior painting for an average ${s.name} home costs $${houseCostLow.toLocaleString()}–$${houseCostHigh.toLocaleString()} professionally. DIY costs $400–$1,200 in paint and supplies depending on home size.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many gallons of paint for a room in ${s.name}?</h3>
              <p className="text-gray-700">A standard 12×14 room needs about 2 gallons for two coats on the walls. Enter your exact dimensions in the ${s.name} paint calculator above for a precise estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint the exterior in ${s.name}?</h3>
              <p className="text-gray-700">In ${s.name}'s ${s.climate} climate, paint exterior surfaces when temperatures are between 50°F and 85°F with low humidity and no rain forecast. Spring and fall are typically ideal in most parts of ${s.name}.</p>
            </div>
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

for (const s of states) {
  const dir  = path.join(projectRoot, 'app', '[locale]', s.slug);
  const file = path.join(dir, 'page.tsx');

  if (fs.existsSync(file)) {
    console.log('SKIP (exists):', s.slug);
    skipped++;
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, generatePage(s), 'utf8');
  console.log('Created:', s.slug);
  created++;
}

console.log(`\nDone! Created: ${created} | Skipped: ${skipped} | Total: ${states.length}`);
