"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Form as ShadForm } from "@/components/shadcn/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormType, formSchema } from "./schema";
import { RecipeNameField } from "./fields/RecipeNameField";
import { ImageUploadField } from "./fields/ImageUploadField";
import { Material } from "@/types/material";
import { MaterialsField } from "./fields/materials";
import { createRecipe } from "@/app/actions/recipes/create";
import { z } from "zod";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/Spinner";

export const defaultMaterial: Material = {
  name: "",
  amount: "",
  unit: "g",
};

export const Form: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipeName: "",
      materials: [defaultMaterial],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("recipeName", values.recipeName);
      formData.append("image", values.image instanceof FileList ? values.image[0] : values.image);
      formData.append("materials", JSON.stringify(values.materials));
      await createRecipe(formData);
      form.reset();
    });
  };

  return (
    <ShadForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4">
        <RecipeNameField form={form} />
        <ImageUploadField form={form} />
        <MaterialsField form={form} />
        <div className="py-6 flex justify-center">
          <Button type="submit" size="lg">
            新しいレシピを作る
          </Button>
        </div>
      </form>
      {isPending && <Spinner message="レシピを作成中です..." />}
    </ShadForm>
  );
};
