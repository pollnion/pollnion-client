import React from "react";
import { Search } from "lucide-react";

import { Form } from "../forms";
import { useQuery } from "@/store";
import { DialogProps } from "@/types";
import FormItem from "../forms/form-item";
import { usePathname } from "next/navigation";
import Dialog from "@/components/custom/dialog";
import Inputs from "@/components/custom/inputs";
import { FormField } from "@/components/ui/form";
import Box from "@/components/custom/layout/box";
import SearchSuggestions from "@/modules/search/suggestions/SearchSuggestions";

const SearchDialog = ({
  toggle,
  isOpen,
  form,
  onSubmit,
  isLoading,
}: DialogProps) => {
  const { query } = useQuery();
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, query?.s]);

  // Reset forms when dialog is closed
  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const searchValue = form.watch("s");

  const disabled = !searchValue?.trim() || isLoading;

  return (
    <Dialog toggle={toggle} isOpen={isOpen}>
      <div className="h-[380px] overflow-y-auto scroll-invisible">
        <Box color="background" className="position sticky top-0 z-10 pb-2">
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
                      isLoading: isLoading,
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
    </Dialog>
  );
};

export default SearchDialog;
