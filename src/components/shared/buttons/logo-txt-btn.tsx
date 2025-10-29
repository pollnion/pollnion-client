import Button from "@/components/custom/button";
import LogoTxtImg from "../images/logo-text-img";

const LogoTxtBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      href="/"
      variant="ghost"
      className="p-0 hidden md:flex items-center"
      onClick={onClick}
    >
      <div className="relative w-24 h-8 flex">
        <LogoTxtImg />
      </div>
    </Button>
  );
};

export default LogoTxtBtn;
