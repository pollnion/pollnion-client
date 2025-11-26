"use client";
import React from "react";

import { FeedItem } from "@/models";
import Profile from "@/modules/profile";
import { useParams } from "next/navigation";
import { ProfileItem } from "@/models/profiles";
import { TABLE_FEED } from "@/constants/tables";
import FeedCard from "@/modules/feed/feed-card";
import ProfileLoader from "@/modules/feed/feed-loader";
import Breadcrumb from "@/components/custom/breadcrumbs";
import ProfileVirtuoso from "@/components/custom/virtusio";
import { useInfiniteQuery, useReadStoreById } from "@/store";

const Page = () => {
  const params = useParams();
  const username = params.username as string;
  const listProps = useInfiniteQuery<FeedItem>({ tableName: TABLE_FEED });
  const viewProps = useReadStoreById<ProfileItem>("profiles", { username });

  const data = viewProps?.data as ProfileItem;
  const isLoading = viewProps?.isLoading || listProps?.isLoading;

  const BREADCRUMBS_ITEMS = [
    {
      href: `/${data?.username}`,
      label: `${data?.username}`,
    },
    {
      label: `Post`,
    },
  ];

  if (isLoading) return <ProfileLoader isLoading />;

  return (
    <React.Fragment>
      <Breadcrumb data={BREADCRUMBS_ITEMS} />
      <Profile viewProps={viewProps} />
      <ProfileVirtuoso listProps={listProps}>
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </ProfileVirtuoso>
    </React.Fragment>
  );
};

export default Page;
