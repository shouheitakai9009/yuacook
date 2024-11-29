"use client";

import React, { useEffect } from "react";
import { Memo } from "@prisma/client";
import { useText } from "./TextProvider";

interface Props {
  memo: Memo;
}

export const Textarea: React.FC<Props> = ({ memo }) => {
  const { text, setText } = useText();

  useEffect(() => {
    setText(memo.text);
  }, [memo]);

  return (
    <textarea
      className="h-full p-4 focus:outline-none"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};