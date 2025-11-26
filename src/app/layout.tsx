import { Suspense } from "react";
import { Toaster } from "sonner";
import { Inter, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import { PROJECT_URL } from "@/constants/keys";
import { Analytics } from "@vercel/analytics/next";
import { AppProviders as Providers } from "@/components/providers/app-providers";

import "./globals.css";

// Inter for all UI text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Geist Mono for code/text-like UI bits
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pollnion — Opinion meet polls",
    template: "%s — Pollnion",
  },
  description: "A social platform for polls and opinions.",
  metadataBase: new URL(PROJECT_URL),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Analytics />
        <Suspense>
          <Toaster />
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
