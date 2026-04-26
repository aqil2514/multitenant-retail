import { api } from "@/lib/api";
import { QueryKey, useQuery } from "@tanstack/react-query";

export function useFetch<T = unknown>(
  queryKey: QueryKey,
  url: string,
  enabled?: boolean,
) {
  const fetcher = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const res = await api.get<T>(url);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled,
  });

  return fetcher;
}
