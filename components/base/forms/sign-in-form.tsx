'use client'

import {z} from 'zod'
import React from 'react'
import {UseFormReturn} from 'react-hook-form'
import BaseInput from '../inputs/base-input'
import {schema} from '@/hooks/auth/use-sign-in'
import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'

type FormValues = z.infer<typeof schema>

type SignInFormProps = {
  form: UseFormReturn<FormValues>
}

const SignInForm = ({form}: SignInFormProps) => {
  return (
    <React.Fragment>
      <FormField
        name="email"
        control={form.control}
        render={({field}) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <BaseInput type="email" {...field} />
            </FormControl>
            <FormDescription>This will be your login email.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </React.Fragment>
  )
}

export default SignInForm
