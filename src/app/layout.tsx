import type { Metadata, Viewport } from "next";
import type React from "react";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { MotionPreferences } from "@/lib/motion";
import { Reveal } from "@/lib/reveal";
import { site } from "@/lib/site";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Zorga",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "strategic platform architecture",
    "platform concept",
    "industry platform",
    "summit architecture",
    "forum design",
    "Zorga",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: "We design what industries gather around.",
    url: site.url,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: "We design what industries gather around.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MotionPreferences>
          {children}
          <Reveal />
        </MotionPreferences>
      </body>
    </html>
  );
}
