import React from "react";
import { useToggle } from "@/store";
import { Children, OpenProps } from "@/types/global";
import Sheet from "../custom/sheet";
import Spaces from "@/modules/spaces";
import Share from "@/modules/share";
import Discover from "@/modules/discover";

export interface DefaultProps extends OpenProps {
  toggle: () => void;
}

export const DEFAULT_PROPS = {
  isOpen: false,
  toggle: () => {},
};

export const UIContext = React.createContext(DEFAULT_PROPS as DefaultProps);

const MSG =
  '"[UIProvider] UIProvider will temporarily used instead of individual providers for Share, Discover, and Spaces modules. This is a temporary solution and will be replaced with a more robust state management approach in the future."';
console.warn(MSG);

const UIProvider = ({ children }: { children: Children }) => {
  const toggleProps = useToggle();

  return (
    <UIContext.Provider value={toggleProps}>
      {children}

      <Sheet {...toggleProps}>
        <Share />
        <Discover />
        <Spaces />
      </Sheet>
    </UIContext.Provider>
  );
};

// READ ME
// Custom hook to use the UI context especially for toggling the sheet
export const useUI = () => React.useContext(UIContext);

export default UIProvider;
