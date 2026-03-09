'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import {
  navFeaturedCalculators,
  navFeaturedSpecialty,
  navFeaturedHowMuch,
  navFeaturedGuides,
  navFeaturedCostGuides,
  navFeaturedLocations,
} from '@/lib/site-pages';

interface NavSection {
  heading: string;
  pages: { label: string; slug: string }[];
  hubSlug: string;
}

interface NavItem {
  label: string;
  sections: NavSection[];
}

const navItems: NavItem[] = [
  {
    label: 'Calculators',
    sections: [
      { heading: 'By Room', pages: navFeaturedCalculators, hubSlug: 'calculators' },
      { heading: 'Specialty', pages: navFeaturedSpecialty, hubSlug: 'calculators' },
    ],
  },
  {
    label: 'How Much Paint',
    sections: [
      { heading: 'By Room & Size', pages: navFeaturedHowMuch, hubSlug: 'how-much-paint' },
    ],
  },
  {
    label: 'Painting Guides',
    sections: [
      { heading: 'How-To Guides', pages: navFeaturedGuides, hubSlug: 'painting-guides' },
    ],
  },
  {
    label: 'Cost Guides',
    sections: [
      { heading: 'Painting Costs', pages: navFeaturedCostGuides, hubSlug: 'cost-guides' },
    ],
  },
  {
    label: 'Locations',
    sections: [
      { heading: 'Popular Locations', pages: navFeaturedLocations, hubSlug: 'locations' },
    ],
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const locale = pathname?.split('/')[1] || 'en';

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900 text-lg hidden sm:block">
                ThePaintCalculator
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      openMenu === item.label
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openMenu === item.label && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 min-w-[280px]"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-4">
                        {item.sections.map((section) => (
                          <div key={section.heading} className="mb-4 last:mb-0">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                              {section.heading}
                            </p>
                            <ul className="space-y-0.5">
                              {section.pages.map((page) => (
                                <li key={page.slug}>
                                  <Link
                                    href={`/${locale}/${page.slug}`}
                                    className="block px-2 py-1.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                    onClick={() => setOpenMenu(null)}
                                  >
                                    {page.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={`/${locale}/${section.hubSlug}`}
                              className="flex items-center gap-1 mt-2 px-2 py-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                              onClick={() => setOpenMenu(null)}
                            >
                              View all →
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Blog — kept as-is */}
              <Link
                href={`/${locale}/blog`}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                Blog
              </Link>
            </nav>

            {/* CTA + controls */}
            <div className="flex items-center gap-3">
              <Link
                href={`/${locale}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Use Calculator
              </Link>
              <Link
                href={locale === 'en' ? '/es' : '/en'}
                className="hidden sm:block px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
              >
                {locale === 'en' ? 'ES' : 'EN'}
              </Link>
              <button
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} locale={locale} />
    </>
  );
}
