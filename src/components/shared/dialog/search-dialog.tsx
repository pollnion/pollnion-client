import { Search } from "lucide-react";

import { Form } from "../forms";
import { DialogProps } from "@/types";
import Dialog from "@/components/custom/dialog";
import Inputs from "@/components/custom/inputs";

const SearchDialog = ({
  toggle,
  isOpen,
  form,
  onSubmit,
  isLoading,
}: DialogProps) => {
  return (
    <Dialog toggle={toggle} isOpen={isOpen} title="Search">
      <Form form={form} onSubmit={onSubmit} isLoading={isLoading}>
        <Inputs
          withButton={{
            label: "",
            icon: Search,
            type: "Submit",
            onClick: () => console.log("Test"),
          }}
        />
      </Form>

      <p>Options goes here btw</p>
    </Dialog>
  );
};

export default SearchDialog;
