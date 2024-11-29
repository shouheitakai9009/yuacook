import { MemoComponent } from "@/features/memo/components";

export default async function MemoPage() {
  const data = await fetch(`${process.env.BASE_URL}/api/memos`, {
    method: "GET",
    next: {
      revalidate: 1,
      tags: ["memos"],
    },
  });

  const memo = await data.json();

  return <MemoComponent memo={memo} />;
}
