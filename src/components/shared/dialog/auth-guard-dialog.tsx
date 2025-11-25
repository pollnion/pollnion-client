"use client";

import React from "react";
import { FieldValues } from "react-hook-form";

import { Toggle } from "@/types/ui";
import { OpenProps } from "@/types/global";
import SignUpDialog from "./sign-up-dialog";
import SignInDialog from "./sign-in-dialog";
import { FormHookResult } from "@/types/form";

type AuthGuardDialogProps<T extends FieldValues = FieldValues> = {
  type?: "sign_in" | "sign_up";
  signInProps: FormHookResult<T>;
  signUpProps: FormHookResult<T>;
  toggle: Toggle;
  isOpen: OpenProps["isOpen"];
};

const AuthGuardDialog = <T extends FieldValues = FieldValues>({
  type = "sign_in",
  isOpen,
  toggle,
  signInProps,
  signUpProps,
}: AuthGuardDialogProps<T>) => {
  const [currentType, setCurrentType] = React.useState<"sign_in" | "sign_up">(
    type
  );

  // Reset forms when dialog is closed
  React.useEffect(() => {
    if (!isOpen) {
      signInProps.form.reset();
      signUpProps.form.reset();
      setCurrentType(type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentType, type]);

  const switchToSignUp = () => setCurrentType("sign_up");
  const switchToSignIn = () => setCurrentType("sign_in");

  if (currentType === "sign_up") {
    return (
      <SignUpDialog
        isOpen={isOpen}
        toggle={toggle}
        onSwitchMode={switchToSignIn}
        {...signUpProps}
      />
    );
  }

  return (
    <SignInDialog
      isOpen={isOpen}
      toggle={toggle}
      onSwitchMode={switchToSignUp}
      {...signInProps}
    />
  );
};

export default AuthGuardDialog;
