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
        // Wait for Supabase to process the auth callback
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          setError(sessionError.message);
          return;
        }

        if (!session) {
          // Check for hash params (OAuth flow)
          const hashParams = new URLSearchParams(window.location.hash.slice(1));
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          // Check for query params (PKCE flow - more common on mobile)
          const queryParams = new URLSearchParams(window.location.search);
          const code = queryParams.get("code");

          if (accessToken && refreshToken) {
            // Manually set session if needed
            const { error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (setSessionError) {
              console.error("Set session error:", setSessionError);
              setError(setSessionError.message);
              return;
            }
          } else if (code) {
            // PKCE flow - exchange code for session
            const { error: exchangeError } =
              await supabase.auth.exchangeCodeForSession(code);

            if (exchangeError) {
              console.error("Exchange code error:", exchangeError);
              setError(exchangeError.message);
              return;
            }
          } else {
            // No valid auth data found
            setError(
              "No authentication data found. Please try logging in again."
            );
            return;
          }
        }

        // Get the user after session is established
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User error:", userError);
          setError("Failed to retrieve user information");
          return;
        }

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

        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
        }

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
            // Don't block the redirect on profile creation failure
          }
        }

        // Redirect to home
        router.push("/");
      } catch (err) {
        console.error("Callback error:", err);
        setError("An unexpected error occurred during authentication");
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
