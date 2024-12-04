"use client";

import { FormControl, FormField, FormItem } from "@/components/shadcn/ui/form";
import { TextField } from "@/components/ui/TextField";
import { FormType } from "../../schema";
import { UseFormReturn } from "react-hook-form";
import { TO_TASTE_NAME } from "@/constants/ui";
import { useMemo } from "react";

interface Props {
  index: number;
  form: UseFormReturn<FormType, any, undefined>;
}

export const AmountField: React.FC<Props> = ({ index, form }) => {
  const unit = form.watch(`materials.${index}.unit`);
  const isToTaste = useMemo(() => {
    const is = unit === TO_TASTE_NAME;
    if (is) form.resetField(`materials.${index}.amount`);
    return is;
  }, [unit, form, index]);

  return (
    <FormField
      control={form.control}
      name={`materials.${index}.amount`}
      render={({ fieldState }) => (
        <FormItem>
          <FormControl>
            <TextField
              placeholder="分量"
              hasError={!!fieldState.error}
              className="w-16"
              disabled={isToTaste}
              {...form.register(`materials.${index}.amount`)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
