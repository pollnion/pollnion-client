import React from "react";
import { create } from "zustand";
import { isEmpty } from "lodash";

// misc
import { notify } from "@/lib";
import { useLoading } from "@/store";
import { Children } from "@/types/global";

// supabase
import { supabase } from "@/supabase/client";
import { User } from "@supabase/supabase-js";

// store
import useSignIn from "@/store/auth/use-sign-in";
import useSignUp from "@/store/auth/use-sign-up";
import { useToggle } from "@/store/ui/use-toggle";

// comps
import { Typography } from "../custom/typography";
import AuthGuardDialog from "../shared/dialog/auth-guard-dialog";
import { LottieLoadingPlayer } from "../shared/lottie/lottie-loading-player";

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

  const [initialize, setInitialized] = React.useState(true);

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
        options: { redirectTo: window.location.origin },
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
   * Fetches the current user session from Supabase
   */
  const fetchSession = async () => {
    try {
      await new Promise((res) => setTimeout(res, 200));
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Session fetch error:", error);
      setUser(data.session?.user ?? null);
    } finally {
      setInitialized(false);
    }
  };

  /**
   * Effect to initialize auth state on component mount
   */
  React.useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user: User | null } | null) => {
        setUser(session?.user ?? null);
        setInitialized(true);
      }
    );

    return () => authListener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth: !isEmpty(user),
        isLoading: loadingProps?.isLoading,
        handleSignOut,
        toggleAuthGuard,
        handleGoogleLogin,
      }}
    >
      {initialize && (
        <div className="dark flex min-h-screen flex-col items-center justify-center bg-background">
          <LottieLoadingPlayer />
          <Typography variant="muted">Please wait for a moment...</Typography>
        </div>
      )}

      {!initialize && children}

      <AuthGuardDialog
        signInProps={signInProps}
        signUpProps={signUpProps}
        {...toggleProps}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
