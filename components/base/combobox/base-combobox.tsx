'use client'

import React from 'react'
import {Check, ChevronsUpDown} from 'lucide-react'
import {useFieldArray, useFormContext} from 'react-hook-form'

import {cn} from '@/lib/utils'
import {useToggle} from '@/store/useToggle'
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
import {useSearch} from '@/store/useSearch'

type FormValues = {
  tags: AnyObject[]
}

type BaseComboboxProps = {
  data: AnyObject[]
  isLoading?: boolean
  searchable?: boolean
}

const BaseCombobox = ({
  data,
  isLoading = false,
  searchable = true,
}: BaseComboboxProps) => {
  const {val, setVal} = useSearch()
  const {open, setOpen} = useToggle()

  const {control} = useFormContext<FormValues>()
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'tags',
  })

  const toggleItem = (item: AnyObject) => {
    const idx = fields.findIndex((f) => f.value === item.value)

    if (idx >= 0) {
      remove(idx)
    } else {
      append(item) // must match Tag type
    }
  }

  const displayText =
    fields.length > 0 ? fields.map((f) => f.label).join(', ') : 'Select items...'

  const filteredData = searchable
    ? data.filter((item) => item.label.toLowerCase().includes(val.toLowerCase()))
    : data

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          aria-expanded={open}
          role="combobox"
          variant="outline"
          className="w-full justify-between border-none"
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
            value={searchable ? val : undefined}
            onValueChange={searchable ? (v) => setVal(v) : undefined}
          />

          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => {
                const isSelected = fields.some((f) => f.value === item.value)
                return (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => toggleItem(item)}
                    disabled={
                      (fields.length >= 3 && !isSelected) ||
                      (fields.length === 1 && isSelected)
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
