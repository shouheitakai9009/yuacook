import { cn } from "@/libs/utils";
import React from "react";

interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  body: string | string[];
}

export const ErrorMessage = React.forwardRef<
  HTMLParagraphElement,
  ErrorMessageProps
>(({ body, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {Array.isArray(body)
        ? body.map((b, i) => (
            <span className="block" key={i}>
              {b}
            </span>
          ))
        : body}
    </p>
  );
});

ErrorMessage.displayName = "ErrorMessage";
