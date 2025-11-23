import { SearchIcon } from "lucide-react";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";

const SearchBtn = () => {
  return (
    <Button
      asChild
      href="/search"
      variant="outline"
      icon={SearchIcon}
      className="w-full justify-start"
    >
      <Typography variant="muted" className="hidden sm:block">
        Search...
      </Typography>
    </Button>
  );
};

export default SearchBtn;
