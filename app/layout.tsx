import type { Metadata } from 'next'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex justify-center">
          <div className="hidden md:flex">
            <SidebarLeft />
          </div>
          <main className="flex-1 max-w-2xl border-x border-border min-h-screen pb-16 md:pb-0">{children}</main>
          <div className="hidden lg:flex">
            <SidebarRight />
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  )
}
