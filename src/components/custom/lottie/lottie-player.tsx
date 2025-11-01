import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LottiePlayer = ({ src }: { src: string }) => {
  return <DotLottieReact src={src} loop autoplay />;
};

export default LottiePlayer;
