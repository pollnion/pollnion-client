import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const navbarVariants = cva(
  cn(
    "sticky top-0 z-50 flex items-center justify-between",
    "h-fit bg-background py-3 px-2 sm:px-0",
    "lg:container lg:mx-auto space-x-2",
    "transition-transform duration-300"
  ),
  {
    variants: {
      isVisible: {
        true: "translate-y-0",
        false: "translate-y-[-100%] sm:translate-y-0",
      },
    },
    defaultVariants: {
      isVisible: true,
    },
  }
);
