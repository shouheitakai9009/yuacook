import { Container } from "@/components/layouts/Container";
import Image from "next/image";
import { AspectRatio } from "@/components/shadcn/ui/aspect-ratio";
import isEmpty from "lodash/isEmpty";
import { Material, Recipe } from "@prisma/client";
import { Breadcrumb } from "./Breadcrumb";
import { Materials } from "./Materials";
import { DeleteDialog } from "./DeleteDialog";

export async function RecipeDetail({
  promisedRecipe,
}: {
  promisedRecipe: Promise<(Recipe & { materials: Material[] }) | null>;
}) {
  const recipe = await promisedRecipe;

  return (
    <Container className="py-4 flex flex-col gap-y-4">
      <Breadcrumb name={recipe?.name ?? ""} />
      <h1 className="text-2xl font-bold">{recipe?.name}</h1>
      <Image
        src={recipe?.imageUrl && !isEmpty(recipe?.imageUrl) ? recipe.imageUrl : "/images/noimage.png"}
        alt={recipe?.name ?? ""}
        width={400}
        height={300}
        className="object-cover aspect-[4/3] w-full rounded-sm"
      />
      <Materials materials={recipe?.materials ?? []} />
      <DeleteDialog id={recipe?.id ?? -1} />
    </Container>
  );
}