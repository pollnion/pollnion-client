import React from 'react'
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'

const BaseSheet = ({
  title,
  isOpen,
  description,
  side = 'left',
  children,
  toggleOpen,
  footer,
}: DialogProps & {
  title: string
  children: Children
  footer?: Children
  description: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
      <SheetContent className="flex flex-col" side={side}>
        <SheetHeader className="flex-none border-b p-6 text-left">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="px-4 flex-1 overflow-y-auto">{children}</div>

        {footer && <SheetFooter className="flex-none border-t p-6">{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

export default BaseSheet
