import React from "react";
import { usePostFeed } from "@/store";
import FeedPostForm from "@/components/shared/forms/feed/feed-post-form";
import Box from "@/components/custom/layout/box";

const Index = () => {
  const postFeedProps = usePostFeed();

  const { form, onSubmit, isLoading } = postFeedProps || {};

  return (
    <React.Fragment>
      <Box color="background" className="p-3">
        <FeedPostForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </Box>
    </React.Fragment>
  );
};

export default Index;
