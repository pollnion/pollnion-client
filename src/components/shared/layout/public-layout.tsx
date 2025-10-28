import React from "react";
import FooterLayout from "./footer-layout";
import NavbarLayout from "./navbar-layout";

const PublicLayout = ({
  children,
  showFooter,
  showNavbar,
}: {
  children: React.ReactNode;
  showFooter: boolean;
  showNavbar: boolean;
}) => {
  return (
    <React.Fragment>
      {showNavbar && <NavbarLayout />}
      <React.Fragment>{children}</React.Fragment>
      {showFooter && <FooterLayout />}
    </React.Fragment>
  );
};

export default PublicLayout;
