import Link from 'next/link';
import {
  footerCalculators,
  footerHowMuch,
  footerCostGuides,
  footerGuides,
  footerLocations,
} from '@/lib/site-pages';

interface Props {
  locale: string;
}

export default function Footer({ locale }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Col 1: Calculators */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2">
              {footerCalculators.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${locale}/${p.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/calculators`}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  View all calculators →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: How Much Paint */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              How Much Paint
            </h3>
            <ul className="space-y-2">
              {footerHowMuch.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${locale}/${p.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/how-much-paint`}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Cost Guides */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Cost Guides
            </h3>
            <ul className="space-y-2">
              {footerCostGuides.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${locale}/${p.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/cost-guides`}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  View all cost guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Painting Guides */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Painting Guides
            </h3>
            <ul className="space-y-2">
              {footerGuides.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${locale}/${p.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/painting-guides`}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  View all guides →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'How It Works', slug: 'how-it-works' },
                { label: 'FAQ', slug: 'faq' },
                { label: 'Tips & Tricks', slug: 'tips-and-tricks' },
                { label: 'Write for Us', slug: 'write-for-us' },
                { label: 'Contact Us', slug: 'contact' },
                { label: 'Privacy Policy', slug: 'privacy' },
                { label: 'Terms of Service', slug: 'terms' },
              ].map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/${locale}/${p.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Locations strip */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">
            Popular Locations
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {footerLocations.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/${p.slug}`}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {p.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/locations`}
              className="text-sm text-blue-400 hover:text-blue-300 font-medium"
            >
              All locations →
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © {year} ThePaintCalculator.com · All rights reserved
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link href={`/${locale}/privacy`} className="hover:text-gray-400">Privacy</Link>
            <Link href={`/${locale}/terms`} className="hover:text-gray-400">Terms</Link>
            <Link href={locale === 'en' ? '/es' : '/en'} className="hover:text-gray-400">
              {locale === 'en' ? 'Español' : 'English'}
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
