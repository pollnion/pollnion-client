import Button from "@/components/custom/button";
import PublicLayout from "@/components/shared/layout/public-layout";
import SideBarLayout from "@/components/shared/layout/sidebar-layout";

const LeftLayout = () => {
  return <div>Left</div>;
};

const RightLayout = () => {
  return <div>Right</div>;
};

export default function Home() {
  return (
    <PublicLayout showFooter={true} showNavbar={true}>
      <SideBarLayout left={<LeftLayout />} right={<RightLayout />}>
        <Button>test</Button>
      </SideBarLayout>
    </PublicLayout>
  );
}
