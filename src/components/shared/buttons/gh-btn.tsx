import { ClassNameValue } from "tailwind-merge";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatNum } from "@/lib/numbers";
import Button from "@/components/custom/button";
import GithubIcon from "@/assets/icons/github.svg";
import { Typography } from "@/components/custom/typography";

const GITHUB_STARS = 3400;

const GithubBtn = ({ className }: { className: ClassNameValue }) => {
  return (
    <Button variant="outline" className={cn(className)}>
      <Image src={GithubIcon} alt="GitHub" width={24} height={24} />
      <Typography variant="muted-xs">{formatNum(GITHUB_STARS)}</Typography>
    </Button>
  );
};

export default GithubBtn;
