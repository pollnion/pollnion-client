/** Form props */
export type FormProps<T extends FieldValues = FieldValues> = {
  /** React node(s) to be rendered inside the dialog */
  form: UseFormReturn<T>;

  /** Function to handle form submission */
  onSubmit: SubmitHandler<T>;
};

/**
 * Form hook result type
 */
export type FormHookResult<T extends FieldValues = FieldValues> = FormProps<T>;
