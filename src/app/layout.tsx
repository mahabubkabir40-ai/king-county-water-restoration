import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyMobileCallBar } from "@/components/StickyMobileCallBar";
import { SITE_CONFIG } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: "Water Damage Restoration King County, WA | 24/7 Help",
    template: "%s",
  },
  description:
    "Water in your home? Call (425) 675-3040 24/7 to reach a local water damage restoration company serving King County suburbs: extraction, drying, crawl spaces, sewage.",
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.brandName,
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <StickyMobileCallBar />
      </body>
    </html>
  );
}
