'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { locales, localeNames, localeFlags, defaultLocale, type Locale } from '@/i18n/config';

type LanguageSwitcherProps = {
  label?: string;
};

export default function LanguageSwitcher({ label = 'Languages' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const menuId = 'language-menu';

  // Extract current locale from pathname
  const currentLocale = (locales.includes(pathname.split('/')[1] as Locale) ? pathname.split('/')[1] : defaultLocale) as Locale;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (locale: Locale) => {
    setIsOpen(false);
    const pathWithoutLocale = pathname.replace(/^\/[^/]+/, '') || '/';
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-white border border-blue-100 rounded-lg shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-colors font-medium text-gray-800"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-controls={menuId}
        type="button"
      >
        <span className="text-lg" aria-hidden="true">{localeFlags[currentLocale]}</span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
          <span>{localeNames[currentLocale]}</span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id={menuId}
          role="listbox"
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[70vh] overflow-y-auto"
        >
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              type="button"
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                currentLocale === locale
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-800'
              }`}
              role="option"
              aria-selected={currentLocale === locale}
            >
              <span className="text-sm font-semibold text-gray-600">{localeFlags[locale] || locale.toUpperCase()}</span>
              <span className="font-medium truncate">{localeNames[locale]}</span>
              {currentLocale === locale && (
                <svg
                  className="w-4 h-4 ml-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

