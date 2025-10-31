import Image from "next/image";
import { Element } from "@/types/global";
import { IMAGE_LOGO } from "@/constants/images";

const LogoImg = ({
  w = 32,
  h = 32,
  onClick,
}: {
  w?: number;
  h?: number;
  onClick?: () => void;
}): Element => {
  return (
    <Image
      width={w}
      height={h}
      src={IMAGE_LOGO}
      onClick={onClick}
      alt="Pollnion logo icon"
      className="object-contain hover:cursor-pointer max-w-[28px]"
    />
  );
};

export default LogoImg;
