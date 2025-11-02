"use client";

import { map } from "lodash";
import { Heart, Book, Search, Bookmark, DollarSign } from "lucide-react";

import discover from "@/data/discover.json";
import Button from "@/components/custom/button";
import { Typography } from "@/components/custom/typography";

type DiscoverItem = {
  label: keyof typeof ICONS;
};

const ICONS = {
  spaces: Book,
  search: Search,
  for_you: Heart,
  plan: DollarSign,
  bookmark: Bookmark,
} as const;

const LABELS: Record<keyof typeof ICONS, string> = {
  plan: "Plan",
  spaces: "Spaces",
  search: "Search",
  for_you: "For you",
  bookmark: "Bookmark",
};

const Index = () => (
  <div>
    <Typography className="mb-2">Discover</Typography>
    <div className="border-l px-2">
      {map(discover.data, ({ label }: DiscoverItem, idx: number) => {
        const Icon = ICONS[label];
        const labelText = LABELS[label];

        return (
          <Button
            key={idx}
            size="sm"
            variant="ghost"
            className="w-full justify-start gap-2"
            icon={Icon}
          >
            {labelText}
          </Button>
        );
      })}
    </div>
  </div>
);

export default Index;
