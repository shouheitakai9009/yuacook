"use client";

import { cn } from "@/libs/utils";
import { PropsWithChildren } from "react";

interface Props {
  className?: string;
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => <section className={cn("px-4", className)}>{children}</section>;
