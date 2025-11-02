import React from "react";
import { map } from "lodash";
import { Typography } from "@/components/custom/typography";
import { Box } from "@/components/custom/layout/box";

type TimelineItem = {
  description?: string;
};

const timeline: TimelineItem[] = [
  { description: "Pollnion just launched! 🎉🥳" },
];

export function Index() {
  return (
    <Box className="p-3 space-y-2" color="background">
      <Typography className="font-extrabold">What&apos;s new?</Typography>

      {map(timeline, (item, idx) => {
        const { description } = item || {};
        return (
          <React.Fragment key={idx}>
            <Typography variant="muted">{description}</Typography>
          </React.Fragment>
        );
      })}
    </Box>
  );
}

export default Index;
