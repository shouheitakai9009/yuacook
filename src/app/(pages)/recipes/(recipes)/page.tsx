import { Suspense } from "react";
import Loading from "./loading";
import { SearchBox } from "@/features/recipes/components/SearchBox";
import { RecipeItems } from "@/features/recipes/components/RecipeItems";
import { fetchRecipes } from "@/api/recipes";
import { fetchMaterials } from "@/api/materials";

export default async function RecipesPage({ searchParams }: { searchParams: { materialName: string } }) {
  const materialName = "materialName" in searchParams ? searchParams.materialName : null;
  const promisedRecipes = fetchRecipes(materialName);
  const promisedMaterials = fetchMaterials();

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col gap-y-2">
        <SearchBox promisedMaterials={promisedMaterials} />
        <RecipeItems promisedRecipes={promisedRecipes} />
      </div>
    </Suspense>
  );
}
