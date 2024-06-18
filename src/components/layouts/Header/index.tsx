"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const Header: React.FC = () => {
  const { theme, systemTheme, setTheme } = useTheme();

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <header className="h-12 bg-primary flex justify-between items-center">
      <div className="w-14">&emsp;</div>
      <h1 className="font-bold text-xl text-black">yuacook</h1>
      <Button
        variant="ghost"
        className="text-black"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </header>
  );
};
