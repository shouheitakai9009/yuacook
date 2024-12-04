"use client";

import { FormControl, FormField, FormItem } from "@/components/shadcn/ui/form";
import { TextField } from "@/components/ui/TextField";
import { FormType } from "../../schema";
import { UseFormReturn } from "react-hook-form";

interface Props {
  index: number;
  form: UseFormReturn<FormType, any, undefined>;
}

export const NameField: React.FC<Props> = ({ index, form }) => {
  return (
    <FormField
      control={form.control}
      name={`materials.${index}.name`}
      render={({ fieldState }) => (
        <FormItem>
          <FormControl>
            <TextField
              placeholder="材料名を入力"
              hasError={!!fieldState.error}
              {...form.register(`materials.${index}.name`)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
