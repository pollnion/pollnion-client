import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";
import useAuth from "@/store/auth/use-auth";

const NavbarLayoutCTA = () => {
  const { isAuth, toggleAuthGuard } = useAuth();

  // If the user is authenticated, do not show the CTA button
  if (isAuth) {
    return null;
  }

  return (
    <Button onClick={() => toggleAuthGuard()}>
      <Typography>Sign up</Typography>
    </Button>
  );
};

export default NavbarLayoutCTA;
