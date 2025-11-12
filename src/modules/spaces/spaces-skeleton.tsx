import { Skeleton } from "@/components/ui/skeleton";
const SpacesSkeleton = ({ count = 10 }: { count?: number }) => (
  <div className="border-l px-2">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="w-full flex items-center gap-2 py-1">
        <Skeleton className="h-6 w-40 rounded-md" />
      </div>
    ))}
  </div>
);

export default SpacesSkeleton;
