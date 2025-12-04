"use client";

import {
  DrawerTitle,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
  Drawer as ShadcnDrawer,
} from "@/components/ui/drawer";

export function Drawer({
  title,
  triggerBtn,
  description,
  children,
}: {
  title?: string;
  description?: string;
  triggerBtn: React.ReactNode;
  children: React.ReactNode;
}) {
  const handleInteractionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ShadcnDrawer>
      <DrawerTrigger asChild onClick={handleInteractionClick}>
        {triggerBtn}
      </DrawerTrigger>

      <DrawerContent
        onClick={(e) => {
          handleInteractionClick(e);
        }}
      >
        <div className="mx-auto w-full max-w-sm">
          {title ? (
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          ) : (
            <div></div>
          )}

          <div className="p-4 pb-0">{children}</div>
        </div>
      </DrawerContent>
    </ShadcnDrawer>
  );
}
