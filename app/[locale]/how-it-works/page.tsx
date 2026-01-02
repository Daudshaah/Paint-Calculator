import type { Metadata } from 'next';
import { defaultLocale, Locale, locales } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return {
    title: 'How It Works | Paint Calculator',
    description: 'Step-by-step guide to plan, calculate, and estimate your paint project with confidence.',
    alternates: {
      canonical: `/${locale}/how-it-works`,
    },
  };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const steps: Array<{ title: string; body: string | string[] }> = [
    { title: 'Step 1: Start a new project', body: ['A new project starts automatically.', 'Start fresh, or load a saved project from “Load saved…” to continue later.'] },
    { title: 'Step 2: Choose what you are painting', body: ['Interior: walls, ceilings, trim, doors', 'Exterior: exterior walls and features', 'Ceiling: ceiling-only work', 'Trim: baseboards, crown, door/window trim'] },
    { title: 'Step 3: Add rooms to your project', body: ['Use “+ Add room” for each space.', 'Each room can have its own measurements, doors, windows, and exclusions (fireplace, built-ins, accent walls).', 'Rename rooms for clarity (e.g., Living Room, Bedroom 1).'] },
    { title: 'Step 4: Select your measurement system', body: ['Feet / Inches or Meters / Centimeters.', 'Switching units converts all existing inputs automatically.'] },
    { title: 'Step 5: Enter room measurements', body: ['Option A: Length, width, height (best for rectangular rooms).', 'Option B: Direct wall area (best for irregular shapes).', 'Inputs are validated; you will be alerted if values are missing.'] },
    { title: 'Step 6: Add doors and windows', body: ['Add quantities and sizes (standard or custom).', 'Non-paintable areas are subtracted from total surface automatically.'] },
    { title: 'Step 7: Choose surfaces to paint', body: ['Select walls, ceiling, trim, and doors. Only selected surfaces are included in calculations.'] },
    { title: 'Step 8: Configure paint settings (project-wide)', body: ['Number of coats, paint type, and finish.', 'Surface condition (good surfaces add 10% automatically).', 'Paint coverage rate (default 400 sq ft per gallon, custom supported).', 'Include primer if needed.'] },
    { title: 'Step 9: Add cost estimation (optional)', body: ['Set paint and primer prices per gallon.', 'Enable labor (optional) and set labor rate.', 'Add supplies: brushes/rollers, tape, drop cloths, other.', 'All costs roll into the total estimate automatically.'] },
    { title: 'Step 10: Special situations (room-specific)', body: ['Accent wall (different calculation).', 'Wainscoting / chair rail.', 'Crown molding.', 'Fireplace or built-ins (excluded areas).'] },
    { title: 'Step 11: Review your project summary', body: ['Real-time totals: area, time, cost.', 'Paint required by surface and cost breakdown.', 'Shopping list (gallons and quarts) and room-by-room breakdown.'] },
    { title: 'Step 12: Save, download, or share', body: ['Save to revisit later.', 'PDF to print or share as an estimate.', 'Share to generate a shareable project link for contractors, family, or paint stores.'] },
  ];

  const proTips = [
    'Buy 10-15% extra paint for touch-ups.',
    'Prime dark colors before switching to lighter shades.',
    'Two thin coats beat one thick coat.',
    'Save paint labels for future reference.',
    'Best conditions: 50-85°F (10-30°C), low humidity.',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100 p-6 sm:p-10 space-y-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600">How It Works</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Plan, calculate, and estimate your paint project with confidence
          </h1>
          <p className="text-base text-gray-600 max-w-3xl">
            Paint Calculator helps homeowners, DIYers, and professionals accurately estimate paint quantity, time, and total cost for interior and exterior projects — across multiple rooms and surfaces.
          </p>
        </header>

        <section className="space-y-6">
          <div className="grid gap-4">
            {steps.map((step) => (
              <div key={step.title} className="p-4 rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/60 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h2>
                {Array.isArray(step.body) ? (
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {step.body.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{step.body}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="p-5 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm">
          <h2 className="text-lg font-semibold text-indigo-900 mb-2">Pro tips for best accuracy</h2>
          <ul className="list-disc pl-5 text-indigo-900 space-y-1">
            {proTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">About Paint Calculator</h2>
          <p className="text-gray-700">
            Paint Calculator is a professional paint estimation tool designed to reduce waste, save money, and simplify planning for painting projects of any size. Whether you are painting a single room or an entire property, this tool helps you calculate exact quantities, costs, and time with confidence.
          </p>
        </section>
      </div>
    </main>
  );
}
