import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

function getBodySchema() {
  return z.object({
    recipeName: z
      .string()
      .min(1, "レシピ名を入力してください")
      .max(255, "レシピ名は255文字以内で入力してください"),
    // image: z.custom<FileList>().refine((file) => file.length !== 0, {
    //   message: "レシピ画像をアップロードしてください",
    // }),
    materials: z.array(
      z.object({
        name: z
          .string()
          .min(1, "材料名を入力してください")
          .max(255, "材料名は255文字以内で入力してください"),
        amount: z
          .string()
          .min(1, "分量を入力してください")
          .max(10, "分量は10文字以内で入力してください"),
        unit: z.string(),
      })
    ),
  });
}

export async function GET(request: Request) {
  const recipes = await prisma.recipe.findMany();
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
    },
  });
  await prisma.material.createMany({
    data: result.data.materials.map((m) => ({
      recipeId: newRecipe.id,
      name: m.name,
      amount: m.amount,
      unitName: m.unit,
    })),
  });
  const recipe = await prisma.recipe.findUnique({
    where: { id: newRecipe.id },
  });
  return new Response(JSON.stringify(recipe));
}
