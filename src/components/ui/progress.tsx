"use client"

import * as React from "react"

type ProgressProps = {
  value?: number
  max?: number
  className?: string
}

/**
 * A simple progress bar component that doesn't rely on @radix-ui/react-progress
 */
export function Progress({ value = 0, max = 100, className = "" }: ProgressProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100)
  
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
      role="progressbar" 
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div
        className="h-full bg-blue-600 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}