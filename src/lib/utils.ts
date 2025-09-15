import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'

/**
 * A utility function to merge Tailwind CSS classes.
 * It intelligently combines class names, resolving conflicts.
 * For example, `cn("p-2", "p-4")` would result in `"p-4"`.
 * @param inputs - A list of class values to merge.
 * @returns A string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to relative time (e.g., "2 days ago")
export function formatRelativeTime(date: Date | string) {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(parsedDate, { addSuffix: true })
}

// Simple validation check for email
export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

// Creates a URL-friendly slug from a string
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
