"use client";

import { Container } from "@/components/layouts/Container";
import { RecipeItem } from "@/features/recipes/RecipeItem";
import { RecipeItemSkelton } from "@/features/recipes/RecipeItem/skelton";
import { useFetchRecipes } from "@/hooks/useFetchRecipes";

interface Props {
  selectedMaterial: string | null;
}

export const RecipeItems: React.FC<Props> = ({ selectedMaterial }) => {
  const params = selectedMaterial
    ? { materialName: selectedMaterial }
    : undefined;
  const { data: recipes, isFetching } = useFetchRecipes(params);
  return (
    <Container>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2">
        {isFetching &&
          [...Array(6)].map((_, index) => <RecipeItemSkelton key={index} />)}
        {!isFetching &&
          recipes?.map((recipe, index) => (
            <RecipeItem key={index} recipe={recipe} />
          ))}
      </div>
      {!isFetching && recipes?.length === 0 && (
        <p className="flex justify-center items-center h-[80vh] text-sm text-gray-500">
          右上の＋アイコンを押して、
          <br />
          自分だけのレシピを登録しよう
        </p>
      )}
    </Container>
  );
};
