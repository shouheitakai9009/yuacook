"use client";

import React from "react";
import { useText } from "./TextProvider";
import { Button } from "@/components/shadcn/ui/button";
import { saveMemo } from "@/app/actions/memo";
import { useServerActions } from "@/hooks/useServerAction";
import { useToasty } from "@/hooks/useToasty";
import { Memo } from "@prisma/client";
import { Spinner, SpinnerWrapper } from "@/components/ui/Spinner";

export const SaveButton: React.FC = () => {
  const { successOnToast } = useToasty();
  const { text, setText } = useText();

  const { isLoading, execRequest } = useServerActions<Memo, string>({
    requestFn: saveMemo,
  });

  const onSave = async () => {
    const memo = await execRequest(text);
    setText(memo.text);
    successOnToast("メモを保存したよ！");
  };

  const disabled = isLoading || text === "";

  return (
    <>
      <SpinnerWrapper>
        {isLoading && <Spinner message="メモを保存中です..." />}
      </SpinnerWrapper>
      <Button className="text-md" disabled={disabled} onClick={onSave}>
        保存
      </Button>
    </>
  );
};
