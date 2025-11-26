import React from "react";

import Sheet from "../custom/sheet";
import { useToggle } from "@/store";
import Box from "@/components/custom/layout/box";
import PublicLayout from "../shared/layout/public-layout";
import { AnyObject, Children, OpenProps } from "@/types/global";
import SideBarLayout from "@/components/shared/layout/sidebar-layout";

import News from "@/modules/news";
import Share from "@/modules/share";
import Links from "@/modules/links";
import Spaces from "@/modules/spaces";
import Latest from "@/modules/latest";
import Discover from "@/modules/discover";

export interface DefaultProps extends OpenProps {
  toggle: () => void;
  leftItems: React.ComponentType<AnyObject>[];
  rightItems: React.ComponentType<AnyObject>[];
  sheetItems: React.ComponentType<AnyObject>[];
  setLeftItems: (items: React.ComponentType<AnyObject>[]) => void;
  setRightItems: (items: React.ComponentType<AnyObject>[]) => void;
  setSheetItems: (items: React.ComponentType<AnyObject>[]) => void;
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

const UIProvider = ({ children }: { children: Children }) => {
  const toggleProps = useToggle();

  const [leftItems, setLeftItems] = React.useState<React.ComponentType[]>([
    Discover,
    Spaces,
  ]);
  const [rightItems, setRightItems] = React.useState<React.ComponentType[]>([
    Share,
    News,
    Latest,
    Links,
  ]);
  const [sheetItems, setSheetItems] = React.useState<React.ComponentType[]>([
    Share,
    Discover,
    Spaces,
  ]);

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
              {leftItems.map((Component, i) => (
                <Component key={i} />
              ))}
            </Box>
          }
          right={
            <Box display="flex" flow="col" className="gap-2">
              {rightItems.map((Component, i) => (
                <Component key={i} />
              ))}
            </Box>
          }
        >
          {children}
        </SideBarLayout>

        <Sheet {...toggleProps}>
          {sheetItems.map((Component, i) => (
            <Component key={i} />
          ))}
        </Sheet>
      </PublicLayout>
    </UIContext.Provider>
  );
};

export default UIProvider;

// --- Usage example of dynamic sidebar items ---
//  const { setLeftItems, setRightItems } = useUI();

//  React.useEffect(() => {
//    // dynamically change sidebar items
//    setLeftItems([CustomModule]); // left column
//    setRightItems([News, Links]); // right column
//  }, []);

export const UIContext = React.createContext(DEFAULT_PROPS as DefaultProps);
export const useUI = () => React.useContext(UIContext);
