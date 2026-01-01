import LanguageSwitcher from './LanguageSwitcher';
import { getTranslations } from '@/i18n';
import { Locale } from '@/i18n/config';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const t = getTranslations(locale);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <a
            href="https://thepaintcalculator.com"
            className="flex items-center gap-3 shrink-0 group"
            aria-label="Paint Calculator homepage"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-700 transition-colors">
                {t.header.title}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.header.tagline}
              </p>
            </div>
          </a>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-700 dark:text-gray-200">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                How It Works
              </a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Help
              </a>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

