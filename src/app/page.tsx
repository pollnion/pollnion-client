"use client";

import PublicLayout from "@/components/shared/layout/public-layout";
import SideBarLayout from "@/components/shared/layout/sidebar-layout";

import Feed from "@/modules/feed";
import News from "@/modules/news";
import Links from "@/modules/links";
import Share from "@/modules/share";
import Spaces from "@/modules/spaces";
import Latest from "@/modules/latest";
import Discover from "@/modules/discover";
import Box from "@/components/custom/layout/box";

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

export default function Home() {
  return (
    <PublicLayout showNavbar={true}>
      <SideBarLayout left={<LeftLayout />} right={<RightLayout />}>
        <Feed />
      </SideBarLayout>
    </PublicLayout>
  );
}
