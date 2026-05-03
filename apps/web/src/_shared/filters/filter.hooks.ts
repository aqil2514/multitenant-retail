import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FilterState } from "./filter.interface";
import { FilterConfig } from "./filter.config";
import { encodeFilters, decodeFilters } from "./filter.utils";

interface UseFilterSearchParamsOptions {
  syncToUrl?: boolean; // default true
}

export function useFilterSearchParams(
  config: FilterConfig[],
  options: UseFilterSearchParamsOptions = {},
) {
  const { syncToUrl = true } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilters = decodeFilters(searchParams, config);

  const applyFilters = useCallback(
    (filters: FilterState[]) => {
      if (!syncToUrl) return;

      // Pertahankan searchParams yang bukan filter
      const filterKeys = new Set(config.map((c) => c.key));
      const otherParams = Array.from(searchParams.entries())
        .filter(([key]) => !filterKeys.has(key))
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      // Build filter string tanpa encoding
      const filterParams = encodeFilters(filters);

      const queryString = [otherParams, filterParams].filter(Boolean).join("&");

      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
    },
    [syncToUrl, config, searchParams, router, pathname],
  );

  return { activeFilters, applyFilters };
}
