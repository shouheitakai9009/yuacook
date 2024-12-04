import { Material } from "@prisma/client";
import { Popover } from "./Popover";

export async function SearchBox({ promisedMaterials }: { promisedMaterials: Promise<Material[]> }) {
  const materials = await promisedMaterials;

  return <Popover materials={materials} />;
}
