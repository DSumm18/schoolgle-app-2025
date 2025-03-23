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
  
  // Define size classes based on prop
  const sizeClasses = {
    sm: "text-xl font-bold",
    md: "text-2xl font-bold",
    lg: "text-4xl font-bold" // Increased from text-3xl to text-4xl
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
      opacity: 0,
      rotateX: 90,
      textShadow: "0px 0px 0px rgba(0,0,0,0)"
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      textShadow: "1px 1px 0px rgba(0,0,0,0.2), 2px 2px 0px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      y: [0, -10, 0],
      scale: [1, 1.2, 1],
      rotateY: [0, -15, 15, -15, 0],
      textShadow: [
        "1px 1px 0px rgba(0,0,0,0.2), 2px 2px 0px rgba(0,0,0,0.1)",
        "3px 3px 5px rgba(0,0,0,0.3), 5px 5px 10px rgba(0,0,0,0.1)",
        "1px 1px 0px rgba(0,0,0,0.2), 2px 2px 0px rgba(0,0,0,0.1)"
      ],
      transition: {
        duration: 0.7,
        repeat: 0
      }
    }
  }

  // Enhanced glasses animation variants
  const glassesVariants: Variants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotateX: 90
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  }

  // Bridge animation for glasses
  const bridgeVariants: Variants = {
    hidden: {
      width: 0,
      opacity: 0
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }
    }
  }

  // Temples animation (glasses arms)
  const templeVariants: Variants = {
    hidden: {
      width: 0,
      opacity: 0
    },
    visible: {
      width: "70%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  }

  const handleHover = () => {
    // Toggle glasses mode
    setTimeout(() => {
      setIsGlassesMode(true);
      
      // Reset back to normal mode after 2.5 seconds
      setTimeout(() => {
        setIsGlassesMode(false);
      }, 2500);
    }, 300);
  }

  // Define motion props separately
  const containerMotionProps: HTMLMotionProps<"div"> = {
    className: `flex items-center ${sizeClasses[size]} perspective-[1000px]`,
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
                  {/* Enhanced glasses lens with realistic look */}
                  {i === 3 ? (
                    <div className="relative w-[1em] h-[1em] flex items-center justify-center">
                      {/* Left lens */}
                      <div className="absolute w-[0.8em] h-[0.8em] rounded-full border-3 border-blue-600 bg-blue-50/20 dark:bg-blue-900/30 backdrop-blur-sm shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                        {/* Glare effect */}
                        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-white/60 rotate-45 blur-[1px]"></div>
                      </div>
                      
                      {/* Right arm of glasses */}
                      <motion.div 
                        className="absolute right-[-20%] top-[45%] h-[10%] bg-blue-600 origin-left"
                        variants={templeVariants}
                        initial="hidden"
                        animate="visible"
                      ></motion.div>
                    </div>
                  ) : (
                    <div className="relative w-[1em] h-[1em] flex items-center justify-center">
                      {/* Right lens */}
                      <div className="absolute w-[0.8em] h-[0.8em] rounded-full border-3 border-green-600 bg-green-50/20 dark:bg-green-900/30 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                        {/* Glare effect */}
                        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-white/60 rotate-45 blur-[1px]"></div>
                      </div>
                      
                      {/* Left arm of glasses */}
                      <motion.div 
                        className="absolute left-[-20%] top-[45%] h-[10%] bg-green-600 origin-right"
                        variants={templeVariants}
                        initial="hidden"
                        animate="visible"
                      ></motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            )
          }
          
          // For index 3.5 - add a bridge between the glasses
          if (i === 3 && isGlassesMode) {
            return (
              <>
                {/* Rendered lens for 'o' */}
                <div key={`${i}-lens`} className="relative inline-block w-[1em] h-[1em] mx-[-0.05em]">
                  {/* Hide the original letter when in glasses mode */}
                  <motion.span 
                    className={letterColors[i]}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {letter}
                  </motion.span>
                  
                  {/* Left lens */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                    variants={glassesVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="relative w-[1em] h-[1em] flex items-center justify-center">
                      <div className="absolute w-[0.8em] h-[0.8em] rounded-full border-3 border-blue-600 bg-blue-50/20 dark:bg-blue-900/30 backdrop-blur-sm shadow-[0_0_15px_rgba(37,99,235,0.6)]">
                        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-white/60 rotate-45 blur-[1px]"></div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Bridge between glasses */}
                  <motion.div 
                    className="absolute top-[45%] right-[-10%] h-[10%] bg-gradient-to-r from-blue-600 to-green-600 z-20"
                    variants={bridgeVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      width: "20%",
                      transformOrigin: "left"
                    }}
                  ></motion.div>
                </div>
                
                {/* Rendered lens for 'o' */}
                <div key={`${i+1}-lens`} className="relative inline-block w-[1em] h-[1em] mx-[-0.05em]">
                  {/* Hide the original letter when in glasses mode */}
                  <motion.span 
                    className={letterColors[i+1]}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {letter}
                  </motion.span>
                  
                  {/* Right lens */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                    variants={glassesVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="relative w-[1em] h-[1em] flex items-center justify-center">
                      <div className="absolute w-[0.8em] h-[0.8em] rounded-full border-3 border-green-600 bg-green-50/20 dark:bg-green-900/30 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-white/60 rotate-45 blur-[1px]"></div>
                      </div>
                      
                      {/* Temple (arm) of right lens */}
                      <motion.div 
                        className="absolute right-[-35%] top-[45%] h-[10%] bg-green-600 origin-left"
                        variants={templeVariants}
                        initial="hidden"
                        animate="visible"
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              </>
            );
          }
          
          // Skip rendering the second 'o' if we've already rendered both 'o's in glasses mode
          if (i === 4 && isGlassesMode) {
            return null;
          }
          
          // Regular letter rendering with 3D effect
          return (
            <motion.span 
              key={i}
              className={`${letterColors[i]} transform-style-3d`}
              custom={i}
              variants={letterVariants}
              style={{ 
                transitionDelay: `${i * 50}ms`,
                display: 'inline-block',
                // Base 3D effect even without hover
                textShadow: "1px 1px 0px rgba(0,0,0,0.2), 2px 2px 0px rgba(0,0,0,0.1)",
                // Add a subtle perspective transform
                transform: `translateZ(0px)`,
                // Enhance with filter for more depth
                filter: "drop-shadow(0px 2px 1px rgba(0,0,0,0.1))"
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