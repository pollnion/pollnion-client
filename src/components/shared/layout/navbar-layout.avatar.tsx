import React from "react";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";

import { useAuth } from "@/store";
import Sheet from "@/components/custom/sheet";
import Button from "@/components/custom/button";
import { CurrentUserAvatar } from "../avatars/current-user-avatar";

const NavbarLayoutAvatar = () => {
  const { isAuth, handleSignOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  if (!isAuth) {
    return null;
  }

  const items = [
    {
      label: "Profile",
      onClick: () => console.log("Go to profile"),
      icon: <User />,
    },
    { label: "Logout", onClick: handleSignOut, icon: <LogOut /> },
  ];

  return (
    <React.Fragment>
      <button type="button" className="cursor-pointer" onClick={toggle}>
        <CurrentUserAvatar />
      </button>

      <Sheet isOpen={isOpen} toggle={toggle} side="right">
        {items.map(({ label, onClick, icon }, i) => {
          return (
            <Button
              key={i}
              size="sm"
              variant="ghost"
              onClick={onClick}
              className="w-full justify-start"
            >
              {icon}
              {label}
            </Button>
          );
        })}
      </Sheet>
    </React.Fragment>
  );
};

export default NavbarLayoutAvatar;
