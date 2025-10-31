import Image from "next/image";
import { Element } from "@/types/global";
import { IMAGE_LOGO_TEXT } from "@/constants/images";

const LogoTxtImg = (): Element => {
  return (
    <Image
      fill
      src={IMAGE_LOGO_TEXT}
      alt="Pollnion text logo"
      sizes="(max-width: 768px) 120px, 200px"
      className="object-contain"
    />
  );
};

export default LogoTxtImg;
