"use client";

import { Button } from "@/components/shadcn/ui/button";
import { useAPIMutation } from "@/hooks/useAPIMutation";
import { useEffect, useState } from "react";
import * as api from "@/libs/api";
import { useToasty } from "@/hooks/useToasty";
import { useFetchMemo } from "@/hooks/useFetchMemo";
import { Spinner, SpinnerWrapper } from "@/components/ui/Spinner";

export const Memo: React.FC = () => {
  const { successOnToast } = useToasty();
  const [text, setText] = useState("");

  const { data, isFetching, isSuccess } = useFetchMemo();

  const { mutation, isLoading } = useAPIMutation({
    requestFn: (params) => api.post(`/api/memos`, params),
  });

  const save = async () => {
    await mutation(text);
    successOnToast(`メモを保存したよ`);
  };

  useEffect(() => {
    if (isSuccess && data.text) setText(data.text);
    return () => setText("");
  }, [isSuccess, data]);

  return (
    <main>
      <SpinnerWrapper>
        {isFetching && <Spinner message="メモを読み込み中です..." />}
      </SpinnerWrapper>
      <section>
        <textarea
          className="shadow-inner w-full h-[calc(100vh-104px)] p-4 text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </section>
      <section className="w-full h-14 flex items-center justify-end px-4 fixed bottom-0">
        <Button disabled={isLoading} onClick={save}>
          保存する
        </Button>
      </section>
    </main>
  );
};
