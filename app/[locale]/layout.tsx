import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '../components/Footer';
import { Locale, locales, defaultLocale } from '@/i18n/config';
import { getTranslations } from '@/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getTranslations(locale);
  
  return {
    title: `${t.header.title} - ${t.header.tagline}`,
    description: t.footer.aboutText,
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
    alternates: {
      languages: {
        'x-default': '/en',
        'en': '/en',
        'en-US': '/en',
        'en-GB': '/en',
        'en-CA': '/en',
        'en-AU': '/en',
        'es': '/es',
        'es-US': '/es',
        'es-MX': '/es',
        'es-ES': '/es',
        'es-419': '/es',
        'pt': '/pt',
        'pt-BR': '/pt',
        'fr': '/fr',
        'fr-FR': '/fr',
        'fr-CA': '/fr',
        'de': '/de',
        'de-DE': '/de',
        'de-AT': '/de',
        'de-CH': '/de',
        'it': '/it',
        'it-IT': '/it',
        'nl': '/nl',
        'nl-NL': '/nl',
        'nl-BE': '/nl',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  
  return (
    <html lang={locale} dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
