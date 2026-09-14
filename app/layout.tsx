import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { IntentProvider } from "@/context/IntentContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FilmGrain } from "@/components/FilmGrain";
import { CustomCursor } from "@/components/CustomCursor";
import { CommandPalette } from "@/components/CommandPalette";
import { profile } from "@/data/profile";

const editorial = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://juliettebruner.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Creator, Content, Culture, Strategy`,
    template: `%s — ${profile.name}`,
  },
  description: profile.shortBio,
  openGraph: {
    title: `${profile.name} — Creator, Content, Culture, Strategy`,
    description: profile.shortBio,
    url: siteUrl,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Creator, Content, Culture, Strategy`,
    description: profile.shortBio,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Creator & Content Strategist",
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  url: siteUrl,
  description: profile.shortBio,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${editorial.variable} ${sans.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <IntentProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <FilmGrain />
          <CustomCursor />
          <CommandPalette />
          <Navigation />
          <main id="main-content" className="pt-[65px]">
            {children}
          </main>
          <Footer />
        </IntentProvider>
      </body>
    </html>
  );
}
