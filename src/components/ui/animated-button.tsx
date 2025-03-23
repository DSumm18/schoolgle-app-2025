"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface AnimatedButtonProps {
  href?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
  withArrow?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function AnimatedButton({
  className,
  variant = "default",
  size = "default",
  withArrow = false,
  href,
  children,
  onClick,
  disabled,
  type = "button",
  ...props
}: AnimatedButtonProps) {
  const buttonClasses = cn(
    buttonVariants({ variant, size, className }),
    "overflow-hidden relative group",
  )
  
  const ButtonContent = () => (
    <>
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {withArrow && (
          <motion.span 
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            →
          </motion.span>
        )}
      </span>
      <motion.span
        className="absolute inset-0 z-0 bg-primary/10 dark:bg-primary/20 rounded-md"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
  
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        <ButtonContent />
      </Link>
    )
  }
  
  // Define motion props separately to avoid type conflicts
  const motionProps: HTMLMotionProps<"button"> = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 }
  }
  
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...motionProps}
    >
      <ButtonContent />
    </motion.button>
  )
}