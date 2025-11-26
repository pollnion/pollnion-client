"use client";

import { useEffect } from "react";

import useAuth from "./use-auth";
import { useRouter } from "next/navigation";

export const useProtectedRoute = () => {
  const router = useRouter();
  const { isAuth, isLoading } = useAuth();

  // handle redirect
  useEffect(() => {
    if (!isLoading && !isAuth) {
      router.push("/");
    }
  }, [isAuth, isLoading, router]);

  // ready when done loading + user is authenticated
  const isAuthReady = !isLoading && !!isAuth;

  return { isAuthReady, isAuth };
};
