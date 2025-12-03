import { isEmpty } from "lodash";

import { FeedItem } from "@/models";
import SearchEmpty from "../SearchEmpty";
import SearchLoading from "../SearchLoading";
import FeedCard from "@/modules/feed/feed-card";
import { TABLE_FEED } from "@/constants/tables";
import Virtuoso from "@/components/custom/virtusio";
import { useInfiniteQuery, useQuery } from "@/store";

const SearchResultsFeeds = () => {
  const { query } = useQuery();
  const { s, tab } = query || {};

  const listProps = useInfiniteQuery<FeedItem>({
    tableName: TABLE_FEED,
    trailingQuery: (query) =>
      query
        .ilike("content->>title", `%${s.toLowerCase()}%`)
        .order("created_at", { ascending: false }),
  });

  const isLoading = listProps.isLoading || listProps.isFetching;

  if (isLoading) {
    return <SearchLoading />;
  }

  if (tab === "all" && isEmpty(listProps?.data)) {
    return null;
  }

  if (!isLoading && isEmpty(listProps?.data)) {
    return <SearchEmpty />;
  }

  return (
    <Virtuoso listProps={listProps}>
      {(idx, item) => <FeedCard key={idx} item={item} />}
    </Virtuoso>
  );
};

export default SearchResultsFeeds;
