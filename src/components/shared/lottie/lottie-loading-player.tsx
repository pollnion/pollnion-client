import { LOADING_LOTTIE_ANIMATION } from "@/constants";
import LottiePlayer from "@/components/custom/lottie/lottie-player";
import Box from "@/components/custom/layout/box";

export const LottieLoadingPlayer = () => {
  return (
    <Box className="w-[300px]">
      <LottiePlayer src={LOADING_LOTTIE_ANIMATION} />
    </Box>
  );
};
