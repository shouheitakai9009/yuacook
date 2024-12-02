"use client";

import { Container } from "@/components/layouts/Container";
import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { RecipeItems } from "./RecipeItems";
import { Material, Recipe } from "@prisma/client";

interface Props {
  recipes: Recipe[]
  materials: Material[]
}

export const Recipes: React.FC<Props> = ({ recipes, materials }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  return (
    <>
      <Container className="py-2">
        <SearchBox
          materials={materials}
          selectedMaterial={selectedMaterial}
          selectMaterial={setSelectedMaterial}
        />
      </Container>
      <RecipeItems recipes={recipes} selectedMaterial={selectedMaterial} />
    </>
  );
};
