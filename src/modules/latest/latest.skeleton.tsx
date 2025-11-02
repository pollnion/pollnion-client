"use client";

import { Skeleton } from "@/components/ui/skeleton"; // assuming you’re using shadcn/ui Skeleton

const LatestSkeleton = () => {
  return (
    <div className="bg-neutral-900 rounded-sm p-4">
      <Skeleton className="h-4 w-24" /> {/* "Latest polls" */}
      <div className="space-y-2 my-2">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-40 mb-2" /> {/* poll title */}
            <div className="flex space-x-2 items-center">
              <Skeleton className="h-5 w-14 rounded-sm" /> {/* badge */}
              <Skeleton className="h-3 w-20" /> {/* total votes */}
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-3 w-16" /> {/* "See more" */}
    </div>
  );
};

export default LatestSkeleton;
