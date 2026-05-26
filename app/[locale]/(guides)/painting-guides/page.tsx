import Link from 'next/link';
import { Metadata } from 'next';
import { howToGuides } from '@/lib/site-pages';

function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locale === 'en' || locale === 'es';
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Painting Guides & How-To Articles | ThePaintCalculator.com',
    description: 'Step-by-step painting guides covering everything from choosing the right paint finish to how many coats you need. Free how-to articles for DIY painters.',
    alternates: { canonical: `https://thepaintcalculator.com/${locale}/painting-guides` },
  };
}

export default async function PaintingGuidesHubPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const safeLocale = isValidLocale(locale) ? locale : 'en';

  const howToArticles = howToGuides.filter(p => p.slug.startsWith('how-') || p.slug.startsWith('do-') || p.slug.startsWith('one-'));
  const bestOf = howToGuides.filter(p => p.slug.startsWith('best-'));
  const comparisons = howToGuides.filter(p => p.slug.includes('-vs-') || p.slug.includes('finish') || p.slug.includes('coverage'));

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Painting Guides & How-To Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know before, during, and after painting.
            From choosing the right finish to calculating exactly how much paint you need.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How-To Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {howToArticles.map((page) => (
              <Link
                key={page.slug}
                href={`/${safeLocale}/${page.slug}`}
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">{page.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {bestOf.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Paint Recommendations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestOf.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${safeLocale}/${page.slug}`}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-100 mt-0.5">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-yellow-700">{page.label}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {comparisons.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comparisons & Coverage</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {comparisons.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${safeLocale}/${page.slug}`}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-100 mt-0.5">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-purple-700">{page.label}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
