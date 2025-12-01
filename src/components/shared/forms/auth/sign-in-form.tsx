import { Form } from "..";
import FormItem from "../form-item";
import { FormProps } from "@/types/form";
import Input from "@/components/custom/inputs";
import GoogleBtn from "../../buttons/google-btn";
import { FieldGroup } from "@/components/ui/field";
import { ERROR_MESSAGES } from "@/constants/errors";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/custom/typography";
import { FormField, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const SignInForm: React.FC<FormProps & { onSwitchMode?: () => void }> = ({
  form,
  onSubmit,
  isLoading,
  onSwitchMode,
}) => {
  const router = useRouter();
  const serverError = form.formState.errors.root?.serverError?.message;

  return (
    <Form form={form} onSubmit={onSubmit} isLoading={isLoading}>
      <FieldGroup>
        <GoogleBtn />

        <div className="flex items-center justify-center space-x-4">
          <Separator orientation="horizontal" className="flex-1" />
          <div className="shrink-0">or</div>
          <Separator orientation="horizontal" className="flex-1" />
        </div>

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Input type="email" placeholder="Enter your email" {...field} />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <Input
                type="password"
                placeholder="Enter your password"
                {...field}
              />
            </FormItem>
          )}
        />

        {serverError && (
          <FormMessage>{ERROR_MESSAGES[serverError]}</FormMessage>
        )}

        <div className="flex justify-between text-muted-foreground">
          <div className="flex space-x-2">
            <Typography
              className="hover:underline hover:cursor-pointer"
              onClick={onSwitchMode}
            >
              Sign up here
            </Typography>
          </div>
          <Typography
            className="hover:underline hover:cursor-pointer"
            onClick={() => router.push("/auth/forgot-password")}
          >
            Forgot password?
          </Typography>
        </div>
      </FieldGroup>
    </Form>
  );
};

export default SignInForm;
