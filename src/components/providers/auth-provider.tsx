import React from "react";
import { create } from "zustand";

// misc
import { notify } from "@/lib";
import { useLoading } from "@/store";
import { Children } from "@/types/global";
import { generateUsername } from "@/lib/username-generator";

// supabase
import { supabase } from "@/supabase/client";
import { User } from "@supabase/supabase-js";

// store
import useSignIn from "@/store/auth/use-sign-in";
import useSignUp from "@/store/auth/use-sign-up";
import { useToggle } from "@/store/ui/use-toggle";

// comps
import AuthGuardDialog from "../shared/dialog/auth-guard-dialog";

interface AuthContextProps {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  handleSignOut: () => void;
  handleGoogleLogin: () => void;
  toggleAuthGuard: (action?: () => void) => void;
}

const AuthContextValues = {
  user: null,
  isAuth: false,
  isLoading: false,
  handleSignOut: () => {},
  toggleAuthGuard: () => {},
  handleGoogleLogin: () => {},
};

export const AuthContext = React.createContext(
  AuthContextValues as AuthContextProps
);

// Zustand store
type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

const AuthProvider = ({ children }: { children: Children }) => {
  const { user, setUser } = useUserStore();
  const signInProps = useSignIn();
  const signUpProps = useSignUp();
  const toggleProps = useToggle();

  const [isInitializing, setIsInitializing] = React.useState(true);

  // auth actions loading state
  const loadingProps = useLoading();

  const toggleAuthGuard = (action?: () => void) => {
    const { toggle } = toggleProps || {};
    if (!user) return toggle();
    return action && action();
  };

  /**
   * Handles Google OAuth login process
   */
  const handleGoogleLogin = async () => {
    loadingProps?.start();
    try {
      await new Promise((res) => setTimeout(res, 500));
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) notify.error(`Login error: ${error.message || error}`);
    } finally {
      loadingProps?.stop();
    }
  };

  /**
   * Handles user sign-out process
   */
  const handleSignOut = async () => {
    loadingProps?.start();
    try {
      await new Promise((res) => setTimeout(res, 500));
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      notify.error(`Sign out error: ${error}`);
    } finally {
      loadingProps?.stop();
    }
  };

  /**
   * Updates user metadata with generated username if not exists
   */
  const ensureUsername = async (user: User) => {
    // Check if user already has a username in metadata
    if (user.user_metadata?.username) return;

    try {
      const username = generateUsername(user.email);

      // Update user metadata with generated username
      await supabase.auth.updateUser({
        data: {
          username,
          display_name: user.user_metadata?.full_name || username,
        },
      });
    } catch (error) {
      console.error("Failed to set username:", error);
    }
  };

  /**
   * Fetches the current user session from Supabase
   */
  const fetchSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Session fetch error:", error);

      const currentUser = data.session?.user ?? null;

      // Ensure user profile exists in 'profiles' table
      if (currentUser) {
        // Generate and set username if user doesn't have one (for OAuth users)
        await ensureUsername(currentUser);

        // Re-fetch user after potential metadata update
        const { data: userData } = await supabase.auth.getUser();
        const updatedUser = userData?.user ?? currentUser;

        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", updatedUser.id)
          .maybeSingle();

        // * Create user profile if not existing
        if (!existingProfile) {
          const profileData = {
            id: updatedUser.id,
            email: updatedUser.email,
            username: updatedUser.user_metadata?.username || null,
            display_name:
              updatedUser.user_metadata?.display_name ||
              updatedUser.user_metadata?.full_name ||
              null,
            avatar_url: updatedUser.user_metadata?.avatar_url || null,
          };

          const { data: upsertedProfile, error: upsertError } = await supabase
            .from("profiles")
            .upsert(profileData)
            .select();

          if (upsertError) {
            console.error("Failed to create profile:", {
              error: upsertError,
              message: upsertError.message,
              details: upsertError.details,
              hint: upsertError.hint,
              code: upsertError.code,
            });
          } else {
            console.log("Profile created successfully:", upsertedProfile);
          }
        }

        setUser(updatedUser);
      } else {
        setUser(null);
      }
    } finally {
      setIsInitializing(false);
    }
  };

  /**
   * Clean up URL hash/query params containing auth tokens
   */
  const cleanupAuthParams = () => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);

    // Remove hash fragments with access_token
    if (url.hash.includes("access_token")) {
      url.hash = "";
    }

    // Remove query params with access_token
    if (url.searchParams.has("access_token")) {
      url.searchParams.delete("access_token");
      url.searchParams.delete("refresh_token");
      url.searchParams.delete("expires_in");
      url.searchParams.delete("token_type");
    }

    // Update URL without reload if there were changes
    if (url.toString() !== window.location.href) {
      window.history.replaceState({}, document.title, url.toString());
    }
  };

  /**
   * Effect to initialize auth state on component mount
   */
  React.useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: { user: User | null } | null) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        // Generate and set username for new sign-ins
        if (currentUser) {
          await ensureUsername(currentUser);
        }

        // Clean up auth params from URL after sign in
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          cleanupAuthParams();
        }
      }
    );

    // Also clean up on initial load if there are auth params
    cleanupAuthParams();

    return () => authListener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = !!isInitializing || loadingProps?.isLoading;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isLoading,
        isAuth: Boolean(user),
        handleSignOut,
        toggleAuthGuard,
        handleGoogleLogin,
      }}
    >
      {children}

      <AuthGuardDialog
        signInProps={signInProps}
        signUpProps={signUpProps}
        {...toggleProps}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
