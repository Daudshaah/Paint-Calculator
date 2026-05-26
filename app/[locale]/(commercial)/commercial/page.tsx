import Link from 'next/link';
import { Metadata } from 'next';
import { calculatorsCommercial } from '@/lib/site-pages';

function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locale === 'en' || locale === 'es';
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Commercial Paint Calculators for Contractors | ThePaintCalculator.com',
    description: 'Professional paint calculators for commercial buildings, warehouses, offices, schools, and hotels. Accurate estimates for large-scale painting projects.',
    alternates: { canonical: `https://thepaintcalculator.com/${locale}/commercial` },
  };
}

export default async function CommercialHubPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const safeLocale = isValidLocale(locale) ? locale : 'en';

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Commercial Paint Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional-grade paint estimators for contractors, property managers,
            and large commercial painting projects.
          </p>
          <Link
            href={`/${safeLocale}/paint-calculator-for-contractors`}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contractor Calculator →
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {calculatorsCommercial.map((page) => (
            <Link
              key={page.slug}
              href={`/${safeLocale}/${page.slug}`}
              className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-700">{page.label}</p>
                <p className="text-sm text-gray-500 mt-0.5">Free commercial paint estimator</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Why contractors section */}
        <div className="mt-12 bg-gray-800 text-white rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">Why Contractors Use Our Calculator</h3>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <p className="font-semibold text-white mb-1">Accurate Material Estimates</p>
              <p>Calculate paint needed for large surfaces fast. No more over-ordering or running short on job sites.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Multi-Coat Support</p>
              <p>Easily calculate for primer + multiple finish coats on commercial-grade projects.</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Professional Bidding</p>
              <p>Generate fast, accurate bids for clients. Cover your material costs and protect your margins.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
