"use client";
import React from "react";

import { FeedItem } from "@/models";
import { useReadStoreById } from "@/store";
import { useParams } from "next/navigation";
import { TABLE_FEED } from "@/constants/tables";
import FeedCard from "@/modules/feed/feed-card";
import FeedLoader from "@/modules/feed/feed-loader";
import FeedComments from "@/modules/feed/feed-comments";
import Breadcrumb from "@/components/custom/breadcrumbs";

const Page = () => {
  const params = useParams();
  const postId = params.postId as string;
  const filters = { filters: { id: postId } } as Partial<FeedItem>;
  const viewProps = useReadStoreById<FeedItem>(TABLE_FEED, filters);

  const isLoading = viewProps?.isLoading;
  const feedData = viewProps?.data as FeedItem;

  const BREADCRUMBS_ITEMS = [
    { href: `/`, label: `Feed` },
    { href: `/${feedData?.author?.name}`, label: `${feedData?.author?.name}` },
    { label: "Post" },
    {
      href: `/${feedData?.author?.name}/posts/${feedData?.id}`,
      label: `${feedData?.content?.title}`,
    },
  ];

  if (isLoading) return <FeedLoader isLoading={isLoading} />;

  return (
    <React.Fragment>
      <Breadcrumb data={BREADCRUMBS_ITEMS} />
      <FeedCard item={feedData} />
      <FeedComments />
    </React.Fragment>
  );
};

export default Page;
