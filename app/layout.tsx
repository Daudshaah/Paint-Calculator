import type { Metadata } from "next";
import "./globals.css";
import { locales, defaultLocale } from "@/i18n/config";

const languageAlternates = locales.reduce<Record<string, string>>((acc, locale) => {
  acc[locale] = `/${locale}`;
  return acc;
}, { 'x-default': `/${defaultLocale}` });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');
const alternateLocales = locales.filter((locale) => locale !== defaultLocale);
const googleVerification = 'H6hfcYztHGKkycUnlH8I8RsU3LpMgMMB1fPjOZsE0UU';
const siteJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Paint Calculator',
  url: `${siteUrl}/`,
  inLanguage: locales,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Paint Calculator - Professional Paint Estimation Tool",
  description: "Calculate the exact amount of paint needed for your painting project. Get accurate estimates for multiple rooms, walls, and surfaces.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    languages: languageAlternates,
  },
  openGraph: {
    title: "Paint Calculator - Professional Paint Estimation Tool",
    description: "Calculate the exact amount of paint needed for your painting project. Get accurate estimates for multiple rooms, walls, and surfaces.",
    url: `${siteUrl}/${defaultLocale}`,
    siteName: "Paint Calculator",
    locale: defaultLocale,
    alternateLocale: alternateLocales,
    type: "website",
    images: [`${siteUrl}/icon.svg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Calculator - Professional Paint Estimation Tool",
    description: "Calculate the exact amount of paint needed for your painting project. Get accurate estimates for multiple rooms, walls, and surfaces.",
    images: [`${siteUrl}/icon.svg`],
  },
  themeColor: "#0f172a",
  verification: {
    google: googleVerification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/icon.svg" as="image" type="image/svg+xml" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EFHR0YQ9N1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EFHR0YQ9N1');
            `,
          }}
        />
      </head>
      <body className="bg-[#f6f8fb] text-gray-900">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: siteJsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
