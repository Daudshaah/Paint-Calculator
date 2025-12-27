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
