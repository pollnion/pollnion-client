import React from 'react'
import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetDescription,
} from '@/components/ui/sheet'

const BaseSheet = ({
  title,
  isOpen,
  description,
  side = 'left',
  children,
  toggleOpen,
}: DialogProps & {
  title: string
  children: Children
  description: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={toggleOpen}>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className="px-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}

export default BaseSheet
