import { PrismaClient, Unit } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchUnits(): Promise<Unit[]> {
  const units = await prisma.unit.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return units;
}
