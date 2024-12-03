import { Container } from "@/components/layouts/Container";
import { RecipeItem } from "@/features/recipes/RecipeItem";
import { Recipe } from "@prisma/client";

export async function RecipeItems({ promisedRecipes }: { promisedRecipes: Promise<Recipe[]> }) {
  const recipes = await promisedRecipes;

  return (
    <Container>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {recipes.map((recipe, index) => (
          <RecipeItem key={index} recipe={recipe} />
        ))}
      </div>
      {recipes.length === 0 && (
        <p className="flex justify-center items-center h-[80vh] text-sm text-gray-500">
          右上の＋アイコンを押して、
          <br />
          自分だけのレシピを登録しよう
        </p>
      )}
    </Container>
  );
}
