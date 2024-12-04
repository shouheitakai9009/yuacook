import { fetchUnits } from "@/api/units";
import { Suspense } from "react";
import Loading from "../../[id]/loading";
import { RecipeNewAndEdit } from "@/features/recipeNewAndEdit/components";
import { fetchRecipe } from "@/api/recipes";

export default function RecipesEditPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const promisedRecipe = fetchRecipe(id);
  const promisedUnits = fetchUnits();

  return (
    <Suspense fallback={<Loading />}>
      <RecipeNewAndEdit promisedRecipe={promisedRecipe} promisedUnits={promisedUnits} />
    </Suspense>
  );
}
