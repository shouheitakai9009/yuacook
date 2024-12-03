import { Material, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchMaterials(): Promise<Material[]> {
  const materials = prisma.material.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return materials;
}
