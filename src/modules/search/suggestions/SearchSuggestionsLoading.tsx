import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BtnSkeleton = () => {
  return <Skeleton className="h-8 w-full rounded-sm" />;
};

const SearchSuggestionsLoading = ({ count = 10 }) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, idx) => (
        <BtnSkeleton key={idx} />
      ))}
    </div>
  );
};

export default SearchSuggestionsLoading;
