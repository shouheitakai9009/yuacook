"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface Props {
  isHiddenAdd?: boolean;
}

export const Header: React.FC<Props> = ({ isHiddenAdd = false }) => {
  const { theme, systemTheme, setTheme } = useTheme();

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <header className="h-12 bg-primary grid grid-cols-[56px_1fr_56px] place-items-center items-center">
      <Button
        variant="ghost"
        className="text-black"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
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
