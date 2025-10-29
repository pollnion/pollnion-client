import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";

const NavbarLayoutCTA = () => {
  const isAuth = false;

  // If the user is authenticated, do not show the CTA button
  if (isAuth) {
    return null;
  }

  return (
    <Button>
      <Typography>Sign up</Typography>
    </Button>
  );
};

export default NavbarLayoutCTA;
