import React from "react";
import { FieldValues } from "react-hook-form";

import { DialogProps } from "@/types";
import Dialog from "@/components/custom/dialog";
import FeedPostForm from "../forms/feed/feed-post-form";

const FeedPostDialog: React.FC<DialogProps<FieldValues>> = ({
  form,
  onSubmit,
  isOpen,
  toggle,
  isLoading,
}) => {
  // Reset forms when dialog is closed
  React.useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Dialog isOpen={isOpen} toggle={toggle} title="Create Post">
      <FeedPostForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </Dialog>
  );
};

export default FeedPostDialog;
