"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function deleteRecipe(recipeId: number) {
  await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  });

  revalidatePath("/recipes");
  revalidateTag("recipes");
  redirect("/recipes");
}
