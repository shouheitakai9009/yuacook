"use client";

import { Unit } from "@prisma/client";
import { Form } from "@/features/recipeNewAndEdit/components/Form";
import React, { createContext } from "react";

export const UnitsContext = createContext<Unit[]>([]);

export async function RecipeNewAndEdit({ promisedUnits }: { promisedUnits: Promise<Unit[]> }) {
  const units = await promisedUnits;

  return (
    <div className="px-4 pt-4">
      <h1 className="text-2xl">新しいレシピを作る</h1>
      <UnitsContext.Provider value={units}>
        <Form />
      </UnitsContext.Provider>
    </div>
  );
}
