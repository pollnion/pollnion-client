import { z } from "zod";

/**
 * Feed Post Schema
 */
export const postFeedSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  description: z
    .string()
    .max(300, "Description must be at most 300 characters")
    .optional()
    .or(z.literal("")),
  tags: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .min(1, "At least one tag is required"),
  polls: z
    .array(
      z.object({
        label: z
          .string()
          .min(1, "Poll option cannot be empty")
          .min(2, "Poll must be at least 2 characters")
          .max(25, "Poll must be at most 25 characters"),
      })
    )
    .min(2, "At least two polls are required"),
  status: z.union([z.string().min(1, "Status is required"), z.date()]),
});
