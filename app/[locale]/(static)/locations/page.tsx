import Link from 'next/link';
import { Metadata } from 'next';
import { statePages, cityPages, locationVariantPages } from '@/lib/site-pages';

function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locale === 'en' || locale === 'es';
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Paint Calculator by State & City | ThePaintCalculator.com',
    description: 'Find local paint costs and estimates for your state or city. Paint calculators for all 50 US states and top cities with local pricing.',
    alternates: { canonical: `https://thepaintcalculator.com/${locale}/locations` },
  };
}

export default async function LocationsHubPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const safeLocale = isValidLocale(locale) ? locale : 'en';

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Paint Calculator by Location
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get paint estimates tailored to your state or city.
            Local labor costs and pricing data for all 50 US states and 50+ cities.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* States */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All 50 States</h2>
          <p className="text-gray-500 mb-6">State-specific paint cost data and local contractor rates.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {statePages.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all text-center"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Cities */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Top US Cities</h2>
          <p className="text-gray-500 mb-6">City-level paint cost estimates with local market pricing.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cityPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all text-center"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Room × Location variants */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Room-Specific by Location</h2>
          <p className="text-gray-500 mb-6">Bedroom, exterior, and cost calculators with local pricing for top markets.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {locationVariantPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="px-4 py-3 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 hover:text-blue-700 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
