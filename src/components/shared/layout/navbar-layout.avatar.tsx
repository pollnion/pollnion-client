import React from "react";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";

import { useAuth } from "@/store";
import { AnyObject } from "@/types";
import { useRouter } from "next/navigation";
import Sheet from "@/components/custom/sheet";
import Dialog from "@/components/custom/dialog";
import Button from "@/components/custom/button";
import { CurrentUserAvatar } from "../avatars/current-user-avatar";

type ToggleKey = "sheet" | "dialog";

const NavbarLayoutAvatar = () => {
  const { isAuth, handleSignOut, isLoading, user } = useAuth();
  const router = useRouter();

  const loading = isLoading;

  const [isOpen, setIsOpen] = React.useState<Record<ToggleKey, boolean>>({
    sheet: false,
    dialog: false,
  });

  const toggle = (type: ToggleKey) =>
    setIsOpen((prev) => ({ ...prev, [type]: !prev[type] }));

  if (!isAuth) {
    return null;
  }

  const items = [
    {
      label: "Profile",
      onClick: () =>
        router.push(
          `/${(user?.user_metadata as AnyObject)?.username as string}`
        ),
      icon: <User />,
    },
    { label: "Logout", onClick: () => toggle("dialog"), icon: <LogOut /> },
  ];

  return (
    <React.Fragment>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => toggle("sheet")}
      >
        <CurrentUserAvatar />
      </button>

      <Sheet isOpen={isOpen.sheet} toggle={() => toggle("sheet")} side="right">
        {items.map(({ label, onClick, icon }, i) => {
          const isLast = i === items.length - 1;

          return (
            <Button
              key={i}
              size="sm"
              variant="ghost"
              onClick={() => {
                onClick();
                if (!isLast) toggle("sheet");
              }}
              className="w-full justify-start"
            >
              {icon}
              {label}
            </Button>
          );
        })}
      </Sheet>

      <Dialog
        title="User logout"
        isOpen={isOpen.dialog}
        description="Are you sure you want to signout?"
        toggle={() => toggle("dialog")}
        onOkProps={{
          label: "Confirm",
          onClick: handleSignOut,
          disabled: loading,
          isLoading: loading,
        }}
        onCancelProps={{
          label: "Cancel",
          onClick: () => toggle("dialog"),
        }}
      />
    </React.Fragment>
  );
};

export default NavbarLayoutAvatar;
