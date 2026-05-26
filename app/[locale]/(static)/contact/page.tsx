import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'Contact Us | Paint Calculator',
    description: 'Get in touch for help, bug reports, feature requests, or feedback about Paint Calculator.',
    alternates: {
      canonical: `/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Contact Us</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">We’re here to help</h1>
          <p className="text-base text-gray-600 max-w-3xl">
            If you have questions, feedback, or need assistance using Paint Calculator, reach out. Our support team is available to help you.
          </p>
        </header>

        <section className="grid gap-4">
          <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/60 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Get in Touch</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Help using the Paint Calculator</li>
              <li>Reporting bugs or calculation issues</li>
              <li>Feature suggestions or improvements</li>
              <li>General questions or feedback</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Support Email</h2>
            <p className="text-gray-700 mb-2">For all inquiries, email us at:</p>
            <a href="mailto:support@thepaintcalculator.com" className="font-semibold text-blue-700 hover:text-blue-800">
              support@thepaintcalculator.com
            </a>
            <p className="text-gray-700 mt-2">We aim to respond as quickly as possible.</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Support Availability</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Support availability: 24/7</li>
              <li>Typical response time: within 24 hours</li>
              <li>Response times may vary during peak periods, but every request is reviewed.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/60 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Reporting an Issue</h2>
            <p className="text-gray-700 mb-2">Include the following to help us resolve issues faster:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>A brief description of the issue</li>
              <li>What you were trying to calculate</li>
              <li>Any error messages shown</li>
              <li>Your device and browser (if possible)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Feature Requests</h2>
            <p className="text-gray-700 mb-2">We welcome feature suggestions. Send us:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>The feature idea</li>
              <li>How it would help your project</li>
              <li>Any examples or references (optional)</li>
            </ul>
            <p className="text-gray-700 mt-2">User feedback helps shape future updates.</p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/60 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Important Note</h2>
            <p className="text-gray-700">
              Paint Calculator provides estimates for planning purposes only. Actual paint usage, costs, and time may vary depending on surface conditions, materials, and application methods.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">About Paint Calculator</h2>
            <p className="text-gray-700">
              Paint Calculator is a professional paint estimation tool designed to help homeowners and professionals calculate paint quantity, cost, and time accurately for projects of any size.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
