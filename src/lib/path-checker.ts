import { usePathname } from "next/navigation";

export const usePathChecker = (path: string) => {
  const pathname = usePathname();
  return pathname.startsWith(path);
};
