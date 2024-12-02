"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import * as React from "react";
import { Button } from "@/components/shadcn/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Material } from "@prisma/client";
import { handleSelectMaterial } from "@/app/actions/recipes";

interface Props {
  materials: Material[]
  selectedMaterial: string | null;
  selectMaterial: (material: string) => void;
}

export const SearchBox: React.FC<Props> = ({
  materials,
  selectedMaterial,
  selectMaterial,
}) => {
  const [open, setOpen] = useState(false);

  const uniqMaterialNames = useMemo(() => {
    const names = new Set(materials.map((m) => m.name));
    return Array.from(names);
  }, [materials]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedMaterial
            ? materials.find((m) => m.name === selectedMaterial)?.name
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
              {uniqMaterialNames.map((name) => (
                <>
                  <CommandItem key={name} onSelect={() => handleSelectMaterial(name)}>
                    {name}
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
