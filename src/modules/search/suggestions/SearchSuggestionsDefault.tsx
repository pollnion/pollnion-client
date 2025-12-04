"use client";

import take from "lodash/take";
import { uniqBy } from "lodash";
import { useMemo } from "react";
import { Flame } from "lucide-react";

import { cn } from "@/lib";
import { FeedItem } from "@/models";
import { useRouter } from "next/navigation";
import Button from "@/components/custom/button";
import { TABLE_FEED } from "@/constants/tables";
import { useReadStore, useSearch } from "@/store";
import { Typography } from "@/components/custom/typography";
import SearchSuggestionsLoading from "../SearchLoading";

const SearchSuggestionsDefault = () => {
  const router = useRouter();
  const { data, isLoading } = useReadStore<FeedItem>(TABLE_FEED);
  const searchProps = useSearch();

  const latest = useMemo(() => {
    const dataArray = Array.isArray(data) ? data : [];
    return take(dataArray, 5);
  }, [data]);

  if (isLoading) {
    return <SearchSuggestionsLoading />;
  }

  return (
    <div className="flex flex-col">
      <Typography className="px-2 my-2" weight="medium">
        You may like..
      </Typography>

      {uniqBy(latest, "content.title").map((item, idx) => {
        const handleClick = () => {
          router.push(
            `/search/result?s=${encodeURIComponent(item?.content.title)}`
          );
          searchProps.onAddSearchHistory(item?.content?.title);
          // searchProps.toggle();
        };

        return (
          <Button
            key={idx}
            size="sm"
            variant="ghost"
            onClick={handleClick}
            className={cn("justify-start mb-2")}
          >
            <Flame /> {item?.content.title}
          </Button>
        );
      })}
    </div>
  );
};

export default SearchSuggestionsDefault;
