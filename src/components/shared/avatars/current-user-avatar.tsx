"use client";

import { useAuth } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DEFAULT_LINK = "https://github.com/shadcn.png";

export const CurrentUserAvatar = () => {
  const { user } = useAuth();

  const name = user?.user_metadata.full_name;
  const profileImage = user?.user_metadata.avatar_url || DEFAULT_LINK;

  const initials = name
    ?.split(" ")
    ?.map((word: string) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <Avatar>
      <AvatarImage src={profileImage} alt={name || "User"} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
