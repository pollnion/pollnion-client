import React from "react";
import { FieldValues } from "react-hook-form";

import { DialogProps } from "@/types/ui";
// import SignInForm from "../forms/sign-in-form";
import Dialog from "@/components/custom/dialog";

const SignInDialog: React.FC<DialogProps<FieldValues>> = ({
  isOpen,
  toggle,
}) => {
  return (
    <Dialog isOpen={isOpen} toggle={toggle} type="sign-in" title="Sign In">
      {/* <SignInForm /> */}
      <p>test</p>
    </Dialog>
  );
};

export default React.memo(SignInDialog);
