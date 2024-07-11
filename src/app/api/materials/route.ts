import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request) {
  const materials = await prisma.material.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return new Response(JSON.stringify(materials));
}
