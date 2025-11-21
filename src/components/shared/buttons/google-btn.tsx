import { ClassNameValue } from "tailwind-merge";

import Image from "next/image";
import { cn } from "@/lib/utils";
import useAuth from "@/store/auth/use-auth";
import Button from "@/components/custom/button";
import GoogleIcon from "@/assets/icons/google.svg";
import { Typography } from "@/components/custom/typography";

const GoogleBtn = ({ className }: { className?: ClassNameValue }) => {
  const { handleGoogleLogin, isLoading } = useAuth();

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      isLoading={isLoading}
      onClick={handleGoogleLogin}
      className={cn("w-full", className)}
    >
      <Image src={GoogleIcon} alt="Google" width={24} height={24} />
      <Typography>Sign in with Google</Typography>
    </Button>
  );
};

export default GoogleBtn;
