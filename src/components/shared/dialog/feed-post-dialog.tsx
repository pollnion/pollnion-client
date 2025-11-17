import { FieldValues } from "react-hook-form";

import { DialogProps } from "@/types";
import Dialog from "@/components/custom/dialog";
import FeedPostForm from "../forms/feed/feed-post-form";

const FeedPostDialog: React.FC<DialogProps<FieldValues>> = ({
  form,
  onSubmit,
  isOpen,
  toggle,
}) => {
  return (
    <Dialog isOpen={isOpen} toggle={toggle} title="Create Post">
      <FeedPostForm form={form} onSubmit={onSubmit} />
    </Dialog>
  );
};

export default FeedPostDialog;
