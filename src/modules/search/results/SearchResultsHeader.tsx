/* eslint-disable react-hooks/static-components */
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";
import Button from "@/components/custom/button";

const SearchResultsHeader = () => {
  const { push } = useRouter();

  /**
   * Back button component
   * @returns
   */
  const BackBtn = () => (
    <div className="self-start">
      <Button onClick={() => push("/")} size="sm" variant="ghost">
        <ChevronLeft />
        Go back
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <BackBtn />
    </div>
  );
};

export default SearchResultsHeader;
