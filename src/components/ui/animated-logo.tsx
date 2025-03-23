"use client"

import React, { useState } from 'react'
import { motion, HTMLMotionProps, Variants } from 'framer-motion'
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
  const [isGlassesMode, setIsGlassesMode] = useState(false);
  
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
  const containerVariants: Variants = {
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

  // Letter variants
  const letterVariants: Variants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      y: [0, -10, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        repeat: 0
      }
    }
  }

  // Glasses animation variant
  const glassesVariants: Variants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  }

  const handleHover = () => {
    // Toggle glasses mode
    setTimeout(() => {
      setIsGlassesMode(true);
      
      // Reset back to normal mode after 2 seconds
      setTimeout(() => {
        setIsGlassesMode(false);
      }, 2000);
    }, 300);
  }

  // Define motion props separately
  const containerMotionProps: HTMLMotionProps<"div"> = {
    className: `flex items-center ${sizeClasses[size]}`,
    variants: containerVariants,
    initial: "hidden",
    animate: "visible",
    whileHover: "hover",
    onHoverStart: handleHover
  }

  return (
    <Link href="/" className={className}>
      <motion.div {...containerMotionProps}>
        {'Schoolgle'.split('').map((letter, i) => {
          // Special handling for the "oo" in the middle (indices 3 and 4)
          if ((i === 3 || i === 4) && isGlassesMode) {
            return (
              <div key={i} className="relative inline-block w-[1em] h-[1em] mx-[-0.05em]">
                {/* Hide the original letter when in glasses mode */}
                <motion.span 
                  className={letterColors[i]}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {letter}
                </motion.span>
                
                {/* Show glasses animation */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                  variants={glassesVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {i === 3 ? (
                    <div className="relative w-[1em] h-[1em] flex items-center justify-center">
                      <div className="absolute w-[0.8em] h-[0.8em] rounded-full border-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="relative w-[1em] h-[1em] flex items-center justify-center">
                      <div className="absolute w-[0.8em] h-[0.8em] rounded-full border-2 border-green-500"></div>
                    </div>
                  )}
                </motion.div>
              </div>
            )
          }
          
          // Regular letter rendering
          return (
            <motion.span 
              key={i}
              className={letterColors[i]}
              custom={i}
              variants={letterVariants}
              style={{ 
                transitionDelay: `${i * 50}ms`,
                display: 'inline-block'
              }}
            >
              {letter}
            </motion.span>
          )
        })}
      </motion.div>
    </Link>
  )
}