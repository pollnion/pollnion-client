import { Children } from "@/types/global";
import React from "react";
import useSignIn from "@/store/auth/use-sign-in";
import AuthGuardDialog from "../shared/dialog/auth-guard-dialog";
import { useToggle } from "@/store/ui/use-toggle";
import useSignUp from "@/store/auth/use-sign-up";

interface AuthContextProps {
  isAuth: boolean;
  toggleAuthGuard: (action?: () => void) => void;
}

const AuthContextValues = {
  isAuth: false,
  toggleAuthGuard: () => {},
};

export const AuthContext = React.createContext(
  AuthContextValues as AuthContextProps
);

const AuthProvider = ({ children }: { children: Children }) => {
  const isAuth = false;
  const signInProps = useSignIn();
  const signUpProps = useSignUp();
  const toggleProps = useToggle();

  const toggleAuthGuard = (action?: () => void) => {
    const { toggle } = toggleProps || {};
    if (!isAuth) return toggle();
    return action && action();
  };

  return (
    <AuthContext.Provider value={{ isAuth, toggleAuthGuard }}>
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
