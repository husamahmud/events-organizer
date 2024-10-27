'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Shell from '@/components/Shell'

interface LayoutProps {
  children: React.ReactNode
  events: React.ReactNode
  rsvps: React.ReactNode
}

export default function Layout({ children, events, rsvps }: LayoutProps) {
  const path = usePathname()

  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className="flex w-full h-full">
          <div className="w-1/2 border-r border-stone-900">
            {rsvps}
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="border-b border-stone-900 w-full h-1/2">
              {events}
            </div>
            <div className="w-full h-1/2">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Shell>
  )
}
