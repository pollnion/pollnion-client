"use client";
import React from "react";
import { Menu } from "lucide-react";

import GithubBtn from "../buttons/gh-btn";
import SearchBtn from "../buttons/search-btn";
import Button from "@/components/custom/button";
import Box from "@/components/custom/layout/box";
import NavbarLayoutCTA from "./navbar-layout.cta";
import NavbarLayoutAvatar from "./navbar-layout.avatar";
import useScrollPosition from "@/store/utils/use-scroll-position";

import { useRouter } from "next/navigation";
import { cn, usePathChecker } from "@/lib";
import LogoTxtBtn from "../buttons/logo-txt-btn";
import { Separator } from "@/components/ui/separator";
import { navbarVariants } from "./navbar-layout.variants";
import { useUI } from "@/components/providers/ui-provider";

const CommonSeparator = () => (
  <div className="hidden md:block">
    <Separator orientation="vertical" className="h-4! w-px bg-muted" />
  </div>
);

const NavbarLayout = () => {
  const { push } = useRouter();
  const { show } = useScrollPosition();
  const isSearchPath = usePathChecker("/search");
  const uiProps = useUI();

  // Handle logo image click
  const handleImgClick = () => {
    push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={cn(navbarVariants({ isVisible: !!show }))}>
      <Box display="flex" flow="center" size="xs" className="gap-2">
        <Button variant="outline" onClick={uiProps.toggle} size="icon">
          <Menu />
        </Button>

        <LogoTxtBtn onClick={handleImgClick} />
      </Box>

      <Box display="flex" flow="center" className="space-x-2" size="xs">
        {!isSearchPath && <SearchBtn />}
        <CommonSeparator />
        <GithubBtn className="hidden md:flex" />
        <CommonSeparator />
        <NavbarLayoutCTA />
        <NavbarLayoutAvatar />
      </Box>
    </nav>
  );
};

export default React.memo(NavbarLayout);
