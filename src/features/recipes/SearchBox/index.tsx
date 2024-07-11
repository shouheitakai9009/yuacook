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
import { useFetchMaterials } from "@/hooks/useFetchMaterials";
import { useCallback, useMemo, useState } from "react";

interface Props {
  selectedMaterial: string | null;
  selectMaterial: (material: string) => void;
}

export const SearchBox: React.FC<Props> = ({
  selectedMaterial,
  selectMaterial,
}) => {
  const [open, setOpen] = useState(false);

  const { data } = useFetchMaterials();

  const uniqMaterialNames = useMemo(() => {
    if (!data) return [];
    const names = new Set(data.map((m) => m.name));
    return Array.from(names);
  }, [data]);

  const handleSelect = useCallback(
    (material: string) => {
      selectMaterial(material);
      setOpen(false);
    },
    [selectMaterial]
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
          {selectedMaterial
            ? data?.find((m) => m.name === selectedMaterial)?.name
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
                  <CommandItem key={name} onSelect={() => handleSelect(name)}>
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
