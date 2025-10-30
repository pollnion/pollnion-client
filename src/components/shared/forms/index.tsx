import { FormProps } from "@/types/form";
import { Children } from "@/types/global";
import { Field } from "@/components/ui/field";
import Button from "@/components/custom/button";

export const Form: React.FC<{ children: Children } & FormProps> = ({
  children,
  form,
  onSubmit,
}) => {
  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      {children}

      <Field orientation="horizontal">
        <Button type="submit" form="form-rhf">
          Submit
        </Button>
      </Field>
    </form>
  );
};
