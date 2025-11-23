import { useAuth } from "@/store";
import Dropdown from "@/components/custom/dropdown";
import { CurrentUserAvatar } from "../avatars/current-user-avatar";

const NavbarLayoutAvatar = () => {
  const { isAuth, handleSignOut } = useAuth();

  if (!isAuth) {
    return null;
  }

  const items = [
    { label: "Profile", onClick: () => console.log("Go to profile") },
    { label: "Logout", onClick: handleSignOut },
  ];

  return (
    <Dropdown label="My Account" items={items}>
      <button type="button" className="cursor-pointer">
        <CurrentUserAvatar />
      </button>
    </Dropdown>
  );
};

export default NavbarLayoutAvatar;
