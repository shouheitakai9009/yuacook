"use client";

import {
  QueryClient,
  QueryClientProvider as RQQueryClientProvider,
} from "@tanstack/react-query";
import * as React from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

export function QueryClientProvider(props: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <RQQueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </RQQueryClientProvider>
  );
}
