"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import * as React from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const foods: Array<{ id: number; label: string }> = [
  { id: 1, label: "にんじん" },
  { id: 2, label: "大根" },
  { id: 3, label: "きゅうり" },
  { id: 4, label: "はまぐり" },
  { id: 5, label: "いんげん" },
  { id: 6, label: "アスパラガス" },
  { id: 7, label: "ハム" },
];

export const SearchBox = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedFood, setSelectedFood] = React.useState<{
    id: number;
    label: string;
  } | null>(null);

  const handleSelect = React.useCallback(
    (food: { id: number; label: string }) => {
      setSelectedFood(food);
      setOpen(false);
    },
    [open, selectedFood]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedFood
            ? foods.find((food) => food.id === selectedFood.id)?.label
            : "食材からレシピをさがす"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="食材名を入力" />
          <CommandList>
            <CommandEmpty>見つかりませんでした</CommandEmpty>
            <CommandGroup heading="食材一覧">
              {foods.map((food) => (
                <>
                  <CommandItem
                    key={food.id}
                    onSelect={() => handleSelect(food)}
                  >
                    {food.label}
                  </CommandItem>
                </>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
