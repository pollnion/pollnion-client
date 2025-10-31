import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export const navbarVariants = cva(
  cn(
    "transition-transform duration-300",
    "items-center sticky top-0 h-fit bg-background z-50 space-x-2",
    "lg:container lg:mx-auto flex justify-between py-3"
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
