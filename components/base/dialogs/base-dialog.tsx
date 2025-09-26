import React from 'react'
import {ClassNameValue} from 'tailwind-merge'
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
import BaseButton from '@/components/base/buttons/base-button'

type ButtonProps = {
  label: string
} & React.ComponentProps<typeof BaseButton>

type BaseDialogProps = {
  type?: 'normal' | 'form'
  title: string
  isOpen: boolean
  description?: string
  toggleOpen: () => void
  onOkProps?: ButtonProps
  children: React.ReactNode
  className?: ClassNameValue
  onCancelProps?: ButtonProps
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  type = 'normal',
  title,
  isOpen,
  children,
  className,
  description,
  toggleOpen,
  onOkProps = {label: 'Save changes'},
  onCancelProps = {label: 'Cancel'},
}) => {
  const Content = (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      {children}

      <DialogFooter>
        <DialogClose asChild>
          <BaseButton variant="outline" {...onCancelProps}>
            {onCancelProps.label}
          </BaseButton>
        </DialogClose>

        <BaseButton {...onOkProps}>{onOkProps.label}</BaseButton>
      </DialogFooter>
    </>
  )

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpen}>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
        {type === 'form' ? <form>{Content}</form> : Content}
      </DialogContent>
    </Dialog>
  )
}

export default BaseDialog
