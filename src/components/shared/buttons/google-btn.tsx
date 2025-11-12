import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/custom/button";
import GoogleIcon from "@/assets/icons/google.svg";
import { Typography } from "@/components/custom/typography";
import { ClassNameValue } from "tailwind-merge";

const GoogleBtn = ({ className }: { className?: ClassNameValue }) => {
  return (
    <Button variant="outline" className={cn("w-full", className)}>
      <Image src={GoogleIcon} alt="Google" width={24} height={24} />
      <Typography>Sign in with Google</Typography>
    </Button>
  );
};

export default GoogleBtn;
