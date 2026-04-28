import { DataTable } from "@/_shared/tables/data-table/data-table";
import { useTablePagination } from "@/_shared/hooks/use-table-pagination";
import { useProductList } from "../pl.context";
import { useProductListColumn } from "./column";
import { useQueryState } from "@/_shared/hooks/use-query-state";

export function ProductListTable() {
  const { data, isFetching } = useProductList();
  const columns = useProductListColumn();
  const { set } = useQueryState();

  const { paginationProps } = useTablePagination(data?.meta);

  return (
    <DataTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isFetching}
      pagination={paginationProps}
      onAdd={() => set("dialog", "add")}
    />
  );
}
