import React from "react";
import { cn } from "@/lib/utils";
import Button from "../button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AnyObject } from "@/types";

const Index = ({
  type = "text",
  size,
  label,
  withLabel,
  withButton,
  placeholder,
  icon: Icon,
  iconDirection = "left",
  wrapperClassName,
  inputClassName,
  ...rest
}: React.ComponentProps<typeof Input> & {
  label?: string;
  withLabel?: boolean;
  withButton?: AnyObject;
  iconDirection?: "left" | "right";
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  wrapperClassName?: string;
  inputClassName?: string;
}) => {
  return (
    <div className={cn("flex items-center gap-2 w-full", wrapperClassName)}>
      {withLabel && <Label htmlFor={label}>{label}</Label>}
      <div className="relative flex-1">
        <Input
          readOnly
          tabIndex={-1}
          size={size}
          type={type}
          placeholder={placeholder}
          onFocus={(e) => {
            e.currentTarget.removeAttribute("readonly");
            e.currentTarget.tabIndex = 0;
          }}
          className={cn(
            "w-full text-sm placeholder:text-sm border-none",
            inputClassName,
            Icon && iconDirection === "left" && "pl-9",
            Icon && iconDirection === "right" && "pr-9"
          )}
          {...rest}
        />

        {Icon && (
          <Icon
            className={cn("absolute top-2.5", {
              "left-3": iconDirection === "left",
              "right-3": iconDirection === "right",
            })}
            width={16}
            height={16}
          />
        )}
      </div>
      {withButton && (
        <Button type="submit" variant="outline" {...withButton}>
          {withButton.label || ""}
        </Button>
      )}
    </div>
  );
};

export default Index;
