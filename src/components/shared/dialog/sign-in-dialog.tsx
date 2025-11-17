import React from "react";
import { FieldValues } from "react-hook-form";

import { DialogProps } from "@/types/ui";
import Dialog from "@/components/custom/dialog";
import SignInForm from "../forms/auth/sign-in-form";

const SignInDialog: React.FC<DialogProps<FieldValues>> = ({
  form,
  onSubmit,
  isOpen,
  toggle,
}) => {
  return (
    <Dialog isOpen={isOpen} toggle={toggle} type="sign-in" title="Sign In">
      <SignInForm form={form} onSubmit={onSubmit} />
    </Dialog>
  );
};

export default React.memo(SignInDialog);
