import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request) {
  const units = await prisma.unit.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return new Response(JSON.stringify(units));
}
