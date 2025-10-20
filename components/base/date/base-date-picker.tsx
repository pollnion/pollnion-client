'use client'

import * as React from 'react'
import {format} from 'date-fns'
import {Calendar as CalendarIcon} from 'lucide-react'

import {useToggle} from '@/store/useToggle'
import {Button} from '@/components/ui/button'
import {Calendar} from '@/components/ui/calendar'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'

const BaseDatePicker = ({
  value,
  onChange,
}: {
  value: Date | string
  onChange: (item: Date) => void
}) => {
  const {open, setOpen} = useToggle()

  const handleSelect = (date: Date) => {
    onChange(date)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal border-none"
        >
          <CalendarIcon />
          {value instanceof Date ? format(value, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          required
          mode="single"
          selected={value as Date}
          onSelect={handleSelect}
          disabled={(date) => {
            const today = new Date()
            today.setHours(0, 0, 0, 0) // strip time
            return date <= today
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default BaseDatePicker
