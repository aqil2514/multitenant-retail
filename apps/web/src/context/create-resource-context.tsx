"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";
import {
  useQuery,
  useQueryClient,
  QueryKey,
  QueryObserverResult,
} from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";

interface ResourceContextType<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<T, Error>>;
  invalidate: () => Promise<void>;
}

/**
 * Daftar parameter yang dianggap sebagai "Data Filter".
 * Jika param di URL berubah dan ADA di sini, React Query akan RE-FETCH.
 * Jika param di URL berubah dan TIDAK ADA di sini (seperti 'action' atau 'id'), 
 * maka React Query akan DIAM (menggunakan cache yang ada).
 */
const ACTIVE_QUERY_PARAMS = ["page", "limit", "search", "sort"]; 

export function createResourceContext<
  T,
  P extends Record<string, unknown> = Record<string, never>,
>(getQueryKey: (params: P) => QueryKey, getUrl: (params: P) => string) {
  const Context = createContext<ResourceContextType<T> | undefined>(undefined);

  function Provider({ children, ...params }: { children: ReactNode } & P) {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    // 1. Ekstrak hanya params yang diizinkan untuk memicu query
    const filteredParams = useMemo(() => {
      const currentParams: Record<string, string> = {};
      
      ACTIVE_QUERY_PARAMS.forEach((key) => {
        const value = searchParams.get(key);
        if (value) {
          currentParams[key] = value;
        }
      });
      
      return currentParams;
    }, [searchParams]);

    // 2. Query Key stabil (mengikuti filteredParams)
    const queryKey = useMemo(() => {
      return [...getQueryKey(params as unknown as P), filteredParams];
    }, [params, filteredParams]);

    // 3. Bangun URL API (hanya mengirim params yang relevan bagi server)
    const fullUrl = useMemo(() => {
      const baseUrl = getUrl(params as unknown as P);
      const urlWithParams = new URLSearchParams(filteredParams);
      const queryString = urlWithParams.toString();
      
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }, [params, filteredParams]);

    const query = useQuery<T, Error>({
      queryKey,
      queryFn: async () => {
        const response = await api.get(fullUrl);
        return response.data;
      },
      staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit
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