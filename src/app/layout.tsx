import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freshening | Asia's Leading OEM/ODM Wet Wipes & Hygiene Solutions Manufacturer",
  description:
    "Asia's leading manufacturer of quality wet wipes and hygiene solutions. Trusted by Shell, MBS, SATS, DBS, and 5,000+ enterprises across 38+ countries. Private label & contract manufacturing.",
  keywords: [
    "wet wipes manufacturer",
    "OEM wet wipes",
    "private label wipes",
    "contract manufacturing",
    "hygiene solutions",
    "Singapore manufacturer",
    "Freshening",
  ],
  openGraph: {
    title: "Freshening | OEM/ODM Wet Wipes & Hygiene Solutions",
    description:
      "Asia's leading wet wipes & hygiene solutions manufacturer. 30+ years, 3 world-class plants, 5,000+ products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
