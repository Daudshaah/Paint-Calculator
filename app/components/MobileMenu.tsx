'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';

interface MobileMenuProps {
  locale: Locale;
}

export default function MobileMenu({ locale }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<'calculators' | 'guides' | 'blog' | null>(null);

  const toggle = () => setOpen((prev) => !prev);
  const toggleSection = (section: 'calculators' | 'guides' | 'blog') =>
    setExpanded((prev) => (prev === section ? null : section));

  const makeHref = (slug: string) => `/${locale}/${slug}`;

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
    { label: 'Office Building', slug: 'office-paint-calculator' },
    { label: 'School Calculator', slug: 'school-paint-calculator' },
    { label: 'Hotel Calculator', slug: 'hotel-paint-calculator' },
  ];

  const guidesHowMuchPaint = [
    { label: 'For a 10x10 Room', slug: 'how-much-paint-for-10x10-room' },
    { label: 'For a 12x12 Room', slug: 'how-much-paint-for-12x12-room' },
    { label: 'For a 12x14 Room', slug: 'how-much-paint-for-12x14-room' },
    { label: 'For a 14x14 Room', slug: 'how-much-paint-for-14x14-room' },
    { label: 'For a 15x15 Room', slug: 'how-much-paint-for-15x15-room' },
    { label: 'For a Bedroom', slug: 'how-much-paint-for-bedroom' },
    { label: 'For a Living Room', slug: 'how-much-paint-for-living-room' },
    { label: 'For a 1000 sq ft House', slug: 'how-much-paint-for-1000-sq-ft-house' },
    { label: 'For a 2000 sq ft House', slug: 'how-much-paint-for-2000-sq-ft-house' },
    { label: 'For Kitchen Cabinets', slug: 'how-much-paint-for-kitchen-cabinets' },
    { label: 'For a Front Door', slug: 'how-much-paint-for-front-door' },
    { label: 'For a Fence', slug: 'how-much-paint-for-fence' },
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

  const sectionButtonBase =
    'w-full flex items-center justify-between py-3 text-base font-medium text-gray-900 border-b border-gray-200';

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm lg:hidden"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
      >
        {open ? (
          <span className="text-xl leading-none">&times;</span>
        ) : (
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-gray-800 rounded" />
            <span className="block h-0.5 w-5 bg-gray-800 rounded" />
            <span className="block h-0.5 w-5 bg-gray-800 rounded" />
          </div>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-200 ease-out">
            <nav className="h-full overflow-y-auto px-5 pt-16 pb-10 space-y-4">
              <button
                type="button"
                onClick={() => toggleSection('calculators')}
                className={sectionButtonBase}
              >
                <span>Calculators</span>
                <span>{expanded === 'calculators' ? '▴' : '▾'}</span>
              </button>
              {expanded === 'calculators' && (
                <div className="pl-2 py-2 space-y-1">
                  {[...calculatorsByRoom, ...calculatorsSpecialty, ...calculatorsCommercial].map((item) => (
                    <Link
                      key={item.slug}
                      href={makeHref(item.slug)}
                      className="block py-2 text-sm text-gray-700 hover:text-blue-600"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleSection('guides')}
                className={sectionButtonBase}
              >
                <span>Guides</span>
                <span>{expanded === 'guides' ? '▴' : '▾'}</span>
              </button>
              {expanded === 'guides' && (
                <div className="pl-2 py-2 space-y-1">
                  {[...guidesHowMuchPaint, ...guidesHowTo, ...guidesCost].map((item) => (
                    <Link
                      key={item.slug}
                      href={makeHref(item.slug)}
                      className="block py-2 text-sm text-gray-700 hover:text-blue-600"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleSection('blog')}
                className={sectionButtonBase}
              >
                <span>Blog</span>
                <span>{expanded === 'blog' ? '▴' : '▾'}</span>
              </button>
              {expanded === 'blog' && (
                <div className="pl-2 py-2 space-y-1">
                  {[...blogPaintTips, ...blogProjectIdeas, ...blogQuickLinks].map((item) => (
                    <Link
                      key={item.slug}
                      href={makeHref(item.slug)}
                      className="block py-2 text-sm text-gray-700 hover:text-blue-600"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href={makeHref('how-it-works')}
                  className="block py-3 text-sm font-medium text-gray-800 hover:text-blue-600"
                  onClick={() => setOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href={makeHref('help')}
                  className="block py-3 text-sm font-medium text-gray-800 hover:text-blue-600"
                  onClick={() => setOpen(false)}
                >
                  Help
                </Link>
                <Link
                  href={makeHref('faq')}
                  className="block py-3 text-sm font-medium text-gray-800 hover:text-blue-600"
                  onClick={() => setOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href={makeHref('contact')}
                  className="block py-3 text-sm font-medium text-gray-800 hover:text-blue-600"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

