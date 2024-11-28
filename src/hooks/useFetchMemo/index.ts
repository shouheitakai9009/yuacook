"use client";

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import * as api from "@/libs/api";
import { Memo } from "@prisma/client";

export const fetchMemosKey = ["units"];

type Options = UseQueryOptions<Memo, Error, Memo, typeof fetchMemosKey>;

export const useFetchMemo = (options?: Options) =>
  useQuery({
    queryKey: fetchMemosKey,
    queryFn: async () => {
      const memo = await api.get<Memo>("/api/memos");
      return memo;
    },
    staleTime: 1000 * 60 * 60,
    ...options,
  });
