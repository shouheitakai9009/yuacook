"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "@/libs/api";
import { Recipe } from "@prisma/client";

export const fetchRecipessKey = ["recipes"];

export const useFetchRecipes = () =>
  useQuery({
    queryKey: fetchRecipessKey,
    queryFn: async () => {
      const recipes = await api.get<Recipe[]>("/api/recipes");
      return recipes;
    },
  });
