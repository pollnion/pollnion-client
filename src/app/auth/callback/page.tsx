"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import { Typography } from "@/components/custom/typography";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from the URL
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const code = hashParams.get("code");

        if (code) {
          // Exchange the code for a session
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            setError(error.message);
            return;
          }

          // Verification successful, redirect to home
          router.push("/");
        } else {
          setError("No verification code found");
        }
      } catch (err) {
        setError("An unexpected error occurred");
        console.error(err);
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Typography className="text-xl font-semibold text-destructive">
          Verification Failed
        </Typography>
        <Typography variant="muted">{error}</Typography>
        <button
          onClick={() => router.push("/")}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Spinner className="size-8" />
      <Typography variant="muted">Verifying your email...</Typography>
    </div>
  );
}
