"use client";

import { FormControl, FormField, FormItem } from "@/components/shadcn/ui/form";
import { FormType } from "../../schema";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { cn } from "@/libs/utils";
import { useFetchUnits } from "@/hooks/useFetchUnits";

interface Props {
  index: number;
  form: UseFormReturn<FormType, any, undefined>;
}

export const UnitField: React.FC<Props> = ({ index, form }) => {
  const { data, isFetching } = useFetchUnits();

  return (
    <FormField
      control={form.control}
      name={`materials.${index}.unit`}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              {...form.register(`materials.${index}.unit`)}
            >
              <SelectTrigger
                className={cn(
                  "w-24",
                  fieldState.error && "border-red-500 placeholder:text-red-500"
                )}
              >
                <SelectValue placeholder="g" />
              </SelectTrigger>
              <SelectContent>
                {!data || isFetching ? (
                  <span className="text-sm py-4 px-2">読み込み中..</span>
                ) : (
                  data?.map((unit, index) => (
                    <SelectItem key={index} value={unit.name}>
                      {unit.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
