import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'Tips & Tricks | Paint Calculator',
    description: 'Improve accuracy, reduce waste, and plan your paint project better with practical tips for measurements, coverage, cost, and prep.',
    alternates: {
      canonical: `/${locale}/tips-and-tricks`,
    },
  };
}

type TipSection = {
  title: string;
  items: string[];
};

export default async function TipsAndTricksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const sections: TipSection[] = [
    {
      title: 'Before You Measure',
      items: [
        'Measure wall height from floor to ceiling and each wall length individually—avoid rounding.',
        'Add rooms separately; dimensions often vary even in similar rooms.',
        'Choose one measurement system (ft/in or m/cm) and let the tool convert automatically.',
      ],
    },
    {
      title: 'Measurement Best Practices',
      items: [
        'Add only non-paintable openings: doors you will not paint and windows.',
        'Do not subtract small items like switches, outlets, or small vents.',
        'Use “Enter wall area directly” for irregular rooms, angled walls, or sloped ceilings.',
      ],
    },
    {
      title: 'Paint Quantity Tips',
      items: [
        'Buy 10–15% extra paint for touch-ups and future repairs.',
        'Apply two thin coats—better coverage and durability than one thick coat.',
        'Use primer when covering dark colors to improve coverage and reduce paint usage.',
      ],
    },
    {
      title: 'Surface and Condition Tips',
      items: [
        'Set the correct surface condition; rough or damaged surfaces need more paint.',
        'Trim and doors often use semi-gloss or gloss; coverage can differ from wall paint.',
      ],
    },
    {
      title: 'Cost Estimation Tips',
      items: [
        'Enter realistic paint prices (they vary by brand and finish).',
        'Include supplies (brushes/rollers, tape, drop cloths, small tools) to avoid surprises.',
        'Use local labor rates if you include labor; consider ceiling height and room complexity.',
      ],
    },
    {
      title: 'Project Planning Tips',
      items: [
        'Save your project before downloading a PDF so you can edit and reuse it later.',
        'Name rooms clearly (e.g., Living Room, Bedroom 1, Kitchen) for easy review.',
        'Check the room-by-room breakdown before buying paint to catch mistakes early.',
      ],
    },
    {
      title: 'Painting Day Tips',
      items: [
        'Paint in good conditions: 50–85°F (10–30°C), low humidity, good ventilation.',
        'Follow this order to minimize rework: ceiling → walls → trim.',
        'Keep paint labels and note brand, color code, and finish for future touch-ups.',
      ],
    },
    {
      title: 'Common Mistakes to Avoid',
      items: [
        'Forgetting room height.',
        'Not adding doors or windows.',
        'Mixing measurement units.',
        'Ignoring surface condition.',
        'Buying exact paint with no buffer.',
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Tips &amp; Tricks</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Improve accuracy, reduce waste, and plan your paint project better
          </h1>
          <p className="text-base text-gray-600 max-w-3xl">
            This guide shares practical tips to help you get the most accurate results from the Paint Calculator and avoid common painting mistakes.
          </p>
        </header>

        <section className="grid gap-4">
          {sections.map((section) => (
            <div key={section.title} className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/50 shadow-sm">
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
            Paint Calculator provides professional planning estimates. Actual paint usage may vary due to surface texture, paint brand, and application method. Always allow a small buffer.
          </p>
        </section>
      </div>
    </main>
  );
}
