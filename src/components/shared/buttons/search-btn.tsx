import { SearchIcon } from "lucide-react";

import { useSearch } from "@/store";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";

const SearchBtn = () => {
  const { toggle } = useSearch();
  const handleClick = () => toggle();

  return (
    <Button
      variant="outline"
      icon={SearchIcon}
      onClick={handleClick}
      className="w-full justify-start"
    >
      <Typography variant="muted" className="hidden sm:block">
        Search...
      </Typography>
    </Button>
  );
};

export default SearchBtn;
