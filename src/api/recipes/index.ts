import { Material, PrismaClient, Recipe } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchRecipes(materialName: string | null): Promise<Recipe[]> {
  let recipes: Promise<Recipe[]>;
  if (materialName !== null) {
    recipes = prisma.recipe.findMany({
      where: {
        materials: {
          some: {
            name: materialName,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    recipes = prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return recipes;
}

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
