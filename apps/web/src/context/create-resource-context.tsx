"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useQuery,
  useQueryClient,
  QueryKey,
  QueryObserverResult,
} from "@tanstack/react-query";
import { api } from "@/lib/api";

interface ResourceContextType<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<T, Error>>;
  invalidate: () => Promise<void>;
}

// create-resource-context.ts
export function createResourceContext<T, P extends Record<string, unknown> = Record<string, never>>(
  getQueryKey: (params: P) => QueryKey,
  getUrl: (params: P) => string,
) {
  const Context = createContext<ResourceContextType<T> | undefined>(undefined);

  function Provider({ children, ...params }: { children: ReactNode } & P) {
    const queryClient = useQueryClient();
    const queryKey = getQueryKey(params as unknown as P);
    const url = getUrl(params as unknown as P);

    const query = useQuery<T, Error>({
      queryKey,
      queryFn: async () => {
        const response = await api.get(url);
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
    });

    const invalidate = async () => {
      await queryClient.invalidateQueries({ queryKey });
    };

    const value = {
      data: query.data,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
      error: query.error,
      refetch: query.refetch,
      invalidate,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  const useData = () => {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`useData must be used within Provider`);
    }
    return context;
  };

  return { Provider, useData };
}
