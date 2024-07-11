import { PrismaClient } from "@prisma/client";

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
