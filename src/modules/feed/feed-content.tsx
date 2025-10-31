import React from "react";
import { map } from "lodash";
import { FeedItem } from "@/models/feed";
import { Typography } from "@/components/custom/typography";
import { cn } from "@/lib/utils";

const FeedContent = ({ item }: { item: FeedItem }) => {
  const { content, poll } = item;

  return (
    <div className="space-y-3">
      <div>
        <Typography variant="small" className="font-semibold mb-1">
          {content.title}
        </Typography>
        <Typography variant="muted">{content.description}</Typography>
      </div>

      {poll && (
        <div className="space-y-2">
          <Typography variant="muted" className="font-medium">
            {poll.question}
          </Typography>
          <div className="space-y-2">
            {map(poll.options, (option) => {
              const percentage =
                poll.totalVotes > 0
                  ? Math.round((option.votes / poll.totalVotes) * 100)
                  : 0;

              return (
                <div
                  key={option.id}
                  className={cn(
                    "relative overflow-hidden rounded p-2 border border-border",
                    poll.status === "open"
                      ? "hover:bg-muted/50 cursor-pointer"
                      : ""
                  )}
                >
                  <div
                    className="absolute inset-0 bg-primary/10"
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="relative flex justify-between items-center">
                    <Typography variant="small">{option.label}</Typography>
                    <Typography variant="muted-xs">
                      {percentage}% ({option.votes})
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
          <Typography variant="muted-xs">
            {poll.totalVotes} total votes • {poll.status}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FeedContent;
