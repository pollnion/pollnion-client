import React from 'react'
import Link from 'next/link'
import {Loader2Icon, LucideIcon} from 'lucide-react'
import {VariantProps} from 'class-variance-authority'
import {Button, buttonVariants} from '@/components/ui/button'

export const BaseLoadingButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean
    }
>(({variant, asChild, children, className, ...props}, ref) => {
  return (
    <Button
      ref={ref}
      disabled
      variant={variant}
      asChild={asChild}
      className={className}
      {...props}
    >
      <Loader2Icon className="animate-spin" /> {children}
    </Button>
  )
})

BaseLoadingButton.displayName = 'BaseLoadingButton'

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      icon?: LucideIcon
      href?: string
      asChild?: boolean
      isLoading?: boolean
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
  } = props

  if (isLoading) {
    return (
      <BaseLoadingButton ref={ref} asChild={asChild} variant={variant} {...restProps}>
        {children}
      </BaseLoadingButton>
    )
  }

  return (
    <Button ref={ref} asChild={asChild} variant={variant} {...restProps}>
      {Icon && <Icon />}
      {href ? <Link href={href}>{children}</Link> : children}
    </Button>
  )
})

BaseButton.displayName = 'BaseButton'

export default BaseButton
