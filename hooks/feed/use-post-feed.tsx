import {z} from 'zod'
import {v4 as uuid} from 'uuid'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import {useAuth} from '../providers/use-auth'
import {useCreateStore} from '@/store/actions/use-create-store'
import {notify} from '@/lib/sonner'

export const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  description: z
    .string()
    .max(300, 'Description must be at most 300 characters')
    .optional()
    .or(z.literal('')),
  tags: z
    .array(z.object({label: z.string(), value: z.string()}))
    .min(1, 'At least one tag is required'),
  polls: z
    .array(
      z.object({
        label: z
          .string()
          .min(1, 'Poll option cannot be empty')
          .min(2, 'Poll must be at least 2 characters')
          .max(25, 'Poll must be at most 25 characters'),
      })
    )
    .min(2, 'At least two polls are required'),
  status: z.union([z.string().min(1, 'Status is required'), z.date()]),
})

const parse = (data: AnyObject, user: AnyObject) => {
  return {
    id: uuid(),
    author: {
      id: user?.id || '',
      name: user?.identities[0]?.identity_data?.name || '',
      status: 'normal',
    },
    created_at: new Date().toISOString(),
    content: {
      space: data.tags || 'general',
      title: data.title,
      description: data.description || '',
    },
    poll: {
      status: data.status || 'open',
      totalVotes: 0,
      question: 'Vote your favorite option:',
      options: data.polls.map(
        (poll: {id: string; label: string; votes: number}, index: number) => ({
          id: `opt${index + 1}`,
          label: poll.label,
          votes: 0,
        })
      ),
    },
    engagements_count: {
      likes: 0,
      comments: 0,
    },
  }
}

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {
  title: '',
  status: 'open',
  description: '',
  polls: [{label: ''}, {label: ''}],
  tags: [{label: 'Hypothetical', value: '2'}],
}

const fields = {defaultValues, resolver: zodResolver(schema), shouldFocusError: false}

const usePostFeed = (callback: () => void) => {
  const {isAuth} = useAuth()
  const store = useCreateStore('feed')
  const form = useForm<FormValues>(fields)

  const onSubmit = async (values: FormValues) => {
    try {
      await store.onSubmit(parse(values, isAuth as AnyObject))
    } finally {
      notify.success('Created successfully!')
      if (callback) callback()
    }

    // callback
  }

  return {form, onSubmit, isLoading: store.isLoading}
}

export default usePostFeed
