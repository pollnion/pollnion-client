"use client";
import { notFound } from "next/navigation";

import { FeedItem } from "@/models";
import { ProfileItem } from "@/models";
import Profile from "@/modules/profile";
import { useParams } from "next/navigation";
import { TABLE_FEED } from "@/constants/tables";
import FeedCard from "@/modules/feed/feed-card";
import Box from "@/components/custom/layout/box";
import ProfileLoader from "@/modules/feed/feed-loader";
import Breadcrumb from "@/components/custom/breadcrumbs";
import ProfileVirtuoso from "@/components/custom/virtusio";
import { useInfiniteQuery, useReadStoreById } from "@/store";
import { Typography } from "@/components/custom/typography";

const Page = () => {
  const params = useParams();
  const username = params.username as string;
  const listProps = useInfiniteQuery<FeedItem>({
    tableName: TABLE_FEED,
    trailingQuery: (query) =>
      query
        .eq("author->>name", username.toLowerCase())
        .order("created_at", { ascending: false }),
  });

  const viewProps = useReadStoreById<ProfileItem>("profiles", {
    filters: { username },
  } as Partial<ProfileItem>);

  const data = viewProps?.data as ProfileItem;
  const listDataLength = listProps?.data?.length || 0;

  const BREADCRUMBS_ITEMS = [
    { href: `/`, label: `Feed` },
    { href: `/${data?.username}`, label: `${data?.username}` },
  ];

  // Determine loading state
  const isLoading = viewProps?.isLoading || listProps?.isLoading;

  // Show loader while fetching data
  if (isLoading) return <ProfileLoader isLoading />;

  // Show 404 if no profile data found
  if (!viewProps?.data) notFound();

  return (
    <Box display="flex" flow="col" className="gap-2">
      <Breadcrumb data={BREADCRUMBS_ITEMS} />
      <Profile viewProps={viewProps} />

      <Typography className="p-2">Posts ({listDataLength})</Typography>
      <ProfileVirtuoso listProps={listProps}>
        {(idx, item) => <FeedCard key={idx} item={item} />}
      </ProfileVirtuoso>
    </Box>
  );
};

export default Page;
