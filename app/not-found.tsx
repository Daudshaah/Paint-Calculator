import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | ThePaintCalculator.com',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          This page doesn't exist. Try one of our popular calculators below.
        </p>

        {/* Popular links */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { label: 'Bedroom Calculator', slug: 'bedroom-paint-calculator' },
            { label: 'Exterior Calculator', slug: 'exterior-paint-calculator' },
            { label: 'How Much Paint?', slug: 'how-much-paint' },
            { label: 'Cost Guides', slug: 'cost-guides' },
          ].map((link) => (
            <Link
              key={link.slug}
              href={`/en/${link.slug}`}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/en"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Go to Paint Calculator
        </Link>

      </div>
    </main>
  );
}
