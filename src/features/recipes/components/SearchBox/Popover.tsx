"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import { Popover as ShadPopover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";
import * as React from "react";
import { Button } from "@/components/shadcn/ui/button";
import { ChevronsUpDown, RefreshCcw } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { Material } from "@prisma/client";
import { handleSelectMaterial } from "@/app/actions/materials";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import Link from "next/link";

interface Props {
  materials: Material[];
}

export const Popover: React.FC<Props> = ({ materials }) => {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const uniqMaterialNames = useMemo(() => {
    const names = new Set(materials.map((m) => m.name));
    return Array.from(names);
  }, [materials]);

  const onSelectMaterial = (name: string) => {
    setOpen(false);
    startTransition(() => {
      handleSelectMaterial(name);
    });
  };

  const selectedMaterialName = params.get("materialName");

  return (
    <ShadPopover open={open} onOpenChange={setOpen}>
      <section className="flex items-center gap-2">
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {!!selectedMaterialName ? selectedMaterialName : "食材からレシピをさがす"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {!!selectedMaterialName && (
          <Link href="/recipes">
            <RefreshCcw size={20} />
          </Link>
        )}
      </section>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="食材名を入力" />
          <CommandList>
            <CommandEmpty>見つかりませんでした</CommandEmpty>
            <CommandGroup heading="食材一覧">
              {uniqMaterialNames.map((name) => (
                <>
                  <CommandItem key={name} onSelect={() => onSelectMaterial(name)}>
                    {name}
                  </CommandItem>
                </>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {isPending && <Spinner message="検索中です..." />}
    </ShadPopover>
  );
};
