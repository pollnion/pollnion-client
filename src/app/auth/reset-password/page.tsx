"use client";

import { useState, useEffect } from "react";
import { Lock, CheckCircle } from "lucide-react";

import { useLoading } from "@/store";
import { supabase } from "@/supabase/client";
import Input from "@/components/custom/inputs";
import Button from "@/components/custom/button";
import Box from "@/components/custom/layout/box";
import { Typography } from "@/components/custom/typography";
// import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  // const router = useRouter();
  const loadingProps = useLoading();
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const loading = loadingProps.isLoading;
  const disabled = loadingProps.isLoading;

  // Check if user has a valid session
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsSessionReady(true);
      } else {
        setMessage("Invalid or expired reset link. Please request a new one.");
      }
    };
    checkSession();
  }, []);

  /**
   * Handles the form submission for resetting the password.
   * @param e
   * @returns
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSessionReady) {
      setMessage("Session not ready. Please try again.");
      return;
    }

    loadingProps.start();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      loadingProps.stop();
    } else {
      setMessage("Password updated successfully!");
      setSuccess(true);
      loadingProps.stop();

      // // Redirect to home after 5 seconds
      // setTimeout(() => {
      //   router.push("/");
      // }, 5000);
    }
  };

  return (
    <Box color="background" className="max-w-md mx-auto p-6">
      {!success && (
        <>
          {/* Header */}
          <div className="mb-6 text-center">
            <Lock className="mx-auto mb-2 w-12 h-12" />
            <Typography variant="large" className="font-semibold">
              Reset Password
            </Typography>
            <Typography className="text-gray-500 dark:text-gray-400">
              Enter your new password below
            </Typography>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="password"
              placeholder="New password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={!isSessionReady}
              className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              isLoading={loading}
              disabled={disabled || !isSessionReady}
            >
              Reset Password
            </Button>
            {message && (
              <Typography
                className={`text-center ${
                  success
                    ? "text-green-500 dark:text-green-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              >
                {message}
              </Typography>
            )}
          </form>
        </>
      )}

      {success && (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
          <Typography variant="large" className="font-semibold mb-2">
            Password Updated!
          </Typography>
          <Typography className="text-gray-500 dark:text-gray-400">
            Please sign in now. Thanks!
          </Typography>
        </div>
      )}
    </Box>
  );
}
