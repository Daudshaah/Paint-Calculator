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
      ? 'https://thepaintcalculator.com/how-to-paint-a-room'
      : `https://thepaintcalculator.com/${locale}/how-to-paint-a-room`;
  return {
    title: 'How to Paint a Room — Step by Step Guide | ThePaintCalculator.com',
    description: 'Complete step-by-step guide to painting a room like a professional. Prep, priming, cutting in, rolling, and finishing. Free paint calculator included.',
    alternates: { canonical },
    openGraph: {
      title: 'How to Paint a Room — Step by Step',
      description: 'Complete step-by-step guide to painting a room like a professional. Prep, priming, cutting in, rolling, and finishing. Free paint calculator included.',
      url: canonical,
      siteName: 'ThePaintCalculator.com',
      type: 'article',
    },
  };
}

export default async function HowToPaintRoom({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://thepaintcalculator.com"},{"@type":"ListItem","position":2,"name":"How to Paint a Room","item":"https://thepaintcalculator.com/how-to-paint-a-room"}]};
  const faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What order should you paint a room?","acceptedAnswer":{"@type":"Answer","text":"Ceiling first, then walls, then trim and baseboards last. Always work top to bottom so drips from higher surfaces are covered by lower-surface paint."}},{"@type":"Question","name":"Do you cut in before or after rolling?","acceptedAnswer":{"@type":"Answer","text":"Always cut in before rolling. Cut in the entire room, then roll the walls. This keeps a consistent wet edge and prevents visible overlaps between brush and roller work."}},{"@type":"Question","name":"Should I remove tape before or after paint dries?","acceptedAnswer":{"@type":"Answer","text":"Remove tape while the paint is still slightly tacky — typically 1–2 hours after the final coat. Pulling tape from fully dry paint can lift the paint film and chip the edges."}},{"@type":"Question","name":"Do I need to sand between coats of paint?","acceptedAnswer":{"@type":"Answer","text":"For walls — no, sanding between coats is not necessary for a good result. For trim and cabinets, a light sand with 220-grit between coats gives a smoother, higher-quality finish."}},{"@type":"Question","name":"How do I avoid roller marks when painting?","acceptedAnswer":{"@type":"Answer","text":"Use a quality roller with the correct nap for your surface. Maintain a wet edge at all times. Apply with a W or M pattern and back-roll to even out the coat."}},{"@type":"Question","name":"Should I paint the ceiling or walls first?","acceptedAnswer":{"@type":"Answer","text":"Always paint the ceiling first. Any drips or spatters from the ceiling roller land on the walls, which are covered when you roll the walls afterward."}}]};
  const articleSchema = {"@context":"https://schema.org","@type":"Article","headline":"How to Paint a Room — Complete Step by Step Guide","description":"Professional step-by-step guide to painting any room including prep, priming, cutting in, rolling technique, and finishing.","url":"https://thepaintcalculator.com/how-to-paint-a-room","publisher":{"@type":"Organization","name":"ThePaintCalculator.com","url":"https://thepaintcalculator.com"}};

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
            <li className="text-gray-700 font-medium">How to Paint a Room</li>
          </ol>
        </nav>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How to Paint a Room — Step by Step
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: `Painting a room professionally comes down to <strong>thorough preparation and the right technique</strong>. Most DIY painting problems — drips, lap marks, patchy coverage — are caused by rushing the prep or skipping primer. Follow these steps and your finish will look professional.` }}
          />
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-80">Quick Answer</p>
          <p className="text-2xl font-bold mb-1">Prep → Prime → Cut in → Roll → Second coat → Trim</p>
          <p className="text-sm opacity-90">6 steps to a professional room paint finish</p>
        </div>

        <Suspense fallback={
          <div className="min-h-96 bg-white rounded-2xl flex items-center justify-center">
            <p className="text-gray-500">Loading calculator...</p>
          </div>
        }>
          <PaintCalculatorClient locale={locale} />
        </Suspense>

        <article className="max-w-3xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Step 1 — Prepare the Room</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clear the room.</strong> Move all furniture out or to the centre and cover with drop cloths. Remove light switch covers, outlet covers, and all hardware from doors.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Clean the walls.</strong> Wash walls with a mild detergent solution to remove dust, grease, and grime. Let dry completely. Paint does not adhere well to dirty surfaces.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Fill all holes and cracks.</strong> Use lightweight spackle for small nail holes and drywall compound for larger repairs. Let dry, sand smooth with 120-grit sandpaper, and wipe clean.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Tape edges.</strong> Apply painter's tape to ceiling edges, baseboards, trim, and window frames. Press the tape edge down firmly with a putty knife to prevent paint bleeding underneath.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Step 2 — Prime (When Needed)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Apply primer to new drywall, bare wood, stained areas, or when making a dramatic colour change. Use a roller for large areas and a brush for edges. Allow primer to dry fully before painting — typically 3–4 hours for latex primer.</p>
          <p className="text-gray-700 leading-relaxed mb-4">For simple repaints over a similar colour, you can skip primer and use a quality paint-and-primer-in-one for the topcoats.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Step 3 — Cut In</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Cutting in means painting a 2–3 inch band of paint along all edges using an angled brush — along the ceiling line, down all corners, and along the top of baseboards and trim. Cut in the entire room before picking up the roller.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Use a quality 2–2.5 inch angled sash brush and load it to about one-third of the bristle length. Work in smooth strokes parallel to the edge you are cutting. Do not rush this step — clean cut lines define the quality of the finished job.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Step 4 — Roll the Walls</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Use a 9-inch roller with a 3/8 inch nap for smooth walls, or 1/2 inch nap for light texture. Load the roller in the tray and roll off the excess until the roller is evenly coated — not dripping. Apply in a W or M pattern, filling in without lifting the roller to maintain a wet edge and avoid lap marks.</p>
          <p className="text-gray-700 leading-relaxed mb-4">Work from the top of the wall down in overlapping sections. Complete each wall fully before moving to the next. Maintain a wet edge at all times — if the paint dries before you overlap it, you will see a lap mark.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Steps 5 & 6 — Second Coat and Trim</h2>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Step 5 — Second coat.</strong> Wait 2–4 hours after the first coat before applying the second. The second coat goes faster as the edges are already cut in. Use the same technique as the first coat.</p>
          <p className="text-gray-700 leading-relaxed mb-2"><strong>Step 6 — Paint the trim.</strong> After the wall paint is dry, remove the wall tape and re-tape along the newly painted walls before painting trim, doors, and baseboards in semi-gloss. Remove tape while paint is still slightly tacky — pulling tape from fully dry paint can chip the wall colour.</p>
          <p className="text-gray-700 leading-relaxed mb-4"><strong>Clean up.</strong> Wash latex paint from brushes and rollers with warm soapy water. Store leftover paint sealed tightly and labelled with the room and colour name.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Paint Calculators</h2>
          <ul className="space-y-2 mb-8">
            <li><Link href={`/${locale}/how-long-to-paint-a-room`} className="text-blue-600 hover:text-blue-700 font-medium">How Long Does It Take to Paint a Room? →</Link></li>
            <li><Link href={`/${locale}/how-many-coats-of-paint`} className="text-blue-600 hover:text-blue-700 font-medium">How Many Coats of Paint Do You Need? →</Link></li>
            <li><Link href={`/${locale}/do-i-need-primer-before-painting`} className="text-blue-600 hover:text-blue-700 font-medium">Do I Need Primer Before Painting? →</Link></li>
            <li><Link href={`/${locale}/spray-paint-vs-roller-vs-brush`} className="text-blue-600 hover:text-blue-700 font-medium">Spray Paint vs Roller vs Brush →</Link></li>
            <li><Link href={`/${locale}/paint-finish-guide`} className="text-blue-600 hover:text-blue-700 font-medium">Paint Finish Guide →</Link></li>
            <li><Link href={`/${locale}/bedroom-paint-calculator`} className="text-blue-600 hover:text-blue-700 font-medium">Bedroom Paint Calculator →</Link></li>
            <li><Link href={`/${locale}`} className="text-blue-600 hover:text-blue-700 font-medium">Free Paint Calculator →</Link></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What order should you paint a room?</h3>
              <p className="text-gray-700">Ceiling first, then walls, then trim and baseboards last. Always work top to bottom so drips from higher surfaces are covered by lower-surface paint.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you cut in before or after rolling?</h3>
              <p className="text-gray-700">Always cut in before rolling. Cut in the entire room, then roll the walls. This keeps a consistent wet edge and prevents visible overlaps between brush and roller work.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I remove tape before or after paint dries?</h3>
              <p className="text-gray-700">Remove tape while the paint is still slightly tacky — typically 1–2 hours after the final coat. Pulling tape from fully dry paint can lift the paint film and chip the edges.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need to sand between coats of paint?</h3>
              <p className="text-gray-700">For walls — no, sanding between coats is not necessary for a good result. For trim and cabinets, a light sand with 220-grit between coats gives a smoother, higher-quality finish.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I avoid roller marks when painting?</h3>
              <p className="text-gray-700">Use a quality roller with the correct nap for your surface. Maintain a wet edge at all times. Apply with a W or M pattern and back-roll to even out the coat.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Should I paint the ceiling or walls first?</h3>
              <p className="text-gray-700">Always paint the ceiling first. Any drips or spatters from the ceiling roller land on the walls, which are covered when you roll the walls afterward.</p>
            </div>
          </div>

        </article>
      </div>
    </main>
  );
}
