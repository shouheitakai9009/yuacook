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
import { useContext, useMemo, useTransition } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { RecipeContext } from ".";
import { editRecipe } from "@/app/actions/recipes/edit";
import { MemoField } from "./fields/MemoField";

export const defaultMaterial: Material = {
  name: "",
  amount: "",
  unit: "g",
};

export const Form: React.FC = () => {
  const recipe = useContext(RecipeContext);
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      if (recipe.isEdit) {
        return {
          recipeName: recipe.data?.name,
          materials: recipe.data?.materials.map<Material>((m) => ({
            name: m.name,
            amount: m.amount ?? "",
            unit: m.unitName,
          })),
          memo: recipe.data?.memo ?? "",
        };
      }
      return {
        recipeName: "",
        materials: [defaultMaterial],
        memo: "",
      };
    }, [recipe]),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("recipeName", values.recipeName);
      formData.append("image", values.image instanceof FileList ? values.image[0] : values.image);
      formData.append("materials", JSON.stringify(values.materials));
      formData.append("memo", values.memo);
      if (recipe.isEdit) {
        await editRecipe(formData, recipe.data?.id ?? -1);
      } else {
        await createRecipe(formData);
      }
      form.reset();
    });
  };

  return (
    <ShadForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <RecipeNameField form={form} />
        <ImageUploadField form={form} />
        <MaterialsField form={form} />
        <MemoField form={form} />
        <div className="py-6 flex justify-center">
          <Button type="submit" size="lg">
            {recipe.isEdit ? "レシピを編集して保存する" : "新しいレシピを作る"}
          </Button>
        </div>
      </form>
      {isPending && <Spinner message={recipe.isEdit ? "レシピを編集中です..." : "レシピを作成中です..."} />}
    </ShadForm>
  );
};
