"use client";

import React, { useTransition } from "react";
import { useText } from "./TextProvider";
import { Button } from "@/components/shadcn/ui/button";
import { saveMemo } from "@/app/actions/memo";
import { Spinner, SpinnerWrapper } from "@/components/ui/Spinner";

export const SaveButton: React.FC = () => {
  const { text } = useText();
  const [isPending, startTransition] = useTransition();

  const onSave = async () => {
    startTransition(() => {
      saveMemo(text);
    });
  };

  return (
    <>
      <SpinnerWrapper>{isPending && <Spinner message="メモを保存中です..." />}</SpinnerWrapper>
      <Button className="text-md" onClick={onSave}>
        保存
      </Button>
    </>
  );
};
