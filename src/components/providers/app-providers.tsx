"use client";

import UIProvider from "./ui-provider";
import AuthProvider from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { Children, Element } from "@/types/global";

export const AppProviders: React.FC<{ children: Children }> = ({
  children,
}): Element => {
  return (
    <AuthProvider>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <UIProvider>{children}</UIProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
