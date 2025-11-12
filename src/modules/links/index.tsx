import React from "react";
import Link from "next/link";

import { Typography } from "@/components/custom/typography";

const LINK = "https://charlidev.netlify.app/";

const Index = () => {
  return (
    <div className="flex space-x-2 space-y-2 flex-wrap text-muted-foreground">
      <Typography variant="small-xs">Pollnion © 2025</Typography>
      <Typography variant="small-xs">Report a problem</Typography>
      <Typography variant="small-xs">
        Made with ❤️ by{" "}
        <Link
          href={LINK}
          className="hover:underline text-blue-400"
          target="_blank"
        >
          Charlidev
        </Link>
      </Typography>
    </div>
  );
};

export default Index;
