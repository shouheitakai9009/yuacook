import { fetchMemo } from "@/api/memo";
import { Spinner } from "@/components/ui/Spinner";
import { MemoArea } from "@/features/memo/components";
import { Suspense } from "react";

export default async function MemoPage() {
  const promisedMemo = fetchMemo();

  return (
    <Suspense fallback={<Spinner message="メモを読み込み中です" />}>
      <MemoArea promisedMemo={promisedMemo} />
    </Suspense>
  );
}
