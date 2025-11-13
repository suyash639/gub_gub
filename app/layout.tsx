import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/werty.png', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <body
          className="font-sans antialiased"
          style={{
            overflowX: "hidden",
            padding: "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)"
          }}
      >
      {children}
      <Analytics />
      </body>
      </html>
  )
}
