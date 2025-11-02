"use client";
import React from "react";

import PublicLayout from "@/components/shared/layout/public-layout";
import SideBarLayout from "@/components/shared/layout/sidebar-layout";

import Feed from "@/modules/feed";
import News from "@/modules/news";
import Share from "@/modules/share";
import Latest from "@/modules/latest";
import Box from "@/components/custom/layout/box";

const LeftLayout = () => {
  return (
    <Box display="flex" flow="col" className="gap-3">
      Left
    </Box>
  );
};

const RightLayout = () => {
  return (
    <Box display="flex" flow="col" className="gap-3">
      <Share />
      <News />
      <Latest />
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
