import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SidebarLeft } from '@/components/layout/sidebar-left'
import { SidebarRight } from '@/components/layout/sidebar-right'
import { MobileNav } from '@/components/layout/mobile-nav'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Yafreeka',
  description: 'A fresh take on X',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#020308',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh flex justify-center">
          <div className="hidden md:block w-64 shrink-0">
            <SidebarLeft />
          </div>
          <main className="w-full max-w-2xl shrink-0 border-x border-border min-h-dvh pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0">
            {children}
          </main>
          <div className="hidden lg:block w-80 shrink-0">
            <SidebarRight />
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  )
}
