"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authFormSchema,
  authFormDefaultValues,
  type AuthFormValues,
} from "@/schemas/auth/auth-schemas";
import { useLoading } from "../ui";
import { supabase } from "@/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import { useGetResponse } from "../utils/use-get-response";

const useSignIn = () => {
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
      const response = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      // store for external usage
      getResponse.setData({ ...response.data });

      // inject into react-hook-form
      if (response.error?.code) {
        form.setError("root.serverError", {
          message: response.error.code, // will show up under formState.errors.root.serverError
        });
        return;
      }

      window.location.reload();
    } catch (error) {
      const message = (error as PostgrestError)?.message ?? "Unknown error";
      form.setError("root.serverError", { message });
    } finally {
      loadingProps?.stop();
    }
  }

  return {
    form,
    onSubmit,
    isLoading: loadingProps?.isLoading,
  };
};

export default useSignIn;
