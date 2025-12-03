"use client";
import React from "react";
import { Menu } from "lucide-react";

import SearchBtn from "../buttons/search-btn";
import Button from "@/components/custom/button";
import Box from "@/components/custom/layout/box";
import NavbarLayoutCTA from "./navbar-layout.cta";
import NavbarLayoutAvatar from "./navbar-layout.avatar";
import useScrollPosition from "@/store/utils/use-scroll-position";

import { cn } from "@/lib";
import { Children } from "@/types/global";
import { useRouter } from "next/navigation";
import LogoTxtBtn from "../buttons/logo-txt-btn";
import { navbarVariants } from "./navbar-layout.variants";
import { useUI } from "@/components/providers/ui-provider";

const commonStyles =
  "space-y-4 sticky top-20 self-start max-h-[calc(100vh-5rem)] overflow-y-auto scroll-invisible";

interface SideColumnProps {
  children: Children;
  className?: string;
}

/**
 * SideColumn — base wrapper for left and right side sections
 */
const SideColumn = ({ children, className }: SideColumnProps) => (
  <aside className={cn(commonStyles, className)}>{children}</aside>
);

const NavbarLayout = () => {
  const { push } = useRouter();
  const { show } = useScrollPosition();
  const uiProps = useUI();

  // Handle logo image click
  const handleImgClick = () => {
    push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "flex items-start justify-between md:space-x-2",
        navbarVariants({ isVisible: !!show })
      )}
    >
      <SideColumn className="sm:w-[200px] md:w-[280px]">
        <Box display="flex" flow="center" size="xs" className="gap-2">
          <Button variant="outline" onClick={uiProps.toggle} size="icon">
            <Menu />
          </Button>

          <LogoTxtBtn onClick={handleImgClick} />
        </Box>
      </SideColumn>

      <div className="hidden md:block md:w-[420px] lg:w-[560px] space-y-4">
        <SearchBtn />
      </div>

      <SideColumn className="sm:w-[200px] md:w-[280px]">
        <Box
          display="flex"
          flow="center"
          className="gap-2 justify-end"
          size="xs"
        >
          <div className="block md:hidden">
            <SearchBtn />
          </div>
          <NavbarLayoutCTA />
          <NavbarLayoutAvatar />
        </Box>
      </SideColumn>
    </nav>
  );
};

export default React.memo(NavbarLayout);
