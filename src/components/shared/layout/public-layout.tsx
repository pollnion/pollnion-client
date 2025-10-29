import React from "react";
import FooterLayout from "./footer-layout";
import NavbarLayout from "./navbar-layout";

const PublicLayout = ({
  children,
  showFooter,
  showNavbar,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
  showNavbar?: boolean;
}) => {
  return (
    <React.Fragment>
      {showNavbar && <NavbarLayout />}
      <main className="px-0 sm:px-2 lg:container lg:mx-auto mt-3 md:mt-5">
        {children}
      </main>
      {showFooter && <FooterLayout />}
    </React.Fragment>
  );
};

export default PublicLayout;
