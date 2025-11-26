import { FeedItem } from "@/models/feed";
import { Typography } from "@/components/custom/typography";
import { timeDiff } from "@/lib/dates";
import { Ellipsis } from "lucide-react";
import Button from "@/components/custom/button";
import Avatar from "@/components/custom/avatar";

const FeedHeader = ({ item }: { item: FeedItem }) => {
  const { author, created_at } = item || {};

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <Avatar alt={author?.name} />
        <div className="flex items-center space-x-2">
          <Typography variant="small" className="font-medium">
            {author?.name}
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
