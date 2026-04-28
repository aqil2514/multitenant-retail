"use client";

import { useQueryState } from "@/_shared/hooks/use-query-state";
import { DataTablePaginationProps } from "../tables/data-table/data-table-pagination";
import { Pagination } from "@/@types/server";

export function useTablePagination(meta?: { pagination?: Pagination }) {
  const { getNumber, update } = useQueryState();

  // Ambil state dari URL dengan nilai default
  const page = getNumber("page", 1);
  const limit = getNumber("limit", 10);

  const onPageChange = (newPage: number) => {
    update({ page: newPage });
  };

  const onLimitChange = (newLimit: number) => {
    // Saat limit berubah, kita reset ke halaman 1
    update({ limit: newLimit, page: 1 });
  };

  // Bungkus ke dalam struktur yang diharapkan DataTableProps
  const paginationProps: DataTablePaginationProps | undefined = meta?.pagination
    ? {
        pagination: meta.pagination,
        onPageChange,
        onLimitChange,
      }
    : undefined;

  return {
    page,
    limit,
    paginationProps,
  };
}
