import React from "react";
import { LucideIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";

import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { Button, buttonVariants } from "@/components/ui/button";

const BaseButton = React.forwardRef<
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
    size = "sm",
    ...restProps
  } = props;

  if (isLoading) {
    return (
      <Button
        ref={ref}
        size={size}
        asChild={asChild}
        variant={variant}
        {...restProps}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          Icon && <Icon className={href ? "mr-1" : ""} />
        )}
        {children}
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      size={size}
      asChild={asChild}
      variant={variant}
      {...restProps}
    >
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
    </Button>
  );
});

BaseButton.displayName = "BaseButton";

export default BaseButton;
