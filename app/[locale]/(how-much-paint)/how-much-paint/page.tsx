import Link from 'next/link';
import { Metadata } from 'next';
import { howMuchPaintPages } from '@/lib/site-pages';

function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locale === 'en' || locale === 'es';
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'How Much Paint Do I Need? | All Guides | ThePaintCalculator.com',
    description: 'How much paint do you need for any room or project? Find guides for 10x10 rooms, bedrooms, living rooms, entire houses, and more.',
    alternates: { canonical: `https://thepaintcalculator.com/${locale}/how-much-paint` },
  };
}

export default async function HowMuchPaintHubPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const safeLocale = isValidLocale(locale) ? locale : 'en';

  const roomSize = howMuchPaintPages.filter(p =>
    p.slug.match(/\d+x\d+/) || p.slug.includes('sq-ft') || p.slug.includes('gallons')
  );
  const byRoom = howMuchPaintPages.filter(p =>
    !p.slug.match(/\d+x\d+/) && !p.slug.includes('sq-ft') && !p.slug.includes('gallons')
  );

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How Much Paint Do I Need?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find out exactly how much paint you need for any room size, surface, or project.
            All guides are free and give you gallon-by-gallon breakdowns.
          </p>
          <Link
            href={`/${safeLocale}`}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Use Paint Calculator →
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">By Room Size</h2>
          <p className="text-gray-500 mb-6">Exact paint amounts for specific room dimensions and house sizes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {roomSize.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{page.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">By Room & Surface</h2>
          <p className="text-gray-500 mb-6">Paint amounts for specific rooms, surfaces, and project types.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {byRoom.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{page.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick tip box */}
        <section className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Quick Rule of Thumb</h3>
          <p className="text-blue-800 text-sm">
            One gallon of paint covers approximately <strong>350–400 square feet</strong> with one coat on a smooth surface.
            For two coats, double your estimate. Textured surfaces can use up to <strong>30% more paint</strong>.
            Use our calculator above for a precise estimate.
          </p>
        </section>

      </div>
    </main>
  );
}
