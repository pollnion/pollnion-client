"use client";

import { Menu } from "lucide-react";

import LogoImg from "../images/logo-img";
import GithubBtn from "../buttons/gh-btn";
import SearchBtn from "../buttons/search-btn";
import Button from "@/components/custom/button";
import Box from "@/components/custom/layout/box";
import NavbarLayoutCTA from "./navbar-layout.cta";
import NavbarLayoutAvatar from "./navbar-layout.avatar";
import useScrollPosition from "@/store/utils/use-scroll-position";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import LogoTxtBtn from "../buttons/logo-txt-btn";
import { usePathChecker } from "@/lib/path-checker";
import { Separator } from "@/components/ui/separator";
import { navbarVariants } from "./navbar-layout.variants";

const CommonSeparator = () => (
  <div className="hidden md:block">
    <Separator orientation="vertical" className="!h-4 w-px bg-muted" />
  </div>
);

const NavbarLayout = () => {
  const { push } = useRouter();
  const { show } = useScrollPosition();
  const isSearchPath = usePathChecker("/search");

  // Handle logo image click
  const handleImgClick = () => {
    push("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        navbarVariants({
          isVisible: !!show,
        })
      )}
    >
      <Box display="flex" flow="center" size="sm">
        <Button variant="ghost" className="block sm:hidden">
          <Menu />
        </Button>

        <Box display="flex" flow="center" className="gap-2">
          <LogoImg onClick={handleImgClick} />
          <LogoTxtBtn onClick={handleImgClick} />
        </Box>
      </Box>

      <Box display="flex" flow="center" className="space-x-2" size="sm">
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

export default NavbarLayout;
