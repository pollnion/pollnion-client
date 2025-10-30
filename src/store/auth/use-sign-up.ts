import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address.")
    .min(2, "Email must be at least 2 characters")
    .max(50, "Email must be at most 50 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password must be at most 50 characters."),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = { email: "", password: "" };

const fields = {
  defaultValues,
  resolver: zodResolver(schema),
  shouldFocusError: false,
};

const useSignUp = () => {
  const form = useForm<FormValues>(fields);

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return { onSubmit, form };
};

export default useSignUp;
