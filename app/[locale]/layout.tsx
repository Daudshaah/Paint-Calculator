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
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');
  const languageAlternates = locales.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `/${lang}`;
    return acc;
  }, { 'x-default': `/${defaultLocale}` });
  const alternateLocales = locales.filter((lang) => lang !== locale);
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: `${t.header.title} - ${t.header.tagline}`,
    description: t.footer.aboutText,
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
    alternates: {
      languages: languageAlternates,
    },
    openGraph: {
      title: `${t.header.title} - ${t.header.tagline}`,
      description: t.footer.aboutText,
      url: `${siteUrl}/${locale}`,
      siteName: t.header.title,
      locale,
      alternateLocale: alternateLocales,
      type: 'website',
      images: [`${siteUrl}/icon.svg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.header.title} - ${t.header.tagline}`,
      description: t.footer.aboutText,
      images: [`${siteUrl}/icon.svg`],
    },
    themeColor: '#0f172a',
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
  const pageJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${locale.toUpperCase()} | Paint Calculator`,
    inLanguage: locale,
    url: `${(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')}/${locale}`,
    isPartOf: `${(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')}/`,
    description: getTranslations(locale).footer.aboutText,
  });
  
  return (
    <html lang={locale} dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: pageJsonLd }}
        />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
