"use server";

import { TO_TASTE_NAME } from "@/constants/ui";
import { formSchema } from "@/features/recipeNewAndEdit/components/schema";
import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function editRecipe(formData: FormData, recipeId: number) {
  const validatedData = formSchema.safeParse({
    recipeName: formData.get("recipeName"),
    image: formData.get("image"),
    materials: JSON.parse(formData.get("materials")?.toString() ?? ""),
  });
  if (!validatedData.success) {
    return validatedData.error;
  }

  const recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
  if (!recipe) return "レシピが見つかりませんでした。";

  const { recipeName, image, materials } = validatedData.data;

  // 画像アップロード (画像がない場合は更新前の画像データを引き続き使う)
  let imageUrl = recipe.imageUrl;
  if (image !== "undefined") {
    const blob = await put(image.name, image, {
      access: "public",
    });
    imageUrl = blob.url;
  }

  // 材料テーブルはdelete/insert
  await prisma.material.deleteMany({
    where: { recipeId },
  });
  await prisma.material.createMany({
    data: materials.map((m) => ({
      recipeId,
      name: m.name,
      isToTaste: m.unit === TO_TASTE_NAME,
      amount: m.amount,
      unitName: m.unit,
    })),
  });

  const newRecipe = await prisma.recipe.update({
    data: {
      name: recipeName,
      imageUrl,
    },
    where: { id: recipeId },
  });

  revalidatePath(`/recipes/${recipeId}`);
  revalidateTag("materials");
  redirect(`/recipes/${recipeId}`);
}
