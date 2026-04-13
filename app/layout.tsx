import type { Metadata } from 'next'
import { DM_Sans, Space_Mono, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import './globals.css'
import './inner-pages.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vokdev.com'
const siteName = 'VokDev'
const defaultTitle = 'VokDev — Vision Of Knowledge'
const defaultDescription =
  'VokDev is the open community for developers who ship real projects, learn in public, and grow alongside people who genuinely get it.'

const fontSyne = Syne({
  subsets: ['latin'],
  variable: '--font-landing-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const fontDmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-landing-dm',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const fontSpaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-landing-mono',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'developer community',
    'open source',
    'learn in public',
    'Vision Of Knowledge',
    'VokDev',
    'Next.js',
    'software developers',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fontSyne.variable} ${fontDmSans.variable} ${fontSpaceMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
