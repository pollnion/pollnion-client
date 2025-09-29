'use client'

import React, {useState} from 'react'
import {Check, ChevronsUpDown} from 'lucide-react'

import {cn} from '@/lib/utils'
import {Button} from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

type ComboboxItem = {
  value: string
  label: string
}

type BaseComboboxProps<T extends ComboboxItem> = {
  data: T[]
  value?: T[] // supports multi-select
  onChange?: (value: T[]) => void
  isLoading?: boolean
  searchable?: boolean
}

const BaseCombobox = <T extends ComboboxItem>({
  data,
  value = [],
  onChange,
  isLoading = false,
  searchable = true,
}: BaseComboboxProps<T>) => {
  const [open, setOpen] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const toggleItem = (item: T): void => {
    const isSelected = value.some((v) => v.value === item.value)

    const newValue = isSelected
      ? value.filter((v) => v.value !== item.value)
      : [...value, item]

    onChange?.(newValue)
  }

  const displayText: string =
    value.length > 0 ? value.map((v) => v.label).join(', ') : 'Select items...'

  // Apply filtering only if "searchable" mode is on
  const filteredData: T[] = searchable
    ? data.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
    : data

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          aria-expanded={open}
          role="combobox"
          variant="outline"
          className="w-full justify-between"
        >
          {displayText}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search item..."
            className="h-9"
            value={searchable ? searchValue : undefined}
            onValueChange={searchable ? setSearchValue : undefined}
          />

          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item: T) => {
                const isSelected = value.some((v) => v.value === item.value)
                return (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => toggleItem(item)}
                    disabled={
                      (value.length >= 3 && !isSelected) ||
                      (value.length === 1 && isSelected)
                    }
                  >
                    {item.label}
                    <Check
                      className={cn('ml-auto', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default BaseCombobox
