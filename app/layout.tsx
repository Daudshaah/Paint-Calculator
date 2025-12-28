import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paint Calculator - Professional Paint Estimation Tool",
  description: "Calculate the exact amount of paint needed for your painting project. Get accurate estimates for multiple rooms, walls, and surfaces.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f6f8fb] text-gray-900">
        {children}
      </body>
    </html>
  );
}
