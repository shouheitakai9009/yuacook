import { Material, PrismaClient, Recipe } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchRecipe(recipeId: number): Promise<(Recipe & { materials: Material[] }) | null> {
  const recipeWithMaterials = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
    include: {
      materials: true,
    },
  });

  return recipeWithMaterials;
}
