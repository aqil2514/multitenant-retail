"use client";

import { createContext, useContext, ReactNode } from "react";
import { QueryKey, QueryObserverResult } from "@tanstack/react-query";
import { useResource } from "@/hooks/use-resource";

interface ResourceContextType<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<T, Error>>;
  invalidate: () => Promise<void>;
}

interface CreateResourceContextOptions {
  activeParams?: string[];
  staleTime?: number;
}

export function createResourceContext<
  T,
  P extends Record<string, unknown> = Record<string, never>,
>(
  getQueryKey: (params: P) => QueryKey,
  getUrl: (params: P) => string,
  options: CreateResourceContextOptions = {},
) {
  const Context = createContext<ResourceContextType<T> | undefined>(undefined);

  function Provider({ children, ...params }: { children: ReactNode } & P) {
    const resource = useResource<T>({
      url: getUrl(params as unknown as P),
      queryKey: getQueryKey(params as unknown as P),
      activeParams: options.activeParams,
      staleTime: options.staleTime,
    });

    return <Context.Provider value={resource}>{children}</Context.Provider>;
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
