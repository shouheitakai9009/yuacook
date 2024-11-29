import React from "react";
import { Memo } from "@prisma/client";
import { Textarea } from "./Textarea";

interface Props {
  memo: Memo;
}

export const MemoComponent = ({ memo }: Props) => {
  return <Textarea memo={memo} />;
};
