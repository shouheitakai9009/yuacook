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

export const defaultMaterial: Material = {
  name: "",
  amount: "",
  unit: "g",
};

export const Form: React.FC = ({}) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipeName: "",
      materials: [defaultMaterial],
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    console.log(values);
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
    </ShadForm>
  );
};
