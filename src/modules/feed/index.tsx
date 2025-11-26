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
  const listProps = useInfiniteQuery<FeedItem>({ tableName: TABLE_FEED });

  const isLoading = listProps?.isLoading;

  return (
    <React.Fragment>
      <FeedPost />
      <FeedLoader isLoading={isLoading} />
      <Virtuoso listProps={listProps}>
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </Virtuoso>
    </React.Fragment>
  );
};

export default Index;
