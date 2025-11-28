import React from "react";
import { Search } from "lucide-react";

import { Form } from "../forms";
import { DialogProps } from "@/types";
import Dialog from "@/components/custom/dialog";
import Inputs from "@/components/custom/inputs";
import { FormField } from "@/components/ui/form";
import FormItem from "../forms/form-item";
import Box from "@/components/custom/layout/box";
import { Typography } from "@/components/custom/typography";
import SearchSuggestions from "@/modules/search/SearchSuggestions";

const SearchDialog = ({
  toggle,
  isOpen,
  form,
  onSubmit,
  isLoading,
}: DialogProps) => {
  // Reset forms when dialog is closed
  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dialog toggle={toggle} isOpen={isOpen} title="Search">
      <Form form={form} onSubmit={onSubmit} isLoading={isLoading} noBtn>
        <FormField
          name="s"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Inputs
                placeholder="Search..."
                withButton={{
                  label: "",
                  icon: Search,
                  type: "submit",
                  disabled: isLoading,
                  isLoading: isLoading,
                }}
                {...field}
              />
            </FormItem>
          )}
        />
      </Form>

      <Box className="gap-2">
        <Typography>Result</Typography>
        <SearchSuggestions />
      </Box>
    </Dialog>
  );
};

export default SearchDialog;
