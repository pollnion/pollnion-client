import { FeedItem } from "@/models/feed";
import { Typography } from "@/components/custom/typography";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatNum } from "@/lib";

const FeedContent = ({ item }: { item: FeedItem }) => {
  const { content, poll } = item || {};

  return (
    <div className="space-y-3">
      <div>
        <Typography variant="small" className="font-semibold text-lg">
          {content?.title}
        </Typography>
        <Typography variant="muted" className="text-md">
          {content?.description}
        </Typography>
      </div>

      {poll && (
        <div className="space-y-2">
          <div className="flex space-x-2 mb-2">
            {(content?.space || []).map(
              (item: { label: string; value: string }, idx: number) => {
                const { label, value } = item || {};
                return (
                  <Badge key={idx + value} variant="secondary">
                    {label}
                  </Badge>
                );
              }
            )}
          </div>

          <div className="space-y-2">
            {poll?.options.map((option) => {
              const percentage =
                poll?.totalVotes > 0
                  ? Math.round((option?.votes / poll?.totalVotes) * 100)
                  : 0;

              const width = `${Math.max(0, Math.min(percentage, 100))}%`;
              return (
                <div
                  key={option?.id}
                  className={cn(
                    "mb-1 relative items-center rounded-md bg-neutral-800/50 hover:bg-neutral-800/60 hover:cursor-pointer"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-sm whitespace-nowrap bg-neutral-700/50"
                    )}
                    style={{ width }}
                  >
                    <div className="p-2 flex items-center space-x-2 last:mb-0">
                      <Typography weight="medium">
                        {formatNum(option?.votes)}
                      </Typography>
                      <Typography className="break-normal" variant="muted">
                        {option?.label}
                      </Typography>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2">
                    <Typography variant="muted">{percentage} %</Typography>
                  </div>
                </div>
              );
            })}
          </div>
          <Typography variant="muted-xs">
            {poll?.totalVotes} total votes • {poll?.status}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FeedContent;
