import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, formatStr: string = "PPP"): string {
  try {
    return format(parseISO(date), formatStr)
  } catch (error) {
    console.error("Error formatting date:", error)
    return date
  }
}