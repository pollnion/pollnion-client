import { Children, OpenProps } from "./global";

/** Common dialog/modal props */
export interface DialogProps<T = FieldValues> extends OpenProps {
  /** Function to toggle the dialog open/close state */
  toggle: () => void;

  /** Type of dialog, e.g., 'sign-in', 'sign-up', etc. */
  type: string;

  /** Title text for the dialog */
  title: string;

  /** Optional description text for the dialog */
  description?: string;

  /** React node(s) to be rendered inside the dialog */
  form?: UseFormReturn<T>;

  /** Function to handle form submission */
  onSubmit?: SubmitHandler<T>;

  /** Props for the ok/confirm button */
  onOkProps?: ButtonProps;

  /** Additional className for the dialog container */
  className?: ClassNameValue;

  /** Props for the cancel button */
  onCancelProps?: ButtonProps;

  /** Child elements to be rendered inside the dialog */
  children: Children;
}
