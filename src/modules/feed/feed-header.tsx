import React from "react";
import { FeedItem } from "@/models/feed";
import { Typography } from "@/components/custom/typography";
import { timeDiff } from "@/lib/dates";

const FeedHeader = ({ item }: { item: FeedItem }) => {
  const { author, createdAt } = item;

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <Typography variant="muted-xs">
            {author.name.charAt(0).toUpperCase()}
          </Typography>
        </div>
        <div>
          <Typography variant="small" className="font-medium">
            {author.name}
          </Typography>
          <Typography variant="muted-xs">
            {timeDiff(createdAt * 1000)}
          </Typography>
        </div>
      </div>
      {author.status === "admin" && (
        <Typography variant="muted-xs" className="text-primary">
          Admin
        </Typography>
      )}
    </div>
  );
};

export default FeedHeader;
