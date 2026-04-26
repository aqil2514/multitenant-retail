"use client";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__TANSTACK_QUERY_CLIENT__ = queryClient;
    }
  }, [queryClient]);

  return <Provider client={queryClient}>{children}</Provider>;
}
