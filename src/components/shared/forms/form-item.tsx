import {
  FormItem as ShadcnFormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Children } from "@/types/global";

const FormItem = ({
  label,
  children,
  description,
}: {
  label?: string;
  children: Children;
  description?: string;
}) => {
  return (
    <ShadcnFormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </ShadcnFormItem>
  );
};

export default FormItem;
