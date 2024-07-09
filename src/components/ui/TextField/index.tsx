import { Input, InputProps } from "@/components/shadcn/ui/input";
import { cn } from "@/libs/utils";
import React from "react";

export interface TextFieldProps extends InputProps {
  hasError?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          className,
          hasError && "border-red-500 placeholder:text-red-500"
        )}
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";
