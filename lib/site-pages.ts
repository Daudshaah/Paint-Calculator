// ─────────────────────────────────────────────────────────────────────────────
// lib/site-pages.ts — SINGLE SOURCE OF TRUTH
// HOW TO ADD NEW PAGES: Add entry to correct array below.
// Nav, footer, and hub pages update automatically.
// ─────────────────────────────────────────────────────────────────────────────

export interface SitePage {
  label: string;
  slug: string;
  description?: string;
}

// ─── CALCULATORS — BY ROOM ───────────────────────────────────────────────────
export const calculatorsByRoom: SitePage[] = [
  { label: 'Bedroom Paint Calculator', slug: 'bedroom-paint-calculator' },
  { label: 'Bathroom Paint Calculator', slug: 'bathroom-paint-calculator' },
  { label: 'Kitchen Paint Calculator', slug: 'kitchen-paint-calculator' },
  { label: 'Living Room Paint Calculator', slug: 'living-room-paint-calculator' },
  { label: 'Ceiling Paint Calculator', slug: 'ceiling-paint-calculator' },
  { label: 'Garage Paint Calculator', slug: 'garage-paint-calculator' },
  { label: 'Basement Paint Calculator', slug: 'basement-paint-calculator' },
  { label: 'Hallway Paint Calculator', slug: 'hallway-paint-calculator' },
  { label: 'Nursery Paint Calculator', slug: 'nursery-paint-calculator' },
  { label: 'Dining Room Paint Calculator', slug: 'dining-room-paint-calculator' },
];

// ─── CALCULATORS — SPECIALTY ─────────────────────────────────────────────────
export const calculatorsSpecialty: SitePage[] = [
  { label: 'Exterior Paint Calculator', slug: 'exterior-paint-calculator' },
  { label: 'Whole House Paint Calculator', slug: 'whole-house-paint-calculator' },
  { label: 'Paint Cost Calculator', slug: 'paint-cost-calculator' },
  { label: 'Primer Calculator', slug: 'primer-calculator' },
  { label: 'Cabinet Paint Calculator', slug: 'cabinet-paint-calculator' },
  { label: 'Fence Paint Calculator', slug: 'fence-paint-calculator' },
  { label: 'Deck Paint Calculator', slug: 'deck-paint-calculator' },
  { label: 'Deck Stain Calculator', slug: 'deck-stain-calculator' },
  { label: 'Spray Paint Calculator', slug: 'spray-paint-calculator' },
  { label: 'Stain Calculator', slug: 'stain-calculator' },
  { label: 'Roof Paint Calculator', slug: 'roof-paint-calculator' },
  { label: 'Driveway Paint Calculator', slug: 'driveway-paint-calculator' },
  { label: 'Paint Coverage Calculator', slug: 'paint-coverage-calculator' },
  { label: 'Textured Wall Paint Calculator', slug: 'textured-wall-paint-calculator' },
  { label: 'Two Coat Paint Calculator', slug: 'two-coat-paint-calculator' },
];

// ─── CALCULATORS — COMMERCIAL ────────────────────────────────────────────────
export const calculatorsCommercial: SitePage[] = [
  { label: 'Paint Calculator for Contractors', slug: 'paint-calculator-for-contractors' },
  { label: 'Commercial Paint Calculator', slug: 'commercial-paint-calculator' },
  { label: 'Warehouse Paint Calculator', slug: 'warehouse-paint-calculator' },
  { label: 'Office Building Paint Calculator', slug: 'office-building-paint-calculator' },
  { label: 'School Paint Calculator', slug: 'school-paint-calculator' },
  { label: 'Hotel Paint Calculator', slug: 'hotel-paint-calculator' },
  { label: 'Industrial Paint Calculator', slug: 'industrial-paint-calculator' },
];

// ─── HOW MUCH PAINT ───────────────────────────────────────────────────────────
export const howMuchPaintPages: SitePage[] = [
  { label: 'How Much Paint for a 10x10 Room', slug: 'how-much-paint-for-a-10x10-room' },
  { label: 'How Much Paint for a 10x8 Room', slug: 'how-much-paint-for-a-10x8-room' },
  { label: 'How Much Paint for a 12x12 Room', slug: 'how-much-paint-for-a-12x12-room' },
  { label: 'How Much Paint for a 12x14 Room', slug: 'how-much-paint-for-a-12x14-room' },
  { label: 'How Much Paint for a 14x14 Room', slug: 'how-much-paint-for-a-14x14-room' },
  { label: 'How Much Paint for a 15x15 Room', slug: 'how-much-paint-for-a-15x15-room' },
  { label: 'How Much Paint for a Bedroom', slug: 'how-much-paint-for-a-bedroom' },
  { label: 'How Much Paint for a Living Room', slug: 'how-much-paint-for-a-living-room' },
  { label: 'How Much Paint for a Bathroom', slug: 'how-much-paint-for-a-bathroom' },
  { label: 'How Much Paint for a Ceiling', slug: 'how-much-paint-for-a-ceiling' },
  { label: 'How Much Paint for a Garage', slug: 'how-much-paint-for-a-garage' },
  { label: 'How Much Paint for a Deck', slug: 'how-much-paint-for-a-deck' },
  { label: 'How Much Paint for a Fence', slug: 'how-much-paint-for-a-fence' },
  { label: 'How Much Paint for a Front Door', slug: 'how-much-paint-for-a-front-door' },
  { label: 'How Much Paint for Kitchen Cabinets', slug: 'how-much-paint-for-kitchen-cabinets' },
  { label: 'How Much Paint for a 1000 Sq Ft House', slug: 'how-much-paint-for-a-1000-sq-ft-house' },
  { label: 'How Much Paint for a 1500 Sq Ft House', slug: 'how-much-paint-for-a-1500-sq-ft-house' },
  { label: 'How Much Paint for a 2000 Sq Ft House', slug: 'how-much-paint-for-a-2000-sq-ft-house' },
  { label: 'How Much Paint for Interior of House', slug: 'how-much-paint-for-interior-of-house' },
  { label: 'How Much Paint for Brick Wall', slug: 'how-much-paint-for-brick-wall' },
  { label: 'How Much Paint for Stucco', slug: 'how-much-paint-for-stucco' },
  { label: 'How Much Paint to Cover 500 Sq Ft', slug: 'how-much-paint-to-cover-500-sq-ft' },
  { label: 'How Many Gallons of Paint for a Room', slug: 'how-many-gallons-of-paint-for-a-room' },
];

// ─── HOW-TO GUIDES ────────────────────────────────────────────────────────────
export const howToGuides: SitePage[] = [
  { label: 'How to Calculate Paint for a Room', slug: 'how-to-calculate-paint-for-a-room' },
  { label: 'How Many Coats of Paint Do You Need?', slug: 'how-many-coats-of-paint' },
  { label: 'Do I Need Primer Before Painting?', slug: 'do-i-need-primer-before-painting' },
  { label: 'Interior vs Exterior Paint', slug: 'interior-vs-exterior-paint' },
  { label: 'Paint Finish Guide', slug: 'paint-finish-guide' },
  { label: 'How Long Does It Take to Paint a Room?', slug: 'how-long-to-paint-a-room' },
  { label: 'How to Paint a Room Step by Step', slug: 'how-to-paint-a-room' },
  { label: 'One Coat vs Two Coats of Paint', slug: 'one-coat-vs-two-coats-of-paint' },
  { label: 'How Much Paint Does a Gallon Cover?', slug: 'how-much-paint-does-a-gallon-cover' },
  { label: 'Paint Coverage Per Gallon', slug: 'paint-coverage-per-gallon' },
  { label: 'Best Paint for Bathrooms', slug: 'best-paint-for-bathrooms' },
  { label: 'Best Paint for Kitchen Cabinets', slug: 'best-paint-for-kitchen-cabinets' },
  { label: 'Best Exterior Paint for Houses', slug: 'best-exterior-paint-for-houses' },
  { label: 'How to Choose Paint Color for a Room', slug: 'how-to-choose-paint-color-for-a-room' },
  { label: 'Spray Paint vs Roller vs Brush', slug: 'spray-paint-vs-roller-vs-brush' },
];

// ─── COST GUIDES ──────────────────────────────────────────────────────────────
export const costGuides: SitePage[] = [
  { label: 'How Much Does It Cost to Paint a Room?', slug: 'how-much-does-it-cost-to-paint-a-room' },
  { label: 'Cost to Paint a Bedroom', slug: 'cost-to-paint-bedroom' },
  { label: 'Cost to Paint Exterior of House', slug: 'cost-to-paint-exterior-house' },
  { label: 'Cost to Paint Kitchen Cabinets', slug: 'cost-to-paint-kitchen-cabinets' },
  { label: 'Cost to Paint a Living Room', slug: 'cost-to-paint-living-room' },
  { label: 'Cost to Paint a Bathroom', slug: 'cost-to-paint-bathroom' },
  { label: 'Cost to Paint Whole House Interior', slug: 'cost-to-paint-whole-house-interior' },
  { label: 'Cost to Paint a Garage', slug: 'cost-to-paint-garage' },
  { label: 'Cost to Paint a Deck', slug: 'cost-to-paint-deck' },
  { label: 'Cost to Paint a Front Door', slug: 'cost-to-paint-front-door' },
];

// ─── US STATES ────────────────────────────────────────────────────────────────
export const statePages: SitePage[] = [
  { label: 'Alabama', slug: 'paint-calculator-alabama' },
  { label: 'Alaska', slug: 'paint-calculator-alaska' },
  { label: 'Arizona', slug: 'paint-calculator-arizona' },
  { label: 'Arkansas', slug: 'paint-calculator-arkansas' },
  { label: 'California', slug: 'paint-calculator-california' },
  { label: 'Colorado', slug: 'paint-calculator-colorado' },
  { label: 'Connecticut', slug: 'paint-calculator-connecticut' },
  { label: 'Delaware', slug: 'paint-calculator-delaware' },
  { label: 'Florida', slug: 'paint-calculator-florida' },
  { label: 'Georgia', slug: 'paint-calculator-georgia' },
  { label: 'Hawaii', slug: 'paint-calculator-hawaii' },
  { label: 'Idaho', slug: 'paint-calculator-idaho' },
  { label: 'Illinois', slug: 'paint-calculator-illinois' },
  { label: 'Indiana', slug: 'paint-calculator-indiana' },
  { label: 'Iowa', slug: 'paint-calculator-iowa' },
  { label: 'Kansas', slug: 'paint-calculator-kansas' },
  { label: 'Kentucky', slug: 'paint-calculator-kentucky' },
  { label: 'Louisiana', slug: 'paint-calculator-louisiana' },
  { label: 'Maine', slug: 'paint-calculator-maine' },
  { label: 'Maryland', slug: 'paint-calculator-maryland' },
  { label: 'Massachusetts', slug: 'paint-calculator-massachusetts' },
  { label: 'Michigan', slug: 'paint-calculator-michigan' },
  { label: 'Minnesota', slug: 'paint-calculator-minnesota' },
  { label: 'Mississippi', slug: 'paint-calculator-mississippi' },
  { label: 'Missouri', slug: 'paint-calculator-missouri' },
  { label: 'Montana', slug: 'paint-calculator-montana' },
  { label: 'Nebraska', slug: 'paint-calculator-nebraska' },
  { label: 'Nevada', slug: 'paint-calculator-nevada' },
  { label: 'New Hampshire', slug: 'paint-calculator-new-hampshire' },
  { label: 'New Jersey', slug: 'paint-calculator-new-jersey' },
  { label: 'New Mexico', slug: 'paint-calculator-new-mexico' },
  { label: 'New York', slug: 'paint-calculator-new-york' },
  { label: 'North Carolina', slug: 'paint-calculator-north-carolina' },
  { label: 'North Dakota', slug: 'paint-calculator-north-dakota' },
  { label: 'Ohio', slug: 'paint-calculator-ohio' },
  { label: 'Oklahoma', slug: 'paint-calculator-oklahoma' },
  { label: 'Oregon', slug: 'paint-calculator-oregon' },
  { label: 'Pennsylvania', slug: 'paint-calculator-pennsylvania' },
  { label: 'Rhode Island', slug: 'paint-calculator-rhode-island' },
  { label: 'South Carolina', slug: 'paint-calculator-south-carolina' },
  { label: 'South Dakota', slug: 'paint-calculator-south-dakota' },
  { label: 'Tennessee', slug: 'paint-calculator-tennessee' },
  { label: 'Texas', slug: 'paint-calculator-texas' },
  { label: 'Utah', slug: 'paint-calculator-utah' },
  { label: 'Vermont', slug: 'paint-calculator-vermont' },
  { label: 'Virginia', slug: 'paint-calculator-virginia' },
  { label: 'Washington', slug: 'paint-calculator-washington' },
  { label: 'West Virginia', slug: 'paint-calculator-west-virginia' },
  { label: 'Wisconsin', slug: 'paint-calculator-wisconsin' },
  { label: 'Wyoming', slug: 'paint-calculator-wyoming' },
];

// ─── US CITIES ────────────────────────────────────────────────────────────────
export const cityPages: SitePage[] = [
  { label: 'Houston, TX', slug: 'paint-calculator-houston-tx' },
  { label: 'Dallas, TX', slug: 'paint-calculator-dallas-tx' },
  { label: 'Austin, TX', slug: 'paint-calculator-austin-tx' },
  { label: 'San Antonio, TX', slug: 'paint-calculator-san-antonio-tx' },
  { label: 'Fort Worth, TX', slug: 'paint-calculator-fort-worth-tx' },
  { label: 'Los Angeles, CA', slug: 'paint-calculator-los-angeles-ca' },
  { label: 'San Diego, CA', slug: 'paint-calculator-san-diego-ca' },
  { label: 'San Jose, CA', slug: 'paint-calculator-san-jose-ca' },
  { label: 'San Francisco, CA', slug: 'paint-calculator-san-francisco-ca' },
  { label: 'Sacramento, CA', slug: 'paint-calculator-sacramento-ca' },
  { label: 'Miami, FL', slug: 'paint-calculator-miami-fl' },
  { label: 'Orlando, FL', slug: 'paint-calculator-orlando-fl' },
  { label: 'Tampa, FL', slug: 'paint-calculator-tampa-fl' },
  { label: 'Jacksonville, FL', slug: 'paint-calculator-jacksonville-fl' },
  { label: 'Fort Lauderdale, FL', slug: 'paint-calculator-fort-lauderdale-fl' },
  { label: 'New York City, NY', slug: 'paint-calculator-new-york-city-ny' },
  { label: 'Buffalo, NY', slug: 'paint-calculator-buffalo-ny' },
  { label: 'Rochester, NY', slug: 'paint-calculator-rochester-ny' },
  { label: 'Phoenix, AZ', slug: 'paint-calculator-phoenix-az' },
  { label: 'Tucson, AZ', slug: 'paint-calculator-tucson-az' },
  { label: 'Atlanta, GA', slug: 'paint-calculator-atlanta-ga' },
  { label: 'Charlotte, NC', slug: 'paint-calculator-charlotte-nc' },
  { label: 'Chicago, IL', slug: 'paint-calculator-chicago-il' },
  { label: 'Columbus, OH', slug: 'paint-calculator-columbus-oh' },
  { label: 'Philadelphia, PA', slug: 'paint-calculator-philadelphia-pa' },
  { label: 'Pittsburgh, PA', slug: 'paint-calculator-pittsburgh-pa' },
  { label: 'Denver, CO', slug: 'paint-calculator-denver-co' },
  { label: 'Seattle, WA', slug: 'paint-calculator-seattle-wa' },
  { label: 'Portland, OR', slug: 'paint-calculator-portland-or' },
  { label: 'Las Vegas, NV', slug: 'paint-calculator-las-vegas-nv' },
  { label: 'Nashville, TN', slug: 'paint-calculator-nashville-tn' },
  { label: 'Memphis, TN', slug: 'paint-calculator-memphis-tn' },
  { label: 'Minneapolis, MN', slug: 'paint-calculator-minneapolis-mn' },
  { label: 'Boston, MA', slug: 'paint-calculator-boston-ma' },
  { label: 'Detroit, MI', slug: 'paint-calculator-detroit-mi' },
  { label: 'Indianapolis, IN', slug: 'paint-calculator-indianapolis-in' },
  { label: 'Louisville, KY', slug: 'paint-calculator-louisville-ky' },
  { label: 'Baltimore, MD', slug: 'paint-calculator-baltimore-md' },
  { label: 'Washington DC', slug: 'paint-calculator-washington-dc' },
  { label: 'Raleigh, NC', slug: 'paint-calculator-raleigh-nc' },
  { label: 'Oklahoma City, OK', slug: 'paint-calculator-oklahoma-city-ok' },
  { label: 'Albuquerque, NM', slug: 'paint-calculator-albuquerque-nm' },
  { label: 'Kansas City, MO', slug: 'paint-calculator-kansas-city-mo' },
  { label: 'St. Louis, MO', slug: 'paint-calculator-st-louis-mo' },
  { label: 'Milwaukee, WI', slug: 'paint-calculator-milwaukee-wi' },
  { label: 'Omaha, NE', slug: 'paint-calculator-omaha-ne' },
  { label: 'Richmond, VA', slug: 'paint-calculator-richmond-va' },
  { label: 'Virginia Beach, VA', slug: 'paint-calculator-virginia-beach-va' },
  { label: 'Salt Lake City, UT', slug: 'paint-calculator-salt-lake-city-ut' },
  { label: 'Boise, ID', slug: 'paint-calculator-boise-id' },
];

// ─── ROOM-TYPE × LOCATION ─────────────────────────────────────────────────────
export const locationVariantPages: SitePage[] = [
  { label: 'Bedroom Calculator – Texas', slug: 'bedroom-paint-calculator-texas' },
  { label: 'Bedroom Calculator – California', slug: 'bedroom-paint-calculator-california' },
  { label: 'Bedroom Calculator – Florida', slug: 'bedroom-paint-calculator-florida' },
  { label: 'Bedroom Calculator – Houston', slug: 'bedroom-paint-calculator-houston' },
  { label: 'Bedroom Calculator – Dallas', slug: 'bedroom-paint-calculator-dallas' },
  { label: 'Bedroom Calculator – Miami', slug: 'bedroom-paint-calculator-miami' },
  { label: 'Exterior Calculator – Texas', slug: 'exterior-paint-calculator-texas' },
  { label: 'Exterior Calculator – California', slug: 'exterior-paint-calculator-california' },
  { label: 'Exterior Calculator – Florida', slug: 'exterior-paint-calculator-florida' },
  { label: 'Exterior Calculator – Houston', slug: 'exterior-paint-calculator-houston' },
  { label: 'Exterior Calculator – Los Angeles', slug: 'exterior-paint-calculator-los-angeles' },
  { label: 'Paint Cost – Texas', slug: 'paint-cost-calculator-texas' },
  { label: 'Paint Cost – California', slug: 'paint-cost-calculator-california' },
  { label: 'Paint Cost – New York', slug: 'paint-cost-calculator-new-york' },
  { label: 'Paint Cost – Houston', slug: 'paint-cost-calculator-houston' },
  { label: 'Paint Cost – Chicago', slug: 'paint-cost-calculator-chicago' },
  { label: 'Paint Cost – Atlanta', slug: 'paint-cost-calculator-atlanta' },
  { label: 'Whole House – Texas', slug: 'whole-house-paint-calculator-texas' },
];

// ─── NAV FEATURED (shown in dropdowns — hub page always has "View All →") ─────
export const navFeaturedCalculators: SitePage[] = calculatorsByRoom.slice(0, 6);
export const navFeaturedSpecialty: SitePage[] = calculatorsSpecialty.slice(0, 4);
export const navFeaturedHowMuch: SitePage[] = howMuchPaintPages.slice(0, 6);
export const navFeaturedGuides: SitePage[] = howToGuides.slice(0, 6);
export const navFeaturedCostGuides: SitePage[] = costGuides.slice(0, 5);
export const navFeaturedLocations: SitePage[] = [
  { label: 'Texas', slug: 'paint-calculator-texas' },
  { label: 'California', slug: 'paint-calculator-california' },
  { label: 'Florida', slug: 'paint-calculator-florida' },
  { label: 'New York', slug: 'paint-calculator-new-york' },
  { label: 'Houston', slug: 'paint-calculator-houston-tx' },
  { label: 'Los Angeles', slug: 'paint-calculator-los-angeles-ca' },
];

// ─── FOOTER FEATURED ─────────────────────────────────────────────────────────
export const footerCalculators: SitePage[] = [
  { label: 'Bedroom', slug: 'bedroom-paint-calculator' },
  { label: 'Bathroom', slug: 'bathroom-paint-calculator' },
  { label: 'Kitchen', slug: 'kitchen-paint-calculator' },
  { label: 'Exterior', slug: 'exterior-paint-calculator' },
  { label: 'Whole House', slug: 'whole-house-paint-calculator' },
  { label: 'Paint Cost', slug: 'paint-cost-calculator' },
  { label: 'Primer', slug: 'primer-calculator' },
];

export const footerHowMuch: SitePage[] = [
  { label: '10x10 Room', slug: 'how-much-paint-for-a-10x10-room' },
  { label: '12x12 Room', slug: 'how-much-paint-for-a-12x12-room' },
  { label: 'Bedroom', slug: 'how-much-paint-for-a-bedroom' },
  { label: 'Living Room', slug: 'how-much-paint-for-a-living-room' },
  { label: '1500 Sq Ft House', slug: 'how-much-paint-for-a-1500-sq-ft-house' },
  { label: '2000 Sq Ft House', slug: 'how-much-paint-for-a-2000-sq-ft-house' },
  { label: 'Gallon Coverage', slug: 'how-much-paint-does-a-gallon-cover' },
];

export const footerCostGuides: SitePage[] = [
  { label: 'Cost to Paint a Room', slug: 'how-much-does-it-cost-to-paint-a-room' },
  { label: 'Cost – Bedroom', slug: 'cost-to-paint-bedroom' },
  { label: 'Cost – Exterior', slug: 'cost-to-paint-exterior-house' },
  { label: 'Cost – Whole House', slug: 'cost-to-paint-whole-house-interior' },
  { label: 'Cost – Cabinets', slug: 'cost-to-paint-kitchen-cabinets' },
  { label: 'Cost – Bathroom', slug: 'cost-to-paint-bathroom' },
];

export const footerGuides: SitePage[] = [
  { label: 'How to Calculate Paint', slug: 'how-to-calculate-paint-for-a-room' },
  { label: 'How Many Coats of Paint', slug: 'how-many-coats-of-paint' },
  { label: 'Do I Need Primer?', slug: 'do-i-need-primer-before-painting' },
  { label: 'Paint Finish Guide', slug: 'paint-finish-guide' },
  { label: 'How to Paint a Room', slug: 'how-to-paint-a-room' },
  { label: 'Best Exterior Paint', slug: 'best-exterior-paint-for-houses' },
];

export const footerLocations: SitePage[] = [
  { label: 'Texas', slug: 'paint-calculator-texas' },
  { label: 'California', slug: 'paint-calculator-california' },
  { label: 'Florida', slug: 'paint-calculator-florida' },
  { label: 'New York', slug: 'paint-calculator-new-york' },
  { label: 'Houston', slug: 'paint-calculator-houston-tx' },
  { label: 'Los Angeles', slug: 'paint-calculator-los-angeles-ca' },
  { label: 'Miami', slug: 'paint-calculator-miami-fl' },
  { label: 'Chicago', slug: 'paint-calculator-chicago-il' },
];
