import { Copy, Link } from "lucide-react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { LinkedinShareButton, LinkedinIcon } from "react-share";
import { FacebookShareButton, FacebookIcon } from "react-share";

import { BaseDialogProps } from "@/types";
import { BASE_URL } from "@/constants/links";
import Input from "@/components/custom/inputs";
import Dialog from "@/components/custom/dialog";
import { useCopy } from "@/store/utils";
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
  {
    Component: LinkedinShareButton,
    Icon: LinkedinIcon,
    props: { summary: "A cool page" },
  },
  {
    Component: WhatsappShareButton,
    Icon: WhatsappIcon,
    props: { separator: ":: " },
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

const ShareDialog = ({ isOpen, toggle }: BaseDialogProps) => {
  const { copied, copy } = useCopy();

  const TITLE = "Check this out!";
  const SHARE_URL = BASE_URL;

  return (
    <Dialog toggle={toggle} isOpen={isOpen} title="Share Pollnion">
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
    </Dialog>
  );
};

export default ShareDialog;
