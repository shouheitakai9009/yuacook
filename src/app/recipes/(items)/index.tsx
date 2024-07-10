"use client";

import { Container } from "@/components/layouts/Container";
import { RecipeItem } from "@/features/RecipeItem";
import { useFetchRecipes } from "@/hooks/useFetchRecipes";

export const RecipeItems: React.FC = () => {
  const { data: recipes } = useFetchRecipes();
  return (
    <Container>
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        {recipes?.map((recipe, index) => (
          <RecipeItem key={index} recipe={recipe} />
        ))}
      </div>
    </Container>
  );
};
