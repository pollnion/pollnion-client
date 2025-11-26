"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  authFormSchema,
  authFormDefaultValues,
  type AuthFormValues,
} from "@/schemas/auth/auth-schemas";
import { notify } from "@/lib";
import { useLoading } from "../ui";
import { supabase } from "@/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { useGetResponse } from "../utils/use-get-response";

const SUCCESS_SIGNUP_MESSAGE =
  "Sign-up successful! Please check your email to verify your account.";

/**
 * Hook for managing sign-up form state and submission
 * @returns Form instance and submit handler
 */
const useSignUp = () => {
  const loadingProps = useLoading();
  const getResponse = useGetResponse();

  const form = useForm<AuthFormValues>({
    defaultValues: authFormDefaultValues,
    resolver: zodResolver(authFormSchema),
    shouldFocusError: false,
  });

  async function onSubmit(values: AuthFormValues) {
    loadingProps?.start();

    try {
      const response = await supabase.auth.signUp({
        email: values.email.trim().toLowerCase(),
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      // * create user profile after successful sign-up
      if (response.data.user) {
        await supabase.from("profiles").insert({ ...response.data.user });
      }

      // store for external usage
      getResponse.setData({ ...response.data });

      // inject into react-hook-form
      if (response.error?.code) {
        form.setError("root.serverError", {
          message: response.error.code,
        });
      }
    } catch (error) {
      const message = (error as PostgrestError)?.message ?? "Unknown error";
      form.setError("root.serverError", { message });
    } finally {
      notify.success(SUCCESS_SIGNUP_MESSAGE);
      loadingProps?.stop();
    }
  }

  return {
    form,
    onSubmit,
    data: getResponse.data,
    isLoading: loadingProps?.isLoading,
  };
};

export default useSignUp;
