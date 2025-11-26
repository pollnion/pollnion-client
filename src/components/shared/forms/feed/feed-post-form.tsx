import React from "react";

import { Form } from "..";
import FormItem from "../form-item";
import { FormProps } from "@/types/form";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import Combobox from "@/components/custom/combobox";
import { Textarea } from "@/components/ui/textarea";
import FeedPostFormPoll from "./feed-post-form-poll";
import { useReadStore } from "@/store/actions";

const FeedPostForm: React.FC<FormProps> = ({ form, onSubmit }) => {
  const tagsProps = useReadStore<{ label: string; value: string }>("spaces");
  const tagsData = Array.isArray(tagsProps.data) ? tagsProps.data : [];

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        name="title"
        control={form.control}
        render={({ field }) => (
          <FormItem label="Title *">
            <Input type="text" placeholder="Enter your title *" {...field} />
          </FormItem>
        )}
      />

      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem label="Description">
            <Textarea
              placeholder="Enter your description"
              readOnly
              tabIndex={-1}
              className="border-none"
              onFocus={(e) => {
                e.currentTarget.removeAttribute("readonly");
                e.currentTarget.tabIndex = 0;
              }}
              {...field}
            />
          </FormItem>
        )}
      />

      <FormField
        name="tags"
        control={form.control}
        render={({ field }) => (
          <FormItem label="Tags" description="You can only select up to 3 tags">
            <Combobox
              {...field}
              data={tagsData}
              isLoading={tagsProps.isLoading}
            />
          </FormItem>
        )}
      />

      <FormField
        name="polls"
        control={form.control}
        render={() => (
          <FormItem label="Polls *" description="You can add polls up to 5">
            <FeedPostFormPoll />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default React.memo(FeedPostForm);
