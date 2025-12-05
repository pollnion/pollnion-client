import { FieldValues } from "react-hook-form";
import { FormProps } from "./form";
import { Children, OpenProps } from "./global";
import { ButtonProps } from "@/components/ui/button";
import { ClassNameValue } from "tailwind-variants";

/// Toggle function type
type Toggle = () => void;

/** Common dialog/modal props */
export interface DialogProps<T extends FieldValues = FieldValues>
  extends OpenProps, FormProps<T> {
  /** Function to toggle the dialog open/close state */
  toggle: () => void;

  /** Type of dialog, e.g., 'sign-in', 'sign-up', etc. */
  type?: string;

  /** Title text for the dialog */
  title?: string;

  /** Optional description text for the dialog */
  description?: string;

  /** Props for the ok/confirm button */
  onOkProps?: ButtonProps;

  /** Additional className for the dialog container */
  className?: ClassNameValue;

  /** Props for the cancel button */
  onCancelProps?: ButtonProps;

  /** Child elements to be rendered inside the dialog */
  children?: Children;
}

/** Base dialog type (no form or submit handlers) */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BaseDialogProps<
  T extends FieldValues = FieldValues,
> extends Omit<DialogProps<T>, "form" | "onSubmit"> {}

export interface SheetProps extends OpenProps {
  /** Function to toggle the sheet open/close state */
  toggle: () => void;

  /** Additional className for the dialog container */
  className?: ClassNameValue;

  /** Title text for the dialog */
  title?: string;

  /** Optional description text for the dialog */
  description?: string;

  /** Child elements to be rendered inside the dialog */
  children?: Children;

  /** Child elements to be rendered inside the dialog */
  footer?: JSX.Element;

  /** Side from which the sheet will appear */
  side?: "top" | "right" | "bottom" | "left";
}
