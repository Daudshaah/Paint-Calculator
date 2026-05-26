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
        'Measure carefully: measure wall height from floor to ceiling and each wall length individually; avoid estimating or rounding numbers. Small errors affect paint quantity.',
        'Measure rooms separately: add each room individually, even if they look similar. Small differences improve overall accuracy.',
        'Use the correct measurement system: choose Feet/Inches or Meters/Centimeters. Do not mix units manually; switching units converts all values automatically.',
      ],
    },
    {
      title: 'Measurement Best Practices',
      items: [
        'Add only non-paintable openings: include doors you will not paint and windows; do not subtract switches, outlets, or small vents.',
        'Use "Enter wall area directly" for irregular rooms: angled or curved walls, sloped ceilings, and complex layouts to avoid bad length × width math.',
      ],
    },
    {
      title: 'Paint Quantity Tips',
      items: [
        'Always allow extra paint: buy 10-15% more than calculated for touch-ups and future repairs; avoid mid-project delays.',
        'Apply two thin coats: better coverage and durability; one thick coat causes streaks and uneven color.',
        'Dark to light color changes need primer: primer improves coverage and reduces paint usage.',
      ],
    },
    {
      title: 'Surface and Condition Tips',
      items: [
        'Choose the correct surface condition: rough or damaged surfaces absorb more paint; set the right condition for accurate estimates.',
        'Trim and doors need different finishes: often semi-gloss or gloss, which may cover differently than wall paint.',
      ],
    },
    {
      title: 'Cost Estimation Tips',
      items: [
        'Use realistic paint prices: prices vary by brand and finish; enter current local store prices for better budgets.',
        'Include supplies: brushes and rollers, painter\'s tape, drop cloths, and small tools to prevent surprise costs.',
        'Labor costs vary: use local labor rates if adding labor, and consider ceiling height and room complexity.',
      ],
    },
    {
      title: 'Project Planning Tips',
      items: [
        'Save your project before downloading a PDF so you can edit and reuse the estimate.',
        'Name rooms clearly (e.g., Living Room, Bedroom 1, Kitchen) for easier review.',
        'Review the room-by-room breakdown before buying paint: check measurements, surfaces, coats, and exclusions to catch mistakes early.',
      ],
    },
    {
      title: 'Painting Day Tips',
      items: [
        'Paint under proper conditions: 50-85°F (10-30°C), low humidity, good ventilation.',
        'Follow the correct order: ceiling → walls → trim to reduce rework and mess.',
        'Keep paint information: save labels and note brand, color code, and finish for future touch-ups.',
      ],
    },
    {
      title: 'Common Mistakes to Avoid',
      items: [
        'Forgetting room height.',
        'Not adding doors or windows.',
        'Mixing measurement units.',
        'Ignoring surface condition.',
        'Buying exact paint quantity with no buffer.',
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
