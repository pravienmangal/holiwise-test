import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

import SideBar from '@/components/Chrome/SideBar'
import Footer from '@/components/Chrome/Footer'

const opSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holiwise: My Trips',
  description: 'Holiwise My Trips',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={opSans.className}>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-1">
            <SideBar />
            <main className="flex-1 px-4">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
