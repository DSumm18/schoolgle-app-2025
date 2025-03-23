import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  try {
    const date = parseISO(dateString)
    return format(date, "PPP")
  } catch (error) {
    return dateString
  }
}

export function truncateString(str: string, length: number) {
  if (!str) return ""
  return str.length > length ? str.substring(0, length) + "..." : str
}

export function generateId(prefix: string) {
  const random = Math.random().toString(36).substring(2, 8)
  const timestamp = Date.now().toString().substring(9)
  return `${prefix}-${timestamp}${random}`
}