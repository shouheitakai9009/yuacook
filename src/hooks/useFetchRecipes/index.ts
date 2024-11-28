"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "@/libs/api";
import { Recipe } from "@prisma/client";

export const generateRecipesKey = (params?: Params) =>
  ["recipes", params] as const;

export const fetchRecipessKey = ["recipes"];

type Params = {
  materialName: string;
};

export const useFetchRecipes = (params?: Params) =>
  useQuery({
    queryKey: generateRecipesKey(params),
    queryFn: async () => {
      const recipes = await api.get<Recipe[]>("/api/recipes", params);
      return recipes;
    },
    staleTime: 1000 * 60 * 5,
  });
