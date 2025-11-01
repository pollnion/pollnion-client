import { usePathname } from "next/navigation";

/**
 * Hook to check if the current path starts with the given path.
 *
 * Useful for highlighting active navigation items or conditionally
 * rendering components based on the current route.
 *
 * @param path - The path prefix to check against (e.g., "/dashboard", "/settings")
 * @returns true if the current pathname starts with the provided path, false otherwise
 *
 * @example
 * const isOnDashboard = usePathChecker("/dashboard");
 * // Returns true for "/dashboard", "/dashboard/settings", etc.
 * // Returns false for "/profile", "/home", etc.
 */
export const usePathChecker = (path: string): boolean => {
  const pathname = usePathname();
  return pathname.startsWith(path);
};
