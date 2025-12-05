import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

// CVA for a reusable Box wrapper component
export const boxVariants = cva("inline-block p-0 m-0 box-border", {
  variants: {
    size: {
      xs: "text-sm p-0",
      sm: "text-sm p-1",
      md: "text-base p-4",
      lg: "text-lg p-6",
    },
    color: {
      neutral: "bg-transparent text-current",
      surface: "bg-white dark:bg-slate-900",
      primary: "bg-blue-600 text-white dark:bg-blue-500",
      secondary: "bg-rose-600 text-white dark:bg-rose-500",
      subtle: "bg-gray-50 dark:bg-gray-800",
      background: "bg-card text-current",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
    display: {
      block: "block",
      inline: "inline-block",
      flex: "flex",
      grid: "grid",
    },
    flow: {
      col: "flex-col",
      row: "flex-row",
      center: "items-center", // justify-center
    },
  },
  defaultVariants: {
    size: "sm",
    color: "neutral",
    radius: "sm",
    shadow: "none",
    display: "block",
  },
});

export type BoxVariantProps = VariantProps<typeof boxVariants>;

export interface BoxProps
  extends BoxVariantProps, Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

export const Box = ({
  as: Component = "div",
  className,
  children,
  size,
  color,
  radius,
  shadow,
  display,
  flow,
  ...rest
}: BoxProps) => {
  const classes = cn(
    boxVariants({ size, color, radius, shadow, display, flow }),
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

export default Box;
