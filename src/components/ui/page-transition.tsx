"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence, HTMLMotionProps, Variants } from "framer-motion"
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  const variants: Variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.61, 1, 0.88, 1],
      }
    },
    exit: { 
      opacity: 0, 
      x: 0, 
      y: 20,
      transition: { 
        duration: 0.3, 
        ease: [0.61, 1, 0.88, 1],
      }
    }
  }

  // Define motion props separately - HTMLMotionProps doesn't include 'key'
  const motionProps = {
    initial: "hidden",
    animate: "enter",
    exit: "exit",
    variants: variants,
    className: "w-full"
  } as const

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        {...motionProps}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}