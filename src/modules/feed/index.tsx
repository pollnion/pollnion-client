"use client";

import React from "react";
import FeedCard from "./feed-card";
import FeedLoader from "./feed-loader";

import FeedPost from "./feed-post";
import { FeedItem } from "@/models";
import { useInfiniteQuery } from "@/store";
import { TABLE_FEED } from "@/constants/tables";
import Virtuoso from "@/components/custom/virtusio";

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
      <FeedPost />
      <Virtuoso data={data} isLoading={isLoading} loadMore={fetchNextPage}>
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </Virtuoso>
    </React.Fragment>
  );
};

export default Index;
