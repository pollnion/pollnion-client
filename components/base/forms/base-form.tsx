import React, {ReactNode} from 'react'
import {Form} from '@/components/ui/form'
import {FieldValues, SubmitHandler, UseFormReturn} from 'react-hook-form'

type BaseFormProps<T extends FieldValues = FieldValues> = {
  children: ReactNode
  form: UseFormReturn<T>
  onSubmit?: SubmitHandler<T>
}

const BaseForm = <T extends FieldValues>({
  children,
  form,
  onSubmit,
}: BaseFormProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit ? form.handleSubmit(onSubmit) : (e) => e.preventDefault()}
        className="space-y-8"
      >
        {children}
      </form>
    </Form>
  )
}

export default BaseForm
