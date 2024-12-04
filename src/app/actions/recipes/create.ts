"use server";

import { TO_TASTE_NAME } from "@/constants/ui";
import { formSchema } from "@/features/recipeNewAndEdit/components/schema";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createRecipe(formData: FormData, isEdit: boolean) {
  const validatedData = formSchema.safeParse({
    recipeName: formData.get("recipeName"),
    image: formData.get("image"),
    materials: JSON.parse(formData.get("materials")?.toString() ?? ""),
  });
  if (!validatedData.success) {
    return validatedData.error;
  }

  const { recipeName, image, materials } = validatedData.data;

  // 画像アップロード
  const blob = await put(image.name, image, {
    access: "public",
  });

  const newRecipe = await prisma.recipe.create({
    data: {
      name: recipeName,
      imageUrl: blob.url,
    },
  });
  await prisma.material.createMany({
    data: materials.map((m) => ({
      recipeId: newRecipe.id,
      name: m.name,
      isToTaste: m.unit === TO_TASTE_NAME,
      amount: m.amount,
      unitName: m.unit,
    })),
  });

  revalidatePath("/recipes");
  revalidateTag("recipes");
  redirect("/recipes");
}
