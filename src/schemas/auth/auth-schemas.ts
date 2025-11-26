import { z } from "zod";

/**
 * Shared authentication form schema
 * Used for both sign-in and sign-up forms
 */
export const authFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address.")
    .min(2, "Email must be at least 2 characters")
    .max(50, "Email must be at most 50 characters")
    .transform((v) => v.toLowerCase()),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password must be at most 50 characters."),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;

export const authFormDefaultValues: AuthFormValues = {
  email: "",
  password: "",
};
