import { Suspense } from "react";
import Loading from "./loading";
import { fetchRecipe } from "@/api/recipes/get";
import { RecipeDetail } from "@/features/recipeDetail/components";

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const promisedRecipe = fetchRecipe(id);

  return (
    <Suspense fallback={<Loading />}>
      <RecipeDetail promisedRecipe={promisedRecipe} />
    </Suspense>
  );
}
