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
import { omit } from "lodash";

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
      const email = values.email.trim().toLowerCase();

      // Check if email already exists in profiles
      const { data: existingProfiles, error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .maybeSingle(); // returns null if no row

      if (fetchError) {
        throw fetchError;
      }

      if (existingProfiles) {
        // Email already exists
        form.setError("email", {
          type: "manual",
          message: "Email already registered. Please log in instead.",
        });
        return; // stop the signup flow
      }

      // Proceed with Supabase Auth signup
      const response = await supabase.auth.signUp({
        email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      // Create profile after successful sign-up
      if (response.data.user) {
        await supabase.from("profiles").insert(
          omit(
            {
              id: response.data.user.id,
              email: response.data.user.email,
              // Optional: include metadata fields you want
            },
            "app_metadata"
          )
        );
      }

      // inject server-side error
      if (response.error?.code) {
        form.setError("root.serverError", {
          message: response.error.code,
        });
      }

      // store for external usage
      getResponse.setData({ ...response.data });
      notify.success(SUCCESS_SIGNUP_MESSAGE);
      return;
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
    data: getResponse.data,
    isLoading: loadingProps?.isLoading,
  };
};

export default useSignUp;
