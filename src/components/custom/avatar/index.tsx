import React from "react";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import {
  AvatarImage,
  AvatarFallback,
  Avatar as ShadCNAvatar,
} from "@/components/ui/avatar";

const DEFAULT_LINK = "https://github.com/shadcn.png";

const Avatar: React.FC<{
  src?: string;
  alt?: string;
  className?: ClassNameValue;
}> = ({ src = DEFAULT_LINK, alt = "sample", className }) => {
  return (
    <ShadCNAvatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={src || DEFAULT_LINK} />
      <AvatarFallback>{alt}</AvatarFallback>
    </ShadCNAvatar>
  );
};

export default Avatar;
