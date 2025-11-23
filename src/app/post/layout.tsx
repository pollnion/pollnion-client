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
import { useAuth } from "@/store/auth";

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
  const { user, isAuth } = useAuth();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    // Wait a bit for auth to initialize
    const timer = setTimeout(() => {
      if (!user && !isAuth) {
        router.replace("/");
      } else {
        setIsChecking(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [user, isAuth, router]);

  // Show nothing while checking auth
  if (isChecking || (!user && !isAuth)) {
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
