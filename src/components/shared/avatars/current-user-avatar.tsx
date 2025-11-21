"use client";

import { useAuth } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CurrentUserAvatar = () => {
  const { user } = useAuth();

  const name = user?.user_metadata.full_name;
  const profileImage = user?.user_metadata.avatar_url;

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
