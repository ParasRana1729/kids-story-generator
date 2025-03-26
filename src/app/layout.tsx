import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Nunito, Quicksand } from 'next/font/google'

const nunito = Nunito({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const quicksand = Quicksand({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kids Story Generator',
  description: 'Create and read magical stories for children',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${quicksand.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-50 w-full">
        <div className="flex flex-col min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  )
} 