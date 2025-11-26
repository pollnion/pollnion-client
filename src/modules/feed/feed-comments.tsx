import { cn } from "@/lib";
import Box from "@/components/custom/layout/box";

const FeedComments = () => {
  return (
    <Box
      className={cn("py-3 mb-1 sm:mb-4 bg-card p-2 rounded-none sm:rounded")}
    >
      Comments
    </Box>
  );
};

export default FeedComments;
