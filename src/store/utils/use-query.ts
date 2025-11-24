"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // convert router params → editable object
  const getParams = () => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  // update or add params
  const pushQuery = (
    newParams: Record<string, string | number | undefined>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`?${params.toString()}`);
  };

  // remove one or more params
  const removeQuery = (...keys: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((k) => params.delete(k));
    router.push(`?${params.toString()}`);
  };

  return {
    query: getParams(),
    pushQuery,
    removeQuery,
  };
}
