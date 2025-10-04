import {z} from 'zod'
import React from 'react'
import {UseFormReturn} from 'react-hook-form'

import BaseFormItem from './base-form-item'
import BaseInput from '../inputs/base-input'
import {FormField} from '@/components/ui/form'
import {Textarea} from '@/components/ui/textarea'
import {schema} from '@/hooks/feed/use-post-feed'
import useGetTags from '@/hooks/feed/use-get-tags'
import BaseCombobox from '../combobox/base-combobox'
import PosteFeedFormPoll from './post-feed-form-poll'
import BaseCheckbox from '../checkbox/base-checkbox'
import BaseDatePicker from '../date/base-date-picker'

type FormValues = z.infer<typeof schema>

const PostFeedForm = ({form}: {form: UseFormReturn<FormValues>}) => {
  const tagsProps = useGetTags()

  return (
    <div className="space-y-4">
      <FormField
        name="title"
        control={form.control}
        render={({field}) => (
          <BaseFormItem label="Title *">
            <BaseInput type="text" placeholder="Enter your title *" {...field} />
          </BaseFormItem>
        )}
      />

      <FormField
        name="description"
        control={form.control}
        render={({field}) => (
          <BaseFormItem label="Description">
            <Textarea
              placeholder="Enter your description"
              readOnly
              tabIndex={-1}
              className="border-none"
              onFocus={(e) => {
                e.currentTarget.removeAttribute('readonly')
                e.currentTarget.tabIndex = 0
              }}
              {...field}
            />
          </BaseFormItem>
        )}
      />

      <FormField
        name="tags"
        control={form.control}
        render={({field}) => (
          <BaseFormItem label="Tags" description="You can only select up to 3 tags">
            <BaseCombobox {...field} {...tagsProps} />
          </BaseFormItem>
        )}
      />

      <FormField
        name="polls"
        control={form.control}
        render={() => (
          <BaseFormItem label="Polls *" description="You can add polls up to 5">
            <PosteFeedFormPoll />
          </BaseFormItem>
        )}
      />

      <FormField
        name="status"
        control={form.control}
        render={({field}) => {
          const handleChange = (val: string) => {
            if (val === 'date') {
              const tomorrow = new Date()
              tomorrow.setHours(0, 0, 0, 0)
              tomorrow.setDate(tomorrow.getDate() + 1)

              field.onChange(tomorrow)
            } else {
              field.onChange('never')
            }
          }

          return (
            <BaseFormItem label="Poll Status" description="Sets the duration of poll">
              <div className="space-y-4">
                <BaseCheckbox
                  items={[
                    {label: 'Open until', value: 'date'},
                    {label: 'Never close', value: 'never'},
                  ]}
                  value={typeof field.value === 'string' ? field.value : 'date'}
                  onChange={handleChange}
                />

                {field.value instanceof Date && <BaseDatePicker {...field} />}
              </div>
            </BaseFormItem>
          )
        }}
      />
    </div>
  )
}

export default PostFeedForm
