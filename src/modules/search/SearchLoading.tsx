import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BtnSkeleton = () => {
  return <Skeleton className="h-8 w-full rounded-none sm:rounded" />;
};

const SearchLoading = ({ count = 10 }) => {
  return (
    <div className="flex flex-col gap-1 rounded-none sm:rounded">
      {Array.from({ length: count }).map((_, idx) => (
        <BtnSkeleton key={idx} />
      ))}
    </div>
  );
};

export default SearchLoading;
