import { Suspense } from 'react';
import type { Metadata } from 'next';
import PaintCalculatorClient from './PaintCalculatorClient';
import { Locale, locales, defaultLocale } from '@/i18n/config';
import { getTranslations } from '@/i18n';

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;

  return {
    title: "Free Paint Calculator — How Much Paint Do I Need? | ThePaintCalculator.com",
    description: "Free paint calculator for any room or surface. Get exact gallons or litres instantly — interior, exterior, ceiling, cabinets and more. No signup required.",
    alternates: {
      canonical: 'https://thepaintcalculator.com',
    },
    openGraph: {
      title: 'Free Paint Calculator — How Much Paint Do I Need?',
      description: 'Free paint calculator for any room or surface. Get exact gallons or litres instantly.',
      url: 'https://thepaintcalculator.com',
      siteName: 'ThePaintCalculator.com',
      type: 'website',
    },
  };
}

export default async function PaintCalculator({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Free Paint Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Calculate exactly how much paint you need for any room or 
          surface — interior walls, exterior, ceiling, trim, cabinets, 
          fence or deck. Enter your dimensions and get instant results 
          in gallons or litres. Free, accurate, no signup required.
        </p>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Free Paint Calculator",
            "url": "https://thepaintcalculator.com",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Free paint calculator for rooms, exterior, ceiling and trim. Get exact gallons or litres instantly."
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much paint do I need for a 12x12 room?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 12x12 room with 8ft ceilings needs 1.5 to 2 gallons for two coats on the walls only."
                }
              },
              {
                "@type": "Question",
                "name": "How many gallons of paint do I need for a bedroom?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most bedrooms need 2 to 2.5 gallons for two coats. Larger master bedrooms may need 3 gallons."
                }
              },
              {
                "@type": "Question",
                "name": "Does the calculator work in metric units?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Toggle between feet and gallons or metres and litres using the unit switcher in the calculator."
                }
              },
              {
                "@type": "Question",
                "name": "How much does a gallon of paint cover?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "One gallon of standard interior paint covers 350 to 400 square feet on smooth walls with one coat."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need primer before painting?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For previously painted walls in good condition, no. For new drywall or a major colour change, yes — one coat of primer is recommended."
                }
              }
            ]
          })
        }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                Free Paint Calculator
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Calculate exact gallons or litres for any room or surface. Free — no signup required.
              </p>
            </div>
          </div>
        }
      >
        <PaintCalculatorClient locale={locale} />
      </Suspense>
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How much paint do I need for a 12x12 room?
            </h3>
            <p className="text-gray-600 text-sm">
              A 12x12 room with 8ft ceilings needs 1.5 to 2 gallons 
              for two coats on the walls only. Add another 0.5 gallons 
              if you are painting the ceiling.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How many gallons of paint do I need for a bedroom?
            </h3>
            <p className="text-gray-600 text-sm">
              Most bedrooms need 2 to 2.5 gallons for two coats. 
              Larger master bedrooms may need 3 gallons. Use the 
              calculator above for your exact dimensions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Does the calculator work in metric units?
            </h3>
            <p className="text-gray-600 text-sm">
              Yes. Toggle between feet and gallons or metres and litres 
              using the unit switcher inside the calculator.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How much does a gallon of paint cover?
            </h3>
            <p className="text-gray-600 text-sm">
              One gallon of standard interior paint covers 350 to 400 
              square feet on smooth walls per coat. Textured walls 
              reduce coverage to around 250 to 300 square feet.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Do I need primer before painting?
            </h3>
            <p className="text-gray-600 text-sm">
              For previously painted walls in good condition, no. 
              For new drywall or a major colour change, yes — 
              one coat of primer is recommended.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
