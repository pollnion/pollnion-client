import { Form } from "..";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/ui/form";
import { FormProps } from "@/types/form";
import FormItem from "../form-item";
import Input from "@/components/custom/inputs";
import GoogleBtn from "../../buttons/google-btn";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/custom/typography";

const SignInForm: React.FC<FormProps> = ({ form, onSubmit }) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <FieldGroup className="p-6">
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

        <div className="flex space-x-2 text-muted-foreground justify-between">
          <Typography>New to Pollnion?</Typography>
          <Typography className="hover:underline hover:cursor-pointer">
            Sign up here
          </Typography>
        </div>
      </FieldGroup>
    </Form>
  );
};

export default SignInForm;
