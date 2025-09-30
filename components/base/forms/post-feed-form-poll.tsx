'use client'

import React from 'react'
import BaseInput from '../inputs/base-input'
import {useFieldArray, useFormContext} from 'react-hook-form'

import BaseFormItem from './base-form-item'
import {FormField} from '@/components/ui/form'

const PosteFeedFormPoll = () => {
  const {control} = useFormContext()
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'polls',
  })

  return (
    <div className="space-y-2">
      {fields.map((field, idx) => (
        <FormField
          key={field.id}
          control={control}
          name={`polls.${idx}.label`}
          render={({field}) => (
            <BaseFormItem>
              <BaseInput
                {...field}
                placeholder={`Add poll ${idx + 1}`}
                readOnly
                tabIndex={-1}
                onFocus={(e) => {
                  e.currentTarget.removeAttribute('readonly')
                  e.currentTarget.tabIndex = 0
                }}
                withButton={
                  idx === 0 && fields.length > 1
                    ? undefined
                    : {
                        type: 'button',
                        disabled:
                          (fields.length === 5 && idx === 4) ||
                          (idx === 0 && fields.length > 1),
                        label: idx === fields.length - 1 ? 'Add' : 'Remove',
                        onClick:
                          idx === fields.length - 1
                            ? () => append({label: ''})
                            : () => remove(idx),
                      }
                }
              />
            </BaseFormItem>
          )}
        />
      ))}
    </div>
  )
}

export default PosteFeedFormPoll
