"use client";

import { useMemo } from "react";
import take from "lodash/take";
import { formatNum } from "@/lib";
import { FeedItem } from "@/models";
import { useReadStore } from "@/store";
import LatestSkeleton from "./latest.skeleton";
import { Badge } from "@/components/ui/badge";
import { TABLE_FEED } from "@/constants/tables";
import { Typography } from "@/components/custom/typography";

const Index = () => {
  const { data, isLoading } = useReadStore<FeedItem>(TABLE_FEED);

  // grab top 3 once, only when data changes
  const latestPolls = useMemo(() => take(data, 3), [data]);

  if (isLoading) return <LatestSkeleton />;

  return (
    <section className="bg-neutral-900 rounded-sm p-3">
      <Typography weight="semibold">Latest polls</Typography>

      <div className="my-2 space-y-2">
        {latestPolls.length > 0 ? (
          latestPolls.map((item, idx) => {
            const title = item?.content?.title;
            const spaces = item?.content?.space ?? [];
            const totalVotes = item?.poll?.totalVotes ?? 0;

            return (
              <div
                key={idx}
                className="hover:bg-neutral-800/50 p-1 rounded-sm cursor-pointer transition-colors"
              >
                {title && <Typography className="mb-2">{title}</Typography>}

                <div className="flex flex-wrap gap-1 mt-1 items-center">
                  {spaces.length === 1 && (
                    <Badge variant="secondary">{spaces[0].label}</Badge>
                  )}

                  {spaces.length > 1 && (
                    <Badge variant="secondary">
                      {spaces[0].label} +{spaces.length - 1} more
                    </Badge>
                  )}

                  <Typography className="text-xs">
                    {formatNum(totalVotes)} total votes
                  </Typography>
                </div>
              </div>
            );
          })
        ) : (
          <Typography className="text-sm text-neutral-400">
            No polls found.
          </Typography>
        )}
      </div>

      <Typography className="text-sm text-primary cursor-pointer hover:underline">
        See more
      </Typography>
    </section>
  );
};

export default Index;
