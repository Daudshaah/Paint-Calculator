import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'Privacy Policy | Paint Calculator',
    description: 'How Paint Calculator collects, uses, stores, and protects your information.',
    alternates: {
      canonical: `/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const sections = [
    {
      title: 'Information We Collect',
      items: [
        'Information you provide: project data (room measurements, paint settings, estimates), saved project info (if you save), and any email/messages you send us. No account is required for the core calculator.',
        'Automatically collected: browser type/version, device type, OS, IP (anonymized where possible), and usage data (pages visited, tool interactions). Used only for performance, analytics, and security.',
      ],
    },
    {
      title: 'How We Use Your Information',
      items: [
        'Provide and operate the Paint Calculator; save/load projects; generate PDFs and shareable links.',
        'Improve accuracy, performance, and usability; respond to support inquiries; detect/prevent technical or security issues.',
        'We do not sell your personal information.',
      ],
    },
    {
      title: 'Project Data and Calculations',
      items: [
        'Project data is used solely to generate estimates.',
        'Saved projects are stored to allow future access/editing.',
        'Shared projects are accessible only via the generated link.',
        'You are responsible for the accuracy of the data you enter.',
      ],
    },
    {
      title: 'Cookies and Local Storage',
      items: [
        'We may use cookies and browser local storage to remember preferences (e.g., units), store saved projects, and improve functionality.',
        'You can disable cookies, but some features may not work properly.',
      ],
    },
    {
      title: 'Third-Party Services',
      items: [
        'We may use trusted third parties for analytics, performance monitoring, and error tracking.',
        'They may collect limited technical data per their policies; we do not control their processing beyond these purposes.',
      ],
    },
    {
      title: 'Data Security',
      items: [
        'We use reasonable technical/organizational measures (secure transmission, restricted access, monitoring).',
        'No method is 100% secure; we cannot guarantee absolute security.',
      ],
    },
    {
      title: 'Data Retention',
      items: [
        'Project data is retained only as long as needed to provide the service.',
        'Support emails are retained for customer service.',
        'You may request deletion by contacting us.',
      ],
    },
    {
      title: "Children's Privacy",
      items: [
        'Not intended for children under 13; we do not knowingly collect personal information from children.',
      ],
    },
    {
      title: 'Your Rights',
      items: [
        'Depending on your location, you may request access, correction, deletion, or object to certain processing. Contact us to exercise these rights.',
      ],
    },
    {
      title: 'Changes to This Privacy Policy',
      items: [
        'We may update this policy and will post changes here with a revised date. Continued use indicates acceptance.',
      ],
    },
    {
      title: 'Contact Us',
      items: [
        'Questions or concerns: support@thepaintcalculator.com',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Privacy Policy</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">Your privacy matters to us</h1>
          <p className="text-base text-gray-600 max-w-3xl">
            Paint Calculator (“we”, “our”, or “us”) values your privacy. This policy explains how we collect, use, store, and protect your information when you use our website and paint estimation tool.
            By using Paint Calculator, you agree to these practices.
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
            Paint Calculator provides estimates for planning purposes only. Actual paint usage, cost, and time may vary depending on materials, surface conditions, and application methods.
          </p>
        </section>
      </div>
    </main>
  );
}
