import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Domain Intelligence Hub',
  description: 'AI-powered domain search, analysis, and acquisition platform with Bitcoin payments',
  keywords: ['domain', 'AI', 'search', 'bitcoin', 'langchain', 'domain analysis'],
  authors: [{ name: 'Domain Intelligence Hub Team' }],
  creator: 'Domain Intelligence Hub',
  publisher: 'Domain Intelligence Hub',
  robots: 'index, follow',
  openGraph: {
    title: 'Domain Intelligence Hub',
    description: 'AI-powered domain search, analysis, and acquisition platform with Bitcoin payments',
    url: 'https://domain-intelligence-hub.vercel.app',
    siteName: 'Domain Intelligence Hub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domain Intelligence Hub',
    description: 'AI-powered domain search, analysis, and acquisition platform with Bitcoin payments',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
