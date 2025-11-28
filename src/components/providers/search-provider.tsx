import React from "react";
import { z } from "zod";
import { useForm } from "@/store";

import { Children } from "@/types";
import { useToggle } from "@/store";
import SearchDialog from "../shared/dialog/search-dialog";

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
});

const SearchProvider = ({ children }: { children: Children }) => {
  const { isOpen, toggle } = useToggle();

  const form = useForm<AuthFormValues>(defaultValues, schema);

  const onSubmit = (values: AuthFormValues) => {
    console.log("Search submitted:", values);
  };

  // Watch form state changes
  const searchValue = form.watch("s");
  // temp
  console.log(searchValue);

  // const { data, error } = await supabase
  //   .from("posts")
  //   .select("*")
  //   .textSearch("fts", q, {
  //     type: searchValue,
  //   });

  // const { data } = await supabase
  //   .from("users")
  //   .select("id, username, email")
  //   .or(`username.ilike.${q}%,email.ilike.${q}%`)
  //   .limit(8);

  return (
    <SearchContext.Provider value={{ isOpen, toggle, form }}>
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
