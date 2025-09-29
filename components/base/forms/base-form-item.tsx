import React from 'react'
import {
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from '@/components/ui/form'

const BaseFormItem = ({
  label,
  children,
  description,
}: {
  label?: string
  children: Children
  description?: string
}) => {
  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

export default BaseFormItem
