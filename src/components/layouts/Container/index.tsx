"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => <section className={cn("px-4", className)}>{children}</section>;
