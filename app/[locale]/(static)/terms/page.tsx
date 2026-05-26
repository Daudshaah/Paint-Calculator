import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'Terms of Service | Paint Calculator',
    description: 'Terms governing use of the Paint Calculator website and estimation tool.',
    alternates: {
      canonical: `/${locale}/terms`,
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const sections = [
    {
      title: 'Description of the Service',
      items: [
        'Paint Calculator is a web-based tool to help estimate paint quantities, paintable surface areas, project time, and estimated paint/supplies/total project cost.',
        'All results are estimates for planning purposes only.',
      ],
    },
    {
      title: 'Eligibility',
      items: [
        'You are at least 13 years old.',
        'You are legally permitted to use online services in your jurisdiction.',
      ],
    },
    {
      title: 'Use of the Service',
      items: [
        'Use the Service lawfully and in accordance with these Terms.',
        'Do not attempt to disrupt or harm the Service.',
        'Do not reverse engineer, copy, or overload the system with automated tools.',
        'Do not misuse or exploit the Service for unlawful purposes.',
      ],
    },
    {
      title: 'User Data and Responsibility',
      items: [
        'You are responsible for the accuracy of measurements and information you enter.',
        'Verify estimates before purchasing materials or starting work.',
        'Paint Calculator does not verify user-entered data and is not responsible for errors caused by incorrect inputs.',
      ],
    },
    {
      title: 'Estimates and Disclaimer',
      items: [
        'All calculations are estimates only; actual paint usage, costs, and labor time may vary.',
        'Results are not professional, contractual, or binding advice.',
        'Paint Calculator is not responsible for over/under-purchasing, cost differences, or project outcomes.',
      ],
    },
    {
      title: 'Saving, Sharing, and PDFs',
      items: [
        'Saved projects are stored for user convenience.',
        'Shared project links allow access to project data through the link.',
        'PDFs are generated based on the data you provide.',
        'Permanent storage of saved projects is not guaranteed.',
      ],
    },
    {
      title: 'Intellectual Property',
      items: [
        'All content, design, and functionality are owned by us or licensors and protected by intellectual property laws.',
        'You may not copy, reproduce, use branding/content without permission, or create derivative works.',
      ],
    },
    {
      title: 'Third-Party Services',
      items: [
        'Third-party tools may be used for analytics, performance monitoring, and error tracking.',
        'We are not responsible for third-party content or practices.',
      ],
    },
    {
      title: 'Availability and Modifications',
      items: [
        'We may modify or discontinue the Service at any time.',
        'Features/calculations may be updated; access may be restricted for maintenance or security.',
        'We are not liable for interruptions or loss of access.',
      ],
    },
    {
      title: 'Limitation of Liability',
      items: [
        'To the maximum extent permitted by law, Paint Calculator is not liable for direct, indirect, incidental, or consequential damages, including paint purchases, labor costs, or project outcomes.',
        'Use of the Service is at your own risk.',
      ],
    },
    {
      title: 'Indemnification',
      items: [
        'You agree to indemnify and hold harmless Paint Calculator from claims, damages, or expenses arising from your use, violation of these Terms, or inaccurate data you enter.',
      ],
    },
    {
      title: 'Termination',
      items: [
        'We may suspend or terminate access if these Terms are violated, the Service is misused, or as required by law.',
      ],
    },
    {
      title: 'Governing Law',
      items: [
        'These Terms are governed by applicable laws without regard to conflict of law principles.',
      ],
    },
    {
      title: 'Changes to These Terms',
      items: [
        'We may update these Terms; changes will be posted here with a revised date.',
        'Continued use indicates acceptance of updated Terms.',
      ],
    },
    {
      title: 'Contact Information',
      items: [
        'Questions about these Terms: support@thepaintcalculator.com',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Terms of Service</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">Last updated: January 2026</h1>
          <p className="text-base text-gray-600 max-w-3xl">
            These Terms govern your use of the Paint Calculator website and paint estimation tool. By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.
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
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">Final Note</h2>
          <p className="text-indigo-900">
            Paint Calculator is intended to assist with planning and estimation only. Always verify measurements and consult professionals when necessary.
          </p>
        </section>
      </div>
    </main>
  );
}
