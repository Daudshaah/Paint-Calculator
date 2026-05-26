import Link from 'next/link';
import { Metadata } from 'next';
import { costGuides } from '@/lib/site-pages';

function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locale === 'en' || locale === 'es';
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Painting Cost Guides | How Much Does It Cost to Paint? | ThePaintCalculator.com',
    description: 'Find out how much it costs to paint any room, surface, or your whole house. Painting cost guides with average prices and what affects the final bill.',
    alternates: { canonical: `https://thepaintcalculator.com/${locale}/cost-guides` },
  };
}

export default async function CostGuidesHubPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const safeLocale = isValidLocale(locale) ? locale : 'en';

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Painting Cost Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understand painting costs before hiring a contractor or buying supplies.
            Real price ranges for every room and project type.
          </p>
          <Link
            href={`/${safeLocale}`}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Paint Cost →
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {costGuides.map((page) => (
            <Link
              key={page.slug}
              href={`/${safeLocale}/${page.slug}`}
              className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {page.label}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">Average costs · DIY vs pro · What affects price</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-400 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Info callout */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-amber-900 mb-2">What Affects Painting Costs?</h3>
          <div className="grid sm:grid-cols-3 gap-4 mt-4 text-sm text-amber-800">
            <div>
              <p className="font-semibold mb-1">Room Size</p>
              <p>Larger rooms need more paint and labor time, directly increasing the cost.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Paint Quality</p>
              <p>Premium paint can cost 2–3× more but often provides better coverage and durability.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">DIY vs. Contractor</p>
              <p>Professional painters charge $2–$6 per square foot. DIY saves labor but takes more time.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
