import type { Metadata, Viewport } from "next";
import { Brygada_1918, Martian_Mono, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/profile";
import "./globals.css";

// Brygada 1918, Schibsted Grotesk and Martian Mono all cover Azerbaijani (ə, ı, ğ, ş) in latin-ext.
const display = Brygada_1918({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});
const mono = Martian_Mono({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Bakhtiyar Badalov",
    "Bəxtiyar Bədəlov",
    "Azerbaijan Technical University",
    "AzTU",
    "Research, Development and Reputation",
    "university rankings",
    "Jean Monnet Module",
    "international relations",
    "Baku",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Bakhtiyar",
    lastName: "Badalov",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf1ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b181c" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
