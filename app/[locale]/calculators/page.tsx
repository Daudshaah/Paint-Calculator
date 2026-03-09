import Link from 'next/link';
import { Metadata } from 'next';
import { calculatorsByRoom, calculatorsSpecialty, calculatorsCommercial } from '@/lib/site-pages';

function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locale === 'en' || locale === 'es';
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'All Paint Calculators | ThePaintCalculator.com',
    description: 'Free paint calculators for every room, surface, and project. Find the right paint calculator for your bedroom, bathroom, exterior, deck, and more.',
    alternates: { canonical: `https://thepaintcalculator.com/${locale}/calculators` },
  };
}

export default async function CalculatorsHubPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const safeLocale = isValidLocale(locale) ? locale : 'en';

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Paint Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Free paint calculators for every room, surface, and project type.
            Get accurate estimates in seconds.
          </p>
          <Link
            href={`/${safeLocale}`}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Use Main Calculator →
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* By Room */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">By Room</h2>
          <p className="text-gray-500 mb-6">Room-specific calculators that account for doors and windows automatically.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {calculatorsByRoom.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{page.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Specialty */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Specialty Calculators</h2>
          <p className="text-gray-500 mb-6">For specific surfaces, exterior projects, and specialized painting tasks.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {calculatorsSpecialty.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800 group-hover:text-green-700">{page.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Commercial */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Commercial & Contractor</h2>
          <p className="text-gray-500 mb-6">Large-scale calculators for contractors, property managers, and commercial projects.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {calculatorsCommercial.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 transition-colors">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800 group-hover:text-purple-700">{page.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
