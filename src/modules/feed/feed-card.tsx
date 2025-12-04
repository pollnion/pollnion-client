import { cn } from "@/lib/utils";
import FeedCta from "./feed-cta";
import { FeedItem } from "@/models/feed";
import FeedHeader from "./feed-header";
import FeedContent from "./feed-content";
import Box from "@/components/custom/layout/box";
import { useParams, useRouter } from "next/navigation";

const FeedCard = ({ item }: { item: FeedItem }) => {
  const router = useRouter();
  const params = useParams();
  const redirect = `${item?.author.name}/posts/${item?.id}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on interactive elements or if drawer is open
    const target = e.target as HTMLElement;
    if (
      target.closest("a") ||
      target.closest("button") ||
      target.closest('[data-slot="drawer-trigger"]') ||
      document.querySelector('[data-slot="drawer-overlay"]')
    ) {
      return;
    }

    if (!params.postId) {
      router.push(redirect);
    }
  };

  return (
    <Box
      onClick={handleCardClick}
      className={cn(
        "py-3 mb-1 sm:mb-4 bg-card p-2 rounded-none sm:rounded",
        "hover:cursor-pointer hover:bg-card/80"
      )}
    >
      <FeedHeader item={item} />
      <FeedContent item={item} />
      <FeedCta item={item} />
    </Box>
  );
};

export default FeedCard;
