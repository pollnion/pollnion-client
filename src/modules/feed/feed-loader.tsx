import { Typography } from "@/components/custom/typography";
import { LottieLoadingPlayer } from "@/components/shared/lottie/lottie-loading-player";

const FeedLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <LottieLoadingPlayer />
      <Typography variant="muted">Please wait for a moment...</Typography>
    </div>
  );
};

export default FeedLoader;
