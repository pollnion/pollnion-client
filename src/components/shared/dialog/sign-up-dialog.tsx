"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";

import { DialogProps } from "@/types/ui";
import Dialog from "@/components/custom/dialog";
import SignUpForm from "../forms/auth/sign-up-form";

const SignUpDialog: React.FC<
  DialogProps<FieldValues> & { onSwitchMode?: () => void }
> = ({ form, onSubmit, isOpen, toggle, onSwitchMode }) => {
  const router = useRouter();

  const handleSubmit = async (data: FieldValues) => {
    await onSubmit(data);

    // Wait a bit for the form state to update
    setTimeout(() => {
      // Stop if any errors exist
      if (Object.keys(form.formState.errors).length === 0) {
        toggle(); // Close dialog
        router.push("/email-verification");
      }
    }, 100);
  };

  return (
    <Dialog isOpen={isOpen} toggle={toggle} type="sign-up" title="Sign Up">
      <SignUpForm
        form={form}
        onSubmit={handleSubmit}
        isLoading={form.formState.isSubmitting}
        onSwitchMode={onSwitchMode}
      />
    </Dialog>
  );
};
export default React.memo(SignUpDialog);
