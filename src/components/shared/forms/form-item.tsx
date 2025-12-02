import {
  FormItem as ShadcnFormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib";
import { Children } from "@/types/global";
import { ClassNameValue } from "tailwind-merge";

const FormItem = ({
  label,
  children,
  className,
  description,
}: {
  label?: string;
  children: Children;
  description?: string;
  className?: ClassNameValue;
}) => {
  return (
    <ShadcnFormItem className={cn("", className)}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </ShadcnFormItem>
  );
};

export default FormItem;
