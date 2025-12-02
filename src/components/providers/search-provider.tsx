"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/supabase/client";

import { z } from "zod";
import { useForm, useLoading, useToggle } from "@/store";
import { AnyObject, Children } from "@/types";

import SearchDialog from "../shared/dialog/search-dialog";
import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";

const schema = z.object({
  s: z
    .string()
    .min(1, "Search required")
    .max(40, "Search must be 40 characters or less"),
});

const defaultValues = { s: "" };

type AuthFormValues = z.infer<typeof schema>;

export const SearchContext = React.createContext({
  isOpen: false,
  toggle: () => {},
  form: {} as ReturnType<typeof useForm<AuthFormValues>>,
  results: {
    feeds: [] as AnyObject[],
    users: [] as AnyObject[],
    labels: [] as AnyObject[],
  },
  isLoading: false,
  searchValue: "",
});

const SearchProvider = ({ children }: { children: Children }) => {
  const router = useRouter();
  const loadingProps = useLoading();
  const { isOpen, toggle } = useToggle();
  const form = useForm<AuthFormValues>(defaultValues, schema);
  const [results, setResults] = useState({
    feeds: [] as AnyObject[],
    users: [] as AnyObject[],
    labels: [] as AnyObject[],
  });

  const searchValue = form.watch("s");

  const getData = async (query: string) => {
    loadingProps.start();

    if (!query?.trim()) {
      loadingProps.stop();
      return setResults({ feeds: [], users: [], labels: [] });
    }

    const { data, error } = await supabase.rpc("search_all", { query });

    if (error) {
      console.error("Search failed:", error);
      loadingProps.stop();
      return setResults({ feeds: [], users: [], labels: [] });
    }

    setResults(data || { feeds: [], users: [], labels: [] });
    loadingProps.stop();
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization, react-hooks/exhaustive-deps
  const debouncedSearch = useMemo(() => debounce(getData, 500), []);

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  const onSubmit = (values: AuthFormValues) => {
    router.push(`/search?s=${encodeURIComponent(values.s)}`);
  };

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        toggle,
        form,
        results,
        isLoading: loadingProps.isLoading,
        searchValue: searchValue?.trim() || "",
      }}
    >
      {children}

      <SearchDialog
        form={form}
        isOpen={isOpen}
        toggle={toggle}
        onSubmit={onSubmit}
        isLoading={form.isLoading}
      />
    </SearchContext.Provider>
  );
};

export default SearchProvider;
