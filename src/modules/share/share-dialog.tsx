import React from "react";
import { Copy, Link } from "lucide-react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { FacebookShareButton, FacebookIcon } from "react-share";

import { useCopy } from "@/store/utils";
import { BaseDialogProps } from "@/types";
import Tabs from "@/components/custom/tabs";
import { BASE_URL } from "@/constants/links";
import Input from "@/components/custom/inputs";
import Dialog from "@/components/custom/dialog";
import { Typography } from "@/components/custom/typography";

const shareButtons = [
  {
    Component: FacebookShareButton,
    Icon: FacebookIcon,
    props: {},
  },
  {
    Component: TwitterShareButton,
    Icon: TwitterIcon,
    props: {},
  },
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

const ShareComp = () => {
  const { copied, copy } = useCopy();

  const TITLE = "Check this out!";
  const SHARE_URL = BASE_URL;

  return (
    <div className="space-y-4">
      <Typography>Share this via link</Typography>
      <div className="flex space-x-3">
        <SocialShare shareUrl={SHARE_URL} title={TITLE} />
      </div>

      <Typography>Or copy link</Typography>
      <Input
        readOnly
        icon={Link}
        value={BASE_URL}
        iconDirection="left"
        withButton={{
          icon: Copy,
          label: copied ? "Copied" : "Copy",
          onClick: () => copy(SHARE_URL),
        }}
      />
    </div>
  );
};

const AdsComp = () => {
  return (
    <div className="space-y-4">
      <Typography>This section is for ads</Typography>
    </div>
  );
};

const ShareDialog = ({ isOpen, toggle }: BaseDialogProps) => {
  return (
    <Dialog toggle={toggle} isOpen={isOpen} title="Share Pollnion">
      <Tabs
        defaultValue="account"
        items={[
          {
            value: "share",
            label: "Share Pollnion",
            content: <ShareComp />,
          },
          {
            value: "follow",
            label: "Give us a follow!",
            content: <AdsComp />,
          },
        ]}
      />
    </Dialog>
  );
};

export default ShareDialog;
