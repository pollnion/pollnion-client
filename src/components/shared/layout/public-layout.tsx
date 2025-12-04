import React from "react";
import FooterLayout from "./footer-layout";
import NavbarLayout from "./navbar-layout";

const PublicLayout = ({
  children,
  showFooter = false,
  showNavbar = true,
}: {
  children: React.ReactNode;
  showFooter?: boolean;
  showNavbar?: boolean;
}) => {
  return (
    <div className="px-0 sm:px-4 lg:container lg:mx-auto min-h-[100dvh]">
      {showNavbar && <NavbarLayout />}
      <main className="mt-3 md:mt-5">{children}</main>
      {showFooter && <FooterLayout />}
    </div>
  );
};

export default PublicLayout;
