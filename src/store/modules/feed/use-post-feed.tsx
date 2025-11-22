import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/store";
import { AnyObject } from "@/types/global";
import { User } from "@supabase/supabase-js";
import { notify, uuidGenerator } from "@/lib";
import { postFeedSchema } from "@/schemas/feed/feed-schemas";
import { useCreateStore } from "@/store/actions/use-create-store";
import { get } from "lodash";

// Function to parse form data into the required post format
const parse = (data: AnyObject, user: User | null) => {
  return {
    id: uuidGenerator(),
    author: {
      id: user?.id || "",
      name: user?.identities?.[0]?.identity_data?.name || "",
      status: "normal",
    },
    created_at: new Date().toISOString(),
    content: {
      space: data.tags || "general",
      title: data.title,
      description: data.description || "",
    },
    poll: {
      status: data.status || "open",
      totalVotes: 0,
      question: "Vote your favorite option:",
      options: data.polls.map(
        (
          poll: { id: string; label: string; votes: number },
          index: number
        ) => ({
          id: `opt${index + 1}`,
          label: poll.label,
          votes: 0,
        })
      ),
    },
    engagements_count: {
      likes: 0,
      comments: 0,
    },
  };
};

type FormValues = z.infer<typeof postFeedSchema>;

const defaultValues: FormValues = {
  title: "",
  status: "open",
  description: "",
  polls: [{ label: "" }, { label: "" }],
  tags: [{ label: "Hypothetical", value: "2" }],
};

const fields = {
  defaultValues,
  resolver: zodResolver(postFeedSchema),
  shouldFocusError: false,
};

const usePostFeed = () => {
  const { user } = useAuth();
  const store = useCreateStore("feed");
  const form = useForm<FormValues>(fields);

  const onSubmit = async (values: FormValues) => {
    const getId = get(parse(values, user), "id", "");
    console.log("Submitting feed post with ID:", getId);

    try {
      const response = await store.onSubmit(parse(values, user));
      console.log(response);
    } finally {
      notify.success("Created successfully!");
    }
  };

  return { form, onSubmit, isLoading: store.isLoading };
};

export default usePostFeed;
