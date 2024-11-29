import { MemoComponent } from "@/features/memo/components";

export default async function MemoPage() {
  const data = await fetch(`${process.env.BASE_URL}/api/memos`, {
    method: "GET",
  });

  const memo = await data.json();

  return <MemoComponent memo={memo} />;
}
