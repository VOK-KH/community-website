import type { Metadata } from 'next'
import { DM_Sans, Space_Mono, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import './globals.css'
import './inner-pages.css'

const fontSyne = Syne({
  subsets: ['latin'],
  variable: '--font-landing-syne',
  weight: ['400', '600', '700', '800'],
})

const fontDmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-landing-dm',
  weight: ['300', '400', '500', '600'],
})

const fontSpaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-landing-mono',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'VokDev — Vision Of Knowledge',
  description:
    'VokDev is the open community for developers who ship real projects, learn in public, and grow alongside people who genuinely get it.',
  keywords: ['developer community', 'open source', 'Vision Of Knowledge', 'VokDev', 'Next.js'],
  authors: [{ name: 'VokDev' }],
  creator: 'VokDev',
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
