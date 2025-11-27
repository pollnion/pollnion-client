"use client";
import isEmpty from "lodash/isEmpty";

import { FeedItem } from "@/models";
import Profile from "@/modules/profile";
import { useParams } from "next/navigation";
import { ProfileItem } from "@/models/profiles";
import { TABLE_FEED } from "@/constants/tables";
import FeedCard from "@/modules/feed/feed-card";
import Box from "@/components/custom/layout/box";
import ProfileLoader from "@/modules/feed/feed-loader";
import Breadcrumb from "@/components/custom/breadcrumbs";
import ProfileVirtuoso from "@/components/custom/virtusio";
import { useInfiniteQuery, useReadStoreById } from "@/store";
import { Typography } from "@/components/custom/typography";
import { useRouter } from "next/router";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const listProps = useInfiniteQuery<FeedItem>({ tableName: TABLE_FEED });
  const viewProps = useReadStoreById<ProfileItem>("profiles", { username });

  const data = viewProps?.data as ProfileItem;
  const isLoading = viewProps?.isLoading || listProps?.isLoading;
  const listDataLength = listProps?.data?.length || 0;

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

  if (isEmpty(viewProps)) {
    router.push("/404");
    return;
  }

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
