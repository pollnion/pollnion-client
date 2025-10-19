/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import {ClassNameValue} from 'tailwind-merge'
import {UseFormReturn, FieldValues, SubmitHandler} from 'react-hook-form'

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import {cn} from '@/lib/utils'
import BaseForm from '../forms/base-form'
import BaseButton from '@/components/base/buttons/base-button'

type ButtonProps = {
  label: string
} & React.ComponentProps<typeof BaseButton>

type BaseDialogProps<T extends FieldValues> = {
  type?: 'normal' | 'form'
  title: string
  isOpen: boolean
  description?: string
  toggleOpen: () => void
  onOkProps?: ButtonProps
  children: React.ReactNode
  className?: ClassNameValue
  onCancelProps?: ButtonProps
  form?: UseFormReturn<T>
  onSubmit?: SubmitHandler<T>
}

const BaseDialog = <T extends FieldValues>({
  type = 'normal',
  title,
  isOpen,
  children,
  className,
  description = 'Please enter your details',
  toggleOpen,
  form,
  onSubmit,
  onOkProps,
  onCancelProps,
}: BaseDialogProps<T>) => {
  const Content = (
    <React.Fragment>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      {children}

      {(onOkProps || onCancelProps) && (
        <DialogFooter>
          {onCancelProps && (
            <DialogClose asChild>
              <BaseButton variant="outline" {...onCancelProps}>
                {onCancelProps?.label || 'Cancel'}
              </BaseButton>
            </DialogClose>
          )}
          {onOkProps && (
            <BaseButton {...onOkProps}>{onOkProps.label || 'Save changes'}</BaseButton>
          )}
        </DialogFooter>
      )}
    </React.Fragment>
  )

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent
        className={cn('sm:max-w-[590px] bg-card px-3 py-6 border-none', className)}
      >
        {type === 'form' && form ? (
          <BaseForm form={form} onSubmit={onSubmit}>
            {Content}
          </BaseForm>
        ) : (
          Content
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BaseDialog
