"use client";

import { isEmpty, uniq, uniqBy } from "lodash";
import { Tag } from "lucide-react";
import { Search } from "lucide-react";

import { cn } from "@/lib";
import { useSearch } from "@/store";
import { Children } from "@/types/global";
import { useRouter } from "next/navigation";
import Button from "@/components/custom/button";
import Avatar from "@/components/custom/avatar";
import { Typography } from "@/components/custom/typography";
import SearchSuggestionsEmpty from "../SearchEmpty";
import SearchSuggestionsDefault from "./SearchSuggestionsDefault";
import SearchSuggestionsLoading from "../SearchLoading";
import SearchSuggestionsHistory from "./SearchSuggestionsHistory";
import type { SearchResultRow } from "@/types/search";

const Btn = ({
  children,
  className,
  onClick,
}: {
  children: Children;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn("justify-start mb-2", className)}
      size="sm"
    >
      {children}
    </Button>
  );
};

const SearchSuggestions = () => {
  const router = useRouter();
  const { results, isLoading, searchValue, onAddSearchHistory } = useSearch();

  const defaultResult: SearchResultRow = {
    feeds: [],
    users: [],
    labels: [],
  };

  const latestResult = results[0] ?? defaultResult;
  const { feeds, users, labels } = latestResult;

  // Only show empty if searchValue exists AND all results are empty
  const hasNoResults = isEmpty(feeds) && isEmpty(users) && isEmpty(labels);

  // Default suggestions (no search typed yet)
  if (!searchValue) {
    return (
      <div>
        <SearchSuggestionsHistory />
        <SearchSuggestionsDefault />
      </div>
    );
  }

  // While typing or waiting for results - prioritize loading state
  if (isLoading) {
    return <SearchSuggestionsLoading />;
  }

  // Show empty only after loading is complete and there are no results
  if (hasNoResults) {
    return <SearchSuggestionsEmpty />;
  }

  // Show actual results
  return (
    <div className="flex flex-col [&>div:not(:first-child)]:border-t">
      {!isEmpty(feeds) && (
        <div className="flex flex-col">
          <Typography className="px-2 my-2" weight="medium">
            Polls
          </Typography>
          {uniqBy(feeds, "title").map((item, idx) => {
            const redirect = () =>
              router.push(`/search?s=${encodeURIComponent(item.title)}`);

            const handleClick = () => {
              redirect();
              onAddSearchHistory(item.title);
            };

            return (
              <Btn key={idx} onClick={handleClick}>
                <Search /> {item?.title}
              </Btn>
            );
          })}
        </div>
      )}

      {!isEmpty(users) && (
        <div className="flex flex-col">
          <Typography className="px-2 my-2" weight="medium">
            Users
          </Typography>
          {uniq(users).map((item, idx) => {
            const redirect = () => router.push(`/${item.username}`);
            return (
              <Btn key={idx} onClick={redirect}>
                <Avatar
                  src={item.avatar_url || ""}
                  alt={item.username || ""}
                  className="h-6 w-6"
                />
                <span>{item.username}</span>
              </Btn>
            );
          })}
        </div>
      )}

      {!isEmpty(labels) && (
        <div className="flex flex-col">
          <Typography className="px-2 my-2" weight="medium">
            Spaces
          </Typography>
          {uniq(labels).map((item, idx) => (
            <Btn key={idx}>
              <Tag /> {item.label}
            </Btn>
          ))}
        </div>
      )}

      <SearchSuggestionsDefault />
    </div>
  );
};

export default SearchSuggestions;
