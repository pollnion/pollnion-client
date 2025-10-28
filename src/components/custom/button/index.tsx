import React from "react";
import Link from "next/link";
import { forwardRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { VariantProps } from "class-variance-authority";

import type { Children, Element } from "@/types/global";
import { Button as ShadcnBtn, buttonVariants } from "@/components/ui/button";

type Props = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    asChild?: boolean;
    children: Children;
    isLoading?: boolean;
    icon?: React.ElementType;
  };

const Button = forwardRef<HTMLButtonElement, Props>((props, ref): Element => {
  const {
    href,
    variant,
    children,
    isLoading,
    icon: Icon,
    asChild = false,
    ...rest
  } = props;

  const content = (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Icon && <Icon className={href ? "mr-1" : ""} />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <ShadcnBtn
        ref={ref}
        asChild={asChild}
        variant={variant}
        disabled={isLoading}
        {...rest}
      >
        <Link href={href} className="flex items-center">
          {content}
        </Link>
      </ShadcnBtn>
    );
  }

  return (
    <ShadcnBtn
      ref={ref}
      asChild={asChild}
      variant={variant}
      disabled={isLoading}
      {...rest}
    >
      {content}
    </ShadcnBtn>
  );
});

Button.displayName = "Index";

export default Button;
