import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.recipe.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  revalidatePath("/recipes");
  revalidateTag("recipes");
  revalidateTag("materials");
  return new Response(JSON.stringify({}));
}
