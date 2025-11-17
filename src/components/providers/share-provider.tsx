import ShareDialog from "@/modules/share/share-dialog";
import { useToggle } from "@/store";
import { BaseDialogProps } from "@/types";
import { createContext } from "react";

const defaultValue: BaseDialogProps = {
  isOpen: false,
  toggle: () => {},
};

export const ShareContext = createContext<BaseDialogProps>(defaultValue);

const ShareProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, toggle } = useToggle();

  return (
    <ShareContext.Provider value={{ isOpen, toggle }}>
      {children}

      <ShareDialog isOpen={isOpen} toggle={toggle} />
    </ShareContext.Provider>
  );
};

export default ShareProvider;
