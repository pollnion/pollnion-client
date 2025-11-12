"use client";

import { Forward } from "lucide-react";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";
import Box from "@/components/custom/layout/box";

const Index = () => {
  return (
    <Box className="space-y-2 p-3" color="background">
      <Typography className="text-center text-2xl font-extrabold">
        Tired with Polls?
      </Typography>
      <Typography variant="muted">
        Are you enjoying Pollnion? Share it with your friends!
      </Typography>
      <Button icon={Forward} className="w-full" variant="secondary">
        Share
      </Button>
    </Box>
  );
};

export default Index;
