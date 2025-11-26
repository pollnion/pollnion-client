"use client";
import React from "react";
import { useProtectedRoute } from "@/store/auth/use-protected-routes";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthReady } = useProtectedRoute();
  if (!isAuthReady) return null;

  return children;
};

export default Layout;
