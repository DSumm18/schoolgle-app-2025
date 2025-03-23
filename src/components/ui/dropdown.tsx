"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  className?: string
}

export function Dropdown({ trigger, children, align = "left", className }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown}>{trigger}</div>
      {isOpen && (
        <div 
          className={cn(
            "absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700",
            align === "left" ? "left-0" : "right-0",
            className
          )}
        >
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function DropdownItem({ children, onClick, className, disabled = false }: DropdownItemProps) {
  return (
    <div
      className={cn(
        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700",
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent",
        className
      )}
      onClick={disabled ? undefined : onClick}
      role="menuitem"
    >
      {children}
    </div>
  )
}

export function DropdownSeparator() {
  return <div className="h-px my-1 bg-gray-200 dark:bg-gray-700" />
}