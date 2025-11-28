import { Ellipsis } from "lucide-react";
import truncate from "lodash/truncate";

import { timeDiff } from "@/lib/dates";
import { FeedItem } from "@/models/feed";
import { useRouter } from "next/navigation";
import Button from "@/components/custom/button";
import Avatar from "@/components/custom/avatar";
import { Typography } from "@/components/custom/typography";

const FeedHeader = ({ item }: { item: FeedItem }) => {
  const { author, created_at } = item || {};

  const router = useRouter();
  const authorName = truncate(author?.name || "Unknown", { length: 25 });

  const redirect = () => router.push(`/${author?.name}`);

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <Avatar src={author?.avatar} alt={author?.name} />
        <div className="flex items-center space-x-2">
          <Button
            variant="link"
            className="font-medium break-all hover:underline p-0"
            onClick={(e) => {
              e.stopPropagation();
              redirect();
            }}
          >
            {authorName}
          </Button>
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
