import { TO_TASTE_NAME } from "@/constants/ui";
import { PrismaClient, Recipe } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

function getBodySchema() {
  return z.object({
    recipeName: z
      .string()
      .min(1, "レシピ名を入力してください")
      .max(255, "レシピ名は255文字以内で入力してください"),
    image: z.string(),
    materials: z.array(
      z
        .object({
          name: z
            .string()
            .min(1, "材料名を入力してください")
            .max(255, "材料名は255文字以内で入力してください"),
          amount: z.string().max(10, "分量は10文字以内で入力してください"),
          unit: z.string(),
        })
        .refine(
          (data) => {
            return !(data.unit !== TO_TASTE_NAME && data.amount === "");
          },
          {
            message: "分量を入力してください",
            path: ["amount"],
          }
        )
    ),
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  let recipes: Recipe[] = [];
  const materialName = searchParams.get("materialName");
  if (materialName) {
    recipes = await prisma.recipe.findMany({
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
    recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  return new Response(JSON.stringify(recipes));
}

export async function POST(request: Request) {
  const result = await getBodySchema().safeParse(await request.json());
  if (!result.success) {
    return new Response(JSON.stringify(result.error), { status: 401 });
  }
  const newRecipe = await prisma.recipe.create({
    data: {
      name: result.data.recipeName,
      imageUrl: result.data.image ?? null,
    },
  });
  await prisma.material.createMany({
    data: result.data.materials.map((m) => ({
      recipeId: newRecipe.id,
      name: m.name,
      isToTaste: m.unit === TO_TASTE_NAME,
      amount: m.amount,
      unitName: m.unit,
    })),
  });
  const recipe = await prisma.recipe.findUnique({
    where: { id: newRecipe.id },
  });
  return new Response(JSON.stringify(recipe));
}
