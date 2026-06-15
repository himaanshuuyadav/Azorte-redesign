import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LenisProvider } from '@/providers/LenisProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://azorte.com'),
  title: {
    default: 'AZORTE — Wear the Future',
    template: '%s | AZORTE',
  },
  description:
    'Discover AZORTE — a bold, contemporary fashion brand for the fearless. Explore collections, stories, and NeoStore experiences.',
  keywords: [
    'AZORTE',
    'fashion',
    'clothing',
    'Reliance Retail',
    'contemporary fashion',
    'Indian fashion brand',
  ],
  authors: [{ name: 'AZORTE' }],
  creator: 'AZORTE',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'AZORTE',
    title: 'AZORTE — Wear the Future',
    description:
      'Discover AZORTE — a bold, contemporary fashion brand for the fearless.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AZORTE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AZORTE — Wear the Future',
    description:
      'Discover AZORTE — a bold, contemporary fashion brand for the fearless.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/fav.png',
    shortcut: '/images/fav.png',
    apple: '/images/fav.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-azorte-black font-sans text-azorte-white">
        <LenisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
