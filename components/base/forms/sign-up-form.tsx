'use client'

import {z} from 'zod'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {UseFormReturn} from 'react-hook-form'

import PassChecker from './pass-checker'
import BaseFormItem from './base-form-item'
import BaseInput from '../inputs/base-input'
import {FormField} from '@/components/ui/form'
import BaseButton from '../buttons/base-button'
import {schema} from '@/hooks/auth/use-sign-in'
import {Separator} from '@/components/ui/separator'
import {TypographyMuted} from '../typography/base-typography'

type FormValues = z.infer<typeof schema>

type SignUpFormProps = {
  form: UseFormReturn<FormValues>
  toggleType: (type: string) => void
  passwordReq: (password: string) => {text: string; match: boolean}[]
}

const SignUpForm = ({form, toggleType, passwordReq}: SignUpFormProps) => {
  return (
    <div className="space-y-4">
      <BaseButton variant="outline" className="w-full">
        <FcGoogle />
        Sign up with Google
      </BaseButton>

      <div className="flex items-center justify-center space-x-4">
        <Separator orientation="horizontal" className="flex-1" />
        <div className="shrink-0">or</div>
        <Separator orientation="horizontal" className="flex-1" />
      </div>

      <FormField
        name="email"
        control={form.control}
        render={({field}) => (
          <BaseFormItem>
            <BaseInput type="email" placeholder="Enter your email" {...field} />
          </BaseFormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <BaseFormItem>
            <BaseInput id="password" placeholder="Enter your password" {...field} />
          </BaseFormItem>
        )}
      />

      <PassChecker form={form} passwordReq={passwordReq} />

      <div className="flex space-x-2">
        <TypographyMuted>Have an account already?</TypographyMuted>{' '}
        <TypographyMuted
          className="text-white hover:underline hover:cursor-pointer"
          onClick={() => toggleType('sign_in')}
        >
          Sign in here
        </TypographyMuted>
      </div>
    </div>
  )
}

export default SignUpForm
