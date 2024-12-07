"use client";

import { Material, Recipe, Unit } from "@prisma/client";
import { Form } from "@/features/recipeNewAndEdit/components/Form";
import React, { createContext } from "react";

export const RecipeContext = createContext<{
  isEdit: boolean;
  data: (Recipe & { materials: Material[] }) | null;
}>({
  isEdit: false,
  data: null,
});
export const UnitsContext = createContext<Unit[]>([]);

interface Props {
  promisedRecipe?: Promise<(Recipe & { materials: Material[] }) | null>;
  promisedUnits: Promise<Unit[]>;
}

export async function RecipeNewAndEdit({ promisedRecipe, promisedUnits }: Props) {
  const recipe = !!promisedRecipe ? await promisedRecipe : null;
  const units = await promisedUnits;

  return (
    <RecipeContext.Provider value={{ isEdit: !!recipe, data: recipe }}>
      <UnitsContext.Provider value={units}>
        <h1 className="text-3xl">{!!recipe ? "レシピを編集する" : "新しいレシピを作る"}</h1>
        <Form />
      </UnitsContext.Provider>
    </RecipeContext.Provider>
  );
}
