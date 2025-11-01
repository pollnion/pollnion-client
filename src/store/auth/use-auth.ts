import { useContext } from "react";
import { AuthContext } from "@/components/providers/auth-provider";

/**
 * Hook to access authentication context.
 *
 * Provides access to the current authentication state and related functions
 * from the AuthProvider. Must be used within an AuthProvider component tree.
 *
 * @returns The authentication context value from AuthProvider
 * @throws Will throw an error if used outside of AuthProvider
 *
 * @example
 * const { user, signIn, signOut } = useAuth();
 *
 * if (!user) {
 *   return <LoginForm onSubmit={signIn} />;
 * }
 */
const useAuth = () => useContext(AuthContext);

export default useAuth;
