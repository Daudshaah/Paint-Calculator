import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'Help Center | Paint Calculator',
    description: 'Answers, guidance, and troubleshooting to get accurate paint estimates with Paint Calculator.',
    alternates: {
      canonical: `/${locale}/help`,
    },
  };
}

type QnA = { question: string; answer: string | string[] };

const sections: Array<{ title: string; items: QnA }> = [];

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const gettingStarted: QnA[] = [
    {
      question: 'What is Paint Calculator?',
      answer: [
        'A professional estimation tool to calculate paint quantity (gallons & quarts), total paintable area, project time, and paint/supplies/total cost across multiple rooms and surfaces.',
      ],
    },
    {
      question: 'Who is this tool for?',
      answer: [
        'Homeowners (DIY), contractors, property managers/renovators, and anyone who wants accurate paint planning.',
      ],
    },
  ];

  const usingCalculator: QnA[] = [
    {
      question: 'How do I start a new project?',
      answer: [
        'A new project starts automatically when you open the tool.',
        'Load a saved project from the top bar or delete old projects you no longer need.',
      ],
    },
    {
      question: 'How do I add rooms?',
      answer: [
        'Click “+ Add room”, select the room, and enter measurements and settings.',
        'You can add unlimited rooms and rename them (e.g., Living Room, Bedroom 1).',
      ],
    },
  ];

  const measurements: QnA[] = [
    {
      question: 'Which measurement systems are supported?',
      answer: [
        'Feet / Inches and Meters / Centimeters.',
        'Switching units converts existing values automatically.',
      ],
    },
    {
      question: 'Why am I seeing measurement errors?',
      answer: [
        'Length, width, or height is zero/negative, or required fields are missing.',
        'Fix highlighted fields to continue.',
      ],
    },
    {
      question: 'When should I use “Enter wall area directly”?',
      answer: [
        'Irregular/non-rectangular rooms, sloped ceilings, or complex layouts.',
        'Enter total wall area; the calculator handles the rest.',
      ],
    },
  ];

  const openings: QnA[] = [
    {
      question: 'Why should I add doors and windows?',
      answer: [
        'They are not paintable; adding them subtracts their area to improve accuracy and prevent over-buying.',
      ],
    },
    {
      question: 'Can I change door or window sizes?',
      answer: [
        'Yes. Select standard sizes or adjust quantities as needed.',
      ],
    },
  ];

  const surfacesPaint: QnA[] = [
    {
      question: 'What surfaces can I include?',
      answer: [
        'Walls, ceiling, trim, and doors. Only selected surfaces are included in calculations.',
      ],
    },
    {
      question: 'What does “Surface Condition” mean?',
      answer: [
        'Adjusts paint quantity (e.g., “Good” adds ~10%). Poor/rough surfaces need more paint.',
      ],
    },
    {
      question: 'What is the paint coverage rate?',
      answer: [
        'Area one gallon covers. Default is 400 sq ft/gal; you can enter a custom rate from your paint brand.',
      ],
    },
    {
      question: 'Should I include primer?',
      answer: [
        'Include primer for new drywall, covering dark colors, or porous/repaired surfaces. Primer is calculated separately if enabled.',
      ],
    },
  ];

  const costEstimation: QnA[] = [
    {
      question: 'Is cost estimation optional?',
      answer: [
        'Yes. Use paint quantity only, or enable cost estimation for a full project budget.',
      ],
    },
    {
      question: 'What costs can I include?',
      answer: [
        'Paint price per gallon, primer price per gallon, optional labor cost, and supplies (brushes/rollers, painter’s tape, drop cloths, other).',
        'All costs update automatically in the summary.',
      ],
    },
  ];

  const specialSituations: QnA[] = [
    {
      question: 'What are special situations?',
      answer: [
        'Adjustments for real-world conditions: accent walls, wainscoting/chair rail, crown molding, fireplaces, and built-ins to avoid over/under-estimating.',
      ],
    },
  ];

  const summaryAndAccuracy: QnA[] = [
    {
      question: 'What does the Project Summary show?',
      answer: [
        'Total paintable area, estimated time, paint required by surface, cost breakdown, shopping list, and room-by-room details updated in real time.',
      ],
    },
    {
      question: 'Why does the calculator suggest extra paint?',
      answer: [
        'We recommend 10–15% extra for touch-ups, texture variation, and application differences to prevent mid-project shortages.',
      ],
    },
    {
      question: 'How accurate is the calculator?',
      answer: [
        'Provides professional planning estimates; actual usage can vary by texture, brand/finish, application method, and environment. Allow a buffer.',
      ],
    },
    {
      question: 'Is this a replacement for a contractor quote?',
      answer: [
        'No. It is for planning/estimation, not a binding quote.',
      ],
    },
  ];

  const savingSharing: QnA[] = [
    {
      question: 'How do I save a project?',
      answer: [
        'Click Save to store your project; load saved projects anytime.',
      ],
    },
    {
      question: 'What does the PDF include?',
      answer: [
        'Paint quantities, cost breakdown, shopping list, and project summary—ideal for sharing with contractors or paint stores.',
      ],
    },
    {
      question: 'How does sharing work?',
      answer: [
        'Click Share to generate a link so others can view the estimate.',
      ],
    },
  ];

  const troubleshooting: QnA[] = [
    {
      question: 'My totals look wrong — what should I check?',
      answer: [
        'Room dimensions, unit system (ft vs m), number of coats, doors/windows added correctly, and surface selections. Missing room height or openings are common causes.',
      ],
    },
    {
      question: 'Data did not save — what should I do?',
      answer: [
        'Ensure you clicked Save, avoid clearing browser storage, and contact support if it continues.',
      ],
    },
  ];

  const sections: Array<{ title: string; items: QnA[] }> = [
    { title: 'Getting Started', items: gettingStarted },
    { title: 'Using the Calculator', items: usingCalculator },
    { title: 'Measurements & Units', items: measurements },
    { title: 'Doors & Windows', items: openings },
    { title: 'Paint & Surface Settings', items: surfacesPaint },
    { title: 'Cost Estimation', items: costEstimation },
    { title: 'Special Situations', items: specialSituations },
    { title: 'Project Summary & Results', items: summaryAndAccuracy },
    { title: 'Saving, PDF & Sharing', items: savingSharing },
    { title: 'Troubleshooting', items: troubleshooting },
  ];

  const quickTips = [
    'Measure carefully.',
    'Add openings (doors/windows).',
    'Choose correct coats.',
    'Buy a little extra paint.',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Help Center</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Everything you need to use the Paint Calculator with confidence
          </h1>
          <p className="text-base text-gray-600 max-w-3xl">
            Welcome to the Paint Calculator Help Center. Here you will find clear answers, step-by-step guidance, and troubleshooting tips to get accurate paint estimates for your project.
          </p>
        </header>

        <section className="grid gap-4">
          {sections.map((section) => (
            <div key={section.title} className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-indigo-50/40 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.question} className="rounded-lg">
                    <p className="font-medium text-gray-900">{item.question}</p>
                    {Array.isArray(item.answer) ? (
                      <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-1">
                        {item.answer.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 mt-1">{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">Need More Help?</h2>
          <p className="text-indigo-900">
            If you still need assistance, email us at <a className="font-semibold underline" href="mailto:support@thepaintcalculator.com">support@thepaintcalculator.com</a>. We are available 24/7 and happy to help.
          </p>
        </section>

        <section className="p-5 rounded-xl bg-blue-50 border border-blue-100 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Quick Tip Before You Go</h2>
          <ul className="list-disc pl-5 text-blue-900 space-y-1">
            {quickTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
