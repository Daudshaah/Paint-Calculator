import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { getTranslations } from '@/i18n';
import { Locale } from '@/i18n/config';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = getTranslations(locale);

  const calculatorsByRoom = [
    { label: 'Bedroom Calculator', slug: 'bedroom-paint-calculator' },
    { label: 'Bathroom Calculator', slug: 'bathroom-paint-calculator' },
    { label: 'Kitchen Calculator', slug: 'kitchen-paint-calculator' },
    { label: 'Living Room Calculator', slug: 'living-room-paint-calculator' },
    { label: 'Ceiling Calculator', slug: 'ceiling-paint-calculator' },
    { label: 'Garage Calculator', slug: 'garage-paint-calculator' },
    { label: 'Basement Calculator', slug: 'basement-paint-calculator' },
    { label: 'Hallway Calculator', slug: 'hallway-paint-calculator' },
    { label: 'Nursery Calculator', slug: 'nursery-paint-calculator' },
    { label: 'Dining Room Calculator', slug: 'dining-room-paint-calculator' },
  ];

  const calculatorsSpecialty = [
    { label: 'Exterior Calculator', slug: 'exterior-paint-calculator' },
    { label: 'Whole House Calculator', slug: 'whole-house-paint-calculator' },
    { label: 'Paint Cost Calculator', slug: 'paint-cost-calculator' },
    { label: 'Primer Calculator', slug: 'primer-calculator' },
    { label: 'Cabinet Calculator', slug: 'cabinet-paint-calculator' },
    { label: 'Fence Paint Calculator', slug: 'fence-paint-calculator' },
    { label: 'Deck Stain Calculator', slug: 'deck-stain-calculator' },
    { label: 'Spray Paint Calculator', slug: 'spray-paint-calculator' },
    { label: 'Stain Calculator', slug: 'stain-calculator' },
    { label: 'Paint Coverage Calculator', slug: 'paint-coverage-calculator' },
  ];

  const calculatorsCommercial = [
    { label: 'Contractor Calculator', slug: 'paint-calculator-for-contractors' },
    { label: 'Commercial Calculator', slug: 'commercial-paint-calculator' },
    { label: 'Warehouse Calculator', slug: 'warehouse-paint-calculator' },
    { label: 'Office Building', slug: 'office-building-paint-calculator' },
    { label: 'School Calculator', slug: 'school-paint-calculator' },
    { label: 'Hotel Calculator', slug: 'hotel-paint-calculator' },
  ];

  const guidesHowMuchPaint = [
    { label: 'For a 10x10 Room', slug: 'how-much-paint-for-a-10x10-room' },
    { label: 'For a 12x12 Room', slug: 'how-much-paint-for-a-12x12-room' },
    { label: 'For a 12x14 Room', slug: 'how-much-paint-for-a-12x14-room' },
    { label: 'For a 14x14 Room', slug: 'how-much-paint-for-a-14x14-room' },
    { label: 'For a 15x15 Room', slug: 'how-much-paint-for-a-15x15-room' },
    { label: 'For a Bedroom', slug: 'how-much-paint-for-a-bedroom' },
    { label: 'For a Living Room', slug: 'how-much-paint-for-a-living-room' },
    { label: 'For a 1000 sq ft House', slug: 'how-much-paint-for-a-1000-sq-ft-house' },
    { label: 'For a 2000 sq ft House', slug: 'how-much-paint-for-a-2000-sq-ft-house' },
    { label: 'For Kitchen Cabinets', slug: 'how-much-paint-for-kitchen-cabinets' },
    { label: 'For a Front Door', slug: 'how-much-paint-for-a-front-door' },
    { label: 'For a Fence', slug: 'how-much-paint-for-a-fence' },
  ];

  const guidesHowTo = [
    { label: 'How to Calculate Paint', slug: 'how-to-calculate-paint-for-a-room' },
    { label: 'How Many Coats of Paint', slug: 'how-many-coats-of-paint' },
    { label: 'Do I Need Primer', slug: 'do-i-need-primer-before-painting' },
    { label: 'Paint Finishes Guide', slug: 'paint-finish-guide' },
    { label: 'Interior vs Exterior', slug: 'interior-vs-exterior-paint' },
    { label: 'How Long to Paint a Room', slug: 'how-long-to-paint-a-room' },
    { label: 'How to Paint a Room', slug: 'how-to-paint-a-room' },
    { label: 'Spray vs Roller vs Brush', slug: 'spray-vs-roller-vs-brush' },
    { label: 'Best Paint for Bathrooms', slug: 'best-paint-for-bathrooms' },
    { label: 'Best Paint for Cabinets', slug: 'best-paint-for-cabinets' },
  ];

  const guidesCost = [
    { label: 'Cost to Paint a Room', slug: 'how-much-does-it-cost-to-paint-a-room' },
    { label: 'Cost to Paint a Bedroom', slug: 'cost-to-paint-bedroom' },
    { label: 'Cost to Paint Exterior', slug: 'cost-to-paint-exterior-house' },
    { label: 'Cost to Paint Cabinets', slug: 'cost-to-paint-kitchen-cabinets' },
    { label: 'Cost to Paint a Garage', slug: 'cost-to-paint-garage' },
    { label: 'Cost to Paint Front Door', slug: 'cost-to-paint-front-door' },
    { label: 'Cost to Paint a Deck', slug: 'cost-to-paint-deck' },
  ];

  const blogPaintTips = [
    { label: 'Best Paint Brands 2026', slug: 'blog/best-paint-brands' },
    { label: 'Paint Finish Guide', slug: 'blog/paint-finish-guide' },
    { label: 'How to Prep Walls', slug: 'blog/how-to-prep-walls-for-painting' },
    { label: 'Painting in Cold Weather', slug: 'blog/painting-in-cold-weather' },
    { label: 'Best Paint for Humid Rooms', slug: 'blog/best-paint-for-humid-rooms' },
    { label: 'How to Fix Paint Mistakes', slug: 'blog/how-to-fix-paint-mistakes' },
  ];

  const blogProjectIdeas = [
    { label: 'Bedroom Color Ideas', slug: 'blog/bedroom-paint-color-ideas' },
    { label: 'Living Room Color Ideas', slug: 'blog/living-room-color-ideas' },
    { label: 'Kitchen Cabinet Colors', slug: 'blog/kitchen-cabinet-paint-colors' },
    { label: 'Exterior Color Trends', slug: 'blog/exterior-paint-color-trends' },
    { label: 'Accent Wall Ideas', slug: 'blog/accent-wall-paint-ideas' },
    { label: 'Small Room Paint Tips', slug: 'blog/paint-colors-for-small-rooms' },
  ];

  const blogQuickLinks = [
    { label: 'All Blog Posts', slug: 'blog' },
    { label: 'Paint Calculator News', slug: 'blog/category/news' },
    { label: 'DIY Painting Guides', slug: 'blog/category/diy' },
    { label: 'Paint Brand Reviews', slug: 'blog/category/reviews' },
    { label: 'Cost Saving Tips', slug: 'blog/category/cost-tips' },
  ];

  const makeHref = (slug: string) => `/${locale}/${slug}`;

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link
          href="https://thepaintcalculator.com"
          className="flex items-center gap-3 shrink-0 group"
          aria-label="Paint Calculator homepage"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
              {t.header.title}
            </span>
            <p className="text-xs text-gray-500">{t.header.tagline}</p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">

          {/* Calculators dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors py-2"
            >
              <span>Calculators</span>
              <span className="text-xs">▾</span>
            </button>
            {/* Invisible bridge fills gap between button and panel */}
            <div className="absolute top-full left-0 h-3 w-full" />
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 ease-out absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-screen max-w-5xl pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 px-8 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">By Room</div>
                  <ul>
                    {calculatorsByRoom.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Specialty</div>
                  <ul>
                    {calculatorsSpecialty.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Commercial</div>
                  <ul>
                    {calculatorsCommercial.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Guides dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors py-2"
            >
              <span>Guides</span>
              <span className="text-xs">▾</span>
            </button>
            {/* Invisible bridge */}
            <div className="absolute top-full left-0 h-3 w-full" />
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 ease-out absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-screen max-w-5xl pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 px-8 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">How Much Paint</div>
                  <ul>
                    {guidesHowMuchPaint.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">How To Guides</div>
                  <ul>
                    {guidesHowTo.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Cost Guides</div>
                  <ul>
                    {guidesCost.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Blog dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors py-2"
            >
              <span>Blog</span>
              <span className="text-xs">▾</span>
            </button>
            {/* Invisible bridge */}
            <div className="absolute top-full left-0 h-3 w-full" />
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 ease-out absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-screen max-w-5xl pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-6 px-8 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Paint Tips</div>
                  <ul>
                    {blogPaintTips.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Project Ideas</div>
                  <ul>
                    {blogProjectIdeas.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">Quick Links</div>
                  <ul>
                    {blogQuickLinks.map((item) => (
                      <li key={item.slug}>
                        <Link href={makeHref(item.slug)} className="block py-1 text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link href={`/${locale}/how-it-works`} className="hover:text-blue-600 transition-colors">
            How It Works
          </Link>

          <LanguageSwitcher />
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <MobileMenu locale={locale} />
        </div>

      </div>
    </header>
  );
}