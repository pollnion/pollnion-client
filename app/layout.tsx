import {Suspense} from 'react'
import {Analytics} from '@vercel/analytics/next'
import {Geist, Geist_Mono} from 'next/font/google'

import './globals.css'
import AppProviders from '@/components/base/providers/app-providers'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: {
    default: 'Pollnion — Opinion meet polls',
    template: '%s — Pollnion',
  },
  description: 'A social platform for polls and opinions.',
  metadataBase: new URL('https://pollnion.com'),
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <Suspense>
          <AppProviders>{children}</AppProviders>
        </Suspense>
      </body>
    </html>
  )
}
