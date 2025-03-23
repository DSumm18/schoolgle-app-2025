/**
 * Combines multiple class names into a single string
 */
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a date string to a readable format
 */
export function formatDate(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Truncates a string to a specified length and adds ellipsis
 */
export function truncateString(str: string, length: number) {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}