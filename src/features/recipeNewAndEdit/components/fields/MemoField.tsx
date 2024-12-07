"use client";

import { FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form";
import { TextField } from "@/components/ui/TextField";
import { FormType } from "../schema";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/shadcn/ui/textarea";

interface Props {
  form: UseFormReturn<FormType, any, undefined>;
}

export const MemoField: React.FC<Props> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="memo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>メモ</FormLabel>
          <FormControl>
            <Textarea className="min-h-[120px]" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
