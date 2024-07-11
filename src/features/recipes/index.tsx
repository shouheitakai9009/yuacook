"use client";

import { Container } from "@/components/layouts/Container";
import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { RecipeItems } from "./RecipeItems";

export const Recipes: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  return (
    <>
      <Container className="py-2">
        <SearchBox
          selectedMaterial={selectedMaterial}
          selectMaterial={setSelectedMaterial}
        />
      </Container>
      <RecipeItems selectedMaterial={selectedMaterial} />
    </>
  );
};
