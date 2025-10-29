import { usePathname } from "next/navigation";

/**
 * Hook to check if the current path starts with the given path
 * @param path
 * @returns
 */
export const usePathChecker = (path: string) => {
  const pathname = usePathname();
  return pathname.startsWith(path);
};
