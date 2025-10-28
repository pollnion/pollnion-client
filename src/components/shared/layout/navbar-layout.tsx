import { cn } from "@/lib/utils";
import { navbarVariants } from "./navbar-layout.variants";
import useScrollPosition from "@/store/utils/use-scroll-position";

const NavbarLayout = () => {
  const { show } = useScrollPosition();

  return (
    <nav
      className={cn(
        navbarVariants({
          isVisible: !!show,
        })
      )}
    >
      navbar-layout
    </nav>
  );
};

export default NavbarLayout;
