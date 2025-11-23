import Button from "@/components/custom/button";
import useAuth from "@/store/auth/use-auth";

const NavbarLayoutCTA = () => {
  const { isAuth, toggleAuthGuard } = useAuth();

  // If the user is authenticated or loading, do not show the CTA button
  if (isAuth) {
    return null;
  }

  return <Button onClick={() => toggleAuthGuard()}>Sign up</Button>;
};

export default NavbarLayoutCTA;
