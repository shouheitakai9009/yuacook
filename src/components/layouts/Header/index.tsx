"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Plus, ScrollText } from "lucide-react";
import Link from "next/link";

interface Props {
  isHiddenAdd?: boolean;
}

export const Header: React.FC<Props> = ({ isHiddenAdd = false }) => {
  return (
    <header className="h-12 bg-primary grid grid-cols-[56px_1fr_56px] place-items-center items-center">
      <Link href="/recipes/memo">
        <Button variant="ghost" className="text-black">
          <ScrollText />
        </Button>
      </Link>
      <Link href="/recipes">
        <h1 className="font-bold text-xl text-black">yuacook</h1>
      </Link>
      {!isHiddenAdd ? (
        <Link href="/recipes/new">
          <Button type="button" variant="ghost" className="text-black">
            <Plus />
          </Button>
        </Link>
      ) : (
        <p>&emsp;</p>
      )}
    </header>
  );
};
