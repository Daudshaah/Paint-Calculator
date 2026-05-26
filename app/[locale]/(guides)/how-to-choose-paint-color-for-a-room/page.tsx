import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PaintCalculatorClient from '../../PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const canonical =
    locale === defaultLocale
      ? 'https://thepaintcalculator.com/how-to-choose-paint-color-for-a-room'
      : `https://thepaintcalculator.com/${locale}/how-to-choose-paint-color-for-a-room`;
  return {
    title: 'How to Choose Paint Color for a Room | ThePaintCalculator.com',
    description: 'Learn exactly how to choose the right paint colour for any room. Lighting, undertones, testing, and colour theory made simple.',
    alternates: { canonical },
    openGraph: {
      title: 'How to Choose Paint Color for a Room',
      description: 'Learn exactly how to choose the right paint colour for any room. Lighting, undertones, testing, and colour theory made simple.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function HowToChoosePaintColor({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How to Choose Paint Color","item":"https://thepaintcalculator.com/how-to-choose-paint-color-for-a-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I pick the right paint colour for a room?","acceptedAnswer":{"@type":"Answer","text":"Start with the lighting direction, narrow to 3 options, paint large test swatches on your actual walls, and observe under both daylight and artificial light before committing."}},{"@type":"Question","name":"Why does paint look different on my walls than on the chip?","acceptedAnswer":{"@type":"Answer","text":"A large painted wall reflects far more light than a small chip. Surrounding colours (floor, furniture, trim) also interact with the wall colour and change how it reads to the eye."}},{"@type":"Question","name":"What colours make a small room look bigger?","acceptedAnswer":{"@type":"Answer","text":"Light, cool tones — pale grey, soft white, pale blue, and light sage — reflect more light and make small rooms feel more open and spacious."}},{"@type":"Question","name":"What are the most popular interior paint colours?","acceptedAnswer":{"@type":"Answer","text":"SW Agreeable Gray, BM White Dove, BM Chantilly Lace, SW Accessible Beige, and BM Revere Pewter consistently rank as the most popular interior paint colours in the US."}},{"@type":"Question","name":"How many test colours should I sample?","acceptedAnswer":{"@type":"Answer","text":"Test 3–5 colours maximum. More than that creates confusion. Paint large 12×12 inch swatches on your actual walls — not just a piece of paper held up to the wall."}},{"@type":"Question","name":"Should all rooms in a house be the same colour?","acceptedAnswer":{"@type":"Answer","text":"Not necessarily, but using a consistent palette of 3–4 complementary colours throughout creates a cohesive flow. Many designers use one neutral for most rooms with accent colours in individual spaces."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"How to Choose Paint Color for a Room — Complete Guide","description":"Step-by-step guide to choosing the right paint colour including lighting, undertones, testing methods, and colour theory.","url":"https://thepaintcalculator.com/how-to-choose-paint-color-for-a-room","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-700 font-medium">How to Choose Paint Color</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How to Choose Paint Color for a Room
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Choosing the right paint colour requires <strong>testing large swatches under your room's actual lighting</strong>. The colour on a small chip and the colour on a painted wall look completely different. Undertones, room size, and light direction all affect the final result.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Test large swatches under the room's actual lighting before committing</p>
          <p className="text-sm opacity-90">Lighting, undertones, and room size all affect how colours look on your walls</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Step 1 — Understand Your Room's Lighting</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Lighting is the most important factor in paint colour selection. The same paint colour looks dramatically different under north-facing natural light (cool, blue-grey), south-facing natural light (warm, yellow), incandescent bulbs (warm orange), LED daylight bulbs (cool white), and LED warm bulbs (golden).</p>
          <p className="text-gray-700 leading-relaxed mb-4">Before choosing a colour, assess your room's light direction. North-facing rooms receive indirect, cooler light — warm tones prevent a cold, shadowy feel. South-facing rooms receive strong, warm light — cool tones prevent colours from looking washed out. East-facing rooms get morning sun. West-facing rooms get evening sun.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Step 2 — Understand Undertones</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Every paint colour has an undertone — a subtle underlying hue that becomes visible when the colour is on your walls surrounded by your furniture, flooring, and trim. A "greige" that looks perfectly neutral on the chip may read as distinctly pink or green on your walls depending on the undertone.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Test your shortlisted colours by painting large (12×12 inch minimum) swatches directly on your walls. Live with them for 24–48 hours observing them at different times of day under both natural light and artificial lighting. Never choose a colour from a small chip alone.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Step 3 — Consider Room Size and Ceiling Height</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Small rooms.</strong> Light, cool colours (pale grey, soft white, pale blue) reflect light and make small rooms feel larger. Dark colours make small rooms feel enclosed — though this can be used intentionally for a cosy effect.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Large rooms.</strong> Warm, saturated tones make large rooms feel more intimate and welcoming. Pale neutrals in large rooms can feel cold and empty.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Low ceilings.</strong> Painting the ceiling white or a lighter tone than the walls draws the eye upward and makes low ceilings feel higher. Painting the ceiling the same colour as the walls makes the room feel more intimate.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top Trusted Paint Colours by Room</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">Room</th>
                <th className="px-4 py-3 text-left font-semibold">Colour Direction</th>
                <th className="px-4 py-3 text-left font-semibold">Top Picks</th>
              </tr></thead>
              <tbody>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Living room</td><td className="px-4 py-3 text-gray-700">Warm neutrals</td><td className="px-4 py-3 text-gray-700">SW Agreeable Gray, BM Revere Pewter</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Bedroom</td><td className="px-4 py-3 text-gray-700">Soft, muted tones</td><td className="px-4 py-3 text-gray-700">BM White Dove, SW Sea Salt</td></tr>
                <tr className="bg-white border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Kitchen</td><td className="px-4 py-3 text-gray-700">Light, bright, clean</td><td className="px-4 py-3 text-gray-700">BM Chantilly Lace, SW Pure White</td></tr>
                <tr className="bg-gray-50 border-b border-gray-100"><td className="px-4 py-3 font-medium text-gray-800">Dining room</td><td className="px-4 py-3 text-gray-700">Deep, moody tones</td><td className="px-4 py-3 text-gray-700">F&B Hague Blue, SW Burgundy</td></tr>
                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-800">Bathroom</td><td className="px-4 py-3 text-gray-700">Cool, clean tones</td><td className="px-4 py-3 text-gray-700">BM Pale Oak, SW Worn Turquoise</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/living-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Living Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/paint-finish-guide`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Finish Guide →</Link></li>
            <li><Link href={`/${locale}/how-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How to Paint a Room — Step by Step →</Link></li>
            <li><Link href={`/${locale}/dining-room-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Dining Room Paint Calculator →</Link></li>
            <li><Link href={`/${locale}/bathroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bathroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I pick the right paint colour for a room?</h3>
              <p className="text-gray-700">Start with the lighting direction, narrow to 3 options, paint large test swatches on your actual walls, and observe under both daylight and artificial light before committing.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why does paint look different on my walls than on the chip?</h3>
              <p className="text-gray-700">A large painted wall reflects far more light than a small chip. Surrounding colours (floor, furniture, trim) also interact with the wall colour and change how it reads to the eye.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What colours make a small room look bigger?</h3>
              <p className="text-gray-700">Light, cool tones — pale grey, soft white, pale blue, and light sage — reflect more light and make small rooms feel more open and spacious.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the most popular interior paint colours?</h3>
              <p className="text-gray-700">SW Agreeable Gray, BM White Dove, BM Chantilly Lace, SW Accessible Beige, and BM Revere Pewter consistently rank as the most popular interior paint colours in the US.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How many test colours should I sample?</h3>
              <p className="text-gray-700">Test 3–5 colours maximum. More than that creates confusion. Paint large 12×12 inch swatches on your actual walls — not just a piece of paper held up to the wall.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should all rooms in a house be the same colour?</h3>
              <p className="text-gray-700">Not necessarily, but using a consistent palette of 3–4 complementary colours throughout creates a cohesive flow. Many designers use one neutral for most rooms with accent colours in individual spaces.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
