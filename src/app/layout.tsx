import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cnkol.psyverse.fun"),
  title: "Global Chinese Crypto KOLs Ranking | 全球华语加密 KOL 影响力排行榜",
  description:
    "Comprehensive ranking of the most influential crypto KOLs in the Chinese-speaking community — founders, investors, analysts, and anons, by influence score, followers, and signal posts. 全球华语加密意见领袖影响力综合排名。",
  keywords: ["crypto KOLs", "Chinese crypto", "Binance", "CZ", "Justin Sun", "华语加密", "加密货币意见领袖", "华人加密", "加密 Twitter", "加密大 V"],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: {
    canonical: "/",
    languages: { en: "/", "zh-CN": "/", "x-default": "/" },
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Chinese Crypto KOLs Ranking" }],
    title: "Global Chinese Crypto KOLs Ranking",
    description: "全球华语加密 KOL 影响力综合排名。",
    url: "https://cnkol.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: "Chinese Crypto KOLs Ranking",
    description: "全球华语加密 KOL 影响力综合排名。",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#0a0908" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
