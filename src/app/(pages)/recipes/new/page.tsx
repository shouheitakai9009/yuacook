import { fetchUnits } from "@/api/units";
import { Suspense } from "react";
import Loading from "../[id]/loading";
import { RecipeNewAndEdit } from "@/features/recipeNewAndEdit/components";

export default function RecipesNewPage() {
  const promisedUnits = fetchUnits();

  return (
    <Suspense fallback={<Loading />}>
      <RecipeNewAndEdit promisedUnits={promisedUnits} />
    </Suspense>
  );
}
