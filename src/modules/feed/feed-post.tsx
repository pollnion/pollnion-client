import React from "react";
import { Plus } from "lucide-react";
import { Vote } from "lucide-react";
import { MessageCircleQuestionMark } from "lucide-react";

import { useAuth } from "@/store";
import { useRouter } from "next/navigation";
import Button from "@/components/custom/button";
import { Separator } from "@/components/ui/separator";
import { CurrentUserAvatar } from "@/components/shared/avatars/current-user-avatar";

const FeedPost = () => {
  const authProps = useAuth();
  const { push } = useRouter();

  const redirect = () => push("/post");

  const btn = {
    variant: "secondary",
    className: "flex-1 min-w-0",
    children: "💡 Got a question? Turn it into a poll!",
    onClick: () => authProps.toggleAuthGuard(() => redirect()),
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
      onClick: () => authProps.toggleAuthGuard(() => redirect()),
    },
  ].filter(Boolean);

  return (
    <React.Fragment>
      <div className="bg-card p-2 rounded-none sm:rounded-sm">
        <div className="flex items-center space-x-2">
          <CurrentUserAvatar />
          {React.createElement(
            Button,
            btn as React.ComponentProps<typeof Button>
          )}
        </div>

        <Separator className="my-2" />

        <div className="flex justify-around items-center">
          {btns.map((props: React.ComponentProps<typeof Button>, i: number) => {
            return (
              <React.Fragment key={i}>
                {React.createElement(Button, {
                  variant: "secondary",
                  className: "flex-1 min-w-0",
                  ...props,
                })}
                <Separator
                  orientation="vertical"
                  className="h-6! mx-2 block last:hidden"
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedPost;
