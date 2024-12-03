import { getBaseUrl } from "@/utils/get_base_url";
import { Suspense } from "react";
import Loading from "./loading";
import { SearchBox } from "@/features/recipes/SearchBox";
import { RecipeItems } from "@/features/recipes/RecipeItems";
import { Container } from "@/components/layouts/Container";
import { fetchRecipes } from "@/api/recipes";
import { fetchMaterials } from "@/api/materials";

export default async function RecipesPage({ searchParams }: { searchParams: { materialName: string } }) {
  const materialName = "materialName" in searchParams ? searchParams.materialName : null;
  const promisedRecipes = fetchRecipes(materialName);
  const promisedMaterials = fetchMaterials();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Container className="px-4 py-2">
          <SearchBox promisedMaterials={promisedMaterials} />
        </Container>
      </Suspense>
      <Suspense fallback={<Loading />}>
        <RecipeItems promisedRecipes={promisedRecipes} />
      </Suspense>
    </>
  );
}
