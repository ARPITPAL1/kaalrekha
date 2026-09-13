import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import AmbientAudio from "@/components/ui/AmbientAudio";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KAALREKHA (କାଳରେଖା) — Historical & Archival Research by Dr. Anjan Kumar Pal",
  description:
    "Official digital historical repository and scholarly archive of Dr. Anjan Kumar Pal (Ph.D., Fakir Mohan University, Balasore). Exploring the Growth of Education in Balasore District (1835–1947 AD), Ancient Kalinga, Indian History, and 360° Geospatial Heritage.",
  keywords: [
    "Dr. Anjan Kumar Pal",
    "Fakir Mohan University",
    "Balasore District History",
    "Growth of Education in Balasore",
    "Odisha History",
    "Ancient Kalinga",
    "Indian History",
    "KAALREKHA",
    "Archival Research",
  ],
  authors: [{ name: "Dr. Anjan Kumar Pal" }],
  openGraph: {
    title: "KAALREKHA — Historical & Archival Research by Dr. Anjan Kumar Pal",
    description:
      "Official digital historical repository and scholarly archive of Dr. Anjan Kumar Pal (Ph.D., Fakir Mohan University, Balasore).",
    type: "website",
    locale: "or_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="or" className={`${cormorant.variable} ${cinzel.variable} ${inter.variable}`}>
      <body className="bg-museum-ivory text-museum-charcoal antialiased selection:bg-museum-terracotta selection:text-white">
        <LanguageProvider>
          {/* Ambient Soundscape Controller (Muted by default) */}
          <AmbientAudio />

          {/* Page Content */}
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
