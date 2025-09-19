import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/common/theme-provider'
import { Toaster } from '@/components/common/ui/toaster'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Vibe Engineers | Bring vibes into your code.',
  description:
    'Vibe Engineers builds playful, boundary-pushing tools that let AI influence runtime control flow—loops, retries, and conditions—so your code can explore and adapt.',
  openGraph: {
    title: 'Vibe Engineers',
    description: 'Bring vibes into your code.',
    url: 'https://vibe-engineers.dev',
    siteName: 'Vibe Engineers',
    images: [
      {
        url: 'https://vibe-engineers.dev/images/landscape_thumbnail.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Engineers',
    description: 'Bring vibes into your code.',
    images: ['https://vibe-engineers.dev/images/landscape_thumbnail.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

// Add this function to tell Next.js which locales your app supports
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }] // Replace with your actual supported locales
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Await the params before accessing its properties
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
