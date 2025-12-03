"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import { Typography } from "@/components/custom/typography";
import { generateUsername } from "@/lib/username-generator";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check for hash params (OAuth flow)
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const accessToken = hashParams.get("access_token");

        // Check for query params (email verification flow)
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");

        if (accessToken) {
          // OAuth flow - session already handled by Supabase
          // Get user to check if it's their first time
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            // Ensure username is set in user metadata
            if (!user.user_metadata?.username) {
              const username = generateUsername(user.email);
              await supabase.auth.updateUser({
                data: {
                  username,
                  display_name: user.user_metadata?.full_name || username,
                },
              });
            }

            // Check if profile exists (indicates first-time user)
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();

            // If profile doesn't exist, create it
            if (!profile) {
              const profileData = {
                id: user.id,
                email: user.email,
                username:
                  user.user_metadata?.username || generateUsername(user.email),
                display_name:
                  user.user_metadata?.display_name ||
                  user.user_metadata?.full_name ||
                  null,
                avatar_url: user.user_metadata?.avatar_url || null,
              };

              const { error: insertError } = await supabase
                .from("profiles")
                .insert(profileData);

              if (insertError) {
                console.error("Failed to create profile:", insertError);
              }
            }

            // Redirect to home - you can change this to a welcome/onboarding page for first-time users
            router.push("/");
          }
        } else if (code) {
          // Email verification flow
          const { error } = await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            setError(error.message);
            return;
          }

          // Verification successful, redirect to home
          router.push("/");
        } else {
          setError("No authentication credentials found");
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
      <Typography variant="muted">Completing authentication...</Typography>
    </div>
  );
}
