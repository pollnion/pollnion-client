"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/store";
import { FormItem } from "@/components/ui/form";
import Inputs from "@/components/custom/inputs";
import { FormField } from "@/components/ui/form";
import Box from "@/components/custom/layout/box";
import { Form } from "@/components/shared/forms";
import SearchSuggestions from "@/modules/search/suggestions/SearchSuggestions";

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const { form, onSubmit, isLoading, searchValue } = useSearch();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const disabled = !searchValue?.trim() || isLoading;

  return (
    <div>
      <Box className="sticky top-0 z-10 pb-2">
        <Form form={form} onSubmit={onSubmit} isLoading={isLoading} noBtn>
          <FormField
            name="s"
            control={form.control}
            render={({ field }) => (
              <FormItem className="p-1">
                <Inputs
                  placeholder="Search..."
                  withButton={{
                    label: "",
                    icon: Search,
                    type: "submit",
                    disabled: disabled,
                  }}
                  {...field}
                />
              </FormItem>
            )}
          />
        </Form>
      </Box>

      <SearchSuggestions />
    </div>
  );
};

export default Page;
