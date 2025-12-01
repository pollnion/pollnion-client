import { FormProps } from "@/types/form";
import { Children } from "@/types/global";
import { Field } from "@/components/ui/field";
import Button from "@/components/custom/button";
import { FormProvider } from "react-hook-form";

export const Form: React.FC<{ children: Children } & FormProps> = ({
  children,
  form,
  onSubmit,
  isLoading,
  noBtn = false,
}) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">{children}</div>

        {!noBtn && (
          <Field orientation="horizontal" className="mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </Field>
        )}
      </form>
    </FormProvider>
  );
};
