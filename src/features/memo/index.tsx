"use client";

import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";

export const Memo: React.FC = () => {
  const [text, setText] = useState("");
  return (
    <main>
      <section>
        <textarea
          className="shadow-inner w-full h-[calc(100vh-104px)] p-4 text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </section>
      <section className="w-full h-14 flex items-center justify-end px-4 fixed bottom-0">
        <Button>保存する</Button>
      </section>
    </main>
  );
};
