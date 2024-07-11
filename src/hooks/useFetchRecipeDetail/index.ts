"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "@/libs/api";
import { Material, Recipe } from "@prisma/client";

export const generateRecipeDetailKey = (params?: Params) =>
  ["recipes", "detail", params] as const;

export const fetchRecipessKey = ["recipes", "detail"];

type Params = {
  id: string | string[];
};

export const useFetchRecipeDetail = (params?: Params) =>
  useQuery({
    queryKey: generateRecipeDetailKey(params),
    queryFn: async () => {
      if (!params) return null;
      const recipes = await api.get<Recipe & { materials: Material[] }>(
        `/api/recipes/${params?.id}`
      );
      return recipes;
    },
  });
