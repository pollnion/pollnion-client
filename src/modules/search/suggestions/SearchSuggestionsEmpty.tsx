import { Typography } from "@/components/custom/typography";
import { Search } from "lucide-react"; // make sure lucide-react is installed

const SearchSuggestionsEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[280px] gap-4 text-center px-4">
      <Search className="w-12 h-12 animate-pulse" />
      <Typography weight="medium" className="text-lg">
        No results found
      </Typography>
      <Typography className="text-sm">Try adjusting your search</Typography>
    </div>
  );
};

export default SearchSuggestionsEmpty;
