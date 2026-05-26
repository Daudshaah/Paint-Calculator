import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'Frequently Asked Questions | Paint Calculator',
    description: 'Quick answers about Paint Calculator accuracy, measurements, estimates, saving, sharing, and troubleshooting.',
    alternates: {
      canonical: `/${locale}/faq`,
    },
  };
}

type QA = { question: string; answers: string[] };

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const sections: Array<{ title: string; items: QA[] }> = [
    {
      title: 'General Questions',
      items: [
        {
          question: 'What is Paint Calculator?',
          answers: [
            'A professional paint estimation tool to calculate paint quantity (gallons and quarts), total paintable area, estimated time, and paint/supplies/total project cost across multiple rooms and surfaces.',
          ],
        },
        {
          question: 'Who can use Paint Calculator?',
          answers: [
            'Homeowners, DIY painters, contractors, and property managers. No technical knowledge required.',
          ],
        },
        {
          question: 'Is Paint Calculator free to use?',
          answers: [
            'Yes, the core calculator is free to use. Some advanced features may be added in the future.',
          ],
        },
      ],
    },
    {
      title: 'Accuracy & Calculations',
      items: [
        {
          question: 'How accurate are the estimates?',
          answers: [
            'Estimates are based on your measurements, number of coats, surface condition, and coverage rate.',
            'Actual usage may vary by wall texture, paint brand, and application method. Always keep a small buffer.',
          ],
        },
        {
          question: 'Why should I buy extra paint?',
          answers: [
            'Buying 10–15% extra covers touch-ups, color consistency, and minor measurement differences to prevent running out mid-project.',
          ],
        },
        {
          question: 'Why is my estimate different from the paint store’s estimate?',
          answers: [
            'Coverage rates vary by brand and finish; surface texture affects absorption; stores often use general averages.',
            'Paint Calculator lets you enter detailed inputs for better accuracy.',
          ],
        },
      ],
    },
    {
      title: 'Measurements & Units',
      items: [
        {
          question: 'Which measurement units are supported?',
          answers: [
            'Feet / Inches and Meters / Centimeters. Switching units converts all values automatically.',
          ],
        },
        {
          question: 'What should I do if my room is irregularly shaped?',
          answers: [
            'Use the “Enter wall area directly” option for angled walls, curves, or sloped ceilings to avoid incorrect length and width calculations.',
          ],
        },
        {
          question: 'Why am I seeing measurement error messages?',
          answers: [
            'Length, width, or height is zero or negative, or required fields are missing. Correct highlighted fields to continue.',
          ],
        },
      ],
    },
    {
      title: 'Doors, Windows, and Surfaces',
      items: [
        {
          question: 'Why should I add doors and windows?',
          answers: [
            'Doors and windows are not painted; adding them subtracts their area, improves accuracy, and prevents overestimating paint.',
          ],
        },
        {
          question: 'Should I subtract outlets and switches?',
          answers: [
            'No. Small openings like outlets and switches should not be subtracted.',
          ],
        },
        {
          question: 'Can I choose which surfaces to paint?',
          answers: [
            'Yes—select walls, ceiling, trim, and doors. Only selected surfaces are included in calculations.',
          ],
        },
      ],
    },
    {
      title: 'Paint & Primer',
      items: [
        {
          question: 'What is the paint coverage rate?',
          answers: [
            'It is the area one gallon covers. Default is 400 sq ft per gallon; enter a custom value if your paint specifies otherwise.',
          ],
        },
        {
          question: 'When should I include primer?',
          answers: [
            'Include primer for new drywall, covering dark colors, or porous/repaired surfaces. Primer is calculated separately if enabled.',
          ],
        },
        {
          question: 'Does trim paint use the same coverage?',
          answers: [
            'Trim paint often differs because it is thicker and semi-gloss or gloss; coverage may vary slightly.',
          ],
        },
      ],
    },
    {
      title: 'Cost Estimation',
      items: [
        {
          question: 'Is cost estimation required?',
          answers: [
            'No. You can calculate paint quantity only, or include paint, supplies, and labor costs.',
          ],
        },
        {
          question: 'What costs can I include?',
          answers: [
            'Paint and primer price per gallon, labor cost, and supplies (brushes, rollers, tape, drop cloths).',
          ],
        },
        {
          question: 'Why does my total cost look high?',
          answers: [
            'High totals usually come from multiple coats, large areas, premium paint prices, or added labor/supplies. Check the room-by-room breakdown.',
          ],
        },
      ],
    },
    {
      title: 'Saving, PDF, and Sharing',
      items: [
        {
          question: 'How do I save my project?',
          answers: [
            'Click Save to store your project. Saved projects can be loaded anytime.',
          ],
        },
        {
          question: 'What is included in the PDF?',
          answers: [
            'Paint quantities, cost breakdown, shopping list, and project summary—ready to print or share.',
          ],
        },
        {
          question: 'Can I share my project with others?',
          answers: [
            'Yes. Use Share to generate a link so others can view your estimate.',
          ],
        },
      ],
    },
    {
      title: 'Troubleshooting',
      items: [
        {
          question: 'My totals look incorrect. What should I check?',
          answers: [
            'Verify room dimensions, measurement units, number of coats, doors/windows, and selected surfaces. Missing height or openings are common causes.',
          ],
        },
        {
          question: 'My project did not save. What should I do?',
          answers: [
            'Ensure you clicked Save, avoid clearing browser storage, reload the page, and contact support if it continues.',
          ],
        },
      ],
    },
    {
      title: 'Limitations & Disclaimer',
      items: [
        {
          question: 'Is this a contractor quote?',
          answers: [
            'No. Paint Calculator provides planning estimates only; it is not a binding contractor quote.',
          ],
        },
        {
          question: 'Can I use this for professional projects?',
          answers: [
            'Yes. Many professionals use it for early-stage estimates and planning.',
          ],
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          question: 'How can I contact support?',
          answers: [
            'Email support@thepaintcalculator.com. Support is available 24/7.',
          ],
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Frequently Asked Questions</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Find quick answers to common questions about Paint Calculator
          </h1>
          <p className="text-base text-gray-600 max-w-3xl">
            Answers about accuracy, measurements, estimates, saving, sharing, and troubleshooting to help you plan with confidence.
          </p>
        </header>

        <section className="grid gap-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="p-4 rounded-xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-lg border border-blue-100 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <summary className="cursor-pointer list-none px-4 py-3 flex items-start justify-between gap-3 bg-blue-50/80 rounded-lg">
                      <span className="font-medium text-gray-900 group-hover:text-blue-700">{item.question}</span>
                      <span className="text-blue-500 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div className="px-5 pb-4 pt-2">
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {item.answers.map((ans) => (
                          <li key={ans}>{ans}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">Final Note</h2>
          <p className="text-indigo-900">
            Paint Calculator helps you plan confidently, reduce waste, and avoid surprises. Always allow a small buffer for real-world conditions.
          </p>
        </section>
      </div>
    </main>
  );
}
