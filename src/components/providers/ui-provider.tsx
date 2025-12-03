"use client";

import React, { ComponentType } from "react";

import Sheet from "../custom/sheet";
import { useToggle } from "@/store";
import { usePathname } from "next/navigation";
import Box from "@/components/custom/layout/box";
import PublicLayout from "../shared/layout/public-layout";
import SideBarLayout from "@/components/shared/layout/sidebar-layout";
import { AnyObject, Children, OpenProps } from "@/types/global";

import News from "@/modules/news";
import Share from "@/modules/share";
import Links from "@/modules/links";
import Spaces from "@/modules/spaces";
import Latest from "@/modules/latest";
import Discover from "@/modules/discover";

export interface DefaultProps extends OpenProps {
  toggle: () => void;
  leftItems: ComponentType<AnyObject>[];
  rightItems: ComponentType<AnyObject>[];
  sheetItems: ComponentType<AnyObject>[];
  setLeftItems: (items: ComponentType<AnyObject>[]) => void;
  setRightItems: (items: ComponentType<AnyObject>[]) => void;
  setSheetItems: (items: ComponentType<AnyObject>[]) => void;
}

export const DEFAULT_PROPS: DefaultProps = {
  isOpen: false,
  toggle: () => {},
  leftItems: [],
  rightItems: [],
  sheetItems: [],
  setLeftItems: () => {},
  setRightItems: () => {},
  setSheetItems: () => {},
};

export const UIContext = React.createContext(DEFAULT_PROPS as DefaultProps);
export const useUI = () => React.useContext(UIContext);

const UIProvider = ({ children }: { children: Children }) => {
  const toggleProps = useToggle();
  const pathname = usePathname();

  // Map of layouts per route
  const layoutMap: Record<
    string,
    { left: ComponentType[]; right: ComponentType[] }
  > = {
    "/": { left: [Discover, Spaces], right: [Share, News, Latest, Links] },
    // "/search": { left: [Discover, Spaces], right: [] },
  };

  // Prevent flicker: derive initial state from pathname
  const initialLayout = layoutMap[pathname] || layoutMap["/"];
  const [leftItems, setLeftItems] = React.useState<ComponentType[]>(
    initialLayout.left
  );
  const [rightItems, setRightItems] = React.useState<ComponentType[]>(
    initialLayout.right
  );
  const [sheetItems, setSheetItems] = React.useState<ComponentType[]>([
    Share,
    Discover,
    Spaces,
  ]);

  React.useEffect(() => {
    const layout = layoutMap[pathname] || layoutMap["/"];
    setLeftItems(layout.left);
    setRightItems(layout.right);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <UIContext.Provider
      value={{
        ...toggleProps,
        leftItems,
        rightItems,
        sheetItems,
        setLeftItems,
        setRightItems,
        setSheetItems,
      }}
    >
      <PublicLayout>
        <SideBarLayout
          left={
            <Box display="flex" flow="col" className="gap-2">
              {leftItems.filter(Boolean).map((Component, i) => (
                <Component key={i} />
              ))}
            </Box>
          }
          right={
            <Box display="flex" flow="col" className="gap-2">
              {rightItems.filter(Boolean).map((Component, i) => (
                <Component key={i} />
              ))}
            </Box>
          }
        >
          {children}
        </SideBarLayout>

        <Sheet {...toggleProps}>
          {sheetItems.filter(Boolean).map((Component, i) => (
            <Component key={i} />
          ))}
        </Sheet>
      </PublicLayout>
    </UIContext.Provider>
  );
};

export default UIProvider;
