import Avatar from "@/components/custom/avatar";
import Dropdown from "@/components/custom/dropdown";

const NavbarLayoutAvatar = () => {
  const avatar_url = "";

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  const items = [
    { label: "Profile", onClick: () => console.log("Go to profile") },
    { label: "Logout", onClick: handleSignOut },
  ];

  return (
    <Dropdown label="My Account" items={items}>
      <Avatar src={avatar_url} alt="av" />
    </Dropdown>
  );
};

export default NavbarLayoutAvatar;
