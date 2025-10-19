'use client'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {ReactNode} from 'react'

type DropdownItem = {
  label: string
  onClick: () => void
}

type BaseDropdownProps = {
  items: DropdownItem[]
  children: ReactNode
}

export default function BaseDropdown({items, children}: BaseDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        {items.map((item, index) => (
          <DropdownMenuItem key={index} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
