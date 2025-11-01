import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authFormSchema,
  authFormDefaultValues,
  type AuthFormValues,
} from "./schemas";

/**
 * Hook for managing sign-in form state and submission
 * @returns Form instance and submit handler
 */
const useSignIn = () => {
  const form = useForm<AuthFormValues>({
    defaultValues: authFormDefaultValues,
    resolver: zodResolver(authFormSchema),
    shouldFocusError: false,
  });

  function onSubmit(values: AuthFormValues) {
    console.log("Sign in:", values);
  }

  return { onSubmit, form };
};

export default useSignIn;
