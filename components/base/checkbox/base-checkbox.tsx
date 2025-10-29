import React from 'react'
import map from 'lodash/map'
import {Label} from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'

const BaseCheckbox = ({
  items,
  value,
  onChange,
}: {
  value: string | Date
  onChange: (item: string) => void
  items: {label: string; value: string}[]
}) => {
  return (
    <RadioGroup
      className="flex flex-row"
      value={value as string}
      onValueChange={onChange}
    >
      {map(items, (item, idx) => {
        const {label, value} = item || {}

        return (
          <div key={idx} className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={idx.toString()} />
            <Label htmlFor={idx.toString()}>{label}</Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}

export default BaseCheckbox
