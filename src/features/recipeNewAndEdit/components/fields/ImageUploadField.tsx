"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/shadcn/ui/form";
import { FormType } from "../schema";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/shadcn/ui/input";
import Image from "next/image";
import { ChangeEvent, useContext, useState } from "react";
import { RecipeContext } from "..";

interface Props {
  form: UseFormReturn<FormType, any, undefined>;
}

export const ImageUploadField: React.FC<Props> = ({ form }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const recipe = useContext(RecipeContext);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setPreviewImage(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
      form.setValue("image", files[0]);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <FormField
      control={form.control}
      name="image"
      render={() => (
        <FormItem>
          <FormLabel>レシピ画像</FormLabel>
          <FormControl>
            <Input type="file" {...form.register("image")} accept="image/*" onChange={onChange} />
          </FormControl>
          <FormMessage />
          {(!!previewImage || !!recipe.data?.imageUrl) && (
            <div className="relative">
              <p className="absolute top-0 right-0 bg-gray-700 text-white w-20 h-7 text-xs flex items-center justify-center rounded-tr-sm rounded-bl-sm">
                プレビュー
              </p>
              <Image
                src={previewImage ?? recipe.data?.imageUrl ?? ""}
                alt={""}
                width={400}
                height={300}
                className="object-cover aspect-[4/3] rounded-sm w-full"
              />
            </div>
          )}
        </FormItem>
      )}
    />
  );
};
