"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  rightComponent?: React.ReactNode;
}

const defaultRightComponent: React.ReactNode = (
  <Link href="/recipes/new">
    <Button type="button" variant="ghost" className="text-black">
      <Plus />
    </Button>
  </Link>
);

export const Header: React.FC<Props> = ({ rightComponent = defaultRightComponent }) => {
  return (
    <header className="h-12 bg-primary grid grid-cols-[56px_1fr_56px] place-items-center items-center">
      <p></p>
      <Link href="/recipes">
        <h1 className="font-bold text-xl text-black">yuacook</h1>
      </Link>
      {rightComponent}
    </header>
  );
};
