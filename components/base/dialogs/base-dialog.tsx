import React from 'react'
import {ClassNameValue} from 'tailwind-merge'

import {cn} from '@/lib/utils'
import {Form} from '@/components/ui/form'
import {DialogHeader} from '@/components/ui/dialog'
import {DialogContent} from '@/components/ui/dialog'
import {DialogDescription} from '@/components/ui/dialog'
import BaseButton from '@/components/base/buttons/base-button'
import {Dialog, DialogClose, DialogTitle, DialogFooter} from '@/components/ui/dialog'

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
  form: any // temp
  onSubmit: any // temp
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  type = 'normal',
  title,
  isOpen,
  children,
  className,
  description,
  toggleOpen,
  form,
  onSubmit,
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
        {type === 'form' ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {Content}
            </form>
          </Form>
        ) : (
          Content
        )}
      </DialogContent>
    </Dialog>
  )
}

export default BaseDialog
