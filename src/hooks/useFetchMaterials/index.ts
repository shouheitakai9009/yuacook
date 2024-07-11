"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "@/libs/api";
import { Material, Unit } from "@prisma/client";

export const fetchMaterialsKey = ["materials"];

export const useFetchMaterials = () =>
  useQuery({
    queryKey: fetchMaterialsKey,
    queryFn: async () => {
      const materials = await api.get<Material[]>("/api/materials");
      return materials;
    },
    staleTime: 1000 * 60 * 60,
  });
