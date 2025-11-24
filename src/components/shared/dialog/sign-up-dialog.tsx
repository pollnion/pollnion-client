"use client";

import React from "react";
import { FieldValues } from "react-hook-form";

import { DialogProps } from "@/types/ui";
import Dialog from "@/components/custom/dialog";
import SignUpForm from "../forms/auth/sign-up-form";

const SignUpDialog: React.FC<DialogProps<FieldValues>> = ({
  form,
  onSubmit,
  isOpen,
  toggle,
  isLoading,
}) => {
  return (
    <Dialog isOpen={isOpen} toggle={toggle} type="sign-up" title="Sign Up">
      <SignUpForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </Dialog>
  );
};

export default React.memo(SignUpDialog);
