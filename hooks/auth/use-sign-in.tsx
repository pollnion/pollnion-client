import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

export const schema = z.object({
  email: z
    .string()
    .min(1, {message: 'Email is required.'})
    .email({message: 'Please enter a valid email address.'}),
})

type FormValues = z.infer<typeof schema>

const defaultValues: FormValues = {email: ''}

const fields = {
  defaultValues,
  resolver: zodResolver(schema),
}

const useSignIn = () => {
  const form = useForm<FormValues>(fields)

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return {onSubmit, form}
}

export default useSignIn
