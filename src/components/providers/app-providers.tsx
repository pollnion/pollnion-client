"use client";

import { FC } from "react";
import { Children } from "@/types";
import UIProvider from "./ui-provider";
import AuthProvider from "./auth-provider";
import ShareProvider from "./share-provider";
import { ThemeProvider } from "./theme-provider";

// Type for any provider that accepts children
type ProviderComponent = FC<{ children: Children }>;

// Compose providers
const providers: ProviderComponent[] = [
  AuthProvider,
  ({ children }) => (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  ),
  ShareProvider,
  UIProvider,
];

export const AppProviders: FC<{ children: Children }> = ({
  children,
}): Children =>
  providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
