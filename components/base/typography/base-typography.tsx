import React from 'react'
import {ClassValue} from 'clsx'
import {cn} from '@/lib/utils'

export function TypographyH1({
  children,
  className,
}: React.ComponentProps<'h1'> & {className?: ClassValue}) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({
  children,
  className,
}: React.ComponentProps<'h2'> & {className?: ClassValue}) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({
  children,
  className,
}: React.ComponentProps<'h3'> & {className?: ClassValue}) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  )
}

export function TypographyH4({
  children,
  className,
}: React.ComponentProps<'h4'> & {className?: ClassValue}) {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>
      {children}
    </h4>
  )
}

export function TypographyP({
  children,
  className,
}: React.ComponentProps<'p'> & {className?: ClassValue}) {
  return <p className={cn('leading-7', className)}>{children}</p> // [&:not(:first-child)]:mt-6
}

export function TypographyBlockquote({
  children,
  className,
}: React.ComponentProps<'blockquote'> & {className?: ClassValue}) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  )
}

export function TypographyList({
  items,
  className,
}: {
  items: React.ComponentProps<'li'>[]
  className?: ClassValue
}) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {items.map((itemProps, idx) => (
        <li key={idx} {...itemProps} />
      ))}
    </ul>
  )
}

export function TypographyInlineCode({
  children,
  className,
}: React.ComponentProps<'code'> & {className?: ClassValue}) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </code>
  )
}

export function TypographyLead({
  children,
  className,
}: React.ComponentProps<'p'> & {className?: ClassValue}) {
  return <p className={cn('text-muted-foreground text-xl', className)}>{children}</p>
}

export function TypographyLarge({
  children,
  className,
}: React.ComponentPropsWithoutRef<'div'> & {className?: ClassValue}) {
  return <div className={cn('text-lg font-semibold', className)}>{children}</div>
}

export function TypographySmall({
  children,
  className,
}: React.ComponentProps<'small'> & {className?: ClassValue}) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </small>
  )
}

export function TypographyMuted({
  children,
  className,
}: React.ComponentProps<'p'> & {className?: ClassValue}) {
  return <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>
}
