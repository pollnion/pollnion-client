import React from "react";
import { cn } from "@/lib/utils";
import {
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  Dialog as UiDialog,
} from "@/components/ui/dialog";

import Button from "../button";
import { Element } from "@/types/global";
import { BaseDialogProps } from "@/types/ui";

const Dialog: React.FC<BaseDialogProps> = ({
  isOpen,
  toggle,
  title,
  description,
  onOkProps,
  onCancelProps,
  className,
  children,
}): Element => {
  const Content = (
    <React.Fragment>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      {children}

      {(onOkProps || onCancelProps) && (
        <DialogFooter>
          {onCancelProps && (
            <DialogClose asChild>
              <Button variant="outline" {...onCancelProps}>
                {onCancelProps?.label || "Cancel"}
              </Button>
            </DialogClose>
          )}
          {onOkProps && (
            <Button {...onOkProps}>{onOkProps.label || "Save changes"}</Button>
          )}
        </DialogFooter>
      )}
    </React.Fragment>
  );

  return (
    <UiDialog open={isOpen} onOpenChange={toggle}>
      <DialogContent
        className={cn(
          "sm:max-w-[520px] bg-card px-3 py-6 border-none",
          className
        )}
      >
        {Content}
      </DialogContent>
    </UiDialog>
  );
};

export default Dialog;
