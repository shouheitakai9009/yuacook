import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const recipeWithMaterials = await prisma.recipe.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      materials: true,
    },
  });

  return new Response(JSON.stringify(recipeWithMaterials));
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.recipe.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  revalidateTag("recipes");
  revalidateTag("materials");
  return new Response(JSON.stringify({}));
}
