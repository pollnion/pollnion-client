import React from "react";
import { z } from "zod";
import { Ellipsis, SendHorizontal } from "lucide-react";

import { cn, timeDiff } from "@/lib";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/supabase/client";
import Inputs from "@/components/custom/inputs";
import Box from "@/components/custom/layout/box";
import { Form } from "@/components/shared/forms";
import { FormField } from "@/components/ui/form";
import Virtuoso from "@/components/custom/virtusio";
import FormItem from "@/components/shared/forms/form-item";
import { useAuth, useForm, useInfiniteQuery } from "@/store";
import Avatar from "@/components/custom/avatar";
import { Typography } from "@/components/custom/typography";
import { AnyObject } from "@/types";
import { isEmpty, truncate } from "lodash";
import Button from "@/components/custom/button";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schema = z.object({
  id: z.string(),
  content: z.string(),
  created_at: z.string(),
  commenter_name: z.string(),
  commenter_image: z.string(),
});

type Comment = z.infer<typeof schema>;
type AuthFormValues = { id: string; content: string };
const defaultValues: AuthFormValues = { id: "", content: "" };

export const useAddComment = (onSuccess?: () => void) => {
  const { user } = useAuth();
  const { postId } = useParams();
  const formSchema = z.object({ id: z.string(), content: z.string() });
  const form = useForm<AuthFormValues>(defaultValues, formSchema);

  const onSubmitComment = async (values: AuthFormValues) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("comments").insert({
        id: crypto.randomUUID(),
        feed_id: postId,
        user_id: user.id,
        content: values.content,
        commenter_name: user.user_metadata.username,
        commenter_image: user.user_metadata.avatar_url,
      });

      if (error) {
        console.error("Error inserting comment:", error);
        return;
      }

      form.reset();

      // Small delay to ensure database transaction is committed
      await new Promise((resolve) => setTimeout(resolve, 100));

      onSuccess?.();
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const onSubmitReply = async (values: AuthFormValues) => {
    if (!user) return;

    try {
      const { data, error } = await supabase.from("comments").insert({
        feed_id: postId,
        user_id: user.id,
        parent_id: values.id,
        content: values.content,
        commenter_name: user.user_metadata.username,
        commenter_image: user.user_metadata.avatar_url,
      });

      if (error) {
        console.error("Error inserting reply:", error);
        return;
      }

      console.log("Reply inserted successfully:", data);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return { form, onSubmitComment, onSubmitReply, isLoading: form.isLoading };
};

export const CommentForm = ({
  listProps,
  callback,
}: {
  listProps: AnyObject;
  callback: () => void;
}) => {
  const { data } = listProps || {};
  const { form, isLoading, onSubmitComment } = useAddComment(callback);

  return (
    <React.Fragment>
      <Form
        form={form}
        onSubmit={(values: AuthFormValues) => {
          onSubmitComment(values);
          if (isEmpty(data)) {
            // hard reload to show the newly added comment
            window.location.reload();
          }
        }}
        isLoading={isLoading}
        noBtn
      >
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Inputs
                type="textarea"
                placeholder="Enter a comment"
                withButton={{
                  label: "",
                  type: "submit",
                  icon: SendHorizontal,
                  isLoading: isLoading,
                  disabled: !form.watch("content").trim(),
                }}
                {...field}
              />
            </FormItem>
          )}
        />
      </Form>
    </React.Fragment>
  );
};

const CommentList = ({ item, isLast }: { item: Comment; isLast: boolean }) => {
  const { commenter_name } = item || {};

  const router = useRouter();
  const authorName = truncate(commenter_name || "Unknown", { length: 25 });

  const redirect = () => router.push(`/${commenter_name}`);

  return (
    <div className={`p-2 py-4 ${!isLast ? "border-b border-border" : ""}`}>
      <div className="flex items-start gap-3 w-full">
        <Avatar src={item.commenter_image} alt={item.commenter_name} />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2 w-full">
            <div className="flex items-center space-x-2">
              <Button
                variant="link"
                className="font-medium break-all hover:underline p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  redirect();
                }}
              >
                {authorName}
              </Button>
              <Typography variant="muted-xs">
                {timeDiff(item.created_at)}
              </Typography>
            </div>

            <Button variant="ghost" className="rounded-full p-1" size="sm">
              <Ellipsis size={18} />
            </Button>
          </div>

          <Typography className="font-semibold">{item.content}</Typography>
        </div>
      </div>
    </div>
  );
};

const FeedComments = () => {
  const { postId } = useParams();

  const listProps = useInfiniteQuery<Comment, "comments">({
    tableName: "comments",
    trailingQuery: (query) => query.eq("feed_id", postId),
  });

  React.useEffect(() => {
    if (window.location.hash === "#comments") {
      document
        .getElementById("comments")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Box
      id="comments"
      className={cn("py-3 mb-1 sm:mb-4 bg-card p-2 rounded-none sm:rounded")}
    >
      <Typography className="py-4">
        Comments ({listProps.count || 0})
      </Typography>
      <CommentForm listProps={listProps} callback={() => listProps.refetch()} />
      <Virtuoso listProps={listProps}>
        {(idx, item) => (
          <CommentList
            key={item.id}
            item={item}
            isLast={idx === listProps.data.length - 1}
          />
        )}
      </Virtuoso>
    </Box>
  );
};

export default FeedComments;
