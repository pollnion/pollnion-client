"use client";
import React from "react";
import { useRouter } from "next/navigation";

import PublicLayout from "@/components/shared/layout/public-layout";
import SideBarLayout from "@/components/shared/layout/sidebar-layout";

import News from "@/modules/news";
import Links from "@/modules/links";
import Share from "@/modules/share";
import Spaces from "@/modules/spaces";
import Latest from "@/modules/latest";
import Discover from "@/modules/discover";
import Box from "@/components/custom/layout/box";
import { AuthContext } from "@/components/providers/auth-provider";

const LeftLayout = () => {
  return (
    <Box display="flex" flow="col" className="gap-2">
      <Discover />
      <Spaces />
    </Box>
  );
};

const RightLayout = () => {
  return (
    <Box display="flex" flow="col" className="gap-2">
      <Share />
      <News />
      <Latest />
      <Links />
    </Box>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuth, isLoading } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (!isLoading && !isAuth) {
      router.push("/");
    }
  }, [isAuth, isLoading, router]);

  // Show nothing while checking auth or if not authenticated
  if (isLoading || !isAuth) {
    return null;
  }

  return (
    <PublicLayout showNavbar={true}>
      <SideBarLayout left={<LeftLayout />} right={<RightLayout />}>
        {children}
      </SideBarLayout>
    </PublicLayout>
  );
};

export default Layout;
