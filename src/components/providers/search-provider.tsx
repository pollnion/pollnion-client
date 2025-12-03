"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/supabase/client";

import { z } from "zod";
import { Children } from "@/types";
import { useForm, useLoading, useToggle } from "@/store";
import type { SearchResultRow } from "@/types/search";

import debounce from "lodash/debounce";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/lib/localStorage";
import SearchDialog from "../shared/dialog/search-dialog";

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
  isOpen: boolean;
  toggle: () => void;
  form: ReturnType<typeof useForm<AuthFormValues>>;
  results: SearchResultRow[];
  isLoading: boolean;
  searchValue: string;
  onAddSearchHistory: (item?: string) => void;
}

const defaultSearchContext: SearchContextValue = {
  isOpen: false,
  toggle: () => {},
  form: {} as ReturnType<typeof useForm<AuthFormValues>>,
  results: emptyVal,
  isLoading: false,
  searchValue: "",
  onAddSearchHistory: () => {},
};

export const SearchContext =
  React.createContext<SearchContextValue>(defaultSearchContext);

const SearchProvider = ({ children }: { children: Children }) => {
  const router = useRouter();
  const loadingProps = useLoading();
  const { isOpen, toggle } = useToggle();
  const localStorageProps = useLocalStorage();
  const form = useForm<AuthFormValues>(defaultValues, schema);
  const [results, setResults] = useState<SearchResultRow[]>(emptyVal);

  const searchValue = form.watch("s");
  const stored = localStorageProps.getItem("lastSearch");
  const history = stored ? JSON.parse(stored) : [];

  const getData = async (query: string) => {
    loadingProps.start();

    if (!query?.trim()) {
      return setResults(emptyVal);
    }

    const { data, error } = await supabase.rpc("search_all_result", {
      query,
    });

    if (error) {
      console.error("Search failed:", error);
      loadingProps.stop();
      return setResults(emptyVal);
    }

    const normalized = Array.isArray(data) && data.length ? data : emptyVal;
    setResults(normalized);
    loadingProps.stop();
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization, react-hooks/exhaustive-deps
  const debouncedSearch = useMemo(() => debounce(getData, 500), []);

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  const onAddSearchHistory = (item?: string) => {
    const updated = [...history, item || searchValue];
    localStorageProps.setItem("lastSearch", JSON.stringify(updated));
  };

  const onSubmit = (values: AuthFormValues) => {
    router.push(`/search?s=${encodeURIComponent(values.s)}`);
    onAddSearchHistory();
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
        onAddSearchHistory,
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
