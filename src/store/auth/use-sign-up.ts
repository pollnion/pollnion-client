import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authFormSchema,
  authFormDefaultValues,
  type AuthFormValues,
} from "@/schemas/auth/auth-schemas";

/**
 * Hook for managing sign-up form state and submission
 * @returns Form instance and submit handler
 */
const useSignUp = () => {
  const form = useForm<AuthFormValues>({
    defaultValues: authFormDefaultValues,
    resolver: zodResolver(authFormSchema),
    shouldFocusError: false,
  });

  function onSubmit(values: AuthFormValues) {
    console.log("Sign up:", values);
  }

  return { onSubmit, form };
};

export default useSignUp;
