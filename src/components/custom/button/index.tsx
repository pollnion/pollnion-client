import React from "react";
import { LucideIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";

import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { Button as UIButton, buttonVariants } from "@/components/ui/button";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      icon?: LucideIcon;
      href?: string;
      asChild?: boolean;
      isLoading?: boolean;
    }
>((props, ref) => {
  const {
    href,
    variant,
    children,
    isLoading,
    icon: Icon,
    asChild = false,
    ...restProps
  } = props;

  if (isLoading) {
    return (
      <UIButton
        ref={ref}
        asChild={asChild}
        variant={variant}
        disabled
        {...restProps}
      >
        <Spinner />
      </UIButton>
    );
  }

  return (
    <UIButton ref={ref} asChild={asChild} variant={variant} {...restProps}>
      {href ? (
        <Link href={href} className="flex items-center">
          {Icon && <Icon className="mr-1" />}
          {children}
        </Link>
      ) : (
        <>
          {Icon && <Icon />}
          {children}
        </>
      )}
    </UIButton>
  );
});

Button.displayName = "Button";

export default Button;
