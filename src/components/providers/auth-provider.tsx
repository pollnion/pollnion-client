import { Children } from "@/types/global";
import React from "react";

interface AuthContextProps {
  isAuth: boolean;
}

const AuthContextValues = {
  isAuth: false,
};

export const AuthContext = React.createContext(
  AuthContextValues as AuthContextProps
);

const AuthProvider = ({ children }: { children: Children }) => {
  const isAuth = false;

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
