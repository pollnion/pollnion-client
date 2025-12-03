"use client";

import React from "react";
import { Children } from "@/types";
import { useUI } from "@/components/providers/ui-provider";

const Layout = ({ children }: { children: Children }) => {
  const { setRightItems } = useUI();

  React.useEffect(() => {
    setRightItems([]); // empty for search
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default Layout;
