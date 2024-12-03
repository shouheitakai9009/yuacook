import React from "react";
import { Memo } from "@prisma/client";
import { Textarea } from "./Textarea";

export async function MemoArea({ promisedMemo }: { promisedMemo: Promise<Memo | null> }) {
  const memo = await promisedMemo;

  return <Textarea memo={memo} />;
}
