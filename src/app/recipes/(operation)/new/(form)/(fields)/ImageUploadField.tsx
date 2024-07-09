"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { FormType } from "../schema";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/shadcn/ui/input";

interface Props {
  form: UseFormReturn<FormType, any, undefined>;
}

export const ImageUploadField: React.FC<Props> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem>
          <FormLabel>レシピ画像</FormLabel>
          <FormControl>
            <Input type="file" {...form.register("image")} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
