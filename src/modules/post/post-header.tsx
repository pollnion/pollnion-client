import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";

const PostHeader = () => {
  const router = useRouter();

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="rounded-full"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        Go back
      </Button>
      <Typography variant="large" weight="medium">
        Create a poll
      </Typography>
    </div>
  );
};

export default PostHeader;
