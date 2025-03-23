"use client"

import React from 'react'
import { motion, HTMLMotionProps, Variant } from 'framer-motion'
import Link from 'next/link'

interface AnimatedLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  withText?: boolean
}

export function AnimatedLogo({ 
  className = "", 
  size = "md", 
  withText = true 
}: AnimatedLogoProps) {
  const sizeClasses = {
    sm: "text-xl font-bold",
    md: "text-2xl font-bold",
    lg: "text-3xl font-bold"
  }

  // Define letter colors with Google-style
  const letterColors = [
    'text-blue-500', // S
    'text-red-500',  // c
    'text-yellow-500', // h
    'text-blue-500',  // o
    'text-green-500', // o
    'text-red-500',   // l
    'text-blue-500',  // g
    'text-yellow-500', // l
    'text-green-500'  // e
  ]

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    },
    hover: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  // Properly type the custom variant
  const letterVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    } as Variant,
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    } as Variant,
    hover: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        delay: i * 0.05,
        repeat: 0
      }
    }) as Variant
  }

  // Define motion props separately
  const containerMotionProps: HTMLMotionProps<"div"> = {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible",
    whileHover: "hover"
  }

  return (
    <Link href="/" className={className}>
      <motion.div 
        className={`flex items-center ${sizeClasses[size]}`}
        {...containerMotionProps}
      >
        {'Schoolgle'.split('').map((letter, i) => (
          <motion.span 
            key={i}
            className={letterColors[i]}
            custom={i}
            variants={letterVariants}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </Link>
  )
}