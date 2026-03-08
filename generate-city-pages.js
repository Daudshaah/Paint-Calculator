const fs = require('fs');
const path = require('path');

// ─── CITY DATA ────────────────────────────────────────────────────────────────
const cities = [
  // ── TEXAS ──
  {
    name: 'Houston', state: 'Texas', stateAbbr: 'TX', slug: 'paint-calculator-houston-tx',
    functionSuffix: 'HoustonTX', stateSlug: 'paint-calculator-texas',
    climate: 'hot humid subtropical', laborLow: 38, laborHigh: 62, paintLow: 28, paintHigh: 68,
    avgHome: 2100, population: '2.3 million',
    localTip: 'Houston\'s extreme humidity — averaging 75% year-round — means mold and mildew resistance is the single most important factor for all exterior and bathroom paints. Use mildewcide-fortified coatings and allow extra drying time in summer months.',
    neighborhoodNote: 'Popular Houston neighborhoods for home painting include The Heights, Montrose, Memorial, Sugar Land, and Katy. Older Heights bungalows often require more prep work and primer than newer suburban homes.',
    bestTime: 'October through April — Houston summers are too hot and humid for quality exterior paint application.',
  },
  {
    name: 'Dallas', state: 'Texas', stateAbbr: 'TX', slug: 'paint-calculator-dallas-tx',
    functionSuffix: 'DallasTX', stateSlug: 'paint-calculator-texas',
    climate: 'humid subtropical with hot summers', laborLow: 38, laborHigh: 65, paintLow: 28, paintHigh: 68,
    avgHome: 2050, population: '1.3 million',
    localTip: 'Dallas\'s clay soil causes significant foundation movement — inspect exterior paint for cracking before repainting. The DFW market has a large pool of professional painters keeping labor rates competitive.',
    neighborhoodNote: 'Dallas neighborhoods with high painting activity include Lakewood, Preston Hollow, Oak Cliff, Plano, and Frisco. DFW\'s rapid growth means many new construction homes need their first repaint within 5–7 years.',
    bestTime: 'March through May and October through November offer the best conditions for exterior painting in Dallas.',
  },
  {
    name: 'Austin', state: 'Texas', stateAbbr: 'TX', slug: 'paint-calculator-austin-tx',
    functionSuffix: 'AustinTX', stateSlug: 'paint-calculator-texas',
    climate: 'hot semi-arid', laborLow: 42, laborHigh: 70, paintLow: 30, paintHigh: 72,
    avgHome: 2000, population: '978,000',
    localTip: 'Austin\'s rapid growth has pushed painter labor costs up significantly — rates have increased 20–30% since 2020. Book professional painters 4–6 weeks in advance. The Hill Country limestone and stucco exteriors common in Austin require masonry-specific coatings.',
    neighborhoodNote: 'High-demand painting areas include East Austin, South Congress, Hyde Park, Westlake, and Cedar Park. Many older East Austin homes are being renovated, driving strong demand for painting contractors.',
    bestTime: 'March through May and October through November. Austin summers regularly exceed 100°F — too hot for quality exterior paint application.',
  },
  {
    name: 'San Antonio', state: 'Texas', stateAbbr: 'TX', slug: 'paint-calculator-san-antonio-tx',
    functionSuffix: 'SanAntonioTX', stateSlug: 'paint-calculator-texas',
    climate: 'hot semi-arid', laborLow: 33, laborHigh: 55, paintLow: 26, paintHigh: 62,
    avgHome: 1900, population: '1.5 million',
    localTip: 'San Antonio has more affordable painter labor rates than Austin or Dallas. Stucco is the dominant exterior surface — use elastomeric masonry paint to bridge hairline cracks common in the limestone-rich local soil.',
    neighborhoodNote: 'Popular painting areas include Alamo Heights, King William Historic District, Stone Oak, and the Medical Center area. Historic properties in the King William District may have restrictions on exterior paint colors.',
    bestTime: 'October through April. San Antonio summers are hot and dry — exterior painting is possible but requires early morning application before peak heat.',
  },
  {
    name: 'Fort Worth', state: 'Texas', stateAbbr: 'TX', slug: 'paint-calculator-fort-worth-tx',
    functionSuffix: 'FortWorthTX', stateSlug: 'paint-calculator-texas',
    climate: 'humid subtropical', laborLow: 36, laborHigh: 60, paintLow: 27, paintHigh: 65,
    avgHome: 1950, population: '935,000',
    localTip: 'Fort Worth has slightly lower labor costs than Dallas while sharing the same DFW metro market. Hail is common in North Texas — inspect exterior surfaces for hail damage before repainting and use high-build coatings to fill minor dents.',
    neighborhoodNote: 'Active painting areas include Westover Hills, Sundance Square vicinity, Burleson, and Keller. The booming Alliance Corridor suburbs have significant new and renovation painting demand.',
    bestTime: 'Spring (March–May) and fall (October–November) offer the best painting conditions. Avoid summer heat and winter ice storms.',
  },

  // ── CALIFORNIA ──
  {
    name: 'Los Angeles', state: 'California', stateAbbr: 'CA', slug: 'paint-calculator-los-angeles-ca',
    functionSuffix: 'LosAngelesCA', stateSlug: 'paint-calculator-california',
    climate: 'Mediterranean', laborLow: 58, laborHigh: 95, paintLow: 42, paintHigh: 88,
    avgHome: 1800, population: '3.9 million',
    localTip: 'Los Angeles requires SCAQMD-compliant low-VOC paints — most major brands meet this standard but always verify. The city\'s dry Santa Ana winds in fall create ideal exterior painting conditions but also extreme fire risk — check air quality before exterior work.',
    neighborhoodNote: 'High-demand painting areas include Silver Lake, Echo Park, Venice, Culver City, Pasadena, and the San Fernando Valley. Many Spanish Revival and Craftsman homes require specialized restoration painting techniques.',
    bestTime: 'Year-round exterior painting is possible in LA. Avoid Santa Ana wind events in October–December. The marine layer clears by 10am most days on the Westside.',
  },
  {
    name: 'San Diego', state: 'California', stateAbbr: 'CA', slug: 'paint-calculator-san-diego-ca',
    functionSuffix: 'SanDiegoCA', stateSlug: 'paint-calculator-california',
    climate: 'Mediterranean', laborLow: 55, laborHigh: 88, paintLow: 40, paintHigh: 85,
    avgHome: 1750, population: '1.4 million',
    localTip: 'San Diego\'s coastal salt air is hard on exterior paint — especially in neighborhoods within a mile of the ocean like Pacific Beach, La Jolla, and Coronado. Use marine-grade or salt-resistant exterior coatings for coastal properties.',
    neighborhoodNote: 'Popular painting areas include North Park, South Park, Hillcrest, Del Mar, Encinitas, and Chula Vista. Many older Mission Hills and Kensington craftsman bungalows require careful lead paint testing before renovation.',
    bestTime: 'Near-perfect exterior painting conditions exist most of the year in San Diego. The June Gloom marine layer clears by early afternoon. Summer and fall are ideal.',
  },
  {
    name: 'San Jose', state: 'California', stateAbbr: 'CA', slug: 'paint-calculator-san-jose-ca',
    functionSuffix: 'SanJoseCA', stateSlug: 'paint-calculator-california',
    climate: 'Mediterranean', laborLow: 62, laborHigh: 100, paintLow: 42, paintHigh: 90,
    avgHome: 1700, population: '1.0 million',
    localTip: 'San Jose and the South Bay have among the highest painter labor costs in California due to the Silicon Valley cost of living. Book well in advance — quality painters in this market are in high demand year-round.',
    neighborhoodNote: 'Active painting areas include Willow Glen, Almaden Valley, Evergreen, Campbell, and Saratoga. Many Eichler homes popular in the area have unique painting requirements for their post-and-beam architecture.',
    bestTime: 'Spring and fall are ideal for exterior painting. Summer is dry and warm — excellent for painting. Winter rains (November–March) limit exterior work.',
  },
  {
    name: 'San Francisco', state: 'California', stateAbbr: 'CA', slug: 'paint-calculator-san-francisco-ca',
    functionSuffix: 'SanFranciscoCA', stateSlug: 'paint-calculator-california',
    climate: 'oceanic Mediterranean', laborLow: 68, laborHigh: 110, paintLow: 45, paintHigh: 95,
    avgHome: 1400, population: '874,000',
    localTip: 'San Francisco has the highest painter labor rates in the US outside Manhattan. The city\'s famous fog and coastal moisture demand premium moisture-resistant exterior paints. The iconic Victorian Painted Ladies require meticulous multi-color painting with historic accuracy.',
    neighborhoodNote: 'Painting is in constant demand across the Mission, Castro, Noe Valley, Pacific Heights, and Richmond districts. SF\'s Victorian and Edwardian housing stock requires specialty painters familiar with historic restoration techniques.',
    bestTime: 'Summer (July–September) is the best time for exterior painting in SF when the fog clears most reliably. Avoid the rainy season (November–April) for exterior work.',
  },
  {
    name: 'Sacramento', state: 'California', stateAbbr: 'CA', slug: 'paint-calculator-sacramento-ca',
    functionSuffix: 'SacramentoCA', stateSlug: 'paint-calculator-california',
    climate: 'Mediterranean hot-summer', laborLow: 48, laborHigh: 78, paintLow: 35, paintHigh: 78,
    avgHome: 1850, population: '524,000',
    localTip: 'Sacramento has significantly more affordable painter labor rates than the Bay Area while sharing the same dry Mediterranean climate. The Central Valley heat in summer (regularly 100°F+) means early-morning application is essential for exterior painting.',
    neighborhoodNote: 'Popular painting areas include Midtown, Land Park, East Sacramento, Elk Grove, and Folsom. Sacramento\'s mix of Victorian homes, ranch-style houses, and new construction creates demand for painters with diverse skill sets.',
    bestTime: 'Spring (March–May) and fall (September–November) are ideal. Summer exterior painting requires early morning application — paint dries too fast in afternoon Sacramento heat.',
  },

  // ── FLORIDA ──
  {
    name: 'Miami', state: 'Florida', stateAbbr: 'FL', slug: 'paint-calculator-miami-fl',
    functionSuffix: 'MiamiFL', stateSlug: 'paint-calculator-florida',
    climate: 'tropical monsoon', laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68,
    avgHome: 1750, population: '442,000',
    localTip: 'Miami\'s tropical climate — year-round heat, intense UV, and hurricane-season storms — demands the highest-grade moisture, UV, and salt-resistant exterior coatings. Elastomeric coatings are standard for stucco homes throughout Miami-Dade. Anti-fungal additives are essential for all exterior surfaces.',
    neighborhoodNote: 'High-demand painting areas include Coral Gables, Coconut Grove, Brickell, Wynwood, South Beach, and Doral. Miami\'s Art Deco historic district requires approved colors for exterior painting.',
    bestTime: 'November through April — Miami\'s dry season. Avoid hurricane season (June–November) for exterior painting when possible.',
  },
  {
    name: 'Orlando', state: 'Florida', stateAbbr: 'FL', slug: 'paint-calculator-orlando-fl',
    functionSuffix: 'OrlandoFL', stateSlug: 'paint-calculator-florida',
    climate: 'tropical', laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65,
    avgHome: 1900, population: '309,000',
    localTip: 'Orlando\'s daily afternoon thunderstorms in summer (June–September) dramatically limit exterior painting windows. Plan exterior work in the morning only. The high UV intensity fades paint fast — use premium exterior paint with maximum UV protection.',
    neighborhoodNote: 'Active painting markets include Winter Park, Dr. Phillips, Lake Nona, Windermere, and Celebration. The strong vacation home and short-term rental market in Orlando drives high demand for fast-turnaround painting services.',
    bestTime: 'November through May — before the rainy season begins. Morning-only exterior painting is feasible in summer.',
  },
  {
    name: 'Tampa', state: 'Florida', stateAbbr: 'FL', slug: 'paint-calculator-tampa-fl',
    functionSuffix: 'TampaFL', stateSlug: 'paint-calculator-florida',
    climate: 'tropical', laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65,
    avgHome: 1850, population: '403,000',
    localTip: 'Tampa Bay\'s combination of salt air, intense UV, and high humidity is extremely demanding on exterior paint. Use marine-grade or salt-resistant elastomeric coatings for waterfront and coastal properties. Tampa regularly experiences lightning — the most lightning-prone major city in the US — plan outdoor work around afternoon storms.',
    neighborhoodNote: 'Popular painting areas include Hyde Park, South Tampa, Davis Islands, Wesley Chapel, and Brandon. The Tampa Bay area\'s booming growth is driving strong demand for both new construction and renovation painting.',
    bestTime: 'November through April. Tampa receives more lightning strikes than any other US city — avoid exterior work during afternoon summer storms.',
  },
  {
    name: 'Jacksonville', state: 'Florida', stateAbbr: 'FL', slug: 'paint-calculator-jacksonville-fl',
    functionSuffix: 'JacksonvilleFL', stateSlug: 'paint-calculator-florida',
    climate: 'humid subtropical', laborLow: 32, laborHigh: 55, paintLow: 26, paintHigh: 62,
    avgHome: 2000, population: '949,000',
    localTip: 'Jacksonville is the largest city by area in the contiguous US, and painter availability varies significantly across the metro. The St. Johns River corridor has high humidity requiring mildew-resistant coatings throughout. Jacksonville has more affordable labor costs than Miami or Orlando.',
    neighborhoodNote: 'Active areas include Riverside, Avondale, San Marco, Ponte Vedra Beach, and Fleming Island. Jacksonville\'s large military population drives strong steady demand for rental property painting.',
    bestTime: 'November through April for exterior painting. The summer rainy season limits afternoon exterior work.',
  },
  {
    name: 'Fort Lauderdale', state: 'Florida', stateAbbr: 'FL', slug: 'paint-calculator-fort-lauderdale-fl',
    functionSuffix: 'FortLauderdaleFL', stateSlug: 'paint-calculator-florida',
    climate: 'tropical', laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68,
    avgHome: 1700, population: '182,000',
    localTip: 'Fort Lauderdale\'s waterway network means most homes are within blocks of salt water. Marine-grade or salt-resistant exterior coatings are essential for all properties in this market. The luxury condo and waterfront home market drives demand for high-end painting finishes.',
    neighborhoodNote: 'High-demand painting areas include Las Olas, Victoria Park, Coral Ridge, Weston, and Boca Raton. The seasonal influx of snowbirds creates a peak painting season during the winter months.',
    bestTime: 'November through April (dry season). Fort Lauderdale\'s summer brings daily storms and high humidity that compromises exterior paint adhesion.',
  },

  // ── NEW YORK ──
  {
    name: 'New York City', state: 'New York', stateAbbr: 'NY', slug: 'paint-calculator-new-york-city-ny',
    functionSuffix: 'NewYorkCityNY', stateSlug: 'paint-calculator-new-york',
    climate: 'humid continental', laborLow: 70, laborHigh: 115, paintLow: 42, paintHigh: 90,
    avgHome: 1100, population: '8.3 million',
    localTip: 'NYC has the highest painter labor rates in the country — $70–$115 per hour. Union painters in Manhattan can charge $100–$150 per hour. Many pre-war buildings require lead paint testing and certified lead-safe work practices. Building co-ops and condos often have specific approved paint colors and contractor requirements.',
    neighborhoodNote: 'Active painting markets span all five boroughs — Brooklyn brownstones, Queens attached homes, Bronx apartment buildings, and Manhattan co-ops all have distinct painting requirements and price points. Staten Island has more affordable labor rates than the other boroughs.',
    bestTime: 'Spring (April–June) and fall (September–October) are ideal. NYC winters limit exterior painting November–March.',
  },
  {
    name: 'Buffalo', state: 'New York', stateAbbr: 'NY', slug: 'paint-calculator-buffalo-ny',
    functionSuffix: 'BuffaloNY', stateSlug: 'paint-calculator-new-york',
    climate: 'humid continental', laborLow: 42, laborHigh: 68, paintLow: 32, paintHigh: 72,
    avgHome: 1650, population: '278,000',
    localTip: 'Buffalo\'s Lake Erie effect creates heavy snow and freeze-thaw cycles that are punishing on exterior paint. Use the most flexible exterior paint formulas available. The exterior painting season is limited to June through September.',
    neighborhoodNote: 'Painting demand is strong in Elmwood Village, North Buffalo, South Buffalo, and Amherst. Buffalo\'s renaissance is driving strong renovation demand, particularly for the city\'s large stock of Victorian and Craftsman homes.',
    bestTime: 'June through September — Buffalo\'s short warm season. Exterior painting outside this window risks adhesion failure from cold temperatures.',
  },
  {
    name: 'Rochester', state: 'New York', stateAbbr: 'NY', slug: 'paint-calculator-rochester-ny',
    functionSuffix: 'RochesterNY', stateSlug: 'paint-calculator-new-york',
    climate: 'humid continental', laborLow: 40, laborHigh: 65, paintLow: 30, paintHigh: 70,
    avgHome: 1600, population: '211,000',
    localTip: 'Rochester is one of the cloudiest cities in the US with significant Lake Ontario lake-effect snow. Exterior painting season is limited to June–September. Rochester\'s large stock of Victorian homes often have lead paint requiring certified abatement.',
    neighborhoodNote: 'Active painting areas include Park Avenue, South Wedge, Brighton, Pittsford, and Webster. Rochester\'s affordable home prices are attracting buyers who invest in renovation, driving painting demand.',
    bestTime: 'June through September. Rochester averages 100+ inches of snow annually — exterior painting outside this window is not advisable.',
  },

  // ── ARIZONA ──
  {
    name: 'Phoenix', state: 'Arizona', stateAbbr: 'AZ', slug: 'paint-calculator-phoenix-az',
    functionSuffix: 'PhoenixAZ', stateSlug: 'paint-calculator-arizona',
    climate: 'hot desert', laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 70,
    avgHome: 2000, population: '1.6 million',
    localTip: 'Phoenix\'s extreme heat (regularly 115°F+) and intense UV degrade exterior paint faster than almost any other US city. Use premium elastomeric coatings with maximum UV inhibitors. Never apply exterior paint during summer afternoons — paint dries too fast causing poor adhesion. Stucco is the dominant exterior finish requiring masonry-specific products.',
    neighborhoodNote: 'High-demand painting areas include Scottsdale, Paradise Valley, Tempe, Chandler, and Gilbert. Phoenix\'s strong real estate market drives constant demand for exterior repaints — the intense UV means most homes need repainting every 5–7 years.',
    bestTime: 'October through April. Phoenix summers are too hot for quality exterior paint application. The monsoon season (July–September) adds humidity that affects drying.',
  },
  {
    name: 'Tucson', state: 'Arizona', stateAbbr: 'AZ', slug: 'paint-calculator-tucson-az',
    functionSuffix: 'TucsonAZ', stateSlug: 'paint-calculator-arizona',
    climate: 'hot desert', laborLow: 33, laborHigh: 55, paintLow: 27, paintHigh: 62,
    avgHome: 1750, population: '542,000',
    localTip: 'Tucson has more affordable painter labor costs than Phoenix while sharing the same desert painting challenges. Adobe and stucco homes dominate — elastomeric masonry paint is essential. The Sonoran Desert\'s monsoon season (July–September) adds moisture that affects drying times.',
    neighborhoodNote: 'Active painting areas include Oro Valley, Marana, Sahuarita, and the University of Arizona district. Tucson\'s unique adobe architecture requires painters familiar with traditional and modern masonry coating techniques.',
    bestTime: 'October through May. Avoid painting during the July–September monsoon season and summer heat.',
  },

  // ── OTHER MAJOR CITIES ──
  {
    name: 'Atlanta', state: 'Georgia', stateAbbr: 'GA', slug: 'paint-calculator-atlanta-ga',
    functionSuffix: 'AtlantaGA', stateSlug: 'paint-calculator-georgia',
    climate: 'humid subtropical', laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65,
    avgHome: 2000, population: '498,000',
    localTip: 'Atlanta\'s hot, humid summers accelerate mold and mildew growth on exterior surfaces. Use mildewcide-fortified exterior paint on all surfaces. The rapidly growing metro has strong demand for painters — book 3–4 weeks in advance for popular contractors.',
    neighborhoodNote: 'High-demand painting areas include Virginia-Highland, Decatur, Buckhead, Midtown, and the Beltline corridor neighborhoods. Atlanta\'s booming renovation market is driven by the city\'s rapid population growth.',
    bestTime: 'March through May and September through November. Atlanta summers are hot and humid — manageable for exterior painting but plan for slower drying times.',
  },
  {
    name: 'Charlotte', state: 'North Carolina', stateAbbr: 'NC', slug: 'paint-calculator-charlotte-nc',
    functionSuffix: 'CharlotteNC', stateSlug: 'paint-calculator-north-carolina',
    climate: 'humid subtropical', laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65,
    avgHome: 2100, population: '874,000',
    localTip: 'Charlotte is one of the fastest-growing cities in the US — strong demand means painting contractors are often booked 4–6 weeks out. The humid Piedmont climate requires mildew-resistant exterior coatings. Many newer suburban homes use fiber cement siding requiring specific primers.',
    neighborhoodNote: 'Active painting areas include Myers Park, Dilworth, NoDa, South End, Ballantyne, and Huntersville. Charlotte\'s rapid suburban expansion creates constant demand for both new construction and renovation painting.',
    bestTime: 'Spring (March–May) and fall (September–November) are ideal. Charlotte summers are hot and humid but manageable for morning exterior painting.',
  },
  {
    name: 'Chicago', state: 'Illinois', stateAbbr: 'IL', slug: 'paint-calculator-chicago-il',
    functionSuffix: 'ChicagoIL', stateSlug: 'paint-calculator-illinois',
    climate: 'humid continental', laborLow: 48, laborHigh: 78, paintLow: 35, paintHigh: 78,
    avgHome: 1750, population: '2.7 million',
    localTip: 'Chicago\'s extreme temperature range — from -20°F winters to 95°F summers — demands highly flexible exterior paint. Union painters are common in the Chicago market, pushing labor costs above the Illinois average. The Lake Michigan shoreline creates above-average moisture exposure for lakefront properties.',
    neighborhoodNote: 'High-demand painting areas include Lincoln Park, Wicker Park, Bucktown, Logan Square, Hyde Park, and the North Shore suburbs. Chicago\'s iconic greystones and two-flats require painters familiar with masonry and historic restoration.',
    bestTime: 'May through September. Chicago winters are too cold for exterior painting. Spring and fall are ideal but the painting season is short.',
  },
  {
    name: 'Columbus', state: 'Ohio', stateAbbr: 'OH', slug: 'paint-calculator-columbus-oh',
    functionSuffix: 'ColumbusOH', stateSlug: 'paint-calculator-ohio',
    climate: 'humid continental', laborLow: 35, laborHigh: 58, paintLow: 27, paintHigh: 64,
    avgHome: 1850, population: '905,000',
    localTip: 'Columbus has affordable painter labor rates compared to coastal cities. The four-season climate requires flexible exterior paint for freeze-thaw cycles. Columbus\'s booming growth is driving strong demand for both renovation and new construction painting.',
    neighborhoodNote: 'Active painting areas include German Village, Short North, Clintonville, Dublin, Westerville, and New Albany. German Village\'s historic brick homes have specific exterior color restrictions — check neighborhood guidelines before painting.',
    bestTime: 'April through October. Columbus winters limit exterior painting from November through March.',
  },
  {
    name: 'Philadelphia', state: 'Pennsylvania', stateAbbr: 'PA', slug: 'paint-calculator-philadelphia-pa',
    functionSuffix: 'PhiladelphiaPA', stateSlug: 'paint-calculator-pennsylvania',
    climate: 'humid subtropical', laborLow: 45, laborHigh: 72, paintLow: 33, paintHigh: 74,
    avgHome: 1650, population: '1.6 million',
    localTip: 'Philadelphia has a large stock of pre-1978 row homes with lead paint — always test before sanding or stripping old surfaces. The city\'s brick row home architecture requires masonry-specific exterior primers and paints. South Philly and North Philly row homes are typically painted brick.',
    neighborhoodNote: 'High-demand painting areas include Fishtown, Northern Liberties, Fairmount, South Philadelphia, Chestnut Hill, and the Main Line suburbs. Philadelphia\'s revitalizing neighborhoods have strong renovation painting demand.',
    bestTime: 'April through October. The humid Philly summers are manageable for exterior painting with proper timing around afternoon heat.',
  },
  {
    name: 'Pittsburgh', state: 'Pennsylvania', stateAbbr: 'PA', slug: 'paint-calculator-pittsburgh-pa',
    functionSuffix: 'PittsburghPA', stateSlug: 'paint-calculator-pennsylvania',
    climate: 'humid continental', laborLow: 38, laborHigh: 62, paintLow: 28, paintHigh: 65,
    avgHome: 1550, population: '303,000',
    localTip: 'Pittsburgh is one of the cloudiest cities in the US — limited sun and high humidity mean exterior paint dries slower. Use fast-drying formulations and avoid painting on overcast humid days when possible. Pittsburgh\'s hilly terrain means many homes have complex rooflines requiring experienced painters.',
    neighborhoodNote: 'Active painting areas include Shadyside, Squirrel Hill, Lawrenceville, Mount Washington, and the South Hills suburbs. Pittsburgh\'s strong renovation renaissance is driving demand for skilled painters.',
    bestTime: 'May through September. Pittsburgh\'s limited sunny days and cold winters restrict the exterior painting season.',
  },
  {
    name: 'Denver', state: 'Colorado', stateAbbr: 'CO', slug: 'paint-calculator-denver-co',
    functionSuffix: 'DenverCO', stateSlug: 'paint-calculator-colorado',
    climate: 'semi-arid high altitude', laborLow: 42, laborHigh: 68, paintLow: 32, paintHigh: 72,
    avgHome: 2100, population: '715,000',
    localTip: 'Denver\'s 5,280ft elevation means 25% more UV intensity than sea level — use premium exterior paint with maximum UV inhibitors. The 300+ days of sunshine and low humidity are excellent for interior painting year-round. Dramatic temperature swings between day and night require flexible exterior coatings.',
    neighborhoodNote: 'High-demand painting areas include Capitol Hill, Wash Park, Cherry Creek, Highlands, Stapleton, and the Tech Center suburbs. Denver\'s booming real estate market drives strong demand for both flip renovation and new construction painting.',
    bestTime: 'April through October. Denver\'s low humidity and abundant sunshine make spring and fall ideal. Summer exterior painting is excellent — the dry climate allows fast drying.',
  },
  {
    name: 'Seattle', state: 'Washington', stateAbbr: 'WA', slug: 'paint-calculator-seattle-wa',
    functionSuffix: 'SeattleWA', stateSlug: 'paint-calculator-washington',
    climate: 'oceanic', laborLow: 52, laborHigh: 82, paintLow: 38, paintHigh: 80,
    avgHome: 1850, population: '737,000',
    localTip: 'Seattle\'s persistent rain and high humidity make mold and mildew resistance the #1 requirement for all exterior paint. Premium moisture-resistant exterior coatings are essential — budget paint fails rapidly in Seattle\'s climate. The dry summer season (July–September) is the only reliable window for exterior painting.',
    neighborhoodNote: 'Popular painting areas include Capitol Hill, Fremont, Ballard, Queen Anne, Bellevue, and Kirkland. Seattle\'s Craftsman bungalow and mid-century modern homes require painters familiar with wood siding and historic finishes.',
    bestTime: 'July through September — Seattle\'s dry season. The other 9 months have too much rain and humidity for reliable exterior paint adhesion.',
  },
  {
    name: 'Portland', state: 'Oregon', stateAbbr: 'OR', slug: 'paint-calculator-portland-or',
    functionSuffix: 'PortlandOR', stateSlug: 'paint-calculator-oregon',
    climate: 'oceanic', laborLow: 45, laborHigh: 72, paintLow: 35, paintHigh: 75,
    avgHome: 1800, population: '652,000',
    localTip: 'Portland shares Seattle\'s wet climate — the driest months (July–September) are the only reliable exterior painting window. Mold and algae growth on north-facing walls is common — use antimicrobial exterior paint and consider a biocide wash before painting. Portland\'s dry summers are excellent for exterior work.',
    neighborhoodNote: 'Active painting areas include Alberta Arts District, Mississippi Ave, Sellwood, Lake Oswego, Beaverton, and Hillsboro. Portland\'s strong DIY culture means many homeowners do their own interior painting, with professionals handling the more complex exterior work.',
    bestTime: 'July through September. Portland receives 36+ inches of rain annually — exterior painting outside the dry summer months risks adhesion failure.',
  },
  {
    name: 'Las Vegas', state: 'Nevada', stateAbbr: 'NV', slug: 'paint-calculator-las-vegas-nv',
    functionSuffix: 'LasVegasNV', stateSlug: 'paint-calculator-nevada',
    climate: 'hot desert', laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68,
    avgHome: 2000, population: '641,000',
    localTip: 'Las Vegas\'s extreme desert heat (regularly 115°F+) and intense UV require premium UV-resistant elastomeric exterior paint. Stucco dominates — use elastomeric coatings that flex in the extreme heat. Never apply exterior paint during summer afternoons. The dry climate means interior painting is possible year-round.',
    neighborhoodNote: 'High-demand painting areas include Summerlin, Henderson, Green Valley, the Arts District, and the Southwest Valley. Las Vegas\'s large HOA-governed communities often have specific approved exterior paint colors.',
    bestTime: 'October through April. Las Vegas summers are too hot (115°F+) for quality exterior paint application. Spring and fall are ideal.',
  },
  {
    name: 'Nashville', state: 'Tennessee', stateAbbr: 'TN', slug: 'paint-calculator-nashville-tn',
    functionSuffix: 'NashvilleTN', stateSlug: 'paint-calculator-tennessee',
    climate: 'humid subtropical', laborLow: 35, laborHigh: 58, paintLow: 27, paintHigh: 64,
    avgHome: 2000, population: '689,000',
    localTip: 'Nashville\'s explosive growth has driven painter labor costs up 25–35% since 2018. Book quality painters 4–6 weeks in advance. The humid Tennessee climate requires mildew-resistant exterior coatings. Nashville\'s hot, humid summers are challenging for exterior painting — plan morning-only application.',
    neighborhoodNote: 'High-demand painting areas include 12 South, East Nashville, Germantown, Green Hills, Brentwood, and Franklin. Nashville\'s "tall-and-skinny" new construction homes have large exterior wall areas driving significant painting demand.',
    bestTime: 'March through May and September through November are ideal. Nashville summers are hot and humid — schedule exterior work for early morning.',
  },
  {
    name: 'Memphis', state: 'Tennessee', stateAbbr: 'TN', slug: 'paint-calculator-memphis-tn',
    functionSuffix: 'MemphisTN', stateSlug: 'paint-calculator-tennessee',
    climate: 'humid subtropical', laborLow: 30, laborHigh: 50, paintLow: 24, paintHigh: 58,
    avgHome: 1750, population: '633,000',
    localTip: 'Memphis has some of the most affordable painter labor rates of any major US city. The Mississippi River proximity and high humidity make mold-resistant exterior coatings essential. Memphis\'s hot, humid summers mean early morning exterior painting is required.',
    neighborhoodNote: 'Active painting areas include Midtown, East Memphis, Cooper-Young, Germantown, and Collierville. Memphis has significant stock of older homes requiring lead paint testing before renovation work.',
    bestTime: 'March through May and October through November. Memphis summers are hot and very humid — limit exterior work to morning hours.',
  },
  {
    name: 'Minneapolis', state: 'Minnesota', stateAbbr: 'MN', slug: 'paint-calculator-minneapolis-mn',
    functionSuffix: 'MinneapolisMN', stateSlug: 'paint-calculator-minnesota',
    climate: 'subarctic continental', laborLow: 42, laborHigh: 65, paintLow: 30, paintHigh: 68,
    avgHome: 1900, population: '429,000',
    localTip: 'Minneapolis has the most extreme temperature range of any major US city — from -30°F to 95°F. Exterior paint must be rated for these extremes. Use the highest-flexibility exterior formulations available. The exterior painting season is strictly June through August.',
    neighborhoodNote: 'Popular painting areas include Uptown, Northeast Minneapolis, Linden Hills, Edina, and Plymouth. Minneapolis\'s classic craftsman and Victorian homes require careful paint selection for the extreme climate.',
    bestTime: 'June through August — the only reliable exterior painting window in Minneapolis. The other 9 months risk adhesion failure from cold or moisture.',
  },
  {
    name: 'Boston', state: 'Massachusetts', stateAbbr: 'MA', slug: 'paint-calculator-boston-ma',
    functionSuffix: 'BostonMA', stateSlug: 'paint-calculator-massachusetts',
    climate: 'humid continental', laborLow: 55, laborHigh: 85, paintLow: 40, paintHigh: 85,
    avgHome: 1700, population: '675,000',
    localTip: 'Boston has among the highest painter labor rates in New England. The city\'s large stock of pre-1978 triple-decker and brownstone homes almost certainly contains lead paint — always test before disturbing old surfaces. Boston\'s freeze-thaw cycles demand premium flexible exterior coatings.',
    neighborhoodNote: 'High-demand painting areas include South End, Back Bay, Jamaica Plain, Cambridge, Somerville, and Brookline. Boston\'s historic neighborhoods have strict architectural review requirements for exterior paint colors.',
    bestTime: 'May through September. Boston winters limit exterior painting to the warmer months. Spring is ideal — low humidity and mild temperatures.',
  },
  {
    name: 'Detroit', state: 'Michigan', stateAbbr: 'MI', slug: 'paint-calculator-detroit-mi',
    functionSuffix: 'DetroitMI', stateSlug: 'paint-calculator-michigan',
    climate: 'humid continental', laborLow: 38, laborHigh: 60, paintLow: 27, paintHigh: 63,
    avgHome: 1700, population: '632,000',
    localTip: 'Detroit\'s Great Lakes climate creates significant freeze-thaw cycles and lake-effect moisture. Use premium flexible exterior coatings. Detroit\'s strong renovation renaissance has increased demand for skilled painters — many older homes are being restored from decades of deferred maintenance.',
    neighborhoodNote: 'Active painting areas include Corktown, Midtown, Indian Village, Grosse Pointe, Birmingham, and Royal Oak. Detroit\'s iconic brick bungalows and craftsman homes require masonry primers for exterior painted-brick surfaces.',
    bestTime: 'May through September. Detroit winters are harsh — exterior painting outside this window risks adhesion failure.',
  },
  {
    name: 'Indianapolis', state: 'Indiana', stateAbbr: 'IN', slug: 'paint-calculator-indianapolis-in',
    functionSuffix: 'IndianapolisIN', stateSlug: 'paint-calculator-indiana',
    climate: 'humid continental', laborLow: 35, laborHigh: 55, paintLow: 27, paintHigh: 62,
    avgHome: 1850, population: '887,000',
    localTip: 'Indianapolis has affordable painter labor rates compared to coastal metros. The four-season climate with significant freeze-thaw cycles requires flexible exterior paint. Indy\'s rapid suburban growth drives strong demand for new construction painting.',
    neighborhoodNote: 'Popular painting areas include Broad Ripple, Fountain Square, Irvington, Carmel, and Fishers. Indianapolis\'s growing foodie and arts scene has driven renovation demand in older neighborhoods.',
    bestTime: 'April through October. Indianapolis winters limit exterior painting. Spring and fall are ideal with mild temperatures and low humidity.',
  },
  {
    name: 'Louisville', state: 'Kentucky', stateAbbr: 'KY', slug: 'paint-calculator-louisville-ky',
    functionSuffix: 'LouisvilleKY', stateSlug: 'paint-calculator-kentucky',
    climate: 'humid subtropical', laborLow: 32, laborHigh: 52, paintLow: 25, paintHigh: 60,
    avgHome: 1800, population: '633,000',
    localTip: 'Louisville has some of the most affordable painter labor rates of any mid-size city in the US. The Ohio River valley creates above-average humidity requiring mildew-resistant exterior coatings. Louisville\'s four seasons allow exterior painting from April through October.',
    neighborhoodNote: 'Active painting areas include NuLu, Crescent Hill, Cherokee Triangle, St. Matthews, and Jeffersontown. Louisville\'s large stock of Victorian homes and bungalows drives strong renovation painting demand.',
    bestTime: 'April through October. Louisville has a good exterior painting season with mild springs and falls.',
  },
  {
    name: 'Baltimore', state: 'Maryland', stateAbbr: 'MD', slug: 'paint-calculator-baltimore-md',
    functionSuffix: 'BaltimoreMD', stateSlug: 'paint-calculator-maryland',
    climate: 'humid subtropical', laborLow: 42, laborHigh: 68, paintLow: 32, paintHigh: 72,
    avgHome: 1700, population: '569,000',
    localTip: 'Baltimore\'s signature painted brick row homes require masonry-specific exterior primers. The Chesapeake Bay proximity creates high humidity and salt air exposure — use moisture and salt-resistant exterior coatings. Baltimore has a large stock of pre-1978 homes with lead paint requiring proper handling.',
    neighborhoodNote: 'High-demand painting areas include Federal Hill, Canton, Fells Point, Roland Park, Towson, and Columbia. Baltimore\'s row home renovation market is one of the most active in the Mid-Atlantic region.',
    bestTime: 'April through October. Baltimore summers are hot and humid but manageable for early morning exterior work.',
  },
  {
    name: 'Washington DC', state: 'District of Columbia', stateAbbr: 'DC', slug: 'paint-calculator-washington-dc',
    functionSuffix: 'WashingtonDC', stateSlug: 'paint-calculator-virginia',
    climate: 'humid subtropical', laborLow: 50, laborHigh: 82, paintLow: 38, paintHigh: 82,
    avgHome: 1600, population: '689,000',
    localTip: 'Washington DC has high painter labor rates reflecting the area\'s cost of living. Historic neighborhoods have strict color and material restrictions — check with the Historic Preservation Office before painting any contributing structure. The DC area\'s humid summers require mildew-resistant interior and exterior coatings.',
    neighborhoodNote: 'Active painting markets include Capitol Hill, Georgetown, Logan Circle, Columbia Heights, Bethesda, and Arlington VA. DC\'s Federal and Victorian row houses have specific historic preservation requirements for exterior painting.',
    bestTime: 'April through October. DC summers are hot and very humid — plan exterior work for morning hours. Spring and fall are ideal.',
  },
  {
    name: 'Raleigh', state: 'North Carolina', stateAbbr: 'NC', slug: 'paint-calculator-raleigh-nc',
    functionSuffix: 'RaleighNC', stateSlug: 'paint-calculator-north-carolina',
    climate: 'humid subtropical', laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 65,
    avgHome: 2100, population: '467,000',
    localTip: 'Raleigh and the Research Triangle are among the fastest-growing metro areas in the US — qualified painters are in high demand and booking 4–6 weeks out is common. The humid Piedmont climate requires mildew-resistant exterior coatings. Many new construction subdivisions use fiber cement siding requiring specific primer systems.',
    neighborhoodNote: 'High-demand areas include Five Points, Oakwood, Cameron Village, Cary, Apex, and Morrisville. Raleigh\'s rapid growth mixes new construction painting with renovation of older neighborhoods.',
    bestTime: 'March through May and September through November. Raleigh summers are hot and humid — schedule exterior work for morning hours.',
  },
  {
    name: 'Oklahoma City', state: 'Oklahoma', stateAbbr: 'OK', slug: 'paint-calculator-oklahoma-city-ok',
    functionSuffix: 'OklahomaCityOK', stateSlug: 'paint-calculator-oklahoma',
    climate: 'humid subtropical', laborLow: 30, laborHigh: 50, paintLow: 25, paintHigh: 60,
    avgHome: 1900, population: '681,000',
    localTip: 'Oklahoma City has affordable painter labor rates. The severe weather risk — including hail and tornadoes — can rapidly damage exterior paint. Use impact-resistant coatings where available. OKC\'s wide temperature swings require flexible exterior paint formulations.',
    neighborhoodNote: 'Active painting areas include Midtown, Mesta Park, Nichols Hills, Edmond, and Moore. Oklahoma City\'s strong oil-economy-driven real estate market drives steady painting demand across all segments.',
    bestTime: 'March through May and September through November. Avoid the spring severe weather season for exterior projects when possible.',
  },
  {
    name: 'Albuquerque', state: 'New Mexico', stateAbbr: 'NM', slug: 'paint-calculator-albuquerque-nm',
    functionSuffix: 'AlbuquerqueNM', stateSlug: 'paint-calculator-new-mexico',
    climate: 'semi-arid high desert', laborLow: 33, laborHigh: 55, paintLow: 28, paintHigh: 62,
    avgHome: 1800, population: '564,000',
    localTip: 'Albuquerque\'s adobe and stucco homes require elastomeric masonry coatings rather than standard exterior paint. The 5,300ft altitude increases UV intensity — use maximum UV protection. The monsoon season (July–September) limits exterior painting windows.',
    neighborhoodNote: 'Popular painting areas include Old Town, Nob Hill, the Heights, Rio Rancho, and the East Mountains. Albuquerque\'s Pueblo Revival architecture requires painters familiar with traditional adobe and stucco finishing techniques.',
    bestTime: 'March through June and October through November. Avoid the July–September monsoon season for exterior painting.',
  },
  {
    name: 'Kansas City', state: 'Missouri', stateAbbr: 'MO', slug: 'paint-calculator-kansas-city-mo',
    functionSuffix: 'KansasCityMO', stateSlug: 'paint-calculator-missouri',
    climate: 'humid continental', laborLow: 33, laborHigh: 55, paintLow: 26, paintHigh: 62,
    avgHome: 1850, population: '508,000',
    localTip: 'Kansas City has affordable painter labor rates and a moderate four-season climate. The wide temperature range requires flexible exterior paint. Kansas City\'s strong BBQ and arts culture drives renovation demand in the Crossroads and Westside neighborhoods.',
    neighborhoodNote: 'Active painting areas include the Crossroads Arts District, Brookside, Waldo, the Plaza, Overland Park, and Lee\'s Summit. Kansas City\'s revitalizing urban core has strong renovation painting demand.',
    bestTime: 'April through October. Spring and fall are ideal with mild temperatures. Kansas City winters limit exterior work November through March.',
  },
  {
    name: 'St. Louis', state: 'Missouri', stateAbbr: 'MO', slug: 'paint-calculator-st-louis-mo',
    functionSuffix: 'StLouisMO', stateSlug: 'paint-calculator-missouri',
    climate: 'humid continental', laborLow: 33, laborHigh: 54, paintLow: 26, paintHigh: 62,
    avgHome: 1750, population: '293,000',
    localTip: 'St. Louis has affordable labor rates and excellent access to paint supplies. The Mississippi River valley creates high humidity — use mildew-resistant exterior coatings. St. Louis\'s large stock of brick bungalows and four-family flats require masonry primers for painted exterior brick.',
    neighborhoodNote: 'High-demand painting areas include The Hill, Lafayette Square, Tower Grove, Clayton, and Webster Groves. St. Louis\'s strong architectural heritage drives demand for skilled painters familiar with historic restoration.',
    bestTime: 'April through October. St. Louis summers are hot and humid but manageable. Spring and fall are ideal for exterior painting.',
  },
  {
    name: 'Milwaukee', state: 'Wisconsin', stateAbbr: 'WI', slug: 'paint-calculator-milwaukee-wi',
    functionSuffix: 'MilwaukeeWI', stateSlug: 'paint-calculator-wisconsin',
    climate: 'humid continental', laborLow: 38, laborHigh: 60, paintLow: 28, paintHigh: 65,
    avgHome: 1750, population: '577,000',
    localTip: 'Milwaukee\'s Lake Michigan climate creates significant lake-effect moisture and cold winters. The exterior painting season is limited to May–September. Use flexible, moisture-resistant exterior coatings for Milwaukee\'s freeze-thaw cycles.',
    neighborhoodNote: 'Active painting areas include Bay View, Brady Street, Shorewood, Whitefish Bay, and Wauwatosa. Milwaukee\'s strong German and Polish architectural heritage features many brick and masonry homes requiring specialized exterior painting.',
    bestTime: 'May through September. Milwaukee winters are harsh — exterior painting outside this window risks adhesion failure.',
  },
  {
    name: 'Omaha', state: 'Nebraska', stateAbbr: 'NE', slug: 'paint-calculator-omaha-ne',
    functionSuffix: 'OmahaNE', stateSlug: 'paint-calculator-nebraska',
    climate: 'humid continental', laborLow: 32, laborHigh: 52, paintLow: 25, paintHigh: 60,
    avgHome: 1800, population: '486,000',
    localTip: 'Omaha has very affordable painter labor rates and a moderate four-season climate. The strong winds common on the Great Plains can make exterior painting challenging — check wind forecasts before applying exterior paint to avoid overspray and uneven application.',
    neighborhoodNote: 'Popular painting areas include Dundee, Benson, Midtown Crossing, Papillion, and Bellevue. Omaha\'s stable economy and strong Warren Buffett connection give it an unusually strong real estate market for its size.',
    bestTime: 'April through October. Spring and fall are ideal. Omaha winters limit exterior painting from November through March.',
  },
  {
    name: 'Richmond', state: 'Virginia', stateAbbr: 'VA', slug: 'paint-calculator-richmond-va',
    functionSuffix: 'RichmondVA', stateSlug: 'paint-calculator-virginia',
    climate: 'humid subtropical', laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68,
    avgHome: 1800, population: '226,000',
    localTip: 'Richmond\'s hot, humid summers require mildew-resistant exterior coatings. The city has a large stock of historic homes — many in the Fan District and Church Hill require lead paint testing before renovation. Richmond\'s arts and food scene is driving strong renovation demand.',
    neighborhoodNote: 'High-demand painting areas include the Fan District, Church Hill, Scott\'s Addition, Short Pump, and Chesterfield. Richmond\'s Victorian and Colonial Revival homes are frequently repainted as the city attracts new residents.',
    bestTime: 'March through May and September through November. Richmond summers are hot and humid — morning-only exterior painting is recommended.',
  },
  {
    name: 'Virginia Beach', state: 'Virginia', stateAbbr: 'VA', slug: 'paint-calculator-virginia-beach-va',
    functionSuffix: 'VirginiaBeachVA', stateSlug: 'paint-calculator-virginia',
    climate: 'humid subtropical coastal', laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68,
    avgHome: 2000, population: '459,000',
    localTip: 'Virginia Beach\'s coastal Atlantic location means salt air, high humidity, and occasional hurricane-force winds all attack exterior paint. Use marine-grade or salt-resistant exterior coatings for all properties within 2 miles of the ocean. The strong military presence (home of Naval Station Norfolk) drives steady rental property painting demand.',
    neighborhoodNote: 'Active painting areas include the Oceanfront, Chesapeake Bay waterfront, Great Neck, Kempsville, and Chesapeake. Virginia Beach\'s large single-family home market drives consistent exterior painting demand.',
    bestTime: 'April through October. Spring and fall are ideal. Avoid painting during hurricane season peak (August–October) when possible.',
  },
  {
    name: 'Salt Lake City', state: 'Utah', stateAbbr: 'UT', slug: 'paint-calculator-salt-lake-city-ut',
    functionSuffix: 'SaltLakeCityUT', stateSlug: 'paint-calculator-utah',
    climate: 'semi-arid high altitude', laborLow: 38, laborHigh: 62, paintLow: 30, paintHigh: 68,
    avgHome: 2000, population: '200,000',
    localTip: 'Salt Lake City\'s 4,226ft elevation means stronger UV than sea-level cities — use premium UV-resistant exterior coatings. The dry climate is excellent for interior painting year-round. SLC\'s rapid growth and tech boom have pushed painter labor costs up significantly since 2020.',
    neighborhoodNote: 'Popular painting areas include Sugar House, 9th and 9th, East Bench, Draper, and South Jordan. Salt Lake City\'s booming growth — one of the fastest-growing metros in the US — creates strong demand for both new construction and renovation painting.',
    bestTime: 'April through October. The dry SLC climate is excellent for exterior painting. Winter inversion events can affect air quality — check conditions before interior painting in winter.',
  },
  {
    name: 'Boise', state: 'Idaho', stateAbbr: 'ID', slug: 'paint-calculator-boise-id',
    functionSuffix: 'BoiseID', stateSlug: 'paint-calculator-idaho',
    climate: 'semi-arid', laborLow: 35, laborHigh: 58, paintLow: 28, paintHigh: 64,
    avgHome: 1950, population: '235,000',
    localTip: 'Boise is one of the fastest-growing cities in the US — qualified painters are in high demand. The dry high-desert climate is excellent for exterior painting with fast drying times. Hot summers require early morning application. Boise\'s rapid growth means many new construction homes need their first repaint within 5–7 years.',
    neighborhoodNote: 'Active painting areas include the North End, Hyde Park, the Bench, Meridian, Eagle, and Nampa. Boise\'s Craftsman bungalows in the North End are popular renovation targets for new residents.',
    bestTime: 'April through October. Boise\'s dry climate allows a long exterior painting season. Summer mornings are ideal — afternoon heat can cause paint to dry too fast.',
  },
];

// ─── PAGE GENERATOR ───────────────────────────────────────────────────────────
function generatePage(c) {
  const profLaborRange = `$${c.laborLow}–$${c.laborHigh}/hr`;
  const paintRange     = `$${c.paintLow}–$${c.paintHigh}/gal`;
  const roomCostLow    = Math.round(c.laborLow * 5 + 60);
  const roomCostHigh   = Math.round(c.laborHigh * 5 + 110);
  const houseCostLow   = Math.round(c.avgHome * 1.1);
  const houseCostHigh  = Math.round(c.avgHome * 2.4);
  const avgPaintPrice  = Math.round((c.paintLow + c.paintHigh) / 2);
  const avgLaborRate   = Math.round((c.laborLow + c.laborHigh) / 2);

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `How much does it cost to paint a room in ${c.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Professional painters in ${c.name} charge ${profLaborRange}. An average room costs $${roomCostLow}–$${roomCostHigh} professionally including paint and labour. DIY painting costs $60–$150 in paint and supplies.` } },
      { '@type': 'Question', name: `How much paint do I need for a room in ${c.name}?`, acceptedAnswer: { '@type': 'Answer', text: `A standard 12×14 room needs about 2 gallons for two coats on the walls regardless of location. Use the ${c.name} paint calculator above and enter your exact dimensions for a precise estimate.` } },
      { '@type': 'Question', name: `How much does exterior painting cost in ${c.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Exterior painting for an average ${c.name} home costs $${houseCostLow.toLocaleString()}–$${houseCostHigh.toLocaleString()} professionally. DIY exterior painting costs $400–$1,200 depending on home size.` } },
      { '@type': 'Question', name: `What is the best exterior paint for ${c.name}'s climate?`, acceptedAnswer: { '@type': 'Answer', text: `For ${c.name}'s ${c.climate} climate, use a 100% acrylic exterior latex. ${c.localTip}` } },
      { '@type': 'Question', name: `When is the best time to paint a house in ${c.name}?`, acceptedAnswer: { '@type': 'Answer', text: `${c.bestTime}` } },
      { '@type': 'Question', name: `How do I find a good painter in ${c.name}?`, acceptedAnswer: { '@type': 'Answer', text: `Get at least three quotes from licensed and insured painters in ${c.name}. Check Google reviews, ask for references, and verify they carry liability insurance. ${c.name} painters typically book ${c.laborHigh > 70 ? '4–6' : '2–4'} weeks in advance for exterior projects.` } },
    ],
  });

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thepaintcalculator.com' },
      { '@type': 'ListItem', position: 2, name: `Paint Calculator ${c.state}`, item: `https://thepaintcalculator.com/${c.stateSlug}` },
      { '@type': 'ListItem', position: 3, name: `Paint Calculator ${c.name} ${c.stateAbbr}`, item: `https://thepaintcalculator.com/${c.slug}` },
    ],
  });

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Paint Calculator ${c.name} ${c.stateAbbr} — Local Paint Costs & Estimates`,
    description: `Free paint calculator for ${c.name} homeowners with local ${c.name} painter rates, climate-specific tips, and accurate paint estimates for any room or whole house.`,
    url: `https://thepaintcalculator.com/${c.slug}`,
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

function getCityParam(): string {
  const state = {
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2, paintType: 'latex', finish: 'eggshell',
      wallCondition: 'good', usePrimer: false, primerCoats: 1,
      paintCoverageRate: 400, primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: ${avgPaintPrice},
      primerPrice: 25, calculateLabor: false,
      laborRate: ${avgLaborRate},
      includeMaterials: true,
      brushRoller: 25, tape: 10, dropCloths: 15, other: 0,
    },
    rooms: [{
      id: 'room_city_prefill',
      measurements: {
        name: 'Room', mode: 'dimensions',
        length: '12', width: '14', height: '8',
        directWallArea: '', directCeilingArea: '', directPerimeter: '',
        doors: [{ id: 'door_city_prefill', size: 'standard', quantity: 1, customWidth: '', customHeight: '' }],
        windows: [{ id: 'window_city_prefill', size: 'medium', quantity: 2, customWidth: '', customHeight: '' }],
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
      ? 'https://thepaintcalculator.com/${c.slug}'
      : \`https://thepaintcalculator.com/\${locale}/${c.slug}\`;
  return {
    title: 'Paint Calculator ${c.name} ${c.stateAbbr} — Local Costs & Free Estimator | ThePaintCalculator.com',
    description: 'Free paint calculator for ${c.name}, ${c.stateAbbr}. Get instant paint estimates with local ${c.name} painter rates (${profLaborRange}), climate tips, and room-by-room calculations. No signup.',
    alternates: { canonical },
    openGraph: {
      title: 'Paint Calculator ${c.name} ${c.stateAbbr} — Local Paint Cost Estimator',
      description: 'Free paint calculator with local ${c.name} painter rates and climate-specific recommendations.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function PaintCalculator${c.functionSuffix}({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const cityParam = getCityParam();

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
            <li><Link href={\`/\${locale}/${c.stateSlug}\`} className="hover:text-blue-600 transition-colors">Paint Calculator ${c.state}</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">Paint Calculator ${c.name}</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Paint Calculator ${c.name}, ${c.stateAbbr}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            Free paint calculator for <strong>${c.name} homeowners</strong>. Pre-filled for a standard 12×14 room with local ${c.name} paint prices and labor rates. Adjust dimensions for your exact room. No signup required.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">${c.name}, ${c.stateAbbr} — Local Rates</p>
          <p className="text-2xl font-bold mb-1">${profLaborRange} painter labor · ${paintRange} paint</p>
          <p className="text-sm opacity-90">Average room costs $${roomCostLow}–$${roomCostHigh} professionally in ${c.name}</p>
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
                    url.searchParams.set('p', '\${cityParam}');
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
            Painter Costs in ${c.name}, ${c.stateAbbr}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Professional painters in ${c.name} charge <strong>${profLaborRange} per hour</strong>. Paint costs <strong>${paintRange} per gallon</strong> from local ${c.name} paint stores and home improvement retailers. An average 12×14 room costs <strong>$${roomCostLow}–$${roomCostHigh} professionally</strong> including labour and paint.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            DIY painting a standard room in ${c.name} costs $${Math.round(1.8 * c.paintLow + 40)}–$${Math.round(1.8 * c.paintHigh + 70)} in paint and supplies — saving 60–70% vs hiring a professional. Use the calculator above to estimate your exact project cost.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            ${c.name} Paint Cost Reference Table
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Project</th>
                  <th className="px-4 py-3 text-left font-semibold">DIY Cost</th>
                  <th className="px-4 py-3 text-left font-semibold">Professional Cost in ${c.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">Single room (12×14)</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(1.8 * c.paintLow + 40)}–$${Math.round(1.8 * c.paintHigh + 70)}</td>
                  <td className="px-4 py-3 text-gray-700">$${roomCostLow}–$${roomCostHigh}</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">Whole house interior</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(20 * c.paintLow + 300)}–$${Math.round(20 * c.paintHigh + 500)}</td>
                  <td className="px-4 py-3 text-gray-700">$${houseCostLow.toLocaleString()}–$${houseCostHigh.toLocaleString()}</td>
                </tr>
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-800">Exterior (average home)</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(12 * c.paintLow + 200)}–$${Math.round(12 * c.paintHigh + 400)}</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(houseCostLow * 0.85).toLocaleString()}–$${Math.round(houseCostHigh * 1.1).toLocaleString()}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">Kitchen cabinets</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(1.5 * c.paintLow + 80)}–$${Math.round(1.5 * c.paintHigh + 150)}</td>
                  <td className="px-4 py-3 text-gray-700">$${Math.round(c.laborLow * 20 + 200)}–$${Math.round(c.laborHigh * 20 + 400)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Painting in ${c.name}'s Climate
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ${c.localTip}
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Best time to paint in ${c.name}:</strong> ${c.bestTime}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            ${c.name} Neighborhoods & Painting Tips
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ${c.neighborhoodNote}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            How to Find a Painter in ${c.name}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Get multiple quotes.</strong> ${c.name} painter prices vary significantly — get at least three quotes for any professional job. Prices often differ by 30–50% for identical work.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Verify insurance.</strong> Always confirm your painter carries liability insurance and workers' compensation before work begins. Ask to see the certificate of insurance directly.
          </p>
          <p className="text-gray-700 leading-relaxed mb-2">
            <strong>Check reviews.</strong> Google and Yelp reviews are reliable indicators of quality. Look for painters with 20+ reviews and a consistent track record.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Use the calculator first.</strong> Know your paint quantities before meeting contractors — it helps you evaluate quotes and prevents overpaying for materials.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">
            Related Paint Calculators
          </h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={\`/\${locale}/${c.stateSlug}\`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Calculator ${c.state} →</Link></li>
            <li><Link href={\`/\${locale}/bedroom-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={\`/\${locale}/exterior-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Exterior Paint Calculator →</Link></li>
            <li><Link href={\`/\${locale}/whole-house-paint-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Whole House Paint Calculator →</Link></li>
            <li><Link href={\`/\${locale}/paint-cost-calculator\`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Cost Calculator →</Link></li>
            <li><Link href={\`/\${locale}/how-much-does-it-cost-to-paint-a-room\`} className="text-blue-600 hover:text-blue-700 font-medium">How Much Does It Cost to Paint a Room? →</Link></li>
            <li><Link href={\`/\${locale}/cost-to-paint-exterior-house\`} className="text-blue-600 hover:text-blue-700 font-medium">Cost to Paint Exterior of House →</Link></li>
            <li><Link href={\`/\${locale}/best-exterior-paint-for-houses\`} className="text-blue-600 hover:text-blue-700 font-medium">Best Exterior Paint for Houses →</Link></li>
            <li><Link href={\`/\${locale}\`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does it cost to paint a room in ${c.name}?</h3>
              <p className="text-gray-700">Professional painters in ${c.name} charge ${profLaborRange}. An average room costs $${roomCostLow}–$${roomCostHigh} professionally. DIY painting costs $60–$150 in paint and supplies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much paint do I need for a room in ${c.name}?</h3>
              <p className="text-gray-700">A standard 12×14 room needs about 2 gallons for two coats. Enter your exact dimensions in the ${c.name} paint calculator above for a precise estimate.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much does exterior painting cost in ${c.name}?</h3>
              <p className="text-gray-700">Exterior painting for an average ${c.name} home costs $${houseCostLow.toLocaleString()}–$${houseCostHigh.toLocaleString()} professionally. DIY costs $400–$1,200 in paint and supplies.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is the best exterior paint for ${c.name}'s climate?</h3>
              <p className="text-gray-700">${c.localTip}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When is the best time to paint a house in ${c.name}?</h3>
              <p className="text-gray-700">${c.bestTime}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I find a good painter in ${c.name}?</h3>
              <p className="text-gray-700">Get at least three quotes from licensed and insured painters. Check Google reviews, verify liability insurance, and ask for references. ${c.name} painters typically book ${c.laborHigh > 70 ? '4–6' : '2–4'} weeks in advance.</p>
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

for (const c of cities) {
  const dir  = path.join(projectRoot, 'app', '[locale]', c.slug);
  const file = path.join(dir, 'page.tsx');

  if (fs.existsSync(file)) {
    console.log('SKIP (exists):', c.slug);
    skipped++;
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, generatePage(c), 'utf8');
  console.log('Created:', c.slug);
  created++;
}

console.log(`\nDone! Created: ${created} | Skipped: ${skipped} | Total: ${cities.length}`);
