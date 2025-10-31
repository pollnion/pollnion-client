import PublicLayout from "@/components/shared/layout/public-layout";
import SideBarLayout from "@/components/shared/layout/sidebar-layout";

import Feed from "@/modules/feed";

const LeftLayout = () => {
  return <div>Left</div>;
};

const RightLayout = () => {
  return <div>Right</div>;
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
