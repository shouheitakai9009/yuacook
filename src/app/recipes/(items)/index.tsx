"use client";

import { Container } from "@/components/layouts/Container";
import { RecipeItem } from "@/features/RecipeItem";
import { RecipeItemSkelton } from "@/features/RecipeItem/skelton";
import { useFetchRecipes } from "@/hooks/useFetchRecipes";

export const RecipeItems: React.FC = () => {
  const { data: recipes, isFetching } = useFetchRecipes();
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
    </Container>
  );
};
