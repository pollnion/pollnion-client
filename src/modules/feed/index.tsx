"use client";

import React from "react";
import FeedCard from "./feed-card";
import FeedLoader from "./feed-loader";
import Virtuoso from "@/components/custom/virtusio";
import { useInfiniteQuery } from "@/store/utils/use-infinite-query";
import { TABLE_FEED } from "@/constants/tables";
import { FeedItem } from "@/models";

const Index = () => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<FeedItem>({
    columns: "*",
    pageSize: 10,
    tableName: TABLE_FEED,
    trailingQuery: (query) => query.order("created_at", { ascending: false }),
  });

  return (
    <React.Fragment>
      <FeedLoader isLoading={isLoading} />
      <Virtuoso data={data} isLoading={isLoading} loadMore={fetchNextPage}>
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </Virtuoso>
    </React.Fragment>
  );
};

export default Index;
