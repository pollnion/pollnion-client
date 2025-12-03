/* eslint-disable react-hooks/static-components */
"use client";
import { useQuery } from "@/store";
import { Typography } from "@/components/custom/typography";

import SearchResultsFeeds from "./SearchResultsFeeds";
import SearchResultsUsers from "./SearchResultsUsers";
import SearchResultsSpaces from "./SearchResultsSpaces";

const SearchResults = () => {
  const { query } = useQuery();
  const { s, tab } = query || {};

  const HeaderLabel = () => {
    return (
      <Typography variant="large" weight="semibold">
        Search results for: {s}
      </Typography>
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <HeaderLabel />

      {tab === "all" && (
        <div className="space-y-4">
          <div className="space-y-3">
            <SearchResultsFeeds />
          </div>
          <div className="space-y-3">
            <SearchResultsUsers />
          </div>
          <div className="space-y-3">
            <SearchResultsSpaces />
          </div>
        </div>
      )}
      {tab === "feeds" && <SearchResultsFeeds />}
      {tab === "users" && <SearchResultsUsers />}
      {tab === "spaces" && <SearchResultsSpaces />}
    </div>
  );
};

export default SearchResults;
