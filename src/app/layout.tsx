import React from 'react'
import type { Metadata } from 'next'

import { Roboto } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${roboto.variable} font-roboto bg-background text-foreground`}>
    {children}
    <Toaster />
    </body>
    </html>
  )
}
