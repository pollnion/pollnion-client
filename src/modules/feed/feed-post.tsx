import React from "react";
import { map } from "lodash";
import { Plus } from "lucide-react";
import { Vote } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";

import { useToggle } from "@/store";
import Button from "@/components/custom/button";
import Avatar from "@/components/custom/avatar";
import { Separator } from "@/components/ui/separator";

const FeedPost = () => {
  const toggleProps = useToggle();

  const btn = {
    variant: "secondary",
    className: "flex-1 min-w-0",
    children: "💡 Got a question? Turn it into a poll!",
    onClick: toggleProps.toggle,
  };

  const btns = [
    {
      icon: Vote,
      children: "Vote",
    },
    {
      children: "Ask",
      icon: MessageCircleQuestionMark,
    },
    {
      icon: Plus,
      children: "Create",
      onClick: toggleProps.toggle,
    },
  ].filter(Boolean);

  return (
    <React.Fragment>
      <div className="bg-card p-2 rounded-none sm:rounded-sm">
        <div className="flex items-center space-x-2">
          <Avatar />
          {React.createElement(
            Button,
            btn as React.ComponentProps<typeof Button>
          )}
        </div>

        <Separator className="my-2" />

        <div className="flex justify-around items-center">
          {map(
            btns,
            (props: React.ComponentProps<typeof Button>, i: number) => {
              return (
                <React.Fragment key={i}>
                  {React.createElement(Button, {
                    variant: "secondary",
                    className: "flex-1 min-w-0",
                    ...props,
                  })}
                  <Separator
                    orientation="vertical"
                    className="!h-6 mx-2 block last:hidden"
                  />
                </React.Fragment>
              );
            }
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedPost;
