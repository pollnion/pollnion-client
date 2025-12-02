"use client";
import React from "react";
import { Mail, CheckCircle } from "lucide-react";

import { useLoading } from "@/store";
// import { uuidGenerator } from "@/lib";
import { supabase } from "@/supabase/client";
import Input from "@/components/custom/inputs";
import Button from "@/components/custom/button";
import { Box } from "@/components/custom/layout/box";
import { Typography } from "@/components/custom/typography";

/**
 * Generate unique tokens for password reset links
 */
// const ACCESS_TOKEN = uuidGenerator();
// const REFRESH_TOKEN = uuidGenerator();

const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`;

export default function ForgotPasswordPage() {
  const loadingProps = useLoading();
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (values: Record<string, string>) => {
    const { email } = values;
    loadingProps.start();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) console.log("Error sending reset email:", error.message);
    else {
      setSuccess(true);
      loadingProps.stop();
    }
  };

  return (
    <Box color="background" className="max-w-md mx-auto p-6">
      {!success && (
        <>
          {/* Header */}
          <div className="mb-6 text-center">
            <Mail className="mx-auto mb-2 w-12 h-12" />
            <Typography variant="large" className="font-semibold">
              Forgot Password
            </Typography>
            <Typography className="text-gray-500 dark:text-gray-400">
              Enter your email below and we’ll send you a reset link.
            </Typography>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const values = Object.fromEntries(formData.entries()) as Record<
                string,
                string
              >;
              handleSubmit(values);
            }}
          >
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              isLoading={loadingProps.isLoading}
              disabled={loadingProps.isLoading}
            >
              Send Reset Link
            </Button>
          </form>
        </>
      )}

      {success && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          <Typography variant="large" className="font-semibold mb-2">
            Email Sent!
          </Typography>
          <Typography className="text-gray-500 dark:text-gray-400">
            Please check your inbox for the password reset link. Thank you!
          </Typography>
        </div>
      )}
    </Box>
  );
}
