"use client";

import { FormControl, FormField, FormItem } from "@/components/shadcn/ui/form";
import { TextField } from "@/components/ui/TextField";
import { FormType } from "../../schema";
import { UseFormReturn } from "react-hook-form";

interface Props {
  index: number;
  form: UseFormReturn<FormType, any, undefined>;
}

export const AmountField: React.FC<Props> = ({ index, form }) => {
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
              className="w-14"
              {...form.register(`materials.${index}.amount`)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
