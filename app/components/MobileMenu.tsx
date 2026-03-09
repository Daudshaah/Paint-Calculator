'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  navFeaturedCalculators,
  navFeaturedSpecialty,
  navFeaturedHowMuch,
  navFeaturedGuides,
  navFeaturedCostGuides,
  navFeaturedLocations,
} from '@/lib/site-pages';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

interface AccordionSection {
  label: string;
  hubSlug: string;
  pages: { label: string; slug: string }[];
}

const sections: AccordionSection[] = [
  {
    label: 'Calculators',
    hubSlug: 'calculators',
    pages: [...navFeaturedCalculators, ...navFeaturedSpecialty],
  },
  {
    label: 'How Much Paint',
    hubSlug: 'how-much-paint',
    pages: navFeaturedHowMuch,
  },
  {
    label: 'Painting Guides',
    hubSlug: 'painting-guides',
    pages: navFeaturedGuides,
  },
  {
    label: 'Cost Guides',
    hubSlug: 'cost-guides',
    pages: navFeaturedCostGuides,
  },
  {
    label: 'Locations',
    hubSlug: 'locations',
    pages: navFeaturedLocations,
  },
];

export default function MobileMenu({ isOpen, onClose, locale }: Props) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setOpenSection(null);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggle = (label: string) => {
    setOpenSection(openSection === label ? null : label);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href={`/${locale}`} onClick={onClose} className="font-bold text-gray-900 text-lg">
            ThePaintCalculator
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <div className="px-5 py-3 border-b border-gray-100">
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Use Paint Calculator
          </Link>
        </div>

        {/* Accordion nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {sections.map((section) => (
            <div key={section.label} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => toggle(section.label)}
                className="flex items-center justify-between w-full px-3 py-4 text-left text-sm font-semibold text-gray-800"
              >
                {section.label}
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${openSection === section.label ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openSection === section.label && (
                <div className="pb-3">
                  <ul className="space-y-0.5">
                    {section.pages.map((page) => (
                      <li key={page.slug}>
                        <Link
                          href={`/${locale}/${page.slug}`}
                          onClick={onClose}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          {page.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${locale}/${section.hubSlug}`}
                    onClick={onClose}
                    className="flex items-center gap-1 mt-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all {section.label} →
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* Blog */}
          <div className="border-b border-gray-100">
            <Link
              href={`/${locale}/blog`}
              onClick={onClose}
              className="flex items-center px-3 py-4 text-sm font-semibold text-gray-800 hover:text-blue-600"
            >
              Blog
            </Link>
          </div>
        </nav>

        {/* Footer links */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <Link href={`/${locale}/faq`} onClick={onClose} className="hover:text-gray-700">FAQ</Link>
          <Link href={`/${locale}/contact`} onClick={onClose} className="hover:text-gray-700">Contact</Link>
          <Link href={locale === 'en' ? '/es' : '/en'} onClick={onClose} className="hover:text-gray-700 font-medium">
            {locale === 'en' ? '🇲🇽 ES' : '🇺🇸 EN'}
          </Link>
        </div>

      </div>
    </div>
  );
}
