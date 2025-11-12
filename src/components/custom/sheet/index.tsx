import React from "react";
import {
  SheetTitle,
  SheetHeader,
  SheetFooter,
  SheetContent,
  SheetDescription,
  Sheet as ShadcnSheet,
} from "@/components/ui/sheet";
import { cn } from "@/lib";
import { Box } from "../layout/box";
import { SheetProps } from "@/types/ui";

const Sheet = ({
  toggle,
  title,
  isOpen,
  footer,
  children,
  className,
  description,
  side = "left",
}: SheetProps) => {
  return (
    <ShadcnSheet open={isOpen} onOpenChange={toggle}>
      <SheetContent
        side={side}
        className={cn("w-[400px] sm:w-[540px]", className)}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <Box
          flow="col"
          display="flex"
          className="gap-3 px-4 flex-1 overflow-y-auto"
        >
          {children}
        </Box>

        {footer && (
          <SheetFooter className="flex-none border-t p-6">{footer}</SheetFooter>
        )}
      </SheetContent>
    </ShadcnSheet>
  );
};

export default React.memo(Sheet);
