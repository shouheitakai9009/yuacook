import { Recipes } from "@/features/recipes";
import { getBaseUrl } from "@/utils/get_base_url";
import { Suspense } from "react";
import Loading from './loading'

export default async function RecipesPage({ searchParams }: { searchParams: { materialName: string } }) {
  const baseUrl = getBaseUrl()
  const materialName = 'materialName' in searchParams ? searchParams.materialName : null
  const [recipesData, materialsData] = await Promise.all([
    await fetch(`${baseUrl}/api/recipes?materialName=${materialName}`, {
      method: 'GET',
      next: { revalidate: 3600, tags: ['recipes'] }
    }),
    await fetch(`${baseUrl}/api/materials`, {
      method: 'GET',
      next: { revalidate: 3600, tags: ['materials'] }
    }),
  ])

  const recipes = await recipesData.json();
  const materials = await materialsData.json();

  return <Suspense fallback={<Loading />}>
    <Recipes recipes={recipes} materials={materials} />
  </Suspense>;
}
