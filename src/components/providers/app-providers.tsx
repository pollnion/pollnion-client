"use client";

import { ThemeProvider } from "./theme-provider";
import { Children, Element } from "@/types/global";

export const AppProviders: React.FC<{ children: Children }> = ({
  children,
}): Element => {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
