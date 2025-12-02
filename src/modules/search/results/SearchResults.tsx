"use client";
import { useQuery } from "@/store";

const SearchResults = () => {
  const { query } = useQuery();

  const { s } = query || {};

  console.log(s);

  return <div>SearchResults</div>;
};

export default SearchResults;
