import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Re-export everything from utility modules
export * from './date';
export * from './color';

// Base utilities
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}