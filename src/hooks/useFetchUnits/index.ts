"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "@/libs/api";
import { Unit } from "@prisma/client";

export const fetchUnitsKey = ["units"];

export const useFetchUnits = () =>
  useQuery({
    queryKey: fetchUnitsKey,
    queryFn: async () => {
      const units = await api.get<Unit[]>("/api/units");
      return units;
    },
    staleTime: 1000 * 60 * 60,
  });
