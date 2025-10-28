import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight border-b pb-2",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 text-base",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    variant: "p",
    weight: "normal",
    align: "left",
  },
});

type AsProp<T extends React.ElementType> = {
  as?: T;
};

type TypographyProps<T extends React.ElementType> = AsProp<T> &
  VariantProps<typeof typographyVariants> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof VariantProps<typeof typographyVariants> | "as"
  >;

export function Index<T extends React.ElementType = "p">({
  as,
  variant,
  weight,
  align,
  className,
  ...props
}: TypographyProps<T>) {
  const Tag = as || "p";
  return (
    <Tag
      className={cn(typographyVariants({ variant, weight, align }), className)}
      {...props}
    />
  );
}
