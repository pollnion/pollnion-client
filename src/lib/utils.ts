import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to conditionally merge class names using clsx and tailwind-merge.
 *
 * This combines the power of clsx for conditional class names with tailwind-merge
 * to intelligently merge Tailwind CSS classes, preventing conflicts and duplicates.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns A merged string of class names with Tailwind conflicts resolved
 *
 * @example
 * cn("px-2 py-1", "px-4") // "py-1 px-4" (px-4 overrides px-2)
 * cn("text-red-500", condition && "text-blue-500") // conditionally applies classes
 * cn(["base-class", { "active": isActive }]) // supports arrays and objects
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
