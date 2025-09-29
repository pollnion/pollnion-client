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
            <Textarea placeholder="Enter your description" {...field} />
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
    </div>
  )
}

export default PostFeedForm
