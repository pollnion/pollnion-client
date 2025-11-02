import React from "react";
import { ArrowUp } from "lucide-react";
import { Forward } from "lucide-react";
import { Repeat2 } from "lucide-react";
import { Bookmark } from "lucide-react";
import { MessageCircle } from "lucide-react";

import { FeedItem } from "@/models/feed";
import { formatNum } from "@/lib/numbers";
import Button from "@/components/custom/button";

const FeedCta: React.FC<{ item: FeedItem }> = ({ item }) => {
  const { engagementCount } = item || {};
  const { likes, comments, repost } = engagementCount || {};

  const buttons = [
    {
      // likes
      icon: ArrowUp,
      children: formatNum(likes),
    },
    {
      // repost
      icon: Repeat2,
      children: formatNum(repost),
    },
    {
      // likes
      icon: MessageCircle,
      children: formatNum(comments),
    },
  ];

  const buttons_v2 = [
    {
      // bookmark
      icon: Bookmark,
    },
    {
      // forward
      icon: Forward,
    },
  ];

  return (
    <div className="flex justify-between sm:justify-start mt-3">
      <div className="flex space-x-1">
        {buttons.map((item, idx) => {
          return React.createElement(Button, {
            ...item,
            key: idx,
            size: "sm",
            variant: "secondary",
            className: "rounded-full",
          });
        })}
      </div>

      <div className="flex">
        {buttons_v2.map((item, idx) => {
          return React.createElement(Button, {
            ...item,
            key: idx,
            size: "sm",
            variant: "ghost",
            className: "rounded-full",
          });
        })}
      </div>
    </div>
  );
};

export default FeedCta;
