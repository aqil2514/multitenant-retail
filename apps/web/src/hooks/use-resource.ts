"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  useQuery,
  useQueryClient,
  QueryKey,
  QueryObserverResult,
} from "@tanstack/react-query";
import { api } from "@/lib/api";

const BASE_QUERY_PARAMS = ["page", "limit", "search", "sort"];

interface UseResourceOptions {
  url: string;
  queryKey?: QueryKey;
  activeParams?: string[];
  enabled?: boolean;
  staleTime?: number;
}

interface UseResourceResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<QueryObserverResult<T, Error>>;
  invalidate: () => Promise<void>;
}

export function useResource<T>({
  url,
  queryKey,
  activeParams = [],
  enabled = true,
  staleTime = 1000 * 60 * 5,
}: UseResourceOptions): UseResourceResult<T> {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const allowedParams = useMemo(
    () => [...BASE_QUERY_PARAMS, ...activeParams],
    [activeParams],
  );

  const filteredParams = useMemo(() => {
    const result: Record<string, string> = {};
    allowedParams.forEach((key) => {
      const value = searchParams.get(key);
      if (value) result[key] = value;
    });
    return result;
  }, [searchParams, allowedParams]);

  const fullUrl = useMemo(() => {
    const queryString = Object.entries(filteredParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    return queryString ? `${url}?${queryString}` : url;
  }, [url, filteredParams]);

  const resolvedQueryKey = useMemo(
    () => queryKey ?? [url, filteredParams],
    [url, queryKey, filteredParams],
  );

  const query = useQuery<T, Error>({
    queryKey: resolvedQueryKey,
    queryFn: async () => {
      const response = await api.get(fullUrl);
      return response.data;
    },
    enabled,
    staleTime,
  });

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: resolvedQueryKey });
  };

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    invalidate,
  };
}
