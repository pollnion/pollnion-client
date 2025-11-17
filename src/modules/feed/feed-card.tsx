import { cn } from "@/lib/utils";
import FeedCta from "./feed-cta";
import { FeedItem } from "@/models/feed";
import FeedHeader from "./feed-header";
import FeedContent from "./feed-content";
import Box from "@/components/custom/layout/box";

const FeedCard = ({ item }: { item: FeedItem }) => {
  return (
    <Box
      className={cn(
        "py-3 mb-1 sm:mb-4 bg-card p-2 rounded-none sm:rounded hover:cursor-pointer hover:bg-card/90"
      )}
    >
      <FeedHeader item={item} />
      <FeedContent item={item} />
      <FeedCta item={item} />
    </Box>
  );
};

export default FeedCard;
