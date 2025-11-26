import { Ellipsis } from "lucide-react";
import truncate from "lodash/truncate";

import { timeDiff } from "@/lib/dates";
import { FeedItem } from "@/models/feed";
import Button from "@/components/custom/button";
import Avatar from "@/components/custom/avatar";
import { Typography } from "@/components/custom/typography";

const FeedHeader = ({ item }: { item: FeedItem }) => {
  const { author, created_at } = item || {};
  const authorName = truncate(author?.name || "Unknown", { length: 25 });

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <Avatar src={author?.avatar} alt={author?.name} />
        <div className="flex items-center space-x-2">
          <Typography variant="small" className="font-medium break-all">
            {authorName}
          </Typography>
          <Typography variant="muted-xs">{timeDiff(created_at)}</Typography>
        </div>
      </div>
      <Button variant="ghost" className="rounded-full" size="sm">
        <Ellipsis size="18" />
      </Button>
      {author?.status === "admin" && (
        <Typography variant="muted-xs" className="text-primary">
          Admin
        </Typography>
      )}
    </div>
  );
};

export default FeedHeader;
