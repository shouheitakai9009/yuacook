"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Form as ShadForm } from "@/components/shadcn/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormType, formSchema } from "./schema";
import { RecipeNameField } from "./(fields)/RecipeNameField";
import { ImageUploadField } from "./(fields)/ImageUploadField";
import { Material } from "@/types/material";
import { MaterialsField } from "./(fields)/(materials)";
import * as api from "@/libs/api";
import { useAPIMutation } from "@/hooks/useAPIMutation";
import { Recipe } from "@prisma/client";
import { useToasty } from "@/hooks/useToasty";
import { Spinner, SpinnerWrapper } from "@/components/ui/Spinner";
import { useRouter } from "next/navigation";

export const defaultMaterial: Material = {
  name: "",
  amount: "",
  unit: "g",
};

export const Form: React.FC = ({}) => {
  const router = useRouter();
  const { successOnToast } = useToasty();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipeName: "",
      materials: [defaultMaterial],
    },
  });

  const { mutation: execNewRecipe, isLoading } = useAPIMutation({
    requestFn: (params) => api.post("/api/recipes/new", params),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    const response = await execNewRecipe<Recipe>(values);
    successOnToast(`${response.name} レシピを作成したよ！`);
    router.push("/recipes");
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
      <SpinnerWrapper>
        {isLoading && <Spinner message="レシピを作成中です..." />}
      </SpinnerWrapper>
    </ShadForm>
  );
};
