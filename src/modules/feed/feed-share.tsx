import { Link as LinkLR } from "lucide-react";

import { useCopy } from "@/store";
import { FeedItem } from "@/models";
import { BASE_URL } from "@/constants/links";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Separator } from "@/components/ui/separator";

const shareButtons = [
  { Component: FacebookShareButton, Icon: FacebookIcon, props: {} },
  { Component: TwitterShareButton, Icon: TwitterIcon, props: {} },
];

const SocialShare = ({
  shareUrl,
  title,
}: {
  shareUrl: string;
  title: string;
}) => (
  <div className="flex gap-2">
    {shareButtons.map(({ Component, Icon, props }, i) => (
      <Component key={i} url={shareUrl} title={title} {...props}>
        <Icon size={32} round />
      </Component>
    ))}
  </div>
);

const FeedShare = ({ item }: { item: FeedItem }) => {
  const { copy, copied } = useCopy();

  const path = `${window.location.origin}/${item?.author.name}/posts/${item?.id}`;

  const TITLE = "Check this out!";
  const SHARE_URL = BASE_URL;

  return (
    <div className="space-y-4 p-6">
      <div className="space-y-2">
        <Typography>Share this via link</Typography>
        <SocialShare shareUrl={SHARE_URL} title={TITLE} />
        <Separator />
        <Typography>Or copy link</Typography>
        <Button
          size="sm"
          variant="outline"
          onClick={() => copy(path)}
          className="rounded-full flex flex-col items-center"
        >
          <LinkLR />
        </Button>
        <Typography>{copied ? "Copied!" : "Copy Link"}</Typography>
      </div>
    </div>
  );
};

export default FeedShare;
