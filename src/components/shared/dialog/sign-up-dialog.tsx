import React from "react";
import { FieldValues } from "react-hook-form";

import { DialogProps } from "@/types/ui";
import Dialog from "@/components/custom/dialog";
import SignUpForm from "../forms/sign-up-form";

const SignUpDialog: React.FC<DialogProps<FieldValues>> = ({
  form,
  onSubmit,
  isOpen,
  toggle,
}) => {
  return (
    <Dialog isOpen={isOpen} toggle={toggle} type="sign-up" title="Sign Up">
      <SignUpForm form={form} onSubmit={onSubmit} />
    </Dialog>
  );
};

export default React.memo(SignUpDialog);
