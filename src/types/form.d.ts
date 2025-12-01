/** Form props */
export type FormProps<T extends FieldValues = FieldValues> = {
  /** React node(s) to be rendered inside the dialog */
  form: UseFormReturn<T>;

  /** Function to handle form submission */
  onSubmit: SubmitHandler<T>;

  /**
   * Loading state of the form
   */
  isLoading?: boolean;

  /**
   * If true, the form will not render the submit button
   */
  noBtn?: boolean;
};

/**
 * Form hook result type
 */
export type FormHookResult<T extends FieldValues = FieldValues> = FormProps<T>;
