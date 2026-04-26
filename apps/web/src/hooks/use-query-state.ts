"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const applyChange = useCallback((params: URLSearchParams) => {
    const query = params.toString();
    const url = `${pathname}${query ? `?${query}` : ""}`;
    router.push(url, { scroll: false });
  }, [pathname, router]);

  const get = useCallback((key: string, defaultValue: string = "") => {
    return searchParams.get(key) ?? defaultValue;
  }, [searchParams]);

  const getNumber = useCallback((key: string, defaultValue: number = 0) => {
    const val = searchParams.get(key);
    return val ? parseInt(val, 10) : defaultValue;
  }, [searchParams]);

  const set = useCallback((key: string, value: string | number | boolean) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(key, String(value));
    applyChange(newParams);
  }, [searchParams, applyChange]);

  const remove = useCallback((key: string | string[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (Array.isArray(key)) {
      key.forEach((k) => newParams.delete(k));
    } else {
      newParams.delete(key);
    }
    applyChange(newParams);
  }, [searchParams, applyChange]);

  const update = useCallback((params: Record<string, string | number | boolean | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    applyChange(newParams);
  }, [searchParams, applyChange]);

  const clear = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { get, getNumber, set, remove, update, clear, searchParams };
}