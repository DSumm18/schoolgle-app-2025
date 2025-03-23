"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Navigation() {
  const pathname = usePathname()
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }
  
  const modules = [
    { name: 'Home', path: '/' },
    { name: 'School Intranet', path: '/modules/school-intranet' },
    { name: 'Teaching & Learning', path: '/modules/teaching-learning' },
    { name: 'Estate Management', path: '/modules/estate-management' }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-primary">Schoolgle</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {modules.map((module) => (
            <Link
              key={module.path}
              href={module.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(module.path) 
                  ? 'text-foreground' 
                  : 'text-muted-foreground'
              }`}
            >
              {module.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}