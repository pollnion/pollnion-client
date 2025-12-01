"use client";

import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/supabase/client";

import { z } from "zod";
import { useForm, useToggle } from "@/store";
import { AnyObject, Children } from "@/types";

import SearchDialog from "../shared/dialog/search-dialog";
import debounce from "lodash/debounce";

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
});

const SearchProvider = ({ children }: { children: Children }) => {
  const { isOpen, toggle } = useToggle();
  const form = useForm<AuthFormValues>(defaultValues, schema);
  const [results, setResults] = useState({
    feeds: [] as AnyObject[],
    users: [] as AnyObject[],
    labels: [] as AnyObject[],
  });

  const searchValue = form.watch("s");

  const getData = async (query: string) => {
    if (!query?.trim()) return setResults({ feeds: [], users: [], labels: [] });

    const { data, error } = await supabase.rpc("search_all", { query });

    if (error) {
      console.error("Search failed:", error);
      return setResults({ feeds: [], users: [], labels: [] });
    }

    setResults(data || { feeds: [], users: [], labels: [] });
  };

  const debouncedSearch = useMemo(() => debounce(getData, 500), []);

  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  const onSubmit = (values: AuthFormValues) => {
    console.log("Search submitted:", values);
  };

  console.log(results);

  return (
    <SearchContext.Provider value={{ isOpen, toggle, form, results }}>
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
