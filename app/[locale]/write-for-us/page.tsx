import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'Write for Us | Paint Calculator',
    description: 'Contribute high-quality, original content about painting, home improvement, and construction planning.',
    alternates: {
      canonical: `/${locale}/write-for-us`,
    },
  };
}

type Section = { title: string; items: string[] };

export default async function WriteForUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const sections: Section[] = [
    {
      title: 'Who Can Write for Us',
      items: [
        'Painting professionals',
        'Home improvement experts',
        'Construction and renovation bloggers',
        'DIY specialists',
        'Industry brands and agencies',
        'All submissions must provide real value to our users.',
      ],
    },
    {
      title: 'Topics We Accept',
      items: [
        'Painting guides and best practices',
        'Paint calculation and estimation',
        'Interior and exterior painting',
        'Paint coverage, coats, and finishes',
        'Home renovation and improvement',
        'Construction planning and cost estimation',
        'Tools and techniques for painters',
        'Content must be informational, educational, and practical.',
      ],
    },
    {
      title: 'Topics We Do NOT Accept',
      items: [
        'Gambling, betting, or casinos',
        'Adult or explicit content',
        'Cryptocurrency or financial trading',
        'CBD, supplements, or medical advice',
        'Essay writing, hacking, or piracy',
        'AI tools unrelated to construction or home improvement',
        'Submissions outside our niche will be rejected.',
      ],
    },
    {
      title: 'Content Guidelines (Very Important)',
      items: [
        '1,000+ words (longer is preferred).',
        '100% original and unpublished elsewhere.',
        'Well-structured with headings and subheadings.',
        'Clear, professional English; free from grammar and spelling errors.',
        'No AI-generated or spun content.',
        'No promotional or sales-focused language.',
        'We reserve the right to reject low-quality submissions.',
      ],
    },
    {
      title: 'Links Policy',
      items: [
        'Contextual backlinks are allowed if relevant.',
        'No spammy, over-optimized, or irrelevant anchors.',
        'No link farms or PBN links.',
        'Final decision on link placement is ours; outbound links are reviewed strictly.',
      ],
    },
    {
      title: 'Sponsored Content & Paid Placements',
      items: [
        'We accept sponsored guest posts and paid link placements from relevant brands and agencies.',
        'Sponsored submissions must match our niche, provide real value, and follow all content guidelines.',
        'Pricing depends on content quality, link type/placement, and topic relevance.',
        'Contact us directly for rates and availability.',
      ],
    },
    {
      title: 'Submission Process',
      items: [
        'Email us your topic idea(s), brief outline, website URL(s) you want to link to, and note if it is sponsored or editorial.',
        'Subject line: Write for Us Submission.',
        'We typically respond within 2–3 business days.',
      ],
    },
    {
      title: 'Editorial Rights',
      items: [
        'We may edit content for clarity, formatting, or SEO.',
        'We may add internal links where appropriate.',
        'We may reject submissions that do not meet our standards.',
        'We may remove published content if guidelines are violated later.',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Write for Us</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Contribute high-quality content to Paint Calculator
          </h1>
          <p className="text-base text-gray-600 max-w-3xl">
            Paint Calculator is a professional paint estimation tool used by homeowners, DIY painters, and construction professionals worldwide. We welcome original contributions related to painting, home improvement, and construction planning.
          </p>
        </header>

        <section className="grid gap-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/60 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">Contact for Submissions</h2>
          <p className="text-indigo-900">
            Send all inquiries to <a className="font-semibold underline" href="mailto:support@thepaintcalculator.com">support@thepaintcalculator.com</a> with subject line “Write for Us Submission.”
            We typically respond within 2–3 business days.
          </p>
        </section>

        <section className="p-5 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Final Note</h2>
          <p className="text-blue-900">
            We focus on quality over quantity. If your content helps users plan, calculate, or execute painting projects better, we are happy to review it.
          </p>
        </section>
      </div>
    </main>
  );
}
