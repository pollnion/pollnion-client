"use client";

import { Forward } from "lucide-react";
import { useShareApp } from "@/store/utils";
import Box from "@/components/custom/layout/box";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";

const Index = () => {
  const shareAppProps = useShareApp();

  return (
    <Box className="space-y-2 p-2" color="background">
      <Typography className="text-center text-2xl font-extrabold">
        Tired with Polls?
      </Typography>
      <Typography variant="muted">
        Are you enjoying Pollnion? Share it with your friends!
      </Typography>
      <Button
        icon={Forward}
        className="w-full"
        variant="secondary"
        onClick={shareAppProps.toggle}
      >
        Share
      </Button>
    </Box>
  );
};

export default Index;
