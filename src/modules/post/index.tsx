import React from "react";
import { usePostFeed } from "@/store";

import { Children } from "@/types";
import PostHeader from "./post-header";
import Box from "@/components/custom/layout/box";
import Breadcrumb from "@/components/custom/breadcrumbs";
import FeedPostForm from "@/components/shared/forms/feed/feed-post-form";

const PostForm = ({ children }: { children: Children }) => (
  <Box color="background" className="p-3">
    {children}
  </Box>
);

const Index = () => {
  const postFeedProps = usePostFeed();
  const { form, onSubmit } = postFeedProps || {};

  return (
    <React.Fragment>
      <Breadcrumb data={[{ href: "/", label: "Feed" }, { label: "Create" }]} />
      <PostHeader />
      <PostForm>
        <FeedPostForm form={form} onSubmit={onSubmit} />
      </PostForm>
    </React.Fragment>
  );
};

export default Index;
