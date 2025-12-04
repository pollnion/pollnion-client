"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/supabase/client";
import { usePathChecker } from "@/lib";
import { usePathname } from "next/navigation";

import { z } from "zod";
import { useForm } from "@/store";
import { Children } from "@/types";
import type { SearchResultRow } from "@/types/search";

import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/lib/localStorage";

const schema = z.object({
  s: z
    .string()
    .min(1, "Search required")
    .max(40, "Search must be 40 characters or less"),
});

const defaultValues = { s: "" };

type AuthFormValues = z.infer<typeof schema>;

const emptyVal: SearchResultRow[] = [
  {
    feeds: [],
    users: [],
    labels: [],
  },
];

interface SearchContextValue {
  form: ReturnType<typeof useForm<AuthFormValues>>;
  results: SearchResultRow[];
  isLoading: boolean;
  searchValue: string;
  onAddSearchHistory: (item?: string) => void;
  onSubmit: (values: AuthFormValues) => void;
}

const defaultSearchContext: SearchContextValue = {
  form: {} as ReturnType<typeof useForm<AuthFormValues>>,
  results: emptyVal,
  isLoading: false,
  searchValue: "",
  onAddSearchHistory: () => {},
  onSubmit: () => {},
};

export const SearchContext =
  React.createContext<SearchContextValue>(defaultSearchContext);

const SearchProvider = ({ children }: { children: Children }) => {
  const router = useRouter();
  const localStorageProps = useLocalStorage();
  const form = useForm<AuthFormValues>(defaultValues, schema);
  const pathname = usePathname();
  const isSearchPage = usePathChecker("/search");

  const [results, setResults] = useState<SearchResultRow[]>(emptyVal);
  const [isLoading, setIsLoading] = useState(false);

  const searchValue = form.watch("s");
  const stored = localStorageProps.getItem("lastSearch");
  const history = stored ? JSON.parse(stored) : [];

  const getData = async (query: string) => {
    setIsLoading(true);

    // if (!query?.trim()) {
    //   setResults(emptyVal);
    //   return;
    // }

    const { data, error } = await supabase.rpc("search_all_result", {
      query,
    });

    if (error) {
      console.error("Search failed:", error);
      setResults(emptyVal);
      setIsLoading(false);
      return;
    }

    const normalized = Array.isArray(data) && data.length ? data : emptyVal;
    setResults(normalized);
    setIsLoading(false);
  };

  const debouncedSearch = useMemo(() => debounce(getData, 500), []);

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  const onAddSearchHistory = (item?: string) => {
    const updated = [...history, item || searchValue];
    localStorageProps.setItem("lastSearch", JSON.stringify(updated));
  };

  React.useEffect(() => {
    if (!isSearchPage) form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onSubmit = (values: AuthFormValues) => {
    router.push(`/search/result?s=${encodeURIComponent(values.s)}`);
    onAddSearchHistory();
  };

  return (
    <SearchContext.Provider
      value={{
        // isOpen,
        // toggle,
        form,
        results,
        isLoading,
        searchValue: searchValue?.trim() || "",
        onAddSearchHistory,
        onSubmit,
      }}
    >
      {children}

      {/* <SearchDialog
        form={form}
        isOpen={isOpen}
        toggle={toggle}
        onSubmit={onSubmit}
        isLoading={isLoading}
      /> */}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
