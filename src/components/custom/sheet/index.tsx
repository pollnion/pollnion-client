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
import Links from "@/modules/links";
import { SheetProps } from "@/types/ui";
import { Box } from "@/components/custom/layout/box";

const Footer = () => {
  return <Links />;
};

const Sheet = ({
  toggle,
  title,
  isOpen,
  children,
  className,
  description,
  side = "left",
  footer = Footer,
}: SheetProps) => {
  return (
    <ShadcnSheet open={isOpen} onOpenChange={toggle}>
      <SheetContent side={side} className={cn(className)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <Box
          flow="col"
          display="flex"
          className="gap-6 px-4 flex-1 overflow-y-auto"
        >
          {children}
        </Box>

        {footer && (
          <SheetFooter className="flex-none border-t p-6">
            {React.createElement(footer)}
          </SheetFooter>
        )}
      </SheetContent>
    </ShadcnSheet>
  );
};

export default React.memo(Sheet);
