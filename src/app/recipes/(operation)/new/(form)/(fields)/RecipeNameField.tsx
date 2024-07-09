"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { TextField } from "@/components/ui/TextField";
import { FormType } from "../schema";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<FormType, any, undefined>;
}

export const RecipeNameField: React.FC<Props> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="recipeName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>レシピ名</FormLabel>
          <FormControl>
            <TextField placeholder="例）鶏胸肉のローストチキン" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
