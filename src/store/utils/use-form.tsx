/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Resolver,
  FieldValues,
  UseFormReturn,
  useForm as useRHAForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UseFormReturnWithLoading<T extends FieldValues> = UseFormReturn<T> & {
  isLoading: boolean;
};

export const useForm = <T extends FieldValues = any>(
  defaultValues: any,
  schema: z.ZodSchema
): UseFormReturnWithLoading<T> => {
  const form = useRHAForm<T>({
    defaultValues: defaultValues as any,
    resolver: zodResolver(schema as any) as Resolver<T>,
    shouldFocusError: false,
  });

  const isLoading = form.formState.isSubmitting;

  return { ...form, isLoading } as unknown as UseFormReturnWithLoading<T>;
};
